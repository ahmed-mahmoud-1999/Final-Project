import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from 'src/app/interfaces/user-login';
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserLogin = {
    email: "",
    password: ""
  }
  errorMsg: any = ""
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    password: new FormControl("", [Validators.required])
  });
  submit = false;


  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {   }

  ngOnInit(): void {
  }


  showSuccess(name:any) {
    this.toastr.success('Logedin successfully', `Hello, ${name}`);
  }

  handleSubmit() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.auth.handlePost("/login", this.loginForm.value).subscribe(res => {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("isAdmin", res.data.user.isAdmin);
          localStorage.setItem("name", res.data.user.name);
        this.auth.loginFlag = true;
        this.auth.isAdmin = res.data.user.isAdmin == true ? true : false;
          this.showSuccess(res.data.user.name);
          this.router.navigateByUrl("home");
        }, err => {
          this.errorMsg = err.error.message;
        })
    }
  }

  get data() { return this.loginForm.controls; };
}
