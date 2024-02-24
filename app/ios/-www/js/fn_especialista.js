var fecha1="";
var arrayhorarios=[];
function ObtenerdetalleEspecialista() {
		var idespecialista=localStorage.getItem('idespecialista');
		var datos='idespecialista='+idespecialista;
		var pagina = "ObtenerdetalleEspecialista.php";
		
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			var calificaciones=datos.calificaciones;
			PintarDatosEspecialista(respuesta,calificaciones);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					}
		});
}
function PintarDatosEspecialista(respuesta,calificaciones) {
	var datos=respuesta[0];
	localStorage.setItem('idespecialista',datos.idespecialista);
	$(".tituloespecialista").html(datos.nombre+' '+datos.paterno);
	$(".descripcionespecialista").html(datos.descripcionespecialista);
	$("#btndisponibilidad").attr('onclick','VerDisponibilidad()');
				if (datos.foto!='' && datos.foto!=null && datos.foto!='null') {

							urlimagen=urlphp+`upload/perfil/`+datos.foto;
							
							}else{


							if (datos.sexo=='M') {

								urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
																					
									}else{
										urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
																								
									}
							}

					$(".imagenespecialista").attr('src',urlimagen);
					if (calificaciones.length==0) {

						$(".divtitulocalificaciones").css('display','none');
	
					}
					PintarCalificaciones(calificaciones);

}

function PintarCalificaciones(respuesta) {
	var html="";
		if (respuesta.length>0) {
						for (var i = 0; i <respuesta.length; i++) {
												   					
								var calificacion=respuesta[i].calificacion;

												html+=`

												<li style="margin-top: 1em;">
										    <div class="item-content">

										    <div class="">
												<div class="">
													<div class="">
														<p style="margin:0;margin-left: 5px;font-weight: bold;">`+respuesta[i].nombre+` `+respuesta[i].paterno+`</p>
														<div class="row" style="">

													`;


													for (var j = 0; j <5; j++) {

															var color="";

															if (j<calificacion) {
																color="colorestrella";
															}
																				
														html+=`
															<div class="col" >
									           	<div>
									             <span  id="estre_1"  style="font-size:20px;" class="`+color+`">
									             <span class="material-icons-outlined">
																star
																</span>
																</span>
										     			 <div class="oculto">
										             <input type="checkbox"  id="che_1" >
										                	</div>
									                	</div>
									               </div>

																`;
														}

											html+=	`
              			  </div>
                		<p style="margin:0;margin-left: 5px;">`+respuesta[i].comentario+`</p>
                </div>
								</div>
								<div class="item-subtitle"></div>
								<div class="item-text"></div>
							</div>
							</div>
																
						</li>
						`;

						}
					}

					$(".calificacionespecialistas").html(html);
}

function VerDisponibilidad() {

	GoToPage('disponibilidadespecialistaelegido');

}

function ObtenerPaquetesEspecialista() {
		var idespecialista=localStorage.getItem('idespecialista');
		var idsucursal=localStorage.getItem('idsucursal');
		var datos='idespecialista='+idespecialista+"&idsucursal="+idsucursal;
		var pagina = "ObtenerpaquetesEspecialista.php";
		
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			async:false,
			data:datos,
			success: function(resp){
				var respuesta=resp.respuesta;
					PintarPaquetesEspecialista(respuesta);
								
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					}
		});

	
}
function CargarCalendario4() {

	//todos los dias que no tengan disponibilidad se bloqueen
	//color negro lo disponible 
	//al darle click colocar en botones los paquetes
	//al seleccionar un producto colocar los horarios solo la hora inicial distinguir am y pm
  var paqueteid=0;
  var fecha=new Date();
  var anio = fecha.getFullYear();
  var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);

  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=localStorage.getItem('idespecialista');
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio;

  var pagina = "ObtenerFechasEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];
      if (resp.disponible.length>0) {
        var disponible=resp.disponible;

        for (var i =0; i < disponible.length; i++) {
            var fecha=disponible[i];
              var dividirfecha=fecha.split('-');
              var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
              
             var anio=dividirfecha[0];
            var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
            var dia=dividirfecha[2];
          
            var objeto={
              date:new Date(anio,mes,dia),
              color:'rgb(245,212,95)',
            };
              eventos.push(objeto);
        }
      }

       if (resp.nodisponible.length>0) {

       		 var nodisponible=resp.nodisponible;

        for (var i =0; i <nodisponible.length;i++) {
           
            var fecha=nodisponible[i];
            var dividirfecha=fecha.split('-');
            var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
              
            var anio=dividirfecha[0];
            var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
            var dia=dividirfecha[2];
          
            var objeto={
              date:new Date(anio,mes,dia),
              color:'rgb(245,212,95)',
            };
              nodisponiblejs.push(objeto);
        }

       }

		 var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar-inline-container',
        weekHeader: true,
        events: eventos,
        disabled: nodisponiblejs,
        firstDay:0,
        dateFormat: 'dd/mm/yyyy',
        renderToolbar: function () {
          return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a  class="link icon-only"><i class="icon icon-back"></i></a>' +
            '</div>' +
            '<div class="center"></div>' +
            '<div class="right">' +
            '<a  class="link icon-only"><i class="icon icon-forward"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>';
        },
        on: {
          init: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
            $('.calendar-custom-toolbar .left .link').on('click', function () {
              calendarInline.prevMonth();
            	RefrescarFechasEspecialista(c);

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
            	RefrescarFechasEspecialista(c);

            });
          },

           calendarChange:function (c) {
          console.log(c.value);
            var fecha=c.value;


            var convertirfecha=new Date(fecha);
            var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
          var mesdata=convertirfecha.getMonth();

          var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
          var diadata=convertirfecha.getDate();

          fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
           
           // ConsultarFechaEspecialista(fecha1);
           
           ObtenerPaquetesEspecialista();
       		$(".divpintarhorarios").html('');
      	    $(".divhorarios").css('display','none');

      		horaseleccionada="";
      		HabilitarBoton();

          },

          monthYearChangeStart: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
          }
        }
      });

  			     $(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
                 $(".calendar-day-event").css('display','none');
                 $(".calendar-day-weekend .calendar-day-number").addClass('nodisponible');



       },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
    
}




