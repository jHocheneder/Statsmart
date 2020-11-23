import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart = new Chart({

    title: {
      text: 'Corona-Neuinfektionen'
    },
    credits: {
      enabled: false
    },
    xAxis:{
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}',
    
      }
    },
    series: [
      
      {
        type: 'line',
        name: 'Österreich',
        data: [9262,9586, 7063, 5665, 4657, 5984]
      },
      {
        type: 'line',
        name: 'OÖ',
        data: [2554, 1891, 1665, 1041, 917, 1230]
      },

    ]
  });
  constructor() { }

  ngOnInit(): void {

  }

}
