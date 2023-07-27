var arraydiaselegidos=[];
var asignacioncoach=[];
var asignacionperiodos=[];
var dynamicSheet1="";
var arraydiaseleccionados=[];
var fechasglobal2="";
function NuevoServicio(){
	
	GoToPage('nuevoservicio');
}
var zonasarray=[];

var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var eventos=[];

let calendarInline="";
function CargarFechasNuevoServicio() {

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
             //console.log('entro');

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



function GuardarHorarios() {
	dynamicSheet1.close();
CantidadHorarios();
	
}

function CantidadHorarios() {
	var cantidadhorarios=arraydiaseleccionados.length;
	$("#cantidadhorarios").text(cantidadhorarios);
}

function ConsultarFechaHorariosDisponibles(fecha) {
	
	var date=fecha.split('-');
	fechaformato=date[2]+'-'+date[1]+'-'+date[0];

		if(BuscarfechaArray2(fecha)){

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
		   							 		<div class="row">
		   							 		<label style="text-align:center;">Filtrar por espacio:</label>
		   							 		 <select name="v_zonafiltro" style="text-align:center;background: #c6c6c6;margin-right: 1em;margin-left: 1em;margin-bottom: 1em;" id="v_zonafiltro" onchange="FiltrarPorZona()"></select>
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

           var htmlhorarios="";
	  HorariosDisponiblesFecha(date).then(r => {
 				
			  	if (r.length>0) {
			  		
			  		for (var i = 0; i < r.length; i++) {

			  			for (var j =0; j < r[i].horasposibles[0].length; j++) {
			  				
			  			if (r[i].horasposibles[0][j].disponible==1 && r[i].horasposibles[0][j].horafinal!=null) {
			  				var fecha=r[i].fecha.split('-');
			  				var fechaformada=fecha[2]+'-'+fecha[1]+'-'+fecha[0];
			  					  				var fechaformada3=fecha[0]+'-'+fecha[1]+'-'+fecha[2];

			  				var fechaformada2=fecha[2]+'-'+fecha[1]+'-'+fecha[0]+'-'+r[i].horasposibles[0][j].horainicial.slice(0,5)+`-`+r[i].horasposibles[0][j].horafinal.slice(0,5) +'-'+r[i].idzona;

			  				if (!BuscarfechaenArrayElegidos(fechaformada2)) {
			  			htmlhorarios +=`
			  			<div class="col-100 horarios zonadiv_`+r[i].idzona+`">
				        <div class="card shadow-sm margin-bottom-half inputdia" id="`+fechaformada3+'-'+r[i].horasposibles[0][j].horainicial.slice(0,5)+`-`+r[i].horasposibles[0][j].horafinal.slice(0,5) +'-'+r[i].idzona+`" >
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
				                <p>Horario <span style="font-weight:bold;">`+r[i].horasposibles[0][j].horainicial.slice(0,5)+` - `+r[i].horasposibles[0][j].horafinal.slice(0,5) + `</span></p>
				              </div>
				              <div class="col-20">

				              <span class="bi bi-check-lg" id="ch_`+fechaformada3+'-'+r[i].horasposibles[0][j].horainicial.slice(0,5)+`-`+r[i].horasposibles[0][j].horafinal.slice(0,5) +'-'+r[i].idzona+`"  style="display:none;"  ></span>
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


function ObtenerTodasZonas() {
		
	$.ajax({
					url: urlphp+'ObtenerZonas.php', //Url a donde la enviaremos
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

						var zonas=msj.respuesta;
						if (zonas.length>0) {
							var html="";
							html+=`<option value="0">Todos</option>`;

							for (var i = 0; i <zonas.length; i++) {
								html+=`<option value="`+zonas[i].idzona+`">`+zonas[i].nombre+`</option>`;
							}
							$("#v_zonafiltro").html(html);
							
						}

					}
				});
}
function ObtenerTipoServicios(valor) {

	var pagina="ObtenerTipoServicios.php";
	  $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp + pagina,
        async: false,
        success: function (resp) {
           
        	var res=resp.respuesta;
        	PintarTipoServicios(res);

        	if (valor>0) {
        		$("#v_categoria").val(valor);
	
        	}

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}
function PintarTipoServicios(respuesta) {
	var html="";
				html+=`<option value="0">Seleccionar tipo de servicio</option>`;

	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcategorias+`">`+respuesta[i].titulo+`</option>`;
		}

		$("#v_categoria").html(html);

	}
}


function SeleccionarCategoria(idservicio) {
	var categoriaid=$("#v_categoria").val();
	var datos="categoriaid="+categoriaid;

	$("#profile-tab").css('display','none');
	$("#contact-tab").css('display','none');
	$("#costos-tab").css('display','none');
	$("#coach-tab").css('display','none');
	$("#multi-tab").css('display','none');
	$("#politicas-tab").css('display','none');
	$("#aceptacion-tab").css('display','none');
	$("#otros-tab").css('display','none');

if (categoriaid>0) {
	$.ajax({
					url: urlphp+'ObtenerCategoria.php', //Url a donde la enviaremos
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
						var dias=msj.horarios;
						var horarios=msj.respuesta.horarios;
						var zonas=msj.respuesta.zonas;
						var participantes=msj.respuesta.participantes;
						 cantidadparticipantes=msj.respuesta.cantidad;
						var coachs=msj.respuesta.coachs;

						var asignarcostos=msj.respuesta.configurarcostos;
						var habilitarmodalidad=msj.respuesta.habilitarmodalidad;
						var campototalclases=msj.respuesta.campototalclases;
						var campopreciounitario=msj.respuesta.campopreciounitario;
						var campomontoporparticipante=msj.respuesta.campomontoporparticipante;
						var campomontogrupo=msj.respuesta.campomontoporgrupo;
						var habilitarmodalidadpago=msj.respuesta.habilitarmodalidadpago;
						var asignarcategoria=msj.respuesta.asignarcategoria;
						var asignardias=msj.respuesta.asignardias;
						var avanzado=msj.respuesta.avanzado;

							$(".divcategoria").css('display','none');

						if (avanzado==1) {
								$("#profile-tab").css('display','block');
								$("#contact-tab").css('display','block');
							if(localStorage.getItem('idtipousuario')==0) {
								$("#costos-tab").css('display','block');
								$("#coach-tab").css('display','block');
								$("#multi-tab").css('display','block');
								$("#politicas-tab").css('display','block');
								$("#aceptacion-tab").css('display','block');
								$("#otros-tab").css('display','block');
							}
							$("#btnguardarservicio").attr('onclick',"Guardarservicio()");
							$("#avanzado").val(1);

							$(".divcategoria").css('display','block');

							if (idservicio>0) {

							$(".divcategoria").css('display','block');
							

							}
						}else{

							//$(".btncontinuar").css('display','none');
							$("#btnguardarservicio").attr('onclick',"Guardarservicio2()");
 							//$(".btnguardarservicio").html('<i class="mdi mdi-content-save"></i>Guardar');

						}
						$(".diasckeckbox").attr('disabled',true);
						$(".lbldomingo").addClass('btn_colorgray3');
						$(".lbllunes").addClass('btn_colorgray3');
						$(".lblmartes").addClass('btn_colorgray3');
						$(".lblmiercoles").addClass('btn_colorgray3');
						$(".lbljueves").addClass('btn_colorgray3');
						$(".lblviernes").addClass('btn_colorgray3');
						$(".lblsabado").addClass('btn_colorgray3');

						$("#Domingo").attr('disabled',true);
						$("#Lunes").attr('disabled',true);
						$("#Martes").attr('disabled',true);
						$("#Miercoles").attr('disabled',true);
						$("#Jueves").attr('disabled',true);
						$("#Viernes").attr('disabled',true);
						$("#Sabado").attr('disabled',true);

						$("#Domingo").attr('checked',false);
						$("#Lunes").attr('checked',false);
						$("#Martes").attr('checked',false);
						$("#Miercoles").attr('checked',false);
						$("#Jueves").attr('checked',false);
						$("#Viernes").attr('checked',false);
						$("#Sabado").attr('checked',false);


						var diasdisponibles=[];
						for (var i = 0; i < dias.length; i++) {
								

								if (dias[i].dia ==0) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									$("#Domingo").attr('checked',true);
									diasdisponibles.push('Domingo');
								}
								if (dias[i].dia==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
								$("#Lunes").attr('checked',true);
											diasdisponibles.push('Lunes');

								}
								if (dias[i].dia==2) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
									$("#Martes").attr('disabled',false);

									$("#Martes").attr('checked',true);
									diasdisponibles.push('Martes');

								}
						        if (dias[i].dia==3) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
									$(".lblmiercoles").addClass('btn_colorgray2');
						               $("#Miercoles").attr('disabled',false);

									$("#Miercoles").attr('checked',true);
									diasdisponibles.push('Miercoles');

								}
								if (dias[i].dia==4) {
									$(".lbljueves").removeClass('btn_colorgray3');
									$(".lbljueves").addClass('btn_colorgray2');
									$("#Jueves").attr('disabled',false);

									$("#Jueves").attr('checked',true);
									diasdisponibles.push('Jueves');

								}
								if (dias[i].dia==5) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);

									$("#Viernes").attr('checked',true);
								diasdisponibles.push('Viernes');

								}

								if (dias[i].dia==6) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
									$("#Sabado").attr('checked',true);
									diasdisponibles.push('Sábado');

								}
							
						}

						if (diasdisponibles.length>0) {

							var uniqueArray = uArray(diasdisponibles);
							
							var dias='';
							for (var i = 0; i <uniqueArray.length; i++) {

								if (i>0) {
									dias+=', ';
								}
								dias+=uniqueArray[i];
							}

							$("#leyenda").html('Los dias disponibles son: <span style="font-weight:bold;">'+dias+'<span>');
						}



					}	
				});
	}
}



