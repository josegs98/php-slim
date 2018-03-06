import { Component } from '@angular/core';
import {Cliente} from '../models/cliente';
import {Articulo} from '../models/articulo';
import {ClienteService} from '../services/cliente.service';
import {ArticuloService} from '../services/articulo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {DocumentoService} from '../services/documento.service';
import {Documento}  from '../models/documento';
import {DetalleDocumento} from '../models/detalledocumento';
import {DetalleDocumentoService} from '../services/detalledocumento.service';
import { DatePipe } from '@angular/common';
import { error } from 'selenium-webdriver';

@Component({
	selector: 'cobros',
	templateUrl: '../views/cobros.html',
	providers:[ClienteService, ArticuloService, DocumentoService, DetalleDocumentoService]

})
export class CobrosComponent{
	public subtotal:number=0.0;
	public total:number=0.0;
	public ivaprecio:number=0.0;
	public titulo: string;
	public contador:number=0;
	public clientesCombo:Cliente[];
	public articulos:Articulo[];
	public articuloEliminado:Articulo;
	public articuloElegido:Articulo[]=[];
	public clienteSeleccionado:Cliente;
	public seleccion=this.clientesCombo;
	public factura:Documento;
	public detallefactura:DetalleDocumento;
	public date = new Date();
	public ultimoid:number=0;
	public idfactura: number =0;
	public listaFacturas:Documento[];
	public articuloseleccionado:Articulo;
	public compra: boolean;

	constructor(private _clienteService:ClienteService,
				private _articuloService:ArticuloService,
				private _detalleDocumentoService:DetalleDocumentoService,
				private _documentoService:DocumentoService,
				private _route: ActivatedRoute,
				private _router: Router)
	{
		this.titulo = 'COBROS';
		this.clienteSeleccionado=null;
		this.compra=false;
		

	}

	ngOnInit(){
		console.log('Se ha cargado el componente cobros.ts');
		this.getClientes();
		this.getArticulos();
		this.getFacturas();
		
	}

	getClientes(){
		console.log("Ha entrado en getClientes()...")
		this._clienteService.getClientes().subscribe(
			result=>
			{
				if(result.code != 200){
					console.log(result);
				}else{
					this.clientesCombo = result.data;
					console.log(this.clientesCombo);
				}
			},
			error=>
			{
				console.log(<any> error);
			}
		);
	}

	seleccionCombo(cliente:Cliente){
		console.log("HA ENTRADO EN SELECCION COMBO");
		this.clientesCombo.forEach((value)=>{
			if(value.dni==cliente.dni){
				this.clienteSeleccionado=value;
				console.log(this.clienteSeleccionado);
			}
		});
	}

	

	getArticulos(){
		this._articuloService.getArticulos().subscribe(
			result => 
			{
				if(result.code != 200){
					console.log(result);
				}else{
					this.articulos = result.data;
				}

			},
			error => {
				console.log(<any>error);
			}
		);
	}

	buscarArticulo(id:number){
		console.log("HA ENTRADO EN BUSCAR ARTICULO "+id);
		
		this.articulos.forEach((value)=>{
			if (value.idarticulo==id){
				this.articuloElegido.push(value);
				this.setSubtotal(value.precio);
				this.setTotalIva(value.precio);
				this.setTotal();
				this.compra= true;

			}
		});
	}

	eliminarArticulo(index:number, idarticulo:number){
		console.log("HA ENTRADO EN COBROS, ELIMINAR ARTICULO "+index);
		this.articuloElegido.forEach((value)=>{
			if(value.idarticulo==idarticulo && this.contador!=1){
				console.log("HA ENTRADO EN LA ITERACION DE ELIMINAR ARTICULO ")
				this.contador=1;
				this.setRestaSubtotal(value.precio);
				this.setRestaTotalIva(value.precio);
				this.setTotal();

			}
		});
		this.articuloElegido.splice(index, 1);
		if(this.articuloElegido.length == 0){
			this.compra = false;
		}
		this.contador=0;
		
	}

