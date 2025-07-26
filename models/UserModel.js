const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true, 
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        validate: {
            validator: function (v) {
              
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true, 
        minlength: 6, 
    },
    profilePic: {
        type: String,
        default: '', 
    },
    role: {
        type: String,
        default: 'GENERAL', 
    },
}, {
    timestamps: true, 
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
