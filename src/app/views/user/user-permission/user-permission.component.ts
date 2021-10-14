import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShowOnTablePipe } from '../../../_pipe/show-on-table.pipe';
import { AlertService, AuthenticationService, UserService } from '../../../_services';
declare var jQuery: any;


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})

export class UserPermissionComponent implements OnInit, AfterViewInit {
  constructor(private alertService: AlertService, private userService: UserService) {
    this.showPermission();
    this.getRole()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      Promise.resolve().then(() => { this.addCheckbox() })
    }, 0);
  }

  getResponce: any;

  roles = []

  // roles = { 'Anonymous User': 'anonymous_user', 'Administrator': 'administrator', 'Sales': 'sales', 'Relationship Manager': 'relationship_manager' };

  permissions = { 'read user': 'user_read', 'create new user': 'user_create', 'update user': 'user_update', 'delete user': 'user_delete', 'add company':'add_company', 'view _company': 'view_company', 'update company' :'update_company', 'delete company':'delete_company', 'view contact':'view_contact', 'add contact':'add_contact', 'update contact':'update_contact', 'delete contact':'delete_contact', 'email read':'email_read', 'send mail':'send_mail', 'send greeting':'send_greeting', 'mailchimp config':'mailchimp_config','create template':'create_template','view template':'view_template','update template':'update_template', 'delete template':'delete_template','sms read':'sms_read', 'sms mail':'sms_mail','add term':'add_term','add tags':'add_tags', 'update tags':'update_tags', 'delete tags':'delete_tags','view tags':'view_tags'}

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
          console.log(`${role + "_" + proprty}`);

        }
      }
    });
  }

  userPermission = [];

  savePermission(id: any) {
    this.userPermission.splice(0, this.userPermission.length);
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
        this.alertService.error('Something Went Worng ' + err, { keepAfterRouteChange: false })
        alert('Something Went Worng ' + err);
      })
    } else {
      console.log(this.userPermission);

      this.userService.updateRole(this.roleId, this.userPermission).subscribe((data: any) => {
        console.log('data', data);
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


  getRole() {
    this.userService.showRoles().subscribe((data: any) => {
      let roles = data.data
      roles.forEach((element: { roleName: string; }, index: any) => {
        let i = index;
        let roleValue: string = element.roleName;
        var obj: any = {}
        obj.item_id = i
        obj.item_text = roleValue
        this.roles.push(obj);
        console.log(this.roles);
      });
    })
  }
}