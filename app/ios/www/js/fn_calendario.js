var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function CargarFechas() {


	var idservicio=localStorage.getItem('idservicio');
	var datos="idservicio="+idservicio;
	var pagina="ObtenerFechasHorarios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
		var respuesta=datos.respuesta;
				var eventos=[];
				for (var i = 0; i <respuesta.length; i++) {
						
						var fecha=respuesta[i].fecha;
						var dividir=fecha.split('-');
						
						var anio=dividir[0];
						var mes=(dividir[1].replace(/^(0+)/g, '')-1);
						var dia=dividir[2];
						var color=respuesta[i].color;

						var objeto={
							date:new Date(anio,mes,dia),
							color:'rgb(255 255 255 / 10%)',
						};
						eventos.push(objeto);

					}


					
 
    let calendarInline;

      // Default
  
    
      // Inline with custom toolbar
      var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar',
        weekHeader: true,
         events: eventos,
        firstDay:0,

         renderToolbar: function () {
          return `
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

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
             // CargarFechasRefrescar1(calendarInline);

            });


 			$(".calendar-day-today .calendar-day-number").addClass('diaactual');
 			var fechaac=new Date();
          	var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
         	var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
         	fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
          	//ConsultarFecha(fecha);
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
          	ConsultarFecha(fecha1);
          	var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;

          		$(".calendar-day").each(function( index ) {
						 var datafecha=$(this).data('date');

						 if (datafecha==fechadata && datafecha!= fechaactualdata) {

						 	$(this).children().eq(0).addClass('seleccionado');
							//return 0;
						 }else{

						 $(this).children().eq(0).removeClass('seleccionado');

						 }

				});
          
      
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
             CargarFechasRefrescar1(calendarInline);

          }
          
        
        }
      });
   

  
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

}

function ConsultarFecha(fecha) {
	var idservicio=localStorage.getItem('idservicio');
	var datos="idservicio="+idservicio+"&fecha="+fecha;

	var id_user=localStorage.getItem('id_user');
	var pagina="ObtenerHorarios.php";

	var dividirfecha=fecha.split('-');
	var mes=dividirfecha[1].replace(/^(0+)/g, '');
	var anio=dividirfecha[0];
	$('.current-month-value').text(monthNames[mes-1] + ' ' + anio);

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
			

			var respuesta=respuesta.respuesta;
			PintarEventos(respuesta);
			//RefrescarFechas(fecha);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function ConsultarFecha2(fecha) {
	var idservicio=localStorage.getItem('idservicio');
	var datos="idservicio="+idservicio+"&fecha="+fecha;

	var id_user=localStorage.getItem('id_user');
	var pagina="ObtenerHorarios.php";

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
			

			var respuesta=respuesta.respuesta;
			PintarEventos(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function PintarEventos(resultado) {
	var html="";
	if (resultado.length>0) {

		for (var i = 0; i <resultado.length; i++) {
			var zona=resultado[i].nombre;
			var color=resultado[i].color;
			var fecha=resultado[i].fecha;
			var dividir=fecha.split('-');
			html+=`
				<div class="col-100 ">
		        <div class="card shadow-sm margin-bottom-half">
		          <div class="card-content card-content-padding">
		            <div class="row">
		              <div class="col-auto no-padding-horizontal">
		                <div  class="avatar avatar-40  text-color-white shadow-sm rounded-10-right" style="background:`+color+`;">
		                 <i class="bi bi-alarm-fill"></i>
		                </div>
		              </div>
		              <div class="col">`;
		              tachado="";
		              if (resultado[i].tachado==1) {
		              	tachado="text-decoration:line-through;";
		             
		              }
		           		html+= `
		           		<p class="text-muted size-14 no-margin-bottom" style="font-weight:bold;`+tachado+`">`+dividir[2]+`/`+dividir[1]+`/`+dividir[0]+ `</p>`;

		               html+=` <p class="text-muted size-14 no-margin-bottom">`+zona+`</p>

		                <p>Horario `+resultado[i].horainicial +` - `+ resultado[i].horafinal+`</p>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>


			`;
		}
	}
	$(".eventosfecha").html(html);
}

function CargarFechasRefrescar1(calendarInline) {
	var idservicio=localStorage.getItem('idservicio');
	var pagina="ObtenerFechasHorarios.php";
	var datos="idservicio="+idservicio;
	//console.log('ObtenerFechasHorarios: '+calendarInline.getValue());
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
		var respuesta=datos.respuesta;
				var eventos=[];
				
				calendarInline.params.events='';
				for (var i = 0; i <respuesta.length; i++) {
						
						var fecha=respuesta[i].fecha;
						var dividir=fecha.split('-');
						var anio=dividir[0];
						var mes=(dividir[1].replace(/^(0+)/g, '')-1);
						var dia=dividir[2];
						var color=respuesta[i].color;

						var objeto={
							date:new Date(anio,mes,dia),
							color:'rgb(255 255 255 / 10%)',
						};
						eventos.push(objeto);

					}
					calendarInline.params.events = eventos;
					calendarInline.update();
						

					$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');



            var fecha=calendarInline.getValue();
          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var mesdata=convertirfecha.getMonth();
         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	var diadata=convertirfecha.getDate();
         	fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;

          	var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;

			$(".calendar-day").each(function( index ) {
						 var datafecha=$(this).data('date');
						 if (datafecha==fechadata && datafecha!= fechaactualdata) {

						 	$(this).children().eq(0).addClass('seleccionado');
							//return 0;
						 }else{

						 $(this).children().eq(0).removeClass('seleccionado');

						 }

				});

		 	$(".calendar-day-today .calendar-day-number").css('cssText', 'background: #46b2e2!important;color:white;');

					//RefrescarFechas(fecha);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function CargarCalendarioAdmin() {
	GoToPage('calendarioadmin');
}
  
function CargarFechasAdmin(calendarInline) {
	
	
	var pagina="ObtenerFechasHorariosAdmin.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){
		var respuesta=datos.respuesta;
				var eventos=[];
				for (var i = 0; i <respuesta.length; i++) {
						
						var fecha=respuesta[i].fecha;
						var dividir=fecha.split('-');
						var anio=dividir[0];
						var mes=(dividir[1].replace(/^(0+)/g, '')-1);
						var dia=dividir[2];
						var color=respuesta[i].color;

						var objeto={
							date:new Date(anio,mes,dia),
							color:'rgb(255 255 255 / 10%)',
						};
						eventos.push(objeto);

					}


					
 
  

      // Default
  
    
      // Inline with custom toolbar
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar',
        weekHeader: false,
         events: eventos,
        firstDay:0,

         renderToolbar: function () {
          return `
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

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
             // CargarFechasRefrescar1(calendarInline);

            });


 			$(".calendar-day-today .calendar-day-number").css('cssText', 'background: #46b2e2!important;color:white;');
 			var fechaac=new Date();
          	var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
         	var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
         	fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
          	ConsultarFechaAdmin(fecha);
           
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
          	ConsultarFechaAdmin(fecha1);
          	var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;

          		$(".calendar-day").each(function( index ) {
						 var datafecha=$(this).data('date');

						 if (datafecha==fechadata && datafecha!= fechaactualdata) {

						 	$(this).children().eq(0).addClass('seleccionado');
							//return 0;
						 }else{

						 $(this).children().eq(0).removeClass('seleccionado');

						 }

				});
          

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
             CargarFechasRefrescar2(calendarInline);

          }
          
        
        }
      });
   
  
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function CargarFechasRefrescar2(calendarInline) {

	var pagina="ObtenerFechasHorariosAdmin.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){
		var respuesta=datos.respuesta;
				var eventos=[];
				calendarInline.params.events='';
				for (var i = 0; i <respuesta.length; i++) {
						
						var fecha=respuesta[i].fecha;
						var dividir=fecha.split('-');
						var anio=dividir[0];
						var mes=(dividir[1].replace(/^(0+)/g, '')-1);
						var dia=dividir[2];
						var color=respuesta[i].color;

						var objeto={
							date:new Date(anio,mes,dia),
							color:'rgb(255 255 255 / 10%)',
						};
						eventos.push(objeto);

					}
					calendarInline.params.events = eventos;
					calendarInline.update();
					$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');

            var fecha=calendarInline.getValue();
          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var mesdata=convertirfecha.getMonth();
         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	var diadata=convertirfecha.getDate();
         	fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;

          	var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;

			$(".calendar-day").each(function( index ) {
						 var datafecha=$(this).data('date');
						 if (datafecha==fechadata && datafecha!= fechaactualdata) {

						 	$(this).children().eq(0).addClass('seleccionado');
							//return 0;
						 }else{

						 $(this).children().eq(0).removeClass('seleccionado');

						 }

				});

		 	$(".calendar-day-today .calendar-day-number").css('cssText', 'background: #46b2e2!important;colo:white;');

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function ConsultarFechaAdmin(fecha) {
	var datos="fecha="+fecha;

	var id_user=localStorage.getItem('id_user');
	var pagina="ObtenerHorariosAdmin.php";

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
			

			var respuesta=respuesta.respuesta;
			PintarEventosAdmin(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarEventosAdmin(resultado) {
	var html="";
	if (resultado.length>0) {

		for (var i = 0; i <resultado.length; i++) {
			var zona=resultado[i].nombre;
			var color=resultado[i].color;
			var titulo=resultado[i].titulo;
			var coach=resultado[i].coach;
			var fecha=resultado[i].fecha;
			var dividirfecha=fecha.split('-');
			html+=`
				<div class="col-100 ">
		        <div class="card shadow-sm margin-bottom-half">
		          <div class="card-content card-content-padding">
		            <div class="row">
		              <div class="col-auto no-padding-horizontal">
		                <div  class="avatar avatar-40  text-color-white shadow-sm rounded-10-right" style="background:`+color+`;">
		                 <i class="bi bi-alarm-fill"></i>
		                </div>
		              </div>
		              <div class="col">
		             	<p class="text-muted size-14 no-margin-bottom"><span style="font-weight:bold;">`+dividirfecha[2]+'/'+dividirfecha[1]+'/'+dividirfecha[0]+`</span></p>

		            	<p class="text-muted size-14 no-margin-bottom"><span style="opacity:0.6;">`+titulo+`</span></p>`;
		            	
		            	for (var j = 0; j <coach.length ; j++) {

		            		html+=`<p class="no-margin-bottom"><span style="font-weight:bold;">Coach:</span> `+coach[j].nombre+` `+coach[j].paterno+`</p>`;
		            	}

		                html+=`<p class="text-muted size-14 text-color-theme no-margin-bottom" style=""><span  class="text-color-theme" style="">Lugar:</span> <span class="text-color-theme">`+zona+`</span></p>
		                <p style="font-weight:bold;"><span class="text-color-theme" >Horario:</span><span class="text-color-theme"> `+resultado[i].horainicial +` - `+ resultado[i].horafinal+`</span></p>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>


			`;
		}
	}
	$(".eventosfecha").html(html);
}

function RefrescarFechas(fechaelegida) {
			var fechaac=new Date();
          	var mes=fechaac.getMonth()+1;
         	var dia=fechaac.getDate();
         	fechaactualdata=fechaac.getFullYear()+'-'+ mes+'-'+dia;
         	console.log('fechaactual: '+fechaactualdata);
          	//var fecha=new Date(fechaelegida);
          	var convertirfecha=new Date(fechaelegida);
         
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var mesdata=(convertirfecha.getMonth() + 1);

         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	var diadata=convertirfecha.getDate();

         	fecha=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
          //	ConsultarFecha(fecha);
          	var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;
          	//$(".calendar-day-selected .calendar-day-number").css('cssText','background: none;');

          	
         /* $(".calendar-day-next").each(function( index ) {
			$(this).children().eq(0).css('cssText', 'background: none;');

          });*/

          /*$(".calendar-day-prev").each(function( index ) {
			$(this).children().eq(0).css('cssText', 'background: none;');

          });*/

         
/*
          $(".calendar-day").each(function( index ) {
          			 var datafecha=$(this).data('date');

						 if (datafecha != fechaactualdata) {

							 	if (!$(this).hasClass('calendar-day-prev') && !$(this).hasClass('calendar-day-next')) {

							 		$(this).children().eq(0).css('cssText', 'background: none;color:black;');

						
							 }else{
						 		$(this).children().eq(0).css('cssText', 'background: none;color:#b8b8b8;');


						 	}
						


							if ($(this).hasClass("calendar-day-has-events")) {

									 var datafecha=$(this).data('date');
									 if(datafecha != fechaactualdata) {

									 	$(this).children().eq(0).css('cssText','background:#919191;color:white;');
										
									 }

									 if($(this).hasClass("calendar-day-selected")) {
									 	console.log('a');

									 	$(this).children().eq(0).css('cssText','background:red!important;color:white;');

									 }
							}else{


									 if($(this).hasClass("calendar-day-selected")) {
							

									 	$(this).children().eq(0).css('cssText','background:red!important;color:white;');

									 }
							}




						}


				});*/

          /*	$(".calendar-day-has-events").each(function( index ) {
						 var datafecha=$(this).data('date');
						 if (datafecha != fechaactualdata) {

						 	$(this).children().eq(0).css('cssText','background:#919191');
							
						 }

				});*/
        /*  	$(".calendar-day").each(function( index ) {
						 var datafecha=$(this).data('date');

						 if ($(this).hasClass('calendar-day-has-events')) {
						 	console.log(datafecha+'=='+fechadata);
						 if (datafecha==fechadata && datafecha!= fechaactualdata) {

						 	$(this).children().eq(0).css('cssText', 'background: red');
							return 0;
						 }
						}

				});*/

/*   	$(".calendar-day-selected .calendar-day-number").css('cssText', 'background: #none!important;color:none;');
*/ 	/*$(".calendar-day-today .calendar-day-number").css('cssText', 'background: #46b2e2!important');*/
//$(".calendar-day-today .calendar-day-number").css('cssText', 'background: #46b2e2');
}


function ConsultarTodosHorarios() {
	var idservicio=localStorage.getItem('idservicio');
	var datos="idservicio="+idservicio;

	var id_user=localStorage.getItem('id_user');
	var pagina="ObtenerTodosHorarios.php";

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
			

			var respuesta=respuesta.respuesta;
			PintarEventos(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function MostrarHorarios() {
	var html="";


html+=`	<div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
              <div class="iconocerrar link sheet-close" style="z-index:100;">
	 									<span class="bi bi-x-circle-fill"></span>
	   						    	 </div>

              <div class="" style="height: 100%;">
                   <div class="row">
	   						     <div class="col-20">
	   						      	
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal"></span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
                				<div class="page-content" style="background: white; height: 100%;width: 100%;border-radius: 20px;">
   						
   							 		<div class="" style="position: absolute;top:2em;width: 100%;">
   							 	
	   							  	<div class="">
		   										

		   							`;

		   				html+=`
								<div class="row padding-vertical"><h2 style="text-align: center;font-size: 18px;" id="tituloservicio" class="tituloservicio"> </h2>
								 <h3 class="fechasservicio" style=" text-align: center;font-weight: bold; 
									    color: #919191;font-size: 16px;"></h3>
								</div>
									  
								<div class="">
									<div id="demo-calendar" style="margin-left: 1em;margin-right: 1em;"></div>
								</div>

									      <div class="row eventosfecha padding-vertical">
									        

									      </div>

										`;
								             
		   							 html+=`	</div>
	   							 	</div>
   							 </div>
		   				</div>
		                
		              </div>
		            </div>
		          </div>`;
	 var dynamicSheet2 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           // CargarFechas();

   			ConsultarTodosHorarios();
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet2.open();


}
