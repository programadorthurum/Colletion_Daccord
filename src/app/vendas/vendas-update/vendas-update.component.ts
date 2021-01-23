import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from 'src/app/venda';
import { VendaService } from 'src/app/venda.service';

@Component({
  selector: 'app-vendas-update',
  templateUrl: './vendas-update.component.html',
  styleUrls: ['./vendas-update.component.css']
})
export class VendasUpdateComponent implements OnInit {
  vendas: Venda = new Venda();

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private vendaService: VendaService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.vendaService.readById(id).subscribe(venda => {
      this.vendas = venda
    });

  }

  updateVendas(){
    this.vendaService.updateVenda(this.vendas).subscribe();
    this.saida();
   
  }

  saida(){
    this.router.navigate(['/vendas/listar'])
   }


}
