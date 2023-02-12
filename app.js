//tags handlebars serve para imprimir dados do back end para o front-end
//body-parser serve para conseguir as requisicoes e transforma ele dados, ele faz a comunicao do front para o backend
// sequelize faz abstracao com o banco de dados, pode usar comando, insert, delete, uptade, de forma resumida e facil atraves de objetos e metodos.
//sqlite3 banco de dados 
//node-mon nao precisa ficar reniciando o servidor, consegue atualizar autoamticamente - comando npm install -D nodemon
// iniciar o servidor em alguma porta, colocar uma porta e uma variavel constante.

//Para rodar o nodemon, tera que modificar o texto abaixo do script e colocar "dev": "nodemon app.js"
//Em seguida colocar o comando npm run dev

//sqlite3 para informacoes pequenas. Porem se tiver muitos dados nao vale a pena utilizar

//comando then significara o sucesso do banco de dados ja o comando catch, ira retornar o erro com o banco de dados
// comando exphbs nao funciona sem usar o comando engine

const express       = require('express');
const exphbs        = require('express-handlebars');
const app           = express();
const path          = require('path');
const db            = require('./db/connection');
const bodyParser    = require('body-parser');
const Job           = require('./models/Job');
const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express esta rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));


//db connection
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso")
    })
    


// routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%' +search+ '%'; //PH -> PHP, Word -> Wordpress, press -> Wordpress

    if(!search) {
        Job.findAll({order: [
            ['createdAt', 'DESC'],
        ]})
            .then(jobs => {
                res.render("index", {
                    jobs
                })
            })
            .catch(err => console.log(err));
        
    } else {

        Job.findAll({
            where: {title: {[Op.like]:query}},
            order: [
            ['createdAt', 'DESC'],
        ]})
            .then(jobs => {
                res.render("index", {
                    jobs, search
                });
            });
        

    }

    
});

// jobs routes 
app.use('/jobs', require('./routes/jobs'));

