"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    HOST: "localhost",
    PORT: 8889,
    USER: "root",
    PASSWORD: "root",
    DB: "alten",
    dialect: "mysql",
    define: {
        timestamps: false,
    },
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast(field, next) {
            // for reading from the database
            if (field.type === "DATETIME") {
                return field.string();
            }
            return next();
        },
    },
    timezone: "Europe/Paris",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
exports.default = dbConfig;
