$(document).ready(function () {

 $('#v_subsubcategorias').SumoSelect();

$('#v_categoriapadre').SumoSelect();
$("#v_subcategorias").SumoSelect();

$("#v_tiposervicios2").change(function(){
		CargarCoachestiposervicios();	
		CargarSubsubcategorias();

	});


 $("#v_categoriapadre").change(function(){
		CargarSubCategorias();	
		

	});

 $("#v_subcategorias").change(function(){
 	
		CargarSubsubcategorias2();	
		

	});


});
 

function CargarSucursales()
{
	
	$.ajax({
		type:'GET',
		url: 'catalogos/reportesanteriores/li_sucursales.php',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_idsucursales').html(msj);   
			}
		}); 
}


function CargarCoaches()
{
	
	$.ajax({
		type:'POST',
		url: 'catalogos/reportesanteriores/li_coaches.php',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_coaches').html(msj);   
			$('#v_coaches').SumoSelect().sumo.reload();

			}
		}); 
}

function CargarCoachestiposervicios() {
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var datos="v_tiposervicios2="+v_tiposervicios2;
	$.ajax({
		type:'POST',
		url: 'catalogos/reportesanteriores/li_coachestiposervicios.php',
		cache:false,
		async:false,
		data:datos,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_coaches').html(msj);   
			$('#v_coaches').SumoSelect().sumo.reload();

			}
		}); 
}

function CargarFiltrosreportesAnte(idreporte) {

	if (idreporte>0) {
	var datos="idreporte="+idreporte;

	$.ajax({
		type:'POST',
		url: 'catalogos/reportesanteriores/Obtenerfiltrosreporte.php',
		data:datos,
		dataType:'json',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
			
			var respuesta=msj.respuesta;
			var habilitarservicio=respuesta.habilitarservicio;
			var habilitarfechainicio=respuesta.habilitarfechainicio;
			var habilitarfechafin=respuesta.habilitarfechafinal;
			var funcion=respuesta.funcion;
			var habilitarhorainicio=respuesta.habilitarhorainicio;
			var habilitarhorafin=respuesta.habilitarhorafin;
			var habilitaralumnos=respuesta.habilitaralumnos;
			var funcionpantalla=respuesta.funcionpantalla;
			var fechactual=msj.fechactual;
			var habilitartiposervicios=respuesta.habilitartiposervicios;
			var estatusaceptado=respuesta.habilitarestatusaceptado;
			var estatuspagado=respuesta.habilitarestatuspagado;
			var coaches=respuesta.habilitarcoaches;
			var habilitarfechainiciopago=respuesta.habilitarfechainiciopago;
			var habilitarfechafinpago=respuesta.habilitarfechafinpago;
			var habilitartiposervicionodepende=respuesta.habilitartiposervicionodepende;
			var habilitarcuenta=respuesta.habilitarcuenta;
			var habilitarclasificadorgastos=respuesta.habilitarclasificadorgastos;
			var habilitarcuentabancaria=respuesta.habilitarcuentabancaria;	
			var habilitarsubsubcategoria=respuesta.habilitarsubsubcategoria;
			
			var habilitarsubcategoria=respuesta.habilitarsubcategoria;
			
			var habilitarcategoriapadre=respuesta.habilitarcategoriapadre;
			var habilitarmes=respuesta.habilitarmes;
			var habilitaranio=respuesta.habilitaranio;

			Filtrosreportesanteriores(habilitarservicio,habilitarfechainicio,habilitarfechafin,habilitarhorainicio,habilitarhorafin,funcion,habilitaralumnos,funcionpantalla,habilitartiposervicios,estatusaceptado,estatuspagado,coaches,habilitarfechainiciopago,habilitarfechafinpago,habilitartiposervicionodepende,habilitarcuenta,habilitarclasificadorgastos,habilitarcuentabancaria,habilitarsubsubcategoria,habilitarsubcategoria,habilitarcategoriapadre,habilitarmes,habilitaranio);
			

			/*$("#fechainicio1").val(fechactual);
			$("#fechafin").val(fechactual);*/

			//$("#fechainiciopago1").val(fechactual);
			//$("#fechafinpago2").val(fechactual);

			}
		}); 
	}else{

		$("#alumnos").css('display','none');
		$("#servicios").css('display','none');
		$("#fechainicio").css('display','none');
		$("#fechafinal").css('display','none');
		$("#btngenerar").css('display','none');
		$("#btnpantalla").css('display','none');

	}
}

