const express = require('express');
const { default: mongoose } = require('mongoose');
const path =  require('path');
const methodOverride = require('method-override');
const Listing = require('./models/Listing');
const app = express();
const port = 3000;

require('dotenv/config');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/images')));

app.use('/listings', require('./routes/listingRoutes'));
app.use('/accounts', require('./routes/accountRoutes'));
app.use('/profile', require('./routes/profileRoutes'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

mongoose.connect(process.env.DB_CONNECTION).then(() =>{
// mongoose.connect("mongodb://localhost:27017/PaRenta").then(() =>{
    console.log('Connected');
}).catch(e =>{
    console.log(e);
})

app.get('/', async (req,res)=>{
    const listings = await Listing.find({}).sort({date: -1});
    res.render('home', {listings});
})
app.get('/home',async (req,res)=>{
    const listings = await Listing.find({});
    res.render('home', {listings});
})

app.get('*',(req,res)=>{
    const {goTo} = req.params;
    res.render('not-found', {goTo});
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`)
})