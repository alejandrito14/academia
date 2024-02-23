let calendarInline2="";
var fechasglobal="";
var arraydiaselegidos2=[];
var arraydiaseleccionados2=[];
var horarioscomparacion="";
function ReagendarServicio() {

	GoToPage('reagendarservicio');
}


function ObtenerDatosServicio() {
	var pagina = "ObtenerServicioNuevo.php";
	var id_user=localStorage.getItem('id_user');
	var valor=$("#serviciosreplica").val();
	var datos="id_user="+id_user+"&idservicio="+valor;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(datos){
 		
		var respuesta=datos.respuesta;
		var idcategoriaservicio=respuesta.idcategoriaservicio;
		var idservicio=respuesta.idservicio;
		var idcategoria=respuesta.idcategoria;
		var titulo=respuesta.titulo;
		var descripcion=respuesta.descripcion;
		var politicasaceptacion=respuesta.politicasaceptacion;
		var estatus=respuesta.estatus;
		var precio=respuesta.precio;
		$("#v_estatus").val(estatus);
		$("#v_titulo").val(titulo);
		$("#v_descripcion").val(descripcion);
		$("#v_costo").val(precio);


	 	$("#v_categoria").val(idcategoriaservicio);
		$("#v_categoriaservicio").val(idcategoria);
		$("#v_fechainicial").val(respuesta.fechainicial);
		$("#v_fechafinal").val(respuesta.fechafinal);
		$("#demo-calendar").html('');
		var lunes= respuesta.lunes;
		var martes=respuesta.martes;
		var miercoles=respuesta.miercoles;
		var jueves=respuesta.jueves;
		var viernes=respuesta.viernes;
		var sabado=respuesta.sabado;
		var domingo=respuesta.domingo;
		CargarCalendarioAgendar();

		$("#demo-calendar").css('display','block');

	 var demo = new Promise((resolve, reject) => {
	 	$("#v_categoria").val(idcategoriaservicio);
		$("#v_categoriaservicio").val(idcategoria);
      resolve(SeleccionarCategoriaReagendar(valor,lunes,martes,miercoles,jueves,viernes,sabado,domingo));
    });

	 demo.then(()=>{

		


		var fechainicial=respuesta.fechainicial; 
		var fechafinal=respuesta.fechafinal;
		
		$("#v_fechainicial").val(fechainicial);
		$("#v_fechafinal").val(fechafinal);
		$("#v_politicasaceptacion").val(politicasaceptacion);

		ObtenerHorariosSemanaR(idservicio);
		HorariosDiasCalendarioReagendado(0);
		CamposDisables();
		$("#profile-tab").css('display','block');
		$("#cantidad-tab").css('display','block');

		


		/*$("#Lunes").attr('checked',false);
		if(lunes == 1) {
			$("#Lunes").attr('checked',true);
			//$(".lbllunes").addClass('active');
		}
	   $("#Martes").attr('checked',false);

		if(martes == 1) {
			$("#Martes").attr('checked',true);
			//$(".lblmartes").addClass('active');
		}
		$("#Miercoles").attr('checked',false);

		if(miercoles == 1) {
			$("#Miercoles").attr('checked',true);
			//$(".lblmiercoles").addClass('active');

		}
		$("#Jueves").attr('checked',false);

		if(jueves == 1) {
			$("#Jueves").attr('checked',true);
			//$(".lbljueves").addClass('active');

		}
			$("#Viernes").attr('checked',false);

		if(viernes==1) {
			$("#Viernes").attr('checked',true);
			//$(".lblviernes").addClass('active');

		}
		$("#Sabado").attr('checked',false);
		if(sabado==1) {
			$("#Sabado").attr('checked',true);
			//$(".lblsabado").addClass('active');

		}
		$("#Domingo").attr('checked',false);

		if(domingo==1) {
			$("#Domingo").attr('checked',true);
			//$(".lbldomingo").addClass('active');

		}*/
			  });
	//	Permitirligar();
		//HabilitarcantidadReembolso();

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

}


function CargarCalendarioAgendar() {
	var eventos=[];
	
    
      // Inline with custom toolbar
      var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar',
        weekHeader: true,
         events: eventos,
        firstDay:0,

         renderToolbar: function () {
          return`
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="left" style="margin-left:1em;">
                <a href="#" class="link "><i class="icon icon-back "></i></a>
              </div>
              <div class="center"></div>
              <div class="right" style="margin-right:1em;">
                <a href="#" class="link"><i class="icon icon-forward "></i></a>
              </div>
            </div>
          </div>
          `;
        },
        on: {
          init: function (c) {
          	$(".calendar-year-selector").css('display','none');
            //$('.current-month-value').text(monthNames[c.currentMonth] + ' ' + c.currentYear);
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
 	
          	$(".calendar-month-selector").css('cssText' , 'justify-content: center!important');

          	$(".calendar .toolbar").removeClass('toolbar-top');
          
          	$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
          	
          	 $('.calendar-custom-toolbar .left .link').on('click', function () {
              calendarInline.prevMonth();
             // CargarFechasRefrescar1(calendarInline);
             HorariosDisponiblesFlecha();
            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
             // CargarFechasRefrescar1(calendarInline);
             HorariosDisponiblesFlecha();
            });


 			$(".calendar-day-today .calendar-day-number").addClass('diaactual');
 			var fechaac=new Date();
          	var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
         	var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
         	fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
          //	ConsultarFechaDisponibles(fecha);
          },
          calendarDayClick:function(c){

       
          	$(".calendar-day-has-events").each(function(){
				$(this).removeClass('calendar-day-selected');
			});
          	calendarInline.on('calendarChange()');

   
          },
         calendarChange:function (c) {
         
         	var fechaac=new Date();
          	var mes=fechaac.getMonth()+1;
         	var dia=fechaac.getDate();
         	fechaactualdata=fechaac.getFullYear()+'-'+ mes+'-'+dia;

          	var fecha=calendarInline.getValue();


          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var mesdata=convertirfecha.getMonth();

         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	var diadata=convertirfecha.getDate();
         	fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
          
          	ConsultarFechaHorariosDisponibles(fecha1);
          	
      
          },

            monthYearChangeStart: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
             //$('.current-month-value').text(monthNames[c.currentMonth] + ' ' + c.currentYear);
             console.log('entro');

          },


 			monthYearChangeEnd: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
             //$('.current-month-value').text(monthNames[c.currentMonth] + ' ' + c.currentYear);
             console.log('entro change end');
            // CargarFechasRefrescar1(calendarInline);

          }
          
        
        }
      });
   

  
}





