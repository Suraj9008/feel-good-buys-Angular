import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {
  constructor(private http: HttpClient) { }

headers = new HttpHeaders()
.set('Access-Control-Allow-Origin', '*')
.set('Access-Control-Allow-Methods',' GET, POST, PATCH, PUT, DELETE, OPTIONS')
.set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
.set('Content-Type','application/x-www-form-urlencoded, multipart/form-data, text/plain')


  LinkedinToken(val:String){
    return this.http.post(
      `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${val}&client_id=86bb74gj1gubjr&client_secret=jsAHb5sUfitTlnS7&redirect_uri=http://localhost:4200/home/contact/import`,{headers:this.headers}).pipe(map(data => data))
  }

  facebookToken(){
    return this.http.get('http://localhost:5000/facebook/auth/facebook',{headers:this.headers});
  }

  outlookToken(){
    return this.http.get('http://localhost:5000/microsoft/auth/windowslive',{headers:this.headers});
  }

  salesToken(){
    return this.http.get('http://localhost:5000/linkedin/auth/linkedin',{headers:this.headers});
  }
}

  // return this.http.get('http://localhost:5000/linkedin/auth/linkedin',{headers:{'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'}});