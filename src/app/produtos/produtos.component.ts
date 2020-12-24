import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TitleDashboardService } from './../title-dashboard.service';

export interface Product{
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  readonly endPoint : string;
  products : Product[];

  @Output() childTitle: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private titleDashboardService: TitleDashboardService
  ) {
    this.endPoint = "http://localhost:8000/api/product/products";
    this.products = [];
    titleDashboardService.setPageTitle('Início');
  }

  ngOnInit(): void {
    this.childTitle.emit('Início');
    this.http.get<Product[]>(this.endPoint).subscribe(data => {this.products = data;});
  }

}