function CargarSubsubcategorias() {
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var datos="v_tiposervicios2="+v_tiposervicios2;
	$.ajax({
		type:'POST',
		url: 'catalogos/reportesanteriores/li_subsubcategorias.php',
		cache:false,
		async:false,
		data:datos,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_subsubcategorias').html(msj);   
			$('#v_subsubcategorias').SumoSelect().sumo.reload();

			}
		}); 
}


function CargarSubsubcategorias2() {
	var v_tiposervicios2=$("#v_subcategorias").val();
	var datos="v_tiposervicios2="+v_tiposervicios2;
	$.ajax({
		type:'POST',
		url: 'catalogos/reportesanteriores/li_subsubcategorias.php',
		cache:false,
		async:false,
		data:datos,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_subsubcategorias').html(msj);   
			$('#v_subsubcategorias').SumoSelect().sumo.reload();

			}
		}); 
}

function Filtrosreportesanteriores(habilitarservicio,habilitarfechainicio,habilitarfechafinal,habilitarhorainicio,habilitarhorafin,funcion,habilitaralumnos,funcionpantalla,habilitartiposervicios,estatusaceptado,estatuspagado,coaches,habilitarfechainiciopago,habilitarfechafinpago,habilitartiposervicionodepende,habilitarcuenta,habilitarclasificadorgastos,habilitarcuentabancaria,habilitarsubsubcategoria,habilitarsubcategoria,habilitarcategoriapadre,habilitarmes,habilitaranio) {
	$("#tiposervicios").css('display','none');
	$("#servicios").css('display','none');
	$("#fechainicio").css('display','none');
	$("#fechafinal").css('display','none');
	$("#porcuentabancaria").css('display','none');
	$("#tsubsubcategorias").css('display','none');

	$("#btngenerar").css('display','block');
	$("#btngenerar").attr('onclick','ejecutar('+funcionpantalla+')');

	$("#horainicio").css('display','none');
	$("#horafin").css('display','none');
	$("#contenedor_reportesanteriores").html('');
	$("#btnpantalla").css('display','none');
	$("#estatusaceptado").css('display','none');
	$("#estatuspagado").css('display','none');
	$("#coaches").css('display','none');
	$("#fechainiciopago").css('display','none');
	$("#fechafinpago").css('display','none');
	$("#tiposervicios2").css('display','none');
	$("#tsubsubcategorias").css('display','none');
	$("#divcategoriapadre").css('display','none');
	$("#tsubcategorias").css('display','none');
	$("#mes").css('display','none');
	$("#anio").css('display','none');

	//$("#btnpantalla").css('display','block');
	$("#btnpantalla").attr('onclick',funcion);


	if (habilitarservicio==1) {

		$("#servicios").css('display','block');
		CargarServiciosReporte();
		//$("#v_servicios").attr('onchange','CargarAlumnos()');
	}

	if (habilitaralumnos==1) {
		$("#alumnos").css('display','block');
		CargarAlumnosReporte();
	}
	

	if (habilitarfechainicio==1) {

		$("#fechainicio").css('display','block');
	
	}

	if (habilitarfechafinal==1) {

		$("#fechafinal").css('display','block');
	
	}

	if (habilitarhorainicio==1) {

		$("#horainicio").css('display','block');
	
	}
	if (habilitarhorafin==1) {
		$("#horafin").css('display','block');
	}

	if (habilitarfechainiciopago==1) {
		$("#fechainiciopago").css('display','block');
	}

	if (habilitarfechafinpago==1) {
		$("#fechafinpago").css('display','block');

	}

	if (habilitartiposervicios==1) {
		$("#tiposervicios").css('display','block');
		CargarTipoServiciosRe();
	}
 
	if (habilitartiposervicionodepende==1) {
		$("#tiposervicios2").css('display','block');
		
		CargarTipoServiciosRe2();
	}
	

	if (estatusaceptado==1){
	$("#estatusaceptado").css('display','block');
		$('#v_estatusaceptado').SumoSelect().sumo.reload();

	}
	if (estatuspagado==1){
	$("#estatuspagado").css('display','block');
	$('#v_estatuspagado').SumoSelect().sumo.reload();

	}
	if (coaches==1) {
		CargarCoaches();
	$("#coaches").css('display','block');



	}
	
	if (habilitarcuentabancaria==1) {

		CargarCuentasbancarias();
		$("#porcuentabancaria").css('display','block');
	}



	if (habilitarsubsubcategoria==1) {

		$("#tsubsubcategorias").css('display','block');

	}



	if (habilitarcategoriapadre==1) {
		$("#divcategoriapadre").css('display','block');
		CargarCategoriaPadre();
	}

	if (habilitarsubcategoria==1) {
		$("#tsubcategorias").css('display','block');

		CargarSubCategorias();
	}
	if (habilitarmes==1) {
		 CargarMeses();
		 $("#mes").css('display','block');
		 $('#v_meses').SumoSelect().sumo.reload();

      
	}
	
	if (habilitaranio==1) {
		 Cargaranios();
		 $("#anio").css('display','block');

	}
}

