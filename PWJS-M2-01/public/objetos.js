const crearProducto = (n, s, p, d) => { //<-- Argumentos

	let elProducto = new Object()

	// ↓ Propiedades (Que es...)
	elProducto.nombre = n
	elProducto.stock = s
	elProducto.precio = p
	elProducto.disponible = d

	// ↓ Metodos (Que hace...)
	elProducto.Mostrar = function(){
		window.document.write(`<p>Hay ${this.stock} unidades de ${this.nombre} que valen ARS ${this.precio}</p>`)
	}

	return elProducto
}


///////////////////////////////////////
//Usando variables
let nombre = "Cafe Torrado"
let stock = 600
let precio = 85.65
let disponible = false

//Usando array
let productoUno = ["Jugo de Naranja", 480, 15.45, true]

//Usando objetos
let productoDos = { //<-- Objeto literal
	nombre : "Agua con Gas",
	stock : 100,
	precio : 175.60,
	disponible : true
}

let productoTres = new Object() //<-- Objeto diferido
productoTres.nombre = "Alfajor de Maicena"
productoTres.stock = 150
productoTres.precio = 50.75
productoTres.disponible = false

let productoCuatro = crearProducto("Te Rojo", 900, 74.25, false) //<-- Parametros
let productoCinco = crearProducto("Submarino", 650, 90.50, true)

productoCuatro.Mostrar()
productoCinco.Mostrar()