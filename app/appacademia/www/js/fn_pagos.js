var descuentosaplicados=[];
function ObtenerTotalPagos() {
	var pagina = "ObtenerTotalPagos.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
				var resultado=respuesta.respuesta;
			$(".totalpagos").text('$'+resultado.total);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function ProximopagoaVencer() {
	var pagina = "ObtenerProximopagovencer.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
				var resultado=respuesta.respuesta;

				if (resultado.length>0) {

					$(".vencimiento").text(resultado[0].fechaformato);
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

function VerListadoPago() {

	GoToPage('listadopagos');
}

function ObtenerTodosPagos() {

	var pagina = "ObtenerTodosPagos.php";
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
			Pintarpagos(pagos);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function Pintarpagos(pagos) {
	
	if (pagos.length>0) {
		var html="";
		html+=`
		<li class="list-item">
                    <div class="row">
                        <div class="col-40">
               
                        </div>
                        <div class="col-60">
                        <p>Seleccionar todos<input type="checkbox" id="checktodos" onchange="SeleccionarTodos()" style="float:rigth;" /></p>
                        </div>
                    </div>
                 </li>

		`;
		for (var i = 0; i <pagos.length; i++) {
			html+=`
				<li class="list-item">
                    <div class="row">
                        <div class="col-80">
                            <p class="text-muted small" id="concepto_`+pagos[i].idpago+`">
                               Pago de `+pagos[i].concepto+`
                            </p>

                          <p class="text-muted ">Vencimiento `+pagos[i].fechaformato+`</p>
                          <p class="text-muted small">$`+pagos[i].monto+`</p>
                          <input type="hidden" value="`+pagos[i].monto+`" class="montopago" id="val_`+pagos[i].idpago+`">
                        </div>
                        <div class="col-20">

                        <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" style="float:rigth;" />
                        </div>
                    </div>
                 </li>

			`;
		}

		$(".listadopagos").html(html);
	}
}

function SeleccionarTodos() {
	if ($("#checktodos").is(':checked')) {
		$(".seleccionar").prop('checked',true);
	 }else{
		$(".seleccionar").prop('checked',false);
	}
	HabilitarBotonPago();
}

function Seleccionarcheck(idcheck) {
	if ($("#check_"+idcheck).is(':checked')) {

		$("#check_"+idcheck).prop('checked',true);

	}else{
	
		$("#check_"+idcheck).prop('checked',false);
	}
	HabilitarBotonPago();
}
var pagosarealizar=[];
function HabilitarBotonPago() {
	var contar=0;
	var suma=0;
    pagosarealizar=[];
	$( ".seleccionar" ).each(function( index ) {
	
		 if($(this ).is(':checked')){
		 	var id=$(this).attr('id');
     
		 	var dividir=id.split('_')[1];
		 	var contador=$("#val_"+dividir).val();
		 	suma=parseFloat(suma)+parseFloat(contador);
		 	concepto=$("#concepto_"+dividir).text();
		 	contar++;

		 	var objeto={
		 		id:dividir,
		 		concepto:concepto.trim(),
		 		monto:contador
		 	};
		 	pagosarealizar.push(objeto);

		 }
	
	});


	if (contar==0) {
		$(".btnpagar").prop('disabled',true);
		$(".checktodos").prop('checked',false);
		$(".cantidad").text(formato_numero(suma,2,'.',','));
		localStorage.setItem('montopago',suma);
	}
	if (contar>0) {

		$(".btnpagar").prop('disabled',false);
		$(".cantidad").text(formato_numero(suma,2,'.',','));
		localStorage.setItem('montopago',suma);
	}

  localStorage.setItem('pagos',JSON.stringify(pagosarealizar));

}

function ResumenPago() {

	GoToPage('resumenpago');
}

function CargarPagosElegidos() {

	var listado=JSON.parse(localStorage.getItem('pagos'));
	console.log(listado);
	var html="";
	for (var i = 0; i <listado.length; i++) {
			html+=`
				<li class="list-item">
                    <div class="row">
                        <div class="col-80" style="padding:0;">
                            <p class="text-muted small" style="font-size:18px;" id="concepto_`+listado[i].id+`">
                              `+listado[i].concepto+`
                            </p>
                            <p class="text-muted " style="font-size:30px;text-align:right;">$`+listado[i].monto+`</p>

                          <input type="hidden" value="`+listado[i].monto+`" class="montopago" id="val_`+listado[i].id+`">
                        </div>
                        <div class="col-20">

                        </div>
                    </div>
                 </li>

			`;
		}

		$(".listadopagoselegidos").html(html);
}


function Cargartipopago(tipodepagoseleccionado) {


    var pagina = "obtenertipodepagos.php";

    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    success: function(datos){

      var opciones=datos.respuesta;
        
      Pintartipodepagos(opciones,tipodepagoseleccionado);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });
}


function Pintartipodepagos(opciones,tipodepagoseleccionado) {
   var html='';

  if (opciones.length>0) {
     html+=`  <option value="0">Seleccionar método de pago</option>`;
    for (var i = 0; i <opciones.length; i++) {

    html+=`  <option value="`+opciones[i].idtipodepago+`">`+
             opciones[i].tipo  +`</option>`;

          }

    }


  $("#tipopago").html(html);


  }


function CalcularTotales() {

  var comisionmonto=0;
  var comisionporcentaje=0;
  var impuesto=0;
  var comision=0;

	var obtenerpagos=JSON.parse(localStorage.getItem('pagos'));
	var sumatotal=0;
	for (var i = 0; i <obtenerpagos.length; i++) {
		sumatotal=parseFloat(sumatotal)+parseFloat(obtenerpagos[i].monto);
	}

	var monedero=localStorage.getItem('monedero');
	var descuentocupon=localStorage.getItem('descuentocupon');
	
  var totaldescuentos=0;
  for (var i = 0; i <descuentosaplicados.length; i++) {
    totaldescuentos=parseFloat(totaldescuentos)+parseFloat(descuentosaplicados[i].montoadescontar);

  }
  var resta=parseFloat(sumatotal)-parseFloat(monedero)-parseFloat(descuentocupon)-parseFloat(totaldescuentos);
  var sumaconcomision=resta;

  if (localStorage.getItem('comisionmonto')!=0 ){
        comisionmonto=localStorage.getItem('comisionmonto');


      }

      if (localStorage.getItem('comisionporcentaje')!=0 ){
        comisionporcentaje=localStorage.getItem('comisionporcentaje');
        comimonto=parseFloat(comisionporcentaje)/100;
        comimonto=parseFloat(comimonto)*parseFloat(sumaconcomision);

        comision=parseFloat(comimonto)+parseFloat(comisionmonto);
      
        localStorage.setItem('comision',comision);

      }


      if (localStorage.getItem('impuesto')!=0 ){
        impuesto=localStorage.getItem('impuesto');
        impumonto=impuesto/100;

        comision1=parseFloat(comision)*parseFloat(impumonto);

        localStorage.setItem('impuestotal',comision1);
        comision=parseFloat(comision1)+parseFloat(comision);


      }
        $(".divcomision").css('display','none');


      if (comision!=0 || comisionmonto!=0 ) {

        $(".divcomision").css('display','block');
        $(".lblcomision").text(formato_numero(comision,2,'.',','));
        localStorage.setItem('comisiontotal',comision);
        sumaconcomision=parseFloat(sumaconcomision)+parseFloat(comision);
      }

    localStorage.setItem('subtotalsincomision',resta.toFixed(2));
	  localStorage.setItem('sumatotalapagar',sumaconcomision.toFixed(2));
	  $(".lblresumen").text(formato_numero(resta,2,'.',','));
    $(".lbltotal").text(formato_numero(sumaconcomision,2,'.',','));
}


function AbrirModalmonedero() {
	
	
       var html=`
         
              <div class="block">
               <div class="row" style="">
                	<p style="font-size:26px;padding:1px;"  >$<span id="monedero">0.00</span></p>

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Cantidad a utilizar:</label>
                	<input type="number" name="txtcantidad" id="txtcantidad"  />
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Monedero',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Aplicar',
            },
            
          ],

           onClick: function (dialog, index) {
                    if(index === 0){
              
          }
          else if(index === 1){
                AplicarMonedero();
              
            }
           },

          verticalButtons: false,
        }).open();
		
		ObtenerMonedero();

}

function AplicarMonedero() {
	var monederousuario=parseFloat($("#monedero").text());
	var txtcantidad=parseFloat($("#txtcantidad").val());

	if (monederousuario>0) {
	if (txtcantidad!='' &&txtcantidad!=0) {
			if (txtcantidad>monederousuario) {
				alerta('','La cantidad supera el monedero acumulado');
			}else{

				localStorage.setItem('monedero',txtcantidad);

				CalcularTotales();
				app.dialog.close();
				$(".monedero").text(formato_numero(txtcantidad,2,'.',','));
			}

		}else{

				alerta('','Ingrese una cantidad válida')
			}

	}else{


		alerta('','No cuenta con monedero acumulado');
	}
	
}

function ObtenerMonedero() {
	var id_user=localStorage.getItem('id_user');
    var pagina = "obtenermonedero.php";
    var datos="id_user="+id_user;
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(datos){

    var respuesta=datos.respuesta;
    $("#monedero").text(respuesta);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });
}
function AbrirModalcupon() {
	
       var html=`
         
              <div class="block">
               <div class="row" style="margin-top: .5em;">
                        <div class="col-100" style="padding: 0">
                             <input type="text" placeholder="Código cupón" name="couponcode" class="" id="txtcupon" style="" />
                        </div>
                       
              </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Cupón',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Aplicar',
            },
            
          ],

           onClick: function (dialog, index) {
                    if(index === 0){
              
          }
          else if(index === 1){
               AplicarCupon();
              
            }
           },

          verticalButtons: false,
        }).open();


}

