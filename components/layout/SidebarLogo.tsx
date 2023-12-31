import { useRouter } from 'next/router';

import { AiOutlineCode } from 'react-icons/ai';

const SidebarLogo = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => router.push('/')}
			className="mt-1 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 transition hover:bg-neutral-800"
		>
			<AiOutlineCode size={28} className="text-green-400  hover:text-white" />
		</div>
	);
};

export default SidebarLogo;
