class Producto {
	//1) Constructor
	constructor(id, n, p, s, c, i, m, pr, d = false){
		this.id = id
		this.nombre = n
		this.precio = p
		this.stock = s
		this.categoria = c
		this.imagen = i
		this.marca = m
		this.presentacion = pr
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
				//let producto = new Producto(item.nombre, item.precio, item.stock, item.disponible)
				
				let producto = new Producto(
					item.idProducto,
					item.Nombre,
					item.Precio,
					item.Stock,
					item.Categoria,
					item.Imagen,
					item.Marca,
					item.Presentacion
				)

				productos.push( producto )
			})

			return productos

		} else if( data instanceof Object ){ //<-- Hay un solo Object
			
			//let producto = new Producto(data.nombre, data.precio, data.stock, data.disponible)
			let producto = new Producto(
				item.idProducto,
					data.Nombre,
					data.Precio,
					data.Stock,
					data.Categoria,
					data.Imagen,
					data.Marca,
					data.Presentacion
			)
			
			return producto

		} else { //<-- No hay ningún Object (No sirve nada...)
			return null
		}

	}
}