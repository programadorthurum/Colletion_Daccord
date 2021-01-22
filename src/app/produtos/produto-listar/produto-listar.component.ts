import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html',
  styleUrls: ['./produto-listar.component.css']
})
export class ProdutoListarComponent implements OnInit {
produtos: Produto[];

  constructor(private produtoService: ProdutoService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getProdutos();
  }
  navigateToProdutoListar(): void{
    this.router.navigate(['/produto/listar'])
   }  

  saida(): void{
    this.router.navigate(["produto"])
  }
  getProdutos(): void {
    this.produtoService.getProdutos()
    .subscribe(produtos => this.produtos = produtos);
  }

  delete(produto: Produto): void {
    this.produtos = this.produtos.filter(h => h !== produto);
    this.produtoService.deleteProduto(produto).subscribe();
  }

  navigateToProdutoUpdate(){
    this.router.navigate(['/produto/update'])
  }

}
