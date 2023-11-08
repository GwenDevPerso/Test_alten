"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = __importDefault(require("./db.config"));
const product_model_1 = __importDefault(require("../models/product.model"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: db_config_1.default.DB,
    username: db_config_1.default.USER,
    password: db_config_1.default.PASSWORD,
    host: "localhost",
    port: db_config_1.default.PORT,
    dialect: "mysql",
    models: [],
});
sequelize.addModels([product_model_1.default]);
exports.default = sequelize;
