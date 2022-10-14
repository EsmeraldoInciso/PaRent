const { default: mongoose } = require('mongoose');

const ListingSchema = mongoose.Schema({
    postedBy: {
        type: String,
        required:true
    },
    listingName: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reviews:
        [{
            by: {
                type: String,
                default: ""
            },
            review: {
                type: String,
                default: ""
            }
        }]
});

module.exports = mongoose.model('Listing', ListingSchema);