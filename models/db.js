const Sequelize = require('sequelize');

// conection database
const sequelize = new Sequelize('PostApp', 'root', 'SilvioS@25258', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
