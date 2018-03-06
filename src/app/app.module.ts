import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { LoginComponent } from './components/login';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { ArticulosComponent } from './components/articulos';
import { ClientesComponent } from './components/clientes';
import { CobrosComponent } from './components/cobros';
import { FacturasComponent } from './components/facturas';
import { AddarticuloComponent } from './components/addarticulo';
import { AddClientesComponent} from './components/addclientes';
import { UsuarioComponent } from './components/usuario';
import { AddUsuarioComponent } from './components/addusuario';
import { LoadingComponent } from './components/loading';
import { FichaFacturaComponent } from './components/fichafactura';

@NgModule({
  declarations: [
    LoginComponent,
    UsuarioComponent,
    AddUsuarioComponent,
    AppComponent,
    HomeComponent,
    ArticulosComponent,
    ClientesComponent,
    CobrosComponent,
    FacturasComponent,
    AddarticuloComponent,
    AddClientesComponent,
    LoadingComponent,
    FichaFacturaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
