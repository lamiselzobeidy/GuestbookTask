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
        res.json({ status: 'Message added!' })
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

messages.get('/fetchmessage', (req, res) => {
  console.log(req.body)
  const id = req.body.id
  console.log(id);
  Message.findOne({ id: id }).then(message => {
    if(message) {
      res.json(message)
    }
    else{
      res.json('helo no')

    }
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

messages.post('/addreply', (req, res) => {
  const replyData = {
    msgid: req.body.msgid,
    id: req.body.id,
    sender: req.body.sender,
    text: req.body.text
  }
  if (replyData.text == "") {
    res.json({ error: 'You didnt enter a reply' })
  }
  else {
    Message.findOne({ id: replyData.msgid }).then(message => {
      if(message) {
        res.json(message)
        // var replyarray = [];
        message.replies.push({id:replyData.id,sender:replyData.sender,text:replyData.text})
        console.log(message.replies)
        Message.findOneAndUpdate({ id: replyData.msgid }, {$set:{ replies : message.replies }}, (err, messages) => {
          res.json(messages);
        })
      }
      else{
        res.json('helo no')
  
      }
    })
    // Message.findOneAndUpdate({query: { id: msgid },
    // sort: { cno: 1 }, update:{replies}
    // })
  }
  
  
})

module.exports = messages;

