const express = require('express');
const app = express();
const handlebars = require('express-handlebars')


// Config
  //  template engine
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

  // conection database
  const Sequelize = require('sequelize');
  const sequelize = new Sequelize('test', 'root', 'Cassio@123456', {
    host: 'localhost',
    dialect: 'mysql'
  });

// Rotas  
  app.get('/cad', function(req, res){
    res.render('formulario')
  })
  app.post('/add', function(req, res){
    res.send('formulário recebido')
  })

app.listen(3000, function(){
  console.log('The server is ready on port http://localhost:3000/')
});
// localhost:3000