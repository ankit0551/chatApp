const {Router} = require('express');
const router = Router();
const {getUsers} = require('../controllers/userController');
const { isLogined } = require('../middlewares/authMiddleware');


router.get('/getAllUsers',isLogined, getUsers);



module.exports = router;