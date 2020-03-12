const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');


// Config
  // template engine
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

  // body parser
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())

// Routes
  app.get('/', function(req, res) {
    Post.findAll({order: [['id', 'desc']]}).then(function(posts){
      res.render('home', {posts: posts})
    })
  })

  app.get('/add', function(req, res){
    res.render('formulario')
  })
  
  app.post('/post', function(req, res){
    const tituloReq = req.body.titulo
    const conteudoReq = req.body.conteudo
    
    Post.create({
      titulo: tituloReq,
      conteudo: conteudoReq
    }).then(function(){
      res.redirect('/')
    }).catch(function(erro){
      res.send('Error creating post ' + erro)
    })
  })

  app.get('/atualizar/:id', function(req, res){
    res.render('formUpdate', {id: req.params.id})
  })
  
  app.post('/newPost/:id', function(req, res){
    const idReq = req.params.id;
    const tituloReq = req.body.titulo;
    const conteudoReq = req.body.conteudo;
    Post.update({
      titulo: tituloReq,
      conteudo: conteudoReq,
    },{where: {'id': idReq}}).then(function(){
      res.redirect('/')
    }).catch(function(erro){
      res.send('Error ao atualizar o post ' + erro)
    })
  })

  app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(posts){
      res.render('deletar', {posts: posts})
    }).catch(function(error){
      res.send('Ocorreu algum erro ao deletar a postagem', error)
    })
  })

app.listen(3000, function(){
  console.log('The server is ready on port http://localhost:3000/')
});
// localhost:3000