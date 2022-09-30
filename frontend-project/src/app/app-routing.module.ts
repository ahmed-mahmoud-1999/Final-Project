import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { CreateAdminComponent } from './dashboard/create-admin/create-admin.component';
import { CreateUserComponent } from './dashboard/create-user/create-user.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RegisterComponent } from './pages/register/register.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { UsersComponent } from './dashboard/users/users.component';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';
import { HandleCategoriesComponent } from './dashboard/handle-categories/handle-categories.component';

const routes: Routes = [
  { path: "home", component: IndexComponent },
  { path: "home/:id", component: SingleProductComponent },
  {path:"category/:name", component: CategoryComponent},
{ path: "register", component: RegisterComponent, canActivate:[AuthGuard] },
{path: "login", component: LoginComponent, canActivate:[AuthGuard]},
  { path: "users", component: UsersComponent },
  { path: "cart", component: CartComponent },
  { path: "orders", component: OrdersComponent, data:{val: "user"} },
  {
    path: "dashboard", children: [
      { path: "users", component: UsersComponent},
      { path: "users/orders/:id", component: OrdersComponent , data:{val:"admin"}},
      {
        path: "products", children: [
        {path:"", component: ProductsComponent},
        {path: "edit/:id", component: EditProductComponent, data:{value: "edit"}},
        {path: "create", component: EditProductComponent, data:{value: "create"}},
      ]},
      {
        path: "categories", children: [
          { path: "", component: CategoriesComponent },
          {path: "edit/:name/:id", component: HandleCategoriesComponent, data:{value: "edit"}},
          {path: "create", component: HandleCategoriesComponent, data:{value: "create"}},
      ]},
      { path: "createAdmin", component: CreateAdminComponent },
      { path: "createUser", component: CreateUserComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
