import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  title: string = 'Product Create';
  jr: JsonResponse;
  product: Product = new Product();
  vendors: Vendor[];
  fileVendor: Vendor;
  selectedFiles: FileList = null;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 }

  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private sysSvc: SystemService,
    private router: Router) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
    this.vendorSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendors = this.jr.data as Vendor[];
        } else {
          console.log(this.jr.errors);
        }
      }
    )
  }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    if (this.selectedFiles != null) {
      this.progress.percentage = 0;

      this.currentFileUpload = this.selectedFiles.item(0)
      this.productSvc.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {

        }
      })

      this.selectedFiles = undefined
      this.productSvc.fromFile(this.fileVendor).subscribe(
        jresp => {
          this.jr = jresp;
          if (this.jr.errors == null) {
            alert('Upload succesful');
            this.router.navigate(['/product/list']);
          } else {
            alert('Unable to upload file');
            console.log(this.jr.errors);
          }
        }
      )
    }
  }

  hasNull(target) {
    for (let member in target) {
      if (target[member] == null && member !== 'id' && member !== 'unit' && member !== 'photoPath') {
        return true;
      }
    }
    return false;
  }

  create() {
    if (this.hasNull(this.product)) {
      alert('All fields must be filled (except unit and photo path)');
    } else {

      console.log(this.product, JSON.stringify(this.product.vendor));
      this.productSvc.create(this.product).subscribe(
        jresp => {
          this.jr = jresp;
          if (this.jr.errors == null) {
            this.router.navigate(['/product/list']);
            alert('Product created succesfuly');
          } else {
            console.log(this.jr.errors);
            alert('Failed to create product');
          }
        }
      )
    }
  }

}
