export class Factura{
    constructor(
        public idfactura:number,
        public precio:number,
        public dnicliente:string,
        public fecha:string,
        public nombre:string,
        public apellidos:string
    ){}
}