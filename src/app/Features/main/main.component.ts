import { Currency } from './../../Core/models/currency';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import * as _ from "lodash";
import { HttpService } from "src/app/Core/services/http.service";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  //#region  Proprties for api
  rate :any = {};
  rates: any[] = [];
  rateKeys: any[] = [];
  rateValues:any[]=[];
  symbol :any= {};
  symbols :any[] = [];
  symbolKeys :any[]= [];
  currencyForm!: FormGroup;
  message!: string;
  date!:string;
  timeStamp!:string;
  baseCurrency!: string
  //#endregion
 
 
  constructor(public http: HttpService ,private fb: FormBuilder) {}
  ngOnInit() {
    // currencyForm
    this.currencyForm =this.fb.group({
      from: new FormControl("EUR", Validators.required),
      to: new FormControl("USD", Validators.required),
      amount: new FormControl("", Validators.required)
    });
    this.currencyCall();
  }
  // rates api
  currencyCall() {
    this.http.currencyRate().subscribe(
      (data:any) => {
        console.log('data :>> ', data);
        this.date= data.date;
        this.timeStamp =data.timestamp;
        this.rate = data['rates'];
        this.rateKeys = Object.keys(this.rate);
        this.rateValues=Object.values(this.rate);
        console.log('this.rate :>> ', this.rate);
        console.log('rate keys :>> ', this.rateKeys);
        for (var i = 0; i < this.rateKeys.length; i++) {
          this.rates.push({
            code: this.rateKeys[i],
            text: this.rate[this.rateKeys[i]]
          });
        }
      },
      err => {}
    );
// symbo api call
    this.http.currencySymbols().subscribe(
      (data:any) => {
        this.symbol = data["symbols"];
        this.symbolKeys = Object.keys(this.symbol);
        for (var i = 0; i < this.symbolKeys.length; i++) {
          this.symbols.push({
            code: this.symbolKeys[i],
            text: this.symbol[this.symbolKeys[i]]
          });
        }
      },
      err => {}
    );
  }
  // convert function 
  convert() {
    let from = this.currencyForm.controls["from"].value;
    let to = this.currencyForm.controls["to"].value;
    let amount = this.currencyForm.controls["amount"].value;
    let toIndex = _.findIndex(this.rates, (rate:any) => {
      return rate.code == to;
    });
    let fromIndex = _.findIndex(this.rates, (rate:any) => {
      return rate.code == from;
    });
    let ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    let cal = ratio * amount;
    this.message =
      amount +
      " " +
      this.rates[fromIndex].code +
      "=" +
      cal +
      " " +
      this.rates[toIndex].code;

  }
  // swap function 
  swapCurrencies():void{
    const { from, to } = this.currencyForm.value;  
    this.currencyForm.patchValue({
      from: to,
      to: from
    });  
    this.convert();
  }
  // currency form control 
   f(){
    this.currencyForm.controls;
   }


}















//#region proprties for other solution 
// private currencies:Currency[] = [];
// baseCurrency: string = 'USD';
//   targetCurrency: string = 'EUR';
//   amount: number = 1;
//   conversionRate!: number;
//   convertedAmount!: number;
//#endregion

//   convertCurrency(): void {
//     this.http.getConversionRate(this.baseCurrency, this.targetCurrency)
//       .subscribe(response => {
//         this.conversionRate = response.rates[this.targetCurrency];
//         this.convertedAmount = this.amount * this.conversionRate;
//       });
// }
// swapCurrencies(): void {
//   const temp = this.baseCurrency;
//   this.baseCurrency = this.targetCurrency;
//   this.targetCurrency = temp;
//   this.convertCurrency();
// }
//#region  tests 

// getCurrenciesp(){
//   if(this.currencies.length==0){
//     this.http.currencyRate().subscribe((data:any)=>{
//       for (var key in data.rates){
//         var value = data.rates[key];
//         let currency:Currency = {rate: value, full_name: '', name: key, symbol: ''};
//         this.currencies.push(currency);
//       }
//       console.log('this.currencies :>> ', this.currencies);
//       this.http.currencySymbols().subscribe((data)=>{
//         console.log('data :>> ', data);
//         this.symbol=data["symbols"];
//         this.symbols.push( Object.values(this.symbol));
//         console.log('this.symbols :>> ', this.symbols);
//         for(var values in this.symbols){
//           let name = this.symbols

//         }
    
//       });

   
//     })
//   }
// }
//#endregion