function SeleccionarCategoriaNuevo(idservicio,lunesx,martesx,miercolesx,juevesx,viernesx,sabadox,domingox) {
	var categoriaid=$("#v_categoria").val();
	var datos="categoriaid="+categoriaid;

	$("#profile-tab").css('display','none');
	$("#contact-tab").css('display','none');
	$("#costos-tab").css('display','none');
	$("#coach-tab").css('display','none');
	$("#multi-tab").css('display','none');
	$("#politicas-tab").css('display','none');
	$("#aceptacion-tab").css('display','none');
	$("#otros-tab").css('display','none');

if (categoriaid>0) {
	$.ajax({
					url: urlphp+'ObtenerCategoria.php', //Url a donde la enviaremos
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
						var dias=msj.horarios;
						var horarios=msj.respuesta.horarios;
						var zonas=msj.respuesta.zonas;
						var participantes=msj.respuesta.participantes;
						 cantidadparticipantes=msj.respuesta.cantidad;
						var coachs=msj.respuesta.coachs;

						var asignarcostos=msj.respuesta.configurarcostos;
						var habilitarmodalidad=msj.respuesta.habilitarmodalidad;
						var campototalclases=msj.respuesta.campototalclases;
						var campopreciounitario=msj.respuesta.campopreciounitario;
						var campomontoporparticipante=msj.respuesta.campomontoporparticipante;
						var campomontogrupo=msj.respuesta.campomontoporgrupo;
						var habilitarmodalidadpago=msj.respuesta.habilitarmodalidadpago;
						var asignarcategoria=msj.respuesta.asignarcategoria;
						var asignardias=msj.respuesta.asignardias;
						var avanzado=msj.respuesta.avanzado;

							$(".divcategoria").css('display','none');

						if (avanzado==1) {
								$("#profile-tab").css('display','block');
								$("#contact-tab").css('display','block');
							if(localStorage.getItem('idtipousuario')==0) {
								$("#costos-tab").css('display','block');
								$("#coach-tab").css('display','block');
								$("#multi-tab").css('display','block');
								$("#politicas-tab").css('display','block');
								$("#aceptacion-tab").css('display','block');
								$("#otros-tab").css('display','block');
							}
							$("#btnguardarservicio").attr('onclick',"Guardarservicio()");
							$("#avanzado").val(1);

							$(".divcategoria").css('display','block');

							if (idservicio>0) {

							$(".divcategoria").css('display','block');
							

							}
						}else{

							//$(".btncontinuar").css('display','none');
							$("#btnguardarservicio").attr('onclick',"Guardarservicio2()");
 							//$(".btnguardarservicio").html('<i class="mdi mdi-content-save"></i>Guardar');

						}
						$(".diasckeckbox").attr('disabled',true);
						$(".lbldomingo").addClass('btn_colorgray3');
						$(".lbllunes").addClass('btn_colorgray3');
						$(".lblmartes").addClass('btn_colorgray3');
						$(".lblmiercoles").addClass('btn_colorgray3');
						$(".lbljueves").addClass('btn_colorgray3');
						$(".lblviernes").addClass('btn_colorgray3');
						$(".lblsabado").addClass('btn_colorgray3');

						$("#Domingo").attr('disabled',true);
						$("#Lunes").attr('disabled',true);
						$("#Martes").attr('disabled',true);
						$("#Miercoles").attr('disabled',true);
						$("#Jueves").attr('disabled',true);
						$("#Viernes").attr('disabled',true);
						$("#Sabado").attr('disabled',true);

						$("#Domingo").attr('checked',false);
						$("#Lunes").attr('checked',false);
						$("#Martes").attr('checked',false);
						$("#Miercoles").attr('checked',false);
						$("#Jueves").attr('checked',false);
						$("#Viernes").attr('checked',false);
						$("#Sabado").attr('checked',false);


						var diasdisponibles=[];
							for (var i = 0; i < dias.length; i++) {
								

								if (dias[i].dia ==0 ) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									//$("#Domingo").attr('checked',true);
									diasdisponibles.push('Domingo');
								}

								
								if (dias[i].dia==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
/*								$("#Lunes").attr('checked',true);
*/											diasdisponibles.push('Lunes');

								}
								if (dias[i].dia==2 ) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
									$("#Martes").attr('disabled',false);

/*									$("#Martes").attr('checked',true);
*/									diasdisponibles.push('Martes');

								}
						        if (dias[i].dia==3) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
									$(".lblmiercoles").addClass('btn_colorgray2');
						               $("#Miercoles").attr('disabled',false);

/*									$("#Miercoles").attr('checked',true);
*/									diasdisponibles.push('Miercoles');

								}
								if (dias[i].dia==4) {
									$(".lbljueves").removeClass('btn_colorgray3');
									$(".lbljueves").addClass('btn_colorgray2');
									$("#Jueves").attr('disabled',false);

/*									$("#Jueves").attr('checked',true);
*/									diasdisponibles.push('Jueves');

								}
								if (dias[i].dia==5 ) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);

/*									$("#Viernes").attr('checked',true);
*/								diasdisponibles.push('Viernes');

								}

								if (dias[i].dia==6 ) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
/*									$("#Sabado").attr('checked',true);
*/									diasdisponibles.push('Sábado');

								}
							
						}

							if(domingox==1) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									$("#Domingo").attr('checked',true);

								}

						if(lunesx==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
								$("#Lunes").attr('checked',true);
							}

							if(martesx==1) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
								$("#Martes").attr('disabled',false);
								$("#Martes").attr('checked',true);

								}

						if(miercolesx==1) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
								$(".lblmiercoles").addClass('btn_colorgray2');
						        $("#Miercoles").attr('disabled',false);

								$("#Miercoles").attr('checked',true);
								}

						if(juevesx==1) {
								$(".lbljueves").removeClass('btn_colorgray3');
								$(".lbljueves").addClass('btn_colorgray2');
								$("#Jueves").attr('disabled',false);

								$("#Jueves").attr('checked',true);
								}


							if(viernesx==1) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);
								$("#Viernes").attr('checked',true);

								}

								if(sabadox==1) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
									$("#Sabado").attr('checked',true);
								}
						if (diasdisponibles.length>0) {

							var uniqueArray = uArray(diasdisponibles);
							
							var dias='';
							for (var i = 0; i <uniqueArray.length; i++) {

								if (i>0) {
									dias+=', ';
								}
								dias+=uniqueArray[i];
							}

							$("#leyenda").html('Los dias disponibles son: <span style="font-weight:bold;">'+dias+'<span>');
						}



					}	
				});
	}
}


function SeleccionarCategoriaNuevo2(categoriaid,idservicio,lunesx,martesx,miercolesx,juevesx,viernesx,sabadox,domingox) {
	//var categoriaid=$("#v_categoria").val();
	var datos="categoriaid="+categoriaid;

	$("#profile-tab").css('display','none');
	$("#contact-tab").css('display','none');
	$("#costos-tab").css('display','none');
	$("#coach-tab").css('display','none');
	$("#multi-tab").css('display','none');
	$("#politicas-tab").css('display','none');
	$("#aceptacion-tab").css('display','none');
	$("#otros-tab").css('display','none');

if (categoriaid>0) {
	$.ajax({
					url: urlphp+'ObtenerCategoria.php', //Url a donde la enviaremos
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
						var dias=msj.horarios;
						var horarios=msj.respuesta.horarios;
						var zonas=msj.respuesta.zonas;
						var participantes=msj.respuesta.participantes;
						 cantidadparticipantes=msj.respuesta.cantidad;
						var coachs=msj.respuesta.coachs;

						var asignarcostos=msj.respuesta.configurarcostos;
						var habilitarmodalidad=msj.respuesta.habilitarmodalidad;
						var campototalclases=msj.respuesta.campototalclases;
						var campopreciounitario=msj.respuesta.campopreciounitario;
						var campomontoporparticipante=msj.respuesta.campomontoporparticipante;
						var campomontogrupo=msj.respuesta.campomontoporgrupo;
						var habilitarmodalidadpago=msj.respuesta.habilitarmodalidadpago;
						var asignarcategoria=msj.respuesta.asignarcategoria;
						var asignardias=msj.respuesta.asignardias;
						var avanzado=msj.respuesta.avanzado;

							$(".divcategoria").css('display','none');

						if (avanzado==1) {
								$("#profile-tab").css('display','block');
								$("#contact-tab").css('display','block');
							if(localStorage.getItem('idtipousuario')==0) {
								$("#costos-tab").css('display','block');
								$("#coach-tab").css('display','block');
								$("#multi-tab").css('display','block');
								$("#politicas-tab").css('display','block');
								$("#aceptacion-tab").css('display','block');
								$("#otros-tab").css('display','block');
							}
							$("#btnguardarservicio").attr('onclick',"Guardarservicio()");
							$("#avanzado").val(1);

							$(".divcategoria").css('display','block');

							if (idservicio>0) {

							$(".divcategoria").css('display','block');
							

							}
						}else{

							//$(".btncontinuar").css('display','none');
							$("#btnguardarservicio").attr('onclick',"Guardarservicio2()");
 							//$(".btnguardarservicio").html('<i class="mdi mdi-content-save"></i>Guardar');

						}
						$(".diasckeckbox").attr('disabled',true);
						$(".lbldomingo").addClass('btn_colorgray3');
						$(".lbllunes").addClass('btn_colorgray3');
						$(".lblmartes").addClass('btn_colorgray3');
						$(".lblmiercoles").addClass('btn_colorgray3');
						$(".lbljueves").addClass('btn_colorgray3');
						$(".lblviernes").addClass('btn_colorgray3');
						$(".lblsabado").addClass('btn_colorgray3');

						$("#Domingo").attr('disabled',true);
						$("#Lunes").attr('disabled',true);
						$("#Martes").attr('disabled',true);
						$("#Miercoles").attr('disabled',true);
						$("#Jueves").attr('disabled',true);
						$("#Viernes").attr('disabled',true);
						$("#Sabado").attr('disabled',true);

						$("#Domingo").attr('checked',false);
						$("#Lunes").attr('checked',false);
						$("#Martes").attr('checked',false);
						$("#Miercoles").attr('checked',false);
						$("#Jueves").attr('checked',false);
						$("#Viernes").attr('checked',false);
						$("#Sabado").attr('checked',false);


						var diasdisponibles=[];
							for (var i = 0; i < dias.length; i++) {
								

								if (dias[i].dia ==0 ) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									//$("#Domingo").attr('checked',true);
									diasdisponibles.push('Domingo');
								}

								
								if (dias[i].dia==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
/*								$("#Lunes").attr('checked',true);
*/											diasdisponibles.push('Lunes');

								}
								if (dias[i].dia==2 ) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
									$("#Martes").attr('disabled',false);

/*									$("#Martes").attr('checked',true);
*/									diasdisponibles.push('Martes');

								}
						        if (dias[i].dia==3) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
									$(".lblmiercoles").addClass('btn_colorgray2');
						               $("#Miercoles").attr('disabled',false);

/*									$("#Miercoles").attr('checked',true);
*/									diasdisponibles.push('Miercoles');

								}
								if (dias[i].dia==4) {
									$(".lbljueves").removeClass('btn_colorgray3');
									$(".lbljueves").addClass('btn_colorgray2');
									$("#Jueves").attr('disabled',false);

/*									$("#Jueves").attr('checked',true);
*/									diasdisponibles.push('Jueves');

								}
								if (dias[i].dia==5 ) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);

/*									$("#Viernes").attr('checked',true);
*/								diasdisponibles.push('Viernes');

								}

								if (dias[i].dia==6 ) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
