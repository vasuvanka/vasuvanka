import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mail } from '../../models/todo';

const BASE = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  sendMail(mail: Mail): Promise<any> {
    return this.http.post(`${BASE}/email`, mail).toPromise()
  }

  currencyCodes(): Promise<any> {
    return this.http.get(`${BASE}/currency-codes`).toPromise()
  }

  getExchangeRate(base: string, toList: string[], date: Date): Promise<any> {
    return this.http.post(`${BASE}/currency-exchange-rate`, { base, toList, date }).toPromise()
  }

  getIpInfo(): Promise<any> {
    return this.http.get(`${BASE}/ip-info`).toPromise()
  }

  getQuote(): Promise<any> {
    return this.http.get(`${BASE}/quotes/random`).toPromise()
  }

  getQuotesbyPage(pageId: number): Promise<any> {
    return this.http.get(`${BASE}/quotes/page/${pageId}`).toPromise()
  }

  shorternUrl(url: string): Promise<any> {
    return this.http.post(`${BASE}/url`, { url }).toPromise()
  }

  getWeather(): Promise<any> {
    return this.http.get(`${BASE}/weather`).toPromise()
  }

}
