const express = require('express');
//const blogs = require('./blogs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./blog');

const app = express();
const dbURI= 'mongodb://127.0.0.1:27017/BlogNinja'
//Avalo:mongo1234
//express app
/*{useNewUrlParser:true, useUnifiedTopology: true}?*/

mongoose.connect(dbURI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))

app.listen(3000);
console.log('rodando na porta 3000')
app.set('view engine', 'ejs');                      // set view engine 
app.use(morgan('dev'));                            // logger 
app.use(express.static('public'));                // middleware & static files (load rsc)
app.use(express.urlencoded({extended: true}));   // doc parser

app.get('/', (req, res) => {
    //  const blags = []
    //res.render('home', {title: "Home", blogs: blogs});  
    res.redirect('/blogs');
});  

app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result)=>{
        res.render('home', {title: "Home", blogs:result})
    })
    .catch((err)=> {console.log(err)})
})

app.post('/blogs', (req, res)=>{    
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {res.redirect('/blogs');})
        .catch((err) => {console.log(err);});
});

app.get('/about', (req, res) => {
    res.render('about', {title: "Acerca"});  
});

// app.get('/blog-criar', (req, res) => {
//     const blog = new Blog({
//         title: 'blog',
//         snippet: 'abou blogs',
//         body:'more about the blog'    
//     });
//     blog.save()
//         .then((result)=> {
//             res.send(result)
//         })
//         .catch(err=>(console.log(err)))
// })

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ redirect: '/blogs'})
        })
})

app.get('/criar', (req, res) => {
    res.render('create', {title: "Criar Blog"})
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {title:"Detalhes", blog: result})})
        .catch(err => console.log(err));
})

//*ERROR404
app.use((req, res) =>{
    res.status(404).sendFile('views/404.html',{ root:__dirname});
});

// const http = require('http');
// const server = http.createServer((req, res) =>{
//     console.log(req.url);
//     res.end(`Hola`);
// });

// server.listen(3000, function() {
//     console.log(`Server rodando na porta: 3000`)
// });



