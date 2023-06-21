import mongoose, { Schema,model } from "mongoose";

const userPostSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId, 
        ref : "User",       //making relation betwwen user and posts
        required : true
    }
});

const Posts = model("Posts",userPostSchema);

export default Posts;