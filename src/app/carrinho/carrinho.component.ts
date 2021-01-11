import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  preloader : boolean;

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
    this.preloader = false;
    titleDashboardService.setPageTitle('Carrinho de compras');
    cartService.cartProductObs.subscribe(product => this.products = product);
    this.setTotalValue();
  }

  ngOnInit(): void {

  }

  setTotalValue(): void{
    this.totalValue = 0;
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
    this.setTotalValue();
  }

  checkout(): void{
    this.preloader = true;
    const login = localStorage.getItem('login');
    if(login){
      const {access_token, token_type} = JSON.parse(login);

      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": `${token_type} ${access_token}` })
      };

      const checkoutData = {
        user_id: 1,
        total: this.totalValue,
        items: this.products
      }
      this.http.post( this.endPoint, checkoutData, httpOptions).subscribe(
        data => {
          if(data){
            this.preloader = false;

            this.cartService.emptyCartProduct();
            this.router.navigate(['/dashboard/produtos']);

            this.dialog.open(DialogElement, {
              data: {
                text: `Compra finalizada com sucesso!`
              }
            });
          };
        },
        erro => {
          if(erro  && erro.status === 401 && erro.statusText === "Unauthorized"){
            this.dialog.open(DialogElement, {
              data: {
                text: "Sua sessão expirou, por favor efetue login novamente."
              }
            });
          }
        }
      )
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
