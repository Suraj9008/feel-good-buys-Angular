import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { navItems } from '../_nav';
import { MyINavData } from '../_models/MyINavData'
import { AuthenticationService } from './authentication.service';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items$: Observable<MyINavData[]>;
  navigation = navItems

  constructor(private authService: AuthenticationService) {
    this.items$ = this.getSidebarItems();
  }

  rolePermission = JSON.parse(localStorage.getItem('rolePermission'));
  private getSidebarItems(): Observable<MyINavData[]> {
    let navItems: MyINavData[] = new Array<MyINavData>();
    this.navigation.forEach((item) => {
    //   if(item.role != undefined){
    //   item.role.forEach(itmelemnt=>{
    //     console.log(itmelemnt);
    //     let role = this.rolePermission.permission;
    //     role.forEach((element) => {
    //       let fkey = Object.keys(element)[0]
    //       if (fkey == itmelemnt) {
            
    //       }
    //     });
    //   });
    // }
    });
    return of(this.navigation);
  }
}