function ObtenerHorariosSemanaR(idservicio) {
	var datos="idservicio="+idservicio;


		$.ajax({
					url: urlphp+'ObtenerHorariosSemana.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						var horarios=msj.respuesta;
						var servicio=msj.servicio;
						 zonasarray=msj.zonas;
						 arraydiaseleccionados=[];
						arraydiaselegidos=[];
						if (horarios.length>0) {
							//GuardarHorariosAntes(horarios,servicio);
							horarioscomparacion=horarios;
							PintarHorariosServicio(horarios,servicio);
						
							Resumenfechas();
							CantidadHorarios();
							//$("#numerodehorarios").text(horarios.length);
						}


					}
				});
}


function ComprobacionHorarios() {
 return new Promise(function(resolve, reject) {
	var datos="horarioscomparacion="+JSON.stringify(horarioscomparacion)+"&arraydiaseleccionados="+JSON.stringify(arraydiaseleccionados)+"&idservicio="+idservicio;
	
	$.ajax({
					url: 'catalogos/servicios/ObtenerComparacion.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

					resolve(msj);

					}
				});
	});
}


function GuardarReagendado() {


	new Promise((resolve, reject) => {
			resolve(Guardando());


		}).then((r) => {
		  	
		  	console.log(r);
		  	//GuardarservicioForm(form,regresar,donde,idmenumodulo);

		  });
}



