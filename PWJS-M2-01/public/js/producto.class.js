class Producto {
	//1) Constructor
	constructor(n, s, p, i, pr, d = false){

		this._nombre = n
		this._stock = s
		this._precio = p
		this._imagen = i
		this._presentacion = pr
		this._disponible = d
		this._vDOM = null
		this._anexado = false
	}
	//2) Getters y Setters

	get nombre(){
		return this._nombre
	}

	set nombre(value){
		if( value == "" || value == null || value == undefined || !isNaN(value) ){
			alert("Error, nombre invalido. Indicar solamente caracteres alfanumericos")
		} else {
			this._nombre = value
		}
	}

	get stock(){
		return this._stock
	}

	set stock(value){

		if( Number.isInteger(value) ){
			this._stock = value
		} else {
			alert("Error, stock invalido. Indicar solamente num. enteros")
		}
	}

	get precio(){
		return (this._precio * 1.21).toFixed(2)
	}

	set precio(value){

		if( isNaN(value) ){
			alert("Error, precio invalido. Indicar solamente numeros")
		} else {
			this._precio = value
		}
	}

	get imagen(){
		return this._imagen
	}

	set imagen(value){
		this._imagen = value
	}

	get presentacion(){
		return this._presentacion
	}

	set presentacion(value){
		this._presentacion = value
	}

	get disponible(){
		return this._disponible
	}

	set disponible(value){

		if( typeof value !== "boolean" ){

			alert("Error, disponibilidad invalida. Ingrese solo true/false")

		} else {
			this._disponible = value
		}
	}

	//3) Metodos de Instancia
	Mostrar(area, elemento){
		//debugger

		//Creo una copia del Objeto HTML (si es la primera vez)
		this._vDOM = this._vDOM || document.querySelector(elemento).cloneNode(true)

		//Cambio los datos de la copia por los del Objeto Producto
		this._vDOM.querySelector("img").src = this.imagen
		this._vDOM.querySelector("h6 a").innerText = this.nombre
		this._vDOM.querySelector(".actual").innerText = "USD " + this.precio

		this._vDOM.querySelectorAll("a").forEach( link => {
			link.onclick = (event) => {
				event.preventDefault() //<-- Detengo el evento de "ir a la pagina producto.html"

				window.localStorage.setItem("_ELEGIDO", JSON.stringify(this))

				window.location.href = event.target.href
			}
		})

		this._vDOM.querySelector("button").onclick = this._actualizar.bind(this)

		if( !this._anexado ){

			this._vDOM.classList.remove("hide")

			document.querySelector(area).appendChild( this._vDOM )
			this._anexado = true
		}
		/*

				let datos = `<li><img src="${this._imagen}" alt="${this._nombre}" width="320"></li>
							 <li>Nombre: ${this._nombre}</li>
							 <li>Stock: ${this._stock} unid.</li>
							 <li>Precio: ARS ${this._precio}</li>
							 <li>Disponible: ${this._disponible}</li>
							 <button>Actualizar</button>`

				this._vDOM.innerHTML = datos

				this._vDOM.querySelector("button").onclick = this._actualizar.bind(this)

				this._vDOM.type = "square"
				this._vDOM.style.fontFamily = "Tahoma"
		*/		
	}

	_actualizar(){
		this.nombre = prompt("Ingrese nuevo nombre:", this.nombre)
		this.stock = parseInt( prompt("Ingrese nuevo stock:", this.stock) )
		this.precio = prompt("Ingrese nuevo precio sin IVA:", this.precio)
		this.imagen = prompt("Ingrese la URL de nueva imagen:", this.imagen)
		this.disponible = confirm("Esta disponible para la venta?")

		console.log(this)
		// Forzar el (re) renderizado del vDOM
		this.Mostrar()
	}

	//4) Metodos de Clase
	static Comparar(p1, p2){

		if( p1._precio > p2._precio ){
			document.write(`El ${p1._nombre} es mas caro que el ${p2._nombre}`)
		} else {
			document.write(`El ${p1._nombre} es mas barato que el ${p2._nombre}`)
		}
	}

	static parse(rta){

		let datos = JSON.parse(rta)

		//1) Si es un Array de Object...
		if( datos instanceof Array ){

			return datos.map( item => new Producto(item.Nombre, item.Stock, item.Precio, item.Imagen, item.Presentacion) )

		} else if( datos instanceof Object ){ //2) Si es un solo Object...

			return new Producto(datos.Nombre, datos.Stock, datos.Precio, datos.Imagen, datos.Presentacion)

		} else { //3) Si no es ni Array ni Object...
			throw "ERROR: datos no compatibles para crear objetos Producto"
		}
	}
}