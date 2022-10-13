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
	$('#picker').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
        },
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
           console.log('Has hecho click en: '+ date);
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

            var fecha=anio+'-'+mes+'-'+dia;

            ObtenerHorariosFechaEspe(fecha);
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
       var moment = $('#picker').fullCalendar('getDate');
       var anio=moment.getFullYear();
           var mes=moment.getMonth()+1;
           var dia=moment.getDate();
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
     var moment = $('#picker').fullCalendar('getDate');
        var anio=moment.getFullYear();
           var mes=moment.getMonth()+1;
           var dia=moment.getDay();
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