
//Comprobar elementos en localStorage
function obtenerObjetosLocalStorage() {
	let productoLS;

	//console.log(localStorage.getItem('objeto'));
    //comprobar si hay algo en localSotrage
    if(localStorage.getItem('objeto')===null || localStorage.getItem('objeto')==''){
    	productoLS = [];
    }else{

    	productoLS = JSON.parse(localStorage.getItem('objeto'));
    }

   // console.log(productoLS);
    return productoLS;
}

function guardarObjetoLocalStorage(producto){

	console.log('entro a guardar ');
	let productos;

	productos = obtenerObjetosLocalStorage();
	productos.push(producto);

    //curso seleccionado se agrega al arreglo vacio o al final de los elementos existentes
    
    localStorage.setItem('objeto', JSON.stringify(productos));

   // console.log(JSON.parse(localStorage.getItem('carrito')));



}



function leerLocalStorage2() {
	console.log('entro leer ');
	let productoLS;

	productoLS = obtenerObjetosLocalStorage();
	var html ='';

	var contador=productoLS.length;
	var suma=0;
	var cont=0;
	var html="";
	var i=0;
	//console.log('contador'+contador);
	if(contador>0) {


	productoLS.forEach(function (producto){
        //construir template

      		
	//if (respuesta.length>0) {
	//	for (var i = 0; i <respuesta.length; i++) {
	html+=`
			<div class="col-100 medium-33 large-50 elemento"  style="    margin-top: 1em;
    margin-bottom: 1em;" id="elemento_`+i+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-30 alert-danger text-color-red rounded-circle">
		    <i class="bi bi-person-circle"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    
	    <p style="padding:.5em;">`+producto.v_nombretu+` `+producto.v_paternotu+` `+producto.v_maternotu+`</p>
	    </div>

	  
	    <div class="col-auto" style="text-align: right;">
	    <span class="" style="float: left;padding: .5em;" onclick="EditarObjeto(`+i+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarObjeto(`+i+`);"><i class="bi-x-circle-fill"></i></span>
	    	</div>

	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
		
	

		i++;
	

	});


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
	    <p>No tienes tutorados registrados</p>
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
	$(".listado2").html(html);
	//$("#lista-objeto").html(html);

}

function leerLocalStorage() {
	console.log('entro leer ');
	let productoLS;

	productoLS = obtenerObjetosLocalStorage();
	var html ='';

	var contador=productoLS.length;
	var suma=0;
	var cont=0;
	var html="";
	var i=0;
	//console.log('contador'+contador);
	if(contador>0) {


	productoLS.forEach(function (producto){
        //construir template

      		
	//if (respuesta.length>0) {
	//	for (var i = 0; i <respuesta.length; i++) {
	html+=`
			<div class="col-100 medium-33 large-50 elemento"  style="    margin-top: 1em;
    margin-bottom: 1em;" id="elemento_`+i+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-30 alert-danger text-color-red rounded-circle">
		    <i class="bi bi-person-circle"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    
	    <p style="padding:.5em;">`+producto.v_nombretu+` `+producto.v_paternotu+` `+producto.v_maternotu+`</p>
	    </div>

	  
	    <div class="col-auto" style="text-align: right;">
	    <span class="" style="float: left;padding: .5em;" onclick="EditarObjeto(`+i+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarObjeto(`+i+`);"><i class="bi-x-circle-fill"></i></span>
	    	</div>

	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
		
	

		i++;
	

	});

	$("#alumnossecundarios").css('display','block');
	$(".mostraralumnos").css('display','block');

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
	    <p>No tienes tutorados registrados</p>
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
	$(".mostraralumnos").css('display','none');

	}
	$(".listado").html(html);


	//$("#lista-objeto").html(html);

}

//Eliminar curso del objeto en el DOM
function EliminarObjeto(idcontador){
   // e.preventDefault();

   let producto, productoId;
  /*  if(e.target.classList.contains('borrar-curso')){
    	alert('aqui');
        producto = e.target.parentElement.parentElement;
        productoId = curso.querySelector('a').getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
    }*/
  app.dialog.confirm('','¿Seguro de eliminar tutorado?', function () {
          
       
    $(".elemento").each(function(){
    	var id=$(this).attr('id');

    	//console.log(id);

    	var elemento=id.split('_');
    	//console.log(elemento[1]);

    	if (idcontador==elemento[1]) {
    		$("#elemento_"+idcontador).remove();
    	}


    });


    eliminarObjetoLocalStorage(idcontador);

   // alerta('','Producto eliminado');

   	productoLS = obtenerObjetosLocalStorage();
	
 
   
     });
}

//Eliminar  por el data-id en el localStorage
function eliminarObjetoLocalStorage(idcontador){
	let productosLS;

	productosLS = obtenerObjetosLocalStorage();
	//console.log('eliminando');
	conta=0;
	productosLS.forEach(function(productoLS, index){
		//console.log('entro al for'+productoLS.idpaquete+'-'+idcontador);
	
		if (conta==idcontador) {

		productosLS.splice(index, 1);

		}


	conta++;
		
	});

	localStorage.setItem('objeto', JSON.stringify(productosLS));
leerLocalStorage();
}

function EditarObjeto(idcontador) {
	let productosLS;

	productosLS = obtenerObjetosLocalStorage();

	let producto;
	var conta=0;
	var encontrado=0;
	productosLS.forEach(function(productoLS, index){
		//console.log('entro al for'+productoLS.idpaquete+'-'+idcontador);
		
		if (conta==idcontador) {

			producto=productoLS;
			encontrado=1;
		}

		conta++;

		if (encontrado==1) {
			return true;
				}
		
		
	});

		if ($(".my-sheet-swipe-to-close1").hasClass('modal-in')) {
			
						MostrarFormTutorado();
						LlenarFormulario(producto,idcontador);
							$$("#btnguadartuto").attr('onclick','GuardarTutorado('+idcontador+')');

		}else{

			$(".my-sheet-swipe-to-close1").remove();
			AbrirModalRegistroTutorados();
			MostrarFormTutorado();
			$$("#btnguadartuto").attr('onclick','GuardarTutorado('+idcontador+')');

			LlenarFormulario(producto,idcontador);
		}
			
				
	
		
	
}

function LlenarFormulario(producto,idcontador) {
	

	$("#v_nombretu").val(producto.v_nombretu);
	$("#v_paternotu").val(producto.v_paternotu);
	$("#v_maternotu").val(producto.v_maternotu);
	$("#v_fechatu").val(producto.v_fechatu);
	$("#v_sexotu").val(producto.v_sexotu);
	$("#v_celulartu").val(producto.v_celulartu);
	$("#v_correotu").val(producto.v_correotu);
	$("#v_idtu").val(idcontador);
	$("#v_idusuario").val(producto.v_idusuario);

	if (producto.inputsoytutor==1) {
		$("#inputtutor").attr('checked',true);
		
	}

	if (producto.inputsincelular==1) {
		$("#inputsincelular").attr('checked',true);

	}
	
	SoyTutor();
	SinCelular();
	ObtenerParentesco(producto.v_parentescotu);

	if (producto.v_idusuario!='') {

				$("#v_nombretu").css('color','gray');
				$("#v_nombretu").css('color','gray');
				$("#v_paternotu").css('color','gray');
				$("#v_maternotu").css('color','gray');
				$("#v_fechatu").css('color','gray');
				$("#v_sexotu").css('color','gray');

				$("#v_nombretu").attr('disabled',true);
				$("#v_paternotu").attr('disabled',true);
				$("#v_maternotu").attr('disabled',true);
				$("#v_fechatu").attr('disabled',true);
				$("#v_sexotu").prop('disabled','disabled');

	}

}

function GuardarEditado(idcontador) {
	let productosLS;

	productosLS = obtenerObjetosLocalStorage();
	//console.log('eliminando');
	let producto;
	conta=0;
	productosLS.forEach(function(productoLS, index){
		//console.log('entro al for'+productoLS.idpaquete+'-'+idcontador);
	
		if (conta==idcontador) {

			producto=productoLS;
			return 0;

		}


	conta++;
		
	});
}