function ComprobacionHorarios() {
 return new Promise(function(resolve, reject) {
 	var idservicio=$("#serviciosreplica").val();
	var datos="horarioscomparacion="+JSON.stringify(horarioscomparacion)+"&arraydiaseleccionados="+JSON.stringify(arraydiaseleccionados)+"&idservicio="+idservicio;
	
	$.ajax({
					url: urlphp+'ObtenerComparacion.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

					resolve(msj);

					}
				});
	});
}

function Guardando() {
	var pasar=0;
		if (horarioscomparacion.length>0) {
			var resp=ComprobacionHorarios();
			  resp.then(r => {

			  	var bandera=1;
			  	if (r.cantidad==0) {
			  		bandera=0;
			  	}
			  	if (r.fechaspasadas>0) {
			  		bandera=0;
			  	}
			  	
			  	if ( bandera==1 ) {
			  		GuardarServicioReagendado();
			  	}else{
			  		var msg="";
			  			if (r.cantidad==0) {
			  				bandera=0;
			  				msg+="La cantidad de horarios debe ser igual a la que se registró originalmente<br>";
					  	}
					  	if (r.fechaspasadas>0) {
					  		bandera=0;
					  		msg+="Se seleccionaron fechas pasadas a la actual<br>";

					  	}

					  	if (bandera==0) {
					  		alerta('',msg);

					  	}

			  	}

			  });

		}

}


function DesplegarCalendarioReagendar() {

	var serviciosreplica=$("#serviciosreplica").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();
	var bandera=1;
	if (serviciosreplica==0) {
		bandera=0;
	}

	if (v_fechainicial=='') {
		bandera=0;
	}
	if (v_fechafinal=='') {
		bandera=0;
	}
	if (bandera==1) {

		app.dialog.preloader();
	HorariosDiasCalendarioReagendado(0);
	
	var titulo=$("#serviciosreplica option:selected").html();
	$("#v_titulo").val('COPIA '+titulo);
		app.dialog.close();
		$(".calendario").css('display','block');

	}else{


		alerta('','Falta por completar campos');
	}

}
function GuardarServicioReagendado() {


 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                <span>¿Seguro que desea realizar la operación?</span>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: '',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'NO',
            },
            {
              text: 'SI',
            },
            
          ],

           onClick: function (dialog, index) {
            if(index === 0){
             
          }
          else if(index === 1){
          	
          	GuardarservicioReagendar();
          	
          }



        },
          verticalButtons: false,
        }).open();


}
function GuardarservicioReagendar() {
	

		var iduser=localStorage.getItem('id_user');
		var idtipousuario=localStorage.getItem('idtipousuario');
		

		var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
	

		if($("#Domingo").is(':checked')){

		 domingo=1;
		}
		 if($("#Lunes").is(':checked')){

		 lunes=1;
		}
		 if($("#Martes").is(':checked')){

		 martes=1;
		}
		 if($("#Miercoles").is(':checked')){

		 miercoles=1;
		}
		if($("#Jueves").is(':checked')){

		 jueves=1;
		}
		 if($("#Viernes").is(':checked')){

		 Viernes=1;
		}
		 if($("#Sabado").is(':checked')){

		 sabado=1;
		}	

		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var descripcion=$("#v_descripcion").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();
		var categoria=$("#v_categoria").val();
		var costo=$("#v_costo").val();
		var id=$("#serviciosreplica").val();

		var totalclase=$("#v_totalclase").val();
		var montopagarparticipante=$("#v_montopagarparticipante").val();
		var montopagargrupo=$("#v_montopagargrupo").val();
		var fechainicial=$("#v_fechainicial").val();
		var fechafinal=$("#v_fechafinal").val();
		var datos = new FormData();


		var diasemana=[];

		var horainicio=[];

		var horafin=[];


		const zonas = [...new Set(arraydiaseleccionados.map(bill => bill.idzona))];
		
		datos.append('v_titulo',nombre); 
		datos.append('v_descripcion',descripcion);
		datos.append('v_orden',orden); 
		datos.append('id',id);
		datos.append('v_estatus',estatus);
		datos.append('v_categoria',categoria);
		
		datos.append('v_fechainicial',fechainicial);
		datos.append('v_fechafinal',fechafinal);
	
		datos.append('v_arraydiaselegidos',arraydiaselegidos);
		/*datos.append('v_periodoinicial',periodoinicial);
		datos.append('v_periodofinal',periodofinal);*/
		datos.append('v_lunes',lunes);
		datos.append('v_martes',martes);
		datos.append('v_miercoles',miercoles);
		datos.append('v_jueves',jueves);
		datos.append('v_viernes',Viernes);
		datos.append('v_sabado',sabado);
		datos.append('v_domingo',domingo);
		datos.append('idtipousuario',idtipousuario);
	
		

		var bandera1=1;

		// $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				if (bandera1==1) {
		//setTimeout(function(){
				  $.ajax({
					url:urlphp+'GuardarReagendado.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					contentType: false, //Debe estar en false para que pase el objeto sin procesar
					data: datos, //Le pasamos el objeto que creamos con los archivos
					processData: false, //Debe estar en false para que JQuery no procese los datos a enviar
					cache: false, //Para que˘
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
							$("#id").val(msj.idservicio);
								localStorage.setItem('valor','');

							
						   console.log("El resultado de msj es: "+msj);
						   	if( resp == 1 ){
								alerta('','Se realizaron los cambios correctamente');
						 	
								arraydiaselegidos=[];
								arraydiaseleccionados=[];
								localStorage.setItem('idservicio',msj.idservicio);
		
									if (localStorage.getItem('idtipousuario')== 0) {
										GoToPage('detalleservicioadmin');
									}
									if(localStorage.getItem('idtipousuario')== 5) {
										GoToPage('detalleserviciocoach');
									}
									
						 	 }else{
									alerta('','Error.Intente nuevamente');

						  	}
						   
						 	/*if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}*/			
					  	}
				  });				  					  
		/*},1000);*/

		//}
	 }
}
function CamposDisables() {
	$("#v_titulo").attr('disabled',true);
	$("#v_descripcion").attr('disabled',true);
	$("#v_categoria").attr('disabled',true);
	$("#v_categoriaservicio").attr('disabled',true);
}


