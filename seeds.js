const { default: mongoose } = require('mongoose');
const Listing = require('./models/Listing');
const User = require('./models/User');

require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION).then(() =>{
    // mongoose.connect("mongodb://localhost:27017/PaRenta").then(() =>{
    console.log('Connected');
}).catch(e =>{
    console.log(e);
})

User.insertMany([
    {
        username: 'User01',
        password: '123'
    },
    {
        username: 'Don',
        password: '123'
    },
]).then(u =>{
    console.log(u);
}).catch(e =>{
    console.log(e);
})


Listing.insertMany([
    {
        postedBy: 'User01',
        listingName: 'Listing 01',
        description: 'Description of Listing 01',
        address: 'Pampanga, Davao City',
        reviews: [{by:"Don",review:"Sample Review"},{by:"Don",review:"Nice Listing"}]
    },
    {
        postedBy: 'Don',
        listingName: "Don's Apartment",
        description: "Description of Don's Apartment",
        address: 'Lanang, Davao City'
    },
    {
        postedBy: 'Don',
        listingName: 'Sample Listing',
        description: 'Description of Sample Listing',
        address: 'Talomo, Davao City',
        reviews: [{by:"User01",review:"Hello."}]
    }
]).then(l =>{
    console.log(l);
}).catch(e =>{
    console.log(e);
})
