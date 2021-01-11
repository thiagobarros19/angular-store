import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartProduct {
  id: number;
  product: string;
  image: string;
  amount: number;
  price: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProductArray: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);

  cartProductObs = this.cartProductArray.asObservable();

  insertCartProduct(cartProduct: CartProduct): void{
    if(cartProduct){
      let contains = false;
      let myCartProducts = this.cartProductArray.getValue();

      myCartProducts.map((product, index) => {
        if(cartProduct.id === product.id){
          myCartProducts[index].amount++
          contains = true;
        }
      })

      if(!contains) myCartProducts.push(cartProduct);

      this.cartProductArray.next(myCartProducts);
    }
  }

  removeCartProduct(cartProductId: number): void{
    if(cartProductId){
      let itemIndex;
      let myCartProducts = this.cartProductArray.getValue();

      myCartProducts.map((product, index) => {
        if(cartProductId === product.id){
          if(product.amount > 1){
            myCartProducts[index].amount--;
          }else{
            itemIndex = index
          }
        }
      })

      if(itemIndex) myCartProducts.splice(itemIndex, 1);

      this.cartProductArray.next(myCartProducts);
    }
  }

  deleteCartProduct(cartProductId: number): void{
    if(cartProductId){
      let itemIndex;
      let myCartProducts = this.cartProductArray.getValue();

      myCartProducts.map((product, index) => {
        if(cartProductId === product.id){
          itemIndex = index
        }
      })

      if(itemIndex) myCartProducts.splice(itemIndex, 1);

      this.cartProductArray.next(myCartProducts);
    }
  }

  emptyCartProduct(): void{
    this.cartProductArray.next([]);
  }

}
