const express = require('express');
const router = express.Router();
const opencage = require('opencage-api-client');
const Listing = require('../models/Listing');


router.get('/',async(req,res)=>{
    if(accountID){
        const foundListing = await Listing.find({postedBy : accountID.username}).sort({date: -1});
        res.render('profile',{listings:foundListing});
    }else{
        res.redirect('/');
    }
    
})
router.get('/listings/:id/edit', async(req,res)=>{
    if(accountID){
        const {id} = req.params;
        // const listing = listings.find(t=> t.id === (id));
        // console.log(listings.find(t=> t.id === (id)));
        const foundListing = await Listing.findOne({_id : id});
        res.render('edit-listing', {listing: foundListing});
    }else{
        res.redirect('/');
    }
    
})

router.post('/add-listing', async(req,res)=>{
    const {listingName, description, address} = req.body;
    // const postedBy = "Don inciso";
    // listings.push({id : 6 ,postedBy:postedBy,listingName,description, address});
    if(listingName && description && address){
        const newListing = new Listing({
            postedBy: accountID.username, 
            listingName: listingName,
            description: description,
            address:address
        });
        newListing.save();
        res.redirect('/profile');
    }else{
        res.render('add-listing');
    }
})

router.patch('/listings/:listing',(req,res)=>{
    const {listing} = req.params;
    const {listingName, description, address} = req.body;
    if(listingName && description && address){
        Listing.findOneAndUpdate({_id:listing},{$set: {listingName:listingName, description:description,address:address}}, {new: true}).then(l =>{
            console.log(l);
        }).catch(e =>{
            console.log(e);
        });;
    }
    res.redirect('/profile');
})

router.patch('/listings/:listing/add-review',(req,res)=>{
    const {listing} = req.params;
    const by = accountID.username;
    const {review} = req.body;

    console.log(listing);
    console.log(by);
    console.log(review);
    Listing.findOneAndUpdate({_id:listing},{$push: {reviews: {by:by, review:review}}}, {new: true, multi: true}).then(l =>{
        console.log(l);
    }).catch(e =>{
        console.log(e);
    });
    res.redirect(`/listings/${listing}`);
})

router.delete('/listings/:listing',(req,res)=>{
    const {listing} = req.params;
    Listing.findOneAndDelete({_id:listing}).then(l =>{
        console.log(l);
    }).catch(e =>{
        console.log(e);
    });
    // listings = listings.filter(t=> t.id != (listing));
    // console.log(req.body);
    res.redirect('/profile');
})



router.get('/add-listing',(req,res)=>{
    if(accountID){
        res.render('add-listing');
    }else{
        res.redirect('/');
    }
})

router.get('/listings/:listing', async(req,res)=>{
    try {
        if(accountID){
            const {listing} = req.params;
            const foundListing = await Listing.findOne({_id : listing});
            if(foundListing){
                opencage
                .geocode({ q: foundListing.address })
                .then((data) => {
                    if (data.results.length > 0) {
                        const place = data.results[0];
                        res.render('view', {listing:foundListing, latlng: place.geometry });
                    }
                })
                .catch((error) => {
                    console.log('Error', error.message);
                    if (error.status.code === 402) {
                        console.log('hit free trial daily limit');
                    }
                }); 
            }else{
                const {goTo} = req.params.listing;
                res.render('not-found', {goTo});
            }
        }else{
            res.redirect('/');
        }
        
    } catch (error) {
        const {goTo} = req.params;
        res.render('not-found', {goTo});
    }
    
})

module.exports = router;