const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Phone: { // Adding Phone field
        type: Sequelize.STRING, // Assuming phone numbers are stored as strings
        allowNull: false
    }
});

module.exports = User;
