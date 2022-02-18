import mongoose from "mongoose";


const Connection = async (username,password) => {
  const URL =
    `mongodb://${username}:${password}@chatbox-shard-00-00.upyzz.mongodb.net:27017,chatbox-shard-00-01.upyzz.mongodb.net:27017,chatbox-shard-00-02.upyzz.mongodb.net:27017/WPCLONE?ssl=true&replicaSet=atlas-x93bqw-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
       await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    //   useCreatendex: true, 
    //   useFindAndModify: false,
  });
    console.log('connected sucessfully');
  } catch (error) {
    console.log(error);
  }
};

export default Connection;
