import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/fornecedor';
import { FornecedorService } from 'src/app/fornecedor.service';

@Component({
  selector: 'app-fornecedor-listar',
  templateUrl: './fornecedor-listar.component.html',
  styleUrls: ['./fornecedor-listar.component.css']
})
export class FornecedorListarComponent implements OnInit {
  fornecedores: Fornecedor[];

  constructor(private router: Router, private fornecedorService: FornecedorService) { }


    ngOnInit(): void {
      this.getFornecedores();
    }
    
    getFornecedores(): void {
      this.fornecedorService.getFornecedores()
      .subscribe(fornecedores => this.fornecedores = fornecedores);
    }
    
      delete(fornecedor: Fornecedor): void {
        this.fornecedores = this.fornecedores.filter(h => h !== fornecedor);
        this.fornecedorService.deleteFornecedor(fornecedor).subscribe();
      }
    
      updateFornecedor(){
        this.router.navigate(['/categoria/update/consultar/'])
      }

      saida(): void{
        this.router.navigate(["fornecedor"])
      }

    }