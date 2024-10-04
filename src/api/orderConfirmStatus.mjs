
import express from 'express';
import { products } from './products.mjs';

const router= express.Router();


router.post('/placeOrder',async(req,res)=>{
    const {paymentAmount,paymentMethod,country} = req.body;
        console.log(req.body);
    if(paymentAmount %2 ==0 && paymentMethod == 'credit card'){
        res.status(200).json({message:'Order placed successfully',
            paymentStatus:'Success',
            paymentData:'#order12398r47yr',
        })
    }
    else{
        res.status(400).json({message:'Invalid payment details',
            paymentStatus:'Failed',
            error:"Your payment need more time to take confirmation from your bank"});
    }
})

router.get('/fetchTheData',async(req,res)=>{
     res.status(200).send(products);
})
export default router;