/*									$("#Sabado").attr('checked',true);
*/									diasdisponibles.push('Sábado');

								}
							
						}

							if(domingox==1) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									$("#Domingo").attr('checked',true);

								}

						if(lunesx==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
								$("#Lunes").attr('checked',true);
							}

							if(martesx==1) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
								$("#Martes").attr('disabled',false);
								$("#Martes").attr('checked',true);

								}

						if(miercolesx==1) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
								$(".lblmiercoles").addClass('btn_colorgray2');
						        $("#Miercoles").attr('disabled',false);

								$("#Miercoles").attr('checked',true);
								}

						if(juevesx==1) {
								$(".lbljueves").removeClass('btn_colorgray3');
								$(".lbljueves").addClass('btn_colorgray2');
								$("#Jueves").attr('disabled',false);

								$("#Jueves").attr('checked',true);
								}


							if(viernesx==1) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);
								$("#Viernes").attr('checked',true);

								}

								if(sabadox==1) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
									$("#Sabado").attr('checked',true);
								}
						if (diasdisponibles.length>0) {

							var uniqueArray = uArray(diasdisponibles);
							
							var dias='';
							for (var i = 0; i <uniqueArray.length; i++) {

								if (i>0) {
									dias+=', ';
								}
								dias+=uniqueArray[i];
							}

							$("#leyenda").html('Los dias disponibles son: <span style="font-weight:bold;">'+dias+'<span>');
						}



					}	
				});
	}
}


function SeleccionarCategoriaReagendar(idservicio,lunesx,martesx,miercolesx,juevesx,viernesx,sabadox,domingox) {
	var categoriaid=$("#v_categoria").val();
	var datos="categoriaid="+categoriaid;

	$("#profile-tab").css('display','none');
	$("#contact-tab").css('display','none');
	$("#costos-tab").css('display','none');
	$("#coach-tab").css('display','none');
	$("#multi-tab").css('display','none');
	$("#politicas-tab").css('display','none');
	$("#aceptacion-tab").css('display','none');
	$("#otros-tab").css('display','none');

if (categoriaid>0) {
	$.ajax({
					url: urlphp+'ObtenerCategoria.php', //Url a donde la enviaremos
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
						var dias=msj.horarios;
						var horarios=msj.respuesta.horarios;
						var zonas=msj.respuesta.zonas;
						var participantes=msj.respuesta.participantes;
						 cantidadparticipantes=msj.respuesta.cantidad;
						var coachs=msj.respuesta.coachs;

						var asignarcostos=msj.respuesta.configurarcostos;
						var habilitarmodalidad=msj.respuesta.habilitarmodalidad;
						var campototalclases=msj.respuesta.campototalclases;
						var campopreciounitario=msj.respuesta.campopreciounitario;
						var campomontoporparticipante=msj.respuesta.campomontoporparticipante;
						var campomontogrupo=msj.respuesta.campomontoporgrupo;
						var habilitarmodalidadpago=msj.respuesta.habilitarmodalidadpago;
						var asignarcategoria=msj.respuesta.asignarcategoria;
						var asignardias=msj.respuesta.asignardias;
						var avanzado=msj.respuesta.avanzado;

							$(".divcategoria").css('display','none');

						if (avanzado==1) {
								$("#profile-tab").css('display','block');
								$("#contact-tab").css('display','block');
							if(localStorage.getItem('idtipousuario')==0) {
								$("#costos-tab").css('display','block');
								$("#coach-tab").css('display','block');
								$("#multi-tab").css('display','block');
								$("#politicas-tab").css('display','block');
								$("#aceptacion-tab").css('display','block');
								$("#otros-tab").css('display','block');
							}
							$("#btnguardarservicio").attr('onclick',"Guardarservicio()");
							$("#avanzado").val(1);

							$(".divcategoria").css('display','block');

							if (idservicio>0) {

							$(".divcategoria").css('display','block');
							

							}
						}else{

							//$(".btncontinuar").css('display','none');
							$("#btnguardarservicio").attr('onclick',"Guardarservicio2()");
 							//$(".btnguardarservicio").html('<i class="mdi mdi-content-save"></i>Guardar');

						}
						$(".diasckeckbox").attr('disabled',true);
						$(".lbldomingo").addClass('btn_colorgray3');
						$(".lbllunes").addClass('btn_colorgray3');
						$(".lblmartes").addClass('btn_colorgray3');
						$(".lblmiercoles").addClass('btn_colorgray3');
						$(".lbljueves").addClass('btn_colorgray3');
						$(".lblviernes").addClass('btn_colorgray3');
						$(".lblsabado").addClass('btn_colorgray3');

						$("#Domingo").attr('disabled',true);
						$("#Lunes").attr('disabled',true);
						$("#Martes").attr('disabled',true);
						$("#Miercoles").attr('disabled',true);
						$("#Jueves").attr('disabled',true);
						$("#Viernes").attr('disabled',true);
						$("#Sabado").attr('disabled',true);

						$("#Domingo").attr('checked',false);
						$("#Lunes").attr('checked',false);
						$("#Martes").attr('checked',false);
						$("#Miercoles").attr('checked',false);
						$("#Jueves").attr('checked',false);
						$("#Viernes").attr('checked',false);
						$("#Sabado").attr('checked',false);


						var diasdisponibles=[];
						for (var i = 0; i < dias.length; i++) {
								

								if (dias[i].dia ==0 ) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									//$("#Domingo").attr('checked',true);
									diasdisponibles.push('Domingo');
								}

								
								if (dias[i].dia==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
/*								$("#Lunes").attr('checked',true);
*/											diasdisponibles.push('Lunes');

								}
								if (dias[i].dia==2 ) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
									$("#Martes").attr('disabled',false);

/*									$("#Martes").attr('checked',true);
*/									diasdisponibles.push('Martes');

								}
						        if (dias[i].dia==3) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
									$(".lblmiercoles").addClass('btn_colorgray2');
						               $("#Miercoles").attr('disabled',false);

/*									$("#Miercoles").attr('checked',true);
*/									diasdisponibles.push('Miercoles');

								}
								if (dias[i].dia==4) {
									$(".lbljueves").removeClass('btn_colorgray3');
									$(".lbljueves").addClass('btn_colorgray2');
									$("#Jueves").attr('disabled',false);

/*									$("#Jueves").attr('checked',true);
*/									diasdisponibles.push('Jueves');

								}
								if (dias[i].dia==5 ) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);

/*									$("#Viernes").attr('checked',true);
*/								diasdisponibles.push('Viernes');

								}

								if (dias[i].dia==6 ) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
/*									$("#Sabado").attr('checked',true);
*/									diasdisponibles.push('Sábado');

								}
							
						}

						if(domingox==1) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									$("#Domingo").attr('checked',true);

								}

						if(lunesx==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
								$("#Lunes").attr('checked',true);
							}

							if(martesx==1) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
								$("#Martes").attr('disabled',false);
								$("#Martes").attr('checked',true);

								}

						if(miercolesx==1) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
								$(".lblmiercoles").addClass('btn_colorgray2');
						        $("#Miercoles").attr('disabled',false);

								$("#Miercoles").attr('checked',true);
								}

						if(juevesx==1) {
								$(".lbljueves").removeClass('btn_colorgray3');
								$(".lbljueves").addClass('btn_colorgray2');
								$("#Jueves").attr('disabled',false);

								$("#Jueves").attr('checked',true);
								}


							if(viernesx==1) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);
								$("#Viernes").attr('checked',true);

								}

								if(sabadox==1) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
									$("#Sabado").attr('checked',true);
								}
						if (diasdisponibles.length>0) {

							var uniqueArray = uArray(diasdisponibles);
							
							var dias='';
							for (var i = 0; i <uniqueArray.length; i++) {

								if (i>0) {
									dias+=', ';
								}
								dias+=uniqueArray[i];
							}

							$("#leyenda").html('Los dias disponibles son: <span style="font-weight:bold;">'+dias+'<span>');
						}



					}	
				});
	}
}


function uArray(array) {
    var out = [];
    for (var i=0, len=array.length; i<len; i++)
        if (out.indexOf(array[i]) === -1)
            out.push(array[i]);
    return out;
}

function ObtenerCategoriaServicios(valor) {
	var pagina="ObtenerCategoriaServicios.php";
	  $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp + pagina,
        async: false,
        success: function (resp) {
          
        	var res=resp.respuesta;
        	PintarCategoriaServicios(res);

        	if (valor>0) {
        		$("#v_categoriaservicio").val(valor);

        	}

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}

function PintarCategoriaServicios(respuesta) {
	var html="";
	html+=`<option value="0">Seleccionar categoria</option>`;

	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcategoriasservicio+`">`+respuesta[i].nombrecategoria+' - '+respuesta[i].nombre+`</option>`;
	
		}
	}
	$("#v_categoriaservicio").html(html);

}


function AplicarFechas() {
		var preguntar=0;
		var v_fechainicial=$("#v_fechainicial").val();
		var v_fechafinal=$("#v_fechafinal").val();
	/*if (arraydiaselegidos.length==0) {
		preguntar=0;
	}else{
		preguntar=1;
	}

	if (preguntar==1) {

		if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n , se borrarán los horarios seleccionados?"))
		{
			preguntar=0;
		}

	}*/

	if (v_fechainicial!='' && v_fechafinal!='' ) {
		if (arraydiaselegidos.length>0) {

 		/*ObtenerVerificarFechasDias(v_fechainicial,v_fechafinal,arraydiaselegidos).then(r => {
 			console.log(r.noseencuentra);
 			if (r.noseencuentra.length>0) {

 				MensajeMostrar(r.noseencuentra);
 				
 			}else{*/
 				HorariosDisponibles();
				$("#demo-calendar").css('display','block');

 			//}

 		//})

		}else{
		HorariosDisponibles();
		$("#demo-calendar").css('display','block');
	}
		/*var id=$("#id").val();
		if (id>0) {
		ObtenerHorariosSemana(id);	
		}*/
		
	}else{

		alerta('','Seleccionar fechas');
	}

}

function MensajeMostrar(noseencuentra) {
			var msj="";
 				for (var i = 0; i < noseencuentra.length; i++) {
 				
 					var dividirfecha=noseencuentra[i].split('-');
 					var fecha=dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2];
 					
 					msj+=`<span>`+fecha+`</span><br>`;
 				}

 				
	 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">

                <span>Tienes horarios seleccionados que estan fuera del periodo actual
               	`+msj+`
                ¿Deseas eliminarlos?</span>
                
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
          	EliminarHorariosFueraPeriodo(noseencuentra);
			
            }

        },
          verticalButtons: false,
        }).open();
}

function EliminarHorariosFueraPeriodo(noseencuentra) {

		for (var i = 0; i < noseencuentra.length; i++) {
 				for (var j = 0; j < arraydiaseleccionados.length; j++) {
 					//console.log(noseencuentra[i]+'=='+arraydiaseleccionados[j].id);
 					if (noseencuentra[i] == arraydiaseleccionados[j].id) {
 						//EliminarHorario(noseencuentra[i]);
 						BorrarElemento(noseencuentra[i]);
						BorrarElementoObjeto(noseencuentra[i]);
						
 						
 					}
 				}
 				Resumenfechas();
				CantidadHorarios();
 					
 		}

 		
}

