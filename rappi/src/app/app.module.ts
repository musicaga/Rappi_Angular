import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CustomerService } from './services/customer.service';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrdersComponent } from './components/orders/orders.component';
import { PosComponent } from './components/pos/pos.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { ProductsDialogComponent } from './components/products-dialog/products-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    PosComponent,
    ProductsComponent,
    CartComponent,
    ProductsListComponent,
    ProductsContainerComponent,
    ProductsDialogComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService,
    ProductService,
    CartService,
    CustomerService,
    SnackbarService
  ],
  entryComponents: [
    ProductsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