function AplicarCupon() {
	var cupon=$("#txtcupon").val();

	var datos="cupon="+cupon;
  var pagina="AplicarCupon.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(datos){

   

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });

}

function HabilitarOpcionespago(idtipodepago,foto,stripe,habilitarcampo,habilitarcampomontofactura) {


     anterior=localStorage.getItem('idtipodepago');

  if (anterior==idtipodepago) {

   $("#tipodepago_"+idtipodepago).prop('checked',false);
    localStorage.setItem('idtipodepago',0);


  }else{

    $(".opcionestipodepago").prop('checked',false);
    $("#tipodepago_"+idtipodepago).prop('checked',true);
    localStorage.setItem('idtipodepago',idtipodepago);

  }

  idtipodepago=localStorage.getItem('idtipodepago');
    if (idtipodepago>0) {

  
      $("#habilitarfoto").css('display','none');
      $(".cuentas").css('display','none');

      $("#lista-imagenescomprobante").html('');
      localStorage.setItem('llevafoto',foto);
      localStorage.setItem('idtipodepago',idtipodepago);
      localStorage.setItem("rutacomprobante","");
      localStorage.setItem('comentarioimagenes','');
      $(".check-list").css('display','none');

      localStorage.setItem('campomonto',habilitarcampo);
      localStorage.setItem('constripe',stripe);
      localStorage.setItem('comisionmonto',0);
      localStorage.setItem('comisionporcentaje',0);
      localStorage.setItem('impuesto',0);
      localStorage.setItem('comision',0);
      localStorage.setItem('comisiontotal',0);

      $("#lista-imagenescomprobante").html('');
      resultimagencomprobante=[];

    if (foto==1) {
      $("#datosdecuenta").css('display','block');

      $("#cuenta_"+idtipodepago).css('display','block');

     // $("#datosdecuenta").html(cuenta);
      $("#habilitarfoto").css('display','block');

      }else{

      $(".cuentas").css('display','none');

      $("#cuenta_"+idtipodepago).css('display','none');

      $("#habilitarfoto").css('display','none');
     // $("#datosdecuenta").css('display','none');

    }

    if (stripe==1) {

        localStorage.setItem('montocliente',0);
        $("#montocliente").val('');
      //  ObtenerPorcentajes();
        
    }

    if (habilitarcampo==1) {
      // Recalcular4();
      var sumatotalapagar1=localStorage.getItem('sumatotalapagar');
    
      $("#montocliente").val(parseFloat(round(sumatotalapagar1)));
      $("#montovisual").val('$'+formato_numero(round(sumatotalapagar1),2,'.',','));
      localStorage.setItem('montocliente',sumatotalapagar1);

      $("#campomonto").css('display','block');

       localStorage.setItem('datostarjeta2','');
       localStorage.setItem('datostarjeta','');

    }else{
        $("#campomonto").css('display','none');
    
    }


    $(".opcionestipodepago").attr('checked',false);
    $("#tipodepago_"+idtipodepago).prop('checked',true);
  }else{

     $("#datosdecuenta").css('display','none');
     $("#campomonto").css('display','none');
     $("#habilitarfoto").css('display','none');

      $("#lista-imagenescomprobante").html('');
      localStorage.setItem('llevafoto',foto);
      localStorage.setItem('idtipodepago',idtipodepago);
      localStorage.setItem('rutacomprobante','');
      localStorage.removeItem('comentarioimagenes','');
      $(".check-list").css('display','none');
      $(".cuentas").css('display','none');
       localStorage.setItem('comisionmonto',0);
       localStorage.setItem('comisionporcentaje',0);
       localStorage.setItem('impuesto',0);
       localStorage.setItem('datostarjeta2','');
       localStorage.setItem('datostarjeta','');

  }

  //Recalcular4();

}
function CargarOpcionesTipopago() {
	var idtipopago=$("#tipopago").val();
	var datos="idtipopago="+idtipopago;
	var pagina="Cargartipopago.php";
    $(".divtransferencia").css('display','none');
    $("#divagregartarjeta").css('display','none');
    $("#divlistadotarjetas").css('display','none');
    $$("#btnpagarresumen").prop('disabled',true);

  if (idtipopago>0) {
  
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(respuesta){
      var resultado=respuesta.respuesta;
      console.log(resultado);
     	HabilitarOpcionespago(resultado.idtipodepago,resultado.habilitarfoto,resultado.constripe,resultado.habilitarcampomonto,resultado.habilitarcampomontofactura);
    if (resultado.habilitarfoto==1) {
     		$(".divtransferencia").css('display','block');
     		var html="";
     	 var datosdecuenta=resultado.cuenta.split('|');

              var html1="";
              for (var j = 0; j <datosdecuenta.length; j++) {
                    html1+='<p style="text-align:center;">'+datosdecuenta[j]+'</p>';
              }


              html+=` <li class="cuentas" id="cuenta_`+resultado.idtipodepago+`" style="" >
              <label class="">
                <div class="">
                 
                  <div class="" style="     margin-left: 1em;
      margin-right: 1em;text-align: justify;-webkit-line-clamp: 200;display: inline-block;" >

                    <div style="    padding-left: 1em;padding-right: 1em;padding-top: .2em;padding-bottom: .2em;background: #dfdfdf;border-radius: 10px;font-size:16px;">
                  `+
                  html1
                  +`
                    </div>
                  </div>
                </div>
              </label>
            </li>`;

            html+=`
            	<div id="habilitarfoto" style="display: block;">
      <div class="subdivisiones" style="margin-top: 1.5em" ><span style="margin-top: .5em;margin-left: .5em;">Comprobante</span></div>

           <div class=""  >
                  <div>
                      <button  onclick="AbrirModalFotoComprobante()" class="button button-fill botonesaccion botonesredondeado estiloboton" style="margin-top: 1em;background:#4cd964;"> Sube tu comprobante</button>
                             <div class="check-list" style="    display: none;
                                          margin-right: 10em;
                                           top: -.2em;
                                          position: absolute;
                                             right: -6em;"><span></span></div>
                  </ul>

                      <div class="block m-0"> 
                       <div class="list media-list sortable" id="" style="">           

                      <div id="lista-imagenescomprobante">
                          
                      </div>
                  </div> 

                  </div>   
                  
                </div>

              </div>

            `;
            $(".informacioncuenta").html(html);
        }


        if (resultado.habilitarcampo==1) {




        }

        if (resultado.constripe==1) {

        	
  	     if (resultado.comisionporcentaje=='') {
  	        resultado.comisionporcentaje=0;
  	      }
  	      if (resultado.comisionmonto=='') {
  	        resultado.comisionmonto=0;
  	      }
  	      if (resultado.impuesto=='') {
  	        resultado.impuesto=0;
  	      }
        
  	      localStorage.setItem('comisionporcentaje',resultado.comisionporcentaje);
  	      localStorage.setItem('comisionmonto',resultado.comisionmonto);
  	      localStorage.setItem('impuesto',resultado.impuesto);
  	      localStorage.setItem('clavepublica',resultado.clavepublica);
  	      localStorage.setItem('claveprivada',resultado.claveprivada);
        	ObtenerTarjetasStripe();
        	$(".btnnuevatarjeta").attr('onclick','NuevaTarjetaStripe()');

            HabilitarBotonPagar();
            CalcularTotales();
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
}

function Atras() {
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('visibility','visible');
  $("#divlistadotarjetas").css('display','block');

}
function AbrirModalFotoComprobante() {

  var id_user=localStorage.getItem('id_user');
    app.dialog.create({
        title: '',
        text: '',
        buttons: [
        {
          text: 'Tomar Foto',
        },
        {
          text: 'Subir Foto',
        },
        {
          text: 'Cancelar',
          color:'#ff3b30',

        },

        ],

        onClick: function (dialog, index) {
          if(index === 0){
                //Button 1 clicked

                TomarFotoComprobante(id_user)

              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getFotocomprobante(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

}


//Funcion para abrir la camara del phone
  function TomarFotoComprobante(iduser) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    navigator.camera.getPicture(onSuccessComprobante,onError,options);
  }

  //El valor devuleto al tomar la foto lo envia a esta funcion 
  function onSuccessComprobante(RutaImagen) {
    //app.popup.close('.popup-opciones-subir-fotos');
    //document.getElementById("miimagen").src = RutaImagen;
    fichero=RutaImagen;
    
    var iduser = 0;
  
    
    guardar_foto_comprobante(iduser);
  }



  function guardar_foto_comprobante(iduser) {

    //app.preloader.show()
          app.dialog.preloader('Cargando...');




  var pagina = "subircomprobante.php";


    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;
    

    //Agregamos parametros
    var params = new Object();
  
    
    options.params = params;

    
    
    var ft = new FileTransfer();

    //ft.upload(fichero, "http://192.168.1.69/svnonline/iasistencia/registroasistencia/php/asistencia_fotos_g_actividad.php", respuesta, fail, options);
    
    
    //ft.upload(fichero, urlphp+"asistencia_fotos_g_actividad.php", respuesta, fail, options);
    
    ft.upload(fichero, urlphp+pagina, respuestafotocomprobante, fail, options);

    
  }


  function respuestafotocomprobante(r)
  {
    //borrarfoto();


    var resp = r.response;
    var obj = JSON.parse(resp);
    var result = obj[0]['respuesta'];
    var ruta = obj[0]['ruta'];

    //app.preloader.hide();
    app.dialog.close();
    if(result == 1){
 
      if (localStorage.getItem('rutacomprobante')!==undefined) {

          localStorage.setItem('rutacomprobante','');
      }
      //var jsonimagen=JSON.parse(localStorage.getItem('rutacomprobante'));

      resultimagencomprobante.push(ruta);


     localStorage.setItem('rutacomprobante',resultimagencomprobante);
      alerta('','Imagen importada exitosamente');
      comenta="";
      arraycomentarios.push(comenta);

      PintarlistaImagen();

    }else{
      //Hubo un error
      alerta(result,"ERROR");
    $(".check-list").css('display','none');

      $("#aparecerimagen").css('display','none');
      $("#aparecerimagen").attr('onclick','');

    } 
  }

 

function onPhotoDataSuccessComprobante(imageData) {
 // borrarfoto();
  var pagina = "subircomprobante2.php";

    var datos= 'imagen='+imageData;


    var pagina = urlphp+pagina;
      app.dialog.preloader('Cargando...');

    $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
      beforeSend: function() {
        // setting a timeout

    },

    success: function(data) {



      app.dialog.close();

      ruta=data.ruta;
      
      if (localStorage.getItem('rutacomprobante')!==undefined) {

          localStorage.setItem('rutacomprobante','');
      }
      //var jsonimagen=JSON.parse(localStorage.getItem('rutacomprobante'));

      resultimagencomprobante.push(ruta);


     localStorage.setItem('rutacomprobante',resultimagencomprobante);

      comenta="";
      arraycomentarios.push(comenta);
      alerta('','Imágen importada exitosamente');

      PintarlistaImagen();
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                        var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                                 //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                         app.dialog.alert('Error leyendo fichero jsonP '+error,'Error');
                     $(".check-list").css('display','none');
                    }
                                       

  }); 

  }

 //
 function getFotocomprobante(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessComprobante, onError, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });

    }

//Funcion para reportar error al usar la camara del phone
  function onError(err)
  { 
    console.log(err); 
  }

  function resp(r){
    alerta("RESPUESTA : "+r.response);
  }

  function fail(error)
  {
    //app.preloader.hide();
    alerta("Ocurrio un error durante la ejecuccion: "+error.code);
  }

  function borrarfoto(){

   var rutacomprobante="";
    if (localStorage.getItem("rutacomprobante")!=null) { 
          rutacomprobante =localStorage.getItem('rutacomprobante');


      }


     if(rutacomprobante!='') {

    var pagina = "eliminarimagen.php";

    var datos= 'imageneliminar='+rutacomprobante;
    pagina = urlphp+pagina;

    $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
    success: function(data) {
      
      localStorage.setItem('rutacomprobante','');          

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                        var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                                 //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                         app.dialog.alert('Error leyendo fichero jsonP '+error,'Error');
                     $(".check-list").css('display','none');
                     $("#aparecerimagen").css('display','none');
                    }
                                       

          }); 
     }



  }

function VisualizarImagen(foto) {


  /*=== Popup Dark ===*/
  var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos: [
    foto,
    ],
    type: 'popup',
    theme: 'dark',
  });

  $(".link .popup-close .icon-only > i").remove('icon icon-back ');


  myPhotoBrowserPopupDark.open();

}

