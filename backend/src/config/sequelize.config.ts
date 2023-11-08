import { Sequelize } from "sequelize-typescript";
import dbConfig from "./db.config";
import Product from "../models/product.model";

const sequelize = new Sequelize(
  {
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: "localhost",
    port: dbConfig.PORT,
    dialect: "mysql",
    models: [], 
  }
);
sequelize.addModels([Product]);

export default sequelize;
