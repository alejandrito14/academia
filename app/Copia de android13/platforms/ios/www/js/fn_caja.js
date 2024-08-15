function VerificarCajaAbierta() {
	 var pagina="verificarCajaAbierta.php";
	$.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    success: function(datos){

    	console.log(datos);

	},error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}

function AbrirCaja() {
	// body...
}