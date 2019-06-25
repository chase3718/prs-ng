import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {

    if (this.sysSvc.data.user.loggedIn) {
      let user = this.sysSvc.data.user.instance;
      this.menuItems.push(new MenuItem('Home', '/home', 'This is the home menu item'));
      this.menuItems.push(new MenuItem('User', '/user/list', 'This is the user menu item'));
      this.menuItems.push(new MenuItem('Vendor', '/vendor/list', 'This is the vendor menu item'));
      this.menuItems.push(new MenuItem('Product', '/product/list', 'This is the product menu item'));
      this.menuItems.push(new MenuItem('Request', '/pr/list', 'This is the pr menu item'));
      if (user.reviewer || user.admin) {
        this.menuItems.push(new MenuItem('Review', '/pr/review', 'This is the pr review menu item'));
      }
      //this.menuItems.push(new MenuItem('About', '/about', 'This is the about menu item'));
    } else {
      this.menuItems.push(new MenuItem('Login', '/user/login', 'This is the login menu item'));
    }
  }

  logout() {
    this.sysSvc.data.user.loggedIn = false;
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['user/login']);
  }

}
