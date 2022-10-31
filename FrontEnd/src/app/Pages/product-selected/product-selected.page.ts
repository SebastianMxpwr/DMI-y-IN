import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/Services/store.service';
import { Location } from "@angular/common";



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
  constructor(private aRouter: ActivatedRoute, public storeS: StoreService, public router: Router, private location: Location) { }

  ngOnInit() {
    this.getProduct()
  }

  getProduct(){
    this.aRouter.params.subscribe(param=>{
      this.idStore = param['idStore']
      this.idProduct = param['idProduct']
      this.storeS.getProductById(this.idStore, this.idProduct).subscribe((res:any)=>{
        this.product = res.res        
      })
    })
  }

  regresar(){
    this.location.back();
    
    // this.router.navigate(['/selected-store', this.idStore])
    console.log('aplicada');
    
  }
}

