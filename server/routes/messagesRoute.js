const {Router} = require('express');
const router = Router();
const {sendMessage, getMessages} = require('../controllers/messagesController');
const {isLogined} = require('../middlewares/authMiddleware');

router.post('/send/:id', isLogined, sendMessage);
router.get('/get/:id', isLogined, getMessages);



module.exports = router;