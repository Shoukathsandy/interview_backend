import express from "express";
import {auth} from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import { getallmovie, createmovie, getmoviebyid, updatemoviebyid,deletemoviebyid } from "./helper.js";


const router = express.Router();

router.get("/", async function (req, res) {

    const movie = await getallmovie();
    console.log(movie);
    res.send(movie);
})

router.post("/", async function (req, res) {
    const data = req.body;
    console.log(data);
    const result = await createmovie(data);
    res.send(result);
})

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    console.log(req.params);
    const movie = await getmoviebyid(id);
    movie ? res.send(movie) : res.status(404).send("movie not match");
})

router.put("/:id",auth, async function (req, res) {
    const data = req.body;
    const { id } = req.params;
    console.log(data)
    const result = await updatemoviebyid(id, data);
    res.send(result);
})

router.delete("/:id",auth, async function(req,res){
    console.log(req.params); 
    const {id} = req.params;
    const del = await deletemoviebyid(id);
    del.deletedCount>0 ? res.send(del) : res.status(404).send("match not found");
})
export const moviesRouter = router;