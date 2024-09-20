import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Products[] = [];

  private cartItemsSubject = new BehaviorSubject<Products[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addTheProduct(product: any) {
    if (product.counter > 0) {
      product.counter = product.counter + 1;
      const data = this.cartItems.findIndex((item) => item.Id == product.Id);
      this.cartItems[data].counter = product.counter;
      this.cartItemsSubject.next(this.cartItems);
    } else {
      product.counter = product.counter + 1;
      this.cartItems.push(product);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  removeTheProduct(productId: number) {
    const data = this.cartItems.findIndex((item) => item.Id == productId);
    this.cartItems[data].counter = this.cartItems[data].counter -1;
    this.cartItemsSubject.next(this.cartItems);
  }

  deleteTheProduct(productId:number){
    const index = this.cartItems.findIndex((item) => item.Id == productId);
    this.cartItems[index].counter = 0;
    this.cartItems = this.cartItems.filter((item)=>item.Id != productId);
    this.cartItemsSubject.next(this.cartItems);
    // console.log(this.cartItems)
    // if (index !== -1) {
    //   // Create a new array with the updated values
    //   const updatedCartItems = this.cartItems.map((item, i) => 
    //     i === index ? { ...item, counter: 0 } : item
    //   ).filter((item) => item.Id !== productId);
      
    //   // Update the BehaviorSubject
    //   this.cartItems = updatedCartItems;
    //   this.cartItemsSubject.next(this.cartItems);
    // }
  }

  RefreshTheCart(){
    this.cartItems.forEach((item) => {
      item.counter = 0;  
  });
    this.cartItems = [];

    this.cartItemsSubject.next(this.cartItems);
  }
}
