const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const signupUser = async (req, res) => {
try{

    const {fullName, username, email, password, confirmPassword, gender} = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({"error" : "password don't match"});
    }

    const user = await User.findOne({username});
    if(user){
        return res.status(400).json({"error": "username already registred"});
    }

    let salt = await bcryptjs.genSalt(8);
    const hashedPassword = await bcryptjs.hash(password, salt);

    let profilePic = `https://avatar.iran.liara.run/public/${username}`;
    let newUser = await User.create({fullName, username, email, password : hashedPassword, gender, profilePic});

    let token = jwt.sign({userId : newUser._id,}, "secret", {expiresIn : '15d'} );
    
    res.cookie("token", token,{maAge: 15 * 24 * 60* 60 * 1000, httpOnly: true});
    res.status(201).json(newUser);



}catch(error){
    res.status(400).json({"error" : error.message});
}
}
const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error : "user not found"});
        }
        const isSame = await bcryptjs.compare(password, user.password);
        if(!isSame){
            return res.status(400).json({error : "wrong cardentials"});
        }
        let token = jwt.sign({userId : user._id,}, "secret", {expiresIn : '15d'} );
    
        res.cookie("token", token,{maAge: 15 * 24 * 60* 60 * 1000, httpOnly: true});
        res.json({success: "login successfully"})
    }catch(error){
        res.status(400).json({error : "something went wrong"});
    }
    
}
const logutUser = (req, res) => {
    res.clearCookie("token");
    res.json({message : "logout successfully"});
    res.end();
}


module.exports = {
    loginUser, signupUser, logutUser,
}
