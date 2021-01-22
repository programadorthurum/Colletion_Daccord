import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/categoria';
import { CategoriaService } from 'src/app/categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {
  categorias: Categoria = new Categoria();
  submitted = false;
  
constructor(private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }


  save(){
    this.categoriaService.addCategoria(this.categorias).subscribe();
    this.saida();
    this.categoriaService.showMessage("Operação realizada com sucesso!!!")
  }

  saida(){
   this.router.navigate(["categoria"])
  }
 
 onSubmit() {
   this.submitted = true;
   this.save();    
 }

 gotoList() {
   this.router.navigate(['categoria']);
 }

}
