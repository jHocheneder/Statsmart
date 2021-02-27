import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/models/link';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.css']
})
export class DataDetailComponent implements OnInit {

  @Input() link: Link;

  loading: boolean;

  constructor(
    private http: HttpService,
    private router: Router,
    private data: DataService
    ) { }

  ngOnInit() {
      this.loading = true;
      // Make the server call
      console.log("loading details "+this.link)
      this.http.getLink(this.link).subscribe(data => {
        console.log(data)
        this.link.detail = data
      });
  }

  showSelected(l){
    for(let i = 0; i<l.length; i++){
      if(l[i].selected === true){
        console.log(l[i])
      }
    }
    
  }

  areMaxSelected(index){
    let x = 0
    for(let i = 0; i<this.link.detail.length; i++){
      if(this.link.detail[i].selected === true){
        x++
      } else {
        this.link.detail[i].selected = false
      }
    }
    if(x>=2 && !this.link.detail[index].selected){
      return true
    }
    return false

  }

  
  analyze() {
    let selected: Link[] = []

    for(let i = 0; i<this.link.detail.length; i++){
      if(this.link.detail[i].selected === true){
        selected.push(this.link.detail[i])
      }
    }
    this.data.selected = selected;
    this.router.navigate(['/customize']);
  }

}