function HorariosDisponibles() {



	//console.log(arraydiaselegidos);
	var v_zonas=[];
	//arraydiaselegidos=[];
	//arraydiaseleccionados=[];

	 var v_zonas = [];
	  $$('#v_zonas option:checked').each(function () {
	  	
	  		v_zonas.push($$(this).val());
	    
	  });

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
	var v_zonaelegida=$("#v_zonas").val();
	var v_horarios=$("#v_horarios").val();
	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonaelegida+"&v_horarios="+v_horarios;

			$.ajax({
					url: urlphp+'ObtenerHorariosFechas2.php', //Url a donde la enviaremos
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
						 zonasarray = msj.zonas;
					
						 var respuesta=msj.respuesta;

						 console.log(respuesta);
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

						 if($("#habilitarseleccion").val() ==1) {

						 	if (localStorage.getItem('edicionservicio')==0) {
								arraydiaselegidos=[];
								arraydiaseleccionados=[];
							
								 	}
			

						 if (respuesta.length>0) {
						 	$("#calendario").css('display','block');
						 for (var i = 0; i < respuesta.length; i++) {
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
							var nombrezona=respuesta[i].nombrezona;
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
						 	
						 	var htmlcontenedor= $("."+nuevafecha).html();
						 	var color=respuesta[i].color;
						 	var html="";
								 for (var j = 0; j < respuesta[i].horasposibles.length; j++) {
								 	
								 		for (var k = 0; k <respuesta[i].horasposibles[j].length; k++) {
								 			var horainicial=respuesta[i].horasposibles[j][k].horainicial;
								 			var horafinal=respuesta[i].horasposibles[j][k].horafinal;

								 			
								 			if (respuesta[i].horasposibles[j][k].disponible==1) {
								 			var disponible=respuesta[i].horasposibles[j][k].disponible==0?'':color;

								 			if (horainicial!=null && horafinal!=null) {
								 				var id=fecha+'-'+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+'-'+idzona;
								 					console.log('id'+id);

								 					if (Buscardia(id)==false) {

								 						CargaAutomatica(id);
								 					}
								 					 
								 				

								 				}
								 			 }
								 			}

								 		
						 							

								 			}

								 		}

								 	}

								 	Resumenfechas();
								 	CantidadHorarios();

								 }



						}else{

							alerta('','No se encuentran horarios disponibles dentro del periodo');
							//AbrirNotificacion('No se encuentran horarios disponibles dentro del periodo','mdi mdi-alert-circle');
					
						}
						$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');

						

					}
				});
	
}


function HorariosDisponiblesFlecha() {




	var v_zonas=[];
	//arraydiaselegidos=[];
	//arraydiaseleccionados=[];
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
	var v_zonaelegida=$("#v_zonas").val();
	var v_horarios=$("#v_horarios").val();
	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonaelegida+"&v_horarios"+v_horarios;

			$.ajax({
					url: urlphp+'ObtenerHorariosFechas2.php', //Url a donde la enviaremos
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
						// calendarInline.setYearMonth(anioinicial, mesinicial, 2);
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
function HorariosDisponiblesFecha(fechaseleccionada) {
	var fechaforma=fechaseleccionada[0]+'-'+fechaseleccionada[1]+'-'+fechaseleccionada[2];

return new Promise((resolve, reject) => {

	var v_zonas=[];
	/*arraydiaselegidos=[];
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
	var v_zonaelegida=$("#v_zonas").val();
	var v_horarios=$("#v_horarios").val();
	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=fechaforma;
	var v_fechafinal=fechaforma;

		var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonaelegida+"&v_horarios="+v_horarios;

			$.ajax({
					url: urlphp+'ObtenerHorariosFechas2.php', //Url a donde la enviaremos
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

						 var respuesta=msj.respuesta;
						 zonasarray=msj.zonas;
						 //console.log(zonasarray);
						 resolve(respuesta);
						

					}
				});
		});
	
}

function CargarEventoSeleccionador() {
		 $('.inputdia').click(function(e){

						 		
		 					var ele=$(this).attr('id');
		 					
						 		var id=ele;
						 		
						 		var encontrado=Buscardia(id);

						 	if (encontrado==1) {
						 			 var element = document.getElementById(id);
 									 element.classList.remove("activohorario");
 									 element.style.border='none';

 								 	BorrarElemento(id);
 								 	BorrarElementoObjeto(id);
 								 	element.style.color='black';
 								 	 var element = document.getElementById(id);
									document.getElementById("ch_"+id).style.display="none";


						 		}else{
						 			console.log('agrego'+id);
						 			arraydiaselegidos.push(id);
						 			var iddividido = id.split('-');
									var zonaelegida =zonasarray.find(zona => zona.idzona === iddividido[5]);
									var color=zonaelegida.color;
									
						 			var dividirfecha=id.split('-');
						 			var objeto={
						 				id:id,
 					 				fecha:dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2],
						 				idzona:dividirfecha[5],
						 				horainicial:dividirfecha[3],
						 				horafinal:dividirfecha[4],
						 				color:color,

						 			};
						 									 			console.log(objeto);

						 			arraydiaseleccionados.push(objeto);

						 			var element = document.getElementById(id);
								    element.classList.add("activohorario");
								    element.style.border="1px solid "+color;
									document.getElementById("ch_"+id).style.display="block";

						 		}

						 		
								 
						 	 });

}


function Buscardia(id) {
	var encontrado=0;
	
	for (var i = 0; i <arraydiaselegidos.length; i++) {
		
			if (id==arraydiaselegidos[i]) {
				encontrado=1;
				
			}
	}
	if (encontrado==1) {
		return 1;
	}else{

		return 0;
	}
}

function BorrarElemento(id) {
	var encontrado=0;
	for (var i = 0; i <arraydiaselegidos.length; i++) {
			if (id == arraydiaselegidos[i]) {
				
				arraydiaselegidos.splice(i, 1);
				return 0;
			}
	}

	

}
function BorrarElementoObjeto(id) {
	for (var i = 0; i <arraydiaseleccionados.length; i++) {

		if (id == arraydiaseleccionados[i].id) {

			arraydiaseleccionados.splice(i,1);
			return 0;
		}
	}
}
function Resumenfechas() {
	

		$("#selected-dates").html('');
		let days = ['Domingo','Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
		
		//console.log('resumenfechas');
		console.log(arraydiaseleccionados);
		var ordenado =arraydiaseleccionados.sort(generateSortFn([{name: 'idzona'}, {name: 'fecha',reverse: false}]));


		if (ordenado.length>0) {
			var idzonaante=0;
		for (var i = 0; i <ordenado.length; i++) {
			
			var id=ordenado[i].id;
			var dividircadena=id.split('-');

			var fecha=dividircadena[2]+'-'+dividircadena[1]+'-'+dividircadena[0];
			var horainicial=dividircadena[3];
			var horafinal=dividircadena[4];
			var idzona=dividircadena[5];

			var fecha2=dividircadena[0]+'-'+dividircadena[1]+'-'+dividircadena[2];
			var datatime=new Date(fecha);

			var dia=days[datatime.getUTCDay()];

			if (idzona!=idzonaante) {

				if (!!$("#divzona_"+idzona)) {
				

				var valor =zonasarray.find( zona => zona.idzona === idzona);
				var colordiv=valor.color;
				var nombrezona=valor.nombre;

					if (!!$("#colocarzona"+idzona)) {

						var html=`
						<div  class="list-group-item" style="font-weight:bold;margin-left: 0.6em;">`+nombrezona+`<div class="badge1" style="background:`+colordiv+`"></div></div>
						<div class="zonas" id="colocarzona`+idzona+`"></div>`;
						
						$("#selected-dates").append(html);

					}
				
				

				}
				idzonaante=idzona;
			}
			
			var htmlfechas=`<div class="list-group-item" class="fechas" style="background: white;border-radius: 20px;margin-bottom: 0.5em;">
						<div class="row" style="">
						
							<div class="col-60" >
								<div class="col-md-4" style="font-weight:bold;">`+dia+`</div>
							
								<div class="col-md-4">
									`+fecha2+`
								</div>
								<div class="col-md-4">
								 `+horainicial+`-`+horafinal+`
								</div>
							</div>
							<div class="col-20">
							<span id="" class="btneliminarhorario" onclick="EliminarHorario('`+id+`')"><i class="bi-trash-fill"></i></span>
							</div>
						</div>
					 </div>`;
			
			$("#colocarzona"+idzona).append(htmlfechas);
			
		}
	}
}


function Resumenfechas() {

		$("#selected-dates").html('');
		let days = ['Domingo','Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
		
		var ordenado =arraydiaseleccionados.sort(generateSortFn([{name: 'idzona'}, {name: 'fecha',reverse: false}]));
		var totalhorarios=0;
		console.log('ordenado');
		console.log(ordenado);
		if (ordenado.length>0) {
			var idzonaante=0;
		for (var i = 0; i <ordenado.length; i++) {
			
			var id=ordenado[i].id;
			var dividircadena=id.split('-');
			var fecha=dividircadena[2]+'-'+dividircadena[1]+'-'+dividircadena[0];
			var horainicial=dividircadena[3];
			var horafinal=dividircadena[4];
			var idzona=dividircadena[5];
			
			var fecha2=dividircadena[0]+'-'+dividircadena[1]+'-'+dividircadena[2];

			var datatime=new Date(fecha2);
			var dia=days[datatime.getUTCDay()];

			if (idzona!=idzonaante) {

				if (!!$("#divzona_"+idzona)) {
				

				var valor =zonasarray.find( zona => zona.idzona === idzona);
				//console.log(valor);
				var colordiv=valor.color;
				var nombrezona=valor.nombre;

					if (!!$("#colocarzona"+idzona)) {

						var html=`
						<div  class="list-group-item" style="font-weight:bold;">
						<div class="row">
						<div class="col-70">
							<p style="margin:0;margin-left: 1em;margin-left:0.8em;">	`+nombrezona+`</p>
						<p style="margin-left: 1em;margin-left:0.8em;margin-top:1em;margin-bottom:1em;">Cantidad de horarios por espacio: <span id="cantidadhoras_`+idzona+`">0</span></p>

						</div>
							<div class="col-20">
							<div class="row">
										<div class="col-10" style="text-align: right;">
											<div class="badge1" style="background:`+colordiv+`">
											</div>
										</div>
										
										<div class="col-10">
										<span id="" class="btneliminarhorario" onclick="QuitarFechaHoraZona('`+idzona+`')"><i class="bi-trash-fill"></i></span>

											</div>
									</div>

									</div>
						</div>
					
						</div>


						<div class="zonas" id="colocarzona`+idzona+`"></div>`;
						
						$("#selected-dates").append(html);

					}
				
				

				}
				idzonaante=idzona;
			}


			/*var htmlfechas=`<div class="list-group-item clasfecha_`+id+`"  id="div_`+id+`">
						<div class="row">
							<div class="col-md-2">
								`+dia+`
							</div>
							<div class="col-md-4">
								`+fecha+`
							</div>
							<div class="col-md-4">
							 `+horainicial+`-`+horafinal+`
							</div>

							<div class="col-md-2">
								<button type="button" class="btn btn_rojo" onclick="QuitarFechaHora('`+id+`')" ><i class="mdi mdi-delete-empty"></i></button>
							</div>
						</div>
					 </div>`;*/

					 		var htmlfechas=`<div class="list-group-item" class="fechas" style="background: white;border-radius: 20px;margin-bottom: 0.5em;">
						<div class="row" style="">
						
							<div class="col-60" >
								<div class="col-md-4" style="font-weight:bold;">`+dia+`</div>
							
								<div class="col-md-4">
									`+fecha+`
								</div>
								<div class="col-md-4">
								 `+horainicial+`-`+horafinal+`
								</div>
							</div>
							<div class="col-20">
							<span id="" class="btneliminarhorario" onclick="EliminarHorario('`+id+`')"><i class="bi-trash-fill"></i></span>
							</div>
						</div>
					 </div>`;
			
			$("#colocarzona"+idzona).append(htmlfechas);

			var cantidadhoras=$("#cantidadhoras_"+idzona).text();
			var can=parseFloat(cantidadhoras)+1;
			$("#cantidadhoras_"+idzona).text(can);
			totalhorarios++;
		}

		//$("#selected-dates").append('Total de horarios seleccionados '+totalhorarios);
	}
		$("#selected-dates").prepend('<p style="text-align:right;">Total de horarios seleccionados: '+totalhorarios+'</p>');
		if (totalhorarios>0) {
			$(".btnfechas").css('display','block');
			$("#titulototalhorarios").css('display','block');

			$("#totalhorarios").text(totalhorarios);
	
		}else{
			$(".btnfechas").css('display','none');
			$("#titulototalhorarios").css('display','none');
			$("#totalhorarios").text(totalhorarios);

		}
	
}


function generateSortFn(props) {
    return function (a, b) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            var name = prop.name;
            var reverse = prop.reverse;
            if (a[name] < b[name])
                return reverse ? 1 : -1;
            if (a[name] > b[name])
                return reverse ? -1 : 1;
        }
        return 0;
    };
};

 function ObtenerTodasEncuestas() {
	$.ajax({
					url: urlphp+'ObtenerTodasEncuestas.php', //Url a donde la enviaremos
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

						var encuestas=msj.respuesta;
						
						if (encuestas.length>0) {
							var html="";
							for (var i =0; i <encuestas.length; i++) {
							html+=`<div class="row">
							<label class="btn btn_colorgray2 ">
								<input type="checkbox" class="chkencuesta" id="inputencuesta_`+encuestas[i].idencuesta+`" >`+encuestas[i].titulo+`
							</label>
							</div>`;	
							}

							$(".listadoencuestas").html(html);

						}

					}
				});
 } 


