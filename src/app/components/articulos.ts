import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ArticuloService } from '../services/articulo.service';
import { Articulo } from '../models/articulo';

@Component({
	selector: 'articulos',
	templateUrl: '../views/articulos.html',
	providers:[ArticuloService]
})
export class ArticulosComponent{
	public titulo: string;
	public articulos: Articulo[];
	public listaArticulosBuscados:Articulo[];
	public buscador: Articulo[];

	constructor(
		private _articuloService: ArticuloService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.titulo = 'Espacio Articulos!!!';
	}

	ngOnInit(){
		console.log('Se ha cargado el componente articulos.ts');
		this.getArticulos();
	}

		getArticulos(){
		this._articuloService.getArticulos().subscribe(
			result => 
			{
				
				if(result.code != 200){
					console.log(result);
				}else{
					this.articulos = result.data;
					this.buscador = result.data;
				}

			},
			error => {
				console.log(<any>error);
			}
		);
	}

	eliminarArticulo(index:number){
		console.log("Esta entrando en el metodo de eliminar");
		console.log(index);
		this._articuloService.deleteArticulo(index).subscribe(
			response => {
				if(response.code == 200){
					this.getArticulos();
				}else{
					alert('Error al borrar producto');
				}
			},	
			error => {
				console.log(<any>error);
			}
		);
	}

		searchArticulo(busqueda:string){
		this.listaArticulosBuscados=[];
		var contador = 0;
		this.buscador.forEach((value)=>{
			if (value.idarticulo==parseInt(busqueda)|| value.nombre==busqueda || value.descripcion==busqueda
				|| value.precio==parseInt(busqueda)){
				this.listaArticulosBuscados.push(value);
				console.log(this.listaArticulosBuscados);
				contador++;
			}
		});
		if(contador!=0){
			this.articulos = this.listaArticulosBuscados;
		}else{
			this.getArticulos();
		}
		
	}

	
}