function CargarCategoriaPadre() {

	 $.ajax({
					url:'catalogos/reportesanteriores/li_categoriapadre.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						
							$("#v_categoriapadre").html(msj);
	

							$('#v_categoriapadre').SumoSelect().sumo.reload();

					  	}
				  });
}

function CargarSubCategorias() {

	var v_categoriapadre=$("#v_categoriapadre").val();
	var datos="v_categoriapadre="+v_categoriapadre;

	 $.ajax({
					url:'catalogos/reportesanteriores/li_categoriasubcategoria.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos,
					data:datos,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						
							$("#v_subcategorias").html(msj);
	

							$('#v_subcategorias').SumoSelect().sumo.reload();

					  	}
				  });
}

function PintarCategoriaPadre(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcategorias+`">`+respuesta[i].titulo+`</option>`;
		}
	}


}

function CargarTipoServiciosRe() {

	 $.ajax({
					url:'catalogos/reportesanteriores/ObtenerTipoServicios.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
						
						var respuesta=msj.respuesta;
						PintarTipoServiciosRe(respuesta);

					  	}
				  });
	
}


function CargarTipoServiciosRe2() {

	 $.ajax({
					url:'catalogos/reportesanteriores/ObtenerTipoServiciosPrincipal.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
						
						var respuesta=msj.respuesta;
						PintarTipoServiciosRe2(respuesta);

					  	}
				  });
	
}

function PintarTipoServiciosRe(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcategorias+`">`+respuesta[i].titulo+`</option>`;
		}
	}

	$("#v_tiposervicios").html(html);
	
	

	$('#v_tiposervicios').SumoSelect().sumo.reload();

}

function PintarTipoServiciosRe2(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcategorias+`">`+respuesta[i].titulo+`</option>`;
		}
	}

	$("#v_tiposervicios2").html(html);
	$('#v_tiposervicios2').SumoSelect().sumo.reload();

}
function CargarCategorias() {

	$.ajax({
		type:'GET',
		url: 'catalogos/reportesanteriores/li_categorias.php',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#tiposervicios').html(msj);   
			}
		}); 
}

function GenerarReporteVentas(){

	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin;

	var url='modelosreportes/ventas/excel/rpt_Ventas_general.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	

}

function GenerarPantallaReporteVentas(){

	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_alumnos=$("#v_alumnos").val();

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin;

	aparecermodulos('catalogos/reportesanteriores/GenerarPantallaReporteVentas.php?'+datos,'contenedor_reportesanteriores'); 
}

function GenerarReportePantallaTipoServicios() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=1";

	var url='modelosreportes/tiposervicios/excel/rpt_TipoServicios.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 	
}

function GenerarReporteClases() {
var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=0";

	var url='modelosreportes/tiposervicios/excel/rpt_TipoServicios.php?'+datos; 
	window.open(url, '_blank');
}

