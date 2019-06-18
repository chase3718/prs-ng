import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  jr: JsonResponse;
  userIdStr: string;
  user: User;
  title: string = 'User Detail';

  constructor(private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
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

  remove() {
    this.userSvc.delete(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        console.log('gud');
        this.router.navigate(['/user/list']);
        alert('User Deleted succesfuly');
      }
    )
  }
}
