const express = require("express");
const app = express();
const port = 3000; 
const bodyParse = require("body-parser");
const path = require("path");

var session = require("express-session");

app.use(express.static("./app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");
//app.set('views', path.join(__dirname, "./app/views"));

//let caminho = path.resolve(__dirname + "app/views");

//caminho = caminho.replace("app/app/app/", "app/app/");

//app.set("views", caminho);
//console.log(caminho);
//app.use(bodyParse.urlencoded({extends: false}));

app.use(express.json({limit: '50mb' }));

//app.use(express.json({limit: '50mb' }))
//app.use(express.urlencoded({limit: '50mb' }))
//app.use(bodyParse.json({limit: '50mb' }))
app.use(bodyParse.urlencoded({limit: '50mb', extended:true }))



app.use(
    session({
      secret: "HELLo nODE",
      resave: false,
      saveUninitialized: false,
      cookie:{secure: false}
  }));

  app.use(function(req, res, next){
    console.log(req.session);
    res.locals.id_user = req.session?.id_u;
    next();
  })
  app.use(function(req, res, next){
    console.log(req.session);
    res.locals.foto_painel = req.session?.foto_painel;
    next();
  })
  

var rotas = require("./app/routes/router");
app.use("/", rotas);



app.listen(process.env.PORT || port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nSite On Page:${port}`);
});
