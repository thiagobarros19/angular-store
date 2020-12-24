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

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.endPoint = "http://localhost:8000/api/auth/signup";
  }

  onSubmit(loginForm: NgForm) {
    const {name, username, password, password_confirmation} = loginForm.value;

    this.http.post( this.endPoint, { name, username, password, password_confirmation } ).subscribe(
      success => {
        if(success){
          this.dialog.open(DialogElement, {
            data: {
              text: "Cadastro realizado com sucesso!"
            }
          });
          this.router.navigate(['login']);
        }
      },
      erro => {
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

