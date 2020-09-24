var express = require('express');
var users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const User = require("../models/User");

users.use(cors())
process.env.SECRET_KEY = 'secret'

//add a new user
users.post('/register', (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  const { name, email, password } = req.body
  if (name == "" || email == "" || password == "") {
    res.json({ error: 'All fields are required' })
  }
  else {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                res.json({ status: user.name + ' registered!' })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          })
        } else {
          res.json({ error: ' user already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
})

//login user
users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          }
          res.json(payload)
        } else {
          res.json({ error: "Incorrect Password" })
        }
      } else {
        res.json({ error: "User does not exist" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//fetch all users
users.get('/', function (req, res) {
  User.find({}, function (err, Users) {
    if (err) {
      return done(err);
    }
    if (Users) {
      console.log("Users count : " + Users.length);
      res.json(Users);
    }
  });
});

module.exports = users;
