import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[] = [];
  addres: any = {};
  constructor(private auth: AuthService, private global: GlobalService, private router:Router) {
    this.auth.handleGet("/cart", {}).subscribe(res => {
      this.products = res.data;
    },
      error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }
  increaseQuantity(id: any, index: any) {
    ++this.products[index].quantity;
    const productsSend = this.products.map(productObj => { return { "productId": productObj.product._id, "quantity": productObj.quantity }; });
    this.auth.handlePut("/cart/edit", productsSend).subscribe(res => {
    },
      err => {
      console.log(err);

    })
  }
  decreaseQuantity(id: any, index: any) {
    console.log(this.products[index].quantity);
    if (this.products[index].quantity == 1) this.removeFromCart(id);
    else {
      --this.products[index].quantity;
      const productsSend = this.products.map(productObj => { return { "productId": productObj.product._id, "quantity": productObj.quantity }; });
      this.auth.handlePut("/cart/edit", productsSend).subscribe(res => {
      },
      err => {
      console.log(err);
      })
    }
  }
  showPrice(price: any, quantity: any) {
    return parseFloat(price) * quantity;
  }
   removeFromCart(id: any) {
    this.products = this.products.filter(pro => pro.product._id !== id);
    const productsSend = this.products.map(productObj => { return { "productId": productObj.product._id, "quantity": productObj.quantity }; });
    this.auth.handlePut("/cart/edit", productsSend).subscribe(res => {
      console.log(res);
    },
      err => {
      console.log(err);

    })
   }
  handleSingle(id: any) {
    this.router.navigateByUrl(`home/${id}`);
  }
  handleOrder() {
    let total_amount = 0;
    const productsSend = this.products.map(productObj => {
      total_amount += parseFloat(productObj.product.price) * productObj.quantity;
      return{
        "productId": productObj.product._id, "quantity": productObj.quantity
      };
    });
    const order = { products: productsSend, total_amount: `${total_amount}$` };
    this.auth.handlePost("/orders/add", order).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("/orders");
    },
      err => {
      console.log(err);
    })
  }

}
