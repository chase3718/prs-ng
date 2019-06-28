import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  title: string = 'User Create';
  jr: JsonResponse;
  user: User = new User();
  phoneNumber1: number;
  phoneNumber2: number;
  phoneNumber3: number;

  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
  }

  hasNull(target) {
    for (let member in target) {
      if (target[member] == null && member !== 'id') {
        return true;
      }
    }
    return false;
  }

  create() {
    this.user.phoneNumber = this.phoneNumber1 + '-' + this.phoneNumber2 + '-' + this.phoneNumber3;
    if (this.hasNull(this.user)) {
      alert('All fields must be filled');
      console.log(this.user);
    } else {
      this.userSvc.create(this.user).subscribe(
        jresp => {
          this.jr = jresp;
          if (this.jr.errors == null) {
            this.router.navigate(['/user/list']);
            alert('User created succesfuly');
          } else {
            console.log(this.jr.errors);
            alert('Failed to create user');
          }
        }
      )
    }
  }
}
