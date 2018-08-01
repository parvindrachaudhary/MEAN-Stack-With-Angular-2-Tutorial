import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  messageClass;
	message;
	blog={
    title:String,
    body:String
  };
    processing=false;
    currentUrl;
    loading = true;
     
  constructor(
  	private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService:BlogService,
    private router: Router
  	) { }

  goBack(){
  	this.location.back();
  }

  updateBlogSubmit(){
     this.processing = true;
     this.blogService.editBlog(this.blog).subscribe((data:any)=>{
     	if(!data.success){
     		this.messageClass ='alert alert-danger';
     		this.message = data.message;
     		this.processing = false;

     	} else{
     		this.messageClass ='alert alert-success';
     		this.message =data.message;


     		setTimeout(()=>{
     			this.router.navigate(['/blog']);
     		},2000);
     	}
     });

  }

  ngOnInit() {
  	this.currentUrl = this.activatedRoute.snapshot.params;
  	this.blogService.getSingleBlog(this.currentUrl.id).subscribe((data:any)=>{
       if(!data.success){
              
        this.messageClass = 'alert alert-danger';
        this.message =data.message;

       } else{
            this.blog = data.blog;
            this.loading = false;      
       }  
        
  	});
  }

}
