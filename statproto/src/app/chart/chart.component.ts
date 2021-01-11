import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataService } from '../services/data.service';
import { Statistic } from '../models/statistic';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  
   linechart : Chart
  
    xaxis: string[] = []
    yone: number[] = []
    ytwo: number[] = []

  constructor(public data : DataService) { }

  ngOnInit(): void {
  }

 

}
