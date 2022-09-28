var fechaconsulta="";
$(document).ready(function() {
    aparecermodulos('catalogos/dashboard/vi_dashboard.php','main');
});



function ObtenerClientesAndroidios() {

	
	$.ajax({
					url: 'catalogos/dashboard/obteneroclientesandroidios.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						$("#usuariosios").text(msj.respuesta[0].ios);
						$("#usuariosandroid").text(msj.respuesta[0].android);

					
					}
				});
}

function Obtenerregistrados(argument) {
	$.ajax({
					url: 'catalogos/dashboard/obteneroclientesregistrados.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						$("#usuariosregistrados").text(msj.respuesta[0].cantidad);

					
					}
				});
}
function clientesensession(argument) {
	
	$.ajax({
					url: 'catalogos/dashboard/obteneroclientessession.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						$("#clientessession").text(msj.respuesta[0].clientessession);

					
					}
				});
}

function ObtenerClientesVersion() {
	
	$.ajax({
					url: 'catalogos/dashboard/obteneroclientesversion.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
						$("#versionactualdiv").css('display','none');

						if (msj.actual!=0) {

						$("#versionactualdiv").css('display','block');
						$("#totalversionactual").text(msj.actual);
						$("#totalversionesanteriores").text(msj.anterior);
						$("#versionactual").text("("+msj.versionactual+")");

						}
					}
				});
}

function ObtenerCantidadAlumnos() {
	
	$.ajax({
					url: 'catalogos/dashboard/Obteneroalumnos.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						if (msj.respuesta!=0) {

							var respuesta=msj.respuesta[0];
							$("#alumnosregistrados").text(respuesta.total);
						

						}
					}
				});
}
function ObtenerCoaches() {
	$.ajax({
					url: 'catalogos/dashboard/ObtenerCoaches.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						if (msj.respuesta!=0) {

						var respuesta=msj.respuesta[0];
							$("#coachregistros").text(respuesta.total);
						

						}
					}
				});
}
function ObtenerServicios() {
	$.ajax({
					url: 'catalogos/dashboard/ObtenerServicios.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						if (msj.respuesta!=0) {

								var respuesta=msj.respuesta[0];
							$("#cantidadservicios").text(respuesta.total);
						


						}
					}
				});
}

/*function PintarCalendario(argument) {
		 $('#picker').markyourcalendar({
	          			 startDate: new Date(),
			             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],
			              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],
			           	 isMultiple: true,


						});

}*/

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

var hoy = new Date();
var dd = hoy.getDate();
if(dd<10) {
    dd='0'+dd;
} 
 
if(mm<10) {
    mm='0'+mm;
}

var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();

dd=addZero(dd);
mm=addZero(mm);

