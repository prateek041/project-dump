const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    storeName: {
        type: String,
        require: [true, 'Please add a store name'],
        unique: true,
        trim: true,
        maxlength: [20, 'Store ID must be less than 10 characters']
    },
    number:{
        type: Number,
        require: [true, 'Please add a phone number'],
    },
    coordinates: {
        type: Array,
    },
})

// geocode and create location

module.exports = mongoose.model('StoreSchema', StoreSchema)