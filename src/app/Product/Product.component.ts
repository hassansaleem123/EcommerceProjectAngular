// product.component.ts

import { Component, OnInit } from '@angular/core';
import { Product } from './Product.model';
import { ProductService } from './Product.Service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = { productID: 0, name: '', price: 0, discount: 0, categoryID: 0, recordTimeStamp: new Date() };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  selectProduct(product: Product): void {
    // Set the selected product for editing
    this.selectedProduct = { ...product };
  }

  isUpdating(): boolean {
    return this.selectedProduct && this.selectedProduct.productID !== 0;
  }
  // Clear the form and reset the selectedProduct
  clearForm(): void {
    this.selectedProduct = { productID: 0, name: '', price: 0, discount: 0, categoryID: 0, recordTimeStamp: new Date() };
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (this.isNameEmpty()) {
      // Display an error message or take appropriate action
      alert('Name is required. Cannot add product with an empty name.');
      return;
    }
    if (this.isInvalidPriceOrDiscount()) {
      // Display an error message or take appropriate action
     alert('Price and discount must be greater than or equal to zero.');
      return;
    }
    this.productService.addProduct(this.selectedProduct).subscribe(() => {
      this.loadProducts();
    });
  }

  updateProduct(): void {
    // Check if name is empty before updating the product
  if (this.isNameEmpty()) {
    // Display an error message or take appropriate action
    alert('Name is required. Cannot update product with an empty name.');
    return;
  }
  if (this.isInvalidPriceOrDiscount()) {
    // Display an error message or take appropriate action
    alert('Price and discount must be greater than or equal to zero.');
    return;
  }
    this.productService.updateProduct(this.selectedProduct.productID, this.selectedProduct).subscribe(() => {
      this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
  private isInvalidPriceOrDiscount(): boolean {
    return this.selectedProduct.price < 0 || this.selectedProduct.discount < 0;
  }
  // Helper method to check if the name property is empty
private isNameEmpty(): boolean {
  return !this.selectedProduct.name || this.selectedProduct.name.trim() === '';
}
}
