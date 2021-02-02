import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { bindCallback } from 'rxjs';
import { Link } from 'src/app/models/link';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { ChartComponent } from '../../chart/chart.component';
import { Statistic } from '../../models/statistic';
import { AuthGuard } from 'src/app/guards/auth.guard'
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
  currentTitle = ""

  currentXTitle = ""
  currentYTitle1 = ""
  currentYTitle2 = ""

  url = "";

  addStatistic: Statistic = new Statistic();
  headers: string[][] = [[]];

  select = []
  
  statData

  constructor(private chart: ChartComponent,
    private route: ActivatedRoute,
    private data: DataService,
    private http: HttpService,
    private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.selected = this.data.selected;
    
    this.getDownloadLink()
  }

  getDownloadLink() {
    for(let i = 0; i<this.selected.length; i++){
      this.http.getDownloadLink(this.selected[i].detail[0].link).subscribe(data=>{
        this.url = data;
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

  isLogin(){
    return this.authGuard.isAuthenticated()
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
    this.addStatistic.xTitle = this.currentXTitle
    
    this.addStatistic.description = "Diagramm:" + this.statData[0][this.y1] + " " + this.statData[0][this.y2]
    this.addStatistic.errorRate = 0.7
    //this.addStatistic.title = this.statData[0][this.x]+ " rest deleted "
    this.addStatistic.title = "standardtitel"
    this.addStatistic.link1 = this.url
    this.addStatistic.link2 = this.url
    this.addStatistic.yTitle1 = this.currentYTitle1
    this.addStatistic.yValue1 = this.statData[0][this.y1]
    this.addStatistic.yTitle2 = this.currentYTitle2
    this.addStatistic.yValue2 = this.statData[0][this.y2]
    this.addStatistic.xValue = this.statData[0][this.x];
   
    console.log(this.currentTitle)
    //this.addStatistic.Rating = 0

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
     
      yAxis: [{ // Primary yAxis
        id: "y_axis_0",
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        title: {
            text: this.statData[0][this.y1],
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true

    }, { // Secondary yAxis
        gridLineWidth: 0,
        id: "y_axis_1",
        title: {
            text: this.statData[0][this.y2],
            style: {
                color: "#000000"
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: "#000000"
            }
        }

    }],
    series: [

      {
        type: 'line',
        name: this.statData[0][this.y1],
        data: this.arrayy1,
        yAxis: "y_axis_0"
      },
      {
        type: 'line',
        name: this.statData[0][this.y2],
        data: this.arrayy2,
        yAxis: "y_axis_1"
      },

    ]
      
    });
  }

  saveData(){
    console.log(" adding" + this.addStatistic)
    console.log(this.currentTitle)
    this.addStatistic.title = this.currentTitle
    this.data.insertStatistic(this.addStatistic);
    console.log(this.addStatistic)
  }
}
