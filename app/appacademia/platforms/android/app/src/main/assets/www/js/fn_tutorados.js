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

			GoToPage('registrotutorados');

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
	    <p>`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</p>
	    </div>

	     <div class="col-auto" style="text-align: right;">
	   	    <span class="" style="float: left;padding: .5em;" onclick="EditarTutorado(`+respuesta[i].idusuarios+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarTutorado(`+respuesta[i].idusuarios+`);"><i class="bi-x-circle-fill"></i></span>
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
	$("#v_idtu").val(respuesta.idusuarios);
	$("#v_nombretu").val(respuesta.nombre);
	$("#v_paternotu").val(respuesta.paterno);
	$("#v_maternotu").val(respuesta.materno);
	$("#v_fechatu").val(respuesta.fechanacimiento);
	$("#v_sexotu").val(respuesta.sexo);
	$("#v_parentescotu").val(respuesta.idparentesco);
	$("#v_celulartu").val(respuesta.celular);
	$("#v_correotu").val(respuesta.usuario);

	localStorage.removeItem('idtutorado');
}
function EliminarTutorado(idusuario) {
	app.dialog.confirm('','¿Seguro de eliminar tutorado?', function () {
       
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
				ObtenerTutorados();
				
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