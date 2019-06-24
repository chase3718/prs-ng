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
  templateUrl: './prli-create.component.html',
  styleUrls: ['./prli-create.component.css']
})
export class PrliCreateComponent implements OnInit {

  title: string = 'Add Purchase Request Line Item';
  jr: JsonResponse;
  prli: PurchaseRequestLineItem = new PurchaseRequestLineItem();
  product: Product;
  pr: PurchaseRequest;
  products: Product[];
  prid: string;
  currentProduct: string = "";
  selectedProduct: Product;

  constructor(private prliSvc: PurchaseRequestLineItemService,
    private sysSvc: SystemService,
    private prSvc: PurchaseRequestService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
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

  onProductChanged(productName) {
    console.log(productName);
    this.selectedProduct = this.getSelectedProductByName(productName);
  }

  getSelectedProductByName(selectedName: string): Product {
    return this.products.find(product => product.name === selectedName);
  }

  create() {
    this.prli.purchaseRequest = this.pr;
    this.prli.product = this.selectedProduct;
    console.log(this.product);
    this.prliSvc.create(this.prli).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.router.navigate(['/pr/lines/' + this.pr.id]);
          alert('Line item created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create line item');
        }
      }
    )
  }
}
