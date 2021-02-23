import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  statData: string[][]

  arrayx = []
  arrayy1: number[] = []
  arrayy2: number[] = []
  title = ""
  x;
  y1;
  y2;
  linechart: Chart;

  initialized = 0

  constructor(public data: DataService, private http: HttpService) { }


  statisticArticle = this.data.savedStatistic
  
  ngOnInit(): void {
    console.log(this.data.savedStatistic)
    //this.data.getValueLinks(this.statisticArticle.id)
    this.http.getValueLinks(this.statisticArticle.id).subscribe(data => {
      this.data.sLink = data[0]
      this.showArticle()
    })
  }

  autoParse(n: string){
    console.log(n)
    if(n.includes(",")){
      n = n.split(".").join("")
      n = n.replace(",",".")
      console.log(n)
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

  showArticle(){
    
    console.log("sauerbier")
    console.log(this.data.sLink.link1)
    for(let i = 0; i < 2; i++){
      let l = ""
      if(i == 0){
        l = this.data.sLink.link1
      } else {
        l = this.data.sLink.link2
      }

      this.http.downloadCSV(l).subscribe(csv=>{
        if(this.statData){
          for(let j = 0; j < this.statData.length; j++){
            this.statData[j].push(...csv[j])
          }
        } else {
          this.statData = csv
        }
        console.log(this.data.sLink.yValue1)
        this.x = this.data.sLink.xValue
        this.y1 = this.data.sLink.yValue1
        this.y2 = this.data.sLink.yValue2
        this.arrayx = []
        this.arrayy1 = []
        this.arrayy2 = []
        this.title = ""
    
        for(let j=0; j < this.statData[0].length; j++){
          if(this.statData[0][j]==this.data.sLink.xValue){
            console.log(j)
            this.x = j;
          }
          if(this.statData[0][j]==this.data.sLink.yValue1 && j<this.statData[0].length/2){
            this.y1 = j;
          }
          if(this.statData[0][j]==this.data.sLink.yValue2 && j>=this.statData[0].length/2){
            this.y2 = j;
          }
        }
        this.initialized++
        this.checkInitialized()
      });
    }
   
  }

  checkInitialized(){
    if(this.initialized == 2){
      this.drawStatistic()
    }
  }

  drawStatistic(){
    for(let i = 1; i < this.statData.length-1; i++){
      console.log(this.statData[i])
      if(this.autoParse(this.statData[i][this.x])){
        
        this.arrayx.push(this.autoParse(this.statData[i][this.x]))
      } else{
        this.arrayx.push(this.statData[i][this.x])
      }
      let y1=this.autoParse(this.statData[i][this.y1])
      if(y1){
        console.log("Ausgangswert:")
        console.log("y1: "+y1)
        this.arrayy1.push(+y1)
      } else {
        this.arrayy1.push(+this.statData[i][this.y1])
      }
      let y2 = this.autoParse(this.statData[i][this.y2])
      if(y2){
        console.log("y2: "+y2)
        this.arrayy2.push(+y2)
      } else {
        this.arrayy2.push(+this.statData[i][this.y2])
      }
    }

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
}
