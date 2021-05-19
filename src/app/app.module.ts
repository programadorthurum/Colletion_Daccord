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

import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListarComponent } from './user/user-listar/user-listar.component';
import { UserSearchComponent } from './user/user-search/user-search.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

import { ConfigurationComponent } from './configuration/configuration.component';

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
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    ClienteCreateComponent,
    ClienteListarComponent,
    ClienteUpdateComponent,
    ClienteSearchComponent,
    UserComponent,
    UserCreateComponent,
    UserListarComponent,
    UserSearchComponent,
    UserUpdateComponent,
    ConfigurationComponent,

  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


