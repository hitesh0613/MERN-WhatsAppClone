import express from "express";
import user from "../model/User.js";
import con from "../model/ConvoScheme.js";
import message from "../model/message.js";

const route = express.Router();

route.post("/add", async (req, res) => {
  try {
    let exist = await user.findOne({ googleId: req.body.googleId });

    if (exist) {
      res.status(200).json("user alredy exist");
      return;
    }

    const newUser = new user(req.body);
    await newUser.save();
  } catch (error) {
    res.status(500).json(error);
  }
});

route.get("/users", async (req, res) => {
  try {
    const getuser = await user.find({});
    res.status(200).json(getuser);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.post("/conv/add", async (req, res) => {
  let sender = req.body.senderId;
  let receiver = req.body.receiverId;
  try {
    const exist = await con.findOne({ members: { $all: [receiver, sender] } });

    if (exist) {
      res.status(200).json("alredy exist");
      return;
    }

    const newconver = new con({
      members: [sender, receiver],
    });

    await newconver.save();
    res.status(200).json("sucess full conn");
  } catch (error) {
    res.status(500).json(error);
  }
});


route.post('/conv/get',async(req,res)=>{
  try {
    const cwp=  await con.findOne({members:{$all:[req.body.sender,req.body.receiver]}})
    res.status(200).json(cwp);
    
  } catch (error) {
    res.status(500).json(error);
  }


})


route.post('/message/add',async(req,res)=>{

 const newmessage =  new message(req.body)
  try {
    await newmessage.save();

    res.status(200).json('message save')
    
  } catch (error) {
    res.status(500).json(error)
    
  }
})


route.get('/message/get/:id',async(req,res)=>{
  try {
   const Mess= await message.find({converId:req.params.id})
   res.status(200).json(Mess)
    
  } catch (error) {
    res.status(500).json(error)
  }
})

export default route;
