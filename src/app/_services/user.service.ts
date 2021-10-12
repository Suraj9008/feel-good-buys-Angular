import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { Urls } from '../../environments/environment';


@Injectable({ providedIn: 'root' })


export class UserService {
    [x: string]: any;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(Urls.localUrl+ `/user/show`);
    }

    register(user:any) {
        return this.http.post(Urls.localUrl+`/user/create`, user);
    }

    login(data: any) {
        return this.http.post(Urls.localUrl+`/user/login`, data);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }

    update(updateData:any){
        return this.http.post(Urls.localUrl+`/user/update`, updateData);
    }

    addUserRole(rolePermisson:any){
        return this.http.post(Urls.localUrl+'/userrole/create', rolePermisson)
    }

    getUserRole(){
        return this.http.get(Urls.localUrl+'/userrole/roledata');
    }
    updateRole(id:any, role:any){
        console.log(role);
        return this.http.patch(Urls.localUrl+`/userrole/update/`+id, role);
    }

    addRole(value:any){
        console.log(value);
       return this.http.post(Urls.localUrl+`/userrole/addrole`,value)
    }

    deleteRole(id:any){
        return this.http.delete(Urls.localUrl+`/userrole/deleterole/${id}`);
    }

    editRole(id:any, role:any){
        console.log(role);
        return this.http.patch(Urls.localUrl+`/userrole/updateRole/`+id, role);
    }

    showRoles(){
        return this.http.get(Urls.localUrl+`/userrole/viewrole`);
    }

}