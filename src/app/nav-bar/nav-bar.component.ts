import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { interval, Observable } from 'rxjs';
import { CardComponent } from '../components/card/card.component';
import { CartService } from '../services/cart/cart.service';
import { items } from '../helpers/navbar-items';
import { Products } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    CardComponent,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',

})
export class NavBarComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined = items;
  timerObservable: Observable<number> | undefined;
  counter: number = 0;
  list: any;

  constructor(private cartService:CartService, private router:Router){}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items: Products[]) => {
      const totalCounter = items?.reduce((sum, product) => sum + product.counter, 0);
      this.counter = totalCounter;

    });
  }
  navigateToCartPage(){
    this.router.navigateByUrl('cart-page');
  }
  ngOnDestroy() {
    
  }
}