function PintarCalendario2() {
   // var calendarEl = document.getElementById('picker');

   // var calendar = new FullCalendar.Calendar(calendarEl, {
	$('#picker2').fullCalendar({
        header: {
        	left:'prev',
            center: 'title',
            right: 'next',

        },
            locale:'es',
        	monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
			monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agost","Sept", "Oct", "Nov", "Dic"],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado'],
			dayNamesShort: ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab", "Dom"],
        firstDay:0,
        defaultDate: yyyy+'-'+mm+'-'+dd,
       eventLimit: true, // allow "more" link when too many events 
        events: [
           
        ],
        dayClick: function (date, jsEvent, view) {
           console.log('Has hecho click en: '+  date.format());
          /*
                     var  evento=new Date(date);
 var anio=evento.getFullYear();
           var mes=evento.getMonth()+1;
           var dia=evento.getDate();
           if(dia<10) {
				    dia='0'+dia;
				} 
				if(mes<10) {
				    mes='0'+mes;
				}

				if (dia==32) {
					dia='01';
				}*/

            var fecha=date.format();

            ObtenerHorariosFechaEspe(fecha);
            fechaconsulta=fecha;
			ObtenerHorariosDia(3);
        }, 
        eventClick: function (calEvent, jsEvent, view) {
            $('#event-title').text(calEvent.title);
            $('#event-description').html(calEvent.description);
            $('#modal-event').modal();

        }, 

       
	});

  //  calendar.render();
	 var fecha=new Date();
	 var f=fecha.toISOString().split('T')[0];

	 ObtenerHorariosFecha(f);
	 $("#txttitle").css('display','none');


 $('.fc-button-prev').click(function(){
       var moment = $('#picker2').fullCalendar('getDate');
       console.log(moment._a);
       var anio=moment._a[0];
           var mes=moment._a[1]+1;
           var dia=moment._a[2];
           if(dia<10) {
				    dia='0'+dia;
				} 
				if(mes<10) {
				    mes='0'+mes;
				}

            var fecha=anio+'-'+mes+'-'+dia;
	   ObtenerHorariosFecha(fecha);

	   $("#txttitle").css('display','none');
	   $(".horarios").css('display','none');
  });

  $('.fc-button-next').click(function(){
     var moment = $('#picker2').fullCalendar('getDate');
        var anio=moment._a[0];
           var mes=moment._a[1]+1;
           var dia=moment._a[2];
           if(dia<10) {
				    dia='0'+dia;
				} 
				if(mes<10) {
				    mes='0'+mes;
				}

            var fecha=anio+'-'+mes+'-'+dia;
	    ObtenerHorariosFecha(fecha);
	     $("#txttitle").css('display','none');
	     $(".horarios").css('display','none');
  });


  $(".fc-rigid").css('height','30px');
  $(".fc-day-grid-container").css('height','144.9px');
  $(".fc-day-top .fc-day-number").css({'cssText':'margin: 5em!important;'});

  $(".fc-day-header").css('text-align','center');
  $(".fc-day-top ").css({'cssText':'text-align: center!important;'});

  $(".fc-header-right").css('visibility','visible');

  //$(".fc-header-left .fc-corner-right").css('display','none');
  $(".fc-button-today").css('display','none');

}

function PintarDisponible() {

	/*$('#picker3').fullCalendar({

		  locale: 'es',
		   header: {
		   	left:'',
            right: 'prev,next',
            center: 'title',
        },

	  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	  monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agost","Sept", "Oct", "Nov", "Dic"],
	  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado'],
	  dayNamesShort: ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab", "Dom"],
	  defaultView: 	'agendaDay',

	     editable: true,
   	    selectable: true,
    	selectHelper: true,
    	 buttonIcons: true,
        weekNumbers: false,
        editable: true,
        eventLimit: true,
    	
        slotDuration: '00:35:00',
        snapDuration: '00:35:00',
         events: [
            {
                title: 'All Day Event',
                description: 'Lorem ipsum 1...',
                start: '2019-09-23',
                color: '#3A87AD',
                textColor: '#ffffff',
            }
        ],
          views: {
        agendaTwoDay: {
          type: 'agenda',
          duration: { days: 2 },

          groupByResource: true

       
        }
      },
         resources: [
	      { id: 'a', title: 'Room A' },
	      { id: 'b', title: 'Room B'},
	      { id: 'c', title: 'Room C' },
	      { id: 'd', title: 'Room D' }
	    ],
 	
	});*/

/*	    $('#picker3').fullCalendar({
      defaultView: 'agendaDay',
      defaultDate: '2017-12-07',
      editable: true,
      selectable: true,
      eventLimit: true, // allow "more" link when too many events
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay',
      },
      views: {
        agendaTwoDay: {
          type: 'agenda',
          duration: { days: 2 },

          // views that are more than a day will NOT do this behavior by default
          // so, we need to explicitly enable it
          groupByResource: true

          //// uncomment this line to group by day FIRST with resources underneath
          //groupByDateAndResource: true
        }
      },

      //// uncomment this line to hide the all-day slot
      //allDaySlot: false,

      resources: [
        { id: 'a', title: 'Room A' },
        { id: 'b', title: 'Room B', eventColor: 'green' },
        { id: 'c', title: 'Room C', eventColor: 'orange' },
        { id: 'd', title: 'Room D', eventColor: 'red' }
      ],
      events: [
        { id: '2', resourceId: 'a', start: '2017-12-07T09:00:00', end: '2017-12-07T14:00:00', title: 'event 2' },
        { id: '3', resourceId: 'b', start: '2017-12-07T12:00:00', end: '2017-12-08T06:00:00', title: 'event 3' },
        { id: '4', resourceId: 'c', start: '2017-12-07T07:30:00', end: '2017-12-07T09:30:00', title: 'event 4' },
        { id: '5', resourceId: 'd', start: '2017-12-07T10:00:00', end: '2017-12-07T15:00:00', title: 'event 5' }
      ],

      select: function(start, end, jsEvent, view, resource) {
        console.log(
          'select',
          start.format(),
          end.format(),
          resource ? resource.id : '(no resource)'
        );
      },
      dayClick: function(date, jsEvent, view, resource) {
        console.log(
          'dayClick',
          date.format(),
          resource ? resource.id : '(no resource)'
        );
      }
    });

	  $(".fc-header-right").css('visibility','visible');
*/
}

