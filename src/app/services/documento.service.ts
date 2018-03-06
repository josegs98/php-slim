import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Documento } from '../models/documento';
import { GLOBAL } from './global';

@Injectable()
export class DocumentoService{
	public url:string;

	constructor(public _http:Http){
		this.url=GLOBAL.url;
	}

	getDocumentos(){
		return this._http.get(this.url+'documentos').map(res=>res.json());
	}

	getDocumento(iddocumento){
		return this._http.get(this.url+'documentos/'+iddocumento).map(res => res.json());
	}

	addDocumento(documento: Documento){
		let json = JSON.stringify(documento);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'documentos', params, {headers: headers})
						 .map(res => res.json());
	}

}
