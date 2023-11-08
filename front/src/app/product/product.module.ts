import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ProductService } from 'app/services/product.service';
import { TableComponent } from 'app/shared/ui/table/table.component';
import { SharedModule } from 'app/shared/shared.module';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';



@NgModule({
  providers: [ProductService], // If you have any services specific to this module
  declarations: [
    ProductsAdminComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ProductModule { }