function PintarHorarioDisponible() {

	
	$.ajax({
					url: 'catalogos/dashboard/ObtenerHorariosFechaActual.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
						PintarDia(msj);
				}

			});
}

function PintarDia(msj) {
	$("#fechaactualdiv").html('');
	$("#intervalos").html('');
	$("#zonasdiv").html('');
	$("#espacios").html('');
	 fechaconsulta=msj.fecha;
						var respuesta=msj.respuesta;
						var fechaformato=msj.fechaactual;

						$("#fechaactualdiv").html(fechaformato);
					
						var intervalos=msj.intervalos;
						var pxintervalo=msj.pxintervalo;
						var zonas=msj.zonas;
						var htmlintervalo="";
						for (var i = 0; i<intervalos.length; i++) {
							 htmlintervalo=`<div class="col-md-12" style="height:`+pxintervalo+`px;margin-top: 1px;text-align:center;">`+intervalos[i]+`</div>`;
							 $("#intervalos").append(htmlintervalo);
						}

						var htmlzonas="";
						var htmlespacio="";
						for (var i = 0; i <zonas.length; i++) {
							htmlzonas=` <div style="padding-top: 1em;width: 100px;height: 50px;font-weight:bold;text-align:center;">`+zonas[i].nombre+`</div>`;

							$("#zonasdiv").append(htmlzonas);

							htmlespacio=`<div id="espacio_`+zonas[i].idzona+`" style="width: 100px;text-align:center;"></div>`;

							$("#espacios").append(htmlespacio);

							var intervalos=zonas[i].intervalos;
							var htmlintervalos="";
								var servicioante="";
								for (var j = 0; j<intervalos.length; j++) {

									var servicio=intervalos[j].servicio;
									var titulo="Disponible";
									var colorfondo="background:#59c158;";
									var borderradiustop="border-right: 1px solid white;";
									var borderradiusbootom="";
									var servicioac="";
									marginbottom="margin-bottom: 1px;";
									margintop="margin-top: 1px;";
									if (intervalos[j].disponible==0) {
										
										colorfondo="background:"+zonas[i].color;
										servicioac=servicio[0].idservicio;
										titulo="";
										 marginbottom="";
										 margintop="";
											if (servicioante!=servicioac) {

													if (servicio.length) {
													
													titulo=servicio[0].horainicial+` - `+servicio[0].horafinal;
													titulo+=`<p>`+servicio[0].titulo+`<p>`;
													servicioante=servicio[0].idservicio;

												}
											}else{

											servicioante="";
											borderradiustop="";	
											borderradiusbootom=" border-bottom: 1px solid white;border-right: 1px solid white;";
											
											}

									}else{

									borderradiustop="border-right: 1px solid white;";
									borderradiusbootom=" border-bottom: 1px solid white;";

									}
								
								
									htmlintervalos=`<div style="height:`+pxintervalo+`px;`+colorfondo+`;`+margintop+marginbottom+`font-size:10px;`+borderradiustop+borderradiusbootom+`">`+titulo+`</div>`;
								$("#espacio_"+zonas[i].idzona).append(htmlintervalos);

								}

						}





						
					}

