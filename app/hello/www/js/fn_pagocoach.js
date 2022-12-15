function ListadoPagosCoachLista() {
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
      	html+=`
      		<div class="row margin-bottom ">
                <div class="col">
                <h5 class="title">
              `+pagos[i].concepto+`
                </h5>
                </div>
                <div class="col-auto align-self-center">
               
                </div>
              </div>

               <ul class=" list media-list no-margin pagos_`+pagos[i].idservicio+`" style="list-style: none;background: white;">
        
                </ul>
      	`;

      	idservicio=pagos[i].idservicio;

      	    $(".listadopagos").html(html);

      }

      html=`
        <li class="list-item" id="pago_`+pagos[i].idnotapago+`">
                    <div class="row">
                        <div class="col-70">
                            <p class="text-muted "  id="concepto_`+pagos[i].idnotapago+`">
                               Pago `+pagos[i].concepto+`
                            </p>

                          <p class="text-muted small">$`+formato_numero(pagos[i].monto,2,'.',',')+`</p>
                          <span class="text-muted small `+claseestatus+`">`+pagos[i].textoestatus+`</span>


                        </div>`;
                       
                       /*  <div class="col-30"><a id="btncalendario" style=" color: #007aff!important;text-align: center;justify-content: center;display: flex;" onclick="Detallepago(`+pagos[i].idnotapago+`)">Ver detalle</a>
                        </div> </div>*/
                  if (localStorage.getItem('idtipousuario')==0) {

                 html+=`	<div class="col-30">
                        	<a id="btncalendario" class="button button-fill " style="color:white!important;text-align: center;justify-content: center;display: flex;" onclick="PagarCoach(`+pagos[i].idpago+`,'`+pagos[i].concepto+`',`+pagos[i].monto+`,`+pagos[i].idservicio+`)">Pagar</a>
                        	</div>
                    	</div>`;
                    }
               html+=`  </li>

      `;

      $(".pagos_"+pagos[i].idservicio).append(html);


    }

  }else{
  	 $(".listadopagos").html(html);

  }
}

function ActivoPagoCoach(boton) {
	$(".btnclick").removeClass('button-active');
	if (boton==1) {
	$("#btnpendiente").addClass('button-active');
		ListadoPagosCoach();
	}
	if (boton==2) {
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

      html+=`
        <li class="list-item" id="pago_`+pagos[i].idnotapago+`">
                    <div class="row">
                        <div class="col-70">
                            <p class="text-muted "  id="concepto_`+pagos[i].idnotapago+`">
                               Pago #`+pagos[i].concepto+`
                            </p>

                          <p class="text-muted small">Pagado `+pagos[i].fechaformatopago+`</p>
                          <p class="text-muted small">$`+formato_numero(pagos[i].monto,2,'.',',')+`</p>
                          <span class="text-muted small `+claseestatus+`">`+pagos[i].textoestatus+`</span>


                        </div>`;
                       /* <div class="col-30">
                        <a id="btncalendario" style=" color: #007aff!important;text-align: center;justify-content: center;display: flex;" onclick="Detallepago(`+pagos[i].idnotapago+`)">Ver detalle</a>
                        </div>*/
                   html+= ` </div>
                 </li>

      `;
    }

  }

      $(".listadopagos").html(html);

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
			<div style="list-style: none;height: 15em; overflow: scroll;">
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
	$("#btnpendiente1").addClass('button-active');
		ListadoPagosCoachLista();
	}
	if (boton==2) {
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

function PagarCoach(idpago,concepto,monto,idservicio) {
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
		   									<h4 style="text-align:center;">Pago `+concepto+`</h4>
		   									<h4 style="text-align:center;">Monto $`+formato_numero(monto,2,'.',',')+`</h4>

		   						 <div class="row" style="margin-bottom:1em;margin-top:3em;">
		   						 		<label >Descripción</label>
		   						 		<textarea name="" id="txtdescripcionpago" cols="10" rows="3"></textarea>
		   						 		<label >Tipo de pago</label>
		   						 		<select name="" id="txttipopago">
		   						 		<option value="0">Seleccionar tipo de pago</option>

		   						 		</select>

		   						 	 <a id="btnguardarpagocoach"  style="border-radius: 10px;
									    height: 60px;" class="button button-fill button-large button-raised margin-bottom color-theme">
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
            $$(".btnguardarpagocoach").attr('onclick','GuardarPagoCoach('+monto+','+idpago+','+idservicio+')')
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet2.open();



}

function GuardarPagoCoach(monto,idpago,idservicio) {
	
	var txtdescripcionpago=$("#txtdescripcionpago").val();
	var txttipopago=$("#txttipopago").val();
	var pagina = "GuardarPagoCoach.php";
	var id_user=localStorage.getItem('idcoach');
	var datos="idcoach="+id_user+"&txttipopago="+txttipopago+"&txtdescripcionpago="+txtdescripcionpago;
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