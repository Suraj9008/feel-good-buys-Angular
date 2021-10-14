import {Component, ViewChild,OnInit, Optional} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { AlertService, AuthenticationService, UserService } from '../../../_services';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxonomyService } from '../../taxonomy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowOnTablePipe } from '../../../_pipe/show-on-table.pipe';
import { TitleCasePipe } from '@angular/common';
declare var jQuery: any;

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  providers :[{ provide: AuthenticationService, useClass: AuthenticationService }]
})


export class ProfileListComponent implements OnInit {
  displayedColumns = ['id', 'userName', 'firstName', 'lastName', 'role', 'email','mobile','address','password','action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userList = <any>[];
  updateData:any;
  productForm: FormGroup;
  id: any;
  imageUrl: any;
  userName: any;
  firstName: any;
  lastName: any;
  info: any;
  role: any;
  email: any;
  password: any;
  mobile: any;
  address: any;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  closeModal: string;

    // multiSelect
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    tempDropdown = [];

  constructor(private userData:AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    private alertService:AlertService,
    private userRole:UserService
    ) {
      this.productForm = this.formbuilder.group({
        userId: new FormControl(""),
        imageUrl: new FormControl(""),
        userName: new FormControl("", [Validators.required]),
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        info: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.email]),
        password: new FormControl("", [Validators.required]),
        mobile: new FormControl("", [Validators.required]),
        address: new FormControl("", [Validators.required]),
        question: new FormControl("",[Validators.required]),
        ans:new FormControl("",[Validators.required]),
        role: new FormControl("" ,[Validators.required]),
        'socialMedia': this.formbuilder.array([])
      });
    }
  ngOnInit(){
    this.viewUser();
    this.getRole()
    this.getRolefromUserRole()
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

 
  viewUser(){
    this.userData.getUserList().subscribe(data =>{
      this.userList = data
      this.dataSource = new MatTableDataSource(this.userList.message.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

confirmDelete(id:any, userName:any){
  if(confirm("Are you sure to delete " + userName)) {
    console.log();
    this.deleteUser(id)
  }
}

getRolefromUserRole(){
  this.userRole.showRoles().subscribe((data: any) => {
    let roles = data.data
    roles.forEach((element: { roleName: string; }, index: any) => {
      let i = index;
      let rowData:string = element.roleName;
      let titlePipe = new ShowOnTablePipe();
      let title = new TitleCasePipe();
      let role = title.transform(rowData)
      let roleValue = titlePipe.transform(role);

      var obj:any={}
      obj.item_id = i
      obj.item_text = roleValue
      this.tempDropdown.push(obj);
      this.dropdownList = this.tempDropdown
    });
  })
  this.dropdownSettings = {
    singlesSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    // allowSearchFilter: true
  };
}



  // delete User
  deleteUser(id:any){
    this.userData.removeUser(id).subscribe(data =>{
      console.log("Delete User SuccessFully");
      alert("Delete User SuccessFully")
      this.viewUser()
    },(err)=>{
      console.log('Error:'+ err);
      alert('Error: '+ err)
    });
  }


  updateUsers(){
    this.submitted = true;
    let val = this.productForm.value;
    let userId = this.productForm.value.userId
    console.log(userId);
     // reset alerts on submit
     this.alertService.clear();
      this.userData.updateUser(userId,val).subscribe(data=>{
        console.log(data);
        this.alertService.success('User added successfully', { keepAfterRouteChange: true });
        this.router.navigate(['../profile-list'], { relativeTo: this.route });
        this.viewUser()
        this.cancleForm()
      },(err)=>{
        this.alertService.error('something went worng', { keepAfterRouteChange: false });
        this.cancleForm()
      }).add(() => this.loading = false);
      this.productForm.reset();
  }

  addUser(socialMedia?: any) {
    let fg = this.formbuilder.group({
      socialMediaName: [
        socialMedia ? socialMedia.socialMediaName : "",
        Validators.compose([Validators.required]),
      ],
      Username: [
        socialMedia ? socialMedia.Username : "",
        Validators.compose([Validators.required]),
      ],
    });
    (<FormArray>this.productForm.get("socialMedia")).push(fg);
    let userIndex = (<FormArray>this.productForm.get("socialMedia")).length - 1;
  }

  deleteMedia(index: number) {
    (<FormArray>this.productForm.get("socialMedia")).removeAt(index);
  }

  // popup
  editForm(row:any) {
    jQuery('#openForm').modal('show');
    this.productForm.controls['userId'].setValue(row._id);
    this.productForm.controls['imageUrl'].setValue(row.imageUrl);
    this.productForm.controls['userName'].setValue(row.userName);
    this.productForm.controls['firstName'].setValue(row.firstName);
    this.productForm.controls['lastName'].setValue(row.lastName);
    this.productForm.controls['info'].setValue(row.info);
    this.productForm.controls['email'].setValue(row.email);
    this.productForm.controls['password'].setValue(row.password);
    this.productForm.controls['mobile'].setValue(row.mobile);
    this.productForm.controls['address'].setValue(row.address);
    this.productForm.controls['question'].setValue(row.question);
    this.productForm.controls['ans'].setValue(row.ans);
    this.productForm.controls['role'].setValue(row.role);
  }

  cancleForm() {
    jQuery('#openForm').modal('hide');
  }

  getRole(){
      this.userRole.showRoles().subscribe((data:any)=>{
        console.log(data.data);
      })
  }

  // clear form

  clrData(): any {
    console.log('cler');
    this.productForm.reset()
  }
}

export interface UserData {
  _id : String,
  userName : String,
  firstName : String,
  lastName : String,
  info : String,
  email : String,
  mobile : String,
  address : String
}
