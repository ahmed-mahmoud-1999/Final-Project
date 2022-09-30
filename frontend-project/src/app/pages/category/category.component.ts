import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: any[] = [];
  cartProducts: any[] = [];
  constructor(private global: GlobalService, private auth: AuthService, private router: Router, private activated: ActivatedRoute) {
     this.activated.paramMap.subscribe(params => {
        const category = params.get('name')
        this.auth.handleGet(`/products?category=${category}`, {}).subscribe(res => {
        this.products = res.data;
    },
      error => {
        console.log(error);
      }
    )
     });
     this.auth.handleGet("/cart", {}).subscribe(res => {
      this.cartProducts = res.data;
      console.log(res.data);

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

  addToCart(id: any, index: any) {
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
