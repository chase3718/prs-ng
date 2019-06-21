import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.component.html',
  styleUrls: ['./pr-detail.component.css']
})
export class PrDetailComponent implements OnInit {

  jr: JsonResponse;
  prIdStr: string;
  pr: PurchaseRequest;
  title: string = 'Purchase Request Detail';
  authenticatedUser: User;

  constructor(private prSvc: PurchaseRequestService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    this.prSvc.get(this.prIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  remove() {
    this.prSvc.delete(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log(this.jr);
          alert('PurchaseRequest deleted succesfuly');
          this.router.navigate(['/pr/list']);
        } else {
          console.log(this.jr);
          alert('Failed to delete purchase request');
        }
      }
    )
  }
}
