function CargarSucursales()
{
	
	$.ajax({
		type:'GET',
		url: 'catalogos/reportes/li_sucursales.php',
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


function CargarFiltrosreportes(idreporte) {

	if (idreporte>0) {
	var datos="idreporte="+idreporte;

	$.ajax({
		type:'POST',
		url: 'catalogos/reportes/Obtenerfiltrosreporte.php',
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
			Filtrosreportes(habilitarservicio,habilitarfechainicio,habilitarfechafin,habilitarhorainicio,habilitarhorafin,funcion,habilitaralumnos,funcionpantalla);
			
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

function Filtrosreportes(habilitarservicio,habilitarfechainicio,habilitarfechafinal,habilitarhorainicio,habilitarhorafin,funcion,habilitaralumnos,funcionpantalla) {

	$("#servicios").css('display','none');
	$("#fechainicio").css('display','none');
	$("#fechafinal").css('display','none');
	$("#btngenerar").css('display','block');
	$("#btngenerar").attr('onclick',funcion);
	$("#horainicio").attr('display','none');
	$("#horafin").attr('display','none');
	$("#btnpantalla").css('display','block');
	$("#btnpantalla").attr('onclick',funcionpantalla);

	if (habilitarservicio==1) {

		$("#servicios").css('display','block');
		CargarServiciosReporte();
		$("#v_servicios").attr('onchange','CargarAlumnos()');
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
	
}
function CargarCategorias() {

	$.ajax({
		type:'GET',
		url: 'catalogos/reportes/li_categorias.php',
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
		
			$('#v_categoria').html(msj);   
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

	aparecermodulos('catalogos/reportes/GenerarPantallaReporteVentas.php?'+datos,'contenedor_reportes'); 

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
		url: 'catalogos/reportes/li_servicios.php',
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
		url: 'catalogos/reportes/li_alumnos.php',
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
		url: 'catalogos/reportes/li_alumnos.php',
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