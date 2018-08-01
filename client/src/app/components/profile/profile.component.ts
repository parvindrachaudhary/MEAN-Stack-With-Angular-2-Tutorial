import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	username: object;
	email: object;

  constructor( private authService :AuthService) { }

  ngOnInit() {

  	  this.authService.getProfile().subscribe(profile => {
      this.username = (profile as any).user.username;
      this.email = (profile as any).user.email;
    });
  
  }

}
