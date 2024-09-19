import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { getPaymentData } from '../redux/placeorder/store/order.selector';
import { Store } from '@ngrx/store';
import { getOrderDetails } from '../checkoutpage/store/checkout.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit, OnDestroy {

  orderId:number=0;
  userName:string='';
  orderSubscriber:any;
  nameSubscriber:any;

  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {
    this.orderSubscriber = this.store.select(getPaymentData).subscribe(
      (data) => {
        this.orderId=data;
      }
    );
    this.nameSubscriber = this.store.select(getOrderDetails).subscribe(
      (data)=>{
        this.userName = data.username;
      }
    )
  }

  navigateToHome(){
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    this.nameSubscriber.unsubscribe();
    this.orderSubscriber.unsubscribe();
  }

}
