import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { SidebarService } from '../../_services/sidebar.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private sidebarService: SidebarService, private router:Router){
  }
  ngOnInit(): void {

  }
  
  logout(){
    window.localStorage.clear();
    window.location.reload();
    window.location.replace('/');
  }
  
  public sidebarMinimized = false;
  public navItems = navItems;
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}