//ES5
//var nombre = "Julian Solo"
window.nombre = window.prompt("Ingrese su nombre")

//ES6
let email = window.prompt("Ingrese su e-mail")
const hoy = window.prompt("Ingrese la fecha de Hoy")

console.log(nombre)
console.log(email)
console.log(hoy)

/////////////////////////////

//ES5
//function saludar(){
//	alert("Hola, soy " + nombre + "... gracias por venir!")
//}

//window.saludar = function(){
//	window.alert("Hola, soy " + window.nombre + "... gracias por venir!")
//}

//ES6
const saludar = () => { //<-- Arrow Function
	window.alert(`Hola, mi correo es ${email}... escribanme!`)
}

/////////////////////////////
//ES5
window.document.querySelector("h1").onclick = saludar

//ES6
window.document.querySelector("h2").onclick = function(){
	
	console.log("El objeto this es...")
	console.log(this)

	this.style.backgroundColor = "red"
}









