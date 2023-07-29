const User = require("../modules/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      res.send({ msg: "email already exists" });
      return;
    }
  
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        res.status(500).send({ msg: "Server error" });
        return;
      }
  
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Server error" });
          return;
        }
  
        const user = {
          email: req.body.email,
          password: hash,
          name: req.body.name,
          surname: req.body.surname,
          address: req.body.address,
          zip: req.body.zip,
          addedToCart: req.body.addedToCart,
          boughtBefore: req.body.boughtBefore,
        };
  
        const createdUser = await User.create(user);
        const token = jwt.sign({ id: createdUser._id }, "difficultPrivateKey");
        res.send({ token });
      });
    });
  };

  const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          res.status(500).send({ msg: "Server error" });
        } else {
          if (result) {
            // Passwords match, send the token
            const token = jwt.sign({ id: user._id }, "difficultPrivateKey");
            res.send({ token });
          } else {
            res.send({ msg: "wrong password" });
          }
        }
      });
    } else {
      // User not found
      res.send({ msg: "wrong email" });
    }
  };

const verify = async (req,res) => {
    if (!req.body.token) {
        res.send({ msg: false });
    } 
    // decrypt and get back the user id 
    try {
        const payload = jwt.verify(req.body.token, "difficultPrivateKey");
        if (payload) {
            const user = await User.findOne({ _id: payload.id });
            if(user) {
                const token = jwt.sign({ _id: user._id }, "difficultPrivateKey"); 
                res.send ({
                    userData: user,
                    token: token,
                });
            } else {
                res.send("Invalid Token");
            } 
        } else {
            res.send("Invalid Token");
        }
    } catch(err) {
        res.send("Invalid Token");
    }
};

module.exports = {
    signup,
    login,
    verify
}