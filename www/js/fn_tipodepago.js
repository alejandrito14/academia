function habilitarstripe() {

	if($("#constripe").is(':checked')){

		$("#constripe").val(1);
		$(".publica").css('display','block');
		$(".privada").css('display','block');

	}else{
		$("#constripe").val(0);

		$(".publica").css('display','none');
		$(".privada").css('display','none');

	}
}

function Habilitarfoto() {
	if($("#confoto").is(':checked')){
		$("#confoto").val(1);
			$(".cuenta").css('display','block');

	}else{
		$("#confoto").val(0);
		$(".cuenta").css('display','none');

	}
}

function Habilitarparafactura() {
	if($("#chkparafactura").is(':checked')){
		$("#chkparafactura").val(1);

	}else{
		$("#chkparafactura").val(0);

	}
}


function Guardartipopago(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var datos = ObtenerDatosFormulario(form);

		var tiposervicio=[];
		$(".tiposervicios").each(function( index ) {
			var idtiposervicio=$(this).val();
			tiposervicio.push(idtiposervicio);

		});

		datos+='&idtiposervicio='+tiposervicio;

		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/tipodepagos/ga_tipodepagos.php', //Url a donde la enviaremos
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

}

function habilitarmonto() {
	if($("#habilitarcampomonto").is(':checked')){

		$("#habilitarcampomonto").val(1);

	}else{

		$("#habilitarcampomonto").val(0);
	}
}

function habilitarmontofactura() {

	if($("#habilitarcampomontofactura").is(':checked')){

		$("#habilitarcampomontofactura").val(1);

	}else{

		$("#habilitarcampomontofactura").val(0);
	}
}


function AgregarTipopago(){

		contadortipo=parseFloat($(".tipoincluye").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadortipo);
		var htmls="";
		var html="";
		CargarTipoServicios().then(r => {
								 	
          		if (r.length>0) {
													
					htmls+=`<option value="0">SELECCIONAR TIPO DE SERVICIO</option>`;
					for (var i = 0; i <r.length; i++) {								
						htmls+=`<option value="`+r[i].idcategorias+`">`+r[i].titulo+`</option>`;
					}

				}
       		

			 html=`
					<div class="row tipoincluye" id="contadort`+contadortipo+`">
										<div class="col-md-3">
									<label>TIPO DE SERVICIO:</label>	

									<select class="form-control tiposervicios" name="selecttiposervicio_" id="selecttiposervicio_`+contadortipo+`" tabindex="`+tabindex+`">`;
										html+=htmls;

									html+=`</select>
									</div>
					
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpciontipo(`+contadortipo+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;

	
	$("#tiposervicios").append(html);
	});
	//CargarServicios();

}


function Desplegartiposerviciotipo() {
	
	if ($("#v_tiposervicio").is(':checked')) {
		$(".divtiposervicio").css('display','block');	
		$("#v_tiposervicio").val(1);
		
		}else{

		$(".divtiposervicio").css('display','none');	
		$("#v_tiposervicio").val(0);
	}
}

function ObtenerCategoriasTipo(idtipodepago) {
			var datos="idtipodepago="+idtipodepago;

	 			$.ajax({
					url:'catalogos/tipodepagos/ObtenerCategoriasTipo.php', //Url a donde la enviaremos
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
								var resp=msj.respuesta;

								PintarCategoriasTipopago(resp);	
					  	
					  	}
				  });
}

function PintarCategoriasTipopago(respuesta) {
	if (respuesta.length>0) {
		
		for (var i = 0; i < respuesta.length; i++) {
			
			AgregarTipopago();

			var tipo=respuesta[i].idcategorias;
						alert(tipo);

			$("#selecttiposervicio_"+i).val(tipo);
		}
	}
}
