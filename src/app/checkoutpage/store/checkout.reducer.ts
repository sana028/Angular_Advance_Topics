import { createReducer, on } from "@ngrx/store";
import { _orderDetails, OrderDetails } from "./checkout.state";
import { addressInfo } from "./checkout.action";


const checkoutDetailsReducer = createReducer(
    _orderDetails,
    on(addressInfo,(state,action)=>{
         return{
           ...state,
           address:action.address,
           city:action.city,
           username:action.username,
           zipCode:action.zipCode,
           country:action.country,
           orderTotal:action.orderTotal
         }
    })
);



export const _checkOutDetailsReducer = (state:any,action:any) =>{
    return checkoutDetailsReducer(state,action);
}