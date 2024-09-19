import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({
    providedIn:'root'
})

export class OrderConfirmService{

    constructor(private http:HttpClient){}

    getPaymentUpdate(data:any):Observable<any>{
        return this.http.post(environment.Api_Url+'/placeOrder',data);
    }
}