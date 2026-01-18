const express= require('express');
const {signUpUserController, LoginUserController} = require('../controller/user.controller')

const router= express();

router.post('/signup', signUpUserController)
router.post('/login', LoginUserController)

module.exports= router