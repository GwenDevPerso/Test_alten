import { Request, Response } from "express";
import Product from "../models/product.model";
import { Op, Order } from "sequelize";

class ProductController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        code,
        name,
        description,
        price,
        quantity,
        inventoryStatus,
        category,
        image,
        rating,
      } = req.body;

      await Product.create({
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
    } catch (error: any) {
      const statusCode = error.statusCode || error.status || 500;
      res.status(statusCode).send({
        message: error.message || "An error occurred while fetching products.",
      });
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { sortOrder, search, first, limit } = req.query;

      let searchCondition = {};
      if (search) {
        searchCondition = {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              code: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        };
      }
      let order: Order = [["id", "DESC"]];
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

      const products = await Product.findAll({
        where: searchCondition,
        order: order,
        offset: first ? parseInt(first as string) : 0,
        limit: limit ? parseInt(limit as string) : 10,
      });

      res.send({ status: "OK", data: products, count: await Product.count() });
    } catch (error: any) {
      const statusCode = error.statusCode || error.status || 500;
      res.status(statusCode).send({
        message: error.message || "An error occurred while fetching products.",
      });
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      res.send({ status: "OK", data: product });
    } catch (error: any) {
      const statusCode = error.statusCode || error.status || 500;
      res.status(statusCode).send({
        message: error.message || "An error occurred while fetching products.",
      });
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Product.destroy({ where: { id: req.params.id } });
      res.send({ status: "OK" });
    } catch (error: any) {
      const statusCode = error.statusCode || error.status || 500;
      res.status(statusCode).send({
        message: error.message || "An error occurred while fetching products.",
      });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const {
        code,
        name,
        description,
        price,
        quantity,
        inventoryStatus,
        category,
        image,
        rating,
      } = req.body;

      const product: any = await Product.update(
        {
          code: code,
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          inventoryStatus: inventoryStatus,
          category: category,
          image: image,
          rating: rating ? +rating : null,
        },
        { where: { id: req.params.id } }
      );
      res.send({ status: "OK", data: product });
    } catch (error: any) {
      const statusCode = error.statusCode || error.status || 500;
      res.status(statusCode).send({
        message: error.message || "An error occurred while fetching products.",
      });
    }
  }
}

export default ProductController;
