import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home';
import { ArticulosComponent } from './components/articulos';
import { ClientesComponent } from './components/clientes';
import { CobrosComponent } from './components/cobros';
import { FacturasComponent } from './components/facturas';
import { AddarticuloComponent } from './components/addarticulo';
import { AddClientesComponent } from './components/addclientes';
import { UsuarioComponent } from './components/usuario';
import { AddUsuarioComponent } from './components/addusuario';
import { LoadingComponent } from './components/loading';
import { FichaFacturaComponent } from './components/fichafactura';




const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'loading', component: LoadingComponent},
	{path: 'articulos', component: ArticulosComponent},
	{path: 'addarticulo', component: AddarticuloComponent},
	{path: 'addarticulo/:id', component: AddarticuloComponent},
	{path: 'clientes', component: ClientesComponent},
	{path: 'cobros', component: CobrosComponent},
	{path: 'facturas', component: FacturasComponent},
	{path: 'addclientes', component: AddClientesComponent},
	{path: 'addcliente/:idcliente', component: AddClientesComponent},
	{path: 'usuario', component: UsuarioComponent},
	{path: 'usuario/:idusuario', component: UsuarioComponent},
	{path: 'addusuario', component: AddUsuarioComponent},
	{path: 'fichafactura/:iddocumento', component: FichaFacturaComponent},
	{path: 'addusuario/:idusuario', component: AddUsuarioComponent},


	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);