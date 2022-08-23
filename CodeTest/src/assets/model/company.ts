export class Company{
  Name: string;
  Country: string;
  Currency: string;
  WebURL: string;
  Ticker: string;
  constructor(name: string, country: string, currency: string, webUrl: string, ticker: string) {
    this.Name = name;
    this.Country = currency;
    this.Currency = country;
    this.WebURL = webUrl;
    this.Ticker = ticker;
  }
}
