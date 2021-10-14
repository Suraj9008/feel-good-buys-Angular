import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { navItems } from '../_nav';
import { MyINavData } from '../_models/MyINavData'
import { AuthenticationService } from './authentication.service';
import * as _ from 'lodash';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items$: Observable<MyINavData[]>;
  navigation = navItems
  childArray = <any>[]
  parentObj= <any>{}
  constructor() {
    this.items$ = this.getSidebarItems();
  }

  rolePermission = JSON.parse(localStorage.getItem('rolePermission'));
  private getSidebarItems(): Observable<MyINavData[]> {
    let navItems: MyINavData[] = new Array<MyINavData>();
    
    this.navigation.forEach((item: any) => {
      // console.log(item);
      let children: any = item.children 
      this.childArray=<any>[];
      if (children !== undefined) {
        children.forEach((element: any) => {
          let childpermission = element.permissions;
          let rolePermission = this.rolePermission;
          let value = this.findCommonElements(rolePermission, childpermission);
          if (value) {
            this.childArray.push(element);
          }
        });

        if(this.childArray.length > 0){
          item.children = this.childArray 
          navItems.push(item)
        }
      }
    });
    return of(navItems);
  }

  findCommonElements(arr1, arr2) {
    return arr1.some(item => {
      if (typeof arr2 !== 'undefined' && arr2.length > 0) {
        return arr2.includes(item)
      } else {
        return false
      }
    })
  }
}
