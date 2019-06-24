import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';
import { Router } from '@angular/router';
import { SortablePurchaseRequest } from 'src/app/model/sortable-purchase-request';

@Component({
  selector: 'app-pr-review',
  templateUrl: './pr-review.component.html',
  styleUrls: ['./pr-review.component.css']
})
export class PrReviewComponent implements OnInit {
  jr: JsonResponse;
  prs: PurchaseRequest[];
  sortablePrs: SortablePurchaseRequest[];
  title: string = 'Purchase Request Review List';
  user: User;
  sortColumn: string = 'name';
  sortOrder: string = 'asc';
  constructor(private prSvc: PurchaseRequestService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
    this.user = this.sysSvc.data.user.instance;
    this.prSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prs = this.jr.data as PurchaseRequest[];
          this.sortablePrs = this.prs as SortablePurchaseRequest[];
          this.sortablePrs.forEach(sprs => {
            sprs.userName = sprs.user.userName;
          })
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  review(): PurchaseRequest[] {
    let inReview = [];
    for (let i of this.sortablePrs) {
      if (i.status === 'Review' && i.user.id !== this.user.id) {
        inReview.push(i);
      }
    }
    return inReview;
  }

  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    }
    this.sortColumn = col;
  }
}
