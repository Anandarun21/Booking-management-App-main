const Sequelize = require('sequelize');

const sequelize = new Sequelize('mainbookingapp', 'root', 'Arunvenkat@74',
	{
		dialect: 'mysql',
		host: 'localhost'
	});

module.exports = sequelize;	