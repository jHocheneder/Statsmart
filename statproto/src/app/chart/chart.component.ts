import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  
   linechart : Chart
  
    @Input()
    xaxis: String[] = []
    @Input()
    yone: number[] = []
    @Input()
    ytwo: number[] = []

  constructor(public data : DataService) { }

  ngOnInit(): void {
    console.log(this.data.loadedStatistic.title);
    this.newChart();
    this.data.loadedStatistic.data = [3000,4000,5000,4500,4200,4900,4700];
  }

  newChart() {
    this.linechart = new Chart({

      title: {
        text: this.data.loadedStatistic.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        labels: {
         
        },
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      series: [

        {
          type: 'line',
          name: 'Österreich',
          data: this.data.loadedStatistic.data
        },
        {
          type: 'line',
          name: 'OÖ',
          data: [2554, 1891, 1665, 1041, 917, 1230]
        },

      ]
    });
  }

}
