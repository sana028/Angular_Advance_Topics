import express from 'express';
import router from './api/orderConfirmStatus.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';

const app=express();
app.use(cors({
  origin: 'http://localhost:4200', // Replace this with the frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type'
}));

app.use(bodyParser.json())
app.use('/api',router);
const port = 44456;

  app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
  })