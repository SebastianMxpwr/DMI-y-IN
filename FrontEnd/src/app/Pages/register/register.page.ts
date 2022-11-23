import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user={ 
    name: '',
    email: '',
    password: ''
  }

  constructor(public userS: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.userS.registerUser(this.user).subscribe((user:any)=>{
      localStorage.setItem('_id', user.res._id)
      this.router.navigate(['/stores'])
      
    },err=>{
      console.log(err);
      
    })
    }


}
