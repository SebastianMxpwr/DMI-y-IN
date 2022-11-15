import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/Services/store.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-selected-store',
  templateUrl: './selected-store.page.html',
  styleUrls: ['./selected-store.page.scss'],
})
export class SelectedStorePage implements OnInit {

  idStore: string;
  idProduct: string;
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

  user = {
    Active: true,
    email: '',
    name: '',
    typeUser: 0,
    imagePath: '',
    _id: ''
  }

  constructor(private aRouter: ActivatedRoute, public storeS: StoreService, public router: Router, public userS: UserService) { }

  ngOnInit() {
    this.getStoresById()
    this.getUserForData()
  }

  option={
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween:10
  }

  getStoresById(){
    this.aRouter.params.subscribe(param=>{
      this.idStore = param['idStore']
      this.storeS.getStoreById(this.idStore).subscribe((res:any)=>{
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
    this.aRouter.params.subscribe(param=>{
      this.idStore = param['idStore']
      this.idProduct = id
      console.log(this.idStore, this.idProduct);
    })

    this.router.navigateByUrl(`/product-selected/${this.idStore}/${this.idProduct}`)
    
  }

  regresar(){
    this.router.navigate(['/stores'])
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
