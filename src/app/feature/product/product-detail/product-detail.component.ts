import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  jr: JsonResponse;
  productIdStr: string;
  product: Product;
  title: string = 'Product Detail';
  authenticatedUser = User;

  constructor(private productSvc: ProductService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.route.params.subscribe(params => this.productIdStr = params['id']);
    this.productSvc.get(this.productIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.product = this.jr.data as Product;
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  remove() {
    this.productSvc.delete(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        console.log('gud');
        this.router.navigate(['/product/list']);
        alert('Product Deleted succesfuly');
      }
    )
  }
}
