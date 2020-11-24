import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-daten',
  templateUrl: './daten.component.html',
  styleUrls: ['./daten.component.css']
})
export class DatenComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    console.log("Daten")
    this.getList()
  }

  getList(){
    this.http.getList().subscribe(data => {
      console.log(data)
    })
  }

}
