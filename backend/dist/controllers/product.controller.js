"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const sequelize_1 = require("sequelize");
class ProductController {
    static async create(req, res) {
        try {
            const { code, name, description, price, quantity, inventoryStatus, category, image, rating, } = req.body;
            await product_model_1.default.create({
                code: code,
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                inventoryStatus: inventoryStatus,
                category: category,
                image: image,
                rating: rating ? +rating : null,
            });
            res.send({ status: "OK" });
        }
        catch (error) {
            const statusCode = error.statusCode || error.status || 500;
            res.status(statusCode).send({
                message: error.message || "An error occurred while fetching products.",
            });
        }
    }
    static async getAll(req, res) {
        try {
            const { sortOrder, search, first, limit } = req.query;
            let searchCondition = {};
            if (search) {
                searchCondition = {
                    [sequelize_1.Op.or]: [
                        {
                            name: {
                                [sequelize_1.Op.like]: `%${search}%`,
                            },
                        },
                        {
                            code: {
                                [sequelize_1.Op.like]: `%${search}%`,
                            },
                        },
                    ],
                };
            }
            let order = [["id", "DESC"]];
            if (sortOrder) {
                switch (sortOrder) {
                    case "quantity":
                        order = [["quantity", "DESC"]];
                        break;
                    case "price":
                        order = [["price", "DESC"]];
                        break;
                    case "rating":
                        order = [["rating", "DESC"]];
                        break;
                    case "category":
                        order = [["category", "DESC"]];
                        break;
                    case "name":
                        order = [["name", "DESC"]];
                        break;
                    case "code":
                        order = [["code", "DESC"]];
                        break;
                    default:
                }
            }
            const products = await product_model_1.default.findAll({
                where: searchCondition,
                order: order,
                offset: first ? parseInt(first) : 0,
                limit: limit ? parseInt(limit) : 10,
            });
            res.send({ status: "OK", data: products, count: await product_model_1.default.count() });
        }
        catch (error) {
            const statusCode = error.statusCode || error.status || 500;
            res.status(statusCode).send({
                message: error.message || "An error occurred while fetching products.",
            });
        }
    }
    static async getById(req, res) {
        try {
            const product = await product_model_1.default.findOne({ where: { id: req.params.id } });
            res.send({ status: "OK", data: product });
        }
        catch (error) {
            const statusCode = error.statusCode || error.status || 500;
            res.status(statusCode).send({
                message: error.message || "An error occurred while fetching products.",
            });
        }
    }
    static async delete(req, res) {
        try {
            await product_model_1.default.destroy({ where: { id: req.params.id } });
            res.send({ status: "OK" });
        }
        catch (error) {
            const statusCode = error.statusCode || error.status || 500;
            res.status(statusCode).send({
                message: error.message || "An error occurred while fetching products.",
            });
        }
    }
    static async update(req, res) {
        try {
            const { code, name, description, price, quantity, inventoryStatus, category, image, rating, } = req.body;
            const product = await product_model_1.default.update({
                code: code,
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                inventoryStatus: inventoryStatus,
                category: category,
                image: image,
                rating: rating ? +rating : null,
            }, { where: { id: req.params.id } });
            res.send({ status: "OK", data: product });
        }
        catch (error) {
            const statusCode = error.statusCode || error.status || 500;
            res.status(statusCode).send({
                message: error.message || "An error occurred while fetching products.",
            });
        }
    }
}
exports.default = ProductController;
