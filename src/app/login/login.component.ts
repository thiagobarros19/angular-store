import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  readonly endPoint : string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.endPoint = "http://localhost/Angular/testeGetAngular.php";
  }

  onSubmit(loginForm: NgForm) {
    const {username, password} = loginForm.value;

    console.log({username, password});

    this.http.post( this.endPoint, { username, password } ).subscribe(
      data => {
        if(data) this.router.navigate(['dashboard']);
      },
      erro => console.log(erro)
    )
  }

}
