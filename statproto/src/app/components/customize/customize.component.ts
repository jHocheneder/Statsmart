import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Link } from 'src/app/models/link';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { ChartComponent } from '../../chart/chart.component';
import { Statistic } from '../../models/statistic';
@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  linechart : Chart

  selected: Link[];
  arrayx = []
  arrayy1: number[] = []
  arrayy2: number[] = []
  x = ""
  y1 = ""
  y2 = ""
  title = ""

  addStatistic: Statistic = new Statistic();
  headers: string[][] = [[]];

  select = []

  statData

  constructor(private chart: ChartComponent,
    private route: ActivatedRoute,
    private data: DataService,
    private http: HttpService) { }

  ngOnInit(): void {
    this.selected = this.data.selected;
    
    this.getDownloadLink()
  }

  getDownloadLink() {
    for(let i = 0; i<this.selected.length; i++){
      this.http.getDownloadLink(this.selected[i].detail[0].link).subscribe(data=>{
        this.http.downloadCSV(data).subscribe(csv=>{
          for(let i = 0; i<csv[0].length; i++){
            this.statData = csv
            let a = {
              id: i,
              value: csv[0][i]
            }
            //this.headers[0].push(csv[0][i])
            this.select.push(a)
          }
        })
      })
    }
  }

  showData(){

    this.arrayx = []
    this.arrayy1 = []
    this.arrayy2 = []
    this.title = ""

    for(let i = 1; i < this.statData.length-1; i++){
      if(+this.statData[i][this.x]){
        this.arrayx.push(+this.statData[i][this.x])
      } else{
        this.arrayx.push(this.statData[i][this.x])
      }

      if(+this.statData[i][this.y1]){
        this.arrayy1.push(+this.statData[i][this.y1])
      } else {
        this.arrayy1.push(this.statData[i][this.y1])
      }
      
      if(+this.statData[i][this.y2]){
        this.arrayy2.push(+this.statData[i][this.y2])
      } else {
        this.arrayy2.push(this.statData[i][this.y2])
      }
      
      
    }


    
    this.addStatistic.chartType = "line"
    this.addStatistic.xTitle = "Monate"
    this.addStatistic.userId = 1
    this.addStatistic.description = "Diagramm:" + this.statData[0][this.y1] + " " + this.statData[0][this.y2]
    this.addStatistic.errorRate = 0.7
    this.addStatistic.title = this.statData[0][this.x]+ " rest deleted "

    console.log(this.statData[0][this.y2]);

    console.log( "Statistic Array Initialization proceed" )
    console.log(this.arrayx)
    console.log(this.arrayy1)
    console.log(this.arrayy2)
    
    this.linechart = new Chart({
      title: {
        text: this.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        
        labels: {
         
        },
        categories: this.arrayx
      },
      series: [

        {
          type: 'line',
          name: this.statData[0][this.y1],
          data: this.arrayy1
        },
        {
          type: 'line',
          name: this.statData[0][this.y2],
          data: this.arrayy2
        },

      ]
    });
  }

  saveData(){
    console.log(" adding" + this.addStatistic)
    this.data.insertStatistic(this.addStatistic);
  }
}
