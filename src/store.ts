import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "pages/Blog/blog.slice"
import formReducer from "pages/Blog/postForm.slice"
import { appApi } from "services/posts"

export const store = configureStore({
  reducer: {
    form: formReducer,
    // blog: blogReducer,
    // Add the generated reducer as a specific top-level slice
    [appApi.reducerPath]: appApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
