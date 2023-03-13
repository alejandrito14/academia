function GuardarTutoradoForm(idcontador) {

	$(".linombretu").removeClass('is-invalid');
	$(".lipaternotu").removeClass('is-invalid');
	$(".limaternotu").removeClass('is-invalid');
	$(".lifechanacimientotu").removeClass('is-invalid');
	$(".lisexotu").removeClass('is-invalid');
	$(".licorreotu").removeClass('is-invalid');

	$(".licorreotu").addClass('is-valid');
	$(".linombretu").addClass('is-valid');
	$(".lipaternotu").addClass('is-valid');
	$(".limaternotu").addClass('is-valid');
	$(".lifechanacimientotu").addClass('is-valid');
	$(".lisexotu").addClass('is-valid');
	$("#mensajecorreo").text('');
	var v_nombretu=$("#v_nombretu").val();
	var v_paternotu=$("#v_paternotu").val();
	var v_maternotu=$("#v_maternotu").val();
	var v_fechatu=$("#v_fechatu").val();
	var v_sexotu=$("#v_sexotu").val();
	var v_celulartu=$("#v_celulartu").val();
	var v_correotu=$("#v_correotu").val();
	var v_parentescotu=$("#v_parentescotu").val();
	var id_user=localStorage.getItem('id_user');
	var v_idtu=$("#v_idtu").val();
	var inputtutor=$("#inputtutor").is(':checked')?1:0;
	var inputsincelular=$("#inputsincelular").is(':checked')?1:0;
	var v_idusuario=$("#v_idusuario").val();
	var msj="";
	var bandera=1;
	
	

	if (v_nombretu=='') {
		nombre='Campo requerido';
		bandera=0;
	}

	if (v_paternotu=='') {
		paterno='Campo requerido';
		bandera=0;
	}

	
	

		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

		}

		if (v_parentescotu==0 || v_parentescotu=='') {
		parentesco='Campo requerido';
			bandera=0;

			
		}

		if (isValidDate(v_fechatu)==false) {
			bandera=0;
		}

	

	if (bandera==1) {

		
VerificarexisteCorreoTutorado(v_correotu,v_idtu).then(r => {
        //var existe=r.existe;

  if (r==0) {

  

	var datos="v_idtu="+v_idtu+"&v_nombretu="+v_nombretu+"&v_paternotu="+v_paternotu+"&v_maternotu="+v_maternotu+"&v_fechatu="+v_fechatu+"&v_sexotu="+v_sexotu+"&v_celulartu="+v_celulartu+"&v_correotu="+v_correotu+"&id_user="+id_user+"&v_parentescotu="+v_parentescotu+"&inputtutor="+inputtutor+"&inputsincelular="+inputsincelular+"&v_idusuario="+v_idusuario;
	var pagina = "registrotutorado.php";
	
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
		
			alerta('','Registro guardado correctamente');

		var registro=localStorage.getItem('registro');
			if (registro==1) {
				GoToPage('registrotutorados');
			}else{

				GoToPage('registroasociados');
			}

			

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

	}else{

		if (v_nombretu=='') {
			nombre='Campo requerido';
			$("#lblnombre").html(nombre);

			bandera=0;

			$(".linombretu").addClass('is-invalid');
			$(".linombretu").removeClass('is-valid');


		}

		

		if (v_paternotu=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);

			bandera=0;
			$(".lipaternotu").addClass('is-invalid');
			$(".lipaternotu").removeClass('is-valid');
		}

		if (v_maternotu=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);

			bandera=0;
			$(".limaternotu").addClass('is-invalid');
			$(".limaternotu").removeClass('is-valid');
		}


		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

			$(".lisexotu").addClass('is-invalid');
			$(".lisexotu").removeClass('is-valid');
		}

		if (v_parentescotu==0 || v_parentescotu==null) {
		parentesco='Campo requerido';
			bandera=0;

			$(".liparentescotu").addClass('is-invalid');
			$(".liparentescotu").removeClass('is-valid');
		}



		if (isValidDate(v_fechatu)==false) {
			bandera=0;

			$(".lifechanacimientotu").addClass('is-invalid');
			$(".lifechanacimientotu").removeClass('is-valid');
		}



		if (v_correotu!='') {

		if (validarEmail(v_correotu)==true) {
			
			var obtener=VerificarexisteCorreo(v_correotu,mycallback);
			console.log('verifi'+respuestafuncion);

			if (respuestafuncion==1) {
				
			$(".licorreotu").addClass('is-invalid');
			$(".licorreotu").removeClass('is-valid');
			mensaje="El correo ya se encuentra registrado";
			$("#mensajecorreo").text(mensaje);


		
			}
			
		}else{


			bandera=0;
		}
	}



			if (bandera==0) {

				alerta('','Te falta por capturar una opción obligatoria');
			}


	}



	});

		
	}else{

		if (v_nombretu=='') {
			nombre='Campo requerido';
			$("#lblnombre").html(nombre);

			bandera=0;

			$(".linombretu").addClass('is-invalid');
			$(".linombretu").removeClass('is-valid');


		}

		

		if (v_paternotu=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);

			bandera=0;
			$(".lipaternotu").addClass('is-invalid');
			$(".lipaternotu").removeClass('is-valid');
		}

		if (v_maternotu=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);

			bandera=0;
			$(".limaternotu").addClass('is-invalid');
			$(".limaternotu").removeClass('is-valid');
		}


		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

			$(".lisexotu").addClass('is-invalid');
			$(".lisexotu").removeClass('is-valid');
		}

		if (v_parentescotu==0 || v_parentescotu==null) {
		parentesco='Campo requerido';
			bandera=0;

			$(".liparentescotu").addClass('is-invalid');
			$(".liparentescotu").removeClass('is-valid');
		}



		if (isValidDate(v_fechatu)==false) {
			bandera=0;

			$(".lifechanacimientotu").addClass('is-invalid');
			$(".lifechanacimientotu").removeClass('is-valid');
		}



		if (v_correotu!='') {

		if (validarEmail(v_correotu)==true) {
			
			var obtener=VerificarexisteCorreo(v_correotu,mycallback);
			console.log('verifi'+respuestafuncion);

			if (respuestafuncion==1) {
				
			$(".licorreotu").addClass('is-invalid');
			$(".licorreotu").removeClass('is-valid');
			mensaje="El correo ya se encuentra registrado";
			$("#mensajecorreo").text(mensaje);


		
			}
			
		}else{


			bandera=0;
		}
	}



			if (bandera==0) {

				alerta('','Te falta por capturar una opción obligatoria');
			}


	}

}

