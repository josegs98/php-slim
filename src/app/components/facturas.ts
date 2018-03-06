import { Component } from '@angular/core';
import {Documento} from '../models/documento';
import {DocumentoService} from '../services/documento.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ClienteService} from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { Factura } from '../models/factura';



@Component({
	selector: 'facturas',
	templateUrl: '../views/facturas.html',
	providers:[DocumentoService, ClienteService]
})
export class FacturasComponent{
	public titulo: string;
	public listaFacturas:Documento[];
	public listaFacturasBuscar:Documento[];
	public facturas:Documento;
	public cliente:Cliente;
	public listaClientes:Cliente[];
	public buscador:Factura[]=[];
	public facturamodel:Factura;
	public facturaslistar:Factura[]=[];

	constructor(private _documentoService:DocumentoService,
				private _route: ActivatedRoute,
				private _router: Router,
				private _clienteService:ClienteService)
	{
		this.titulo = 'Factura';
		
	}

	ngOnInit(){
		console.log('Se ha cargado el componente facturas.ts');
		this.getFacturas();		
	}

	getFacturas(){
		console.log("Ha entrado en getFacturas()...")
		this._documentoService.getDocumentos().subscribe(
			result=>
			{
				if(result.code != 200){
					console.log(result);
				}else{
					this.listaFacturas=result.data;
					this.listaFacturasBuscar=result.data;
					this.getClientes();
					console.log(this.listaFacturas);
				}
			},
			error=>
			{
				console.log(<any> error);
			}
		);
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

	searchFactura(busqueda:string){
		console.log("HA ENTRADO EN SEARCHFACTURA "+busqueda);
		this.setFactura();
		var contador:number=0;
		this.buscador=[];
		this.facturaslistar.forEach((facturabuscada)=>{
			if(facturabuscada.dnicliente==busqueda || facturabuscada.fecha==busqueda || facturabuscada.precio==parseInt(busqueda)
			|| facturabuscada.idfactura==parseInt(busqueda)){
				this.buscador.push(facturabuscada);
				contador++;
			}
		})
		if(contador!=0){
			this.facturaslistar=this.buscador;
			contador=0;
		}else{
			console.log("ELSE SEARCHFACTURA");
			this.getFacturas();
		}
	}

	setFactura(){
		var iddocumento=0;
		var total;
		var dni;
		var fecha;
		var nombre;
		var apellidos;
		this.facturaslistar=[];
		console.log("SETFACTURA -_> "+this.listaFacturas)
		this.listaFacturas.forEach((factura)=>{
			this.facturamodel=new Factura(null, null, '', '', '', '');
			total=factura.total;
			iddocumento=factura.iddocumento;
			fecha=factura.fecha;
			this.listaClientes.forEach((cliente)=>{
				if(factura.idcliente==cliente.idcliente){
					dni=cliente.dni;
					nombre=cliente.nombre;
					apellidos=cliente.apellidos;
				}
			});
			this.facturamodel=new Factura(iddocumento, total, dni, fecha, nombre, apellidos);
			this.facturaslistar.push(this.facturamodel);
		});

		console.log(this.facturaslistar);	
	}





}