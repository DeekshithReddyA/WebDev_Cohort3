import mongoose ,{model , Schema} from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: any = process.env.MONGO_URI

mongoose.connect(mongoURI);

const UserSchema = new Schema({
    username: {type: String , unique: true},
    password: String
});

export const UserModel = model("User", UserSchema);


const ContentSchema = new Schema({
    title : String, 
    link : String ,
    type : String,
    tags : [{type : mongoose.Types.ObjectId , ref : 'Tag'}],
    userId : {type : mongoose.Types.ObjectId , ref: 'User' , required : true}
})

export const ContentModel = model("Content" , ContentSchema);



const LinkSchema = new Schema({
    link : {type : String , required  : true},
    userId : {type : mongoose.Types.ObjectId , ref : 'User' , required : true}
})

export const LinkModel = model("Link" , LinkSchema);

