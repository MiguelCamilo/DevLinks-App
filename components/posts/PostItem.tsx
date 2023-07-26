import { useRouter } from 'next/router';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar';

interface PostItemProps {
	userId?: string;
	data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const { data: currentUser } = useCurrentUser();

	const goToUser = useCallback(
		(event: any) => {
			event.stopPropagation();

			router.push(`/users/${data.user.id}`);
		},
		[router, data.user.id],
	);

	const goToPost = useCallback(() => {
		router.push(`/posts/${data.id}`);
	}, [router, data.id]);

	const onLike = useCallback(
		(event: any) => {
			event.stopPropagation();

			loginModal.onOpen();
		},
		[loginModal],
	);

	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data?.createdAt]);

	return (
		<div
			onClick={goToPost}
			className="cursor-pointer border-l border-green-600 p-5 transition hover:bg-neutral-800"
		>
			<div className="flex flex-row items-start gap-3">
				<Avatar userId={data.user.id} />
				<div>
					<div onClick={goToUser} className="flex flex-row items-center gap-2">
						<p className="cursor-pointer font-semibold text-white hover:underline">
							{data.user.name}
						</p>
						<span
							onClick={goToUser}
							className="hidden cursor-pointer text-sm text-neutral-500 hover:text-green-600 md:block"
						>
							@{data.user.username}
						</span>
						<span className="text-xs text-neutral-500">{createdAt}</span>
					</div>

					<div className="mt-1 text-sm text-white">{data.body}</div>

					<div className="mt-3 flex flex-row items-center gap-10">
						<div className="flex cursor-pointer flex-row items-center gap-1 text-neutral-500 transition hover:text-green-400">
							<AiOutlineMessage
								size={36}
								className="rounded-full hover:bg-green-800 hover:bg-opacity-30 p-2"
							/>

							<p>{data.comments?.length || 0}</p>
						</div>

						<div onClick={onLike} className="flex cursor-pointer flex-row items-center gap-1 text-neutral-500 transition hover:text-rose-600">
							<AiOutlineHeart
								size={36}
								className="rounded-full hover:bg-rose-800 hover:bg-opacity-30 p-2"
							/>

							<p>{data.likedIds?.length || 0}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostItem;