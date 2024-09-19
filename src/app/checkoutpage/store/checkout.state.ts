export interface OrderDetails{
    username:string,
    address:string,
    city:string,
    zipCode:number,
    country:string,
    orderTotal:number
}

export const _orderDetails:OrderDetails = {
    username:'',
    address:'',
    city:'',
    zipCode:0,
    country:'',
    orderTotal:0
}