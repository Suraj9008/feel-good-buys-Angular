import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  endpoint: string = 'http://localhost:5000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  users: User;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    if(this.users != undefined){
      this.users = this.getUser(this.getToken())
    }
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/user/create`;
    return this.http.post(api, user).pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user:User) {
     this.http.post<any>(`${this.endpoint}/user/login`, user)
      .subscribe((res: any) => {
        console.log(res.permisssion.permission);
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('rolePermission',JSON.stringify(res.permisssion.permission))
        this.users = this.getUser(res.data.authToken)
          console.log(this.users, "user");
        // this.getUserProfile(res.data._id).subscribe((res) => {
        //   this.currentUser = res;
        // })
        this.router.navigate(['/home']);
      })
  }

 private getUser(token:any){
    return JSON.parse(atob(token.split('.')[1])) as User
  }
  
  getToken() {
    return localStorage.getItem('authToken');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('authToken');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('authToken');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user/getUser?id=${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //removeUser
  removeUser(id):Observable<any>{
  let deleteUser = this.http.delete(`${this.endpoint}/user/delete/${id}`);
    return deleteUser;
  }

  // updateUser
  updateUser(id:any,body:any):Observable<any>{
    let updateUser = this.http.patch(`${this.endpoint}/user/update/${id}`, body);
    return updateUser;
  }

  getUserList(){
    let userList = this.http.get(`${this.endpoint}/user/allUser`);
    return userList;
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}