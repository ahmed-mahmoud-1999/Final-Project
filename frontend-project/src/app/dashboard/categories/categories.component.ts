import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  constructor(private auth: AuthService, private router: Router) {
    this.auth.handleGet("/categories", {}).subscribe(res => {
      this.categories = res.data;
    },
      err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }
  handleDelete(id: any, index: any) {
    this.auth.handleDelete(`/categories/delete/${this.categories[index]._id}`, { }).subscribe(res => {
      this.categories.splice(index, 1);
    },
      err => {
      console.log(err);
    })
  }
  handleEdit(name: any, id:any) {
    this.router.navigateByUrl(`dashboard/categories/edit/${name}/${id}`);
  }
  handleCreate() {
    this.router.navigateByUrl("dashboard/categories/create");
  }

}
