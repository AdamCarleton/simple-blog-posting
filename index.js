import express from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;

const __dirname = import.meta.dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// HOME PAGE TO DISPLAY ALL POSTS
// SINGLE POST PAGE SHOWING POST IN FULL
// FORM PAGE TO CREATE NEW POSTS
// 

let posts = [
  {
    id: uuidv4(),
    title: "My First Post",
    content: "Hello world",
    createdAt: new Date()
  }, {
    id: uuidv4(),
    title: "My Second Post",
    content: "Second post...",
    createdAt: new Date()
  }
];

// HOME PAGE
app.get('/posts', (req, res) => {
  res.render('posts/index', { posts });
});

app.get('/newPost', (req, res) => {
  res.render('posts/newPost');
})

// app.get('/blogpost/:id', (req, res) => {
//     res.send('specific post')
// })

app.get('/random', (req,res) => {
    // send user to a random post
    res.send('RANDOM');
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});