import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { ArtistsComponent } from './artists/artists.component';
import { ArtistCreateComponent } from './artists/artist-create/artist-create.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistSearchComponent } from './artists/artist-search/artist-search.component';
import { ArtistUpdateComponent } from './artists/artist-update/artist-update.component';

import { ClientesComponent } from './clientes/clientes.component';
import { ClienteCreateComponent } from './clientes/cliente-create/cliente-create.component';
import { ClienteListarComponent } from './clientes/cliente-listar/cliente-listar.component';
import { ClienteSearchComponent } from './clientes/cliente-search/cliente-search.component';
import { ClienteUpdateComponent } from './clientes/cliente-update/cliente-update.component';

import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListarComponent } from './user/user-listar/user-listar.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserSearchComponent } from './user/user-search/user-search.component';

import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [

  //{ path: '', redirectTo: '/home', pathMatch: 'full' },

  { path:'',
    component: HomeComponent
  },

  { path: 'artists', 
  component: ArtistsComponent 
  },
  { path: "artists/create",
  component: ArtistCreateComponent
  },
  { path: "artists/listar",
  component: ArtistListComponent
  },
  { path: "artists/search",
  component: ArtistSearchComponent
  },
  { path: "artists/update/alterar/:id",
  component: ArtistUpdateComponent
  },
  { path: "artists/update/consultar/:id",
  component: ArtistUpdateComponent
  },

  { path: 'clientes', 
  component: ClientesComponent 
  },
  { path: "clientes/create",
  component: ClienteCreateComponent
  },
  { path: "clientes/listar",
  component: ClienteListarComponent
  },
  { path: "clientes/search",
  component: ClienteSearchComponent
  },
  { path: "clientes/update/alterar/:id",
  component: ClienteUpdateComponent
  },
  { path: "clientes/update/consultar/:id",
  component: ClienteUpdateComponent
  },

  { path: 'configuration', 
  component: ConfigurationComponent 
  },

  { path: 'user', 
  component: UserComponent 
  },
  { path: "user/create",
  component: UserCreateComponent
  },
  { path: "user/listar",
  component: UserListarComponent
  },
  { path: "user/search/",
  component: UserSearchComponent
  },
  { path: "user/update/consultar/:id",
  component: UserUpdateComponent
  },
  
  { path: "user/update/alterar/:id",
  component: UserUpdateComponent
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


