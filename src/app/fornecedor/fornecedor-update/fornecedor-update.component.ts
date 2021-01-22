import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/fornecedor';
import { FornecedorService } from 'src/app/fornecedor.service';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private fornecedorService: FornecedorService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.fornecedorService.readById(id).subscribe(fornecedor => {
      this.fornecedor = fornecedor
    });
  }
  updateFornecedor() {
    this.fornecedorService.updateFornecedor(this.fornecedor).subscribe();
    this.saida();
  }

  saida(){
    this.router.navigate(["categoria"])
   }

}