function GenerarReporteDetalladoVentas(){


	var idservicios=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicios="+idservicios+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin;

	var url='modelosreportes/ventas/excel/rpt_Ventas_detalle.php?'+datos; 
	window.open(url, '_blank');

}

function CargarServiciosReporte() {

	$.ajax({
		type:'GET',
		url: 'catalogos/reportesanteriores/li_servicios.php',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_servicios').html(msj);   
			} 
		}); 
}

function CargarAlumnosReporte() {

	$.ajax({
		type:'GET',
		url: 'catalogos/reportesanteriores/li_alumnos.php',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_alumnos').html(msj);   
			}
		}); 
}



function CargarAlumnos() {
	var idservicio=$("#v_servicios").val();
	var datos="idservicio="+idservicio;
	$.ajax({
		type:'GET',
		url: 'catalogos/reportesanteriores/li_alumnos.php',
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_alumnos').html(msj);   
			}
		}); 
}

function GenerarReportePagosCoach(){

	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/pagos/excel/rpt_PagosCoach.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	

}

function GenerarReportePagosCoachPantalla() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=1";

	var url='modelosreportes/pagos/excel/rpt_PagosCoach.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReportePantallaEstatusAlumno() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=1";

	var url='modelosreportes/estatusalumnos/excel/rpt_EstatusAlumnos.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteEstatusAlumno() {
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/estatusalumnos/excel/rpt_EstatusAlumnos.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}
function CargarEstilostable(elemento) {
	$(''+elemento).DataTable( {		
		 	"pageLength": 100,
		 	"info": true,
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO EXISTEN REGISTROS CON EL FILTRO SELECCIONADO.",
						"sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
						"sInfoEmpty": "desde 0 a 0 de 0 records",
						"sInfoFiltered": "(filtered desde _MAX_ total Registros)",
						"sSearch": "Buscar",
						"oPaginate": {
									 "sFirst":    "Inicio",
									 "sPrevious": "Anterior",
									 "sNext":     "Siguiente",
									 "sLast":     "Ultimo"
									 }
						},
		   "sPaginationType": "full_numbers", 
		 	"paging":   true,
		 	"ordering": true,
        	"order": [[1, "asc" ]],

        	"bAutoWidth": false,


		});


	/*$(''+elemento+' thead tr').clone(true).appendTo(elemento+' thead' );

    $(''+elemento+' thead tr:eq(1) th').each( function (i) {
        var title = $(this).text(); //es el nombre de la columna
        $(this).html( '<input type="text" placeholder="'+title+'" />' );
 
        $( 'input', this ).on( 'keyup change', function () {
            if (table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
    } ); */  
}


function CargarEstilostable2(elemento,orden,tipo) {
	$(''+elemento).DataTable( {		
		 	"pageLength": 100,
		 	"info": true,
		 	"order": [[ 5, tipo ]],
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO EXISTEN REGISTROS CON EL FILTRO SELECCIONADO.",
						"sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
						"sInfoEmpty": "desde 0 a 0 de 0 records",
						"sInfoFiltered": "(filtered desde _MAX_ total Registros)",
						"sSearch": "Buscar",
						"oPaginate": {
									 "sFirst":    "Inicio",
									 "sPrevious": "Anterior",
									 "sNext":     "Siguiente",
									 "sLast":     "Ultimo"
									 }
						},
		   "sPaginationType": "full_numbers", 
		 	"paging":   true,
		 	"ordering": true,
        	
        	"bAutoWidth": false,


		});
}


function GenerarReportePantallaNotasPago() {

	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=1";

	var url='modelosreportes/notaspago/excel/rpt_NotasPagos.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');

			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteNotasPago() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/notaspago/excel/rpt_NotasPagos.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePagosCoachPantallaVigentes() {
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=1";

	var url='modelosreportes/pagos/excel/rpt_PagosCoachVigentes.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReportePagosCoachVigentes() {

	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/pagos/excel/rpt_PagosCoachVigentes.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePagosCoachNoVigentes() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/pagos/excel/rpt_PagosCoachNoVigentes.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePagosCoachPantallaNoVigentes(){
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=1";

	var url='modelosreportes/pagos/excel/rpt_PagosCoachNoVigentes.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function CargarTipoServicios() {

	$.ajax({
		type:'GET',
		url: 'catalogos/reportesanteriores/li_tiposervicios.php',
		cache:false,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$('#v_tiposervicios').html(msj);   
			}
		}); 
}

