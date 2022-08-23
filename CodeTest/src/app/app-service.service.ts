import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import {catchError, map} from "rxjs";
import {CompanyLookUp} from "../assets/model/CompanyLookUp";
import {Company} from "../assets/model/company";

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private apiUrl = 'api/getData';

  constructor(private http: HttpClient) { }

  GetCompanyData(data: string){
    let params = new HttpParams().set("value", data);
    return this.http.get(`${this.apiUrl}/getCompany`,{headers: new HttpHeaders(), params: params});
  }

  GetData(data: string){
    let params = new HttpParams().set("value", data);
    return this.http.get(`${this.apiUrl}`, {headers: new HttpHeaders(), params: params});
  }

  GetStockCandles(ticker: string, resolution: string, startDate: number, endDate: number){
    let params = new HttpParams().set("ticker", ticker).set("resolution", resolution).set("startDate", startDate).set("endDate", endDate);
    return this.http.get(`${this.apiUrl}/getCandles`, {headers: new HttpHeaders(), params: params});
  }


  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
