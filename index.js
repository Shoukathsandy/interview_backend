import  express  from "express";
import { MongoClient } from "mongodb";
import {moviesRouter} from "./routes/movies.js";
import {userRouter} from "./routes/users.js"
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
const app= express();
app.use(cors());
const PORT=process.env.PORT;
// app.use(cors());
app.use(express.json());
const MONGO_URL= process.env.MONGO_URL;
app.get("/", function(req,res){
res.send("this home page created")
});
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connected successfully");
    return client;
}
export const client = await createConnection();

app.use("/movies",moviesRouter);
app.use("/users",userRouter)
app.listen(PORT,()=>console.log(`APP STARTED IN ${PORT}`));