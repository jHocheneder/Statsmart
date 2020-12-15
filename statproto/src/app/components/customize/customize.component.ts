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
        console.log(data)
        /*this.http.downloadCSV(data).subscribe(csv=>{
          console.log(csv)
        })*/
      })
    }
  }

}
