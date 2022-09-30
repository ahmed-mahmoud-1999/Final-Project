import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  products: any[] = [];
  cartProducts: any[] = [];
  p: number = 1;
  pageSize = 5;
  total: number = 0;
  constructor(public global: GlobalService, private auth: AuthService, private router: Router) {
    this.global.isLoading = true;
    this.auth.handleGet("/products", {}).subscribe(res => {
      this.products = res.data;
    },
      error => {
        console.log(error);
      },
      () => {
        this.global.isLoading = false;
      }
    )
    this.auth.handleGet("/cart", {}).subscribe(res => {
      this.cartProducts = res.data;

    },
      error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }
  handleSingle(id: any) {
    this.router.navigateByUrl(`home/${id}`);
  }


  addToCart(id: any, index:any) {
    this.cartProducts.push({ product: this.products[index], quantity: 1 });
    this.auth.handlePost("/cart/add", { productId: id }).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

    })
  }
  removeFromCart(id: any) {
    this.cartProducts = this.cartProducts.filter(pro => pro.product._id !== id);
    const productsSend = this.cartProducts.map(productObj => { return { "productId": productObj.product._id, "quantity": productObj.quantity }; });
    this.auth.handlePut("/cart/edit", productsSend).subscribe(res => {
      console.log(res);
    },
      err => {
      console.log(err);

    })
   }
  isInCart(id: any): boolean {
    for (let pro of this.cartProducts) {
      if (pro.product._id === id) return true;
    }
    return false;
  }
}