function ObtenerAsociados() {
		var id_user=localStorage.getItem('id_user')
		var pagina = "ObtenerAsociados.php";
		var datos="id_user="+id_user;
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			PintarAsociados(datos.respuesta);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}



function ObtenerTutorados() {
		var id_user=localStorage.getItem('id_user')
		var pagina = "ObtenerTutorados.php";
		var datos="id_user="+id_user;
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			PintarTutorados(datos.respuesta);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarTutorados(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`
			<div class="col-100 medium-33 large-50 elemento" style="    margin-top: 1em;
    margin-bottom: 1em;" id="elemento_`+respuesta[i].idusuario+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-40 alert-danger text-color-red rounded-circle">
		    <i class="bi bi-person-circle"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    <p class="small text-muted no-margin-bottom">
	    </p>
	    <p>`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</p>`;
	   var asociado=0;
	    if (respuesta[i].celular!='' && respuesta[i].celular!=undefined) {
	    	html+=`<p>`+respuesta[i].celular+`</p>`;
	  	    asociado=1;

	    }
	   
	   html+=`</div>

	     <div class="col-auto" style="text-align: right;">
	   	    <span class="" style="float: left;padding: .5em;" onclick="EditarTutorado(`+respuesta[i].idusuarios+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarTutorado(`+respuesta[i].idusuarios+`,`+asociado+`);"><i class="bi-x-circle-fill"></i></span>
	    			</div>
	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
		}
	}else{

		html+=`
			<div class="col-100 medium-33 large-50" style="    margin-top: 1em;
    margin-bottom: 1em;"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-40 alert-danger text-color-red rounded-circle">
		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    <p class="small text-muted no-margin-bottom">
	    </p>
	    <p>No tienes asociados registrados</p>
	    </div><div class="col-auto text-align-right">
	    <p class="small text-muted no-margin-bottom"></p>
	    	<p class="small"></p></div>
	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;

	}


	$(".listado").html(html);
}


function PintarAsociados(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`
			<div class="col-100 medium-33 large-50 elemento" style="    margin-top: 1em;
    margin-bottom: 1em;" id="elemento_`+respuesta[i].idusuario+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-40 alert-danger text-color-red rounded-circle">
		    <i class="bi bi-person-circle"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    <p class="small text-muted no-margin-bottom">
	    </p>
	    <p>`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</p>`;
	    var asociado=0;
	    if (respuesta[i].celular!='' && respuesta[i].celular!=undefined) {
	    	html+=`<p>`+respuesta[i].celular+`</p>`;
	   	asociado=1;
	    }
	   
	   html+=`</div>

	     <div class="col-auto" style="text-align: right;">
	   	    <span class="" style="float: left;padding: .5em;" onclick="EditarAsociado(`+respuesta[i].idusuarios+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarTutorado(`+respuesta[i].idusuarios+`,`+asociado+`);"><i class="bi-x-circle-fill"></i></span>
	    			</div>
	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
		}
	}else{

		html+=`
			<div class="col-100 medium-33 large-50" style="    margin-top: 1em;
    margin-bottom: 1em;"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-40 alert-danger text-color-red rounded-circle">
		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    <p class="small text-muted no-margin-bottom">
	    </p>
	    <p>No tienes asociados registrados</p>
	    </div><div class="col-auto text-align-right">
	    <p class="small text-muted no-margin-bottom"></p>
	    	<p class="small"></p></div>
	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;

	}


	$(".listado").html(html);
}
function EditarTutorado(idusuario) {

localStorage.setItem('idtutorado',idusuario)
GoToPage('nuevotutorado');

}

function EditarAsociado(idusuario) {

localStorage.setItem('idtutorado',idusuario)
GoToPage('nuevoasociado');

}

function Obtenerdatostutorado(idusuario) {
	var pagina = "ObtenerdatospersonalesTutorado.php";
	var iduser=idusuario;
	var datos="id_user="+iduser;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarDatosRegistroTutorado(datos.respuesta);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

}

function PintarDatosRegistroTutorado(respuesta) {
	$$(".lifechanacimientotu").css('display','block');

	$("#v_idtu").val(respuesta.idusuarios);
	$("#v_nombretu").val(respuesta.nombre);
	$("#v_paternotu").val(respuesta.paterno);
	$("#v_maternotu").val(respuesta.materno);
	$("#v_fechatu").val(respuesta.fechanacimiento);
	$("#v_sexotu").val(respuesta.sexo);
	$("#v_parentescotu").val(respuesta.idparentesco);
	$("#v_celulartu").val(respuesta.celular);
	$("#v_correotu").val(respuesta.usuario);
if (respuesta.sututor==1) {
		$("#inputtutor").prop('checked',true);
	}

	if (respuesta.sincel==1) {
		$("#inputsincelular").prop('checked',true);
	}
	//SoyTutor();
	//SinCelular();
	
	localStorage.removeItem('idtutorado');


	$("#v_nombretu").css('color','gray');
	$("#v_nombretu").css('color','gray');
	$("#v_paternotu").css('color','gray');
	$("#v_maternotu").css('color','gray');
	$("#v_fechatu").css('color','gray');
	$("#v_sexotu").css('color','gray');
	$("#v_celulartu").css('color','gray');

	$("#v_celulartu").attr('disabled',true);
	$("#v_nombretu").attr('disabled',true);
	$("#v_paternotu").attr('disabled',true);
	$("#v_maternotu").attr('disabled',true);
	$("#v_fechatu").attr('disabled',true);
	$("#v_sexotu").prop('disabled','disabled');
	$(".input-clear-button").css('display','none');

	$(".linombretu").addClass('item-input-with-value');
	$(".lipaternotu").addClass('item-input-with-value');
	$(".limaternotu").addClass('item-input-with-value');
	$(".lifechanacimientotu").addClass('item-input-with-value');
	$(".licelulartu").addClass('item-input-with-value');

	  ObtenerParentesco(respuesta.idparentesco);

}
function EliminarTutorado(idusuario,tipo) {
	if (tipo==1) {
		asociado="asociado";
	}else{
		asociado="tutorado";
	}
	app.dialog.confirm('','¿Seguro de eliminar '+asociado+'?', function () {
       
	    $(".elemento").each(function(){
	    	var id=$(this).attr('id');
	    	var elemento=id.split('_');
	    	if (idusuario==elemento[1]) {
	    		$("#elemento_"+idcontador).remove();
	    	}
	    });
	    var pagina="EliminarTutorado.php";
	    var datos='idtutorado='+idusuario;
	    $.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			if (datos.respuesta==1) {

				 var registro=localStorage.getItem('registro');
     		 if (registro==1) {
				ObtenerTutorados();

				}else{
					ObtenerAsociados();

				}
				
			}
			if (datos.respuesta==2) {

				alerta('','Registro ya se encuentra relacionado');
			}
			


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});


	});
}
/*function CargarSelecttutorados() {
	alert('a');
	var pagina = "ObtenerTutoradosSincel.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(res){
			var respuesta=res.respuesta;

			if (respuesta.length>0) {
				PintarSelecttutorados(respuesta);
				}

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}*/

function VerificarSiExisteTuTorados() {
	var pagina = "ObtenerTutoradosSincel.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(res){
			var respuesta=res.respuesta;
			
			if (respuesta.length>0) {
				$(".divserviciostutorados").css('display','block');
				PintarSelecttutorados(respuesta);
			}else{
				$(".divserviciostutorados").css('display','none');

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



function PintarSelecttutorados(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i =0; i < respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt="" />';
				}else{


				if (respuesta[i].sexo=='M') {

					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
	
				}else{
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
		
				}

					imagen='<img src="'+urlimagen+'" alt=""  />';
				}

			html+=`

			<div class="col-100" style="margin-left: 1em;
    margin-right: 1em;">
                <div class="card margin-bottom">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-auto">
                                <figure class="avatar avatar-60 rounded-10">
                                    `+imagen+`
                                </figure>
                            </div>
                            <div class="col no-padding-horizontal align-self-center">
                                <h3 class="no-margin-bottom text-color-theme">`+respuesta[i].nombre+' '+respuesta[i].paterno+` `+respuesta[i].materno+`</h3>
                            	<p class="no-margin-bottom text-color-theme">`+respuesta[i].parentesco+`</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-content card-content-padding">
                        <p class="text-muted margin-bottom">
                           
                        </p>
                        <div class="row">
                            <div class="col" style="justify-content: center;display: flex;align-items: center;">
                                <a onclick="InformacionTutorado(`+respuesta[i].idusuarios+`,1)" class="button button-fill button-44 color-theme button-raised" style="width:60px;">
                                        <i class="bi bi-calendar-check" style="margin-right: 2px;"></i>
                                    </a>`;
 							if (respuesta[i].contadorasignados>0) {

 				               html+=`<span class="numeros  numero2" id="">`+respuesta[i].contadorasignados+`</span>`;
				
 							}
  							/* asignados*/
                           html+= `</div>

                            <div class="col" style="justify-content: center;display: flex;align-items: center;">
                                <a onclick="InformacionTutorado(`+respuesta[i].idusuarios+`,2)" class="button button-fill button-44 color-theme button-raised" style="width:60px;">
                                        <i class="bi bi-card-checklist" style="margin-right: 2px;"></i>
                                    </a>`;
                                    if (respuesta[i].contadorasignadospendientes>0) {
                                    html+=`  <span class="numeros  numero2" id="">`+respuesta[i].contadorasignadospendientes+`</span>`;
      	
                                    }
                                /* pendientes*/

                           html+=` </div>
                            	<div class="col" style="justify-content: center;display: flex;align-items: center;">
                                	<a onclick="InformacionTutorado(`+respuesta[i].idusuarios+`,3)" class="button button-fill button-44 color-theme button-raised" style="width:60px;">
                                        <i class="bi bi-card-heading" style="margin-right: 2px;"></i>
                                    </a>`;

                                    if (respuesta[i].contadorActivos>0) {
                             html+=`<span class="numeros  numero2" id="">`+respuesta[i].contadorActivos+`</span>`;
      	
                                    }
                                      
                         html+=`</div>

                         </div>

                         <div class="row">
                            <div class="col-100" style="justify-content: center;display: flex;align-items: center;    margin-top: 1em;margin-left: 0.6em;margin-right: 0.6em;">`;
                                html+=`<a onclick="Tutoradochat(`+respuesta[i].idusuarios+`)" class="button button-fill button-44 color-theme button-raised" style="width:100%;">
                                        <i class="bi bi-chat-text" style="margin-right: 2px;"></i>`;
                                	if (respuesta[i].cantidadchat>0) {
                                 html+=`

                               <span class="numeros  numero2" id="">`+respuesta[i].cantidadchat+`</span>

                                   	   `; 

                                   	}


                           html+=`</a> </div>
                        </div>
                    </div>
                </div>
            </div>

						`;

		}
	}

	$(".listatutorados").html(html);
}

function InformacionTutorado(idusertutorado,filtro) {
	var idusuarioresp=localStorage.getItem('id_user');
	localStorage.setItem('iduserrespaldo',idusuarioresp);
	localStorage.setItem('idusuertutorado',idusertutorado);
	localStorage.setItem('id_user',idusertutorado);
	localStorage.setItem('filtrotuto',filtro);
	GoToPage('listadotutoservicios');

}






function Tutoradochat(idusertutorado) {

	var idusuarioresp=localStorage.getItem('id_user');
	localStorage.setItem('iduserrespaldo',idusuarioresp);
	localStorage.setItem('idusuertutorado',idusertutorado);
	localStorage.setItem('id_user',idusertutorado);
	GoToPage('chattutorado');
}

function ObtenerServiciosTutorado() {
		var idusuario=localStorage.getItem('idusuertutorado');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerServiciosAsignados.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var fechaactual=datos.fechaactual;
			
			PintarServiciosTutorado(respuesta,fechaactual);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}


function PintarServiciosTutorado(respuesta,fechaactual) {
	
		var html="";

	if (respuesta.length>0) {
		var contadorpasado=0;
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}



			if (respuesta[i].porpasar==0 && contadorpasado==0) {


				html+=`<div class="row">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}
			var clasecomentario="vacio";
			var clasechat="vacio";
			var clasecalificacion="vacio";
			if (respuesta[i].concalificacion==1){
				clasecalificacion="convalor";
			}
			if (respuesta[i].conchat==1){
				clasechat="convalor";
			}
			if (respuesta[i].concomentarios==1) {
				clasecomentario="convalor";
			}


			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
                <div class="row">
                  <div class="col-100" style="padding:0;" >
                    <div class="" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+imagen+`
                      
                    </div>
                  </div>
                  </div>
                  <div class="row" style="height:10em;">
                  <div class="col-100" >
                   <div class="row" style="margin-top:.5em;">
                    `;
                  //  horarios=respuesta[i].horarios;
                    	var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span style="color:black;font-size:18px;">`+respuesta[i].fechaproxima+` </span><br><span style="margin-top:.5em;font-size:16px;">`+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span>`;
                    		}
                    	//}

                    html+=`
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+horarioshtml+`</span>
                     <span class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].zonanombre+`</span>

 					<span class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].titulo+`</span>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >`;


                  	html+=`<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasecomentario+`" onclick="OpinionesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-square-dots"></i></div>`;
                    html+=`	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasechat+`" onclick="ParticipantesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-left-quote-fill"></i></div>`;
                  	html+=`	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasecalificacion+`" onclick="AbirCalificarServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-star"></i></div>`;


                  	html+=`</div>
                  
                                  

                  </div>

               	</div>
                  
                </div>
              </div>
              </div>
              </div>

			`;




		}

		$$(".serviciosasignados").html(html);
	}else{


		html+=`
			 <div class="list-item">
                <div class="row text-color-theme">
                  <h4 style="text-align:center;">Por el momento no se encuentran servicios asignados al usuario seleccionado</h4>
                </div>
              </div>


		`;

				$$(".serviciosasignados").html(html);

	}
}

