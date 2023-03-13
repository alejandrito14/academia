function ListadoPagosCoachLista() {
      $(".listadopagos").html('');

	var pagina = "ObtenerTodosPagosCoach.php";
	var id_user=localStorage.getItem('idcoach');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(respuesta){

			var pagos=respuesta.respuesta;
			PintarpagosCoach(pagos);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function ListadoPagosCoach() {
    $(".listadopagos").html('');

	var pagina = "ObtenerTodosPagosCoach.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(respuesta){

			var pagos=respuesta.respuesta;
			PintarpagosCoach(pagos);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarpagosCoach(pagos) {
	    var html="";
  var sumatotalcoach=0;
  var sumatotalcoachpagado=0;

	 if (pagos.length>0) {
   var idservicio=0;
    for (var i = 0; i <pagos.length; i++) {

      var claseestatus="";

      if (pagos[i].estatuspago==0) {
        claseestatus="notapendiente";

      }
       if (pagos[i].estatuspago==1) {
        claseestatus="notaaceptado";

      }

       if (pagos[i].estatuspago==2) {
        claseestatus="notacancelado";
      }

    
      var cant=0;
      if (idservicio!=pagos[i].idservicio) {
        sumatotalcoach=0;
        sumatotalcoachpagado=0;
      	html=`
      		<div class="row margin-bottom margin-top pservicio_`+pagos[i].idservicio+`" id="pservicio_`+pagos[i].idservicio+`" >
                <div class="col">
                <h5 class="title" style="margin-left: -0.5em;">
              `+pagos[i].concepto+`
                </h5>

                  <h6 class="title" style="margin-left: -0.5em;">
              `+pagos[i].periodoinicial+`-`+pagos[i].periodofinal+`
                </h6>
                </div>
                <div class="col-auto align-self-center">
                </div>
              </div>
             	<div class="row pservicio_ pservicio_`+pagos[i].idservicio+`" id="pservicio1_`+pagos[i].idservicio+`">
		             	<div class="col-100" style="background:white;">
		               	<input type="text" style="width: 5%;float: left;color: black!important;" class="canti_`+pagos[i].idservicio+`" value="0" disabled>
		               		<span style="line-height: 2.6;">alumno (s)</span>
		               	</div>
		               	

             	</div>

             	</div>
               <ul class=" list media-list no-margin pservicio_ pservicio_`+pagos[i].idservicio+` pagos_`+pagos[i].idservicio+`" style="list-style: none;background: white;">
        
                </ul>



                        <div class="row">
                    <div class="col-100" style="background:white;">
                      <span style="line-height: 2.6;font-weight:bold;">Resúmen</span>
                      <div class="divresumen_`+pagos[i].idservicio+`"></div>
                    </div>
                    

              </div>
      	`;

      	idservicio=pagos[i].idservicio;

      	    $(".listadopagos").append(html);


      }
      var usuario=pagos[i].corresponde[0].nombre+' '+pagos[i].corresponde[0].paterno;
      html=`
        <li class="list-item pservicio_ pago_`+pagos[i].idnotapago+`" id="pago_`+pagos[i].idnotapago+`">
                    <div class="row">
                        <div class="col-70">
                            

                          <p class="text-muted small"  id="concepto_`+pagos[i].idnotapago+`">
                             `+usuario+`
                            </p>`;
                            var resta=pagos[i].montosindescuento-pagos[i].descuento-pagos[i].descuentomembresia;
                       html+=`<p class="text-muted small">Subtotal: $`+formato_numero(pagos[i].montosindescuento,2,'.',',')+`</p>`;
                       html+=`<p class="text-muted small">Descuento: $`+formato_numero(parseFloat(pagos[i].descuento)+parseFloat(pagos[i].descuentomembresia),2,'.',',')+`</p>`;
    	                 html+=`<p class="text-muted small">Total: $`+formato_numero(resta,2,'.',',')+`</p>`;
                       html+=` <span class="text-muted small `+claseestatus+ `">`+pagos[i].textoestatus+`</span>`;


                          	if (pagos[i].tipopago==0) {//porcentaje
                          		html+=`<p class="text-muted small">Porcentaje: `+pagos[i].montopagocoach+`%</p>`;
                          	}

                          	if (pagos[i].tipopago==1) {//monto
                          		html+=`<p class="text-muted small">Monto: $`+pagos[i].montopagocoach+`</p>`;

                          	}
                          	html+=`<p class="text-muted small">Total a pagar coach: $`+formato_numero(pagos[i].monto,2,'.',',')+`</p>`;

                                   if (pagos[i].estatuscoach == 1) {

                          html+=`<p class="small" style="color:#59c158;">Pago realizado  <i class="bi bi-check2"></i></p>`;

                        }
                       html+=`</div>`;


                       
                       /*  <div class="col-30"><a id="btncalendario" style=" color: #007aff!important;text-align: center;justify-content: center;display: flex;" onclick="Detallepago(`+pagos[i].idnotapago+`)">Ver detalle</a>
                        </div> </div>*/
                  if (localStorage.getItem('idtipousuario')==0) {


                    if (pagos[i].estatuscoach == 0 && pagos[i].estatuspago==1) {


                        
                 html+=`	<div class="col-30">
                        	<a id="btncalendario" class="button button-fill " style="color:white!important;text-align: center;justify-content: center;display: flex;" onclick="PagarCoach(`+pagos[i].idpago+`,'`+pagos[i].concepto+`',`+pagos[i].monto+`,`+pagos[i].idservicio+`,`+pagos[i].tipopago+`,`+pagos[i].montopagocoach+`,`+pagos[i].montopago+`)">Pagar</a>
                        	</div>
                    	</div>`;

                        }
                    }



               html+=`  </li>

      `;
       if (pagos[i].estatuscoach == 0) {
       
        sumatotalcoach=parseFloat(sumatotalcoach)+parseFloat(pagos[i].monto);
        
      }

       if (pagos[i].estatuscoach == 1) {
       
        sumatotalcoachpagado=parseFloat(sumatotalcoachpagado)+parseFloat(pagos[i].monto);

      }
     
      var cantidad=$(".canti_"+pagos[i].idservicio+"").val();
    
      var sumaa=parseInt(cantidad) + parseInt(1);
    	
      $(".canti_"+pagos[i].idservicio+"").val(sumaa);

      $(".pagos_"+pagos[i].idservicio).append(html);
      
      var total=parseFloat(sumatotalcoach)-parseFloat(sumatotalcoachpagado);

      if (total<0) {
        total=0;
      }
     var color="black";
      if (total>0) {
        color="red";
      }
      var htmltotalcoach="";
      htmltotalcoach+=`
        <p>Total a pagar: $`+formato_numero(sumatotalcoach,2,'.',',')+`</p>
        <p>Pagado: $`+formato_numero(sumatotalcoachpagado,2,'.',',')+`</p>
        <p>Total: <span style="color:`+color+`">$`+formato_numero(total,2,'.',',')+`</span></p>

      `;
      $(".divresumen_"+pagos[i].idservicio+"").html(htmltotalcoach);

    }

  }else{
  	 $(".listadopagos").html(html);

  }
}

function ActivoPagoCoach(boton) {
	$(".btnclick").removeClass('button-active');
	if (boton==1) {
	$("#btnpendiente").addClass('button-active');
	  	 $(".listadopagos").html("");

		ListadoPagosCoach();
	}
	if (boton==2) {
	$(".listadopagos").html("");

	$("#btnhistorial").addClass('button-active');
		ListadoPagosCoachHistorial();
	}
}

function ListadoPagosCoachHistorial() {
	var pagina = "ObtenerTodosPagosCoachHistorial.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(respuesta){

			var pagos=respuesta.respuesta;
			PintarpagosHistorialCoach(pagos);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function PintarpagosHistorialCoach(pagos) {
	    var html="";

	if (pagos.length>0) {
   	var idservicio=0;
    for (var i = 0; i <pagos.length; i++) {

      var claseestatus="";

      if (pagos[i].estatus==0) {
        claseestatus="notapendiente";
      }
       if (pagos[i].estatus==1) {
        claseestatus="notaaceptado";
      }

       if (pagos[i].estatus==2) {
        claseestatus="notacancelado";
      }


          if (idservicio!=pagos[i].idservicio) {
          
            html=`
      			<div class="row margin-bottom margin-top ">
                <div class="col">
                <h5 class="title" style="margin-left: -0.5em;">
              `+pagos[i].concepto+`
                </h5>
                </div>
                <div class="col-auto align-self-center">
               
                </div>
              </div>

               <ul class="list media-list no-margin pagos_`+pagos[i].idservicio+`" style="list-style: none;background:white;">
        
                </ul>`;

      			idservicio=pagos[i].idservicio;

      	   	 	$(".listadopagos").append(html);

            }

                  var usuario=pagos[i].corresponde[0].nombre+' '+pagos[i].corresponde[0].paterno;


      html=`
        <li class="list-item" id="pago_`+pagos[i].idnotapago+`">
                    <div class="row">
                        <div class="col-70">
                            <p class="text-muted "  id="concepto_`+pagos[i].idnotapago+`">
                               Pago `+pagos[i].concepto+`
                            </p>

                          <p class="text-muted small">Pagado `+pagos[i].fechaformatopago+`</p>
                            <p class="text-muted small "  id="concepto_`+pagos[i].idnotapago+`">
                              Corresponde a `+usuario+`
                            </p>
                          <p class="text-muted small">$`+formato_numero(pagos[i].monto,2,'.',',')+`</p>
                        `;
                          	if (pagos[i].tipopagocoach==0) {//porcentaje
                          		html+=`<p class="text-muted small">Porcentaje:`+pagos[i].montopagocoach+`%</p>`;
                          	}

                          	if (pagos[i].tipopagocoach==1) {//monto
                          		html+=`<p class="text-muted small">Monto:`+pagos[i].montopagocoach+`</p>`;

                          	}
                          	html+=`<p class="text-muted small">Pago:$`+formato_numero(pagos[i].montopago,2,'.',',')+`</p>`;


                      html+=`  <span class="text-muted small `+claseestatus+`">`+pagos[i].textoestatus+`</span>


                        </div>`;
                     
                   html+= ` </div>
                 </li>

      `;

       $(".pagos_"+pagos[i].idservicio).append(html);

    }

  }

     // $(".listadopagos").html(html);

}


function MostarCoaches() {
	var pagina = "ObtenerCoachesAdmin.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){
			var respuesta=resp.respuesta;
			PintarListaCoaches(respuesta);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarListaCoaches(respuesta) {
	var html="";
	if (respuesta.length>0) {

		html+=`
			<div style="list-style: none; overflow: scroll;">
		`;
		for (var i = 0; i <respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				if (respuesta[i].sexo=='M') {

                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
        
                }
 
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			html+=`

			<li style="
    border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
              		  <div class="col-20">
                        <figure class="avatar   rounded-10">
                      <img src="`+urlimagen+`" alt="" style="width:60px;height:60px;">
                        </figure>
                        </div>
                        
                    <div class="col-60" onclick="DetallePagosCoach(`+respuesta[i].idusuarios+`)">
                         <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
                         </div>
             		 
	             		 <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
	             		 	</div>
             		
               
                        </div>
                        	 <div class="col-20">
                         <div class="col"> 
                         </div>
                        </div>
                        
                    		<div class="col-30">

							 </div>
						 </div>
               
             		 
              </div>

            
          </div></label>
          </li>

			`;
		}
		html+=`<div>`;
	}

	$(".listadopagos").html(html);


}

function DetallePagosCoach(idusuarios) {
	localStorage.setItem('idcoach',idusuarios);
	GoToPage('detallepagoscoach');
}
function ActivoPagoCoachLis(boton) {
	$(".btnclick").removeClass('button-active');
	if (boton==1) {
			  	 $(".listadopagos").html("");

	$("#btnpendiente1").addClass('button-active');
		ListadoPagosCoachLista();
	}
	if (boton==2) {
			  	 $(".listadopagos").html("");

	$("#btnhistorial1").addClass('button-active');
		ListadoPagosCoachHistorialLista();
	}
}


function ListadoPagosCoachHistorialLista() {
	var pagina = "ObtenerTodosPagosCoachHistorial.php";
	var id_user=localStorage.getItem('idcoach');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(respuesta){

			var pagos=respuesta.respuesta;
			PintarpagosHistorialCoach(pagos);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PagarCoach(idpago,concepto,monto,idservicio,tipopago,montopagocoach,montopago) {
dynamicSheet2="";
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
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">

		   							  	<h3 style="text-align:center;font-size:22px;margin-bottom:1em;">Pago a realizar</h3>`;
 				

		   							html+=`
		   									<h4 style="text-align:center;">`+concepto+`</h4>
		   									<h4 style="text-align:center;">Monto $`+formato_numero(monto,2,'.',',')+`</h4>

		   						 <div class="row" style="margin-bottom:1em;margin-top:3em;">
		   						 		<label >Descripción</label>
		   						 		<textarea name="" id="txtdescripcionpago" cols="10" rows="3"></textarea>
		   						 		<label >Tipo de pago</label>
		   						 		<select name="" id="txttipopago">
		   						 		<option value="0">Seleccionar tipo de pago</option>

		   						 		</select>

		   						 	 <a id="btnguardarpagocoach"  style="border-radius: 10px;
									    height: 60px;" class="button button-fill button-large button-raised margin-bottom color-theme btnguardarpagocoach">
									      <div class="fab-text">Guardar</div>
									    </a>
		   						 	</div>


		   							</div>
	   							 	</div>
   							 </div>
		   				</div>
		                
		              </div>
		            </div>
		          </div>`;
	  dynamicSheet2 = app.sheet.create({
        content: html,
    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
          	Cargartipopago2();
          },
          opened: function (sheet) {
            console.log('Sheet opened');
            $$(".btnguardarpagocoach").attr('onclick','GuardarPagoCoach('+monto+','+idpago+','+idservicio+','+tipopago+','+montopagocoach+','+montopago+')')

          },
        }
      });

       dynamicSheet2.open();



}

function GuardarPagoCoach(monto,idpago,idservicio,tipopago,montopagocoach,montopago) {
	
	var txtdescripcionpago=$("#txtdescripcionpago").val();
	var txttipopago=$("#txttipopago").val();

	var pagina = "GuardarPagoCoach.php";
	var idcoach=localStorage.getItem('idcoach');
	var id_user=localStorage.getItem('id_user');
	var datos="idcoach="+idcoach+"&txttipopago="+txttipopago+"&txtdescripcionpago="+txtdescripcionpago;
		datos+="&idpago="+idpago+"&idservicio="+idservicio+"&monto="+monto;
		datos+="&iduser="+id_user+"&tipopago="+tipopago+"&montopagocoach="+montopagocoach+"&montopago="+montopago;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(respuesta){

			var res=respuesta.respuesta;
			if (res==1) {
				dynamicSheet2.close();
				$(".listadopagos").html('');
				ListadoPagosCoachLista();

			}


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function Cargartipopago2(tipodepagoseleccionado) {


    var pagina = "obtenertipodepagos.php";

    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    success: function(datos){

      var opciones=datos.respuesta;
        
      Pintartipodepagos2(opciones,tipodepagoseleccionado);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });
}

function Pintartipodepagos2(opciones,tipodepagoseleccionado) {
   var html='';

  if (opciones.length>0) {
     html+=`  <option value="0">Seleccionar método de pago</option>`;
    for (var i = 0; i <opciones.length; i++) {

    html+=`  <option value="`+opciones[i].idtipodepago+`">`+
             opciones[i].tipo  +`</option>`;

          }

    }


  $("#txttipopago").html(html);


  }

function BuscarEnListaPagos() {
  var buscador=$(".v_buscador").val();
  var pagina = "ObtenerTodosPagosCoach.php";
  var id_user=localStorage.getItem('idcoach');
  var datos="id_user="+id_user+"&buscador="+buscador;
  $(".listadopagos").html('');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    async:false,
    success: function(respuesta){

      var pagos=respuesta.respuesta;
      PintarpagosCoach(pagos);


      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });
}


function BuscarEnListaPagos2() {
  var buscador=$(".v_buscador").val();
  var pagina = "ObtenerTodosPagosCoach.php";
  var id_user=localStorage.getItem('id_user');
  var datos="id_user="+id_user+"&buscador="+buscador;
  $(".listadopagos").html('');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    async:false,
    success: function(respuesta){

      var pagos=respuesta.respuesta;
      PintarpagosCoach(pagos);


      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });
}

function ListadoPagosCoachListaBuscar() {
    var buscador=$(".v_buscador1").val();
  $(".listadopagos").html('');

  var pagina = "ObtenerTodosPagosCoach.php";
  var id_user=localStorage.getItem('idcoach');
  var datos="id_user="+id_user+"&buscador="+buscador;
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    async:false,
    success: function(respuesta){

      var pagos=respuesta.respuesta;
      PintarpagosCoach(pagos);


      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });
}