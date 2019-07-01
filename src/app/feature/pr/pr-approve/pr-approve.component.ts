import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Product } from 'src/app/model/product.class';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';

@Component({
  selector: 'app-pr-approve',
  templateUrl: './pr-approve.component.html',
  styleUrls: ['./pr-approve.component.css']
})
export class PrApproveComponent implements OnInit {

  jr: JsonResponse;
  prIdStr: string;
  pr: PurchaseRequest;
  title: string = 'Purchase Request Approval';
  lineItems: PurchaseRequestLineItem[];
  rejected = false;

  constructor(private prSvc: PurchaseRequestService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.route.params.subscribe(params => this.prIdStr = params['id']);
    this.prSvc.get(this.prIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
        } else {
          alert('Unable to approve the purchase request at this time');
          console.log(this.jr.errors);
        }
      }
    );
    this.prSvc.getLineItems(this.prIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.lineItems = this.jr.data as PurchaseRequestLineItem[];
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  reject() {
    this.rejected = true;
  }

  sendReject() {
    this.prSvc.sendReject(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          alert('Rejected');
          this.router.navigate(['/pr/review']);
        } else {
          alert('Unable to reject purchase request');
          console.log(this.jr.errors);
        }
      }
    )
  }

  approve() {
    this.prSvc.approve(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          alert('Purchase Request Approved');
          this.router.navigate(['/pr/review']);
        } else {
          alert('Unable to approve purchase request');
          console.log(this.jr.errors);
        }
      }
    )
  }
}
