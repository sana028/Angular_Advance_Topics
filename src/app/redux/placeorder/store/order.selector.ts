import { createFeatureSelector,createSelector } from "@ngrx/store";
import { PaymentState } from "./order.state";

const orderFeature = createFeatureSelector<PaymentState>('placeTheOrder');

export const getPaymentStatus= createSelector(orderFeature,(state)=>{
    return state.paymentStatus;
})

export const getPaymentData = createSelector(orderFeature,(state)=>{
    return state.paymentData;
})

export const getPaymentError = createSelector(orderFeature,(state)=>{
    return state.error;
})