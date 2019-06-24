import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.component.html',
  styleUrls: ['./pr-create.component.css']
})
export class PrCreateComponent implements OnInit {

  title: string = 'Purchase Request Create';
  jr: JsonResponse;
  pr: PurchaseRequest = new PurchaseRequest();

  constructor(private prSvc: PurchaseRequestService,
    private sysSvc: SystemService,
    private router: Router) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    if (this.sysSvc.data.user.loggedIn) {
      this.pr.user = this.sysSvc.data.user.instance;
    } else {
      console.error('No user logged in');
    }
  }

  create() {
    this.prSvc.submitNew(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/list']);
          alert('Purchase request created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create purchase request');
        }
      }
    )
  }
}
