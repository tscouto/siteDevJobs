// exporta coisas fora dele utiliza comando module.exports e o nome da variavel

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db'
});

module.exports = sequelize