function ConsultarFechaEspecialista(idpaquete,costo) {

	var consulta=0;

		if ($("#paquete_"+idpaquete).hasClass('sinseleccionar')) {
			$(".servicioscalendario").removeClass('seleccionado');
			$(".servicioscalendario").addClass('sinseleccionar');

			$("#paquete_"+idpaquete).removeClass('sinseleccionar');
			$("#paquete_"+idpaquete).addClass('seleccionado');
			consulta=1;
			localStorage.setItem('idpaquete',idpaquete);
		    localStorage.setItem('precio',costo);

		}else{

			$("#paquete_"+idpaquete).removeClass('seleccionado');
			$("#paquete_"+idpaquete).addClass('sinseleccionar');
			consulta=0;
			localStorage.setItem('idpaquete',0);
		    localStorage.setItem('precio',0);

		}
	
		var idespecialista=localStorage.getItem('idespecialista');
		var idsucursal=localStorage.getItem('idsucursal');
		var datos='idespecialista='+idespecialista+"&idsucursal="+idsucursal+"&fecha="+fecha1+"&idpaquete="+idpaquete;
		var pagina = "ObtenerHorasdeFechaEspecifica.php";
		
		if (consulta==1) {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			async:false,
			data:datos,
			success: function(resp){
				horaseleccionada="";
				var disponiblehoras=resp.disponible;
				arrayhorarios=resp.arraydisponible;
				PintarDisponibleHoras(disponiblehoras);
				HabilitarBoton();

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					}
		});
	}else{

		arrayhorarios=[];
		$(".divhorarios").css('display','none');
		horaseleccionada="";
		HabilitarBoton();
	}

}

function PintarDisponibleHoras(respuesta) {
	var html="";
		$(".divhorarios").css('display','none');

	if (respuesta.length>0) {
		$(".divhorarios").css('display','block');

		html+=`<div class="">`;
		for (var i = 0; i <respuesta.length; i++) { 
			html+=`<a class=" button button-fill button-small button-round horariossele sinseleccionarhora" style="" onclick="SeleccionarHorario(`+i+`)" id="horario_`+i+`">`+respuesta[i]+`</a>`;
		}

		html+=`</div>`;
	}


	$(".divpintarhorarios").html(html);
}

var horaseleccionada="";
function SeleccionarHorario(i) {
	
		if ($("#horario_"+i).hasClass('sinseleccionarhora')) {
			$(".horariossele").removeClass('seleccionadohora');
			$(".horariossele").addClass('sinseleccionarhora');

			$("#horario_"+i).removeClass('sinseleccionarhora');
			$("#horario_"+i).addClass('seleccionadohora');
		   horaseleccionada=arrayhorarios[i];

		}else{
			horaseleccionada="";

			$("#horario_"+i).removeClass('seleccionadohora');
			$("#horario_"+i).addClass('sinseleccionarhora');
		}

	HabilitarBoton();


}