function AplicarFechasReagendado() {
		var preguntar=0;
		var v_fechainicial=$("#v_fechainicial").val();
		var v_fechafinal=$("#v_fechafinal").val();
	
	if (v_fechainicial!='' && v_fechafinal!='' ) {

		
		//$("#demo-calendar").css('display','block');
		/*var id=$("#id").val();
		if (id>0) {
		ObtenerHorariosSemana(id);	
		}*/


		if (arraydiaselegidos.length>0) {

 		ObtenerVerificarFechasDias(v_fechainicial,v_fechafinal,arraydiaselegidos).then(r => {
 			
 			if (r.noseencuentra.length>0) {

 				MensajeMostrar(r.noseencuentra);
 				
 			}else{
 				HorariosDisponiblesReagendado();
				$("#demo-calendar").css('display','block');

 			}

 		})

		}else{
		HorariosDisponiblesReagendado();
		$("#demo-calendar").css('display','block');
	}
		
	}else{

		alerta('','Seleccionar fechas');
	}

}

function HorariosDisponiblesReagendado() {

	var v_zonas=[];
/*	arraydiaselegidos=[];
	arraydiaseleccionados=[];*/
	var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
	
		if($("#Domingo").is(':checked')){

		 domingo=1;
		}
		 if($("#Lunes").is(':checked')){

		 lunes=1;
		}
		 if($("#Martes").is(':checked')){

		 martes=1;
		}
		 if($("#Miercoles").is(':checked')){

		 miercoles=1;
		}
		if($("#Jueves").is(':checked')){

		 jueves=1;
		}
		 if($("#Viernes").is(':checked')){

		 Viernes=1;
		}
		 if($("#Sabado").is(':checked')){

			 sabado=1;
		}	

	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonas;

			$.ajax({
					url: urlphp+'ObtenerHorariosFechas.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json', 
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						var v_fechainicial=msj.fechadia;
						var dividirfechaini=v_fechainicial.split('-');
						anioinicial=dividirfechaini[0];
						mesinicial=(dividirfechaini[1].replace(/^(0+)/g, '')-1);
						 var fechas=msj.arrayfechasdias[0];
						 zonasarray=msj.zonas;

						 var respuesta=msj.respuesta;
						 fechasglobal=respuesta;

						 fechasglobal2=respuesta;
						eventos=[];
						 if (respuesta.length>0) {
						 	$("#calendario").css('display','block');
						 for (var i = 0; i < respuesta.length; i++) {
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
							var nombrezona=respuesta[i].nombrezona;
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
						 	
						 var anio=dividirfecha[0];
						 var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
						 var dia=dividirfecha[2];
						 var color=respuesta[i].color;
						 var objeto={
							date:new Date(anio,mes,dia),
							color:'rgb(255 255 255 / 10%)',
						};
						 	eventos.push(objeto);
					

						 }
						 calendarInline.setYearMonth(anioinicial, mesinicial, 2);
						 calendarInline.params.events = eventos;
						calendarInline.update();
						 $(".calendar-day-today .calendar-day-number").addClass('diaactual');


						}else{

							alerta('','No se encuentran horarios disponibles dentro del periodo');
							//AbrirNotificacion('No se encuentran horarios disponibles dentro del periodo','mdi mdi-alert-circle');
					
						}
						$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');

						

					}
				});
	
}


