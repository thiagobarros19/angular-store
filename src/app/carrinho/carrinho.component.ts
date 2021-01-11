import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TitleDashboardService } from './../title-dashboard.service';
import { CartService } from './../cart.service';

export interface CartProduct {
  id: number;
  product: string;
  image: string;
  amount: number;
  price: number;
  total: number;
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
  totalValue : number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private titleDashboardService: TitleDashboardService,
    private cartService: CartService
  ) {
    this.endPoint = "http://localhost:8000/api/sell/create";
    this.products = [];
    this.totalValue = 0;
    titleDashboardService.setPageTitle('Carrinho de compras');
    cartService.cartProductObs.subscribe(product => this.products = product);
    this.setTotalValue();
  }

  ngOnInit(): void {

  }

  setTotalValue(): void{
    this.products.map(product => {
      this.totalValue += product.price * product.amount;
    })
  }

  onChangeAmount(amount: number, id: number): void{
    this.products.map(product => {
      if(product.id === id){
        if(product.amount > amount) this.cartService.removeCartProduct(id);
        else this.cartService.insertCartProduct(product);
      }
    })
  }

  checkout(): void{
    const checkoutData = {
      user_id: 1,
      total: this.totalValue,
      items: this.products
    }
    this.http.post( this.endPoint, checkoutData, {responseType: 'json'} ).subscribe(
      data => {
        if(data){
          this.cartService.emptyCartProduct();
          this.router.navigate(['/dashboard/produtos']);

          this.dialog.open(DialogElement, {
            data: {
              text: `Compra finalizada com sucesso!`
            }
          });
        };
      },
      erro => erro ? console.log(erro) : false
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