function GenerarReporteMembresias() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/membresias/excel/rpt_Membresias.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePantallaMembresias() {
	
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();


	var datos="fechainicio="+fechainicio+"&fechafin="+fechafin+"&pantalla=1";

	var url='modelosreportes/membresias/excel/rpt_Membresias.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteCobranza(argument) {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();
	var v_tiposervicios=$("#v_tiposervicios").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=0";

	var url='modelosreportes/cobranza/excel/rpt_Cobranza.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePantallaCobranza() {
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=1";

	var url='modelosreportes/cobranza/excel/rpt_Cobranza.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}


function GenerarReporteMonedero() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];

	var datos="idservicio="+idservicio+"&alumno="+v_alumnos+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&pantalla=0";

	var url='modelosreportes/monedero/excel/rpt_monedero.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePantallaMonedero() {
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=1";

	var url='modelosreportes/monedero/excel/rpt_monedero.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReportePantallaTotalizado() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();
	var estatusaceptado=$("#v_estatusaceptado").val();
	var estatuspagado=$("#v_estatuspagado").val();
	var v_coaches=$("#v_coaches").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var fechainiciopago=$("#fechainiciopago1").val();
	var fechafinpago=$("#fechafinpago2").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&estatusaceptado="+estatusaceptado+"&estatuspagado="+estatuspagado+"&v_coaches="+v_coaches+"&pantalla=1"+"&fechainiciopago="+fechainiciopago+"&fechafinpago="+fechafinpago+"&v_tiposervicios2="+v_tiposervicios2;

	var url='modelosreportes/notaspago/excel/rpt_Totalizado.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable2('.vertabla',5,'asc');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteTotalizado() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();
	var estatusaceptado=$("#v_estatusaceptado").val();
	var estatuspagado=$("#v_estatuspagado").val();
	var v_coaches=$("#v_coaches").val();
	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var fechainiciopago=$("#fechainiciopago1").val();
	var fechafinpago=$("#fechafinpago2").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&estatusaceptado="+estatusaceptado+"&estatuspagado="+estatuspagado+"&v_coaches="+v_coaches+"&v_tiposervicios2="+v_tiposervicios2+"&fechainiciopago="+fechainiciopago+"&fechafinpago="+fechafinpago+"&pantalla=0";

	var url='modelosreportes/notaspago/excel/rpt_Totalizado.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReporteClasesModificado() {
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=0";

	var url='modelosreportes/tiposervicios/excel/rpt_TipoServiciosModificado.php?'+datos; 
	window.open(url, '_blank');
}

function GenerarReportePantallaClasesModificado() {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&pantalla=1";

	var url='modelosreportes/tiposervicios/excel/rpt_TipoServiciosModificado.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteClasesAdmonpart(argument) {
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();
	var estatusaceptado=$("#v_estatusaceptado").val();
	var estatuspagado=$("#v_estatuspagado").val();
	var v_coaches=$("#v_coaches").val();
	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var fechainiciopago=$("#fechainiciopago1").val();
	var fechafinpago=$("#fechafinpago2").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&estatusaceptado="+estatusaceptado+"&estatuspagado="+estatuspagado+"&v_coaches="+v_coaches+"&v_tiposervicios2="+v_tiposervicios2+"&fechainiciopago="+fechainiciopago+"&fechafinpago="+fechafinpago+"&pantalla=0";

	var url='modelosreportes/coach/excel/rpt_Coachcomision.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	

}

