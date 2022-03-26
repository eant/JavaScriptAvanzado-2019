class Producto {
  //Constructor
  constructor(id, n, s, p, i, d = true){
    //Atributos
    this.ID = id
    this.nombre = n
    this.stock = s
    this.precio = p
    this.imagen = i
    this.disponible = d //<-- Por default asigna "true"
    this.vDOM = document.createElement("article") // ← <article></article>
    
    this.state = {
      anexado : false,
      version : 0
    }

  }

  //Propiedades Lectura/Escritura (getters & setters)
  get Precio(){
    return "U$S" + (this.precio * 1.21).toFixed(2)
  }

  set Precio(value){

    if( isNaN(value) != true ){
      this.precio = value
    } else {
      console.error("ERROR: Valor ingresado NO válido")
    }

  }

  set Disponible(value){

    let accion = value ? "habilitar" : "deshabilitar"

    if( confirm(`Desea ${accion} el producto "${this.nombre}"`) )
      this.disponible = value

    this.sincronizar()
  }

  //Metodos de Instancia
  Mostrar(selector){ //← Ej: "#productos-destacados"

    let estilo = this.disponible ? "bg-white text-dark" : "bg-dark text-light"
    let botones = this.disponible ? "btn-danger" : "btn-success"

    // ↓ Manipulacion de Estructura
    this.vDOM.classList.add("col-lg-4", "col-md-6", "mb-4", "producto")// ← <article class="col-lg-4 col-md-6 mb-4s producto"></article>

    this.vDOM.id = `prod-${this.ID}`

    // ↓ Manipulacion de Contenido
    this.vDOM.innerHTML = `<div class="card h-100 ${estilo}">
                            <a href="#">
                              <img class="card-img-top img-fluid" src="${this.imagen}" alt="${this.nombre}">
                            </a>
                            <div class="card-body">
                              <h4 class="card-title">
                                <a href="#">${this.nombre}</a>
                              </h4>
                              <button class="btn btn-warning btn-precio m-0">${this.Precio}</button>
                              
                              <button class="btn ${botones} btn-disponible">${ this.disponible ? "Desactivar" : "Activar" }</button>

                              <button class="btn btn-primary btn-descuento">Aplicar Descuento</button>

                              <p class="card-text">${this.stock} unid.</p>
                            </div>
                           </div>`
    
    // ↓ Manipulacion de Comportamiento
    this.vDOM.querySelector(".btn-disponible").onclick = (e) => {
      this.Disponible = !this.disponible

      this.Mostrar()
      
      console.log( this ) //<-- El objeto padre
      console.log( e.target ) //<-- El objeto que provoco el evento
    }

    this.vDOM.querySelector(".btn-precio").onclick = () => {
      this.Precio = prompt(`Por favor, indique cual es el nuevo precio del art. ${this.nombre}`)
      this.Mostrar()
      this.sincronizar()
    }

    this.vDOM.querySelector(".btn-descuento").onclick = this.aplicarDescuento.bind(this)

    this.vDOM.querySelector("img").onclick = () => {
      this.imagen = prompt("Ingrese la URL de una nueva imagen:")
      this.Mostrar()
      this.sincronizar()
    }

    // ↓ Anexarlo (mostrarlo) en la interfaz...
    if( !this.state.anexado ){
      document.querySelector(selector).appendChild( this.vDOM )
      this.state.anexado = true
    }

  }

  aplicarDescuento(valor = false){

    valor = isNaN(valor) ? prompt(`Indique el % de descuento para ${this.nombre}`) : valor
    
    let importe = (this.precio * valor) / 100
    this.precio = this.precio - importe

    this.Mostrar()
    this.sincronizar()
  }

  sincronizar(){
    //¿como?
    let storage = JSON.parse( localStorage.getItem("PRODUCTOS") ) //<-- de JSON a Object

    //let foundItem = storage.find(item => item.idProducto == this.ID)
    let foundIndex = storage.findIndex(item => item.idProducto == this.ID)

    //storage[foundIndex]. //<-- { idProducto:???,Nombre:"???",Precio:???,Marca:"???",Categoria:"???",Presentacion:"???",Stock:???,Imagen:"???",Disponible:???}

    storage[foundIndex].Precio = this.precio
    storage[foundIndex].Imagen = this.imagen
    storage[foundIndex].Disponible = this.disponible

    console.log( storage[foundIndex] )

    localStorage.setItem("PRODUCTOS", JSON.stringify(storage) ) //<-- de Object a JSON

  }

  //Metodos de Clase (estáticos)
  static parse(json){ //<-- Ej: '[{"nombre":"Café Torrado","stock":600,"precio":85.65,"disponible":false},{"nombre":"Jugo de Naranja","stock":450,"precio":15.45,"disponible":true}]'
    //Acá hay que h acer magia para que se conviertan en objetos 'Producto'
    //let datos = JSON.parse(json) //<-- de JSON a Object
    //let datos = json //<-- de JSON a Object

    let datos = (typeof json == "string") ? JSON.parse(json) : json

    if( datos instanceof Array ){

      //1) Recorrer el Array de Object para instanciar objetos Producto y retornarlos
      return datos.map(item => new Producto(item.idProducto, item.Nombre, item.Stock, item.Precio, item.Imagen, item.Disponible) ) //2) <-- Instanciar un objeto Producto con los datos de cada Object

    } else if( datos instanceof Object ){

      return new Producto(datos.idProducto, datos.Nombre, datos.Stock, datos.Precio, datos.Imagen, datos.Disponible)

    } else {
      console.error("Ya fue... no convierto nada en Producto")
    }

  }
}









