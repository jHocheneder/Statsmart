import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { Statistic } from '../models/statistic';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selected: Link[] = []
  statistics: Array<Statistic>;

  /*xaxis = []
  y1axis = []
  y2axis = []*/

  loadedStatistic: Statistic = new Statistic();

  constructor(public http: HttpService) { }

  insertStatistic(newStatistic){
    let addStat= Object.assign({}, newStatistic);
    this.http.insertResource(addStat).subscribe( () => {this.statistics.push(addStat)});
  }
  findStatistics(){
    this.http.getAllStatistics().subscribe(data => {
      this.statistics = data
      console.log(this.statistics)
    })
  }
}

