import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/cliente.service';


@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css']
})
export class ClienteListarComponent implements OnInit {
  clientes: Cliente[];

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  saida(): void{
    this.router.navigate(["clientes"])
  }
  getClientes(): void {
    this.clienteService.getClientes()
    .subscribe(clientes => this.clientes = clientes);
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(h => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

  updateCliente(){
    this.router.navigate(['/clientes/update/consultar/'])
  }
}
