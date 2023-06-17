import mongoose from 'mongoose'

// Define the Person schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastActiveTime: {
        type: Date,
        default: Date.now
    }
});

// Create the Person model
const User = mongoose.model('Person', UserSchema);

export default User
