import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-handle-categories',
  templateUrl: './handle-categories.component.html',
  styleUrls: ['./handle-categories.component.css']
})
export class HandleCategoriesComponent implements OnInit {
  model: any = {
    name: "",
    id: ""
  }
  editType: any = false;
  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data['value'] === 'edit') {
        this.editType = true;
        const name = this.activatedRoute.snapshot.paramMap.get("name");
        const id = this.activatedRoute.snapshot.paramMap.get("id");
        this.model.name = name;
        this.model.id = id;
      }
      else if (data['value'] === 'create') this.editType = false;
    });
  }
   handleSubmit(form: NgForm) {
     if (form.valid) {
       if (this.editType) {
         this.auth.handlePut(`/categories/edit/${this.model.id}`, { name: this.model.name }).subscribe(res => {
           this.router.navigateByUrl("dashboard/categories");
         });
       }
       else {
         this.auth.handlePost(`/categories/add`, { name: this.model.name }).subscribe(res => {
           this.router.navigateByUrl("dashboard/categories");
         });
       }
    }
  }
}