function EliminarHorario(idhorario) {

	 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                <span>¿Seguro de eliminar este horario?</span>
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
				$("#selected-dates").html('');
	      BorrarElemento(idhorario);
				BorrarElementoObjeto(idhorario);
				Resumenfechas();
				CantidadHorarios();
            }

        },
          verticalButtons: false,
        }).open();

	
}

function NuevoCoach(val) {
		 ObtenerCoaches().then(r => {

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
			   							 			<p style="text-align: center;font-size: 16px;font-weight: bold;margin-bottom:1em;">Seleccionar coach </p>
			   							 		</div>
		   							 		<div class="col-100">
			   							 		<div class="row">
				   							 		<div class="col-100">
				   							 		</div>
				   							 		<div class="col-100">
				   							 		</div>
			   							 		</div>
				   							 		<div class="row">
				   							 			 <form  >
											              <div class="list form-list no-margin margin-bottom">
											                <ul>
											            	<input type="hidden" id="txtposcion" value="-1">
											                <li class="item-content item-input item-input-with-value is-valid licelular">

											                  <div class="item-inner">
											                  <div class="item-title item-floating-label">Coach</div>
											                  <div class="item-input-wrap">
											                 <select name="" id="coaches"></select>
											                </div>
											              </div>
											              </li>

											               <li class="item-content item-input item-input-with-value is-valid licelular">

											                  <div class="item-inner">
											                  <div class="item-title item-floating-label">Pago</div>
											                  <div class="item-input-wrap">
											                <select name="" id="tipo">
				   							 						<option value="0">Porcentaje</option>
				   							 				   	    <option value="1">Monto</option>
				   							 				   	    <option value="2">Por horarios</option>

				   							 					</select>
											                </div>
											              </div>
											              </li>

											               <li class="item-content item-input item-input-with-value is-valid licelular">

											                  <div class="item-inner">
											                  <div class="item-title item-floating-label">Cantidad</div>
											                  <div class="item-input-wrap">
											                  <input type="number" name="txcantidaddescuento" id="txcantidaddescuento" class="input-with-value" />
											                  <span class="input-clear-button"></span>
											                </div>
											              </div>
											              </li>
											            </ul>




											            </div>
											             <div class="row">
											               <div class="col">
											                <button type="button" id="btnguardarcoach" class="button button-fill button-large button-raised margin-bottom color-theme" >GUARDAR</button>
											               </div>
											            </div>
											            </form>


				   							 			
				   							 		</div>
		   							 				<div class="row">
		   							 				</div>

		   				
			   							 			<div class="row">
			   							 			
		   							 				</div>
		   							 		</div>

		   							 		</div>
		   							 		<div class="row" >
		   							 			<div id="horarios"></div>
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

           
            	var html="";
            	if (r.length>0) {
            			html+=`<option value="0">Seleccionar coach </option>`;

            		for (var i = 0; i < r.length; i++) {
            		
            			html+=`<option value="`+r[i].idusuarios+`">`+r[i].nombre+` `+r[i].paterno+` `+r[i].materno+`</option>`;
            		}
            	}

            	$("#coaches").html(html);

          


          },
          opened: function (sheet) {
          
             $("#btnguardarcoach").attr('onclick','GuardarCoachServicio()');

             //console.log(val);
             if (val>=0) {

             	if (asignacioncoach.length>0) {
            
             	var coaches=asignacioncoach[val].idcoach;
												
														var tipo=asignacioncoach[val].tipopago;
														var txcantidaddescuento=asignacioncoach[val].monto;
														var textonombre=asignacioncoach[val].textonombre;
														$("#coaches").val(coaches);
														$("#tipo").val(tipo);
														$("#txcantidaddescuento").val(txcantidaddescuento);
														$("#txtposcion").val(val);
														}
             }
            
          },
          closed:function(sheet){
          

          },
        }
      });

       dynamicSheet1.open();

         });
}

function ObtenerCoaches() {

return new Promise((resolve, reject) => {
			$.ajax({
					url: urlphp+'ObtenerTodosCoaches.php', //Url a donde la enviaremos
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

						var resul=msj.respuesta;
						resolve(resul);
					}
				});

	});
}


function GuardarCoachServicio() {
	var coaches=$("#coaches").val();

	if (coaches>0) {
	var tipo=$("#tipo").val();
	var txcantidaddescuento=$("#txcantidaddescuento").val();
	var textonombre=$("#coaches option:selected").html();
	var txtposcion=$("#txtposcion").val();
	var objeto={
		idcoach:coaches,
		textonombre:textonombre,
		tipopago:tipo,
		monto:txcantidaddescuento
	};

	if (txtposcion==-1) {

		asignacioncoach.push(objeto);
	}else{

	/*	var encontrado="";
		for (var i = 0; i <asignacioncoach.length; i++) {
			if (i==txtposcion) {
					encontrado=i;
					return true;
			}
		}*/


		asignacioncoach[txtposcion]=objeto;
	}
	
	
	PintarCoaches();
dynamicSheet1.close();

	}else{

		alerta('','Seleccionar coach')
	}
}

function PintarCoaches() {
	var html="";
	
	if (asignacioncoach.length>0) {
		for (var i = 0; i <asignacioncoach.length; i++) {
				html+=`

			<div class="col-100  elemento"  style="    margin-top: 1em;
    margin-bottom: 1em;" id="elemento_`+i+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-30 alert-danger text-color-red rounded-circle">
		    <i class="bi bi-person-circle"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    
	    <p style="padding:.5em;">`+asignacioncoach[i].textonombre+`</p>
	    </div>

	  
	    <div class="col-auto" style="text-align: right;">
	    <span class="" style="float: left;padding: .5em;" onclick="EditarCoach(`+i+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarCoach(`+i+`);"><i class="bi-x-circle-fill"></i></span>
	    	</div>

	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;

		}

		
	}
	$("#listadocoach").html(html);
}

function EliminarCoach(posicion) {
	
	var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                <span>¿Seguro de eliminar ?</span>
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

						Eliminar(posicion);

            }

        },
          verticalButtons: false,
        }).open();

	



}

function Eliminar(posicion) {

				if (asignacioncoach.length>0) {
									for (var i = 0; i <asignacioncoach.length; i++) {
										
										if (i == posicion) {
											asignacioncoach.splice(i,1);
											
										}
									}
								}
								PintarCoaches();
}
function EditarCoach(posicion) {

	dynamicSheet2="";
	NuevoCoach(posicion);

	
}



function Guardarservicio2()
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

          	//	if (arraydiaselegidos.length>0) {
          			GuardarservicioNuevo2();

          		/*}else{
          		  	
          		  	alerta('Falta agregar horarios al servicio','');
          		  		}*/
          	}else{
          		alerta('','Datos incompletos');
          	}
          	
          }
 

        },
          verticalButtons: false,
        }).open();

}


