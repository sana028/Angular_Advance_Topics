import { Injectable } from '@angular/core';
import { interval, Observable, switchMap } from 'rxjs';
import { Products } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ObservablesPromiseService {
  constructor(private http: HttpClient) {}

  observables = new Observable((res) => {
    res.next(18);
    res.next(20);
    res.next(30);
  });

  promise = new Promise((res) => {
    res(18);
    res(20);
  });


  getObservableTableData(): Observable<Products[]> {
    return this.http.get<Products[]>(environment.Api_Url + '/fetchTheData')
    
}

  getPromiseTableData(): Promise<Products[]> {
    return this.http
      .get<Products[]>(environment.Api_Url + '/fetchTheData')
      .toPromise()
      .then((data) => data || []);
  }
}
