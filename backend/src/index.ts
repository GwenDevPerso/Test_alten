import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import sequelize from "./config/sequelize.config";
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize
  .sync({force: false})
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
