import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente';
import { GLOBAL } from './global';

@Injectable()
export class ClienteService{
	public url:string;

	constructor(public _http:Http){
		this.url=GLOBAL.url;
	}

	getClientes(){
		return this._http.get(this.url+'clientes').map(res=>res.json());
	}

	getCliente(idcliente){
		return this._http.get(this.url+'clientes/'+idcliente).map(res => res.json());
	}

	addCliente(cliente: Cliente){
		let json = JSON.stringify(cliente);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'clientes', params, {headers: headers})
						 .map(res => res.json());
	}

	editCliente(idcliente, cliente:Cliente){
		let json = JSON.stringify(cliente);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-cliente/'+idcliente, params, {headers: headers})
						 .map(res => res.json());
	}

	deleteCliente(idcliente){
		return this._http.get(this.url+'delete-cliente/'+idcliente)
						 .map(res => res.json());
	}
}