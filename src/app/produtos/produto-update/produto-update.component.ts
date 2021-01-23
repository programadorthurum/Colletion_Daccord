import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {
  produtos: Produto= new Produto();

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private produtoService: ProdutoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.produtoService.readById(id).subscribe(produto => {
      this.produtos = produto
    });
  }

  updateProduto(){
    this.produtoService.updateProduto(this.produtos).subscribe();
    this.saida();
  }

  saida(): void{
    this.router.navigate(["produto"])
  }
}
