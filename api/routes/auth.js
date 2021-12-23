const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//TODO add delete function

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update User Info
router.put("/updateinfo", async (req, res) => {
  try {
    const username = req.query.username;
    console.log(username);
    const name = req.query.name;
    console.log(name);
    const info = req.query.info;
    console.log(info);
    const user = await User.find({ username });
    await user.updateOne({ $push: { username: username } });
    await user.updateOne({ $push: { name: name } });
    await user.updateOne({ $push: { info: info } });
    res.status(200).json("updated!");
  } catch (err) {
    console.log("error1");
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    // res.status(500).json(err);
  }
});
module.exports = router;
