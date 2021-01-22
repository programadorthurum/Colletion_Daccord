import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[];
 
  constructor(private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
    .subscribe(categorias => this.categorias = categorias);
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.categoriaService.addCategoria({ nome } as Categoria)
      .subscribe(categoria => {
        this.categorias.push(categoria);
      });
  }

  delete(categoria: Categoria): void {
    this.categorias = this.categorias.filter(h => h !== categoria);
    this.categoriaService.deleteCategoria(categoria).subscribe();
  }

  navigateToCategoriaCreate(): void{
    this.router.navigate(['/categoria/create'])
   }

   navigateToCategoriaListar(): void{
    this.router.navigate(['/categoria/listar'])
   }

   navigateToCategoriaSearch(){
     this.router.navigate(['/categoria/search'])
   }

   navigateToCategoriaUpdate(){
     this.router.navigate(['/categoria/update'])
   }
   
   mostraLista() {
    this.router.navigate(['categoria']);
  }

}
