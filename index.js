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
    Post.findAll().then(function(posts){
      // console.log(posts)
      res.render('home', {posts: posts})
    })
  })

  app.get('/cad', function(req, res){
    res.render('formulario')
  })
  
  app.post('/add', function(req, res){
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

app.listen(3000, function(){
  console.log('The server is ready on port http://localhost:3000/')
});
// localhost:3000