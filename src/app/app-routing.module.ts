import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { ClientesComponent } from './clientes/clientes.component';
import { ClienteCreateComponent } from './clientes/cliente-create/cliente-create.component';
import { ClienteListarComponent } from './clientes/cliente-listar/cliente-listar.component';
import { ClienteSearchComponent } from './clientes/cliente-search/cliente-search.component';
import { ClienteUpdateComponent } from './clientes/cliente-update/cliente-update.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaCreateComponent } from './categoria/categoria-create/categoria-create.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CategoriaSearchComponent } from './categoria/categoria-search/categoria-search.component';
import { CategoriaUpdateComponent } from './categoria/categoria-update/categoria-update.component';

import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoCreateComponent } from './produtos/produto-create/produto-create.component';
import { ProdutoListarComponent } from './produtos/produto-listar/produto-listar.component';
import { ProdutoSearchComponent } from './produtos/produto-search/produto-search.component';
import { ProdutoUpdateComponent } from './produtos/produto-update/produto-update.component';

import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { FornecedorCreateComponent } from './fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorListarComponent } from './fornecedor/fornecedor-listar/fornecedor-listar.component';
import { FornecedorUpdateComponent } from './fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorSearchComponent } from './fornecedor/fornecedor-search/fornecedor-search.component';

const routes: Routes = [

  //{ path: '', redirectTo: '/home', pathMatch: 'full' },

  { path:'',
    component: HomeComponent
  },

  { path: 'categoria', 
  component: CategoriaComponent 
  },
  { path: "categoria/create",
  component: CategoriaCreateComponent
  },
  { path: "categoria/listar",
  component: CategoriaListarComponent
  },
  { path: "categoria/search",
  component: CategoriaSearchComponent
  },
  { path: "categoria/update/consultar/:id",
  component: CategoriaUpdateComponent
  },
  { path: "categoria/update/alterar/:id",
  component: CategoriaUpdateComponent
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


  { path: 'fornecedor', 
  component: FornecedorComponent 
  },
  { path: "fornecedor/create",
  component: FornecedorCreateComponent
  },
  { path: "fornecedor/listar",
  component: FornecedorListarComponent
  },
  { path: "fornecedor/search/alterar/:id",
  component: FornecedorSearchComponent
  },
  { path: "fornecedor/update/consultar/:id",
  component: FornecedorUpdateComponent
  },
  
  { path: "fornecedor/update/alterar/:id",
  component: FornecedorUpdateComponent
  },

  { path: "produto",
  component: ProdutosComponent
  },
  { path: "produto/create",
  component: ProdutoCreateComponent
  },
  { path: "produto/listar",
  component: ProdutoListarComponent
  },
  { path: "produto/search",
  component: ProdutoSearchComponent
  },
  { path: "produto/update",
  component: ProdutoUpdateComponent
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


