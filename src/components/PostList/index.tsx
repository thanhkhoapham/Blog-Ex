import { useSelector, useDispatch } from "react-redux"
import { deletePost, startEditingPost } from "pages/Blog/blog.slice"
import PostItem from "../PostItem"
import "./styles.scss";
import { appApi, useGetPostsQuery, useUpdatePostByIdMutation } from "services/posts";
import { Post } from "types/blog.type";

const PostList = (): React.ReactElement => {
  const { data: postList = [], error, isLoading} = useGetPostsQuery();

  const dispatch = useDispatch()
  const handleDelete = (postId: string) => dispatch(deletePost(postId))
  const handleStartEditing = (postId: string) => dispatch(startEditingPost(postId));
  
  // use mutation to update a post
  const [ updatePost ] = useUpdatePostByIdMutation();

  return isLoading ? <p>Loading......</p>
    : error 
    ? <p> Fetching the API get list posts is failed! </p>
    : <div className="blog-list-wrapper">
      {
        postList.map((post: any) => (
          <PostItem 
            post={post} 
            key={post.id}
            handleDelete={handleDelete}
            handleStartEditing={handleStartEditing}
          />
        ))
      }
    </div>;
}

export default PostList
