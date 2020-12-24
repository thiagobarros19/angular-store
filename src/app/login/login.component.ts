import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
        if(data) this.router.navigate(['/dashboard/produtos']);
      },
      erro => {
        if(erro) this.dialog.open(DialogElement, {
          data: {
            text: "Usuário ou senha incorreto"
          }
        });
      }
    )
  }

}

@Component({
  selector: 'dialog-element',
  templateUrl: 'dialog-element.html',
})
export class DialogElement {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {text: string}
  ){}
}
