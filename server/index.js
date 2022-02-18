import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import route from "./routes/Route.js";
import bodyParser from 'body-parser'

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',route)

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

Connection(username, password);

app.listen(8000, () => {
  console.log(`server running on ${8000}`);
});