function GuardarservicioNuevo2() {
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
		 if($("#Sabado").is('.checked')){

		 sabado=1;
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
		var categoriaservicio=$("#v_categoriaservicio").val();

		

		var modalidad=0;

		if ($('input[name=v_grupo]:checked')) {
			
			 modalidad=$('input[name=v_grupo]:checked').val();


		}

		var modalidadpago=0;
		if ($('input[name=v_grupo2]:checked')) {
			modalidadpago=$('input[name=v_grupo2]:checked').val();

		}
		var perido=$("#v_periodo").val();


		var totalclase=$("#v_totalclase").val();
		var montopagarparticipante=$("#v_montopagarparticipante").val();
		var montopagargrupo=$("#v_montopagargrupo").val();
		var fechainicial=$("#v_fechainicial").val();
		var fechafinal=$("#v_fechafinal").val();
		var datos = new FormData();

			var abiertocliente=$("#v_abiertocliente").is(':checked')?1:0;
		var abiertocoach=$("#v_abiertocoach").is(':checked')?1:0;
		var abiertoadmin=$("#v_abiertoadmin").is(':checked')?1:0;
		var ligarclientes=$("#v_ligarclientes").is(':checked')?1:0;
		var v_numligarclientes=$("#v_numligarclientes").val();
		var v_politicaaceptacionseleccion=$("#v_politicaaceptacionseleccion").val();

		datos.append('v_politicaaceptacionseleccion',v_politicaaceptacionseleccion);
		datos.append('abiertocliente',abiertocliente);
		datos.append('abiertocoach',abiertocoach);
		datos.append('abiertoadmin',abiertoadmin);
		datos.append('ligarclientes',ligarclientes);
		
		var v_politicascancelacion=$("#v_politicascancelacion").val();
		var v_politicasaceptacion=$("#v_politicasaceptacion").val();
		var v_reembolso=$("#v_reembolso").is(':checked')?1:0;
		var v_tiporeembolso=$("#v_tiporeembolso").val();
		var v_cantidadreembolso=$("#v_cantidadreembolso").val();
		var v_politicaaceptacionseleccion=$("#v_politicaaceptacionseleccion").val();
		var v_asistencia=$("#v_asistencia").is(':checked')?1:0;
		var v_asignadocliente=$("#v_asignadocliente").is(':checked')?1:0;
		var v_asignadocoach=$("#v_asignadocoach").is(':checked')?1:0;
		var v_asignadoadmin=$("#v_asignadoadmin").is(':checked')?1:0;
		datos.append('v_politicaaceptacionseleccion',v_politicaaceptacionseleccion);
		datos.append('v_reembolso',v_reembolso);
		datos.append('v_cantidadreembolso',v_cantidadreembolso);
		datos.append('v_asignadocliente',v_asignadocliente);
		datos.append('v_asignadocoach',v_asignadocoach);
		datos.append('v_asignadoadmin',v_asignadoadmin);
		datos.append('v_politicasaceptacion',v_politicasaceptacion);
		datos.append('v_asistencia',v_asistencia);
		datos.append('v_tiporeembolso',v_tiporeembolso);
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
		var membresias=[];
		var descuentos=[];

 
		var zonas=[];
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

		$(".chkzona").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				zonas.push(id);
			}
		});


		var porcentajescoachs=[];
		$(".nombrecoach").each(function(){
			var id=$(this).val();
			coachs.push(id);

			var idelemento=$(this).attr('id').split('_')[1];
			var tipopago=$("#tipo_"+idelemento).val();
			var monto=$("#txtcantidaddescuento_"+idelemento).val();

				var objeto={
					idcoach:id,
					tipopago:pago,
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

		

		var imagenessucursal=localStorage.getItem('fotoimagenservicio');
		datos.append('zonas',zonas);
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
		datos.append('v_fechainicial',fechainicial);
		datos.append('v_fechafinal',fechafinal);
		datos.append('v_modalidadpago',modalidadpago);
		datos.append('v_perido',perido);
		datos.append('v_arraydiaselegidos',arraydiaselegidos);
		/*datos.append('v_periodoinicial',periodoinicial);
		datos.append('v_periodofinal',periodofinal);*/
		datos.append('periodos',JSON.stringify(asignacionperiodos));
		datos.append('v_lunes',lunes);
		datos.append('v_martes',martes);
		datos.append('v_miercoles',miercoles);
		datos.append('v_jueves',jueves);
		datos.append('v_viernes',Viernes);
		datos.append('v_sabado',sabado);
		datos.append('v_domingo',domingo);
		datos.append('v_numparticipantes',v_numparticipantes);
		datos.append('porcentajescoachs',JSON.stringify(asignacioncoach));
		datos.append('imageneservicio',imagenessucursal);
	
	  datos.append('iduser',iduser);
		datos.append('idtipousuario',idtipousuario);

		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		
				  $.ajax({
					url:urlphp+'GuardarServicio.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					contentType: false, //Debe estar en false para que pase el objeto sin procesar
					data: datos, //Le pasamos el objeto que creamos con los archivos
					processData: false, //Debe estar en false para que JQuery no procese los datos a enviar
					cache: false, //Para que˘
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
							 porcentajescoachs=[];
						   	if( resp == 1 ){
								alerta('','Se realizó el registro correctamente');
								arraydiaselegidos=[];
								arraydiaseleccionados=[];
								asignacionperiodos=[];
								asignacioncoach=[];
								localStorage.setItem('valor','');
								localStorage.setItem('fotoimagenservicio','');
									if (localStorage.getItem('idtipousuario')== 0) {
										GoToPage('homeadmin');
									}
									if(localStorage.getItem('idtipousuario')== 5) {
										GoToPage('homecoach');
									}

						 		 }else{
									alerta('','Error.Intente nuevamente');

						  	}		
					  	}
				  });				  					  
		
	 
}
//si es avanzado utiliza esta funcion Guardarservicio avanzado
function Guardarservicio()
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
          	var habilitarhorarios=	localStorage.getItem('habilitarhorarios');

          	if (habilitarhorarios==1) {

          		if (arraydiaselegidos.length>0) {
          		
          			GuardarservicioNuevo();
          		
          		}else{
          		  
          		  alerta('Falta agregar horarios al servicio','');

          		}
          	}else{

          			GuardarservicioNuevo();

          	}
          		




          	}else{
          		alerta('','Datos incompletos');
          	}
          }



        },
          verticalButtons: false,
        }).open();

}

function LimpiarVariableHorarios() {
	 arraydiaselegidos=[];
 	arraydiaseleccionados=[];

}
	/*if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{	
*/
function GuardarservicioNuevo() {
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
	/*	if($(".lbldomingo").hasClass('active')){

		 domingo=1;
		}
		 if($(".lbllunes").hasClass('active')){

		 lunes=1;
		}
		 if($(".lblmartes").hasClass('active')){

		 martes=1;
		}
		 if($(".lblmiercoles").hasClass('active')){

		 miercoles=1;
		}
		 if($(".lbljueves").hasClass('active')){

		 jueves=1;
		}
		 if($(".lblviernes").hasClass('active')){

		 Viernes=1;
		}
		 if($(".lblsabado").hasClass('active')){

		 sabado=1;
		}	*/

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

		var v_aceptarserviciopago=$("#v_aceptarserviciopago").val();

	
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

		/*$(".chkzona").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				zonas.push(id);
			}
		});
*/

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

		//console.log(porcentajescoachs);

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
		var v_politicaaceptacionseleccion=$("#v_politicaaceptacionseleccion").val();


		var v_reembolso=$("#v_reembolso").is(':checked')?1:0;
		var v_asistencia=$("#v_asistencia").is(':checked')?1:0;
		var v_tiporeembolso=$("#v_tiporeembolso").val();

		var v_cantidadreembolso=$("#v_cantidadreembolso").val();
		var v_asignadocliente=$("#v_asignadocliente").is(':checked')?1:0;
		var v_asignadocoach=$("#v_asignadocoach").is(':checked')?1:0;
		var v_asignadoadmin=$("#v_asignadoadmin").is(':checked')?1:0;
		var imagenessucursal=localStorage.getItem('fotoimagenservicio');
		datos.append('v_politicaaceptacionseleccion',v_politicaaceptacionseleccion);
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
		datos.append('v_aceptarserviciopago',v_aceptarserviciopago);
		datos.append('fechashorasseleccionadas',JSON.stringify(fechashorasseleccionadas));
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
									 //onclick="ActivarTab(this,'profile')"
			$("#aceptacion-tab").attr('onclick','ActivarTab(this,"aceptacion")');
									//document.getElementById("contact-tab").click();

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

		/*var bandera6=1;
		
		if (v_politicascancelacion=='') {

			$("#lbldescripcionpolitica").addClass('inputrequerido');
			bandera6=0;
			
		}*/



/*		if (seccion2==1 && seccion3==1 && seccion4==1 && seccion5==1 &&seccion6==1) {
			//document.getElementById("politicas-tab").click();


		}
	
		if (seccion2==1 && seccion3==1 && seccion4==1 && seccion5==1 && seccion6==0) {
			document.getElementById("aceptacion-tab").click();


		}
		if (seccion2==1 && seccion3==1 && seccion4==1 && seccion5==0 && seccion6==0) {
			document.getElementById("costos-tab").click();


		}

		if (seccion2==1 &&seccion3==1 && seccion4==0 && seccion5==0 && seccion6==0) {
			document.getElementById("contact-tab").click();

		}

		if (seccion2==1 && seccion3==0 && seccion4==0 && seccion5==0 && seccion6==0) {
		document.getElementById("profile-tab").click();

		}*/
		
		// $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				if (bandera1==1) {
		//setTimeout(function(){
				  $.ajax({
					url:urlphp+'GuardarServicio2.php', //Url a donde la enviaremos
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
								alerta('','Se realizó el registro correctamente');
						 	
								arraydiaselegidos=[];
								arraydiaseleccionados=[];
								asignacionperiodos=[];
								asignacioncoach=[];
								localStorage.setItem('fotoimagenservicio','');

									if (localStorage.getItem('idtipousuario')==0) {
										GoToPage('homeadmin');
									
									}
									if(localStorage.getItem('idtipousuario')==5) {
										
										GoToPage('homecoach');
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

function NuevoPeriodo() {
	var fechafinal=$("#v_fechainicial").val();
	
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
			   							 			<p style="text-align: center;font-size: 16px;font-weight: bold;margin-bottom:1em;">Nuevo perido </p>
			   							 		</div>
		   							 		<div class="col-100">
			   							 		<div class="row">
				   							 		<div class="col-100">
				   							 		</div>
				   							 		<div class="col-100">
				   							 		</div>
			   							 		</div>
				   							 		<div class="row">
				   							 			 <form  >
											              <div class="list form-list no-margin margin-bottom">
											                <ul>
											            	<input type="hidden" id="txtposcionperiodo" value="-1">
											                <li class="item-content item-input item-input-with-value is-valid licelular">

											                  <div class="item-inner">
											                  <div class="item-title item-floating-label">Periodo inicial</div>
											                  <div class="item-input-wrap">
											                  <input type="date" id="v_periodo1">
												                </div>
											              </div>
											              </li>

											               <li class="item-content item-input item-input-with-value is-valid licelular">

											                  <div class="item-inner">
											                  <div class="item-title item-floating-label">Periodo final</div>
											                  <div class="item-input-wrap">
											               			 <input type="date" id="v_periodo2">

											                </div>
											              </div>
											              </li>

							
											            </ul>




											            </div>
											             <div class="row">
											               <div class="col">
											                <button type="button" id="btnguardarperiodo" class="button button-fill button-large button-raised margin-bottom color-theme" >GUARDAR</button>
											               </div>
											            </div>
											            </form>


				   							 			
				   							 		</div>
		   							 				<div class="row">
		   							 				</div>

		   				
			   							 			<div class="row">
			   							 			
		   							 				</div>
		   							 		</div>

		   							 		</div>
		   							 		<div class="row" >
		   							 			<div id="horarios"></div>
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

          $("#v_periodo1").val(fechafinal);
          $("#v_periodo2").val(fechafinal);

            $("#btnguardarperiodo").attr('onclick','GuardarPeriodoServicio()');

          },
          opened: function (sheet) {
          
 
            
          },
          closed:function(sheet){
          

          },
        }
      });

       dynamicSheet1.open();

}

