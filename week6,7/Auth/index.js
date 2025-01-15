const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const {z} = require("zod");

mongoose.connect("");

const { UserModel, TodoModel } = require('./db');

const JWT_SECRET = "Mawa";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email : z.string().email(),
        name : z.string().max(50),
        password : z.string().max(30)
    });
    // const parsedData = requiredBody.parse(req.body);
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success ){
        res.json({
            message : "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password , 5 )
    try {

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
        res.json({
            message: "You are signed in"
        })
    } catch (err) {
        console.log(err);
    }
})


app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({email});

    if(!user){
        res.status(403).json({
            message: "User doesn't exist in out db"
        });
        return;
    }

    const passwordMatch = await bcrypt.compare(password , user.password);

    if(passwordMatch){
        const token = jwt.sign({id : user._id.toString()} , JWT_SECRET);
        res.json({
            token: token
        });
    } else{
        res.json({
            message :"Incorrect creds"
        });
    }
})

const auth = (req, res, next) => {
    let token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.id) {
        req.userId = decodedData.id;
        next();
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.post("/todo", auth, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;

    TodoModel.create({
        title,
        done: false,
        userId : userId
    })

    res.json({
        userId: userId
    })
});

app.get("/todos" , auth , async (req, res) => {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId : userId
    });
    res.json({
        todos
    })
})

app.listen(4000);