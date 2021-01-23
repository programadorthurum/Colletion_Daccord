import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from 'src/app/venda';
import { VendaService } from 'src/app/venda.service';


@Component({
  selector: 'app-vendas-listar',
  templateUrl: './vendas-listar.component.html',
  styleUrls: ['./vendas-listar.component.css']
})
export class VendasListarComponent implements OnInit {
  vendas: Venda[];
  
  constructor(private router: Router, 
              private vendaService: VendaService) { }

  ngOnInit(): void {
    this.getVendas();
  }

  getVendas(): void {
    this.vendaService.getVendas()
    .subscribe(vendas => this.vendas = vendas);
  }
  
  delete(venda: Venda): void {
    this.vendas = this.vendas.filter(h => h !== venda);
    this.vendaService.deleteVenda(venda).subscribe();
  }

  saida(): void{
    this.router.navigate(["vendas"])
  }

}
