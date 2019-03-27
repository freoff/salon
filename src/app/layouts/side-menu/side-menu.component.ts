import { Component, OnInit } from '@angular/core';
import { NavigationMenuItem, navigationMenuItems } from './side-menu-items';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  navigationItems: NavigationMenuItem = navigationMenuItems;
  constructor() {}

  ngOnInit() {}
}
