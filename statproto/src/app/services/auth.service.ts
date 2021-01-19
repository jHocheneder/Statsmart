import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(body) {
    return this.http.post(baseUrl + 'authenticate/login', body, { responseType: 'text' })
  }

  public register(body){
    return this.http.post(baseUrl + "authenticate/createUser", body, { responseType: 'text'})
  }

  public logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  /*public getUser() {
    let token: string = localStorage.getItem('token')
    
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    
    console.log(headers)
    return this.http.get<Receiver>(baseUrl + 'receiver/getUser', {headers})
  }*/

}
