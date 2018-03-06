import { Component } from '@angular/core';
import {ClienteService} from '../services/cliente.service';
import {Cliente} from '../models/cliente';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'clientes',
	templateUrl: '../views/clientes.html',
	providers:[ClienteService]
})
export class ClientesComponent{
	public titulo: string;
	public listaClientes:Cliente[];
	public listaClientesBuscados:Cliente[];
	public busqueda: Cliente[];

	constructor(private _clienteService:ClienteService, 
				private _route: ActivatedRoute,
				private _router: Router){
		this.titulo = 'Espacio clientes!!!';
		this.listaClientesBuscados=[];
	}

	ngOnInit(){
		this.listaClientesBuscados=[];
		console.log('Se ha cargado el componente clientes.ts');
		this.getClientes();
	}

	getClientes(){
		console.log("Ha entrado en getClientes()...")
		this._clienteService.getClientes().subscribe(
			result=>
			{
				if(result.code != 200){
					console.log(result);
				}else{
					this.listaClientes = result.data;
					this.busqueda = result.data;
					console.log(this.listaClientes);
				}
			},
			error=>
			{
				console.log(<any> error);
			}
		);
	}

	eliminarCliente(index:number){
		console.log("Esta entrando en el metodo de eliminar");
		console.log(index);
		this._clienteService.deleteCliente(index).subscribe(
			response => {
				if(response.code == 200){
					this.getClientes();
				}else{
					alert('Error al borrar cliente');
				}
			},	
			error => {
				console.log(<any>error);
			}
		);
	}

	searchCliente(busqueda:string){
		this.listaClientesBuscados=[];
		var contador= 0;
		this.busqueda.forEach((value)=>{
			if (value.dni==busqueda || value.nombre==busqueda || value.apellidos==busqueda
				|| value.telefono==parseInt(busqueda)){
				this.listaClientesBuscados.push(value);
				console.log(this.listaClientesBuscados);
				contador++;
			}
		});

		if(contador!=0){
			this.listaClientes = this.listaClientesBuscados;
		}else{
			this.getClientes();
		}
	}



}