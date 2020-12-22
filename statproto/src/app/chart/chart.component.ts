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
  
    xaxis: string[] = []
    yone: number[] = []
    ytwo: number[] = []

  constructor(public data : DataService) { }

  ngOnInit(): void {
  }

  newChart() {
/*    this.xaxis = this.data.xaxis
    this.yone = this.data.y1axis
    this.ytwo = this.data.y2axis
*/
    console.log("Chart zeichenen")
    console.log(this.data.loadedStatistic.ydos)

    this.linechart = new Chart({
      title: {
        text: "Statistik"
      },
      credits: {
        enabled: false
      },
      xAxis: {
        
        labels: {
         
        },
        categories: this.data.loadedStatistic.xaxis
      },
      series: [

        {
          type: 'line',
          name: 'Österreich',
          data: this.data.loadedStatistic.yuno
        },
        {
          type: 'line',
          name: 'OÖ',
          data: this.data.loadedStatistic.ydos
        },

      ]
    });
  }

}
