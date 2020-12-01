import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { Link } from '../../models/link'
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-daten',
  templateUrl: './daten.component.html',
  styleUrls: ['./daten.component.css']
})
export class DatenComponent implements OnInit {
  inventory: any;
  users: any;
  selected = [];

  constructor(private http: HttpService) { }

  daten: Link[] = []
  
  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.http.getList().subscribe(data => {
      this.daten = []
      this.daten = data
      
    })
  }

  getFilteredData(){
    this.daten = []
    for(let i = 0; i < 100 && i < this.daten.length; i++){
      this.daten.push(this.daten[i])
    }
    return this.daten
  }

  getDownloadLink(link: any) {
    this.http.getLink(link).subscribe(data => {
      console.log(data)
    })
  }

  locked(link: any){
    if(this.selected.length == 2 && !this.selected.includes(link)){
      return false
    }
    return true
  }

}
