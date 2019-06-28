import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message: string = '';
  user: User = new User();
  jr: JsonResponse;

  constructor(private userSvc: UserService,
    private sysSvc: SystemService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.user.userName = localStorage.getItem('username');
      if (localStorage.getItem('password')) {
        this.user.password = localStorage.getItem('password');
        this.login();
      }
    }
  }

  login() {
    if (this.user.userName !== null && this.user.password !== null) {
      this.userSvc.login(this.user).subscribe(
        jresp => {
          this.jr = jresp;
          if (this.jr.errors == null) {
            this.user = this.jr.data as User;
            this.sysSvc.data.user.instance = this.user;
            this.sysSvc.data.user.loggedIn = true;
            this.userSvc.get(this.user.id.toString()).subscribe(
              resp => {
                let u = resp.data as User;
                localStorage.setItem('username', u.userName);
                localStorage.setItem('password', u.password);
              }
            );
            this.router.navigate(['home']);
          } else {
            this.message = JSON.stringify(this.jr.errors);
          }
        }
      )
    } else if (this.user.userName == null) {
      this.message = 'Username cannot be empty';
    } else if (this.user.password == null) {
      this.message = 'Password cannot be empty';
    }
  }

}
