import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table
class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column(DataType.STRING)
  code!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.STRING)
  inventoryStatus!: string;

  @Column(DataType.STRING)
  category!: string;

  @Column(DataType.STRING)
  image?: string; // "?" makes it optional

  @Column(DataType.FLOAT)
  rating?: number; // "?" makes it optional
}

export default Product;
