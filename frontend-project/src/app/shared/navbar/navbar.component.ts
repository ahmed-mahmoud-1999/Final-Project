import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];
  constructor(public auth: AuthService, private global: GlobalService, private router: Router) {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const isAdmin = localStorage.getItem("isAdmin");
    if (token) {
      this.auth.loginFlag = true;
      if (isAdmin === 'true') this.auth.isAdmin = true;
      else this.auth.isAdmin = false;
    }
    this.auth.handleGet("/categories", {}).subscribe(res => {
      this.categories = res.data;
    }, error => {
      console.log(error);
    })

  }

  ngOnInit(): void {
  }
  handleLogout() {
    this.auth.handlePost("/logout", {}).subscribe(res => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("isAdmin");
      this.auth.loginFlag = false;
      this.auth.isAdmin = false;
      this.router.navigateByUrl("home");
    },
      err => {
      console.log(err);
    })
  }

}
