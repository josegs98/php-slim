import { Component } from '@angular/core';
import {ClienteService} from '../services/cliente.service';
import {Cliente} from '../models/cliente';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'addclientes',
	templateUrl: '../views/addclientes.html',
	providers:[ClienteService]
})

export class AddClientesComponent{

	public titulo:String;
	public cliente:Cliente;

	constructor(private _clienteService:ClienteService, 
				private _route: ActivatedRoute,
				private _router: Router){

		this.titulo="Crear nuevo cliente!!!";
		this.cliente=new Cliente(null, '', '', '', 0);

	}

	ngOnInit(){
		console.log('addarticulo.component.ts cargado...');
		this.getCliente();
	}

	onSubmit(){
		console.log(this.cliente);
		this.saveCliente();
	}

	getCliente(){
		this._route.params.forEach((params: Params) => {
			let idcliente = params['idcliente'];

			this._clienteService.getCliente(idcliente).subscribe(
				response => {
					if(response.code == 200){
						this.cliente = response.data;
					}else{
						this._router.navigate(['/clientes']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	saveCliente(){
		if (this.cliente.idcliente==null){
			this.addCliente();
		}else{
			this.updateCliente();
		}
	}

	addCliente(){
		this._clienteService.addCliente(this.cliente).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/clientes']);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
	}

	updateCliente(){
		this._route.params.forEach((params: Params) => {
			let idcliente=params['idcliente'];

			this._clienteService.editCliente(idcliente, this.cliente).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/clientes']);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

}