import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';

import usePost from '@/hooks/usePost';
import Form from '@/components/Form';

const PostView = () => {
    const router = useRouter()
    const { postId } = router.query
    const { data: fetchedPost, isLoading } = usePost(postId as string)

    if(isLoading || !fetchedPost) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader 
                    color='lightgreen'
                    size={80}
                />
            </div>
        )
    }
    return ( 
        <>
            <Header label='Post' showBackArrow />
            <PostItem data={fetchedPost} />
            <Form
                postId={postId as string}
                isComment
                placeholder='Share your reply'
            />
        </>
     );
}
 
export default PostView;