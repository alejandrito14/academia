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
        on: {
          init: function (c) {

          	$(".calendar .toolbar").removeClass('toolbar-top');
          	$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
          	 $$('.calendar-prev-month-button').on('click', function () {

              CargarFechasRefrescar1(calendarInline);

           });
            
           $$('.calendar-next-month-button').on('click', function () {
           
              CargarFechasRefrescar1(calendarInline);

           });

             $$('.calendar-prev-year-button').on('click', function () {
            	
              CargarFechasRefrescar1(calendarInline);

           });
 			$$('.calendar-next-year-button').on('click', function () {            	
              CargarFechasRefrescar1(calendarInline);

           });

 			$(".calendar-day-today .calendar-day-number").css('cssText', 'background: #46b2e2!important');
 			var fechaac=new Date();
          	var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
         	var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
         	fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
          	ConsultarFecha(fecha);
          },
         calendarChange:function (c) {
         	//console.log(calendarInline.getValue());
         	//console.log(monthNames[c.currentMonth] + ', ' + c.currentYear);
         	var fechaac=new Date();
          	var mes=fechaac.getMonth();
         	var dia=fechaac.getDate();
         	fechaactualdata=fechaac.getFullYear()+'-'+ mes+'-'+dia;

          	var fecha=calendarInline.getValue();
          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var mesdata=convertirfecha.getMonth();

         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	var diadata=convertirfecha.getDate();

         	fecha=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
          	ConsultarFecha(fecha);
          	var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;
          	
          	$(".calendar-day-has-events").each(function( index ) {
						 var datafecha=$(this).data('date');
						 if (datafecha != fechaactualdata) {

						 	$(this).children().eq(0).css('cssText','background:#919191!important');
							
						 }

				});
          	$(".calendar-day").each(function( index ) {
						 var datafecha=$(this).data('date');
						 if (datafecha==fechadata && datafecha!= fechaactualdata) {

						 	$(this).children().eq(0).css('cssText', 'background: red!important');
							return 0;
						 }

				});

          },
        
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
		              <div class="col">
		           		 <p class="text-muted size-14 no-margin-bottom" style="font-weight:bold;">`+dividir[2]+`/`+dividir[1]+`/`+dividir[0]+ `</p>

		                <p class="text-muted size-14 no-margin-bottom">`+zona+`</p>
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

	var pagina="ObtenerFechasHorarios.php";
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
      var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar',
        weekHeader: true,
         events: eventos,
        firstDay:0,
        on: {
          init: function (c) {

          	$(".calendar .toolbar").removeClass('toolbar-top');
          	$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
        
             $$('.calendar-prev-month-button').on('click', function () {            	
              CargarFechasRefrescar2(calendarInline);

           });
              
           $$('.calendar-next-month-button').on('click', function () {
             
              CargarFechasRefrescar2(calendarInline);

           });

           $$('.calendar-prev-year-button').on('click', function () {
            	
              CargarFechasRefrescar2(calendarInline);

           });
 			$$('.calendar-next-year-button').on('click', function () {
            	
              CargarFechasRefrescar2(calendarInline);

           });

 			
           
         	 },
        
         calendarChange:function (c) {
         	//console.log(calendarInline.getValue());
         	//console.log(monthNames[c.currentMonth] + ', ' + c.currentYear);
          	var fecha=calendarInline.getValue();
          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	fecha=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
          	ConsultarFechaAdmin(fecha);

          },
        
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
