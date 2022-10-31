import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-selected-store',
  templateUrl: './selected-store.page.html',
  styleUrls: ['./selected-store.page.scss'],
})
export class SelectedStorePage implements OnInit {

  id: string;
  product= {

  }
  store={
    Active: false,
    directionStore: '',
    imagePath: '',
    lat: '',
    long: '',
    name: '',
    products: [{
      amount: 0,
      description: '',
      name: '',
      pathImage: '',
      price: 0,
      _id: ''
    }],
    _id: ''
  }
  constructor(private aRouter: ActivatedRoute, public storeS: StoreService, public router: Router) { }

  ngOnInit() {
    this.getStoresById()
  }

  option={
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween:10
  }

  getStoresById(){
    this.aRouter.params.subscribe(param=>{
      this.id = param['idStore']
      this.storeS.getStoreById(this.id).subscribe((res:any)=>{
        this.store = res.res
        console.log(this.store);
      },err =>{
        console.log('Error del service',err);
        
      })
    },err=>{
      console.log('Error de params',err);
    })
  }

  goToProduct(id){
    this.router.navigate(['/product-selected',this.id, id])
    
  }


}
