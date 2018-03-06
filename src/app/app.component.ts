import { Component , Input, NO_ERRORS_SCHEMA} from '@angular/core';
import { LoginService } from './services/login.service';
import { Usuario }   from './models/usuario';
import { UsuarioService } from './services/usuario.service'
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService, UsuarioService]
})
export class AppComponent {
  title = 'app';
  public usuario: Usuario;
  public visible: boolean;


  constructor( private _loginService: LoginService,
  	          private _usuarioService: UsuarioService,
              private _route: ActivatedRoute,
              private _router: Router
  				){
  			this.visible = false;
  			
  			}

  ngOnInit(){
  	if(localStorage.getItem("logueado") != "no"){
  		this.visible = true;
  	}else{
  		this.visible = false;
  	}
  	localStorage.getItem("logueado");
  	this.getUsuario();
  	console.log(localStorage.getItem("logueado"));
  }

  logout(){
  	this.visible = false;
    this._router.navigate(['/']);
    localStorage.removeItem("logueado");
  }

		getUsuario(){

			//usuario predeterminado hasta que terminemos el login
		this._usuarioService.getUsuario(localStorage.getItem("logueado")).subscribe(
				response => {
					if(response.code == 200){
						this.usuario = response.data;
					}else{
						//this._router.navigate(['/usuario']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		
	}

}
