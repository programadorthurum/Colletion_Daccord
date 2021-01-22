import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  clientes: Cliente= new Cliente();
  submitted = false;

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  save(){
    this.clienteService.addCliente(this.clientes).subscribe();
    this.saida();
    this.clienteService.showMessage("Operação realizada com sucesso!!!")
  }

  saida(){
   this.router.navigate(["clientes"])
  }
 
 onSubmit() {
   this.submitted = true;
   this.save();    
 }

 gotoList() {
   this.router.navigate(['clientes']);
 }

}
