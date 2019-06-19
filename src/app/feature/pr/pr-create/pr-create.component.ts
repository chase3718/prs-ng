import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.component.html',
  styleUrls: ['./pr-create.component.css']
})
export class PrCreateComponent implements OnInit {

  title: string = 'Pr Create';
  jr: JsonResponse;
  pr: PurchaseRequest = new PurchaseRequest();
  users: User[];

  constructor(private prSvc: PurchaseRequestService,
              private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.users = this.jr.data as User[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }
  
  create() {
    this.prSvc.submitNew(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/pr/list']);
          alert('Pr created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create pr');
        }
      }
    )
  }
}
