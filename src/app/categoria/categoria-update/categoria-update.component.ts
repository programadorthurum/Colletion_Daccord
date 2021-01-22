import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/categoria';
import { CategoriaService } from 'src/app/categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {
categoria: Categoria = new Categoria();

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.categoriaService.readById(id).subscribe(categoria => {
      this.categoria = categoria
    });
  }
  updateCategoria(){
    this.categoriaService.updateCategoria(this.categoria).subscribe();
    this.saida();
   
  }

  saida(){
    this.router.navigate(['/categoria/listar'])
   }



}
