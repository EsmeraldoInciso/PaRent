const express = require('express');
const router = express.Router();
const opencage = require('opencage-api-client');
const Listing = require('../models/Listing');


router.get('/:listing', async(req,res)=>{
    try {
        const {listing} = req.params;

        const foundListing = await Listing.findOne({_id : listing});
        // console.log(foundListing);
        // const foundListing = listings.find(f=> f.id==(listing));
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
        
    } catch (error) {
        const {goTo} = req.params;
        console.log(error);
        res.render('not-found', {goTo});
    }
    
})
module.exports = router;