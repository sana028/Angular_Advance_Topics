import { createFeatureSelector,createSelector } from "@ngrx/store";
import { _orderDetails, OrderDetails } from "./checkout.state";

const orderFeature = createFeatureSelector<OrderDetails>('addressInfo');

export const getOrderDetails = createSelector(orderFeature,(state)=>{
    return state;
})



