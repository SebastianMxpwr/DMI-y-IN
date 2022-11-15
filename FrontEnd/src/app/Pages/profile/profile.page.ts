import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {
    Active: Boolean,
    email: String,
    name: String,
    typeUser: Number,
    imagePath: String,
    _id: String
  }
  constructor(public userS: UserService, public router: Router) { }

  ngOnInit() {
    this.getUserForData()
  }

  getUserForData(){
    const id = localStorage.getItem('_id')
    this.userS.getUserByid(id).subscribe((res:any)=>{
      this.user = res.res
      console.log(this.user);
            
    },err=>{
      console.error(err);
      
    })
  }

}
