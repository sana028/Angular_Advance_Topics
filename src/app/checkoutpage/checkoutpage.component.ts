import { Component, OnInit } from '@angular/core';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { CartService } from '../services/cart/cart.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { _orderDetails } from './store/checkout.state';
import { addressInfo } from './store/checkout.action';
import { Store } from '@ngrx/store';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNgModule } from '../primeNg-Material/prime-ng-material.components';

@Component({
  selector: 'app-checkoutpage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CartPageComponent,
    PrimeNgModule,
    RouterOutlet,
  ],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css',
})
export class CheckoutpageComponent implements OnInit {
  isPayPageVisible: boolean = false;
  totalItemsAmount: number = 0;
  deliveryFee: number = 0;
  perOneItem: number = 5;
  orderTotal: number = 0;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zipCode: new FormControl(0, Validators.required),
  });

  constructor(
    private cartService: CartService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isPayPageVisible = true;
    this.cartService.cartItems$.subscribe((items) => {
      this.totalItemsAmount = items?.reduce(
        (sum, product) => sum + product.price * product.counter,
        0
      );
      const totalCounter = items?.reduce(
        (sum, product) => sum + product.counter,
        0
      );
      this.deliveryFee = totalCounter * this.perOneItem;
      this.orderTotal = this.totalItemsAmount + this.deliveryFee;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        username: this.form?.get('username')?.value || '',
        address: this.form?.get('address')?.value || '',
        city: this.form?.get('city')?.value || '',
        country: this.form?.get('country')?.value || '',
        zipCode: this.form?.get('zipCode')?.value || 0,
        orderTotal: this.orderTotal,
      };
      this.store.dispatch(addressInfo(data));
      this.router.navigateByUrl('place-order');
    }
  }
}
