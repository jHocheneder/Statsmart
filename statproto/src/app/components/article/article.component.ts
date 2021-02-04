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

  statData

  arrayx = []
  arrayy1: number[] = []
  arrayy2: number[] = []
  title = ""
  x;
  y1;
  y2;
  linechart: Chart;

  constructor(public data: DataService, private http: HttpService) { }


  statisticArticle = this.data.savedStatistic
  
  ngOnInit(): void {
    console.log(this.data.savedStatistic)
    this.data.getValueLinks(this.statisticArticle.id)
   
  }
  autoParse(n: string){
    if(n.includes(",")){
      n = n.replace(".","")
      n = n.replace(",",".")
      console.log(n)
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
    this.http.downloadCSV(this.data.sLink.link1).subscribe(csv=>{
      this.statData = csv
      console.log("hallo")
      this.x = this.data.sLink.xValue
      this.y1 = this.data.sLink.yValue1
      this.y2 = this.data.sLink.yValue2
        this.arrayx = []
        this.arrayy1 = []
        this.arrayy2 = []
        this.title = ""
    
        for(let j=0; j < this.statData[0].length; j++){
          if(this.statData[0][j]==this.data.sLink.xValue){
            this.x = j;
          }
          if(this.statData[0][j]==this.data.sLink.yValue1){
            this.y1 = j;
          }
          if(this.statData[0][j]==this.data.sLink.yValue2){
            this.y2 = j;
          }
        }
  
        for(let i = 1; i < this.statData.length-1; i++){
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
            this.arrayy1.push(this.statData[i][this.y1])
          }
          let y2 = this.autoParse(this.statData[i][this.y2])
          if(y2){
            console.log("y2: "+y2)
            this.arrayy2.push(+y2)
          } else {
            this.arrayy2.push(this.statData[i][this.y2])
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
  
     
    });

   
  }
}
