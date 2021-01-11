import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TitleDashboardService } from './../title-dashboard.service';
import { CartService } from './../cart.service';

export interface loginData{
  access_token: string;
  expires_at: string;
  token_type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TitleDashboardService, CartService]
})
export class DashboardComponent {

  readonly logoutApi : string;
  readonly userApi : string;

  title: string;
  cartAmount: number;
  username: string;

  constructor(
    private titleDashboardService: TitleDashboardService,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {
    this.logoutApi = "http://localhost:8000/api/auth/logout";
    this.userApi = "http://localhost:8000/api/auth/user";
    this.title = '';
    this.cartAmount = 0;
    this.username = "";
    cartService.cartProductObs.subscribe( cartProduct => this.cartAmount = cartProduct.length );
    titleDashboardService.pageTitle.subscribe( title => this.title = title );
  }

  ngOnInit(): void {
    const login = localStorage.getItem('login');
    if(login){
      const {access_token, token_type} = JSON.parse(login);

      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": `${token_type} ${access_token}` })
      };

      this.http.get<any>(this.userApi, httpOptions).subscribe(
        data => {
          if(data){
            const {name} = data
            this.username = name.substr(0, name.indexOf(" "));
          }
        },
        erro => {
          if(erro) this.router.navigate(['/'])
        }
      )
    }else{
      this.router.navigate(['/']);
    }
  }

  logout(){
    const login = localStorage.getItem('login');
    if(login){
      const {access_token, token_type} = JSON.parse(login);

      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": `${token_type} ${access_token}` })
      };

      this.http.get(this.logoutApi, httpOptions).subscribe(
        data => {
          if(data){
            this.router.navigate(['/'])
            localStorage.removeItem('currentGame');
          }
        }
      );
    }else{
      this.router.navigate(['/']);
    }
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
