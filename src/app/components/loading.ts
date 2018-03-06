import { Component } from '@angular/core';

@Component({
	selector: 'loading',
	templateUrl: '../views/loading.html'
})

export class LoadingComponent{
	title: String;
	
	constructor(){
		this.title = "Cargando modificaciones..."
	}
}