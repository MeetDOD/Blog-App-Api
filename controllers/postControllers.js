import mongoose from "mongoose";
import Posts from "../model/posts.js";
import User from "../model/user.js";

export const getAllPosts = async (req,res) => {

    let posts;

    try{
        posts = await Posts.find().populate('user')
        console.log(posts);
    }catch(er){
        return console.log(er);
    }

    if(!posts){
        return res.status(500).json({ message : "Failed to post"})
    }else{
        return res.status(200).json({ posts })
    }
}

export const addPost = async (req,res) => {
    const {title,description,image,location,date,user} = req.body;

    if(!title && title.trim() === "" &&
        !description && description.trim() === "" &&
        !location && location.trim() === "" &&
        !date && !user && !image && image.trim() === ""
    ){
        return res.status(422).json({message : "Invalid data"}) //422 the action could not be processed properly due to invalid data provided.
    }

    //start user with post 

    let ifExistUser;

    try{
        ifExistUser = await User.findById(user);
    }catch(er){
        return console.log(er);
    }

    if(!ifExistUser){
        return res.status(404).json({ message : "No such user exists" });
    }

    //end user with post 

    let post;

    try{
        post = new Posts({title,description,image,location,date : new Date(`${date}`),user});
        const session = await mongoose.startSession(); //creating a single session where post and user are connected.
        session.startTransaction();
        ifExistUser.posts.push(post);
        await ifExistUser.save({ session });
        post = await post.save({ session });
        session.commitTransaction();
    }catch(er){
        return console.log(er);
    }

    if(!post){
        return res.status(500).json({ message : "Internal error"});
    }else{
        return res.status(201).json({post});
    }
}

export const getPostById = async (req,res) => {
    const id = req.params.id;

    let post;

    try{
        post = await Posts.findById(id);
    }catch(er){
        console.log(er)
    }

    if(!post){
        return res.status(404).json({  message : "No Post exist" })
    }else{
        return res.status(200).json({ post })
    }
}

export const updatePost = async (req,res) => {
    
    const id = req.params.id;
    const {title,description,image,location} = req.body;

    if(!title && title.trim() === "" &&
        !description && description.trim() === "" &&
        !location && location.trim() === "" 
         && !image && image.trim() === ""
    ){
        return res.status(422).json({message : "Invalid data"}) //422 the action could not be processed properly due to invalid data provided.
    }

    let post;

    try{
        post = await Posts.findByIdAndUpdate(id,{
            title,
            description,
            image,
            location,
        });
    }catch(er){
        return console.log(er);
    }

    if(!post){
        return res.status(500).json({ message : "Unable to update post" });
    }else{
        return res.status(200).json({ message : "Updated Successfully" });
    }
}

export const deletePost = async (req,res) => {
    
    const id = req.params.id;
    let post;

    try{
        const session = await mongoose.startSession(); //creating a single session where post and user are connected.
        session.startTransaction();
        post = await Posts.findById(id).populate("user");
        post.user.posts.pull(post);
        await post.user.save({session})
        post = await Posts.findByIdAndRemove(id);
        session.commitTransaction();
    }catch(er){
        return console.log(er);
    }

    if(!post){
        return res.status(500).json({ message : "Unable to delete post"});
    }else{
        return res.status(201).json({ message : "Deleted Successfully" });
    }
}