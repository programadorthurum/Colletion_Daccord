import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[];

  constructor(private produtoService: ProdutoService, 
              private router: Router) { }

  ngOnInit(): void {
   }
  //Menu de navegação
  navigateToProdutoCreate(): void{
    this.router.navigate(['/produto/create'])
   }

   navigateToProdutoListar(): void{
    this.router.navigate(['/produto/listar'])
   }

   navigateToProdutoSearch(){
     this.router.navigate(['/produto/search'])
   }

   navigateToProdutoUpdate(){
     this.router.navigate(['/produto/update'])
   }
   
   mostraLista() {
    this.router.navigate(['produto']);
  }

}
