'use strict';

const express = require('express');
const Users= require('./models/users-model');
const basicAuth = require('./middleware/basic')

const router = express.Router();


router.post('/signup', async (req, res) => {

    try {
      // req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new Users(req.body);
      const record = await user.save(req.body);
      res.status(201).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
  });


  router.post('/signin',basicAuth, async (req, res) => {

    /*
      req.headers.authorization is : "Basic sdkjdsljd="
      To get username and password from this, take the following steps:
        - Turn that string into an array by splitting on ' '
        - Pop off the last value
        - Decode that encoded string so it returns to user:pass
        - Split on ':' to turn it into an array
        - Pull username and password from that array
    */
  

    // const user = await Users.findOne({ username: username });
       res.status(200).json(req.user);
  
   
  
  });

  module.exports= router;
