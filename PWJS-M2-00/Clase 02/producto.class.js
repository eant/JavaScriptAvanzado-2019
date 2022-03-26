class Producto {
	//1) Constructor
	constructor(n, p, s, d){
		this.nombre = n
		this.precio = p
		this.stock = s
		this.disponible = d
	}
	//2) Metodos de Instancia
	Mostrar(neto = true){
		let ficha = document.createElement("ul")

		let contenido = `
						<li>Nombre: ${this.nombre}</li>
						<li>Precio: ARS ${neto ? this.precio : this.precioBruto()}</li>
						<li>Stock: ${this.stock} unid.</li>
						<li>Disponible: ${this.disponible ? "SI" : "NO"}</li>
						`
		ficha.innerHTML = contenido

		document.body.appendChild( ficha )
	}
	precioBruto(){
		return (this.precio / 1.21).toFixed(2)
	}
	//3) Metodos de Clase
}