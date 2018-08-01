import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http' ;
import { JwtHelperService } from '@auth0/angular-jwt';







@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 authToken;
 user;
 isExp;


domain ='http://localhost:8080';


  constructor( private http: HttpClient,) { }

  

  

  registerUser(user){
 

  return this.http.post(this.domain + '/authentication/register', user) ;
  }


   checkUsername(username){
  

  return this.http.get(this.domain + '/authentication/checkUsername/' + username) ;
  }


   checkEmail(email){


  return this.http.get(this.domain + '/authentication/checkEmail/' + email) ;
  }
 
login(user){
  return this.http.post(this.domain + '/authentication/login', user);
}
logout(){
  this.authToken =null;
  this.user =null;
  localStorage.clear();
}

  storeUserData(token,user){
     localStorage.setItem('token',token);
     localStorage.setItem('user',JSON.stringify(user));
     this.authToken =token;
     this.user =user;
  }

  loadToken(){
    
    this.authToken =localStorage.getItem('token');
  }

 getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get(this.domain + "/authentication/profile", {
      headers
    });
  }
 logedIn(): boolean{
const authToken =localStorage.getItem('token');
  
  const helper= new JwtHelperService();
  
 return !helper.isTokenExpired(authToken);
  
 
}

}
