//var calendarInline2;
var fechasglobal;
function ReplicaServicio() {
	GoToPage('replicaservicio');
}

function funcionFechaFlecha() {
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
	HorariosDiasCalendario(1);
	}
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
            	
             funcionFechaFlecha();
             
            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline2.nextMonth();
             // CargarFechasRefrescar1(calendarInline);
            // HorariosDiasCalendario();
             funcionFechaFlecha();
            });


 			$(".calendar-day-today .calendar-day-number").addClass('diaactual');
 			var fechaac=new Date();
          	var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
         	var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
         	fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
          	//ConsultarFechaDisponibles(fecha);
          },
          calendarDayClick:function(c){

        	
			$(".calendar-day-has-events").each(function(){
				$(this).removeClass('calendar-day-selected');
			
			});
			
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
		   							 		<label style="text-align:center;">Filtrar por espacio:</label>
		   							 		 <select name="v_zonafiltro" style="text-align:center;background: #c6c6c6;margin-right: 1em;margin-left: 1em;margin-bottom: 1em;" id="v_zonafiltro" onchange="FiltrarPorZona()"></select>
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
		   							 			<div id="horarios" class="page-content" style="overflow: scroll;height: 30em;"></div>
		   							 			
		   							 		</div>
		   					

										</div>

	   							 	</div>

   							 </div>

   				</div>
                
                 <div class="fab  fab-right-bottom ">
                <a style="" class=" color-theme" id="btnguardarhorarios" onclick="GuardarHorarios()">
                <i class="bi bi-check-circle-fill"></i>
                </a></div>
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
			  			
			  				var fechaformada2=fecha[2]+'-'+fecha[1]+'-'+fecha[0]+'-'+r[i].horasposibles[0][j].horainicial.slice(0,5)+`-`+r[i].horasposibles[0][j].horafinal.slice(0,5) +'-'+r[i].idzona;

			  				if (!BuscarfechaenArrayElegidos(fechaformada2)) {

			  			htmlhorarios +=`
			  			<div class="col-100 horarios zonadiv_`+r[i].idzona+`">
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
			  		}
			  	$("#horarios").html(htmlhorarios);
			  	 CargarEventoSeleccionador();


			  	}
			  	
			 }).then(r => {

			 	ObtenerTodasZonas();
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
	HorariosDiasCalendario(0);
	 arraydiaselegidos=[];
	 arraydiaseleccionados=[];
	var titulo=$("#serviciosreplica option:selected").html();
	$("#v_titulo").val('COPIA '+titulo);
		app.dialog.close();
		$(".calendario").css('display','block');

	}else{


		alerta('','Falta por completar campos');
	}

}
function HorariosDiasCalendario(flecha) {
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
						 if (flecha==0) {
						 calendarInline2.setYearMonth(anioinicial, mesinicial, 2);
						}
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
          	if (Validacion()==1) {

          			var idusuarios=[];
					if($(".lista_").length) {
						$(".lista_" ).each(function( index ) {
							var id=$(this).attr('id');
							var dividir=id.split('_')[1];
							
						  	if($("#idusuarios_"+dividir).is(':checked')) {
						  		idusuarios.push(dividir);
						  	}
						});
					}

			if (idusuarios.length>0 && arraydiaselegidos.length>0) {
          		  ValidacionHorario().then(r => {

          		  	if (r.usuariosnoagregados.length>0) {
          		  		var usuariosnoagregados=r.usuariosnoagregados;
          		  		var html="";
          		  		var idu=0;
          		  		
						for (var i = 0; i <usuariosnoagregados.length; i++) {
							var idservicioc=0;
							if (idu!=usuariosnoagregados[i].idusuarios) {
								idu=usuariosnoagregados[i].idusuarios;
							html+=`<span>Usuario: `+usuariosnoagregados[i].usuario+`
							no se pudo asignar, ya que se encuentra asignado a 
							</span>`;

							
							}

							var serviciosasignados=usuariosnoagregados[i].servicioscruzados;

			 				for (var j =0; j < serviciosasignados.length; j++) {

			 					//if (idservicioc!=serviciosasignados[j].idservicio && idu==usuariosnoagregados[i].idusuarios) {
									//	idservicioc==serviciosasignados[j].idservicio;

			 					html+=`<p>`+serviciosasignados[j].titulo+`</p>`
			 					//}
			 				}

			 				
			 				html+=`</br>`;
						}

						alerta(html,'No se pudieron asignar los siguientes usuarios');
          		  	}else{	

          		  		if (arraydiaselegidos.length>0) {
          		  		GuardarservicioNuevoClonado();
          		  		
          		  		}else{
          		  			alerta('Falta agregar horarios al servicio','');
          		  		}
          		  	}

          		  });
          		}else{

          			if (arraydiaselegidos.length>0) {
          			GuardarservicioNuevoClonado();
          		
          			}else{

          		  		alerta('Falta agregar horarios al servicio','');
          		  		}
          		}
          	
          		
          
          	}else{
          		alerta('','Datos incompletos');
          	}
          }



        },
          verticalButtons: false,
        }).open();

}

function ModalPregunta() {
	

 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                <span>¿Desea cancelar la replica?</span>
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
          	if (localStorage.getItem('idtipousuario')==5) {
             	GoToPage('homecoach');

             }
             if (localStorage.getItem('idtipousuario')==0) {
             	GoToPage('homeadmin');

             }
          }



        },
          verticalButtons: false,
        }).open();


}
/*
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
							
							if (localStorage.getItem('idtipousuario')==5) {
								GoToPage('homecoach');
							}

							alerta('','Se replicó servicio exitosamente');
							
						}


					}
				});
}
*/

function GuardarservicioClon()
{


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
          	if (Validacion()==1) {
          			if(ValidacionHorario()==1) {
          				//GuardarservicioNuevoClonado();	
          			}
          		
          		
          		}else{
          		alerta('','Datos incompletos');
          	}
          }



        },
          verticalButtons: false,
        }).open();

}

function GuardarservicioNuevoClonado() {
	// body...


			var iduser=localStorage.getItem('id_user');
			var idtipousuario=localStorage.getItem('idtipousuario');
			$("#lbltitulo").removeClass('inputrequerido');
			$("#lbldescripcion").removeClass('inputrequerido');
			$("#lbltiposervicio").removeClass('inputrequerido');
			$("#lblorden").removeClass('inputrequerido');
			$("#lbldias").removeClass('inputrequerido');
			$("#lblcategoria").removeClass('inputrequerido');
			$("#v_numparticipantesmin").removeClass('inputrequerido');
			$("#v_numparticipantesmax").removeClass('inputrequerido');
			$("#lblcostounitario").removeClass('inputrequerido');
			$(".divmodo").removeClass('inputrequerido');
	    	$("#lblperiodos").css('color','#3e5569');
			$("#lblhorarios").removeClass('inputrequerido');
			$("#lblminimo").removeClass('inputrequerido');
			$("#lblmaximo").removeClass('inputrequerido');
			$("#lbldescripcionpolitica").removeClass('inputrequerido');
			$("#lbldescripcionaceptacionpolitica").removeClass('inputrequerido');


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

		var idusuarios=[];
			if($(".lista_").length) {
			$(".lista_" ).each(function( index ) {
				var id=$(this).attr('id');
				var dividir=id.split('_')[1];
				console.log(dividir);
			  	if($("#idusuarios_"+dividir).is(':checked')) {
			  		
			  		idusuarios.push(dividir);
			  	}
			});
		}

		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var descripcion=$("#v_descripcion").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").is(':checked')?1:0;
		var categoria=$("#v_categoria").val();
		var costo=$("#v_costo").val();
		var id=$("#id").val();
		var v_numparticipantes=$("#v_numparticipantesmin").val();
		var v_numparticipantesmax=$("#v_numparticipantesmax").val();

		var categoriaservicio=$("#v_categoriaservicio").val();

		

		var modalidad=0;

		

		  if(document.querySelector('input[name="v_grupo"]:checked')) {
		     
		     	modalidad=$('input[name="v_grupo"]:checked').val();

		      }


		var modalidadpago=0;
		if ($('input[name=v_grupo2]').is(':checked')) {
			modalidadpago=$('input[name=v_grupo2]:checked').val();

		}

	
		var perido=$("#v_periodo").val();


		var totalclase=$("#v_totalclase").val();
		var montopagarparticipante=$("#v_montopagarparticipante").val();
		var montopagargrupo=$("#v_montopagargrupo").val();
		var fechainicial=$("#v_fechainicial").val();
		var fechafinal=$("#v_fechafinal").val();
		var datos = new FormData();

	/*	var archivos = document.getElementById("image"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo

		//Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
		//objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
		//que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
		for (i = 0; i < archivo.length; i++) {
			datos.append('archivo' + i, archivo[i]);
		}*/

				var diasemana=[];

		var horainicio=[];

		var horafin=[];

		$(".diasemana").each(function(){
				var valor=$(this).val();
				diasemana.push(valor);
			});
	$(".horainiciodia").each(function(){
				var valor=$(this).val();
				horainicio.push(valor);

			});

		$(".horafindia").each(function(){
			var valor=$(this).val();
			horafin.push(valor);

		});
		var participantes=[];
		//var zonas=[];
		var coachs=[];
		var periodoinicial=[];
		var periodofinal=[];
		$(".chkcliente").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				participantes.push(id);
			}
		});

	
		 porcentajescoachs=[];
		$(".nombrecoach").each(function(){
			var id=$(this).val();
			coachs.push(id);

			var idelemento=$(this).attr('id').split('_')[1];
			var tipopago=$("#tipo_"+idelemento).val();
			var monto=$("#txtcantidaddescuento_"+idelemento).val();

				var objeto={
					idcoach:id,
					tipopago:tipopago,
					monto:monto
				};
			    porcentajescoachs.push(objeto);

		});


		$(".from").each(function(){
			var valor=$(this).val();
			periodoinicial.push(valor);
			
		});
		$(".to").each(function(){
			var valor=$(this).val();
			periodofinal.push(valor);
		 });

		var descuentos=[];
		var membresias=[];
		var encuestas=[];
		$(".chkdescuento").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];
			if ($("#"+valor).is(':checked')) {
				descuentos.push(id);
			}
		});

		$(".chkmembresia").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];
			if ($("#"+valor).is(':checked')) {
				membresias.push(id);
			}
		});

		$(".chkencuesta").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];
			if ($("#"+valor).is(':checked')) {
				encuestas.push(id);
			}
		});

		
		var abiertocliente=$("#v_abiertocliente").is(':checked')?1:0;
		var abiertocoach=$("#v_abiertocoach").is(':checked')?1:0;
		var abiertoadmin=$("#v_abiertoadmin").is(':checked')?1:0;
		var ligarclientes=$("#v_ligarclientes").is(':checked')?1:0;
		var v_numligarclientes=$("#v_numligarclientes").val();

		var v_tiempoaviso=$("#v_tiempoaviso").val();
		var v_tituloaviso=$("#v_tituloaviso").val();
		var v_descripcionaviso=$("#v_descripcionaviso").val();

		var v_politicascancelacion=$("#v_politicascancelacion").val();
		var v_politicasaceptacion=$("#v_politicasaceptacion").val();
		var v_reembolso=$("#v_reembolso").is(':checked')?1:0;
		var v_asistencia=$("#v_asistencia").is(':checked')?1:0;
		var v_tiporeembolso=$("#v_tiporeembolso").val();

		var v_cantidadreembolso=$("#v_cantidadreembolso").val();
		var v_asignadocliente=$("#v_asignadocliente").is(':checked')?1:0;
		var v_asignadocoach=$("#v_asignadocoach").is(':checked')?1:0;
		var v_asignadoadmin=$("#v_asignadoadmin").is(':checked')?1:0;
		var imagenessucursal=localStorage.getItem('fotoimagenservicio');

		const zonas = [...new Set(arraydiaseleccionados.map(bill => bill.idzona))];
		datos.append('coachs',coachs);
		datos.append('participantes',participantes);
		datos.append('diasemana',diasemana);
		datos.append('horainiciodia',horainicio);
		datos.append('horafindia',horafin);
		datos.append('v_titulo',nombre); 
		datos.append('v_descripcion',descripcion);
		datos.append('v_orden',orden); 
		datos.append('id',id);
		datos.append('v_estatus',estatus);
		datos.append('v_categoria',categoria);
		datos.append('v_costo',costo);
		datos.append('v_totalclase',totalclase);
		datos.append('v_modalidad',modalidad);
		datos.append('v_montopagarparticipante',montopagarparticipante);
		datos.append('v_montopagargrupo',montopagargrupo);
		datos.append('v_categoriaservicio',categoriaservicio);
	
		datos.append('periodos',JSON.stringify(asignacionperiodos));
		datos.append('v_fechainicial',fechainicial);
		datos.append('v_fechafinal',fechafinal);
		datos.append('v_modalidadpago',modalidadpago);
		datos.append('v_perido',perido);
		datos.append('v_arraydiaselegidos',arraydiaselegidos);
		datos.append('zonas',zonas);
		/*datos.append('v_periodoinicial',periodoinicial);
		datos.append('v_periodofinal',periodofinal);*/
		datos.append('v_lunes',lunes);
		datos.append('v_martes',martes);
		datos.append('v_miercoles',miercoles);
		datos.append('v_jueves',jueves);
		datos.append('v_viernes',Viernes);
		datos.append('v_sabado',sabado);
		datos.append('v_domingo',domingo);
		datos.append('v_numparticipantes',v_numparticipantes);
		datos.append('v_numparticipantesmax',v_numparticipantesmax);

		datos.append('abiertocliente',abiertocliente);
		datos.append('abiertocoach',abiertocoach);
		datos.append('abiertoadmin',abiertoadmin);
		datos.append('ligarclientes',ligarclientes);
		datos.append('v_numligarclientes',v_numligarclientes);
		datos.append('v_tiempoaviso',v_tiempoaviso);
		datos.append('v_tituloaviso',v_tituloaviso);
		datos.append('v_descripcionaviso',v_descripcionaviso);
		datos.append('v_politicascancelacion',v_politicascancelacion);
		datos.append('v_reembolso',v_reembolso);
		datos.append('v_tiporeembolso',v_tiporeembolso);
		
		datos.append('v_cantidadreembolso',v_cantidadreembolso);
		datos.append('v_asignadocliente',v_asignadocliente);
		datos.append('v_asignadocoach',v_asignadocoach);
		datos.append('v_asignadoadmin',v_asignadoadmin);
		datos.append('v_politicasaceptacion',v_politicasaceptacion);
		datos.append('v_descuentos',descuentos);
		datos.append('v_membresias',membresias);
		datos.append('v_encuestas',encuestas);
		datos.append('v_asistencia',v_asistencia);
		datos.append('porcentajescoachs',JSON.stringify(asignacioncoach));
		datos.append('imageneservicio',imagenessucursal);
		datos.append('iduser',iduser);
		datos.append('idtipousuario',idtipousuario);
		datos.append('idusuarios',idusuarios);
		var bandera1=1;
		if (nombre=='') {
			$("#lbltitulo").addClass('inputrequerido');
			bandera1=0;
		}

		if (descripcion=='') {
			$("#lbldescripcion").addClass('inputrequerido');
			bandera1=0;
		}


		if (categoria == 0) {

			$("#lbltiposervicio").addClass('inputrequerido');
			bandera1=0;
		}

		if (orden=='') {

			$("#lblorden").addClass('inputrequerido');
			bandera1=0;
		}

			
		if (bandera1==1) {

		seccion2=1;
		 //onclick="ActivarTab(this,'profile')"
		$("#profile-tab").attr('onclick','ActivarTab(this,"profile")');
		//document.getElementById("profile-tab").click();

		}else{
		seccion2=0;
		}


		var bandera2=1;
		var validar2=1;
		var cont=0;
		if($(".lbldomingo").hasClass('active')){

		 cont++;
		}
		if($(".lbllunes").hasClass('active')){

		  cont++;
		}
	    if($(".lblmartes").hasClass('active')){

		cont++;
		}
		 if($(".lblmiercoles").hasClass('active')){

		cont++;
		}
		 if($(".lbljueves").hasClass('active')){

		  cont++;
		}
		 if($(".lblviernes").hasClass('active')){

		  cont++;
		}
		 if($(".lblsabado").hasClass('active')){

		  cont++;
		}

		if ($("#v_categoriaservicio").val()==0) {
			validar2=0;
			bandera2=0;
			$("#lblcategoria").addClass('inputrequerido');
		}

		if (cont==0) {
			validar2=0;
			bandera2=0;
			$("#lbldias").addClass('inputrequerido');
		}
								
		if (bandera2==1) {

			seccion3=1;
									 //onclick="ActivarTab(this,'profile')"
			$("#contact-tab").attr('onclick','ActivarTab(this,"contact")');
									//document.getElementById("contact-tab").click();

		}else{
			seccion3=0;
		}

		var bandera3=1;
		//console.log(arraydiaseleccionados);

		if (arraydiaseleccionados.length>0) {
			seccion4=1;
						
			$("#costos-tab").attr('onclick','ActivarTab(this,"costos")');
		}else{
			seccion4=0;
			bandera3=0;
			$("#lblhorarios").addClass('inputrequerido');

		}
		var bandera4=1;
		if ($("#v_numparticipantesmin").val()=='') {
			bandera4=0;
		//$("#v_numparticipantesmin").addClass('inputrequerido');

		}

		if ($("#v_numparticipantesmax").val()=='') {
			bandera4=0;

		//$("#v_numparticipantesmax").addClass('inputrequerido');
	
		}
		
		if ($("#v_costo").val()=='') {

			bandera4=0;
	    	$("#lblcostounitario").addClass('inputrequerido');
	
		}

	
		if (periodoinicial.length==0) {
			bandera4=0;
	    	$("#lblperiodos").css('color','red');
			
		}

		for (var i = 0; i < periodoinicial.length; i++) {
			if (isValidDate(periodoinicial[i])==false) {
			bandera4=0;
	    	$("#lblperiodos").css('color','red');

			}
		}

		for (var i = 0; i < periodofinal.length; i++) {
			if (isValidDate(periodofinal[i])==false) {
			bandera4=0;
	    	$("#lblperiodos").css('color','red');

			}
		}

		if (modalidad==0) {

			$(".divmodo").addClass('inputrequerido');
			bandera4=0;
		}

		if (v_numparticipantes=='') {
			bandera4=0;
			$("#lblminimo").addClass('inputrequerido');
		}
		if (v_numparticipantesmax=='') {
			bandera4=0;
			$("#lblmaximo").addClass('inputrequerido');
		}

		if (bandera4==1) {

			seccion5=1;
			$("#aceptacion-tab").attr('onclick','ActivarTab(this,"aceptacion")');
		
		}else{
			seccion5=0;
		}


		var bandera5=1;
		var seccion6=0;
		if (v_politicasaceptacion=='') {

			$("#lbldescripcionaceptacionpolitica").addClass('inputrequerido');
			
			bandera5=0;
			
		}

		if (bandera5==1) {
			seccion6=1;
		}

		
		console.log(bandera1);
		// $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				if (bandera1==1) {
		//setTimeout(function(){
				  $.ajax({
					url:urlphp+'GuardarServicioClonado2.php', //Url a donde la enviaremos
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
							$("#id").val(resp.idservicio);
								localStorage.setItem('valor','');

							
						   console.log("El resultado de msj es: "+msj);
						   	if( resp == 1 ){
								//alerta('','Se realizó el registro correctamente');
						 	
								arraydiaselegidos=[];
								arraydiaseleccionados=[];
								asignacionperiodos=[];
								asignacioncoach=[];
								localStorage.setItem('fotoimagenservicio','');

									if(localStorage.getItem('idtipousuario')==0) {
										GoToPage('homeadmin');
										}
										
									if(localStorage.getItem('idtipousuario')==5) {
											GoToPage('homecoach');
									}

									alerta('','Se replicó el servicio exitosamente');
							
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

function ValidacionHorario() {
	return new Promise((resolve, reject) => {
	var datos = new FormData();
		datos.append('v_arraydiaselegidos',arraydiaselegidos);

		var idusuarios=[];
		if($(".lista_").length) {
			$(".lista_" ).each(function( index ) {
				var id=$(this).attr('id');
				var dividir=id.split('_')[1];
				
			  	if($("#idusuarios_"+dividir).is(':checked')) {
			  		
			  		idusuarios.push(dividir);
			  	}
			});
		}
		datos.append('idusuarios',idusuarios);

		

		 $.ajax({
					url:urlphp+'VerificarAsignacionHorariosUsuario.php', //Url a donde la enviaremos
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
							
						   resolve(msj);
						 	/*if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}*/			
					  	}
				  });		
						
		});

}