function RealizarCargo() {
    var respuesta=0;
     var mensaje='';
     var pedido='';
     var informacion='';
   var pagina = "RealizarPago.php";
   var iduser=localStorage.getItem('id_user');
   var constripe=localStorage.getItem('constripe');
   var idtipodepago=localStorage.getItem('idtipodepago');
   var descuentocupon=localStorage.getItem('descuentocupon');
   var codigocupon=localStorage.getItem('codigocupon');
   var sumatotalapagar=localStorage.getItem('sumatotalapagar');
   var comision=localStorage.getItem('comision');
   var comisiontotal=localStorage.getItem('comisiontotal');
   var comisionmonto=localStorage.getItem('comisionmonto');
   var impuestototal=localStorage.getItem('impuestotal');
   var subtotalsincomision=localStorage.getItem('subtotalsincomision');
   var impuesto=localStorage.getItem('impuesto');
   var datos= 'pagos='+localStorage.getItem('pagos')+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&descuentosaplicados="+JSON.stringify(descuentosaplicados)+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestototal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto;
    pagina = urlphp+pagina;

 app.dialog.confirm('','¿Está seguro  de realizar el pago?' , function () {
          $(".dialog-buttons").css('display','none');
          CrearModalEspera();
    var promise= $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
    success: function(data) {
        informacion=data;
        respuesta=data.respuesta;
        mensaje=data.mensaje;
        pedido=data.idnota;

      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                        var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                                 //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                         app.dialog.alert('Error leyendo fichero jsonP '+error,'Error');
                     $(".check-list").css('display','none');
                     $("#aparecerimagen").css('display','none');
                    }
                                       

          }); 



         promise.then(function(){



             if (respuesta==1) {

                

                      console.log(informacion);                   

                      var stripe=localStorage.getItem('constripe');
                      if(stripe==1){

                       // RealizarPago(pedido);

                        var output=informacion.output;
                        //var idpedido=informacion.idnota;

                       //  data = datos;
                      var stripe = Stripe(output.publicKey);
                      // Setup Stripe elements to collect payment method details
                      //setupElements(data.publicKey);
                      // Setup event handlers
                      //setupAuthenticationView(data.clientSecret, data.paymentMethod);
                      //setupNewPaymentMethodView(data.clientSecret);
                      //hideEl(".sr-select-pm");

                    if (output.error && output.error === "authentication_required") {
                     var mensaje = "La tarjeta requiere autenticación (3DSecure)";
                                       $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                    // PagoNorealizado(mensaje,output.paymentIntent,idpedido);
                          alerta('',mensaje);

                    }
                    else if (output.error==1) {
                  
                      var mensaje = "Opps, La tarjeta fue bloqueada, ha excedido los "+output.intentos+" intentos";
                     // PagoNorealizado(mensaje,output.paymentIntent,idpedido);
                      alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                    }
                     else if (output.error) {
                      var mensaje = "La tarjeta fue declinada";
                   //   PagoNorealizado(mensaje,output.paymentIntent,idpedido);
                      alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');

                     } else if (output.succeeded) {
                      // Card was successfully charged off-session
                      // No recovery flow needed
                      paymentIntentSucceeded(stripe,output.clientSecret, ".sr-select-pm");
                      var mensaje = "El pago se ha completado con éxito";
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','none');
                                        $(".mensajeexito").css('display','block');
                                        $(".mensajeexito").text(mensaje);

                                        $(".butonok").css('display','block');
                                        $(".butoerror").css('display','none');
                    // alerta('',mensaje);

                      //PagoRealizado(mensaje,output.paymentIntent,idpedido);

                    }


                      }else{

                       
                      setTimeout(function(){
                         LimpiarVariables2();
                         $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','none');
                          $(".mensajeexito").css('display','block');
                          $(".butonok").css('display','block');
                          $(".butoerror").css('display','none');

                      }, 3000);
                         

                      }
       


               }else{


                          $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','block');
                          $(".mensajeexito").css('display','none');
                          $(".butonok").css('display','none');
                          $(".butoerror").css('display','block');

                alerta('',mensaje);
               }

                
          }); 

       


          },function () {

          
           

          });

        

        
}


