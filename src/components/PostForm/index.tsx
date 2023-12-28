import { Fragment, useEffect, useState } from "react"
import { Post } from "types/blog.type"
import { useDispatch, useSelector } from "react-redux"
import { addPost, cancelEditingPost, finishEditingPost } from "pages/Blog/blog.slice"
import { RootState } from "store"
import { Button, Checkbox, Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import "./styles.scss";
import { useCreateNewPostMutation, useUpdatePostByIdMutation } from "services/posts"

interface CreatePostProps {
  data: Post
  className?: string
  onClose: () => void
}

const PostForm = ({ data, className, onClose }: CreatePostProps): React.ReactElement => {
  const [formData, setFormData] = useState<Post>(data);
  const editingPost = useSelector((state: RootState) => state.blog.editingPost);
  const dispatch = useDispatch();

  // use create a new post from RTK Query
  const [createPost, { isLoading }] = useCreateNewPostMutation();
  const [updatePost] = useUpdatePostByIdMutation();

  useEffect(() => {
    setFormData(editingPost || data)
  }, [editingPost])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (editingPost) { 
      dispatch(finishEditingPost(formData))
      
      // call the mutation in component
      updatePost(formData);
    } else {
      const formDataWithId = { ...formData }
      dispatch(addPost(formDataWithId));

      // call the mutation in the component
      createPost(formDataWithId);
    }

    setFormData(data);
    onClose();
  }

  const handleCancelEditingPost = () => dispatch(cancelEditingPost());
  const onChangeFormData = (field: keyof Post, newValue: string | boolean) => setFormData((pre) => ({ ...pre, [field]: newValue }));

  return <Form className={`${className} form-wrapper`} onSubmitCapture={handleSubmit} onReset={handleCancelEditingPost}>
      <div className='mb-6'>
        <h2>Title</h2>
        <Input type='text' placeholder='Title' required value={formData.title} onChange={(event) => onChangeFormData("title", event.target.value)} />
      </div>
      <div className='mb-6'>
        <h2>Featured Image</h2>
        <Input type='text' placeholder='Url image' required value={formData.featuredImage} onChange={(event) => onChangeFormData("featuredImage", event.target.value)} />
      </div>
      <div className='mb-6'>
        <h2>Description</h2>
        <TextArea rows={3} placeholder='Your description...' required value={formData.description} onChange={(event) => onChangeFormData("description", event.target.value)} />
      </div>
      <div className='mb-6'>
        <h2>Publish Date</h2>
        <Input type='datetime-local' required value={formData.publishDate} onChange={(event) => onChangeFormData("publishDate", event.target.value)} />
      </div>
      <div className='mb-6 flex items-center'>
        <Checkbox checked={formData.published} onChange={(event) => onChangeFormData("published", event.target.checked)}>Published </Checkbox>
      </div>
      <div className="button-group">
        {editingPost && (
          <Fragment>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Update Post
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cancel
              </span>
            </button>
          </Fragment>
        )}
        {!editingPost && <Fragment>
          <Button className="button save-button" htmlType="submit" disabled={isLoading}>Save</Button>
          <Button className="button cancel-button" onClick={onClose}>Cancel</Button>
          { isLoading && 'Saving....'}
        </Fragment>}
      </div>
    </Form>;
}

export default PostForm
