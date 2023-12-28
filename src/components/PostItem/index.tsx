import { Button } from "antd"
import { Post } from "types/blog.type"
import { convertDateTime } from "utils/convertTime"
import "./styles.scss";

interface PostItemType {
  post: Post
  handleDelete: (postId: string) => void
  handleStartEditing: (postId: string) => void
}

const PostItem = ({ post, handleDelete, handleStartEditing }: PostItemType): React.ReactElement => {
  const date = convertDateTime(post.publishDate);

  return <div className='blog-item-wrapper'>
      <div className='image'>
        <img src={post.featuredImage} loading='lazy' alt={post.title} className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
        />
      </div>
      <div className='flex flex-col gap-2 p-4 lg:p-6'>
        <span className='text-sm text-gray-400'>{date}</span>
        <h2 className='text-xl font-bold text-gray-800'>{post.title}</h2>
        <p className='text-gray-500'>{post.description}</p>
        <div>
          <div className="button" role='group'>
            <Button className="edit" onClick={() => handleStartEditing(post.id)} >Edit</Button>
            <Button className="delete" onClick={() => handleDelete(post.id)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>;
}

export default PostItem
