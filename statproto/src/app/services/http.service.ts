import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../models/link';

const baseUrl = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getList(){
    return this.http.get<Link[]>(baseUrl + "api/getLinks");
  }

  public getLink(t: Link){
    return this.http.get<Link[]>(baseUrl + "api/downloadLinks/"+t.id)
  }

  public getDownloadLink(l){
    let body = {
      link: l
    }
    return this.http.post(baseUrl + "api/download", body, {responseType: 'text'})
  }

  public downloadCSV(link){
    let headers = new HttpHeaders({Accept: 'text/csv'})
    let responseType: 'text'
    return this.http.get('https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv', {responseType: 'text'})
  }
}
