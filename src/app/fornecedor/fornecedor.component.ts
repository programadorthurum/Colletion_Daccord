import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  fornecedores: Fornecedor[];

  constructor(private router: Router, private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.getFornecedores();
  }

  getFornecedores(): void {
    this.fornecedorService.getFornecedores()
    .subscribe(fornecedores => this.fornecedores = fornecedores);
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.fornecedorService.addFornecedor({ nome } as Fornecedor)
      .subscribe(fornecedor => {
        this.fornecedores.push(fornecedor);
      });
  }

  delete(fornecedor: Fornecedor): void {
    this.fornecedores = this.fornecedores.filter(h => h !== fornecedor);
    this.fornecedorService.deleteFornecedor(fornecedor).subscribe();
  }

  navigateToFornecedorCreate(): void{
    this.router.navigate(['/fornecedor/create'])
   }

   navigateToFornecedorListar(): void{
    this.router.navigate(['/fornecedor/listar'])
   }

   navigateToFornecedorSearch(){
     this.router.navigate(['/fornecedor/search'])
   }

   navigateToFornecedorUpdate(){
     this.router.navigate(['/fornecedor/update'])
   }
   
   mostraLista() {
    this.router.navigate(['fornecedor']);
  }

}