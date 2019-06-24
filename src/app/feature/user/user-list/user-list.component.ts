import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  jr: JsonResponse;
  users: User[];
  title: string = 'User List';
  authenticatedUser: User;
  sortColumn: string = 'name';
  sortOrder: string = 'asc';
  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.userSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.users = this.jr.data as User[];
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }
  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    }
    this.sortColumn = col;
  }


}
