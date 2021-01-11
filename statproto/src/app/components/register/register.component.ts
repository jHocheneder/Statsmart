import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string
  email: string
  emailrepeat: string
  password: string
  passwordrepeat: string

  constructor() { }

  ngOnInit(): void {
  }

  exampleForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    emailrepeat: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordrepeat: new FormControl('', Validators.required),
});

}
