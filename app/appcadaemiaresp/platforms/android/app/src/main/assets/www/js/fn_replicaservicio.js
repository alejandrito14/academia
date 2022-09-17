let calendarInline2="";
var fechasglobal="";
function ReplicaServicio() {
	GoToPage('replicaservicio');
}
function CargarCalendario() {
	// Inline with custom toolbar
      var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline2 = app.calendar.create({
        containerEl: '#demo-calendar',
        weekHeader: true,
        // events: eventos,
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
              calendarInline2.prevMonth();
             // CargarFechasRefrescar1(calendarInline);
             HorariosDiasCalendario();
            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline2.nextMonth();
             // CargarFechasRefrescar1(calendarInline);
             HorariosDiasCalendario();
            });


 			$(".calendar-day-today .calendar-day-number").addClass('diaactual');
 			var fechaac=new Date();
          	var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
         	var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
         	fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
          	//ConsultarFechaDisponibles(fecha);
          },
          calendarDayClick:function(c){

        	
		calendarInline2.on('calendarChange()');
          },
         calendarChange:function (c) {
         
         	var fechaac=new Date();
          	var mes=fechaac.getMonth()+1;
         	var dia=fechaac.getDate();
         	fechaactualdata=fechaac.getFullYear()+'-'+ mes+'-'+dia;

          	var fecha=calendarInline2.getValue();


          	var convertirfecha=new Date(fecha);
          	var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
         	var mesdata=convertirfecha.getMonth();

         	var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
         	var diadata=convertirfecha.getDate();

         	fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
          
      	ConsultarHorariosDisponiblesCalendario(fecha1);
         
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
          
          }
          
        
        }
      });
   

}

function ConsultarHorariosDisponiblesCalendario(fecha) {
	

	var date=fecha.split('-');
	fechaformato=date[2]+'-'+date[1]+'-'+date[0];
	
	if(BuscarfechaArray(fecha)){

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
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
              <div class="page-content" style="height: 100%;">
                <div style="background: white; height: 100%;width: 100%;border-radius: 20px;">
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
   							 <div class="" style="position: absolute;top:1em;width: 100%;">
   							 	
	   							  <div class="">
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">
		   	
		   							 		<div class="card-content ">
		   							 		<div class="row">
			   							 		<div class="col-100">
			   							 			<p style="text-align: center;font-size: 16px;font-weight: bold;margin-bottom:1em;">Horarios disponibles `+fechaformato+`</p>
			   							 		</div>
		   							 		<div class="col-100">
			   							 		<div class="row">
				   							 		<div class="col-100">
				   							 		</div>
				   							 		<div class="col-100">
				   							 		</div>
			   							 		</div>
		   							 		<div class="row">
		   							 			<div class="col">
		   							 			<div class="colocartodoshorarios"></div>
		   							 					</div>
		   							 				</div>
		   							 			</div>
		   							 		</div>

		   							 		</div>
		   							 		<div class="row" >
		   							 			<div id="horarios" class="page-content" style="overflow: scroll;height: 20em;"></div>
		   							 			<a style="    border-radius: 10px;
    height: 60px;" class="button button-fill button-large button-raised margin-bottom color-theme" id="btnguardarhorarios" onclick="GuardarHorarios()"><div class="fab-text">Guardar</div></a>
		   							 		</div>
		   					

										</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet1 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: false,
        // Events
        on: {
          open: function (sheet) {
            console.log('Sheet open');

           var htmlhorarios="";
	  HorariosDiasCalendarioFecha(date).then(r => {
 				
			  	if (r.length>0) {
			  		
			  		for (var i = 0; i < r.length; i++) {

			  			for (var j =0; j < r[i].horasposibles[0].length; j++) {
			  				
			  			if (r[i].horasposibles[0][j].disponible==1 && r[i].horasposibles[0][j].horafinal!=null) {
			  				var fecha=r[i].fecha.split('-');
			  				var fechaformada=fecha[2]+'-'+fecha[1]+'-'+fecha[0];
			  			htmlhorarios +=`
			  			<div class="col-100 ">
				        <div class="card shadow-sm margin-bottom-half inputdia" id="`+fechaformada+'-'+r[i].horasposibles[0][j].horainicial.slice(0,5)+`-`+r[i].horasposibles[0][j].horafinal.slice(0,5) +'-'+r[i].idzona+`" >
				          <div class="card-content card-content-padding">
				            <div class="row">
				              <div class="col-auto no-padding-horizontal">
				                <div class="avatar avatar-40  text-color-white shadow-sm rounded-10-right" style="background:`+r[i].color+`;">
				                 <i class="bi bi-alarm-fill"></i>
				                </div>
				              </div>
				              <div class="col">
				           		 <p class="text-muted size-14 no-margin-bottom" style="font-weight:bold;">`+fechaformada+`</p>

				                <p class="text-muted size-14 no-margin-bottom">`+r[i].nombrezona+`</p>
				                <p>Horario `+r[i].horasposibles[0][j].horainicial.slice(0,5)+` - `+r[i].horasposibles[0][j].horafinal.slice(0,5) + `</p>
				              </div>
				              <div class="col-20">

				              <span class="bi bi-check-lg" id="ch_`+fechaformada+'-'+r[i].horasposibles[0][j].horainicial.slice(0,5)+`-`+r[i].horasposibles[0][j].horafinal.slice(0,5) +'-'+r[i].idzona+`"  style="display:none;"  ></span>
				              </div>
				            </div>
				          </div>
				        </div>
				      </div>

			  			`;
			  				}
			  			}
			  		}
			  	$("#horarios").html(htmlhorarios);
			  	 CargarEventoSeleccionador();


			  	}
			  	
			 });

          },
          opened: function (sheet) {
          
 
            
          },
          closed:function(sheet){
          	Resumenfechas();

          },
        }
      });

       dynamicSheet1.open();
   }
}

