import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes()
    .subscribe(clientes => this.clientes = clientes);
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.clienteService.addCliente({ nome } as Cliente)
      .subscribe(cliente => {
        this.clientes.push(cliente);
      });
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(h => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

  navigateToClienteCreate(): void{
    this.router.navigate(['/clientes/create'])
   }

   navigateToClienteListar(): void{
    this.router.navigate(['/clientes/listar'])
   }

   navigateToClienteSearch(){
     this.router.navigate(['/clientes/search'])
   }

   navigateToClienteUpdate(){
     this.router.navigate(['/clientes/update'])
   }
   
   mostraLista() {
    this.router.navigate(['clientes']);
  }

}

