'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users= require('../models/users-model');

module.exports= async (req,res,next)=>{
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    console.log(req.headers.authorization)
    console.log('after pop====>',encodedString)
    let decodedString = base64.decode(encodedString); // "username:password"
    console.log('decodedString ====>',decodedString)
    let [username, password] = decodedString.split(':'); // username, password
    
  
    /*
      Now that we finally have username and password, let's see if it's valid
      1. Find the user in the database by username
      2. Compare the plaintext password we now have against the encrypted password in the db
         - bcrypt does this by re-encrypting the plaintext password and comparing THAT
      3. Either we're valid or we throw an error
    */
    try {
      const user = await Users.findOne({ username: username });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
          req.user=user;
        next();
      }
      else {
        next('Invalid User')
      }
    } catch (error) { res.status(403).send("Invalid Login"); }
}