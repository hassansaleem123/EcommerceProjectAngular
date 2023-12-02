import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './Product/Product.component';

const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' }, // Redirect empty path to the product component
  { path: 'product', component: ProductComponent }, // Define the route for the productComponent
  // Other routes can be defined here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
