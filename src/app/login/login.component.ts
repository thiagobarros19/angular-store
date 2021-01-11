import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  readonly loginApi : string;
  readonly userApi : string;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.loginApi = "http://localhost:8000/api/auth/login";
    this.userApi = "http://localhost:8000/api/auth/user";
  }

  ngOnInit(): void {
    const login = localStorage.getItem('login');
    if(login){
      const {access_token, token_type} = JSON.parse(login);

      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": `${token_type} ${access_token}` })
      };

      this.http.get(this.userApi, httpOptions).subscribe(
        data => {
          if(data) this.router.navigate(['/dashboard/produtos']);
        }
      )
    }else{
      this.router.navigate(['/']);
    }
  }

  onSubmit(loginForm: NgForm) {
    const {username, password} = loginForm.value;

    this.http.post( this.loginApi, { username, password, remember_me: false }, {responseType: 'json'} ).subscribe(
      data => {
        if(data){
          this.router.navigate(['/dashboard/produtos']);
          localStorage.setItem('login', JSON.stringify(data));
        }
      },
      erro => {
        if(erro) this.dialog.open(DialogElement, {
          data: {text: "Usuário ou senha incorreto"}
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