function HabilitarBoton() {
	var fecha=  localStorage.getItem('fecha');

	if (fecha!='') {
		$(".btncontinuarcita").css('display','block');

	}else{
		$(".btncontinuarcita").css('display','none');

	}
}


function PintarPaquetesEspecialista(respuesta) {
	var html="";
	$(".divservicios").css('display','none');

	if (respuesta.length>0) {

		$(".divservicios").css('display','block');
			html+=`<div class="">`;

			for (var i = 0; i <respuesta.length; i++) {
			html+=`<div class="  servicioscalendario sinseleccionar" onclick="ConsultarFechaEspecialista(`+respuesta[i].idpaquete+`,'`+respuesta[i].costo+`')" style="" id="paquete_`+respuesta[i].idpaquete+`">`+respuesta[i].nombrepaquete+
			`<p style="margin:0px;"> $`+respuesta[i].costo+`</p>
			 <p style="margin:0px;">`+respuesta[i].intervaloservicio+`min.</p>
			</div>`;
			}

			html+=`</div>`;
	}

	$(".divpintarservicios").html(html);
}


function AgendarCita3() {
      app.dialog.confirm('','¿Seguro que desea agendar una cita?' , function () {

   var idpaquete=localStorage.getItem('idpaquete');
   var idsucursal=localStorage.getItem('idsucursal');
   var horario=horaseleccionada.horainicial+'_'+horaseleccionada.horafinal;
   var fecha=horaseleccionada.fecha;
   var idusuario=localStorage.getItem('id_user');
   var idespecialista=localStorage.getItem('idespecialista');
   var costo=localStorage.getItem('precio');
   var cantidad=1;
   var datos="idpaquete="+idpaquete+"&idsucursal="+idsucursal+"&horario="+horario+"&fecha="+fecha+"&idusuario="+idusuario+"&idespecialista="+idespecialista+"&costo="+costo+"&cantidad="+cantidad;
   var pagina = "GuardarCita.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var cita=resp.cita[0];

      /*var html="";
        html+=`
        <p>Gracias</p>
        <p>Tu cita quedó agendada para el dia
       `+cita.fecha+` a las `+cita.horainicial+` con `+cita.nombre+` `+cita.paterno+`</p>
      `;
*/
      var html="";
        html+=`
        <p>¡Gracias!</p>
        <p>
      Tu cita ha sido agregada para el dia `+cita.fecha+` a las `+cita.horainicial+` con `+cita.nombre+` `+cita.paterno+`</p>
      <p>Para confirmar tu cita, realiza tu pago
      </p>
      `;

      var funcion="";
      funcion+=`
        <span class="dialog-button" id="btniracarrito" onclick="CerrarModalD()">Cerrar</span>
      `;
      GoToPage('carrito');

      CrearModalAviso(html,funcion);
      
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

var arraymes=['01','02','03','04','05','06','07','08','09','10','11','12'];

function RefrescarFechasEspecialista(valor) {
  var mes = calendarInline.currentMonth;
  var anio = calendarInline.currentYear;
  var mes=(mes + 1)<10?'0'+(mes + 1):(mes + 1);
  var paqueteid=0;
  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=localStorage.getItem('idespecialista');
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio;

  var pagina = "ObtenerFechasEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];
      if (resp.disponible.length>0) {
        var disponible=resp.disponible;

        for (var i =0; i < disponible.length; i++) {
            var fecha=disponible[i];
              var dividirfecha=fecha.split('-');
              var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
              
             var anio=dividirfecha[0];
            var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
            var dia=dividirfecha[2];
          
            var objeto={
              date:new Date(anio,mes,dia),
              color:'rgb(245,212,95)',
            };
              eventos.push(objeto);
        }
      }

       if (resp.nodisponible.length>0) {

       		 var nodisponible=resp.nodisponible;

        for (var i =0; i <nodisponible.length;i++) {
           
            var fecha=nodisponible[i];
            var dividirfecha=fecha.split('-');
            var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
              
            var anio=dividirfecha[0];
            var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
            var dia=dividirfecha[2];
          
            var objeto={
              date:new Date(anio,mes,dia),
              color:'rgb(245,212,95)',
            };
              nodisponiblejs.push(objeto);
        }

       }


         calendarInline.params.events = eventos;
         calendarInline.params.disabled = nodisponiblejs;

		 calendarInline.update();
		  		$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
                 $(".calendar-day-event").css('display','none');
                 $(".calendar-day-weekend .calendar-day-number").addClass('nodisponible');


       },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
	//var nextMonthIndex = currentMonth.getMonth() + 1;
}