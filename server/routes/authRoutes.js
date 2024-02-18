const {Router} = require('express');
const router = Router();
const { signupUser, loginUser, logutUser } = require('../controllers/authController');
const {isLogined} = require('../middlewares/authMiddleware');


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout',isLogined, logutUser);
 

module.exports = router;