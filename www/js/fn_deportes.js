function Guardardeporte(form,regresar,donde,idmenumodulo)
{		
		var bandera=1;
		var niveles=[];
		var id=$("#id").val();
		var deporte=$("#v_deporte").val();
		var estatus=$("#v_estatus").val();

		$(".chknivel").each(function() {

		   if ($(this).is(':checked')) {
		   		var id=$(this).attr('id');
		   		alert('a'+id);
		   		var dividir=id.split('_')[1];
		  	 	niveles.push(dividir);

		   }

		  });

		if (deporte=='') {
			bandera=0;
		}

		 if (niveles.length==0) {
		 	bandera=0;
		 }
		$("#lblniveles").removeClass('inputrequerido');
		$("#lbldeporte").removeClass('inputrequerido');

	if (bandera==1) {


		if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
		{			

		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
		 var datos="id="+id+"&v_deporte="+deporte+"&v_estatus="+estatus+"&niveles="+niveles;	
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/deportes/ga_deporte.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						var resp = msj.split('|');
						
						   console.log("El resultado de msj es: "+msj);
						 	if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito&idempresas="+resp[1],donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				 	 });				  					  
				},1000);
			}
		 }else{


		 	if (niveles.length==0) {

				$("#lblniveles").addClass('inputrequerido');
		 	}
		 	if (deporte=='') {

				$("#lbldeporte").addClass('inputrequerido');
		 	}


		 }
}


function BorrarDeporte(iddeporte,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='iddeporte='+iddeporte;
	$.ajax({
		url:'catalogos/deportes/borrarDeporte.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	  data: datos, //Le pasamos el objeto que creamos con los archivos
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		  var resp = msj;
		  
			 console.log("El resultado de msj es: "+msj);
			   if( resp == 0 ){
				  aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
				}else{
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=El deporte se encuentra relacionado con al menos un alumno "+msj,donde);
				}			
			}
	});
}
}

function ObtenerNivelesDeporte(iddeporte) {
	var datos="iddeporte="+iddeporte;

	$.ajax({
	  url:'catalogos/deportes/ObtenerNivelesDeporte.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	  data: datos, //Le pasamos el objeto que creamos con los archivos
	  dataType:'json',
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		  var resp = msj.respuesta;
		  	
		  	for (var i = 0; i < resp.length; i++) {
		  		
		  		$("#inputnivel_"+resp[i].idnivel).attr('checked',true);
		  	}
			 			
			}
	});
}