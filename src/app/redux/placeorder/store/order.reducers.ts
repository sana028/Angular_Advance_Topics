import { createReducer, on } from "@ngrx/store";
import { _paymentState } from "./order.state";
import { confirmPayment, paymentFailure, paymentSuccess } from "./order.actions";


const placeTheOrderReducer = createReducer(
    _paymentState,
    on(confirmPayment,(state,action)=>{
        return {
            ...state,
            paymentAmount:action.paymentAmount,
            paymentMethod:action.paymentMethod,
            country:action.country,
            paymentStatus:'pending',
            error:''
        };
    }),
    on(paymentSuccess,(state,action)=>{
        return{
            ...state,
            paymentStatus:"success",
            paymentData:action.paymentData,
            error:''
        }
    }),
    on(paymentFailure,(state,action)=>{
        return{
            ...state,
            paymentStatus:"failed",
            error:action.error
        }
    })
)

export const _placeTheOrderReducer = (state:any,action:any)=>{
    return placeTheOrderReducer(state,action);
}