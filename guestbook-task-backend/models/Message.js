const mongoose = require("mongoose");
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    sender: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
});

module.exports = Message = mongoose.model('messages', MessageSchema)