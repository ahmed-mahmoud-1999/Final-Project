import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    confirmPassword: new FormControl("", Validators.required)
  });
  errorMsg: String = "";
  submit: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit(): void {
  }
  handleRegister() {
    this.submit = true;
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.errorMsg = 'Passwords Does Not Match'
        return;
      }
      this.auth.handlePost("/register", this.registerForm.value).subscribe(res => {
        this.router.navigateByUrl("dashboard/users");
      },
        (err) => {
        if (err.error === "Conflict") this.errorMsg = "This Email Is Registered Before "
        else this.errorMsg = err.message;
      })
    }
  }
  get data() { return this.registerForm.controls; };
}
