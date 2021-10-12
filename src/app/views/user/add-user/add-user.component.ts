import { Component, OnInit,OnChanges, SimpleChanges } from "@angular/core";

import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService, AuthenticationService, UserService } from "../../../_services";
import { TaxonomyService } from "../../taxonomy.service";


let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
  providers: [
    { provide: AuthenticationService, useClass: AuthenticationService },
  ],
})
export class AddUserComponent implements OnInit {
  name = "Angular";
  media: any;
  productForm: FormGroup;
  id: any;
  imageUrl: any;
  userName: any;
  firstName: any;
  lastName: any;
  info: any;
  email: any;
  password: any;
  mobile: any;
  address: any;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  // multiSelect
  tempDropdown = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(
    private socialMedia: TaxonomyService,
    private formbuilder: FormBuilder,
    private userInfo: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userRole: UserService
  ) {
    this.productForm = this.formbuilder.group({
      imageUrl: new FormControl(""),
      userName: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      info: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email]),
      password: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      question: new FormControl("", [Validators.required]),
      ans: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      socialMedia: formbuilder.array([])
    });
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
  }

  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }

  ngOnInit(): void {
    this.media = this.socialMedia.showSocialMedia();
    this.getRole()
  }

  getRole(){
    this.userRole.showRoles().subscribe((data: any) => {
      let roles = data.data
      roles.forEach((element: { roleName: string; }, index: any) => {
        let i = index;
        let role:string = element.roleName
        var obj:any={}
        obj.item_id = i
        obj.item_text = role
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

  // formArray
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

  deleteUser(index: number) {
    (<FormArray>this.productForm.get("socialMedia")).removeAt(index);
  }

  // user registration
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    var val = this.productForm.value;
    console.log(val, "product form");

    if (this.productForm.invalid) {
      return;
    }
    this.userInfo.signUp(val).subscribe(
      (data) => {
        console.log(data);
        this.alertService.success('User added successfully', { keepAfterRouteChange: true });
        this.router.navigate(['../profile-list'], { relativeTo: this.route });
      },
      (err) => {
        console.log(err);
        this.alertService.success('err', { keepAfterRouteChange: true });
      }
    ).add(() => this.loading = false);
    this.clrData();
  }

  clrData(): any {
    this.productForm.reset()
  }

}

