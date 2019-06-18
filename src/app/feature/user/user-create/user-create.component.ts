import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  title: string = 'User Create';
  jr: JsonResponse;
  user: User = new User();

  constructor(private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.userSvc.create(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
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
