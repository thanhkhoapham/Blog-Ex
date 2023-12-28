import express, { Request, Response } from "express";
import mockData from "./dummyData";

const postRoutes = express.Router();

// api/posts - Get all posts
postRoutes.get("/", (req: Request, res: Response) => {
    res.send(mockData.getPostData());
});

// api/posts - Add new post
postRoutes.post("/", (req: Request, res: Response) => {
    const body = {
        ...req.body,
        id: Date.now().toString()
    };
    console.log("Body: ", body);

    res.send(mockData.addNewPostData(body));
});

// api/posts/{id} - Update a post by id
postRoutes.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("Update post has id: ", id);

    const postUpdate = req.body;
    console.log(`New information of post: ${postUpdate}`);

    res.send(mockData.updatePostById(id, postUpdate));
});

// api/posts/id - Delete a post by id
postRoutes.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Should delete a post has id ${id}`);

    res.send(mockData.deletePostById(id));
});

export default postRoutes;
