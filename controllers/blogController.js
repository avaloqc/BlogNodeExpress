// show_all, 
const Blog = require('../models/blog');

const show_all = ((req, res) => {
    Blog.find()
    .then((result)=>{
        res.render('home', {title: "Home", blogs:result})
    })
    .catch((err)=> {console.log(err)})
});

const save = ((req, res)=>{    
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {res.redirect('/');})
        .catch((err) => {console.log(err);});
});

const create = ((req, res) => {
    res.render('create', {title: "Criar Blog"})
});

const show_one = ((req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {title:"Detalhes", blog:result})})
        .catch(err => /*res.sendFile('../views/404.html', { root:__dirname})*/ res.render('404', {title:'Não encontrado'}));
});

const delete_one = ((req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ redirect: '/'})
        })
});

module.exports = {
    show_all,
    save, 
    create,
    show_one,
    delete_one
}