import { Component } from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'addusuario',
	templateUrl: '../views/addusuario.html',
	providers:[UsuarioService]
})

export class AddUsuarioComponent{

	public titulo: string;
	public usuario: Usuario;
	public filesToUpload;
	public resultUpload;

		constructor(
		private _usuarioService: UsuarioService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Edit usuario!!!';
		this.usuario = new Usuario(null,'','','','','','ROLE_USER','');
	}

	ngOnInit(){
		console.log('addusuario.component.ts cargado...');
		this.getUsuario();
	}

	onSubmit(){
		console.log('este es el usuario ' + this.usuario);
		console.log('Entra en onSubmit');
		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._usuarioService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.usuario.image = this.resultUpload.filename;
				this.saveUsuario();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.saveUsuario();	
		}

	}
	
	saveUsuario(){
			if(this.usuario.idusuario == null){
				this.addUsuario();
				
			}else{
				console.log('pasando por la actualizacion' + this.usuario.idusuario)
			this.updateUsuario(this.usuario.idusuario);

			}
		}

		getUsuario(){
		this._route.params.forEach((params: Params) => {
			let idusuario = params['idusuario'];

			this._usuarioService.getUsuario(idusuario).subscribe(
				response => {
					if(response.code == 200){
						this.usuario = response.data;
					}else{
						//this._router.navigate(['/usuario']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	updateUsuario(id){

			this._usuarioService.editUsuario(id, this.usuario).subscribe(
				response => {
					if(response.code == 200){
						//this._router.navigate(['/loading']);
						location.reload();
						this._router.navigate(['/usuario']);

					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		
	}

	addUsuario(){
		this._usuarioService.addUsuario(this.usuario).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/usuario']);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
	}

		fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

}