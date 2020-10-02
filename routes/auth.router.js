const {Router} = require('express');
const {registerController} = require('../controllers/auth.controllers.js')

const router = Router();

router.get('/register', registerController)

module.exports = router;