function GuardarPeriodoServicio() {
	var fechainicial=$("#v_periodo1").val();
	var fechafinal=$("#v_periodo2").val();
	var txtposcionperiodo=$("#txtposcionperiodo").val();
	var objeto={
		fechainicial:fechainicial,
		fechafinal:fechafinal
		
	};

	if (txtposcionperiodo==-1) {

		asignacionperiodos.push(objeto);
	}else{



		asignacionperiodos[txtposcionperiodo]=objeto;
	}
	
	dynamicSheet1.close();
	PintarPeriodos();
}

function PintarPeriodos() {
	var html="";
	if (asignacionperiodos.length>0) {
		for (var i = 0; i < asignacionperiodos.length; i++) {
				html+=`

			<div class="col-100 medium-33 large-50 elemento"  style="    margin-top: 1em;
    margin-bottom: 1em;" id="elementonuevo_`+i+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-30 alert-danger text-color-red rounded-circle">
		   <i class="bi bi-calendar-event"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    
	    <p style="padding:.5em;">`+asignacionperiodos[i].fechainicial+` - `+asignacionperiodos[i].fechafinal+`</p>
	    </div>

	  
	    <div class="col-auto" style="text-align: right;">
	    <span class="" style="float: left;padding: .5em;" onclick="EditarPeriodoServicio(`+i+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarPeriodoServicio(`+i+`);"><i class="bi-x-circle-fill"></i></span>
	    	</div>

	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
		}
		
	}
	$("#listadoperiodo").html(html);


}

function EditarPeriodoServicio(posicion) {
	NuevoPeriodo();

	var fechainicial=asignacionperiodos[posicion].fechainicial;
	var fechafinal=asignacionperiodos[posicion].fechafinal;
	
	$("#fechainicial").val(fechainicial);
	$("#fechafinal").val(fechafinal);
	$("#txtposcionperiodo").val(posicion);

}
function EliminarPeriodoServicio(posicion) {

 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                <span>¿Seguro que desea eliminar el periodo?</span>
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
					if (asignacionperiodos.length>0) {
											for (var i = 0; i <asignacionperiodos.length; i++) {
												
												if (i == posicion) {
													asignacionperiodos.splice(i,1);
												
												}
											}
										}
							PintarPeriodos();

            }

        },
          verticalButtons: false,
        }).open();

	
}

function ObtenerOrdenServicio() {

	 $.ajax({
					url:urlphp+'ObtenerOrdenServicio.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
						$("#v_orden").val(resp);
										
					  	}
				  });		
}


function Permitirligar() {
	if ($("#v_ligarclientes").is(':checked')) {
		$("#cantidadligar").css('display','block');
		}else{
		$("#cantidadligar").css('display','none');
		$("#v_numligarclientes").val('');
	}
}

function HabilitarcantidadReembolso() {
	if ($("#v_reembolso").is(':checked')) {
		$(".divcantidadreembolso").css('display','block');
		}else{
		$("#v_tiporeembolso").val('');
		$("#v_cantidadreembolso").val('');
		$(".divcantidadreembolso").css('display','none');
	}
}
function Colocardescripcion() {
	var v_titulo=$("#v_titulo").val();
	$("#v_descripcion").val(v_titulo);
}

function Validacion() {
	var titulo=$("#v_titulo").val();
	var descripcion=$("#v_descripcion").val();
	var categoria=$("#v_categoria").val();
	var orden=$("#v_orden");
	var estatus=$("#v_estatus").val();
	var avanzado=$("#avanzado").val();

	$(".lititulo").removeClass('requerido');
	$(".lidescripcion").removeClass('requerido');
	$(".litiposervicio").removeClass('requerido');
	$(".liorden").removeClass('requerido');
	$(".liseleccionardias").removeClass('requerido');
	$(".licategoria").removeClass('requerido');
	$(".licosto").removeClass('requerido');
	$(".limonto").removeClass('requerido2');
	$(".linumparticipantesmin").removeClass('requerido');
	$(".linumparticipantesmax").removeClass('requerido');
	$(".lidescripcionpoliticas").removeClass('requerido');
	$(".lifechainicial").removeClass('requerido');
	$(".lifechafinal").removeClass('requerido');
 $(".liseleccionardias").removeClass('requerido2');
 $(".liseleccionafechas").removeClass('requerido2');
	$(".liperiodosdecobro").removeClass('requerido2')
	$(".lipoliticasaceptacion").removeClass('requerido');
	$(".parrafopoliticasaceptacion").removeClass('requerido2');

var bandera=1;
	if (titulo=='') {
		bandera=0;
		$(".lititulo").addClass('requerido');
	}
	if (descripcion=='') {
		bandera=0;
		$(".lidescripcion").addClass('requerido');

	}
	if (categoria==0) {
		bandera=0;
		$(".litiposervicio").addClass('requerido');

		
	}
	if (orden=='') {
		bandera=0;
			$(".liorden").addClass('requerido');

	}
	if (estatus=='') {
		bandera=0;
	}
	var contardias=0;
	if (avanzado==1) {

		var v_categoriaservicio=$("#v_categoriaservicio").val();
		if (v_categoriaservicio==0) {
			bandera=0;
			$(".licategoria").addClass('requerido');

		}


		if($("#Domingo").is(':checked')){

		 contardias++;
		}
		 if($("#Lunes").is(':checked')){

		 contardias++;
		}
		 if($("#Martes").is(':checked')){

		 contardias++;
		}
		 if($("#Miercoles").is(':checked')){

		 contardias++;
		}
		if($("#Jueves").is(':checked')){

		 contardias++;
		}
		 if($("#Viernes").is(':checked')){

		 contardias++;
		}
		 if($("#Sabado").is(':checked')){

		 contardias++;
		}	

		if (contardias==0) {
			bandera=0;
			$(".liseleccionardias").addClass('requerido');

		}
		var fechainicial=$("#v_fechainicial").val();
		var fechafinal=$("#v_fechafinal").val();
		

		if (!isValidDate(fechainicial)) {
			bandera=0;
			$(".lifechainicial").addClass('requerido');
		}

	
		if (!isValidDate(fechafinal)) {
			bandera=0;
			$(".lifechafinal").addClass('requerido');

		}

		if (localStorage.getItem('habilitarhorarios')==1) {
				if(arraydiaseleccionados.length==0){
				bandera=0;
			$(".liseleccionafechas").addClass('requerido2');

			}
		}

		

			
	if (localStorage.getItem('idtipousuario')== 0) {

			var costo=$("#v_costo").val();

			if (costo=='') {

				bandera=0;
			  $(".licosto").addClass('requerido');

			}

			if (asignacionperiodos.length==0) {
				bandera=0;
			  $(".liperiodosdecobro").addClass('requerido2');
			}

			var modalidad=0;
			  if(document.querySelector('input[name="v_grupo"]:checked')) { 
			     	modalidad=$('input[name="v_grupo"]:checked').val();
			     }

			if (modalidad==0) {
				bandera=0;
				$(".limonto").addClass('requerido2');
			}

			var numeroparticipantesmin=$("#v_numparticipantesmin").val();
			var numeroparticipantesmax=$("#v_numparticipantesmax").val();
			if ( numeroparticipantesmin=='') {
				bandera=0;
				
				$(".linumparticipantesmin").addClass('requerido');

			}
			if (numeroparticipantesmax=='') {
				bandera=0;
				$(".linumparticipantesmax").addClass('requerido');

			}

			var politicasaceptacion=$("#v_politicasaceptacion").val();
			if (politicasaceptacion == '') {
				bandera=0;
				$(".lidescripcionpoliticas").addClass('requerido');
				$(".parrafopoliticasaceptacion").addClass('requerido2');

			}

	}
}

	/*if (bandera==1) {
		$("#divflotantea").css('display','block');
	}else{
		$("#divflotantea").css('display','none');

	}*/

	return bandera;

}

function CambiarColor(ele) {
		
	$('.'+ele).removeClass("requerido");
	$('.'+ele).addClass("posicionblue");

}
function CambiarColor2(ele) {
	$('.'+ele).removeClass("requerido");
	$('.'+ele).removeClass("posicionblue");

}

function BuscarfechaArray2(fecha) {
	
	if (fechasglobal2.length>0) {
		encontrado=false;

		for (var i = 0; i <fechasglobal2.length; i++) {
			
			if (fechasglobal2[i].fecha==fecha) {
				encontrado=true;
				return true;
			}

		}

		return encontrado;

	}else{

		return false;
	}
}

function ObtenerPoliticasaceptacion() {
			 $.ajax({
					url:urlphp+'ObtenerPoliticasaceptacion.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
							
							if (resp.length>0) {
								var html="";
								html+=`<option value="0">SELECCIONAR POLÍTICA DE ACEPTACIÓN</option>`;

								for (var i = 0; i <resp.length; i++) {
									html+=`<option value="`+resp[i].idpoliticasaceptacion+`">`+resp[i].nombre+`</option>`;
								}
								$("#v_politicaaceptacionseleccion").html(html);
							}										
					  	}
				  });		
}

function SeleccionarPolitica() {
	var idpoliticasaceptacion=$("#v_politicaaceptacionseleccion").val();
	var datos="idpoliticasaceptacion="+idpoliticasaceptacion;
	
			 $.ajax({
					url:urlphp+'ObtenerPoliticaaceptacion.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json',
					data:datos,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){

						var resp=msj.respuesta;

						if (resp.length>0) {
							var descripcion=resp[0].descripcion;						}
						   $("#v_politicasaceptacion").val(descripcion);							
					  	}
				  });	
}

function BuscarfechaenArrayElegidos(fechaformada) {
	var encontrado=false;
	if (arraydiaselegidos.length>0) {
		for (var i = 0; i < arraydiaselegidos.length; i++) {
			if (arraydiaselegidos[i]==fechaformada) {
				encontrado=true;
				break;
			}
			
		}
	}

	return encontrado;
}

function ValidarCheckmodalidad(valor) {
	$("#v_aceptarserviciopago").attr('checked',false);		

	if (valor==1) {
		//habilitaropcionpago
		$("#divaceptarserviciopago").css('display','block');

			} else {

				$("#divaceptarserviciopago").css('display','none');
				$("#v_aceptarserviciopago").val(0);

		}
}

