import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }
    // set endpoint and your API key
    endpoint = "latest?";
    access_key = '09d6bc3b0d312560c0cb3aceed5b1257';
    baseURL = "http://data.fixer.io/api/";
  
    currencySymbols(): Observable<any> {
      return this.http.get(
        this.baseURL + "symbols?access_key=" + this.access_key
      );
    }
    currencyRate(): Observable<any> {
      return this.http.get(this.baseURL + this.endpoint+"access_key=" + this.access_key);
    }
    // getConversionRate(base: string, target: string): Observable<any> {
    //   const url = `${this.baseURL}/latest?access_key=${this.access_key}&base=${base}&symbols=${target}`;
    //   return this.http.get(url);
    // }
}
