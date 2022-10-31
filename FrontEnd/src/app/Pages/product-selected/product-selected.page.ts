import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-product-selected',
  templateUrl: './product-selected.page.html',
  styleUrls: ['./product-selected.page.scss'],
})
export class ProductSelectedPage implements OnInit {

  idStore: string
  idProduct:string

  product= {

  }
  constructor(private aRouter: ActivatedRoute, public storeS: StoreService, public router: Router) { }

  ngOnInit() {
    this.getProduct()
  }

  getProduct(){
    this.aRouter.params.subscribe(param=>{
      this.idStore = param['idStore']
      this.idProduct = param['idProduct']
      this.storeS.getProductById(this.idStore, this.idProduct).subscribe((res:any)=>{
        console.log(res);
        
      })
    })
  }

}
