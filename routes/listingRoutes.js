const express = require('express');
const app = express();
const router = express.Router();
const path =  require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

router.get('/',(req,res)=>{
    res.redirect('/home');
    // res.render('home', {listings});
})


router.get('/:listing',(req,res)=>{
    try {
        const {listing} = req.params;
        const foundListing = listings.find(f=> f.id==(listing));
        if(foundListing){
            res.render('view', {listing:foundListing});
        }else{
            const {goTo} = req.params.listing;
            res.render('not-found', {goTo});
        }
        
    } catch (error) {
        const {goTo} = req.params;
        res.render('not-found', {goTo});
    }
    
})



module.exports = router;