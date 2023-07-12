const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Models/userModel");


const registerUser = asyncHandler(async (req,res) => {
     
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("please enter all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("user already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        }); 
    }
    else {
        
        res.status(400);
        throw new Error("user not created");
    }
});



const authUser = asyncHandler(async (req, res) => {
  const {  email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
        token: generateToken(user._id),
        message: "user logined",
    });
  } else {
    res.status(400);
    throw new Error("failed to login");
  }
});


// /api/user/serach?suraj
const allUsers = asyncHandler(async (req, res) => {
    
    const keyword = req.query.search ?
        {
        $or: [
            { name: { $regex: req.query.search, $options:"i" } },
            { email: { $regex: req.query.search, $options:"i" } },
        ] 
    }
        : {}
    
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);

  console.log(keyword);
});

const admin = asyncHandler(async (req, res) => {
   await User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch data from the database" });
    });
});





module.exports = {
  registerUser,
  authUser,
  allUsers,
  admin,
};