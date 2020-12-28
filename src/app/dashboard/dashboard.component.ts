import { Component } from '@angular/core';

import { TitleDashboardService } from './../title-dashboard.service';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TitleDashboardService, CartService]
})
export class DashboardComponent {

  title: string;
  cartAmount: number;

  constructor(
    private titleDashboardService: TitleDashboardService,
    private cartService: CartService
  ) {
    this.title = '';
    this.cartAmount = 0;
    cartService.cartProductObs.subscribe( cartProduct => this.cartAmount = cartProduct.length );
    titleDashboardService.pageTitle.subscribe( title => this.title = title );
  }

  logout(){
    console.log('SAIR');
  }

}
