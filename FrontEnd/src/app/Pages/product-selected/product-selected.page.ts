import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/Services/store.service';
import { Location } from "@angular/common";
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-product-selected',
  templateUrl: './product-selected.page.html',
  styleUrls: ['./product-selected.page.scss'],
})
export class ProductSelectedPage implements OnInit {

  idStore: string
  idProduct:string

  product= {
    amount: 0,
    description: '',
    name: '',
    pathImage: '',
    price: 0,
    _id: ''
  }

  user = {
    Active: true,
    email: '',
    name: '',
    typeUser: 0,
    imagePath: '',
    _id: ''
  }

  constructor(private aRouter: ActivatedRoute, public storeS: StoreService, public router: Router, private location: Location, public userS: UserService) { }

  ngOnInit() {
    this.getProduct()
  }

  getProduct(){
    this.aRouter.params.subscribe(param=>{
      this.idStore = param['idStore']
      this.idProduct = param['idProduct']
    })
    this.storeS.getProductById(this.idStore, this.idProduct).subscribe((res:any)=>{
      this.product = res.res        
    })
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

  regresar(){   
    this.router.navigateByUrl(`/selected-store/${this.idStore}`)
    console.log(this.idProduct);
    
  }
}

