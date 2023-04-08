const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const dbURI= 'mongodb://127.0.0.1:27017/BlogNinja'

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');                      // set view engine 
app.use(morgan('dev'));                            // logger 
app.use(express.static('public'));                // middleware & static files (load rsc)
app.use(express.urlencoded({extended: true}));   // doc parser

app.get('/', (req, res) => {
    res.redirect('/blogs');
});  

app.get('/about', (req, res) => {
    res.render('about', {title: "Acerca"});  
});

app.use('/blogs', blogRoutes);

//*ERROR404
app.use((req, res) =>{
    res.status(404).sendFile('views/404.html',{ root:__dirname});
});
