import express from "express";
import { getallmovie, createmovie, getmoviebyid, updatemoviebyid } from "./helper.js";


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

router.put("/:id", async function (req, res) {
    const data = req.body;
    const { id } = req.params;
    console.log(data)
    const result = await updatemoviebyid(id, data);
    res.send(result);
})
export const moviesRouter = router;