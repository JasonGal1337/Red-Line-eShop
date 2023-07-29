const Admin = require("../modules/admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req,res) => {
    const checkAdmin = await Admin.findOne ({ email: req.body.email });
    if (checkAdmin) {
        res.send({ msg: "email already exists" });
        return;
    };
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            const admin = { email: req.body.email, password: hash, username: req.body.username, isAdmin: req.body.isAdmin };
            const createdAdmin = await Admin.create(admin);
            const token = jwt.sign({ id: createdAdmin._id }, "difficultPrivateKey");
            res.send({ token });
        });
    });
};

const login = async (req, res) => {
    try {
      const admin = await Admin.findOne({ username: req.body.username });
  
      if (admin) {
        const result = await bcrypt.compare(req.body.password, admin.password);
  
        if (result && admin.isAdmin === true) {
          // Passwords match, send the token
          const token = jwt.sign({ id: admin._id }, "difficultPrivateKey");
          res.send({ token });
        } else {
          res.send({ msg: "wrong password or isAdmin" });
        }
      } else {
        // Admin not found
        res.send({ msg: "wrong username" });
      }
    } catch (err) {
      res.status(500).send({ msg: "Server error" });
    }
  };

const verify = async (req,res) => {
    if (!req.body.token) {
        res.send({ msg: false });
    } 
    // decrypt and get back the admin id 
    try {
        const payload = jwt.verify(req.body.token, "difficultPrivateKey");
        if (payload) {
            const admin = await Admin.findOne({ _id: payload.id });
            if(admin) {
                const token = jwt.sign({ _id: admin._id }, "difficultPrivateKey"); 
                res.send ({
                    adminData: admin,
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
    verify,
  };