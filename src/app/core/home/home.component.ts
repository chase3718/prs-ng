import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logged = false;
  user: User;
  prs: PurchaseRequest[];
  jr: JsonResponse;

  constructor(private sysSvc: SystemService,
              private prSvc: PurchaseRequestService,
              private router: Router) { }

  ngOnInit() {
    if (this.sysSvc.data.user.loggedIn) {
      this.user = this.sysSvc.data.user.instance;
      this.logged = true;
      this.prSvc.getFromUser(JSON.stringify(this.user.id)).subscribe(
        jresp => {
          this.jr = jresp;
          if (this.jr.errors == null) {
            this.prs = this.jr.data as PurchaseRequest[];
          } else {
            alert('There was an issue');
            console.log(this.jr.errors);
          }
        }
      )
    } else {
      this.router.navigate(['user/login']);
    }
  }

}
