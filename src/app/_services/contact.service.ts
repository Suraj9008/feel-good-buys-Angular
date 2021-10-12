import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }
  apiURL: any = "https://angular-crm-backend.herokuapp.com";
  
  create(contact: any) {
    return this.http.post(this.apiURL+`/contact/createContact`, contact);
  }
}