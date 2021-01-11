import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TitleDashboardService } from './../title-dashboard.service';
import { CartService, CartProduct } from './../cart.service';

export interface Product{
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface CartProductInterface {
  id: number;
  product: string;
  image: string;
  amount: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  readonly endPoint : string;
  products : Product[];
  preloader : boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private titleDashboardService: TitleDashboardService,
    private cartService: CartService
  ) {
    this.endPoint = "http://localhost:8000/api/product/products";
    this.products = [];
    this.preloader = false;
    titleDashboardService.setPageTitle('Início');
  }

  ngOnInit(): void {
    this.preloader = true;
    const login = localStorage.getItem('login');
    if(login){
      const {access_token, token_type} = JSON.parse(login);

      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": `${token_type} ${access_token}` })
      };
      this.http.get<Product[]>(this.endPoint, httpOptions).subscribe(
        data => {
          this.preloader = false;
          this.products = data;
        },
        erro => {
          this.preloader = false;
          if(erro && erro.status === 401 && erro.statusText === "Unauthorized"){
            this.dialog.open(DialogElement, {
              data: {
                text: `Sua sessão expirou, por favor efetue login novamente.`
              }
            });
            this.router.navigate(['/']);
          }else{
            this.dialog.open(DialogElement, {
              data: {
                text: `Ocorreu uma falha ao tentar carregar os produtos, tente novamente mais tarde`
              }
            });
          }
        }
      );
    }
  }

  addToCart(productId: number): void {
    this.products.map(product => {
      if(productId === product.id){
        const CartProduct: CartProductInterface = {
          id: product.id,
          product: product.name,
          image: product.image,
          amount: 1,
          price: product.price,
          total: product.price,
        };
        this.cartService.insertCartProduct(CartProduct);

        this.dialog.open(DialogElement, {
          data: {
            text: `${product.name} inserido no seu carrinho de compras!`
          }
        });
      }
    })
  }

  buyItem(productId: number): void{
    this.products.map(product => {
      if(productId === product.id){
        const CartProduct: CartProductInterface = {
          id: product.id,
          product: product.name,
          image: product.image,
          amount: 1,
          price: product.price,
          total: product.price,
        };
        this.cartService.insertCartProduct(CartProduct);

        this.router.navigate(['/dashboard/carrinho']);
      }
    })
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
