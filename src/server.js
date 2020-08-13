// Dados
const proffys = [
  {
    name: "Diego Fernandes",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "829933-4455",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
  },
  {
    name: "Andre Ricardo",
    avatar: "https://avatars1.githubusercontent.com/u/49066164?s=460&u=aeff837e51e31e94cc8cf58b16ed2358c6f041f7&v=4",
    whatsapp: "829933-4455",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Física",
    cost: "18",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
  }
]

const subjects = [  
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

// Funcionalidades
function getSubject(subjectNumber) {
  const position = +subjectNumber - 1
  return subjects[position];
}

function pageLanding(req, res) {
  return res.render("index.html");
}
function pageStudy(req, res) {
  const filters = req.query;
  return res.render("study.html", {proffys, filters, subjects, weekdays});
}
function pageGiveClasses(req, res) {
  const data = req.query;
  
  //se tiver dados
  const isNotEmpty = Object.keys(data).length > 0;
  if (isNotEmpty) {
    data.subject = getSubject(data.subject);
    //adicionar dados a lista de proffys
    proffys.push(data);
    return res.redirect("/study");
  }
  //se não,  mostrar a página
  return res.render("give-classes.html", {subjects, weekdays} );
}

// Servidor
const express = require('express');
const server = express();

//configura nunjucks (template engine)
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

// Inicio e configração do servidor
server
// configura arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// start do servidor
.listen(5500);