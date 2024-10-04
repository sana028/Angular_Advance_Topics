import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject,ReplaySubject,AsyncSubject } from 'rxjs';
import { StockItems } from '../model/stockItems';

@Injectable({
  providedIn: 'root'
})
export class SubjectsTypesService {

   price:number = 2000;
   lastestPrice:number =2000;
   defaultReturnValue = 0.15;

  //subject is used to perform multicast 
  private subject  = new Subject<number>();

  private stockItems :StockItems[]  = [];

  private behaviourSubject = new BehaviorSubject<StockItems[]>(this.stockItems);

  private replaySubject = new ReplaySubject<StockItems[]>(Infinity);

  private asyncSubject = new AsyncSubject<StockItems>();

  subjectItems$=this.subject.asObservable();

  behaviourSubject$ = this.behaviourSubject.asObservable();

  replaySubject$ = this.replaySubject.asObservable();

  asyncSubject$ = this.asyncSubject.asObservable();
  

  setTheStockData(stockData:StockItems){
    this.defaultReturnValue = stockData.stockPrice + 0.15;
    this.lastestPrice = stockData.totalStockBalance;
    this.price = stockData.totalStockBalance;
    this.subject.next(stockData.totalStockBalance);
    this.stockItems.push(stockData);
    this.behaviourSubject.next(this.stockItems);
    this.replaySubject.next(this.stockItems);
    this.asyncSubject.next(stockData);
  }

  closeTheStock(){
    this.asyncSubject.complete();
  }

  futureStockPrice(){
    const futurePrice = (this.price * (this.defaultReturnValue))/100;
    this.subject.next(futurePrice+this.price);
  }

}
