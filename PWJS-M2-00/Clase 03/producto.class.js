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
	//3) Metodos de Clase (o Metodos Estáticos)
	static parse(data){
		console.log("Ahora deberia convertir Object en Producto")
		data = JSON.parse(data)

		if( data instanceof Array ){ //<-- Hay muchos Object

			let productos = new Array()

			data.forEach(item => {
				let producto = new Producto(item.nombre, item.precio, item.stock, item.disponible)

				productos.push( producto )
			})

			return productos

		} else if( data instanceof Object ){ //<-- Hay un solo Object

			let producto = new Producto(data.nombre, data.precio, data.stock, data.disponible)

			return producto

		} else { //<-- No hay ningún Object (No sirve nada...)

			return null

		}

	}
}