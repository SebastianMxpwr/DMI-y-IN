import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  user = {
    Active: Boolean,
    email: String,
    name: String,
    password: String,
    typeUser: Number,
    imagePath: File,
    _id: String
  }
  id:string
  photoSelected: string | ArrayBuffer | undefined;
  file: File;
  constructor(public userS: UserService, public router: Router) { }

  ngOnInit() {
    this.getUserForData()
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      console.log(this.file);
      
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => this.photoSelected = reader.result as string;
      reader.readAsDataURL(this.file);
    }
  }

  getUserForData(){
    this.id = localStorage.getItem('_id')
    this.userS.getUserByid(this.id).subscribe((res:any)=>{
      this.user = res.res
      console.log(this.user);
            
    },err=>{
      console.error(err);
      
    })
  }

  registerUser(){
    
    this.userS.editUser(this.user.email, this.user.name,this.file, this.id).subscribe(res=>{
      if(res){
        console.log(res);
      }
    },err=>{
      console.log(err);
      
    })
    
  }

}
