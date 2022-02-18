
import mongoose  from "mongoose";

const  ConvoScheme =new mongoose.Schema( {
    members:{
        type:Array
    }},
    {
        timestamps:true
    }

)

const con=mongoose.model('conv',ConvoScheme)

export default con