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

  description = ""

  currentXTitle = ""
  currentYTitle1 = ""
  currentYTitle2 = ""

  url: string[] = [];

  addStatistic: Statistic = new Statistic();
  headers: string[][] = [[]];

  select = []
  
  statData: string[][]

  csv1: string[][] = []
  csv2: string[][] = []
  
  errorRate = 0.0

  allErrorRates

  constructor(private chart: ChartComponent,
    private route: ActivatedRoute,
    private data: DataService,
    private http: HttpService,
    private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.selected = this.data.selected;
    
    this.getDownloadLink()
  }

  getBackgroundColor(select: string){
    let s = ""
    for(let p = 0; p < this.select.length; p++){
      if(this.y1 == this.select[p].id){
        s = this.select[p].value
      }
    }
    for(let d in this.allErrorRates){
      if(s == d) {
        for(let i = 0; i < this.allErrorRates[d].length; i++){
          for(let key in this.allErrorRates[d][i]){
            if(key == select){
              var hue=((1-Math.abs(this.allErrorRates[d][i][key]))*120).toString(10);
              return ["hsl(",hue,",60%,45%)"].join("");
            }
            
          }
  
          //console.log(data[d][i].key() + "" + data[d][i].value())
        }
      }
      
    }

    return '#ffffff'
  }

  getAllErrorRates(){
    console.log("Error Rates")
    this.http.getAllErrorRates(this.url[0], this.url[1]).subscribe(data => {
      this.allErrorRates = data
    })
  }

  getDownloadLink() {
    let x = 0
    for(let i = 0; i<this.selected.length; i++){
      this.http.getDownloadLink(this.selected[i].link).subscribe(data=>{
        console.log(data)
        this.url.push(data);
        if(this.url.length == 2){
          this.getAllErrorRates()
        }
        this.http.downloadCSV(data).subscribe(csv=>{
          console.log(csv)
          if(this.statData){
            for(let j = 0; j < this.statData.length; j++){
              this.statData[j].push(...csv[j])
            }
          } else {
            this.statData = csv
          }
          for(let i = 0; i<csv[0].length; i++){
            let a = {
              id: x,
              value: csv[0][i]
            }
            //this.headers[0].push(csv[0][i])
            this.select.push(a)
            x++
          }
        })
      })
    }
  }

  isLogin(){
    return this.authGuard.isAuthenticated()
  }

  autoParse(n: string){
    if(n.includes(",")){
      n = n.split(".").join("")
      n = n.replace(",",".")
    } else {
      if(n.includes(".")){
        let a = n.split(".")
        if(a.length > 2){
          n = a.join("");
        } else {
          let isComma = false;
          for(let i = 0; i < a.length; i++){
            if(a[i].length != 3){
              isComma = true
            }
          }
          if(!isComma){
            n = a.join("")
          }
        }
      }
    }
    if(+n){
      return +n
    }
    else {
      return n
    }
  }

  showData(){

    this.arrayx = []
    this.arrayy1 = []
    this.arrayy2 = []
    this.title = ""

    for(let i = 1; i < this.statData.length-1; i++){
      if(this.autoParse(this.statData[i][this.x])){
        this.arrayx.push(this.autoParse(this.statData[i][this.x]))
      } else{
        this.arrayx.push(this.statData[i][this.x])
      }
      let y1=this.autoParse(this.statData[i][this.y1])
      if(y1){
        this.arrayy1.push(+y1)
      } else {
        this.arrayy1.push(this.statData[i][this.y1])
      }
      let y2 = this.autoParse(this.statData[i][this.y2])
      if(y2){
        this.arrayy2.push(+y2)
      } else {
        this.arrayy2.push(this.statData[i][this.y2])
      }
      
      
    }


    
    this.addStatistic.chartType = "line"
    this.addStatistic.xTitle = this.currentXTitle
    
    this.addStatistic.errorRate = 0.7
    //this.addStatistic.title = this.statData[0][this.x]+ " rest deleted "
    this.addStatistic.title = "standardtitel"
    if(+this.y1 >= this.statData[0].length/2){
      this.addStatistic.link1 = this.url[1]
    } else {
      this.addStatistic.link1 = this.url[0]
    }
    if(+this.y2 < this.statData[0].length/2){
      this.addStatistic.link2 = this.url[0]
    } else {
      this.addStatistic.link2 = this.url[1]
    }
    this.addStatistic.yTitle1 = this.currentYTitle1
    this.addStatistic.yValue1 = this.statData[0][this.y1]
    this.addStatistic.yTitle2 = this.currentYTitle2
    this.addStatistic.yValue2 = this.statData[0][this.y2]
    this.addStatistic.xValue = this.statData[0][this.x];

    this.http.getErrorRate(this.addStatistic.link1, this.addStatistic.link2, this.addStatistic.yValue1, this.addStatistic.yValue2).subscribe(data => {
      this.addStatistic.errorRate = data.errorRate
      this.errorRate = Math.floor(Math.abs(data.errorRate)*100)
    })
   
    
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
    this.addStatistic.description = this.description
    if(this.addStatistic.description == ""){
      this.addStatistic.description = "Diagramm:" + this.statData[0][this.y1] + " " + this.statData[0][this.y2]
    }
    this.addStatistic.title = this.currentTitle
    this.data.insertStatistic(this.addStatistic);
  }
}