function ObtenerDescuentosRelacionados() {
   var iduser=localStorage.getItem('id_user');

  var datos= 'pagos='+localStorage.getItem('pagos')+"&id_user="+iduser;
  var pagina = "ObtenerDescuentosRelacionados.php";

    $.ajax({
      url: urlphp+pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
    success: function(res) {

      var resultado=res.descuentos;

      PintarDescuentos(resultado);
      
      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                        var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                                 //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                         app.dialog.alert('Error leyendo fichero jsonP '+error,'Error');
                     $(".check-list").css('display','none');
                     $("#aparecerimagen").css('display','none');
                    }
                                       

          }); 

}

function PintarDescuentos(respuesta) {
   var html="";
 if (respuesta.length>0) {
    descuentosaplicados=respuesta;
    $("#visualizardescuentos").css('display','block');

  for (var i = 0; i <respuesta.length; i++) {
    html+=`
     <li class="list-item">
                    <div class="row">
                        <div class="col-80" style="padding: 0;">
                            <p class="text-muted small" style="font-size:18px;" id="">
                             `+respuesta[i].titulodescuento+`
                            </p>
                             <p class="text-muted " style="font-size:30px;text-align:right;">$<span class="lbldescuento">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></p>

                        </div>
                        <div class="col-20">
                        <span class="chip color-green btncupon" style="display:none;
                                height: 30px;
                                
                                margin-right: 1em;
                                margin-left: 1em;top: 3em;" onclick="AplicarDescuento(`+respuesta[i].iddescuento+`,`+respuesta[i].idpago+`)"><span class="chip-label">Aplicar</span></span>
                        </div>
                    </div>
                 </li>

    `;

  }
 }else{
  $("#visualizardescuentos").css('display','none');
 }


 $("#uldescuentos").html(html);
}


