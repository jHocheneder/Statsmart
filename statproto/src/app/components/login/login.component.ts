import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    const body = { email: this.email, password: sha512(this.password) }

    this.auth.login(body).subscribe( result => {
      console.log(result)
      if ( result != 'false' ) {
        localStorage.setItem('token', result)
        this.router.navigate(['home'])
      } 
    })
  }

}
