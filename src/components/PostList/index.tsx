import PostItem from "../PostItem"
import "./styles.scss";
import { useDeletePostByIdMutation, useGetPostByIdQuery, useGetPostsQuery, useUpdatePostByIdMutation } from "services/posts";
import { useAppDispatch } from "hooks/customHook";
import { openForm } from "pages/Blog/postForm.slice";
import { Post } from "types/blog.type";

const PostList = (): React.ReactElement => {
  const { data: postList = [], error, isLoading} = useGetPostsQuery();

  const dispatch = useAppDispatch();

  const [deletePost] = useDeletePostByIdMutation();
  
  const handleDelete = (postId: string) => deletePost(postId);

  const handleStartEditing = (post: Post) => dispatch(openForm(post));

  return isLoading ? <p>Loading......</p>
    : error 
    ? <p> Fetching the API get list posts is failed! </p>
    : <div className="blog-list-wrapper">
      {
        postList.map((post) => (
          <PostItem 
            post={post} 
            key={post.id}
            handleDelete={handleDelete}
            handleStartEditing={() => handleStartEditing(post)}
          />
        ))
      }
    </div>;
}

export default PostList
