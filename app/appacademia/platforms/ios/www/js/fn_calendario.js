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
						console.log(dividir);
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
          },
         calendarChange:function (c) {
         	//console.log(calendarInline.getValue());
         	//console.log(monthNames[c.currentMonth] + ', ' + c.currentYear);
          	var fecha=calendarInline.getValue();
          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	fecha=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
          	ConsultarFecha(fecha);

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