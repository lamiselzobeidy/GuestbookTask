var express = require('express');
var messages = express.Router();
const cors = require("cors");

const Message = require("../models/Message");
messages.use(cors())

process.env.SECRET_KEY = 'secret'

messages.post('/addmessage', (req, res) => {
  const messageData = {
    id: req.body.id,
    sender: req.body.sender,
    text: req.body.text
  }
  const { id, text } = req.body
  if (text == "") {
    res.json({ error: 'You didnt enter a message' })
  }
  else {
    Message.create(messageData)
      .then(message => {
        res.json({ status: message.text + ' added!' })
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
})

messages.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    res.json(messages);
  })
})

messages.post('/fetchmessage', (req, res) => {
  const messageData = {
    id: req.body.id,
    text: req.body.text
  }
  const { id, text } = req.body
  console.log(id);
  Message.findOne({ 'id': id }).then(messages => {
    res.json(messages);
  })
})

messages.post('/deletemessage', (req, res) => {
  const messageData = {
    id: req.body.id,
    text: req.body.text
  }
  const { id, text } = req.body
  console.log(id);
  Message.findOneAndDelete({ 'id': id }, (err, messages) => {
    res.json(messages);
  })
})

messages.post('/editmessage', (req, res) => {
  const messageData = {
    id: req.body.id,
    text: req.body.text
  }
  const { id, text } = req.body
  console.log(id);
  Message.findOneAndUpdate({ 'id': id }, { 'text': text }, (err, messages) => {
    res.json(messages);
  })
})

module.exports = messages;

