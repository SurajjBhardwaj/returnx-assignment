const mongoose = require("mongoose");


const chatModel = mongoose.Schema({
  chatname: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: 0 },
  users: [
    {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
      type: mongoose.Schema.Type.ObjectId,
      ref:'User',
  }, 
},{timestamp:true});


const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;


//chatname
//isgroutpchat
//users
//latest messeges
//admin
