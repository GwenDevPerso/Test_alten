"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const sequelize_config_1 = __importDefault(require("./config/sequelize.config"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
sequelize_config_1.default
    .sync({ force: false })
    .then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
    console.log("Error", err);
});
app.use("/", routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
