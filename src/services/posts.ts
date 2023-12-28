import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "types/blog.type";

export const appApi = createApi({
    // The cache reducer expects to be added at `state.appApi`
    reducerPath: "appApi",
    
    // all of requests will have URLs starting with http://localhost:8080/api
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    tagTypes: ["postsApi"],

    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({

        // The `getPosts` endpoint is a "query" operation that returns data
        getPosts: builder.query<Post[], void>({

            // The URL for the request is 'http://localhost:8080/api/posts'
            query: () => "/posts",
            providesTags: ["postsApi"],
        }),

        // mutation which send an update to the server
        createNewPost: builder.mutation<Post[], Post>({
            query: (post: Post) => ({
                url: "/posts",
                method: "POST",
                body: post
            }),
            invalidatesTags: ["postsApi"],
        }),
        updatePostById: builder.mutation<Post[], Post>({
            query: (post: Post) => ({
                url: `/posts/${post.id}`,
                method: "PUT",
                body: post
            }),
            invalidatesTags: ["postsApi"],
        }),
        deletePostById: builder.mutation<Post[], string>({
            query: (id: string) => ({
                url: `/posts/${id}`,
                method: "DELETE"
            })
        })
    })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useCreateNewPostMutation, useUpdatePostByIdMutation, useDeletePostByIdMutation } = appApi;
