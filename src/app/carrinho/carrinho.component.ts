import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleDashboardService } from './../title-dashboard.service';
import { CartService } from './../cart.service';

export interface CartProduct{
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  readonly endPoint : string;

  tableColumns: string[] = ['product', 'amount', 'price', 'total'];
  products : CartProduct[];

  constructor(
    private http: HttpClient,
    private titleDashboardService: TitleDashboardService,
    private cartService: CartService
  ) {
    this.endPoint = "http://localhost:8000/api/product/products";
    this.products = [];
    titleDashboardService.setPageTitle('Carrinho de compras');
  }

  ngOnInit(): void {
    this.cartService.cartProductObs.subscribe(product => {

    })
  }

}
