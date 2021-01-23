import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from '../venda';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  vendas: Venda[];

  constructor(private router: Router, private vendaService: VendaService) { }

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

  //Menu de navegação
  navigateToVendaCreate(): void{
    this.router.navigate(['/vendas/create'])
   }

   navigateToVendaListar(): void{
    this.router.navigate(['/vendas/listar'])
   }

   navigateToVendaSearch(){
     this.router.navigate(['/vendas/search'])
   }

   navigateToVendaUpdate(){
     this.router.navigate(['/vendas/update'])
   }
   
   mostraLista() {
    this.router.navigate(['vendas']);
  }

}
