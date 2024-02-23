
  var watchIDactividades = "";

    function ObtenerPosicionGeo(position) {
        app.dialog.close();
        var coordenada = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' ;
		
         var lonylat = position.coords.latitude+','+position.coords.longitude;

         //alert(lonylat);
		
		  localStorage.setItem("lonylat", lonylat);    //Longitud y latitud.   
		     
	direccion(position.coords.longitude,position.coords.latitude);
		
    }


    var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};

    function IniciarSeguimientoGeo()
     {   	//si se requiere un cierto tiempo agregar un timeout a la funcion whatchposition
	    
	    watchID = navigator.geolocation.watchPosition(ObtenerPosicionGeo, ErrorGeoSeguimiento,geo_options);
	 
	     
	 }




	 	function ErrorGeoSeguimiento(error) {
				var error = 'code: '    + error.code    + '\n' +
							'message: ' + error.message + '\n';
						//alerta('','No se puedo geolocalizar, intente de nuevo');
			}


  function TerminarSeguimientoGeo()
    {
		    navigator.geolocation.clearWatch(watchID);
	}




	function direccion(long,latitude){
		TerminarSeguimientoGeo();
		var claveapi=localStorage.getItem('claveapi');

	var content = document.getElementById("geolocation-test");
	//var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+long+"&key=AIzaSyBI-XaZRFtjHqMRdnUJnRtnkB6yxTVUfTo";
	var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+long+"&key="+claveapi+"";


	$.ajax({
			type: 'GET',
			dataType: 'json',
			url: url,
			crossDomain: true,
			cache: false,
			beforeSend: function() {
	        // setting a timeout
	        app.preloader.show();

    },
    success: function(datos){
    	

    	//alert(JSON.stringify(datos));


    		var jsondatos=JSON.stringify(datos);

    		var estatus=JSON.stringify(datos,['status']);
    		var estado=JSON.parse(estatus);

    	
    		if (estado.status=="OK") {	

    			  Pintardatos(datos);


    		}else{
    			   app.preloader.hide();
    			   alerta('','No se puedo geolocalizar, intente de nuevo');
    		}

    
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

}

	function Pintardatos(jsondatos) {

		var addres=jsondatos.results;

		var direccion=JSON.stringify(addres,['formatted_address']);
		var objetodireccion=JSON.parse(direccion);	

		var format=JSON.stringify(objetodireccion[0]);

		var json=JSON.parse(format);

		var dividir=json.formatted_address;
		var codigo = dividir.split(',');

		var code=codigo[2].substring(0,6);
		
		$(".v_codigopostal").val(code);
		$(".licodigopostal").addClass('item-input-with-value');
		Buscarcodigo();
		app.preloader.hide();

		
	}

