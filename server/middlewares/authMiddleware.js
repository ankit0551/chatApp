const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.isLogined = async (req, res, next) => {
    try{
        let token = req.cookies['token'];
        console.log(token);
        if(!token){
            return res.json({error : "not found"});
        }
        const isValid = jwt.verify(token, "secret");
        if(!isValid){
            return res.status(401).json({error: "unauthorized"});
        }
        const user = await User.findById(isValid.userId).select("-password");
        req.user = user;
        next();
    }catch(error){
        console.log(error);
    }
}