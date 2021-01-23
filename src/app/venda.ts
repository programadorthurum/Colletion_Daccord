import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Cliente } from "./cliente";

export class Venda {
    id: number;
    id_cliente: number;
	datahora: Timestamp<string>;
    valorTotal: number;
    id_forma_pagamento: string;
}