function GenerarReportePantallaClasesAdmonpart() {
	
	var idservicio=$("#v_servicios").val();
	var fechainicio=$("#fechainicio1").val();
	var fechafin=$("#fechafin").val();

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();
	var estatusaceptado=$("#v_estatusaceptado").val();
	var estatuspagado=$("#v_estatuspagado").val();
	var v_coaches=$("#v_coaches").val();

	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	var v_tiposervicios=$("#v_tiposervicios").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var fechainiciopago=$("#fechainiciopago1").val();
	var fechafinpago=$("#fechafinpago2").val();
	var datos="idservicio="+idservicio+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&horainicio="+horainicio+"&horafin="+horafin+"&v_tiposervicios="+v_tiposervicios+"&estatusaceptado="+estatusaceptado+"&estatuspagado="+estatuspagado+"&v_coaches="+v_coaches+"&pantalla=1"+"&fechainiciopago="+fechainiciopago+"&fechafinpago="+fechafinpago+"&v_tiposervicios2="+v_tiposervicios2;

	var url='modelosreportes/coach/excel/rpt_Coachcomision.php'; 

	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			CargarEstilostable2('.vertabla',5,'asc');
			$("#btnpantalla").css('display','block');

			}
		}); 
}


// Función para mostrar el modal de "Cargando"
function mostrarModalCargando() {
  // Código para mostrar el modal (puedes personalizarlo según tus necesidades)
 

  $('#mainc').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>')
  $('#modalCargando').modal({backdrop: 'static', keyboard: false})

  //$("#modalCargando").modal();


}

// Función para ocultar el modal de "Cargando"
function ocultarModalCargando() {
  // Código para ocultar el modal (puedes personalizarlo según tus necesidades)
  $("#modalCargando").modal('hide');
}

function ejecutar(funcionpantalla) {
mostrarModalCargando();

  setTimeout(function() {
    // Ejecuta la función dinámica asignada al botón y espera a que termine
    ejecutarFuncionDinamica(funcionpantalla).then(function() {
      // Oculta el modal cuando la función haya terminado
      ocultarModalCargando();
    });

     }, 2000); 
}

function ejecutarFuncionDinamica(funcionpantalla) {
  return new Promise(function(resolve, reject) {
    // Lógica adicional que deseas ejecutar antes de la función dinámica

    // Ejecuta la función dinámica asignada al botón
    if (typeof funcionpantalla === "function") {
     
      // Simula un tiempo de espera (reemplaza esto con tu lógica real)
      resolve(funcionpantalla());
    } else {
      // En caso de que la función no sea válida, rechaza la promesa
      reject("Función no válida");
    }
  });
}


function GenerarReportePantallaGastos() {
	var fechainicio=$("#fechain").val();
	var fechafin1=$("#fechafin").val();
	/*var idservicio=$("#v_servicios").val();
	

	var horainicio=$("#v_horainicio").val();
	var horafin=$("#v_horafin").val();
*/
	/*var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];*/

	var datos="fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=1";

	var url='modelosreportes/gastos/excel/egresos.php'; 


	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			//CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteGastos(argument) {
	var fechainicio=$("#fechain").val();
	var fechafin=$("#fechafin").val();

	
	var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];
	
	var datos="fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&pantalla=0";

	var url='modelosreportes/gastos/excel/egresos.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	

}


function CargarCuentasbancarias() {

	 $.ajax({
					url:'catalogos/reportesanteriores/ObtenerCuentasbancarias.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
						
						var respuesta=msj.respuesta;
						PintarCuentasBancarias(respuesta);

					  	}
				  });
	
}
function PintarCuentasBancarias(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idformapagocuenta+`">`+respuesta[i].nombre+`</option>`;
		}
	}

	$("#v_txtporcuentabancaria").html(html);
	
}

function GenerarReportePantallaCuentasbancarias() {
	var fechainicio=$("#fechain").val();
	var fechafin1=$("#fechafin").val();
	var cuentabancaria=$("#v_txtporcuentabancaria").val();

	var datos="cuentabancaria="+cuentabancaria+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=1";

	var url='modelosreportes/gastos/excel/porcuentabancaria.php'; 

	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			//CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		}); 
}

