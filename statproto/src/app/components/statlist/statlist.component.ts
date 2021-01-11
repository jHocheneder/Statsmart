import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-statlist',
  templateUrl: './statlist.component.html',
  styleUrls: ['./statlist.component.css']
})
export class StatlistComponent implements OnInit {

  constructor(public data : DataService) { }

  ngOnInit(): void {
    this.data.findStatistics()
    

    console.log(this.data.statistics)
  }


}
