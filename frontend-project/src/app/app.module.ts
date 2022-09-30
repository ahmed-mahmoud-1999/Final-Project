import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from "ngx-toastr"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { CategoryComponent } from './pages/category/category.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { CreateAdminComponent } from './dashboard/create-admin/create-admin.component';
import { CreateUserComponent } from './dashboard/create-user/create-user.component'
import { UsersComponent } from './dashboard/users/users.component';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';
import { HandleCategoriesComponent } from './dashboard/handle-categories/handle-categories.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    RegisterComponent,
    LoginComponent,
    SingleProductComponent,
    CategoryComponent,
    OrdersComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    CreateAdminComponent,
    CreateUserComponent,
    UsersComponent,
    EditProductComponent,
    HandleCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
