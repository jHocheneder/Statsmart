import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sha512 } from 'js-sha512';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { matchOtherValidator } from 'src/app/validators/match';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  updateForm: FormGroup;

  username: string = "";
  email: string = "";

  buttonStatus = true

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    public data: DataService
    ) { }

  ngOnInit(): void {
    this.getUserData()
    this.updateForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      passwordrepeat: new FormControl('', [Validators.required, matchOtherValidator('password')])
    });

    this.data.findUserStatistics()
  }

  getUserData(){
    this.http.getUserData().subscribe(data => {
      this.username = data[0].username;
      this.email = data[0].email;
    })
  }

  isChanged(){
    if(this.updateForm.controls['username'].value != this.username && this.updateForm.valid){
      return true
    }
    return false
  }

  update(){
    if(this.updateForm.valid){
      const updBody = {
        username: this.updateForm.controls['username'].value,
        password: sha512(this.updateForm.controls['password'].value)
      }

      this.http.updateUserData(updBody).subscribe(data =>{
        console.log(data)
      })
    }
  }
  saveForArticle(rowstat){
    this.data.savedStatistic  = rowstat;
  }
  
}
