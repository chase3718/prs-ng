import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { PurchaseRequestLineItemService } from 'src/app/service/purchase-request-line-item.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-pr-lines',
  templateUrl: './pr-lines.component.html',
  styleUrls: ['./pr-lines.component.css']
})
export class PrLinesComponent implements OnInit {
  jr: JsonResponse;
  purchaseRequestIdStr: string;
  pr: PurchaseRequest;
  prlis: PurchaseRequestLineItem[];
  title = 'Purchase Request Line Items';
  sortColumn: string = 'name';
  sortOrder: string = 'asc';

  constructor(private purchaseRequestSvc: PurchaseRequestService,
              private sysSvc: SystemService,
              private prliSvc: PurchaseRequestLineItemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
    this.route.params.subscribe(params => this.purchaseRequestIdStr = params['id']);
    this.purchaseRequestSvc.get(this.purchaseRequestIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
        } else {
          console.log(this.jr.errors);
        }
      }
    );
    this.prliSvc.getFromPurchaseRequest(this.purchaseRequestIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prlis = this.jr.data as PurchaseRequestLineItem[];
        } else {
          console.log(this.jr.errors);
        }
      }
    );

  }

  remove(id: number) {
    this.prliSvc.delete(id).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          alert('Line item succesfully removed');
          this.router.navigate(['/reroute/' + this.purchaseRequestIdStr]);
        } else {
          alert('Failed to remove line item');
          console.log(this.jr.errors);
        }
      }
    )
  }

  submit() {
    this.purchaseRequestSvc.submitReview(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          alert('Purchase request succesfuly created');
          this.router.navigate(['/pr/list']);
        } else {
          alert('Failed to create purchase request');
          console.log(this.jr.errors);
        }
      }
    )
  }

  reopen() {
    this.purchaseRequestSvc.reopen(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          alert('Purchase request succesfuly reopened');
          this.router.navigate(['/reroute/' + this.purchaseRequestIdStr]);
        } else {
          alert('Could not reopen this purchase request');
          console.log(this.jr.errors);
        }
      }
    )
  }

  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    }
    this.sortColumn = col;
  }
}
