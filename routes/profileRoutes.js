const express = require('express');
const app = express();
const router = express.Router();
const path =  require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
global.sample = () =>{
    console.log('function');
}


router.get('/',(req,res)=>{
    res.render('profile',{listings});
})
router.get('/listings/:id/edit',(req,res)=>{
    const {id} = req.params;
    const listing = listings.find(t=> t.id === (id));
    console.log(listings.find(t=> t.id === (id)));
    // res.render('edit-listing', {listing: listing});
})

router.post('/add-listing',(req,res)=>{
    const {listingName, description, address} = req.body;
    const postedBy = "Don inciso";
    listings.push({id : 6 ,postedBy:postedBy,listingName,description, address});
    console.log(req.body);
    res.redirect('/profile');
})
router.patch('/listings/:listing',(req,res)=>{
    const {listing} = req.params;
    const newListingName = req.body.listingName;
    let foundListing = listings.find(t=> t.id === (listing));
    foundListing.listingName = newListingName;
    res.redirect('/profile');
})
router.delete('/listings/:listing',(req,res)=>{
    const {listing} = req.params;
    listings = listings.filter(t=> t.id != (listing));
    console.log(req.body);
    res.redirect('/profile');
})



router.get('/add-listing',(req,res)=>{
    res.render('add-listing');
})

router.get('/listings/:listing',(req,res)=>{
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

// router.get('/:account',(req,res)=>{
//     const {account} = req.params;
//     // res.send(account);
//     res.render('profile', {account});
// })



module.exports = router;