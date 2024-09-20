import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect,Actions,ofType } from "@ngrx/effects";
import { confirmPayment, paymentFailure, paymentSuccess } from "./order.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { OrderConfirmService } from "../../../services/order/order.service";


@Injectable({
    providedIn:'root'
})

export class PaymentEffect{
    
    private actions$ = inject(Actions);

    constructor(private orderConfirmService:OrderConfirmService, private router:Router){}

    paymentStatus = createEffect(()=>
        this.actions$.pipe(
            ofType(confirmPayment),
            mergeMap((action)=>{
                 return this.orderConfirmService.getPaymentUpdate(action).pipe(
                    map((response) => paymentSuccess({ paymentData: response.paymentData })),
                    catchError((error) => 
                         of(paymentFailure({ error: error.error.error }))  // Continue with your existing logic
                      )
                );
            })

        )
    )
}