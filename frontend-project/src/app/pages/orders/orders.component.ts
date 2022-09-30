import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  isAdmin = false;
  constructor(private auth: AuthService, private router: Router, private activatedroute : ActivatedRoute) {

   }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      console.log(data);
      if (data['val'] === 'user') {
        this.auth.handleGet("/orders", {}).subscribe(res => {
          console.log(res);
          this.orders = res.data;
        },
          err => {
            console.log(err);
          });
      }
      else if (data['val'] === 'admin') {
        this.isAdmin = true;
        const id = this.activatedroute.snapshot.paramMap.get('id');
        this.auth.handleGet(`/orders/user/${id}`, {}).subscribe(res => {
           this.orders = res.data;
         },
          err => {
           console.log(err);
         })
      }
    });
  }

  showPrice(price: any, quantity: any) {
    return parseFloat(price) * quantity;
  }

   handleSingle(id: any) {
    this.router.navigateByUrl(`home/${id}`);
   }
  handleStatus(index: any, orderId: any) {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    let temp_order = this.orders[index];
    const productsSend = temp_order.products.map((productObj: { product: { _id: any; }; quantity: any; }) => {
      return{
        "productId": productObj.product._id, "quantity": productObj.quantity
      };
    });
    const order = { products: productsSend, total_amount: temp_order.total_amount, status: temp_order.status === "pending" ? "received" : "pending" };
    this.auth.handlePut(`/orders/user/${id}/${orderId}`, order).subscribe(res => {
      this.orders[index].status = temp_order.status === "pending" ? "received" : "pending" ;
    },
      err => {
      console.log(err);
    })
  }

}
