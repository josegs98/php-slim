import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Articulo } from '../models/articulo';
import { GLOBAL } from './global';

@Injectable()
export class ArticuloService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getArticulos(){
		return this._http.get(this.url+'articulos').map(res => res.json());
	}

	getArticulo(idarticulo){
		return this._http.get(this.url+'articulos/'+idarticulo).map(res => res.json());
	}

	addArticulo(articulo: Articulo){
		let json = JSON.stringify(articulo);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'articulos', params, {headers: headers})
						 .map(res => res.json());
	}

	editArticulo(idarticulo, articulo: Articulo){
		let json = JSON.stringify(articulo);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-articulo/'+idarticulo, params, {headers: headers})
						 .map(res => res.json());
	}

	deleteArticulo(idarticulo){
		return this._http.get(this.url+'delete-articulo/'+idarticulo)
						 .map(res => res.json());
	}

		makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('uploads[]', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}

}