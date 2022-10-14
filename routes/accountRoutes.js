const express = require('express');
const router = express.Router();
const User = require('../models/User');

global.accountID = "";

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    accountID = await User.findOne({username: username, password:password});
    console.log(accountID);
    if(accountID){
        res.redirect('/');
    }else{
        res.redirect('/accounts/login');
    }
    
})

router.post('/logout', async (req,res)=>{
    accountID = null;
    res.redirect('/');
})

router.get('/sign-up',(req,res)=>{
    res.render('sign-up');
})

router.post('/sign-up', async (req,res)=>{
    const {username, password, confirmPassword} = req.body;
    if(password == confirmPassword && username && password && confirmPassword){
        const newUser = new User({
            username: username,
            password: password
        });
        newUser.save();
        res.redirect('/accounts/login');
    }else{
        res.redirect('/accounts/sign-up');
    }
})
module.exports = router;