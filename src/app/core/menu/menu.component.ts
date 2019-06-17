import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    new MenuItem('Home', '/home', 'This is the home menu item'),
    new MenuItem('User', '/user/list', 'This is the user menu item'),
    new MenuItem('Vendor', '/vendor/list', 'This is the vendor menu item'),
    new MenuItem('Product', '/product/list', 'This is the product menu item'),
    new MenuItem('Request', '/pr/list', 'This is the pr menu item'),
    new MenuItem('Review', '/pr/review', 'This is the pr review menu item'),
    new MenuItem('Login', '/user/login', 'This is the login menu item'),
    new MenuItem('About', '/about', 'This is the about menu item')
  ];
  constructor() { }

  ngOnInit() {
  }

}
