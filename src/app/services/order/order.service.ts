import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PaymentState } from "../../redux/placeorder/store/order.state";


@Injectable({
    providedIn:'root'
})

export class OrderConfirmService{

    constructor(private http:HttpClient){}

    getPaymentUpdate(data:any):Observable<PaymentState>{
        return this.http.post<PaymentState>(environment.Api_Url+'/placeOrder',data);
    }
}