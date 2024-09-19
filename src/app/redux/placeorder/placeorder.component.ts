import { Component, OnDestroy, OnInit } from '@angular/core';
// import { PrimeNgModule } from '../../primeNg-Material/prime-ng-material.components';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { getOrderDetails } from '../../checkoutpage/store/checkout.selectors';
import { Store } from '@ngrx/store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { confirmPayment } from './store/order.actions';
import { getPaymentData, getPaymentStatus } from './store/order.selector';
import { Router } from '@angular/router';
import { PrimeNgModule } from '../../primeNg-Material/prime-ng-material.components';

@Component({
  selector: 'app-placeorder',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.css',
  providers: [ConfirmationService, MessageService],
})
export class PlaceorderComponent implements OnInit, OnDestroy {
  selectedOrder: boolean = true;
  orderTotal: number = 0;
  unsubscribeTheStore: any;
  shippingAddress: string = '';
  paymentMethod: string = '';
  country: string = '';
  paymentStatus: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cardNum: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d{12}$/g),
    ]),
    cvv: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d{3}$/g),
    ]),
    expDate: new FormControl(new Date(), Validators.required),
  });

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unsubscribeTheStore = this.store
      .select(getOrderDetails)
      .subscribe((data) => {
        this.orderTotal = data.orderTotal;
        this.shippingAddress =
          data.address +
          ' ' +
          data.city +
          ' ' +
          data.country +
          ' ' +
          data.zipCode;
        this.country = data.country;
      });
  }

  confirmThePayment = () => {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
          life: 3000,
        });
        this.payTheAmountOfOrders();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  };

  payMentMethod(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
  }

  payTheAmountOfOrders = async () => {
    if (this.form.valid) {
      this.store.dispatch(
        confirmPayment({
          paymentAmount: this.orderTotal,
          paymentMethod: this.paymentMethod,
          country: this.country,
        })
      );
      const status = await this.store
        .select(getPaymentData)
        .subscribe((res) => {
          console.log(res);
          this.paymentStatus = res;
          if (this.paymentStatus) {
            this.router.navigateByUrl('order-success');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Payment failed',
              life: 3000,
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'Please fill all the fields',
        life: 3000,
      });
    }
  };

  get name() {
    return this.form.get('name');
  }
  get cardNum() {
    return this.form.get('cardNum');
  }
  get cvv() {
    return this.form.get('cvv');
  }
  get expDate() {
    return this.form.get('expDate');
  }

  navigateToPreviousPage() {
    this.router.navigateByUrl('/check-out');
  }

  ngOnDestroy(): void {
    this.unsubscribeTheStore.unsubscribe();
  }
}
