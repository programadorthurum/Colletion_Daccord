import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-produto-search',
  templateUrl: './produto-search.component.html',
  styleUrls: ['./produto-search.component.css']
})
export class ProdutoSearchComponent implements OnInit {

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(): void {
  }

  saida(): void{
    this.router.navigate(["produto"])
  }

}
