class Pelicula {

	constructor(t, e, d, p, tr){
		this.Titulo = t
		this.Estreno = e
		this.Descripcion = d
		this.Poster = p
		this.Trailer = tr
	}

	Mostrar(){
		//1) Capturar el elemento (y clonarlo)
		let elemento = document.querySelector(".pelicula").cloneNode(true)

		//2) Reemplazar/llenar con los datos de "esta" pelicula

			elemento.querySelector("h4").innerText = this.Titulo
			elemento.querySelector("p").innerText = this.Estreno
			elemento.querySelector("img").src = this.Poster

		//3) Desocultar el elemento clonado
			elemento.classList.remove("hide")

		//4) Anexar el elemento en el contenedor (padre)
		document.querySelector("#peliculas").appendChild(elemento)

		console.log( elemento )
		
	}

}