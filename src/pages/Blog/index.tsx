import React, { useState } from "react"
import PostList from "../../components/PostList"
import { Button, Modal } from "antd"
import "./styles.scss"
import { Post } from "types/blog.type"
import PostForm from "components/PostForm"
import TypingAnimation from "components/TypingAnimation"

const initialState: Post = {
  description: "",
  featuredImage: "",
  publishDate: "",
  published: false,
  title: "",
  id: ""
}

const buttonStyles: React.CSSProperties = {
 ["--clr" as keyof React.CSSProperties]: "#1e9bff"
}

const Blog = (): React.ReactElement => {
  const [open, setOpen] = useState(false)

  const showModal = () => setOpen(true)
  const handleCancel = () => setOpen(false)

  return <div className='blog-wrapper'>
      <div className="content">
        <h2 className="text">
          <p>"Thanh xuân như 1 tách trà, sống không cà khịa là trà mất ngon."</p><span className="khoa">- Khoa Bug</span>
        </h2>
        <TypingAnimation />
      </div>

      <Button className='button-wrapper' style={buttonStyles} onClick={showModal}>
        <span className="text">New Blog</span>
      </Button>
      <PostList />

      <Modal title='Add new Blog' open={open} onCancel={handleCancel} footer={false}>
        <PostForm data={initialState} onClose={handleCancel} />
      </Modal>
    </div>;
}

export default Blog
