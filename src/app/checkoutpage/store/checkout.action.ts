import { createAction,props } from "@ngrx/store";
import { OrderDetails } from "./checkout.state";

export const addressInfo = createAction('addressInfo',props<OrderDetails>());



