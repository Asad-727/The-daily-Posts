// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override")

// const Post = require("./models/schema.js");

// const app = express();
// const port = 3002;
// const mongoDB_URI = "mongodb://127.0.0.1:27017/dailyPosts";

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));

// main()
//     .then(()=>{
//     console.log("Connect DB Successful!")
//     })
//     .catch((err)=>{
//     console.log(err)
//     })
// async function main(){
//     await mongoose.connect(mongoDB_URI)
// }

// // Home
// app.get("/posts", async (req, res)=>{
//     let posts = await Post.find()
//     res.render("home", {posts})
    
// })

// //New
// app.get("/posts/new", (req, res)=>{
//     res.render("new.ejs")
// });

// // create route
// app.post("/post", (req, res)=>{
//     let {username, content} = req.body;
//     let newPost = new Post({
//         username: username,
//         content: content
//     })


//     newPost
//     .save()
//     // .them((res)=>{
//     //     console.log(res)
//     // }).catch((err)=>{
//     //     console.log("newBook error!", err)
//     // })
//     res.redirect("/Posts")
// })

// // // Edit route

// app.get("/posts/:id/edit", async (req, res)=>{
//     let {id} = req.params;
//     let post = await Post.findById(id);
//     res.render("edit" , {Post});
//     console.log("edit")
// });

// // // update route

// app.put("/posts/:id", async (req, res)=>{
//     let {id} = req.params;
//     let {newPost} = req.body;
//     let updatePost = await Post.findByIdAndUpdate(id, {post: newPost}, {runValidators: true, new: true  }); 
//     console.log(updatePost);
//     res.redirect("/posts")
// })

// // // Delete route

// // app.delete("/books/:id", async (req, res)=>{ 
// //     let {id} = req.params;
// //     let deleteBook = await Book.findByIdAndDelete(id);
// //     console.log("Delete", deleteBook);
// //     res.redirect("/books")
// // })

// app.listen(port, () =>{
//     console.log(`Server running on Port http://localhost:${port}/posts`)
// })

//////////////////////////////////////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

const Post = require("./models/schema");

const app = express();
const port = 3002;

// const mongoDB_URL = "mongodb://127.0.0.1:27017/dailyPosts";
const mongoDB_URL = process.env.MONGO_URL;


// MongoDB Connection
async function main() {
    await mongoose.connect(mongoDB_URL);
    console.log("Connect DB Successful");
}

main().catch((err) => {
    console.log(err);
});


// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));


// Home / All Posts
app.get("/posts", async (req, res) => {
    const posts = await Post.find();

    res.render("home", { posts });
});


// New Post Page
app.get("/posts/new", (req, res) => {
    res.render("new");
});


// Create Post
app.post("/posts", async (req, res) => {

    const { username, content } = req.body;

    const newPost = new Post({
        username: username,
        content: content
    });

    await newPost.save();

    res.redirect("/posts");
});


// Show Single Post
app.get("/posts/:id", async (req, res) => {

    const { id } = req.params;

    const post = await Post.findById(id);

    res.render("show", { post });
});


// Edit Page
app.get("/posts/:id/edit", async (req, res) => {

    const { id } = req.params;

    const post = await Post.findById(id);

    res.render("edit", { post });
});


// Update Post
app.put("/posts/:id", async (req, res) => {

    const { id } = req.params;

    const { username, content } = req.body;

    await Post.findByIdAndUpdate(id, {
        username: username,
        content: content
    });

    res.redirect("/posts");
});


// Like Post
app.post("/posts/:id/like", async (req, res) => {

    const { id } = req.params;

    await Post.findByIdAndUpdate(id, {
        $inc: { like: 1 }
    });

    res.redirect("/posts");
});


// Delete Post
app.delete("/posts/:id", async (req, res) => {

    const { id } = req.params;

    await Post.findByIdAndDelete(id);

    res.redirect("/posts");
});


// Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/posts`);
});