import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reroute',
  templateUrl: './reroute.component.html',
  styleUrls: ['./reroute.component.css']
})
export class RerouteComponent implements OnInit {

  reroute: string;
  id: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
    this.router.navigate(['pr/lines/', this.id]);
  }

}
