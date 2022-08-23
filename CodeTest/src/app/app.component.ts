import {Component, OnInit, ViewChild} from '@angular/core';
import {AppServiceService} from "./app-service.service";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Company} from "../assets/model/company";
import { TranslateService } from '@ngx-translate/core';
import {CompanyLookUp} from "../assets/model/CompanyLookUp";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {CandleStickChartComponent} from "./candle-stick-chart/candle-stick-chart.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  // @ViewChild('candle-stick') child: CandleStickChartComponent | any;
  title = 'CodeTest';
  company: Company = new Company("", "", "", "", "");
  form: FormGroup = this.displayDataForm();
  companyList: Array<Company> = [];
  unixTime: Array<number> = [0, 0];
  chartData: any;
  tempFix: boolean = false;

  constructor(private service: AppServiceService, private formBuilder: FormBuilder, private translateService: TranslateService) {
    translateService.setDefaultLang('en');
  }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl(this.company.Name, [
        Validators.required,
        Validators.minLength(4),
        ]),
    });
  }

  test(){
  }

  displayDataForm(company?: Company){
    return this.formBuilder.group({
    })
  }
//getSymbol from API using method symbolSearch
  getSymbolFromSearch(value: string){
    this.companyList.splice(0);
    this.service.GetData(value).subscribe((response) => {
      let data = JSON.parse(JSON.stringify(response));
      for (let i = 0; i <= data.count - 1; i++){
        this.getCompany(data.result[i].symbol);
      }

    }, (error) =>{
      console.log('Error is ', error);
    })
  }
//get a list of companyies using symbol
  getCompany(value: string){
    this.service.GetCompanyData(value).subscribe((response)=>{
      let item = JSON.parse(JSON.stringify(response));
      if (item.name == null){
        return;
      }
      this.companyList.push(new Company(item.name, item.country, item.currency, item.weburl, item.ticker));
    }, (error)=>{
      console.log("error is:", error);
    })
  }
//get company stock prices with in  selected date range
  getStockCandles(symbol: string, resolution: string, startDate: number, endDate: number){
    this.service.GetStockCandles(symbol, resolution, startDate, endDate).subscribe((response)=>{
      this.chartData = response;
      this.tempFix = true;
    },(error)=>{
      console.log(error);
    })
  }
//get date from date picker convertit to UNIX time
  CatchDate(myDate: any){
    this.unixTime[0] = myDate.start.valueOf() / 1000;
    this.unixTime[1] = myDate.end.valueOf() / 1000;
  }

  submit() {

  }

  hasError(path: string, error: string) {
    return this.form && this.form.hasError(error, path)
  }
}
