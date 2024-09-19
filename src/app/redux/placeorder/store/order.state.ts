export interface PaymentState {
  paymentAmount:number,
  paymentMethod: string,
  country:string,
  paymentStatus: any;
  paymentData: any; // could be specific to your API response
  error:  string;
}

export const _paymentState: PaymentState = {
  paymentAmount:0,
  paymentMethod:'',
  country:'',
  paymentData: '',
  error: '',
  paymentStatus: 'pending',
};
