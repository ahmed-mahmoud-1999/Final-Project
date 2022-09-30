import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product: any = {};
  cartProducts: any[] = [];
  constructor(private activated: ActivatedRoute, private auth: AuthService) {
    const id = this.activated.snapshot.paramMap.get("id");
    this.auth.handleGet(`/products/${id}`, {}).subscribe(res => {
      this.product = res.data;
    })
    this.auth.handleGet("/cart", {}).subscribe(res => {
      this.cartProducts = res.data;

    },
      error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }
  addToCart(id: any) {
    this.cartProducts.push({ product: this.product, quantity: 1 });
    this.auth.handlePost("/cart/add", { productId: id }).subscribe(res => {

    }, err => {
      console.log(err);

    })
  }
  isInCart(id: any): boolean {
    for (let pro of this.cartProducts) {
      if (pro.product._id === id) return true;
    }
    return false;
  }
  removeFromCart(id: any) {
    this.cartProducts = this.cartProducts.filter(pro => pro.product._id !== id);
    const productsSend = this.cartProducts.map(productObj => { return { "productId": productObj.product._id, "quantity": productObj.quantity }; });
    this.auth.handlePut("/cart/edit", productsSend).subscribe(res => {
    },
      err => {
      console.log(err);

    })
   }
}
