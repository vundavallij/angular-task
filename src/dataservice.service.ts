import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private payLoadUrl = 'https://api.spacexdata.com/v3/payloads';
  private historyUrl = 'https://api.spacexdata.com/v3/history';

  constructor(
    private http: HttpClient
  ) { }

  public getPayLoadData(): Observable<any> {
   return this.http.get(this.payLoadUrl)
  }

  public getHistory(): Observable<any> {
    return this.http.get(this.historyUrl)
  }

}