function ObtenerDatosDependencia() {
	var idusuario=localStorage.getItem('id_user');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerDependenciaUsuario.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			Pintardependencia(datos);

			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function Pintardependencia(datos) {
	var html="";
	var depende=datos.depende[0];

	html+=`
	<h2>Te encuentras asociado con <span style="color: #0abe68;"> `+depende.nombre+` `+depende.paterno+` `+depende.materno+` </span></h2>` ;
	
	$("#divdependencia").html(html);
}

function DesasociarUsuario() {
		app.dialog.confirm('','¿Seguro de realizar la acción?', function () {

	var idusuario=localStorage.getItem('id_user');
	var datos="idusuario="+idusuario;
	var pagina = "DesasociarUsuario.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resul){

			console.log(resul);

			if (resul.respuesta==1) {
				alerta('','Se realizó acción correctamente');
				GoToPage('profile');
			}else{
				
			alerta('','Lo sentimos,para la desasociacion debe cubrir los pagos faltantes');

			}
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	});
}

function ObtenerMisServicioTutorado() {
	var idusuertutorado=localStorage.getItem('idusuertutorado');
	var datos="idusuertutorado="+idusuertutorado;
	var pagina = "ObtenerMisServicioTutorado.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){

			if (resp.respuesta.length>0) {
				$(".divbtnservicios").css('display','block');
				$(".numeroservicios").html(resp.respuesta.length);

				}else{

				$(".divbtnservicios").css('display','none');

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
function ObtenerMispendientesTutorado() {
	var idusuertutorado=localStorage.getItem('idusuertutorado');
	var datos="idusuertutorado="+idusuertutorado;
	var pagina = "ObtenerMispendientesTutorado.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){

			if (resp.respuesta.length>0) {
				$(".serviciospendientes").css('display','block');
				$(".numeropendientes").html(resp.respuesta.length);

				}else{

				$(".serviciospendientes").css('display','none');

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

function ObtenerServiciosAbiertoTutorado() {
	var idusuertutorado=localStorage.getItem('idusuertutorado');
	var datos="idusuertutorado="+idusuertutorado;
	var pagina = "ObtenerServiciosActivoTutorado.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){

			if (resp.respuesta.length>0) {
				$(".divserviciosactivos").css('display','block');
				$("#numeroabiertos").html(resp.respuesta.length);
				$(".numeroabiertos").html(resp.respuesta.length);

			}else{
				$(".divserviciosactivos").css('display','none');

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

function ObtenerInformacionTutorado() {
	var idusuertutorado=localStorage.getItem('idusuertutorado');
	var datos="id_user="+idusuertutorado;
	var pagina = "Obtenerdatospersonales.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){
			var datostutorado=resp.respuesta;
			$(".titlenombre").text(datostutorado.nombre+' '+datostutorado.paterno);
			
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function ObtenerServiciosAsignadospendientesTutorado() {
	var idusuario=localStorage.getItem('idusuertutorado');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerServiciosAsignadosPendientes.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var fechaactual=datos.fechaactual;
			console.log(datos);
			PintarServiciosAsignados3(respuesta,fechaactual);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}


function PantallaRechazarTerminosTutorado() {
	 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Motivo:</label>
                	<textarea name="" id="txtcomentariorechazo" cols="30" rows="3"></textarea>
               	<span class="mensajemotivo"></span>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Rechazar servicio',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Aceptar',
            },
            
          ],

           onClick: function (dialog, index) {
            if(index === 0){
             
          }
          else if(index === 1){
               RechazarTerminosTutorado();

            }

        },
          verticalButtons: false,
        }).open();
	
}

function RechazarTerminosTutorado() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "RechazarTerminos.php";
	var id_user=localStorage.getItem('idusuertutorado');
	var motivo=$("#txtcomentariorechazo").val();
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios+"&motivocancelacion="+motivo;

	if (motivo!='' && motivo.length>=10) {
			app.dialog.close();
			CrearModalEsperaDialog();

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			if (datos.respuesta==1) {

				 $(".mensajeproceso").css('display','none');
        		 $(".mensajeerror").css('display','none');
         		 $(".mensajeexito").css('display','block');
         		 $(".botonok").css('display','block');
			
				//alerta('','Operación realizada');
				GoToPage('listadotutoservicios');
			}
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					$(".mensajeproceso").css('display','none');
                    $(".mensajeerror").css('display','block');
                    $(".mensajeexito").css('display','none');
                    $(".botonok").css('display','block');
			}

		});
	}else{

		alerta('','Para continuar coloque un motivo de rechazo, cantidad mínima de 10 caracteres');
	}
}


