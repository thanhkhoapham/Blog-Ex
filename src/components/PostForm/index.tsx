import { Fragment, useState } from "react"
import { Post } from "types/blog.type"
import { Button, Checkbox, Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import "./styles.scss";
import { useCreateNewPostMutation, useUpdatePostByIdMutation } from "services/posts"
import { useAppDispatch, useAppSelector } from "hooks/customHook"
import { openForm, postFormDataSelector } from "pages/Blog/postForm.slice"

interface CreatePostProps {
  data: Post
  className?: string
}

const PostForm = ({ data, className }: CreatePostProps): React.ReactElement => {
  
  const dispatch = useAppDispatch();
  
  const postEdited = useAppSelector(postFormDataSelector);
  
  const [formData, setFormData] = useState<Post>(postEdited ?? data);

  // use create a new post from RTK Query
  const [createPost, { isLoading }] = useCreateNewPostMutation();
  
  const [updatePost] = useUpdatePostByIdMutation();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (postEdited) {
      updatePost(formData);
    } else {
      createPost(formData);
    }

    handleCancelEditingPost();
  }

  const handleCancelEditingPost = () => dispatch(openForm(null));

  const onChangeFormData = (field: keyof Post, newValue: string | boolean) => setFormData((pre) => ({ ...pre, [field]: newValue }));

  return <Form className={`${className} form-wrapper`} onSubmitCapture={handleSubmit} >
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
        <Fragment>
          <Button className="button save-button" htmlType="submit" disabled={isLoading}>{!postEdited ? 'Save' : 'Update'}</Button>
          <Button className="button cancel-button" onClick={handleCancelEditingPost}>Cancel</Button>
          { isLoading && 'Saving....'}
        </Fragment>
      </div>
    </Form>;
}

export default PostForm;
