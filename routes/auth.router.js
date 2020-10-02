const {Router} = require('express');
const {registerController} = require('../controllers/auth.controllers.js')

const router = Router();

router.post('/register', registerController)

module.exports = router;