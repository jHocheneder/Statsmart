import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { Statistic } from '../models/statistic';
import { Rating } from '../models/rating';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selected: Link[] = []
  statistics: Array<Statistic>;
  ratings: Array<Rating>;

  /*xaxis = []
  y1axis = []
  y2axis = []*/

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
}

