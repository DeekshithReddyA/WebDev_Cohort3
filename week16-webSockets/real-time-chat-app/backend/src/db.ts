import mongoose , {model , Schema} from 'mongoose';
import 'dotenv/config';


const mongoURI: any = process.env.MONGO_URI;



mongoose.connect(mongoURI)
        .then(() => console.log("connected to mongoDB"));


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  profilePicture: {
    type : {
          data : Buffer,
          contentType: String
        },
    required : true},
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rooms" }] // List of joined rooms
}, { timestamps: true });



const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true }, // Room id
  name : { type : String , required : true}, // Room name,
  roomPicture: {
    type : {
        data : Buffer,
        contentType : String
      },
   required : true},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Users in the room
}, { timestamps: true });


const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who sent the message
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms", required: true }, // Room the message belongs to
  text: { type: String, required: true }, // Message text
  timestamp: { type: Date, default: Date.now }
});




export const MessageModel = model("Message", MessageSchema);
export const RoomModel = model("Rooms" , RoomSchema);
export const UserModel = model("User" , UserSchema);



