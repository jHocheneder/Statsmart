import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { AuthService } from 'src/app/services/auth.service';
import { matchOtherValidator } from 'src/app/validators/match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      emailrepeat: new FormControl('', [Validators.required, matchOtherValidator('email')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      passwordrepeat: new FormControl('', [Validators.required, matchOtherValidator('password')])
    });
  }

  public register(){
    if(this.registerForm.valid){
      const regBody = {
        email: this.registerForm.controls['email'].value,
        password: sha512(this.registerForm.controls['password'].value),
        username: this.registerForm.controls['username'].value,
      }

      this.auth.register(regBody).subscribe(data => {
        if(data) {
          localStorage.setItem('token', data)
          console.log(data)
          this.router.navigate(['home'])
        }
      })
    }
  }

}
