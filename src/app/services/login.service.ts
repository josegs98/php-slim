import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DetalleDocumento } from '../models/detalledocumento';
import { GLOBAL } from './global';

@Injectable()
export class LoginService{
	public url:string;


	constructor(public _http:Http){
		this.url=GLOBAL.url;

	}

		getLogin(){
		return this._http.get(this.url+'usuarios').map(res => res.json());
	}

}