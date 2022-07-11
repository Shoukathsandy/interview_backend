import express from "express";
import {  getuserbyid, createuser,  } from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router= express.Router();


async function genhashpassword(password){
    // bcrypt.gensalt(no.of.rounds)
    const salt= await bcrypt.genSalt(10);
    // console.log("salt", salt);
    const hashedpassword= await bcrypt.hash(password,salt);
    // console.log("hashedpassword",hashedpassword);
    return hashedpassword;
    }
  

  router.post("/signup", async function(req,res){
    const {username,password}=req.body;
    const hashedpassword= await genhashpassword(password);
    const isexistuser= await getuserbyid(username);
    console.log(hashedpassword,isexistuser);
    if(isexistuser){
        res.status(404).send("choose another user name.");
    }else{
        // allow to create user.
   const result = await createuser({username:username,password:hashedpassword});
    console.log(result);
//   const result=await createnewmovie(data);
  res.send(isexistuser);
    }

  });

  router.post("/login", async function(req,res){
    const {username,password}=req.body;
    const userfromdb= await getuserbyid(username);
    console.log(userfromdb);
    if(!userfromdb){
       res.status(401).send("invalid password or loginid");
    }
    else{
        const storeddbpassword=  userfromdb.password;
        const ispasswordmatch = await bcrypt.compare(password,storeddbpassword);
        console.log(ispasswordmatch);
        if(ispasswordmatch){
           const token = jwt.sign({id:userfromdb._id},process.env.SECRET_KEY);
            res.send({msg:"successfull login" ,token:token});
        }
        else{
            res.status(401).send("invalid password or loginid");
        }
    }
});
  export const userRouter = router;