import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/categoria';
import { CategoriaService } from 'src/app/categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {
categorias: Categoria[];

constructor(private router: Router, private categoriaService: CategoriaService) { }

ngOnInit(): void {
  this.getCategorias();
}

getCategorias(): void {
  this.categoriaService.getCategorias()
  .subscribe(categorias => this.categorias = categorias);
}

  delete(categoria: Categoria): void {
    this.categorias = this.categorias.filter(h => h !== categoria);
    this.categoriaService.deleteCategoria(categoria).subscribe();
  }

  updateCategoria(){
    this.router.navigate(['/categoria/update/consultar/'])
  }

  saida(): void{
    this.router.navigate(["categoria"])
  }
}



