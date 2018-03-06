import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ArticuloService } from '../services/articulo.service';
import { Articulo } from '../models/articulo';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'addarticulo',
	templateUrl: '../views/addarticulo.html',
	providers: [ArticuloService]
})

export class AddarticuloComponent{
	public titulo: string;
	public articulo: Articulo;
	public filesToUpload;
	public resultUpload;

		constructor(
		private _articuloService: ArticuloService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Crear un nuevo artículo!!!';
		this.articulo = new Articulo(null,'','',0,'');
	}

	ngOnInit(){
		console.log('addarticulo.component.ts cargado...');
		this.getArticulo();
	}

		onSubmit(){
		console.log(this.articulo);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._articuloService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.articulo.imagen = this.resultUpload.filename;
				this.saveArticulo();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.saveArticulo();	
		}

	}
	
	saveArticulo(){
			if(this.articulo.idarticulo == null){
				this.addArticulo();
				
			}else{
			this.updateArticulo();

			}
		}

		getArticulo(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._articuloService.getArticulo(id).subscribe(
				response => {
					if(response.code == 200){
						this.articulo = response.data;
					}else{
						this._router.navigate(['/articulos']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	updateArticulo(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._articuloService.editArticulo(id, this.articulo).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/articulos']);
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

	addArticulo(){
		this._articuloService.addArticulo(this.articulo).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/articulos']);
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