import SidebarLogo from '@/components/layout/SidebarLogo';
import SidebarItem from '@/components/layout/SidebarItem';
import SidebarPostButton from './SidebarPostButton';
import useCurrentUser from '@/hooks/useCurrentUser';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { FaUser } from 'react-icons/fa';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { MdFeedback } from 'react-icons/md';

const Sidebar = () => {
	const { data: currentUser } = useCurrentUser();

	const items = [
		{
			label: 'Home',
			href: '/',
			icons: BsHouseFill,
		},
		{
			label: 'Notifications',
			href: '/notifications',
			icons: BsBellFill,
			auth: true,
			alert: currentUser?.hasNotification,
		},
		{
			label: 'Profile',
			href: `/users/${currentUser?.id}`,
			icons: FaUser,
			auth: true,
		},
		{
			label: 'Feedback',
			href: '/feedback',
			icons: MdFeedback,
		},
	];

	return (
		<div className="col-span-1 hidden h-full pr-4 md:pr-6 lg:block">
			<div className="flex flex-col items-end">
				<div className="relative space-y-2 lg:w-[230px]">
					<SidebarLogo />
					<Link
						href={'/'}
						className="absolute left-20 top-2 hidden text-2xl font-black italic text-green-500 lg:block "
					>
						Dev
						<span className="text-white delay-150 hover:text-green-500">
							Link
						</span>
					</Link>
					{items.map((item) => (
						<SidebarItem
							key={item.href}
							href={item.href}
							label={item.label}
							icon={item.icons}
							auth={item.auth}
							alert={item.alert}
						/>
					))}

					{currentUser && (
						<SidebarItem
							onClick={() => signOut()}
							icon={BiLogOut}
							label="LogOut"
						/>
					)}

					<SidebarPostButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
