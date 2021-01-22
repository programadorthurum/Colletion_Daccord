import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/fornecedor';
import { FornecedorService } from 'src/app/fornecedor.service';

@Component({
  selector: 'app-fornecedor-search',
  templateUrl: './fornecedor-search.component.html',
  styleUrls: ['./fornecedor-search.component.css']
})
export class FornecedorSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
