import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../primeNg-Material/prime-ng-material.components';
import { SubjectsTypesService } from './service/subjects-types.service';
import { StockItems } from './model/stockItems';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-types-of-subjects',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './types-of-subjects.component.html',
  styleUrl: './types-of-subjects.component.css',
  providers:[SubjectsTypesService]
})
export class TypesOfSubjectsComponent implements OnInit {
  futureStock: number = 0;
  futureStockReturn:number=0;
  lastestStockPrice: number = 0;
  allStockValues: StockItems[] = [];
  lastStockPriceForToday: number = 0;
  lastReturn:number=0;
  today: Date = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  formattedDate = `${this.day.toString().padStart(2, '0')}/${this.month
    .toString()
    .padStart(2, '0')}`;

  form = new FormGroup({
    stockID: new FormControl<string>('', Validators.required),
    stockName: new FormControl<string>('', Validators.required),
    stockPrice: new FormControl<number>(0, Validators.required),
    totalStockBalance: new FormControl<number>(0, Validators.required),
  });
  totalStockPrice:number=0;

  constructor(private subjectTypesService: SubjectsTypesService) {}

  ngOnInit(): void {
    this.subjectTypesService.subjectItems$.subscribe({
      next: (value) => {
        console.log(value);
        this.futureStock = value;
        this.futureStockReturn = this.subjectTypesService.defaultReturnValue;
      },
    })
    this.subjectTypesService.futureStockPrice();
    this.subjectTypesService.behaviourSubject$.subscribe((data) => {
      this.lastestStockPrice = data[data.length-1]?.stockPrice || 0;
      this.totalStockPrice = data[data.length-1]?.totalStockBalance;
      
    });

    this.subjectTypesService.replaySubject$.subscribe((data)=>{
      this.allStockValues = data;
    })

    this.subjectTypesService.asyncSubject$.subscribe((data)=>{
      this.lastStockPriceForToday = data.totalStockBalance;
      this.lastReturn = data.stockPrice;
    })
  }

  addNewStock() {
    const price: any = this.form?.get('stockPrice')?.value;
    if (price) {
      this.form.patchValue({
        totalStockBalance: (((price) * (this.subjectTypesService.lastestPrice))/100) + this.subjectTypesService.lastestPrice,
      });
      console.log(this.form.value);
      if (this.form.valid) {
        const formValues: StockItems = {
          stockID: this.form.get('stockID')?.value || '',
          stockName: this.form.get('stockName')?.value || '',
          stockPrice: this.form.get('stockPrice')?.value || 0,
          totalStockBalance: this.form.get('totalStockBalance')?.value || 0,
        };
        this.subjectTypesService.setTheStockData(formValues);
        this.subjectTypesService.futureStockPrice();
      }
    }
  }

  closeTheStock(){
    this.subjectTypesService.closeTheStock();
  }
}
