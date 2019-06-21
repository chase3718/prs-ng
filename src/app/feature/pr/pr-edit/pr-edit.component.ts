import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-pr-edit',
  templateUrl: './pr-edit.component.html',
  styleUrls: ['./pr-edit.component.css']
})
export class PrEditComponent implements OnInit {

  jr: JsonResponse;
  prIdStr: string;
  pr: PurchaseRequest;
  title: string = 'Purchase Request Edit';

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
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  edit() {
    this.prSvc.update(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/pr/list']);
          alert('PurchaseRequest Updated succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to update pr');
        }
      }
    )
  }
}
