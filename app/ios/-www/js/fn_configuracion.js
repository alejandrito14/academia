function GuardarConfiguracion() {
	    var v_tiempocancelacion=$("#v_tiempocancelacion").val();
	    var v_habilitardevolucion=$("#v_habilitardevolucion").is(':checked')?1:0;
	    var v_terminoscondiciones=$("#v_terminoscondiciones").val();
	    var datos="v_tiempocancelacion="+v_tiempocancelacion+"&v_habilitardevolucion="+v_habilitardevolucion+"&v_terminoscondiciones="+v_terminoscondiciones;
		var pagina = "GuardarConfiguracion.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(res){
				
			var respuesta=res.respuesta;
			if (respuesta==1) {
				alerta('','Se guardaron los cambios');
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

function ObtenerdatosFormularioConfiguracion() {
	var pagina = "Obtenerdatosconfi.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){
			var tiempodecancelacion=datos.respuesta.tiempodecancelacion;
			var habilitardevolucion=datos.respuesta.habilitardevolucionmonedero;
			var terminoscondiciones=datos.respuesta.terminoscondiciones;
			
			$("#v_tiempocancelacion").val(tiempodecancelacion);
			$("#v_habilitardevolucion").attr('checked',false);
			if (habilitardevolucion==1) {
				$("#v_habilitardevolucion").attr('checked',true);
			}

			$("#v_terminoscondiciones").val(terminoscondiciones);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}