import { current, PayloadAction, nanoid, createSlice } from "@reduxjs/toolkit"
import { Post } from "types/blog.type"

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  idPostEdited: string | null
}

const initialState: BlogState = {
  postList: [],
  editingPost: null,
  idPostEdited: null
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    },
    editPostById: (state, action: PayloadAction<string>) => {
      state.idPostEdited = action.payload
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    },
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.unshift(post)
      },
      prepare: (post: Omit<Post, "id">) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes("cancel"),
        (state, action) => {
          console.log("rejected the action: ", current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type}`, current(state))
      })
  }
})

export const { addPost, cancelEditingPost, deletePost, finishEditingPost, startEditingPost, editPostById } = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer
