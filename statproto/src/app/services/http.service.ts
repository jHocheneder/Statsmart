import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../models/link';
import { Statistic } from '../models/statistic';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating';
import { SavedLink } from '../models/savedLink';

const baseUrl = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public insertResource(resource : Statistic){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));

 

    console.log("made it here")
    return this.http.post<any>(baseUrl + 'statistic/saveStatistic', resource,  {headers});
  }

  public insertRating(resource : Rating){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    
    console.log("inserted rating")
    return this.http.put<Rating[]>(baseUrl + 'statistic/updateRating', resource,  {headers});
  }

  public getAllStatistics(){
    console.log("made it here")
    return this.http.get<Statistic[]>(baseUrl + 'api/findAllStatistic');
  }

   public getValueLinks(p_statsid){
    console.log("made it to the savedLinks")
    return this.http.get<any>(baseUrl + 'api/getLinksForStatistics/' + p_statsid);
  }


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
    let body = {
      link: link
    }
    return this.http.post<string[][]>(baseUrl+'api/downloadcsv', body);
  }
}
