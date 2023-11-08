import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "app/services/product.service";
import { CrudItemOptions } from "app/shared/utils/crud-item-options/crud-item-options.model";
import { ControlType } from "app/shared/utils/crud-item-options/control-type.model";
import { ScreenWidth } from "app/shared/utils/crud-item-options/screen-width.model";

class ProductForm {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public description?: string,
    public price?: number,
    public category?: string,
    public quantity?: number,
    public inventoryStatus?: string,
    public image?: string,
    public rating?: number
  ) {
    this.id = id ?? null;
    this.name = name ?? "";
    this.code = code ?? "";
    this.description = description ?? "";
    this.price = price ?? 0;
    this.category = category ?? "";
    this.quantity = quantity ?? 0;
    this.inventoryStatus = inventoryStatus ?? "";
    this.image = image ?? "";
    this.rating = rating ?? 0;
  }
}

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
})
export class ProductsAdminComponent implements OnInit {
  public products: Product[] = [];
  public selectedProducts: Product[];
  public total: number = 10;
  public offset: number = 0;

  public entity = ProductForm;

  public config: CrudItemOptions[] = [
    {
      key: "id",
      label: "Id",
      controlType: ControlType.INPUT,
      type: "text",
      isBreadcrumbLabel: false,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
      controlOptions: {
        hideOnCreate: true,
        disableOnUpdate: true,
      },
    },
    {
      key: "code",
      label: "Code",
      controlType: ControlType.INPUT,
      type: "text",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: true,
        filterable: true,
        minScreenSize: ScreenWidth.medium,
        default: true,
      },
    },
    {
      key: "name",
      label: "Name",
      controlType: ControlType.INPUT,
      type: "text",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: true,
        filterable: true,
        minScreenSize: ScreenWidth.medium,
        default: true,
      },
    },
    {
      key: "description",
      label: "Description",
      controlType: ControlType.INPUT,
      type: "text",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
    },
    {
      key: "category",
      label: "Category",
      controlType: ControlType.INPUT,
      type: "text",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        default: false,
      },
    },
    {
      key: "price",
      label: "Price",
      controlType: ControlType.INPUT,
      type: "number",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
    },
    {
      key: "quantity",
      label: "Quantity",
      controlType: ControlType.INPUT,
      type: "number",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
    },
    {
      key: "inventoryStatus",
      label: "Inventory Status",
      controlType: ControlType.INPUT,
      type: "text",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
    },
    {
      key: "image",
      label: "Image",
      controlType: ControlType.IMAGE,
      type: "text",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
    },
    {
      key: "rating",
      label: "Rating",
      controlType: ControlType.RATING,
      type: "number",
      isBreadcrumbLabel: true,
      columnOptions: {
        sortable: false,
        filterable: false,
        minScreenSize: ScreenWidth.medium,
        hidden: true,
      },
    },
  ];

  constructor(private _productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const res = await this._productService.getProducts();
    if (!res) return;
    this.products = res.data;
    this.total = res.count;
  }

  onSave(event: any) {
    console.log(event);
    if (
      event.entity.name &&
      event.entity.code &&
      event.entity.price &&
      event.entity.category &&
      event.entity.quantity &&
      event.entity.inventoryStatus &&
      event.entity.description
    ) {
      if (event.creation) {
        this.products.push(event.entity);
        this._productService
          .createProduct(event.entity)
          .then((products: Product[]) => {
            if (products) this.products = products;
          });
      } else {
        this.products = this.products.map((product: Product) => {
          if (product.id === event.entity.id) {
            return event.entity;
          }
          return product;
        });
        this._productService
          .updateProduct(event.entity)
          .then((products: Product[]) => {
            if (products) this.products = products;
          });
      }
    } else {
      console.log("invalid form");
    }
  }

  onDelete(event: any) {
    this.products = this.products.filter(
      (product: Product) => product.id !== event
    );
    this._productService.deleteProduct(event).then((products: Product[]) => {
      this.products = products;
    });
  }

  async onLazyLoad(event: any) {
    const res: any = await this._productService.getProducts(
      event.first,
      event.rows,
      event.filters
    );
    if (!res) return;
    this.products = res.data;
    this.total = res.count;
  }
}
