import { Component, OnInit,AfterViewInit} from '@angular/core';
import { AlertService, AuthenticationService, UserService } from '../../../_services';
declare var jQuery: any;


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})

export class UserPermissionComponent implements OnInit, AfterViewInit {
  constructor(private alertService:AlertService, private userService: UserService) {
    this.showPermission();
   }

  ngAfterViewInit(): void {
    setTimeout(() => {
      Promise.resolve().then(()=>{this.addCheckbox()})
    }, 0);
    } 

  getResponce: any;

  roles = { 'Anonymous User': 'anonymous_user', 'Administrator': 'administrator', 'Sales': 'sales', 'Relationship Manager': 'relationship_manager' };
  
  permissions = { 'read user': 'user_read', 'create new user': 'user_create', 'update user': 'user_update', 'delete user': 'user_delete' }

  roleId = ""
  isChecked: any = []
  getcheck: any


  addCheckbox() {
    this.getResponce[0].permission.forEach((element: { [x: string]: { role: any; }; }) => {
      for (let property in this.permissions) {
        let proprty = this.permissions[property]
        let elemnt = Object.keys(element)
        let firstKey = Object.keys(element)[0];
        let r = element[firstKey].role
        let role = Object.keys(r)[0]
        if (proprty == elemnt) {
          this.isChecked[`${role + "_" + proprty}`] = true;
        }
      }
    });
  }

  userPermission = []
  
  savePermission(id: any) {
    this.userPermission.splice(0,this.userPermission.length);
    let names: Array<string> = jQuery('#' + id).serializeArray()
    names.forEach((element: any) => {
      let nameValue: string = element.name;
      let val = nameValue.split('[')
      let key = val[0]
      let rol = val[1].split(']')
      let roles = rol[0]
      let rolePermissons = {
        [key]: {
          "role": {
            [roles]: 1
          },
        }
      };
      this.userPermission.push(rolePermissons)
    });
    
    if (!this.roleId) {
      this.userService.addUserRole(this.userPermission).subscribe(data => {
        this.alertService.success('Permission Changed Successfully', { keepAfterRouteChange: true });
        alert('Permission Changed Successfully');
      }, err => {
        this.alertService.error('Something Went Worng '+err, { keepAfterRouteChange: false })
        alert('Something Went Worng '+err);
      })
    } else {
      console.log(this.userPermission);
      
      this.userService.updateRole(this.roleId, this.userPermission).subscribe((data: any) => {
        console.log('data',data);
        this.getResponce = data.users
      }, error => { error });
    }
  }


  showPermission() {
    this.userService.getUserRole().subscribe((data: any) => {
      this.getResponce = data.users;
      if (this.getResponce !== "") {
        this.roleId = this.getResponce[0]._id;
        console.log(this.roleId);
      }
    }, error => { error });
  }

  ngOnInit(): void {
    this.showPermission();
  }
}
