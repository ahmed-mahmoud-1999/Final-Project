import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  test:any = [1,2,3,4]
  constructor(private auth: AuthService , private router: Router) {
    this.auth.handleGet("/users", {}).subscribe(res => {
      this.users = res.data;
    },
      err => {
      console.log(err);
    })
  }

  ngOnInit(): void {

  }

  handleOrders(id: any) {
    this.router.navigateByUrl(`dashboard/users/orders/${id}`);
  }
  handleDelete(id: any, index: any) {
    this.auth.handleDelete(`/user/${id}`, {}).subscribe(res => {
      this.users.splice(index, 1);
    },
      err => {
      console.log(err);
    })
  }

}
