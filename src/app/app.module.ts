import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { ClientesComponent } from './clientes/clientes.component';
import { ClienteCreateComponent } from './clientes/cliente-create/cliente-create.component';
import { ClienteListarComponent } from './clientes/cliente-listar/cliente-listar.component';
import { ClienteUpdateComponent } from './clientes/cliente-update/cliente-update.component';
import { ClienteSearchComponent } from './clientes/cliente-search/cliente-search.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaCreateComponent } from './categoria/categoria-create/categoria-create.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CategoriaUpdateComponent } from './categoria/categoria-update/categoria-update.component';
import { CategoriaSearchComponent } from './categoria/categoria-search/categoria-search.component';

import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoCreateComponent } from './produtos/produto-create/produto-create.component';
import { ProdutoListarComponent } from './produtos/produto-listar/produto-listar.component';
import { ProdutoSearchComponent } from './produtos/produto-search/produto-search.component';
import { ProdutoUpdateComponent } from './produtos/produto-update/produto-update.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './views/home/home.component';
import { MatTableModule } from '@angular/material/table';

//Para colocar a virgula no local certo do valor
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { FornecedorCreateComponent } from './fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorListarComponent } from './fornecedor/fornecedor-listar/fornecedor-listar.component';
import { FornecedorUpdateComponent } from './fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorSearchComponent } from './fornecedor/fornecedor-search/fornecedor-search.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,

  ],
  declarations: [
    AppComponent,
    ClientesComponent,
    MessagesComponent,
    CategoriaComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    ProdutosComponent,
    ProdutoCreateComponent,
    ProdutoListarComponent,
    ProdutoSearchComponent,
    ProdutoUpdateComponent,
    ClienteCreateComponent,
    ClienteListarComponent,
    ClienteUpdateComponent,
    ClienteSearchComponent,
    CategoriaCreateComponent,
    CategoriaListarComponent,
    CategoriaUpdateComponent,
    CategoriaSearchComponent,
    FornecedorComponent,
    FornecedorCreateComponent,
    FornecedorListarComponent,
    FornecedorUpdateComponent,
    FornecedorSearchComponent,

  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


