import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {
  submitted: boolean = false;
  id: number;
  produtos: Produto;

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(): void {
  }

  saida(): void{
    this.router.navigate(["produto"])
  }
}
