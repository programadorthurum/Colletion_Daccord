import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {
  produto: Produto = new Produto();
  submitted = false;

  constructor(private produtoService: ProdutoService, 
    private router: Router) { }


  ngOnInit(): void {
   }
//Apenas teste
   createProduto(): void{
    this.produtoService.showMessage("Produto cadastrado com sucesso!!!")
   }

   save(){
     this.produtoService.addProduto(this.produto).subscribe();
     this.saida();
     this.produtoService.showMessage("Operação realizada com sucesso!!!")
   }

   saida(){
    this.router.navigate(["produto"])
   }
  
  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['produto']);
  }

}
