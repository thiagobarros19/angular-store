import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { LoginComponent } from './../login/login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  readonly endPoint : string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.endPoint = "http://localhost:8000/api/auth/login";
  }

  onSubmit(loginForm: NgForm) {
    const {username, password} = loginForm.value;

    console.log({username, password});

    this.http.post( this.endPoint, { username, password, remember_me: false } ).subscribe(
      data => {
        // if(data) this.router.navigate(['dashboard']);
        console.log(data);
      },
      erro => console.log(erro)
    )
  }

}
