import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/fornecedor';
import { FornecedorService } from 'src/app/fornecedor.service';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {
  fornecedores: Fornecedor = new Fornecedor();
  submitted = false;

  constructor(private router: Router, private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
  }

  save(){
    this.fornecedorService.addFornecedor(this.fornecedores).subscribe();
    this.saida();
    this.fornecedorService.showMessage("Operação realizada com sucesso!!!")
  }

  saida(){
   this.router.navigate(["fornecedor"])
  }
 
 onSubmit() {
   this.submitted = true;
   this.save();    
 }

 gotoList() {
   this.router.navigate(['fornecedor']);
 }

}