function ObtenerHorariosFecha(fecha) {

	var datos="fecha="+fecha;
	$.ajax({
					url: 'catalogos/dashboard/ObtenerHorariosFecha.php', //Url a donde la enviaremos
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

						var respuesta=msj.respuesta;

					

								for (var i = 0; i <respuesta.length; i++) {
									
									$(".fc-day").each(function( index ) {
									 // console.log( index + ": " + $(this).data('date') );
									  var fechadiv=$(this).data('date');
									 var elemento=$(this);
									
									  	if (respuesta[i].fecha == fechadiv) {
									  		
									  		$(elemento).children().eq(0).css({'cssText': 'background: gray !important;border-radius: 30px;color: white; cursor:pointer;margin: auto;width:20%;padding-right: 1em;padding-left:1em;justify-content:center;display:flex;'});

									  	}

									});
								}

						
					}
				});

}
function ObtenerHorariosFechaEspe(fecha) {
	var datos="fecha="+fecha;
	$.ajax({
					url: 'catalogos/dashboard/ObtenerHorariosFechaEspecifica.php', //Url a donde la enviaremos
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
	 $("#txttitle").css('display','block');
	     $(".horarios").css('display','block');

	 var dividirfecha=fecha.split('-');
	 var nueva=dividirfecha[2]+'/'+dividirfecha[1]+'/'+dividirfecha[0];
	 $("#txttitle").text('Horarios '+nueva)
						var respuesta=msj.respuesta;

					
								var html="";
								for (var i = 0; i <respuesta.length; i++) {
									html+=`

										  <li class="list-group-item" style="color:black;">
										  <p style="font-weight:bold;">`+respuesta[i].titulo+`</p>
										  <p>`+respuesta[i].horainicial+`-`+respuesta[i].horafinal+`</p>
										  <span>`+respuesta[i].nombre+`</span>
										  <div style="background:`+respuesta[i].color+`;border-radius:10px;width:10px;height: 10px;float: right;"></div>
										  </li>

									`;
							
								}
							$('.horarios').html(html);
					}
				});
}


function ListadoAlumnos() {
	


	$("#mostraralumnos").css('display','block');
}

function CerrarAlumnos() {
	$("#mostraralumnos").css('display','none');
}

function ListadoCoaches() {
	$("#mostrarcoaches").css('display','block');

	
}
function CerrarCoaches(argument) {
	$("#mostrarcoaches").css('display','none');

}

function CerrarServicios() {
	
	$("#mostrarservicios").css('display','none');

}

function ListadoServicios(argument) {

	$("#mostrarservicios").css('display','block');

}

function ObtenerHorariosDia(operacion){

	var datos="operacion="+operacion+"&fecha="+fechaconsulta;
		$.ajax({
					url: 'catalogos/dashboard/ObtenerHorariosFechaDia.php', //Url a donde la enviaremos
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
						PintarDia(msj);
				}
			});

}

function AbrirModalFecha() {
	
	$("#modalfecha").modal();
}

function BuscarFecha() {
	var fecha=$("#txtfechabuscar").val();
	var bandera=1;
	if (fecha=='') {
		bandera=0;
	}

	if (!isValidDate(fecha)) {
		bandera=0;
	}

	if (bandera==1) {
		fechaconsulta=fecha;
		ObtenerHorariosDia(3);
		$("#modalfecha").modal('hide');

	}else{

		alert('Selecciona una fecha válida')
	}
}
