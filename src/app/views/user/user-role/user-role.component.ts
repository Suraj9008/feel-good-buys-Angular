import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../_services';
declare var jQuery: any;
import { TranformPipe } from '../../../_pipe/tranform.pipe'
import { ShowOnTablePipe } from '../../../_pipe/show-on-table.pipe'


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  roleData: any;
  roleForm: FormGroup;

  displayedColumns = ['id', 'userRole', 'operation'];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbuilder: FormBuilder, private userRole: UserService) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    this.roleForm = this.formbuilder.group({
      roleId: new FormControl(""),
      roleName: new FormControl("", [Validators.required])
    });
  }

  addRole() {
    jQuery('#userRole').modal('show');
  }

  hideRole() {
    jQuery('#userRole').modal('hide');
  }

  saveRole() {
    let data = this.roleForm.value
    let val:string = this.roleForm.value.roleName
    let filter = new TranformPipe()
    let newVal:any = filter.transform(val)
    this.roleForm.value.roleName = newVal.toLowerCase()
    console.log(data);
    this.userRole.addRole(data).subscribe((data: any) => {
      alert("Role Created Successfully")
      this.showRole();
      this.clrData()
    }, err => {
      console.log(err);
      alert(err);
    })
    this.hideRole()
  }

  editForm(row) {
    console.log(row._id);
    jQuery('#editRole').modal('show');
    this.roleForm.controls['roleId'].setValue(row._id);
    this.roleForm.controls['roleName'].setValue(row.roleName);
  }

  confirmDelete(id:any, userName:any){
    if(confirm("Are you sure to delete " + userName)) {
      console.log();
      this.deleteRole(id)
    }
  }

  deleteRole(id: any) {
    this.userRole.deleteRole(id).subscribe((data) => {
      alert("Delete User SuccessFully")
    this.showRole()
    }, (err) => {
      console.log('Error:' + err);
      alert('Error: ' + err)
    });
    this.hideRole();
  }

  showRole() {
    this.userRole.showRoles().subscribe((data: any) => {
      this.roleData = data.data;
      this.dataSource = new MatTableDataSource(this.roleData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    })
  }


  updateRole() {
    let id = this.roleForm.value.roleId;
    let val = this.roleForm.value
    console.log(id, val);
    this.userRole.editRole(id, val).subscribe(data => {
      alert("Updated Successfully")
      this.clrData()
      this.showRole()
    }, (err) => {
      alert(err)
    })
    this.hideRole()
  }

  ngOnInit(): void {
    this.showRole()
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  clrData(): any {
    this.roleForm.reset()
  }
}


/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     userName: name,

//     userAddress:Address[Math.round(Math.random() * (Address.length - 1))],
//     userRole:UserRole[Math.round(Math.random() * (UserRole.length - 1))],
//   };
// }

// progress: Math.round(Math.random() * 100).toString(),
/** Constants used to fill up our data base. */


export interface UserData {
  id: string;
  roleName: string;
}