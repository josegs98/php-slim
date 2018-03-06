import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente';
import {DetalleDocumento} from '../models/detalledocumento'
import { GLOBAL } from './global';

@Injectable()
export class DetalleDocumentoService{
    public url:string;

	constructor(public _http:Http){
		this.url=GLOBAL.url;
    }
    
    addDetalleDocumento(detalledocumento:DetalleDocumento){
        let json = JSON.stringify(detalledocumento);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'detalledocumento', params, {headers: headers})
						 .map(res => res.json());
    }
}