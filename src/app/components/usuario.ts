import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
	selector: 'usuario',
	templateUrl: '../views/usuario.html'
})

export class UsuarioComponent{
	public titulo: string;
	public usuario: Usuario;

	constructor(
		private _usuarioService: UsuarioService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.titulo = 'Usuario!!!';
		this.usuario = new Usuario(1,'','','','','','',''); // hasta que terminemos el logeo tendremos 
															//uno predeterminado
	}

	ngOnInit(){
		console.log('Se ha cargado el componente articulos.ts');
		this.getUsuario();
	}

	getUsuario(){

			//usuario predeterminado hasta que terminemos el login
			this._usuarioService.getUsuario(localStorage.getItem("logueado")).subscribe(
				response => {
					if(response.code == 200){
						this.usuario = response.data;
					}else{
						this._router.navigate(['/home']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		
	}

	eliminarUsuario(index:number){
		console.log("Esta entrando en el metodo de eliminar");
		console.log(index);
		this._usuarioService.deleteUsuario(index).subscribe(
			response => {
				if(response.code == 200){
					//redireccionar a pagina
				}else{
					alert('Error al borrar producto');
				}
			},	
			error => {
				console.log(<any>error);
			}
		);
	}	
}