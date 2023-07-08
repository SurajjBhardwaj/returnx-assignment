const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel"); 
const User = require("../Models/userModel");

const accessChat = asyncHandler(async (req,res) => {
    

    const { userID } = req.body
    if (!userID) {
        console.log("user id is not sent with the request");
        return res.status(400);
    }
    else {
        
        var isChat = await Chat.find({
          isGroupChat: false,
          $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: req.userID } } },
          ],
        })
          .populate("users", "-password")
            .populate("latestMessage")
        
        isChat = await User.populate(isChat, {
            path: "latestMessage",
            select: "name,pic,email"
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        }
        else {
            var chatData = {
              chatname: "sender",
              isGroupChat: false,
              users: [req.user._id, userID],
            };

            try {
                
                const createChat = await Chat.create(chatData);
                const fullChat = await Chat.findOne({
                  _id: createChat._id,
                }).populate("users", "-password");

                res.status(200).send(fullChat);
            } catch (error) {
                
                res.status(400);
                throw new Error(error.message);
            }






        }


    }

});

const fetchChats = asyncHandler(async (req, res) => {

    try {
        
        await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
        
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "name,pic,email",
                });

                res.status(200).send(result);
            })
    } catch (error) {
        console.log(error.message);
        res.status(400);
        throw new Error(error.message);
    }
    

});

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        res.status(400).send({ message: "please fill alll the fields" });
    }

    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send({ message: "two or more users is required to crete a group" });
    }

    users.push(req.user);

    try {
        
        const groupchat = await Chat.create({
            chatname: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupchat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        
        res.status(200).send(fullGroupChat);
    } catch (error) {
        
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroup = asyncHandler(async (req, res) => {
   
    const { chatId, chatname } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        chatname
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        console.log(error);
        throw new Error("chat not found");
    }
    else {
        
        res.status(200).json({
            status: 'success',
            data: {
                data: updatedChat
            }
        });
    }
});


const addToGroup = asyncHandler(async (req, res) => {
    
    const { chatId, userId } = req.body;
    const updated = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (updated) {
        res.status(200).json(updated);
    } else {
        res.status(400);
        throw new Error("chat not found");
    }
});

const removeFromGroup = asyncHandler(async (req, res) => {
    
    const { chatId, userId } = req.body;
    const remove = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (remove) {
      res.status(200).json(remove);
    } else {
      res.status(400);
      throw new Error("chat not found");
    }
})


module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};