// product.model.ts

export interface Product {
  productID: number;
  name: string;
  price: number;
  discount: number;
  categoryID: number;
  recordTimeStamp: Date;
}
