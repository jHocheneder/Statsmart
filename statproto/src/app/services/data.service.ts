import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { Statistic } from '../models/statistic';
import { Rating } from '../models/rating';
import { HttpService } from './http.service';
import { SavedLink } from '../models/savedLink';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selected: Link[] = []
  statistics: Array<Statistic>;
  userstatistics: Array<Statistic>;
  ratings: Array<Rating>;
  sLink: SavedLink;
  



  /*xaxis = []
  y1axis = []
  y2axis = []*/

  savedStatistic: Statistic = new Statistic();
  loadedStatistic: Statistic = new Statistic();
  loadedRating: Rating = new Rating();

  constructor(public http: HttpService) { }

  insertStatistic(newStatistic){
    let addStat= Object.assign({}, newStatistic);
    this.http.insertResource(addStat).subscribe( data => {
      this.statistics.push(addStat)
      //this.insertRating(data.insertId)
      console.log(data.insertId)
    }
      
      );
   
  }
 insertRating(statid, vote){
    this.loadedRating.statistikid = statid;
    this.loadedRating.rating = vote;
    this.loadedRating.userid = 1;
    
    let addRating= Object.assign({}, this.loadedRating);

    this.http.insertRating(addRating).subscribe( () => {this.ratings.push(addRating)});
  }
  findStatistics(){
    this.http.getAllStatistics().subscribe(data => {
      this.statistics = data
      console.log(this.statistics)
    })
  }
  findUserStatistics(){
    this.http.getUserStatistics().subscribe(data => {
      this.userstatistics = data
      console.log(this.userstatistics)
    })
  }
  getValueLinks(paraid){
    this.http.getValueLinks(paraid).subscribe(data => {
      this.sLink = data[0]
      console.log(this.sLink)
    })
  }
}

