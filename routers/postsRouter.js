import {Router} from 'express';
import { addPost, getAllPosts, getPostById, updatePost,deletePost } from '../controllers/postControllers.js';

const postRouter = Router();

postRouter.get('/',getAllPosts);
postRouter.get('/:id',getPostById);
postRouter.post('/',addPost);
postRouter.put('/:id',updatePost);
postRouter.delete('/:id',deletePost);

export default postRouter;