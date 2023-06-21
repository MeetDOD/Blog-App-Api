import User from '../model/user.js'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const getAllUser = async (req,res) => {

    let users;

    try{
        users = await User.find();
    }catch(er){
        console.log(er);
    }

    if(!users){
        return res.status(500).json({message : "Internal server error"});
    }else{
        return res.status(200).json({users});
    }
};

export const signup = async (req,res) => {

    const {name,email,password} = req.body;

    if(!name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.length < 3
    ){
        return res.status(422).json({message : "Invalid data"}) //422 the action could not be processed properly due to invalid data provided.
    }

    let user;

    try{
        user = new User({email,name,password : bcrypt.hashSync(password,salt)});
        await user.save();
    }catch(er){
        return console.log(er)
    }

    if(!user){
        return res.status(500).json({ message : "Internal error"});
    }else{
        return res.status(201).json({user});
    }
};

export const loginUser = async (req,res) => {
    const {email,password} = req.body;

    if(!email && email.trim() === "" &&
        !password && password.length < 7
    ){
        return res.status(422).json({message : "Invalid data"}) //422 the action could not be processed properly due to invalid data provided.
    }

    let existsUser;

    try{
        existsUser = await User.findOne({email}); //finding email from mongo collection
    }catch(er){
        return console.log(er)
    }

    if(!existsUser){
        return res.status(404).json({message : "no user found" });
    }

    const isPassCorrect = bcrypt.compareSync(password,existsUser.password);

    if(!isPassCorrect){
        return res.status(400).json({ "message" : "Incorrect password"});
    }else{
        return res.status(200).json({ id : existsUser._id,message : "Login Successfully"})
    }
}

export const getUserProfile = async (req,res) => {
    
    const id = req.params.id;

    let user;
    try{
        user = await User.findById(id).populate('posts');
    }catch(er){
        return console.log(er);
    }

    if(!user){
        return res.status(404).json({ message : "No user found" });
    }

    return res.status(200).json({ user });
}