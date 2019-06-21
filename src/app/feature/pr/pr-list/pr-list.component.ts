import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  jr: JsonResponse;
  prs: PurchaseRequest[];
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
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }

  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
      console.log(`sortBy(${col}), order(${this.sortOrder})`);
    }
    this.sortColumn = col;
  }
}
