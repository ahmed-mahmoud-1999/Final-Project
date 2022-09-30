import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private auth: AuthService, private router: Router) {
    this.auth.handleGet("/products", {}).subscribe(res => {
      this.products = res.data;
    },
      err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }
  handleDelete(id: any, index: any) {
    this.auth.handleDelete(`/products/delete/${id}`, {}).subscribe(res => {
      this.products.splice(index, 1);
    },
      err => {
      console.log(err);
    })
  }
  handleEdit(id: any) {
    this.router.navigateByUrl(`dashboard/products/edit/${id}`);
  }
  handleCreate() {
    this.router.navigateByUrl("dashboard/products/create");
  }
}
