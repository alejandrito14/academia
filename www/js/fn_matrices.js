function ColocarNumeros() {

	var v_valor1=$("#v_valor1").val();
	var v_valor2=$("#v_valor2").val();
	var html="";
		if (v_valor1>0 && v_valor2>0) {

			for(var i = 1; i <=v_valor2; i++) {

				html+=`<div class="row">`;
				html+=`<div class="col-md-4">`;
					html+=`<select  id="valores_1_`+i+`" class=" form-control valor1 valores_`+i+`" onchange="VerificarValores()">`;
						var v=parseFloat(v_valor2)+parseFloat(v_valor2);
						html+=`<option value="0">SELECCIONAR VALOR</option>`;

						for(var j = 1; j <= v; j++) {
							html+=`<option value="`+j+`">`+j+`</option>`;
						}
					html+=`</select>`;
				html+=`</div>`;

				var v=parseFloat(v_valor2)+parseFloat(v_valor2);
				html+=`<div class="col-md-4">`;
					html+=`<select  id="valores_2_`+i+`" class=" form-control valor2 valores_`+i+`" onchange="VerificarValores()">`;
					html+=`<option value="0">SELECCIONAR VALOR</option>`;

						for(var k = 1; k <= v; k++) {
							html+=`<option value="`+k+`">`+k+`</option>`;
						}
					html+=`</select>`;
				html+=`</div>`;


				html+=`</div>`;
				
			}

			$(".valores").html(html);

		}

}

function VerificarValores() {
	

	var arregloclientes1=[];
	
	$(".valor1").each(function(){

		var valor=$(this).val();
		var id=$(this).attr('id');
		console.log('idcliente: '+valor);
		if (valor>0) {

			const clientes1 = {
				id : id,
				valor : valor,
				
			}
			arregloclientes1.push(clientes1);
		}

	});

	$(".valor2").each(function(){

		var valor=$(this).val();
		var id=$(this).attr('id');

		if (valor>0) {

			const clientes2 = {
				id : id,
				valor : valor,
				
			}
			arregloclientes1.push(clientes2);
		}

	});

	$(".valor1").each(function(){

		var id=$(this).attr('id');

		$("#"+id+" option").each(function(){

			//$(this).prop("disabled",false);
			$(this).attr('disabled',false);

		});

	});


	$(".valor2").each(function(){
		var id=$(this).attr('id');

		$("#"+id+" option").each(function(){
			//$(this).prop("disabled",false);
			$(this).attr('disabled',false);
		});

	});


	



	for (var i =0; i < arregloclientes1.length; i++) {

		var valor1=arregloclientes1[i].valor;
		var id=arregloclientes1[i].id;

		//console.log(arregloclientes1[i]);
		if (valor1>0) {

			//$(".v_clientes1").find("option[value='"+valor1+"']").prop("disabled",true);
			//$(".v_clientes2").find("option[value='"+valor1+"']").prop("disabled",true);

			//$("#"+id).find("option[value='"+valor1+"']").prop("disabled",false);
			$(".valor1").find("option[value='"+valor1+"']").attr('disabled',true);
			$(".valor2").find("option[value='"+valor1+"']").attr('disabled',true);

			$("#"+id).find("option[value='"+valor1+"']").attr('disabled',false);
		}

	}
}

function Guardarmatriz(form,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var nombre =$("#v_nombre").val();
		var estatus=$("#v_estatus").val();
		var id=$("#id").val();
		var v_valor1=$("#v_valor1").val();
		var v_valor2=$("#v_valor2").val();
		var datos = new FormData();
		datos.append('v_nombre',nombre); 
		datos.append('id',id);
		datos.append('v_estatus',estatus);
		datos.append('v_valor1',v_valor1);
		datos.append('v_valor2',v_valor2);

		var valores1=[];
		var valores2=[];
		$(".valor1").each(function( index ) {
		 var valor = $(this).val();
		 valores1.push(valor);
		});

		$(".valor2").each(function( index ) {
		 var valor = $(this).val();
 		 valores2.push(valor);

		});

		datos.append('valores1',valores1);
		datos.append('valores2',valores2);

		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/matrices/ga_matrices.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					contentType: false, //Debe estar en false para que pase el objeto sin procesar
					data: datos, //Le pasamos el objeto que creamos con los archivos
					processData: false, //Debe estar en false para que JQuery no procese los datos a enviar
					cache: false, //Para que˘
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
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }
}

function Borrarmatrices(idmatriz,campo,tabla,valor,regresar,donde,idmenumodulo) {
	
		var datos="idmatriz="+idmatriz;

			var r = confirm("¿SEGURO DE REALIZAR LA ACCIÓN?");
	if (r == true) {


		$.ajax({
					url:'catalogos/matrices/borrarMatrices.php', //Url a donde la enviaremos
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

function ObtenerValoresMatriz(idmatriz) {
	var datos='idmatriz='+idmatriz;
		 $.ajax({
					url:'catalogos/matrices/ObtenerValoresMatriz.php', //Url a donde la enviaremos
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
							console.log(msj);
							
					  	}
				  });	
}