	setSubtotal(precio:number){
		console.log("HA ENTRADO EN SUMAR PRECIO");
		this.subtotal=+precio+ +this.subtotal;
		console.log("SET TOTAL -->"+this.subtotal)
		return this.subtotal;
		
	}

	setRestaSubtotal(precio:number){
		console.log("HA ENTRADO EN RESTA TOTAL")
		this.subtotal=this.subtotal-precio;
		return this.subtotal;
	}

	setTotalIva(precio:number){
		console.log("HA ENTRADO EN SETTOTALIVA")
		this.ivaprecio=+this.ivaprecio+(precio*21/100);
		console.log("EL PRECIO CON EL IVA ES-->"+this.ivaprecio)
		return this.ivaprecio;
	}

	setRestaTotalIva(precio:number){
		this.ivaprecio=this.ivaprecio-(precio*21/100);
		return this.ivaprecio;
	}

	setTotal(){
		console.log("HA ENTRADO EN SETTOTAL")
		this.total=this.subtotal+this.ivaprecio;
		return this.total;
	}

	addFactura(){
		var date=new Date();
		console.log("IDCLIENTE--> "+this.clienteSeleccionado.idcliente+", TOTAL--> "+this.total.toFixed(2)+
		" DNI CLIENTE--> "+this.clienteSeleccionado.dni);
		this.factura=new Documento(null, this.clienteSeleccionado.idcliente, this.total.toFixed(2), date.toString());
		//console.log("FACTURA A INTRODUCIR--> "+this.factura);
		
		this._documentoService.addDocumento(this.factura).subscribe(
			response=>{
				if (response.code==200){
					this.articuloElegido.forEach((value)=>{
						console.log("IDFACTURA--> "+this.ultimoid+"IDARTICULO "+value.idarticulo+"PRECIO "+value.precio);
						this.detallefactura=new DetalleDocumento(null, this.ultimoid+1, value.idarticulo,
							1, value.precio.toString());
						this._detalleDocumentoService.addDetalleDocumento(this.detallefactura).subscribe(
							response=>{
								if(response.code==200){
									console.log("DETALLE DOCUMENTO AÑADIDO");
									this._router.navigate(['/cobros']);
									
									this.articuloElegido=[];
									this.subtotal=0.0;
									this.total=0.0;
									this.ivaprecio=0.0;
									this.compra= false;
								}else{
									console.log("ERROR EN RESPUESTA DETALLEDOCUMENTO--> "+response)
								}
							},
							error=>{
								console.log("ERROR EN DETALLEDOCUMENTO "+<any>error);
							}
						);
					});
				}else{
					console.log("ERROR EN RESPUESTA-->"+response);
				}
			},
			error=>{
				console.log("ERROR--> "+<any> error);
			}
		);
	}

	getFacturas(){
		var contador=0;
		console.log("Ha entrado en getFacturas()...")
		this._documentoService.getDocumentos().subscribe(
			result=>
			{
				if(result.code != 200){
					console.log(result);
				}else{
					this.listaFacturas = result.data;
					this.listaFacturas.forEach((value)=>{
						contador++;
						if(contador==this.listaFacturas.length){
							console.log("Ultimo elemento del array "+contador)
							this.ultimoid=contador;
							this.idfactura=contador+1;
						}
					});
					console.log(this.listaFacturas);
				}
			},
			error=>
			{
				console.log(<any> error);
			}
		);
	}

		seleccionComboArticulo(articulo:Articulo){
		console.log("SELECCIONCOMBOARTICULO--> "+articulo.idarticulo)
		this.articulos.forEach((articulobuscado)=>{
			if(articulobuscado.idarticulo==articulo.idarticulo){
				this.articuloseleccionado=articulobuscado;
				this.articuloElegido.push(this.articuloseleccionado);
				this.setSubtotal(articulobuscado.precio);
				this.setTotalIva(articulobuscado.precio);
				this.setTotal();
				this.compra = true;
			}
		})
	}
}