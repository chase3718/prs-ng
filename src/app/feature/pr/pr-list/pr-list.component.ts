import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';
import { SortablePurchaseRequest } from 'src/app/model/sortable-purchase-request';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  jr: JsonResponse;
  prs: PurchaseRequest[];
  sortablePrs: SortablePurchaseRequest[];
  title: string = 'Purchase Request List';
  authenticatedUser: User;
  sortColumn: string = 'name';
  sortOrder: string = 'asc';
  constructor(private prSvc: PurchaseRequestService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.prSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prs = this.jr.data as PurchaseRequest[];
          this.sortablePrs = this.prs as SortablePurchaseRequest[];
          this.sortablePrs.forEach(sprs => {
            sprs.userName = sprs.user.userName;
          });
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
