function CargarEspecialistaAdmin() {
	var paqueteid=localStorage.getItem('idpaquete');
	var iduser=localStorage.getItem('id_user');  	
    var datos="idpaquete="+paqueteid+"&iduser="+iduser;

    var pagina = "ObtenerEspecialistaSucursal.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      
      var respuesta=resp.especialista;
      PintarEspecialista(respuesta);
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}