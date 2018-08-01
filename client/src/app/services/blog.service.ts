import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http' ;
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class BlogService {
	
httpOptions;
	domain =this.authService.domain;

  constructor(
private authService:AuthService,
private http:HttpClient
  	) { }

createHeader(){
   this.authService.loadToken();

 this.httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.authService.authToken
  })
};
}

newBlog(blog){
this.createHeader();
    return this.http.post(this.domain + "/blogs/newBlog",blog, this.httpOptions);
  }

getAllBlogs(){
	
this.createHeader();
return this.http.get(this.domain + '/blogs/allBlog', this.httpOptions);
}


getSingleBlog(id){
 this.createHeader();
return this.http.get(this.domain + '/blogs/singleBlog/' + id, this.httpOptions);
}


editBlog(blog){
this.createHeader();
return this.http.put(this.domain + '/blogs/updateBlog',blog, this.httpOptions);
}

deleteBlog(id){
this.createHeader();
return this.http.delete(this.domain + '/blogs/deleteBlog/' + id, this.httpOptions);
}

}

