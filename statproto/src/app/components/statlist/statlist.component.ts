import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Rating } from 'src/app/models/rating';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-statlist',
  templateUrl: './statlist.component.html',
  styleUrls: ['./statlist.component.css']
})
export class StatlistComponent implements OnInit {

  constructor(public data : DataService) { }
  addRating: Rating = new Rating();


  ngOnInit(): void {
    this.data.findStatistics()
    

    console.log(this.data.statistics)
  }

  cacheId(saveid : number, vote : number){
    this.data.insertRating(saveid,vote);
    console.log(saveid, vote)
  }


  


}
