import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "app/services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  public layout: string = "list";
  public products!: Product[];
  public total: number = 0;
  public limit: number = 10;
  public offset: number = 0;
  public filters: any = {};

  public sortOptions: any[] = [
    { label: "Price", value: "price" },
    { label: "Quantity", value: "quantity" },
    { label: "Rating", value: "rating" },
  ]

  constructor(private _productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const res: any = await this._productService.getProducts(this.offset, this.limit, this.filters);
    if (!res) return;
    this.products = res.data
    this.total = res.count;
  }

  async onFilterChange(event: any) {
    this.filters = event;
    const res: any = await this._productService.getProducts(this.offset, this.limit,this.filters);
    if (!res) return;
    this.products = res.data
    this.total = res.count;
  }

  async onPageChange(event: any) {
    const res: any = await this._productService.getProducts(event.first, event.rows, this.filters);
    if (!res) return;
    this.products = res.data
    this.total = res.count;  
  }
  
}