function HabilitarOpcionaceptarserviciopago() {

	if($("#v_aceptarserviciopago").is(':checked')) {
		
		$("#v_aceptarserviciopago").val(1);
	
		}else{

		$("#v_aceptarserviciopago").val(0);
	}
}

function CargarZonas() {

				$.ajax({
					url:urlphp+'ObtenerEspacios.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
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
					
					var respuesta=msj.respuesta;
					PintarEspacios(respuesta);

					
			
					}
				});
}

function PintarEspacios(respuesta) {

	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idzona+`">`+respuesta[i].nombre+`</option>`;
		}
	}

	$("#v_zonas").html(html);
}

function ObtenerHorariosCategoria() {

		var v_zonas=[];

$(".chkzona").each(function( index ) {
	 if($( this ).is(':checked')){

	 		var id=$(this).attr('id');
	 		var dividir=id.split('_');

	 		v_zonas.push(dividir[1]);

			 }

	 	;
	});


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
		 if($("#Sabado").is('.checked')){

		 sabado=1;
		}	

	//if(v_zonas.length>0){

	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

	var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonas;
	

	$.ajax({
					url:urlphp+'ObtenerHorariosCategoria.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					async:false,
					data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
			/*		var smartSelect = app.smartSelect.get('.smartselectorhora');

					smartSelect.unsetValue();
					*/
					var respuesta=msj.respuesta;
					PintarHorariosCategoria(respuesta);
			
					}
				});
}

function ObtenerHorariosCategoria2(idcategoria,idcategoriaservicio,valor,lunes,martes,miercoles,jueves,viernes,sabado,domingo) {

		var v_zonas=[];

$(".chkzona").each(function( index ) {
	 if($( this ).is(':checked')){

	 		var id=$(this).attr('id');
	 		var dividir=id.split('_');

	 		v_zonas.push(dividir[1]);

			 }

	 	;
	});

	var v_tipocategoria=idcategoriaservicio;
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

	var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+viernes+"&sabado="+sabado+"&v_categoria="+idcategoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonas;
	

	$.ajax({
					url:urlphp+'ObtenerHorariosCategoria.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',
					async:false,
					data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
			/*		var smartSelect = app.smartSelect.get('.smartselectorhora');

					smartSelect.unsetValue();
					*/
					var respuesta=msj.respuesta;
					PintarHorariosCategoria(respuesta);
			
					}
				});
}

function PintarHorariosCategoria(respuesta) {
	var html="";
/*	html+=`<option value="0">Seleccionar horario</option>`;
*/
	if (respuesta.length>0) {

		for (var i = 0; i < respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].horainicial+'-'+respuesta[i].horafinal+`">`+respuesta[i].horainicial+'-'+respuesta[i].horafinal+`</option>`;
		}


	}

	$("#v_horarios").html(html);

	
}

function HabilitarSeleccion(argument) {
	
	if($("#habilitarseleccion").is(':checked')){
		$("#habilitarseleccion").val(1);
		$("#habilitarseleccion").prop('checked',true);
	}else{
		$("#habilitarseleccion").val(0);
		$("#habilitarseleccion").prop('checked',false);

	}
}

function CargaAutomatica(id) {
	

						 		var encontrado=Buscardia(id);

						 		if (encontrado==1) {
						 			 var element = document.getElementById(id);
						 			 if (element !== null) {
 									 element.classList.remove("activohorario");
 									 element.style.border='none';

 								 	BorrarElemento(id);
 								 	BorrarElementoObjeto(id);
 								 	element.style.color='black';
 								 }
						 		}else{

						 			arraydiaselegidos.push(id);
						 			var iddividido = id.split('-');
									
									var zonaelegida =zonasarray.find( zona => zona.idzona === iddividido[5]);
									var color=zonaelegida.color;
									
						 			var dividirfecha=id.split('-');
						 			console.log('aq');

						 			console.log(dividirfecha);
						 			var objeto={
						 				id:id,
						 				fecha:dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2],
						 				idzona:dividirfecha[5],
						 				horainicial:dividirfecha[3],
						 				horafinal:dividirfecha[4],
						 				color:color,

						 			};
						 			arraydiaseleccionados.push(objeto);

						 			/*var element = document.getElementById(id);
								    element.classList.add("activohorario");
								    element.style.border="1px solid "+color;
			*/
						 		}
}


function QuitarFechaHoraZona(idzona) {

	 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                <span>¿Seguro que desea eliminar el espacio con los horarios?</span>
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
					console.log('entro a eliminar');
				for (var i = 0; i <arraydiaselegidos.length; i++) {
						
						var id=arraydiaselegidos[i];
						 var elemento= id.split('-');
						 console.log(elemento);
						if (elemento[5] == idzona) {
							
							arraydiaselegidos.splice(i,1);
							 i--; //ajustar indice
						}
				}


				for (var i = 0; i <arraydiaseleccionados.length; i++) {
						
						var id=arraydiaseleccionados[i].id;
						 var elemento= id.split('-');

						 console.log(elemento);
					if (elemento[5] == idzona) {
						arraydiaseleccionados.splice(i,1);
						i--; //ajustar indice
					}
				}



				Resumenfechas();
				CantidadHorarios();

            }

        },
          verticalButtons: false,
        }).open();

	
	
	

}


function VerificarPermisoUsuario() {
	
var pagina = "Obtenerdatospersonales.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var resp=datos.respuesta.habilitarhorarios;
			if (resp==1) {
  $("#btnaplicar").attr('onclick','AplicarFechas()');
  $(".contadorhorarios").css('display','block');
  $(".divseleccionarhorarios").css('display','block');
		 	}else{

  $("#btnaplicar").attr('onclick','AplicarSeleccion()');
  $(".contadorhorarios").css('display','none');
  $(".divseleccionarhorarios").css('display','none');

			}

		localStorage.setItem('habilitarhorarios',resp);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function AplicarSeleccion() {
	
	//console.log(arraydiaselegidos);
	var v_zonas=[];
	//arraydiaselegidos=[];
	//arraydiaseleccionados=[];


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
	var v_zonaelegida=$("#v_zonas").val();
	var v_horarios=$("#v_horarios").val();
	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonaelegida+"&v_horarios="+v_horarios;

			$.ajax({
					url: urlphp+'ObtenerHorariosFechasSeleccion.php', //Url a donde la enviaremos
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
						 zonasarray = msj.zonas;
					
						 var respuesta=msj.arrayfechahora;

						 console.log(respuesta);
						 fechasglobal2=respuesta;
						eventos=[];
						var html="";
						 if (respuesta.length>0) {
						 
						 for (var i = 0; i < respuesta.length; i++) {
						 		
						 		 var horas=respuesta[i].horas;

						 		 if (horas.length>0) {
						 	html+=`

						 		<div class="col-100 fechas divfechas" style="height:auto;" >
						 					<div class="row"   id="div_`+respuesta[i].fecha+`" onclick="VerHorariosD(this)">
						 								<span class="col-80" style="line-height: 0.9;">`+respuesta[i].fecha+`</span>
						 			 	<span class="col-20" style="float: right;"  data-respuesta='${JSON.stringify(respuesta[i])}'>
						 			 	<i class="bi bi-chevron-down"></i>
						 			 	</span>
						 					</div>
						 				
						 			 	<div id="horarios_`+respuesta[i].fecha+`" class="row" style="display:none;background: white;padding-top: 0.5em;"></div>

						 		</div>
						 	`;
					
									}

															 respuesta[i].horas.sort(compararHoras);


							 }
					
						$("#listadofechas").html(html);



							for (var j = 0; j < respuesta.length; j++) {
											var html2="";

									  var horas=respuesta[j].horas;
									  var fecha=respuesta[j].fecha;
									for (var i = 0; i <horas.length; i++) {
												html2+=`
															<div class="col-100 horas" id="horas_`+fecha+`_`+horas[i]+`" style="background:white;padding-top: 0.5em;padding-bottom: 0.5em;" onclick="SeleccionarHora('`+fecha+`','`+horas[i]+`',this)" >

												 					<span class="col-80">`+horas[i]+`</span>
												 			 	<span class="col-20" style="float: right;"  >
												 			 	
												 			 	</span>

												 		</div>

												`;
									}
							$("#horarios_"+fecha).html(html2);
							}



						}else{

							alerta('','No se encuentran horarios disponibles dentro del periodo');
							//AbrirNotificacion('No se encuentran horarios disponibles dentro del periodo','mdi mdi-alert-circle');
					
						}
						$(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');

						

					}
				});
}

function VerHorariosD(elemento) {


  var idelemento=elemento.id;


  var dividir=idelemento.split('_');

  var elemento = $('#horarios_'+dividir[1]);
  var display = elemento.css('display');


  if (display === 'block') {

  	$('#horarios_'+dividir[1]).css('display','none');
  
  } else {
  $('#horarios_'+dividir[1]).css('display','block');

   
  }

}

var fechashorasseleccionadas=[];

function SeleccionarHora(fecha,hora,elemento) {


  var objeto = {
    fecha: fecha,
    hora: hora
  };
  	
  	if (elemento.classList.contains('horaselecciona')) {

  				elemento.classList.remove('horaselecciona');


  		  for (var i = 0; i < fechashorasseleccionadas.length; i++) {
			    if (fechashorasseleccionadas[i].fecha === fecha) {
			      var horas = fechashorasseleccionadas[i].horas;
			      var indiceHora = horas.indexOf(hora);
			      if (indiceHora !== -1) {
			        horas.splice(indiceHora, 1);
			       
			        break;
			      }
			    }
			  }


  	}else{

  	elemento.classList.add('horaselecciona');

			 var encontrado = false;
		  for (var i = 0; i < fechashorasseleccionadas.length; i++) {
		    if (fechashorasseleccionadas[i].fecha === fecha) {
		      encontrado = true;
		      fechashorasseleccionadas[i].horas.push(hora);
		      break;
		    }
		  }

		  if (!encontrado) {
		    fechashorasseleccionadas.push({
		      fecha: fecha,
		      horas: [hora]
		    });
		  }

		  console.log(fechashorasseleccionadas);

  	}
}


function compararHoras(horaA, horaB) {
  // Extraemos solo la hora sin los minutos
  var horaSeparadaA = horaA.split(":")[0];
  var horaSeparadaB = horaB.split(":")[0];

  // Convertimos las horas a números enteros
  var horaNumA = parseInt(horaSeparadaA);
  var horaNumB = parseInt(horaSeparadaB);

  // Comparamos las horas numéricamente
  if (horaNumA < horaNumB) {
    return -1;
  } else if (horaNumA > horaNumB) {
    return 1;
  } else {
    return 0;
  }
}
