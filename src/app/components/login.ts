import { Component, Directive } from '@angular/core';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { Usuario } from '../models/usuario';

@Component({
	selector: 'login',
	templateUrl: '../views/login.html',
	providers: [LoginService]
})

@Directive({
  selector: '[AppComponent]'
})

export class LoginComponent{
	public titulo: string;
	public login: Login;
	public usuarios: Usuario[];
	public acceso: boolean;

	constructor(private _loginService : LoginService){
		this.titulo = 'Login';
		this.login = new Login('','');
		this.acceso = true;
		console.log('acceso en constructor' + this.acceso);
		localStorage.setItem("logueado", "no");
	}

	ngOnInit(){
		console.log('Se ha cargado el componente login.ts');
		this.getUsuarios();
	}

		onSubmit(){
		localStorage.removeItem("logueado");
		console.log(this.login);

		this.usuarios.forEach((usuario)=>{
			if (usuario.email == this.login.usuario && usuario.password == this.login.password){
				var toConcat = usuario.idusuario + "";
				localStorage.setItem("logueado", toConcat);
				console.log(this.login);
				console.log(localStorage.getItem('logueado'));
				this.acceso = true;
				location.reload();
				
			}else{
				this.acceso = false;
			}
		});		
	}

		getUsuarios(){
			console.log('Iniciando la busqueda de usuarios')
		this._loginService.getLogin().subscribe(
			result => 
			{
				
				if(result.code != 200){
					console.log(result);
				}else{
					this.usuarios = result.data;
					console.log('usuarios recogidos correctamente');
				}

			},
			error => {
				console.log(<any>error);
			}
		);
	}

}