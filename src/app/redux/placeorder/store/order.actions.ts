import { createAction, props } from "@ngrx/store";

export const confirmPayment = createAction('[Payment] Confirm Payment', props<{ paymentAmount:number,paymentMethod:string,country:string }>());
export const paymentSuccess = createAction('[Payment] Payment Success', props<{ paymentData: any }>());
export const paymentFailure = createAction('[Payment] Payment Failure', props<{ error: string }>());