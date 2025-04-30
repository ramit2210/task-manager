require("dotenv").config(); // Load environment variables from .env file
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false, // Disable logging; default: console.log
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Todo = require("./todo")(sequelize, Sequelize);

//define relationships
db.User.hasMany(db.Todo, {
    foreignKey: "userId",
    as: "todos",
});

db.Todo.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;
