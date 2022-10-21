import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../Services/store.service";
import { UserService } from "../../Services/user.service";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  addedStores = []
  user = {
    Active: Boolean,
    email: String,
    name: String,
    typeUser: Number,
    _id: String
  }
  constructor(public storeS: StoreService, public userS: UserService) { }

  ngOnInit() {
    this.getStores()
    this.getUserForData()
  }

  getStores(){
    this.storeS.getAllStores().subscribe((res : any)=>{
      this.addedStores = res.res
      console.log(this.addedStores);
    },err=>{
      console.log(err);
      
    })
  }

  goToStore(id){
    console.log(id);
    
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
