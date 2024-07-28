const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Importing the User model
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")

var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"



router.post('/createuser', [
    body('email').isEmail(),
    body('password',"INCORRECT PASSWORD BRO").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt= await bcrypt.genSalt(10);
        let secpassword= await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name: req.body.name,
            location:req.body.location,
            email: req.body.email,
            password: secpassword ,
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})


// login the user here 


router.post('/loginuser', [
    body('email').isEmail(),
    body('password',"incorrect password").isLength({ min: 5 })], async (req, res) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // let password=req.body.password

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try logging x in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });


module.exports=router