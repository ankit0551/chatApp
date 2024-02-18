const User = require("../models/User");


module.exports.getUsers = async (req, res) => {
    try{
        const luser = req.user._id;

        const allUser = await User.find({_id : {$ne: luser}}).select("-password");

        res.status(200).json(allUser);
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
}