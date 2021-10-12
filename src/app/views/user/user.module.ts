import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { TaxonomyService} from '../taxonomy.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from '../../_components/alert.component';
import { AlertService } from '../../_services/alert.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranformPipe } from '../../_pipe/tranform.pipe';
import { ShowOnTablePipe } from '../../_pipe/show-on-table.pipe';


@NgModule({
  declarations: [
    ProfileListComponent,
    AddUserComponent,
    EditProfileComponent,
    UserRoleComponent,
    UserPermissionComponent,
    AlertComponent,
    TranformPipe,
    ShowOnTablePipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgMultiSelectDropDownModule.forRoot(),
   
  ],
  providers:[TaxonomyService,AlertService]
})
export class UserModule { }