import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/app/models/link';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  selected: Link[];

  x = ""
  y1 = ""
  y2 = ""

  headers: string[][] = [[]];

  select = []

  statData

  constructor(private route: ActivatedRoute,
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
    let arrayx = []
    let arrayy1 = []
    let arrayy2 = []
    for(let i = 1; i < this.statData.length-1; i++){
      arrayx.push(this.statData[i][this.x])
      arrayy1.push(this.statData[i][this.y1])
      arrayy2.push(this.statData[i][this.y2])
    }
    console.log(arrayx)
    console.log(arrayy1)
    console.log(arrayy2)
  }

}
