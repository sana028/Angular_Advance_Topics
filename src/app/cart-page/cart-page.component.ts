import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Products } from '../models/product';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { products } from '../helpers/constant';
import { CardComponent } from "../components/card/card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, CardComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit,OnChanges {
  cartProducts:Products[] = [];
  totalItems:number = 0;
  totalAmount:number = 0;
  @Input() isPayPageVisible:boolean = false;
  constructor(private cartService:CartService, private router:Router){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isPayPageVisible'].currentValue){
      this.isPayPageVisible = changes['isPayPageVisible'].currentValue;
    }
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items)=>{
        this.cartProducts = items;
        this.totalAmount = items?.reduce((sum,product)=>sum+(product.price*product.counter),0);
        this.totalItems =  items?.reduce((sum,product)=>sum+product.counter,0);
    })
  }


  addTheProduct(product:Products){
    this.cartService.addTheProduct(product);
  }

  removeTheProduct(productId:number){
    this.cartService.removeTheProduct(productId);
  }

  deleteTheProduct(productId:number){
    this.cartService.deleteTheProduct(productId);
  }

  navigateToCheckOut(){
     this.router.navigateByUrl('check-out')
  } 
}
