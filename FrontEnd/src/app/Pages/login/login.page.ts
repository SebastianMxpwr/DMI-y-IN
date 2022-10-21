import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../Services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={ 
    email: '',
    password: ''
  }

  constructor(public userS: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.userS.login(this.user).subscribe((user:any) => {
      localStorage.setItem('_id', user.user._id)
      this.router.navigate(['/stores'])

      
    },err=>{
      console.log(err);
      
    })
    }
  }

