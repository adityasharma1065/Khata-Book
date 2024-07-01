const mongoose=require('mongoose');


var userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true ,// Trims whitespace from both ends of the string
        minlength:3,
        
    },
    username: {
        type: String,
        required: true, // Username is required
        unique: true, // Username must be unique
        trim: true, // Trims whitespace from both ends of the string
        minlength: 3 // Minimum length for the username
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Email must be unique
        trim: true, // Trims whitespace from both ends of the string
        // match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation regex
    },
    password: {
        type: String,
        required: true, // Password is required
        minlength: 6, // Minimum length for the password
        
    },
    hisaabID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hisaab' // References the Khata model
    }]
})

module.exports=mongoose.model("user",userSchema)