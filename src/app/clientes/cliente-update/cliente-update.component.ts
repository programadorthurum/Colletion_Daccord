import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = new Cliente();
  
  constructor(private router: Router,
              private route: ActivatedRoute, 
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.clienteService.readById(id).subscribe(clientes => {
      this.cliente = clientes
    });
  }
  updateCliente(){
    this.clienteService.updateCliente(this.cliente).subscribe();
    this.saida();
   
  }

  saida(){
    this.router.navigate(["clientes"])
   }

}
