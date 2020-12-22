import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

export interface loginPostReturn {
  access_token: string;
  expires_at: string;
  token_type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  readonly endPoint : string;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.endPoint = "http://localhost:8000/api/auth/login";
  }

  onSubmit(loginForm: NgForm) {
    const {username, password} = loginForm.value;

    this.http.post( this.endPoint, { username, password, remember_me: false }, {responseType: 'json'} ).subscribe(
      data => {
        // localStorage.setItem('accessToken', data);
        if(data) this.router.navigate(['dashboard']);
      },
      erro => {
        if(erro) this.dialog.open(DialogElementError);
      }
    )
  }

}

@Component({
  selector: 'dialog-element-error',
  templateUrl: 'dialog-element-error.html',
})
export class DialogElementError {}
