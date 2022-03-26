const get = function(url){

	return new Promise(function(resolve, reject){

		let ajax = new XMLHttpRequest()
		ajax.open("GET", url)
		ajax.onload = function(){

			this.status == 200 ? resolve(this.response) : this.onerror()

		}
		ajax.onerror = function(){
			reject( this.statusText )
		}
		ajax.send()
	})

}

/* ↓ Modelo Final ↓
get("https://api.myjson.com/bins/1giaf3").then(function(rta){

}).catch(function(error){

})
*/