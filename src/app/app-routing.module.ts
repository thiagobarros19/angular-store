import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component:LoginPageComponent,
    children: [
      {path: 'login', component:LoginComponent},
      {path: 'register', component:RegisterComponent}
    ]
  },
  {path: 'dashboard', component:DashboardComponent,
    children: [
      {path: 'produtos', component:ProdutosComponent},
      {path: 'cadastro-produto', component:CadastroProdutoComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
