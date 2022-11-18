import { Component } from '@angular/core';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user = {
    Active: Boolean,
    email: String,
    name: String,
    typeUser: Number,
    imagePath: String,
    _id: String
  }
  constructor(public userS: UserService) {}
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
