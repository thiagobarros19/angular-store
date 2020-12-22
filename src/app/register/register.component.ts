import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

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
          this.dialog.open(DialogElementSuccess);
          this.router.navigate(['login']);
        }
      },
      erro => {
        if(erro) this.dialog.open(DialogElementError);
      }
    )
  }

}

@Component({
  selector: 'dialog-element-success',
  templateUrl: 'dialog-element-success.html',
})
export class DialogElementSuccess {}

@Component({
  selector: 'dialog-element-error',
  templateUrl: 'dialog-element-error.html',
})
export class DialogElementError {}
