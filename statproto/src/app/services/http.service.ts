import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<string>(baseUrl + "api/downloadLinks/"+t.id)
  }
}
