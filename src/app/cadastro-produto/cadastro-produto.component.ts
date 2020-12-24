import { Component, OnInit, Inject, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TitleDashboardService } from './../title-dashboard.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  readonly endPoint : string;

  @Output() childTitle = new EventEmitter<String>();

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private titleDashboardService: TitleDashboardService
  ) {
    this.endPoint = "http://localhost:8000/api/product/create";
    titleDashboardService.setPageTitle('Cadastro de produtos');
  }

  ngOnInit(): void {
    this.sendChildTitle('Cadastrar produto');
  }

  sendChildTitle(text: string): void{
    this.childTitle.emit(text);
  }

  onSubmit(productForm: NgForm) {
    const {name, image, price, description} = productForm.value;

    this.http.post( this.endPoint, { name, image, price, description }, {responseType: 'json'} ).subscribe(
      data => {
        if(data){
          this.dialog.open(DialogElement, {
            data: {
              text: "Novo produto cadastrado com sucesso!"
            }
          });
          this.router.navigate(['/dashboard/produtos']);
        }
      },
      erro => {
        if(erro) this.dialog.open(DialogElement, {
          data: {
            text: "Ocorreu uma falha ao tentar cadastrar produto, tente novamente mais tarde"
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
