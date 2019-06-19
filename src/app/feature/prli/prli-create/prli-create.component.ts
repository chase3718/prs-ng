import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';
import { PurchaseRequestLineItemService } from 'src/app/service/purchase-request-line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';

@Component({
  selector: 'app-prli-create',
  templateUrl: './prli-create.component.html',
  styleUrls: ['./prli-create.component.css']
})
export class PrliCreateComponent implements OnInit {

  title: string = 'Prli Create';
  jr: JsonResponse;
  prli: PurchaseRequestLineItem = new PurchaseRequestLineItem();
  pr: PurchaseRequest;
  products: Product[];
  prid: string;

  constructor(private prliSvc: PurchaseRequestLineItemService,
              private prSvc: PurchaseRequestService,
              private productSvc: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.prid = params['id']);
    this.prSvc.get(this.prid).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    )
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.products = this.jr.data as Product[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }

  create() {
    this.prli.purchaseRequest = this.pr;
    this.prliSvc.create(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/pr/pr-lines/' + this.pr.id]);
          alert('Prli created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create prli');
        }
      }
    )
  }
}
