import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  jr: JsonResponse;
  userIdStr: string;
  user: User;
  title: string = 'User Edit';
  authenticatedUser: User;

  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.route.params.subscribe(params => this.userIdStr = params['id']);
    this.userSvc.get(this.userIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.user = this.jr.data as User;
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  edit() {
    this.userSvc.update(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/user/list']);
          alert('User Updated succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to update user');
        }
      }
    )
  }
}
