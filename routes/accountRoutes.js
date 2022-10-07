const express = require('express');
const app = express();
const router = express.Router();
const path =  require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/sign-up',(req,res)=>{
    res.render('sign-up');
})


module.exports = router;