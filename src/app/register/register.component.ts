import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  readonly endPoint : string;
  preloader: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.endPoint = "http://localhost:8000/api/auth/signup";
    this.preloader = false;
  }

  onSubmit(loginForm: NgForm) {
    this.preloader = true;
    const {name, username, password, password_confirmation} = loginForm.value;

    this.http.post( this.endPoint, { name, username, password, password_confirmation } ).subscribe(
      success => {
        if(success){
          this.preloader = false;
          this.dialog.open(DialogElement, {
            data: {
              text: "Cadastro realizado com sucesso!"
            }
          });
          this.router.navigate(['login']);
        }
      },
      erro => {
        this.preloader = false;
        if(erro) this.dialog.open(DialogElement, {
          data: {
            text: "Ocorreu uma falha ao tentar efetuar cadastro, tente novamente."
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