function CrearModalEspera() {
  

  var html=`
  
           <div class="" style="text-align: center;">
              <div class="toolbar" style="display:none;">
                  <div class="toolbar-inner" >
                      <div class="left">

                      <span style="color:black;margin-left:1em;font-size: 14px;
          font-weight: bold;"></span></div>

                        <div class="right">
                         
                        </div>
                    </div>
              </div>

                <div class="sheet-modal-inner" style="">
                <div style="padding-top:1em;"></div>

                  <div id="" class="mensajeproceso" style="font-size:20px;font-weight:bold;" >En proceso...
                    <img src="img/loading.gif" style="width:20%;display: flex;justify-content: center;align-items: center;margin:0px auto;">

                  </div>
                  <div id="" class="mensajeerror" style="font-size:20px;font-weight:bold;display:none;" >Error en la conexción,vuelva a intentar.</div>
                  <div id="" class="mensajeexito" style="font-size:20px;font-weight:bold;display:none;" >Se realizó correctamente</div>



                <span class="dialog-button dialog-button-bold butonok" onclick="VerPagos()" style="display:none;">OK</span>

                <span class="dialog-button dialog-button-bold butoerror" onclick="CerrarEspera()" style="display:none;">OK</span>


                  <div style="color:red;font-size:20px;"></div>

                     
                      
                </div>



                  </div>
               </div>

        
              `;
      


 modaldialogo=app.dialog.create({
              title: '',
              text:'',
              content:html,

              buttons: [
            
                
              ],

              onClick: function (dialog, index) {

                  if(index === 0){
                   
                  }
                 
                
              },
              verticalButtons: true,
            }).open();
    

}

function VerPagos() {
  app.dialog.close();
  GoToPage('pagos');
}

function HabilitarBotonPagar() {
   var seleccion=0;
      $(".opccard").each(function( index ) {
        if ($(this).is(':checked')) {
        seleccion=1; 
        }
      });
      $$("#btnpagarresumen").prop('disabled',true);
      if (seleccion==1) {
          $$("#btnpagarresumen").prop('disabled',false);
      }
}
