import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';
import { PurchaseRequestLineItemService } from 'src/app/service/purchase-request-line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-prli-create',
  templateUrl: './prli-edit.component.html',
  styleUrls: ['./prli-edit.component.css']
})
export class PrliEditComponent implements OnInit {

  title: string = 'Purchase Request Line Item Edit';
  jr: JsonResponse;
  prli: PurchaseRequestLineItem;
  pr: PurchaseRequest;
  products: Product[];
  prliid: string;

  constructor(private prliSvc: PurchaseRequestLineItemService,
    private sysSvc: SystemService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
    this.route.params.subscribe(params => this.prliid = params['id']);
    this.prliSvc.get(this.prliid).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prli = this.jr.data as PurchaseRequestLineItem;
        } else {
          console.log(this.jr.errors);
        }
      }
    )
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.products = this.jr.data as Product[];
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  hasNull(target) {
    for (let member in target) {
      if (target[member] == null && member !== 'id') {
        return true;
      }
    }
    return false;
  }

  create() {

    this.pr = this.prli.purchaseRequest;
    this.prliSvc.update(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/pr-lines/' + this.pr.id]);
          alert('Line item updated succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to update line item');
        }
      }
    )

  }
}