function BuscarfechaArray(fecha) {
	
	if (fechasglobal.length>0) {
		encontrado=false;

		for (var i = 0; i <fechasglobal.length; i++) {
			
			if (fechasglobal[i].fecha==fecha) {
				encontrado=true;
				return true;
			}

		}

		return encontrado;

	}else{

		return false;
	}
}

function ObtenerServiciosReplica() {
	
	$.ajax({
					url: urlphp+'ObtenerServicios.php', //Url a donde la enviaremos
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

						 var respuesta=msj.respuesta;
						PintarServiciosReplica(respuesta);
						

					}
				});

}

function PintarServiciosReplica(respuesta) {
	var html="";
	html+=`
				<option value="0">Seleccionar servicio</option>
			`;

	if (respuesta.length>0) {

		for (var i = 0; i < respuesta.length; i++) {
			html+=`
				<option value="`+respuesta[i].idservicio+`">`+respuesta[i].titulo+`</option>
			`;

		}
	}

	$("#serviciosreplica").html(html);
}

function DesplegarCalendario() {
	HorariosDiasCalendario();
	 arraydiaselegidos=[];
	 arraydiaseleccionados=[];
	var titulo=$("#serviciosreplica option:selected").html();
	$("#v_titulo").val('COPIA '+titulo);

}
function HorariosDiasCalendario() {
	var idservicio=$("#serviciosreplica").val();
	var mes=(calendarInline2.currentMonth+1)>9?(calendarInline2.currentMonth+1):'0'+(calendarInline2.currentMonth+1);
	var anio=calendarInline2.currentYear;
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
						 calendarInline2.setYearMonth(anioinicial, mesinicial, 2);
						 calendarInline2.params.events = eventos;
						calendarInline2.update();
						 $(".calendar-day-today .calendar-day-number").addClass('diaactual');


						}else{

							alerta('','No se encuentran horarios disponibles dentro del periodo');
							//AbrirNotificacion('No se encuentran horarios disponibles dentro del periodo','mdi mdi-alert-circle');
					
						}
						$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');

						

					}
				});

}


function HorariosDiasCalendarioFecha(fechaseleccionada) {
	console.log(fecha);

	return new Promise((resolve, reject) => {

	var idservicio=$("#serviciosreplica").val();

	//var date=fecha.split(',');
	fechaformato=fechaseleccionada[0]+'-'+fechaseleccionada[1]+'-'+fechaseleccionada[2];
	var fecha=fechaformato;

	var datos="idservicio="+idservicio+"&fecha="+fecha;

	$.ajax({
					url: urlphp+'ObtenerDiasHorasDisponibles.php', //Url a donde la enviaremos
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
						 resolve(respuesta);

					}
				});

	});

}


function GuardarReplica() {
	var general='';
	var costos='';
	var v_politicasmensajes='';
	var v_reglas='';
	var v_coachs='';
	$(".liservicio").removeClass('requerido');
	$(".lititulo").removeClass('requerido');
	$(".liselecciona").removeClass('requerido2');
	var titulonuevo=$("#v_titulo").val();
	var fechainicial='';
	var fechafinal='';
	var iduser=localStorage.getItem('id_user');
	var iduser=localStorage.getItem('id_user');
	var idtipousuario=localStorage.getItem('idtipousuario');
	var idservicio=$("#serviciosreplica").val();		
	var idalumnos="";
	var sabado="";
	var Viernes="";
	var jueves="";
	var miercoles="";
	var martes="";
	var lunes="";
	var domingo="";
	var bandera=1;
	if (idservicio==0) {
			bandera=0;
		}
	if (titulonuevo=='') {
			bandera=0;
		}
	if (arraydiaselegidos.length==0) {
			bandera=0;
		}


	if (bandera==1) {
	var datos="titulonuevo="+titulonuevo+"&general="+general+"&costos="+costos+"&v_politicasmensajes="+v_politicasmensajes+"&v_reglas="+v_reglas+"&v_coachs="+v_coachs+"&idservicio="+idservicio+"&v_arraydiaselegidos="+arraydiaselegidos+"&idalumnos="+idalumnos;
	datos+="&v_sabado="+sabado+"&v_viernes="+Viernes+"&v_jueves="+jueves+"&v_miercoles="+miercoles+"&v_martes="+martes+"&v_lunes="+lunes+"&v_domingo="+domingo;
	datos+="&v_fechainicial="+fechainicial+"&v_fechafinal="+fechafinal;
	datos+="&iduser="+iduser+"&idtipousuario="+idtipousuario;

	GuardarServicioClonado(datos);

	}
	else{
		if (idservicio==0) {
	bandera=0;
		$(".liservicio").addClass('requerido');	
		}
	if (titulonuevo=='') {
		bandera=0;
			$(".lititulo").addClass('requerido');
		}
	if (arraydiaselegidos.length==0) {
			bandera=0;
		$(".liselecciona").addClass('requerido2');

		}
		if (bandera==0) {
          		alerta('','Datos incompletos');
		}

	}
		

}

function GuardarServicioClonado(datos) {
	$.ajax({
					url: urlphp+'GuardarServicioClonado.php', //Url a donde la enviaremos
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
						var resp=msj.respuesta;
						if (resp==1) {

							if (localStorage.getItem('idtipousuario')==0) {
								GoToPage('homeadmin');
							}
							
							if (localStorage.getItem('idtipousuario')==0) {
								GoToPage('homecoach');
							}

							alerta('','Se replicó servicio exitosamente');
							
						}


					}
				});
}
