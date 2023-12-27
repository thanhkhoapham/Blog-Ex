import { useSelector, useDispatch } from "react-redux"
import { RootState } from "store"
import { deletePost, startEditingPost } from "pages/Blog/blog.slice"
import PostItem from "../PostItem"
import "./styles.scss";

const PostList = (): React.ReactElement => {
  // TODO: Call Api and set store
  const postList = useSelector((state: RootState) => state.blog.postList)

  const dispatch = useDispatch()
  const handleDelete = (postId: string) => dispatch(deletePost(postId))
  const handleStartEditing = (postId: string) => dispatch(startEditingPost(postId))

  return <div className="blog-list-wrapper">
      {postList.map((post) => (
        <PostItem post={post} key={post.id} handleDelete={handleDelete} handleStartEditing={handleStartEditing} />
      ))}
  </div>;
}

export default PostList
