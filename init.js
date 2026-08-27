const mongoose = require("mongoose");
const Post = require("./models/schema.js");
const mongoDB_URI ="mongodb://127.0.0.1:27017/dailyPosts";


main()
    .then(()=>{
    console.log("Connect DB Successful!")
    })
    .catch((err)=>{
    console.log(err)
    })

async function main(){
    await mongoose.connect(mongoDB_URI)
}


let allPosts = [
    {
        username: "asad",
        content: "i love coding."
    },
    {
        username: "adil",
        content: "I am a electrition"
    },
    {
        username: "ahad",
        content: "please help us with money!"
    }
]; 

Post.insertMany(allPosts);

