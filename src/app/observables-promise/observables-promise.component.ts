import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ObservablesPromiseService } from './service/observable-promise.service';
import { Products } from '../models/product';
import { PrimeNgModule } from '../primeNg-Material/prime-ng-material.components';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { interval, switchMap, take } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-observables-promise',
  standalone: true,
  imports: [PrimeNgModule,CommonModule,NgFor],
  templateUrl: './observables-promise.component.html',
  styleUrl: './observables-promise.component.css',
 
})
export class ObservablesPromiseComponent implements OnInit, OnDestroy {
  observableAPIData: Products[] = [];
  PromiseAPIData: Products[] = [];
  first: number = 0;
  second:number =0;
  rows: number = 10;

  unsubscribeTheObservable: any;
  observableSubscription: any;

  constructor(private observablesPromiseService: ObservablesPromiseService, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.observablesPromiseService.observables.subscribe((data) => {
      console.log(data);
    });

    this.observablesPromiseService.promise.then((res) => {
      console.log(res);
    });
   this.callObservableAPIWithInterval();
   this.callPrmiseAPI();
  }

  callPrmiseAPI(){
    this.observablesPromiseService.getPromiseTableData().then((data) => {
      this.PromiseAPIData = data;
    });
  }

  callObservableAPIWithInterval() {
    this.observableSubscription = interval(2000) 
      .pipe(
        take(2), 
        switchMap(() => this.observablesPromiseService.getObservableTableData())
      )
      .subscribe(
        (data) => {
          this.observableAPIData = [
            ...this.observableAPIData,
            ...data
          ];
          console.log(this.observableAPIData,'observable');
          this.cd.detectChanges();
          console.log(this.observableAPIData,'observable');
        }
      );
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  pageChangeForPromise(event:any){
    this.second = event.first;
    this.rows = event.rows;
  }

  getKeys(){
    return Object.keys(this.observableAPIData[0]);
  }

  ngOnDestroy(): void {
    if(this.observableSubscription){
    this.observableSubscription.unsubscribe();
    }
  }
}
