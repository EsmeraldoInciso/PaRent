const express = require('express');
const { default: mongoose } = require('mongoose');
const path =  require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

require('dotenv/config');


app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/listings', require('./routes/listingRoutes'));
app.use('/accounts', require('./routes/accountRoutes'));
app.use('/profile', require('./routes/profileRoutes'));

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/images')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));


global.listings =[
    {
        id: 1,
        postedBy: "Don Inciso",
        listingName: "Listing 1",
        description: "This is the first listing.",
        address: "Davao City"
    },
    {
        id: 2,
        postedBy: "Don Inciso",
        listingName: "Listing 2",
        description: "This is the second listing.",
        address: "Davao City"
    },
    {
        id: 3,
        postedBy: "Don Inciso",
        listingName: "Listing 3",
        description: "This is the third listing.",
        address: "Davao City"
    },
    {
        id: 4,
        postedBy: "Don Inciso",
        listingName: "Listing 4",
        description: "This is the fourth listing.",
        address: "Davao City"
    },
    {
        id: 5,
        postedBy: "Don Inciso",
        listingName: "Listing 5",
        description: "This is the fifth listing.",
        address: "Davao City"
    },
]


app.get('/',(req,res)=>{
    res.render('home', {listings});
})
app.get('/home',(req,res)=>{
    res.render('home', {listings});
})



mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('connected to db')
})
app.get('*',(req,res)=>{
    const {goTo} = req.params;
    res.render('not-found', {goTo});
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`)
})