function AceptarTerminosTutorado() {
	 app.dialog.confirm('','¿Está seguro  de aceptar el servicio?' , function () {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "AceptarTerminos.php";
	var id_user=localStorage.getItem('idusuertutorado');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	CrearModalEsperaDialog();


	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){


         $(".mensajeproceso").css('display','none');
         $(".mensajeerror").css('display','none');
         $(".mensajeexito").css('display','block');
         $(".botonok").css('display','block');

		 
			if (datos.respuesta==1) {
				
				GoToPage('serviciosasignadostutorado');
			}
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					$(".mensajeproceso").css('display','none');
                    $(".mensajeerror").css('display','block');
                    $(".mensajeexito").css('display','none');
                    $(".botonok").css('display','block');
			}

		});
	 });
}

function ObtenerServiciosAsignadosTutorado() {
	var idusuario=localStorage.getItem('idusuertutorado');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerServiciosAsignados.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var fechaactual=datos.fechaactual;
			console.log(datos);
			PintarServiciosAsignados2(respuesta,fechaactual);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function RegresaraHome() {
	var iduser=localStorage.getItem('iduserrespaldo');
	localStorage.setItem('id_user',iduser);
	GoToPage('home');

}

function listadochatstutorado() {
	var id_user=localStorage.getItem('idusuertutorado');

	var datos="idusuario="+id_user;
	var pagina = "ObtenerChatdeServicios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		async:false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;

			PintarChatServicios(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	
}