function GenerarReporteCuentasbancarias(argument) {
	var fechainicio1=$("#fechain").val();
	var fechafin1=$("#fechafin").val();
	var cuentabancaria=$("#v_txtporcuentabancaria").val();
	
	/*var fechainicio1=fechainicio.split(' ')[0];
	var fechafin1=fechafin.split(' ')[0];*/
	
	var datos="cuentabancaria="+cuentabancaria+"&fechainicio="+fechainicio1+"&fechafin="+fechafin1+"&pantalla=0";

	var url='modelosreportes/gastos/excel/porcuentabancaria.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}

function GenerarReportePantallaVentasClases() {
	var fechainicio=$("#fechainicio1").val();
	var fechafin1=$("#fechafin").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var v_coaches=$("#v_coaches").val();
	var meses=$("#v_meses").val();
	var anios=$("#v_anios").val();
	var datos="v_coaches="+v_coaches+"&v_tiposervicios2="+v_tiposervicios2+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=1";
		datos+='&v_meses='+meses+"&v_anios="+anios;

	var url='modelosreportes/ventas/excel/rpt_Ventasclasesacademias.php'; 

	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			//CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		});
}

function GenerarReporteVentasclases() {

	var fechainicio=$("#fechainicio1").val();
	var fechafin1=$("#fechafin").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var v_coaches=$("#v_coaches").val();
	var v_meses=$("#v_meses").val();
	var v_anios=$("#v_anios").val();
	var datos="v_coaches="+v_coaches+"&v_tiposervicios2="+v_tiposervicios2+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=0";
		datos+='&v_meses='+v_meses+"&v_anios="+v_anios;

	var url='modelosreportes/ventas/excel/rpt_Ventasclasesacademias.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	

}

function GenerarReporteVentasAcademias(argument) {
	var fechainicio=$("#fechainicio1").val();
	var fechafin1=$("#fechafin").val();
	var v_tiposervicios2=$("#v_tiposervicios2").val();
	var v_coaches=$("#v_coaches").val();
	var v_meses=$("#v_meses").val();
	var v_anios=$("#v_anios").val();
	//var datos="v_coaches="+v_coaches+"&v_tiposervicios2="+v_tiposervicios2+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=0";
	var v_categoriapadre=$("#v_categoriapadre").val();

	var v_subcategorias=$("#v_subcategorias").val();

	var v_subsubcategorias=$("#v_subsubcategorias").val();

	var datos="v_categoriapadre="+v_categoriapadre+"&v_subcategorias="+v_subcategorias+"&v_subsubcategorias="+v_subsubcategorias+"&v_coaches="+v_coaches+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=0";
		datos+='&v_meses='+v_meses+"&v_anios="+v_anios;

	var url='modelosreportes/ventas/excel/rpt_Ventasacademias.php?'+datos; 

	//alert(url);
	window.open(url, '_blank');	
}


function GenerarReporteAcademiasPantalla() {
	var fechainicio=$("#fechainicio1").val();
	var fechafin1=$("#fechafin").val();
	//var v_tiposervicios2=$("#v_tiposervicios2").val();
	var v_coaches=$("#v_coaches").val();
	var v_meses=$("#v_meses").val();
	var v_anios=$("#v_anios").val();
	var v_categoriapadre=$("#v_categoriapadre").val();
	var v_subcategorias=$("#v_subcategorias").val();
	var v_subsubcategorias=$("#v_subsubcategorias").val();
	//var datos="v_coaches="+v_coaches+"&v_tiposervicios2="+v_tiposervicios2+"&v_subsubcategorias="+v_subsubcategorias+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=1";
	var datos="v_categoriapadre="+v_categoriapadre+"&v_subcategorias="+v_subcategorias+"&v_subsubcategorias="+v_subsubcategorias+"&v_coaches="+v_coaches+"&fechainicio="+fechainicio+"&fechafin="+fechafin1+"&pantalla=1";
		datos+='&v_meses='+v_meses+"&v_anios="+v_anios;

	var url='modelosreportes/ventas/excel/rpt_Ventasacademias.php'; 

	$.ajax({
		type:'GET',
		url: url,
		cache:false,
		data:datos,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown){
		 console.log(arguments);
		 var error;
		 if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
		 if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
		alert(error);						  
		 },
		success : function (msj){
		
			$("#contenedor_reportes").html(msj);

			//CargarEstilostable('.vertabla');
			$("#btnpantalla").css('display','block');

			}
		});
}

