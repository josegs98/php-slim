import { Component } from '@angular/core';
import {Documento} from '../models/documento';
import {DocumentoService} from '../services/documento.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ClienteService} from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { Factura } from '../models/factura';



@Component({
	selector: 'fichafactura',
	templateUrl: '../views/fichafactura.html',
	providers:[DocumentoService, ClienteService]
})
export class FichaFacturaComponent{
	public factura:Factura;
	public listaClientes:Cliente[];
	public facturaDocumento:Documento;

    constructor(private _documentoService:DocumentoService,
                private _clienteService:ClienteService,
                private _route:ActivatedRoute,
                private _router:Router)
    {
		this.factura=new Factura(null, null, '', '' ,'', '');
		this.facturaDocumento=new Documento(null, null, '', '');
    }

    
    ngOnInit(){
        console.log("Componente fichafactura.ts cargado correctamente")
        this.getDocumento();
    }

    getDocumento(){
        this._route.params.forEach((params: Params) => {
			let iddocumento = params['iddocumento'];
            console.log("EL IDDOCUMENTO ES "+iddocumento);
			this._documentoService.getDocumento(iddocumento).subscribe(
				response => {
					if(response.code == 200){
						this.facturaDocumento = response.data;
						this.getClientes();
						console.log("Nombre del cliente--> "+this.factura.dnicliente)
					}else{
						this._router.navigate(['/fichafactura']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
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
					this.setFactura();
					console.log(this.listaClientes);
				}
			},
			error=>
			{
				console.log(<any> error);
			}
		);
	}
	
	setFactura(){
		var iddocumento=0;
		var total;
		var dni;
		var fecha;
		var nombre;
		var apellidos;

		this.listaClientes.forEach((cliente)=>{
			if (cliente.idcliente==this.facturaDocumento.idcliente){
				this.factura=new Factura(this.facturaDocumento.iddocumento, parseInt(this.facturaDocumento.total),
					cliente.dni, this.facturaDocumento.fecha, cliente.nombre, cliente.apellidos);
			}
		});
		console.log("FACTURA MONTADA --> "+this.factura.nombre+", "+this.factura.apellidos+", "+this.factura.precio);
		
	
	}

}