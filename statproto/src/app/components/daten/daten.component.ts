import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { DataService } from '../../services/data.service'
import { Link } from '../../models/link'
import { ClrDatagridStateInterface } from '@clr/angular';
import { Router} from '@angular/router';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-daten',
  templateUrl: './daten.component.html',
  styleUrls: ['./daten.component.css']
})
export class DatenComponent implements OnInit {
  inventory: any;
  users: any;
  selected = [];

  searchString: string = "";

  constructor(private http: HttpService, 
    private router: Router,
    private data: DataService) { }

  daten: Link[] = []
  filteredDaten: Link[] = []

  topics: string[][] = [
    ["Abfall", "Müll", "Abwasser"],
    ["Tourismus", "Touristen", "Hotels", "Urlaub", "Beherbergungsbetriebe"],
    ["Wohnen", "Wohn", "Adresse"],
    ["Finanzen", "Finanz", "Geld", "Bank", "Rechnung"],
    ["Bildung", "Intelligenz", "Lernen", "Schule", "Schüler", "Studie", "Student"],
    ["Verkehr", "Auto", "KFZ", "Fahrzeug", "Bahn", "Zug", "Flug"],
    ["Einwohner", "Menschen", "Bürger"],
    ["Handel", "Geschäft", "Kauf", "Käufer"],
    ["Engerwitzdorf"],
    ["Wirtschaft", "Unternehmen"],
    ["Energie", "Strom", "Kraft"],
    ["Linz"]
  ]

  getSelected(l){
    console.log(l)
  }
  
  ngOnInit(): void {
    this.getList()

    /*if(parseFloat("2517,05")){
      console.log(parseFloat("2517,05"))
    }*/

  }

  getList(){
    this.http.getList().subscribe(data => {
      this.daten = []
      this.daten = data
      this.filteredDaten = data
    })
  }

  getFilteredData(){
    this.daten = []
    for(let i = 0; i < 100 && i < this.daten.length; i++){
      this.daten.push(this.daten[i])
    }
    return this.daten
  }

  getSearchedData(){
    if(this.searchString == ""){
      return this.filteredDaten
    }
    else{
      return this.filteredDaten.filter(s => s.title.toLowerCase().includes(this.searchString.toLowerCase()))
    }
  }
  
  
  getTopicData(topicId){
      this.filteredDaten = this.daten
      let topicDaten: Link[] = []
      for(let i = 0; i<this.topics[topicId].length; i++){
        console.log(topicDaten)
        //topicDaten = mergeById(this.filteredDaten.filter(s => s.title.toLowerCase().includes(this.topics[topicId][i].toLowerCase())), topicDaten)
        topicDaten = topicDaten.concat(this.filteredDaten.filter(s => s.title.toLowerCase().includes(this.topics[topicId][i].toLowerCase())))
      }
      this.filteredDaten = topicDaten.sort()
  }

  getDownloadLink(link: Link) {
    this.http.getLink(link).subscribe(data => {
      console.log(data)
      link.detail = data
    })
  }

  locked(link: any){
    if(this.selected.length == 2 && !this.selected.includes(link)){
      return false
    }
    return true
  }

  analyze() {
    this.data.selected = this.selected;
    this.router.navigate(['/customize']);
  }

}
