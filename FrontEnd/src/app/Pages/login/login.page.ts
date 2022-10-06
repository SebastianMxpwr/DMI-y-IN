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

  login(email, password){
    console.log(email.value, password.value);
    
    }
  }

