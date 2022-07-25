import { client } from "../index.js";



export async function createmovie(data) {
    return await client.db("task").collection("movies").
        insertMany(data);
}


export async function getallmovie() {
    return await client.db("task").collection("movies").
        find({}).
        toArray();
}

export async function getmoviebyid(id) {
    return await client.db("task").collection("movies").findOne({ id: id });
}

export async function deletemoviebyid(id) {
    return await client.db("task").collection("movies").deleteOne({ id: id });

}

export async function updatemoviebyid(id, data) {
    return await client.db("task").collection("movies").updateOne({ id: id }, { $set: data });
}

export async function createuser(data) {
    return await client.db("task").
      collection("users").
      insertOne(data);
  }
  export async function getuserbyid(username) {
    return await client.
      db("task").
      collection("users").
      findOne({ username: username });
  }
