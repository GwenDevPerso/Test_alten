import { Injectable } from "@angular/core";
import { Product } from "app/product/product.model";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor() {}

  async getProducts(
    first?: number,
    limit?: number,
    filters?: any
  ): Promise<any> {
    try {
      const res = await axios.get("http://localhost:8000/products", {
        params: {
          ...filters,
          first,
          limit,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const res: any = await axios.get(`http://localhost:8000/products/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(product: Product): Promise<Product[]> {
    try {
      await axios.post("http://localhost:8000/products", product);
      const res: any = await this.getProducts();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(product: Product): Promise<Product[]> {
    try {
      await axios.patch(
        `http://localhost:8000/products/${product.id}`,
        product
      );
      const res: any = await this.getProducts();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id: string): Promise<Product[]> {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      const res: any = await this.getProducts();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
