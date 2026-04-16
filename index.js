import express from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;

const __dirname = import.meta.dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// HOME PAGE TO DISPLAY ALL POSTS
// SINGLE POST PAGE SHOWING POST IN FULL
// FORM PAGE TO CREATE NEW POSTS
// 

let posts = [
  {
    id: uuidv4(),
    title: "My First Post",
    content: "Hello world",
  }, {
    id: uuidv4(),
    title: "My Second Post",
    content: "Second post...",
  }
];

// HOME PAGE
app.get('/posts', (req, res) => {
  console.log(posts[0].id);
  res.render('posts/index', { posts });
});

// CREATE NEW POST
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: uuidv4(), title, content })
    // console.log(posts);
    // console.log(req.body);
    res.redirect('/posts');
})

app.get('/newPost', (req, res) => {
  res.render('posts/newPost');
})

// VIEW A SINGLE POST
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    // console.log(req.params);
    const post = posts.find(p => p.id === id)
    console.log(post);
    res.render('posts/singlePost', { post })
})

app.get('/random', (req,res) => {
  const { id, title, content } = req.params;
    const randIndex = Math.floor(Math.random() * posts.length);
    const randPost = posts[randIndex];
    // send user to a random post
    res.render('posts/singlePost', { post: randPost });
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});