import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  model:any = {
    title: "",
    desc: "",
    price: "",
    inStock: "",
    category: "",
  }
  img: any = "";
  editType: any = false;
  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data['value'] === 'edit') {
        this.editType = true;
        const id = this.activatedRoute.snapshot.paramMap.get("id");
        this.auth.handleGet(`/products/${id}`, {}).subscribe(res => {
          const data = res.data;
          Object.keys(this.model).forEach(key => {
            this.model[key] = data[key];
          });
        },
          err => {
            console.log(err);
          });
      }
      else if (data['value'] === 'create') this.editType = false;
    });
  }

  handleSubmit(form: NgForm) {
    if (form.valid) {
      let formData = new FormData();
      Object.keys(this.model).forEach(key => {
        if (key === 'category' && !Array.isArray(this.model[key])) {
          const temp = this.model[key].split(',');
          formData.append(key, JSON.stringify(temp));
        }
        else if (key === 'category') formData.append(key, JSON.stringify(this.model[key]));
        else formData.append(key, this.model[key]);
      });
      if (this.img !== "") formData.append("img", this.img);
      const id = this.activatedRoute.snapshot.paramMap.get("id");
      if (this.editType) {
        this.auth.handlePut(`/products/edit/${id}`, formData).subscribe(res => {
          this.router.navigateByUrl("dashboard/products");
        },
          err => {
          console.log(err);
        })
      }
      else {
        this.auth.handlePost("/products/add", formData).subscribe(res => {
          this.router.navigateByUrl("dashboard/products");
        },
          err => {
          console.log(err);
        })
      }
    }
  }
  handleImg(e: any) {
    this.img = e.target.files[0];
  }

}