function HorariosDiasCalendarioReagendado(flecha) {
	var idservicio=$("#serviciosreplica").val();
	var mes=(calendarInline.currentMonth+1)>9?(calendarInline.currentMonth+1):'0'+(calendarInline.currentMonth+1);
	var anio=calendarInline.currentYear;
	var fecha=anio+'-'+mes+'-01';
	var fechainicial=$("#v_fechainicial").val();
	var fechafinal=$("#v_fechafinal").val();
	var datos="idservicio="+idservicio+"&fecha="+fecha+"&fechainicial="+fechainicial+"&fechafinal="+fechafinal;

	$.ajax({
					url: urlphp+'ObtenerDiasDisponibles.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json', 
					data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						 var v_fechainicial=msj.fechadia;
						var dividirfechaini=v_fechainicial.split('-');
						anioinicial=dividirfechaini[0];
						mesinicial=(dividirfechaini[1].replace(/^(0+)/g, '')-1);
						 var fechas=msj.arrayfechasdias[0];
						 zonasarray=msj.zonas;

						 var respuesta=msj.respuesta;
						 fechasglobal=respuesta;
						 fechasglobal2=respuesta;

						eventos=[];
						 if (respuesta.length>0) {
						 	$("#calendario").css('display','block');
						 for (var i = 0; i < respuesta.length; i++) {
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
							var nombrezona=respuesta[i].nombrezona;
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
						 	
						 var anio=dividirfecha[0];
						var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
						var dia=dividirfecha[2];
						var color=respuesta[i].color;
						var objeto={
							date:new Date(anio,mes,dia),
							color:'rgb(255 255 255 / 10%)',
						};
						 	eventos.push(objeto);
					

						 }
						 if (flecha==0) {
						 calendarInline.setYearMonth(anioinicial, mesinicial, 2);
						}
						 calendarInline.params.events = eventos;
					
						calendarInline.update();
						 $(".calendar-day-today .calendar-day-number").addClass('diaactual');


						}else{

							alerta('','No se encuentran horarios disponibles dentro del periodo');
							//AbrirNotificacion('No se encuentran horarios disponibles dentro del periodo','mdi mdi-alert-circle');
					
						}
						$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');

						

					}
				});

}

function FiltrarPorZona() {
	var idzona=$("#v_zonafiltro").val();

	if (idzona!=0) {
		$(".horarios").css('display','none');
		$(".zonadiv_"+idzona).css('display','block');
	}else{
		$(".horarios").css('display','block');

	}
}
