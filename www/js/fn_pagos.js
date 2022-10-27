var descuentosaplicados=[];
var descuentosmembresia=[];
var llevafoto=0;
var idtipodepago=0;
var rutacomprobante="";
var comentarioimagenes="";
var campomonto=0;
var constripe=0;
var comisionmonto=0;
var comisionporcentaje=0;
var impuesto=0;
var comision=0;
var comisiontotal=0;
var datostarjeta2=0;
var datostarjeta="";
var comisionporcentaje=0;
var comisionmonto=0;
var impuesto=0;
var clavepublica="";
var claveprivada="";
var monederoaplicado=0;
var monedero=0;
var total=0;
var imagencomprobante="";
var resultimagencomprobante=[];
var arraycomentarios=[];
var carpetapp="";
var monederodisponible=0;
var idparticipante=0; 
var subtotalsincomision=0;
var campomonto=0;
var montovisual=0;
var cambiomonto=0;
var confoto=0;
var impuestotal=0;
var pagos=[];
function Guardarpagos(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var datos = ObtenerDatosFormulario(form);
		
		//console.log(datos);
	
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/pagos/ga_pagos.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						var resp = msj.split('|');
						
						   console.log("El resultado de msj es: "+msj);
						 	if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito&idempresas="+resp[1],donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }
}

function LimpiarVariables() {
descuentosaplicados=[];
descuentosmembresia=[];
llevafoto=0;
idtipodepago=0;
rutacomprobante="";
comentarioimagenes="";
campomonto=0;
constripe=0;
comisionmonto=0;
comisionporcentaje=0;
impuesto=0;
comision=0;
comisiontotal=0;
datostarjeta2=0;
datostarjeta="";
comisionporcentaje=0;
comisionmonto=0;
impuesto=0;
clavepublica="";
claveprivada="";
monederoaplicado=0;
subtotalsincomision=0;
monedero=0;
cambiomonto=0;
confoto=0;
$("#montovisual").val(0);
$(".pagosusuario").each(function( index ) {
	$(this).prop('checked',false);
	});
 pagos=[];

$("#tipopago").val(0);
 CargarOpcionesTipopago();
 CalcularTotales();
suma=0;
 	$("#subtotal").html(formato_numero(suma,2,'.',','));

}
function SeleccionarClientePagos(idcliente) {
	LimpiarVariables();
	
	var datos="idcliente="+idcliente;

	 /* $(".cli_").removeClass('seleccionado');
	  $("#cli_"+idcliente+"_").addClass('seleccionado');*/
	  if($("#inputcli_"+idcliente+"_").is(':checked')){
	  	idparticipante=idcliente;
	  $(".chkcliente_").prop('checked',false);
	  $("#inputcli_"+idcliente+"_").prop('checked',true);
	  $.ajax({
					url:'catalogos/pagos/ObtenerTodosPagos.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
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
						CalcularTotales();

						var respuesta=msj.respuesta;
						var monedero=msj.monedero;
						PintarpagosTabla(respuesta);
						$(".btnnuevopago").css('display','block');
						$("#btnmonederodisponible").css('display','block');
						if (monedero!=null) {
							$("#btnmonederodisponible").attr('disabled',false);
							$("#monederodisponible").text(monedero);
							$("#btnmonederodisponible").attr('onclick','AbrirModalMonedero()');
						  }
								
					  	}
				  });

	}else{

	$("#contenedor_descuentos").css('display','none');
	$("#listadodescuentos").html("");
	$("#listadodescuentosmembresia").html("");
	$("#contenedor_descuentos_membresia").css('display','none');
	$("#listadopagos").html("");
	CalcularTotales();
	}
}

function PintarpagosTabla(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<tr style="text-align: center;">
					<td width="20"><input type="checkbox" class="form-control pagosusuario" id="pago_`+respuesta[i].idpago+`" onchange="VerificarDescuento(`+respuesta[i].idpago+`)"></td>

				      <td  width="40">`+respuesta[i].concepto+`<br>`;
				      if (respuesta[i].fechafinal!='' && respuesta[i].fechafinal!=null ) {
				      html+=`
				      <span>VIGENCIA:`+respuesta[i].fechafinal+`</span>`;
				  		}
				      html+=`
				      <input type="hidden" value="`+respuesta[i].tipo+`" id="tipo_`+respuesta[i].idpago+`"> 
				      </td>
				
				      <td  width="40">$<span id="monto_`+respuesta[i].idpago+`">`+respuesta[i].monto+`</span></td>
			    </tr>`;
		}


	}

	$("#listadopagos").html(html);
}

function SeleccionarTodosPagos() {
	if ($("#inputtodos").is(':checked')) {
		$(".pagosusuario").each(function( index ) {
			   $(this).prop('checked',true);
			});


	}else{

		$(".pagosusuario").each(function( index ) {
			   $(this).prop('checked',false);
			});

	}

	VerificarDescuento();
}

function VerificarDescuento() {
	 pagos=[];
	 //console.log(pagos);
	 var suma=0;
	$(".pagosusuario").each(function( index ) {

			if ($(this).is(':checked')) {
			   var id=$(this).attr('id');
			   var dividir=id.split('_');
			   var monto=$("#monto_"+dividir[1]).text()
			   var tipo=$("#tipo_"+dividir[1]).val();
			   var objeto={
			   	id:dividir[1],
			   	monto:monto,
			   	tipo:tipo
			   }
			  // console.log(objeto);
			   suma=parseFloat(suma)+parseFloat(monto);
			   pagos.push(objeto);


			}


	});
		if (pagos.length>0) {
			$("#btnpagar").attr('disabled',false);
			$("#btnpagar").attr('onclick','ElegirMetodoPago()')
		}else{

			$("#btnpagar").attr('disabled',true);

		}

	$("#subtotal").html(formato_numero(suma,2,'.',','));

	  var datos="pagos="+JSON.stringify(pagos);
		descuentosaplicados=[];
	  $.ajax({
					url:'catalogos/pagos/ObtenerDescuentosRelacionados.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
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
						$("#contenedor_descuentos").css('display','none');
						$("#listadodescuentos").html("");

						if (msj.descuentos.length>0) {
							
						$("#contenedor_descuentos").css('display','block');
							descuentosaplicados=msj.descuentos;
							PintarDescuentos(msj.descuentos);
						}

						ObtenerMembresiaUsuario();
						CalcularTotales();

							
					  	}
				  });

}

function PintarDescuentos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulo+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].iddescuento+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}
	$("#listadodescuentos").html(html);
}

function ObtenerMembresiaUsuario() {
	var idusuario=0;
	$(".chkcliente_").each(function( index ) {
			  if ($(this).is(':checked')) {

			  	var idelemento=$(this).attr('id').split('_');
			  	 idusuario=idelemento[1];
			  }
			});
	
	  var datos="pagos="+JSON.stringify(pagos)+"&id_user="+idusuario+"&descuentosaplicados="+JSON.stringify(descuentosaplicados);
	descuentosmembresia=[];
	  $.ajax({
					url:'catalogos/pagos/ObtenerMembresiaUsuario.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					async:false,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						$("#listadodescuentosmembresia").html("");

						$("#contenedor_descuentos_membresia").css('display','none');
						if (msj.descuentomembresia.length>0) {
							$("#contenedor_descuentos_membresia").css('display','block');
							descuentosmembresia = msj.descuentomembresia;
							PintarMembresiasDescuento(msj.descuentomembresia);
						}
								
					  	}
				  });
}
function PintarMembresiasDescuento(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulomembresia+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].idmembresia+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}

	$("#listadodescuentosmembresia").html(html);
}

function CalcularTotales() {
	var suma=0;
	pagos=[];
	
	if ($(".pagosusuario").length>0) {
	$(".pagosusuario").each(function( index ) {

			if ($(this).is(':checked')) {
			   var id=$(this).attr('id');
			   var dividir=id.split('_');
			   var monto=$("#monto_"+dividir[1]).text()
			   var tipo=$("#tipo_"+dividir[1]).val();
 
			   var objeto={
			   	id:dividir[1],
			   	monto:monto,
			   	tipo:tipo

			   }

			   suma=parseFloat(suma)+parseFloat(monto);
			   pagos.push(objeto);
			}


	});
}

	var montodescuento=0;
	for (var i = 0; i < descuentosaplicados.length; i++) {
		montodescuento=parseFloat(montodescuento)+parseFloat(descuentosaplicados[i].montoadescontar);
	}
	

	var montodescuentomembresia=0;
	for (var i = 0; i < descuentosmembresia.length; i++) {
		montodescuentomembresia=parseFloat(montodescuentomembresia)+parseFloat(descuentosmembresia[i].montoadescontar);
	}

	$("#descuento").html(formato_numero(montodescuento,2,'.',','));
	$("#descuentomembresia").html(formato_numero(montodescuentomembresia,2,'.',','));

	// total=parseFloat(suma)-parseFloat(monedero)-parseFloat(montodescuento)+parseFloat(montodescuentomembresia);

	var resta=parseFloat(suma)-parseFloat(monedero)-parseFloat(montodescuento)-parseFloat(montodescuentomembresia);
    var sumaconcomision=resta;
	subtotalsincomision=resta;


	$("#total").html(formato_numero(resta,2,'.',','));


     // if (localStorage.getItem('comisionporcentaje')!=0 ){
       // comisionporcentaje=localStorage.getItem('comisionporcentaje');
        comimonto=parseFloat(comisionporcentaje)/100;
        
        comimonto=parseFloat(comimonto)*parseFloat(sumaconcomision);

        comision=parseFloat(comimonto)+parseFloat(comisionmonto);
      
       // localStorage.setItem('comision',comision);

     // }


     // if (localStorage.getItem('impuesto')!=0 ){
       // impuesto=localStorage.getItem('impuesto');
        impumonto=impuesto/100;

        comision1=parseFloat(comision)*parseFloat(impumonto);
        impuestotal=comision1;
       // localStorage.setItem('impuestotal',comision1);
        comision=parseFloat(comision1)+parseFloat(comision);


     // }
        $(".divcomision").css('display','none');


     // if (comision!=0 || comisionmonto!=0 ) {

        $(".divcomision").css('display','block');
        $("#comision").text(formato_numero(comision,2,'.',','));
       // localStorage.setItem('comisiontotal',comision);
        comisiontotal=comision;
        sumaconcomision=parseFloat(sumaconcomision)+parseFloat(comision);
    //  }
   // subtotalsincomision=total.toFixed(2);
    //localStorage.setItem('subtotalsincomision',resta.toFixed(2));
	  //localStorage.setItem('sumatotalapagar',sumaconcomision.toFixed(2));
	$(".lblresumen").text(formato_numero(resta,2,'.',','));
    $("#total").text(formato_numero(sumaconcomision,2,'.',','));
    $("#monedero").text(formato_numero(monedero,2,'.',','));	
    var suma=sumaconcomision;

    total=sumaconcomision;
    if (suma==0) {

      $("#btnpagarresumen").attr('disabled',false);
    }
}


function ElegirMetodoPago() {

	//$("#modalmetodopago").modal();
	ObtenerTipodepagos();
}

function ObtenerTipodepagos() {
			$.ajax({
					url:'catalogos/pagos/ObtenerTipodepagos.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json',
					async:false,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){

							if (msj.respuesta.length>0) {
								PintarTipoPagos(msj.respuesta);
							}
								
					  	}
				  });
}

function PintarTipoPagos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		html+=`<option value="0">SELECCIONAR TIPO DE PAGO</option>`;
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idtipodepago+`">`+respuesta[i].tipo+`</option>`;
		}
	}
	$("#tipopago").html(html);
}


function CargarOpcionesTipopago(){
	var idtipopago=$("#tipopago").val();
	var datos="idtipopago="+idtipopago;
	var pagina="Cargartipopago.php";
    $(".divtransferencia").css('display','none');
    $("#divagregartarjeta").css('display','none');
    $("#divlistadotarjetas").css('display','none');
    $("#btnpagarresumen").prop('disabled',true);
    $("#btnatras").attr('onclick','Atras()');
  	$("#btnatras").css('display','none');
  	comisionporcentaje=0;
	comisionmonto=0;
	impuesto=0;
	clavepublica="";
	claveprivada="";
	$("#btnpagarresumen").attr('disabled',true);
  if (idtipopago>0) {
  
      $.ajax({
      type: 'POST',
      dataType: 'json',
	  url:'catalogos/pagos/Cargartipopago.php', //Url a donde la enviaremos
      data:datos,
      async:false,
      success: function(respuesta){
      var resultado=respuesta.respuesta;
     
     	HabilitarOpcionespago(resultado.idtipodepago,resultado.habilitarfoto,resultado.constripe,resultado.habilitarcampomonto,resultado.habilitarcampomontofactura);
    if (resultado.habilitarfoto==1) {
    	confoto=1;
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
                      <button  onclick="AbrirModalFotoComprobante()" class="btn btn-success botonesaccion botonesredondeado estiloboton" style="margin-top: 1em;background:#4cd964;margin-bottom:1em;width:100%;"> SUBIR comprobante</button>
                             <div class="check-list" style="    display: none;
                                          margin-right: 10em;
                                           top: -.2em;    width: 100%;margin-bottom: 1em;
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

        	campomonto=resultado.habilitarcampo;

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
        
  	      comisionporcentaje=resultado.comisionporcentaje;
  	      comisionmonto=resultado.comisionmonto;
  	      impuesto=resultado.impuesto;
  	      clavepublica=resultado.clavepublica;
  	      claveprivada=resultado.claveprivada;
        	ObtenerTarjetasStripe();
        	$(".btnnuevatarjeta").attr('onclick','NuevaTarjetaStripe()');
        	$(".divnueva").css('display','block');
            HabilitarBotonPagar();
            CalcularTotales();
        }
        CalcularTotales();

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


function HabilitarOpcionespago(idtipodepago,foto,stripe,habilitarcampo,habilitarcampomontofactura) {


     anterior=localStorage.getItem('idtipodepago');

  if (anterior==idtipodepago) {

   $("#tipodepago_"+idtipodepago).prop('checked',false);
    localStorage.setItem('idtipodepago',0);


  }else{

    $(".opcionestipodepago").prop('checked',false);
    $("#tipodepago_"+idtipodepago).prop('checked',true);
    idtipodepago=idtipodepago;

  }

/*  idtipodepago=localStorage.getItem('idtipodepago');
*/    if (idtipodepago>0) {

  
      $("#habilitarfoto").css('display','none');
      $(".cuentas").css('display','none');

      $("#lista-imagenescomprobante").html('');
     	llevafoto=foto;
     	idtipodepago=idtipodepago;
     	rutacomprobante="";
     	comentarioimagenes="";
      $(".check-list").css('display','none');

      campomonto=habilitarcampo;
      constripe=stripe;
      comisionmonto=0;
      comisionporcentaje=0;
      impuesto=0;
      comision=0;
      comisiontotal=0;

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

       montocliente=0;
        $("#montocliente").val('');
      //  ObtenerPorcentajes();
        
    }

    if (habilitarcampo==1) {
      // Recalcular4();
      var sumatotalapagar1=total;
    
      $("#montocliente").val(parseFloat(sumatotalapagar1));
      $("#montovisual").val('$'+formato_numero(sumatotalapagar1,2,'.',','));
      localStorage.setItem('montocliente',sumatotalapagar1);

      $("#campomonto").css('display','block');

       datostarjeta2="";
       datostarjeta="";
       $("#montovisual").attr('onkeyup','ValidacionMonto()');

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
       llevafoto=foto
       idtipodepago=idtipodepago;
       rutacomprobante='';
       comentarioimagenes="";
       $(".check-list").css('display','none');
       $(".cuentas").css('display','none');
       comisionmonto=0;
       comisionporcentaje=0;
       impuesto=0;
       datostarjeta2='';
       datostarjeta='';

       imagencomprobante="";
	   resultimagencomprobante=[];
	   arraycomentarios=[];

  }

  //Recalcular4();

}

function ValidacionMonto() {
	$("#btnpagarresumen").attr('disabled',true);
	var valor= $("#montovisual").val();
	
	if (valor>=total) {

	$("#btnpagarresumen").attr('disabled',false);
	var cambio=parseFloat(total)-parseFloat(valor);
	$("#cambio").text(formato_numero(Math.abs(cambio),2,'.',','));
	cambiomonto=cambio;
	}else{
	$("#btnpagarresumen").attr('disabled',true);
	
	}
}
function HabilitarBotonPagar() {
   var seleccion=0;
      $(".opccard").each(function( index ) {
        if ($(this).is(':checked')) {
        seleccion=1; 
        }
      });
      $("#btnpagarresumen").prop('disabled',true);
      if (seleccion==1) {
          $("#btnpagarresumen").prop('disabled',false);
      }
}

function Atras() {
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('visibility','visible');
  $("#divlistadotarjetas").css('display','block');

}

function AbrirModalFotoComprobante() {
	$("#d_foto").css('display','none');
	$("#image").val(''); 
	$("#d_foto").html('<img src="images/sinfoto.png" class="card-img-top" alt="" style="border: 1px #777 solid">');
	$(".card-img-top").attr('src','images/sinfoto.png');
	$("#modalimagencomprobante").modal();
}

function SubirImagenComprobante() {
	 var formData = new FormData();
        var files = $('#image')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/pagos/upload.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            dataType:'json',
             beforeSend: function() {
         $("#d_foto").css('display','block');
     	 $("#d_foto").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	

		    },
            success: function(response) {

               	var resp=response.respuesta;
	
                if (resp != 0) {
                	imagencomprobante=response.nombreimagen;
                	carpetapp=response.ruta;
                    $(".card-img-top").attr("src", resp);
                    $("#d_foto").css('display','none');
                } else {

                	 $("#d_foto").html('<img src="'+ruta+'" class="card-img-top" alt="" style="border: 1px #777 solid"/> ');
                    alert('Formato de imagen incorrecto.');
                }
            }
        });
        return false;

}

function GuardarImagen() {
	resultimagencomprobante.push(imagencomprobante);

	$("#modalimagencomprobante").modal('hide');
	      PintarlistaImagen();

}


 function PintarlistaImagen() {
    var html=""; 
     // localStorage.setItem('comentarioimagenes',arraycomentarios);
      $("#btnpagarresumen").prop('disabled',true);

     $(".check-list").css('display','none');
      if (resultimagencomprobante!=undefined && resultimagencomprobante!='') {
     
          var comprobante=localStorage.getItem('rutacomprobante');
          var comprobante1=resultimagencomprobante;

     
      if (comprobante1.length) {

        $("#btnpagarresumen").prop('disabled',false);

         $(".check-list").css('display','block')
        for (var i = 0; i < comprobante1.length; i++) {
        ruta=carpetapp+resultimagencomprobante[i];

          var visible="display:none";
              if (arraycomentarios[i]!='' && arraycomentarios[i]!=undefined) {
             visible="display:block";

              }

          html+=`
           <div class="col-100">
          <div class="card">
          <div class="card-content card-content-padding ">
            <div class="row">
              <div class="col-auto">
                  <div class=" ">
                  <img src="`+ruta+`" alt=""  onclick="VisualizarImagen(\'`+ruta+`\')" width="80" style="border-radius:10px;" >
                  </div>
                </div>
                <div class="col align-self-center no-padding-left">
                  
                </div>
                <div class="col align-self-center text-align-right">
                  <div class="row">
                    <div class="col">
                      <span class="btn btn_colorgray botoneditar " onclick="ColocarComentarioComprobante(`+i+`);" >
                      <i class="mdi mdi-table-edit"></i>
                      </span>
                    </div>
                    <div class="col">
                       <span class="btn btn_rojo botoneliminar" style="margin-rigth:1em;" onclick="EliminarimagenComprobante(\'`+comprobante1[i]+`\')" >
                        <i class="mdi mdi-delete-empty"></i>

                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
              <div style="`+visible+`">
                  <span style="font-weight:bold;vertical-align:text-top;margin-right: 4px;" id="comentariocomprobante_`+i+`">

                         Comentario:
                  </span>
                 <span style="color:#757575;" id="textocomprobante_`+i+`">`+arraycomentarios[i]+`</span>
           
               </div>
              </div>
            </div>
            </div>
            </div>
            </div>

          `;

        
            }
      }else{

     

      }

    }else{


       html+=``;

    }

    $("#lista-imagenescomprobante").html(html);
  }



var imagenes=[];
 function EliminarimagenComprobante(imagen) {
    var result = confirm("¿Está seguro  de eliminar la imagen?");
    if (result == true) {
                
            

    var datos="imageneliminar="+imagen;

    var pagina = "eliminarimagen.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(datos){

          
             removeItemFromArr(resultimagencomprobante,imagen);


             PintarlistaImagen();
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



 function removeItemFromArr(arr,item) {

    var i = arr.indexOf(item);
 
    if (i!== -1) {
        arr.splice( i, 1);
    
      if (arr.length>0) {

          localStorage.setItem('rutacomprobante',arr);

          arraycomentarios.splice(i,1);
      }else{

          localStorage.setItem('rutacomprobante','');

          arraycomentarios=[];
      }


    }
}

var dynamicSheet ='';
function ColocarComentarioComprobante(i) {

  var obtenercomentario=$("#textocomprobante_"+i).text();
  if (obtenercomentario==undefined || obtenercomentario=='undefined') {
    obtenercomentario="";
  }

        dynamicSheet = app.sheet.create({
        content: `
          <div class="sheet-modal modalcomprobante">
            <div class="toolbar">
              <div class="toolbar-inner estilostoolbar" >
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close" id="cerrar" onclick="CerrarModalC()">x</a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner">
              <div class="block">
            <p style="font-weight: bold;font-size: 15px;text-align:center;">Comentario del comprobante</p>
            <div class="item-input-wrap">
             <textarea id="comentariocomprobante" style="height: 4em;width: 100%;">`+obtenercomentario+`</textarea>
           </div>
        <button type="button" class="button gradient signinbuttn md-elevation-6 botonesredondeado botones" style="margin: auto;
    width: 90%;
    margin-top: 1em;" onclick="GuardarComentario(`+i+`)">Guardar</button>
        <div>

        </div>
              </div>
            </div>
          </div>
        `,
        // Events
        on: {
          open: function (sheet) {
            console.log('Sheet open');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

      dynamicSheet.open();
}

function GuardarComentario(i) {
   var comentario= $("#comentariocomprobante").val();

    arraycomentarios[i]=comentario;

      dynamicSheet.close();

      PintarlistaImagen();

//alert(JSON.stringify(arraycomentarios));

}

function CerrarModalC() {
  dynamicSheet.close();
}



function Buscarposcion(posicion) {

      if (arraycomentarios.length>0) {

        if (arraycomentarios[posicion]!='') {

          return true;
        }else{

          return false;
        }

      }else{

        return false;
      }
    
}

function AbrirModalMonedero() {
	$("#modalmonedero").modal();
	$("#monederoausar").attr('onkeyup','ValidarMontoMonedero()');
	ObtenerMonederoUsuario();
}


function ObtenerMonederoUsuario() {
	var idusuario=idparticipante;
	var datos="idusuario="+idusuario;
	 var pagina = "ObtenerUsuario.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(datos){
      	var monedero=datos.monedero;

      		if (monedero>0) {
         		 monederodisponible=monedero;
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

function ValidarMontoMonedero() {
	var valoringresado=$("#monederoausar").val();
	//console.log(valoringresado+'<='+total);
	//console.log(valoringresado+'<='+monederodisponible);
		if (parseFloat(valoringresado)<=parseFloat(monederodisponible)) {
			if (parseFloat(valoringresado)<=parseFloat(total)) {

		}else{

			$("#monederoausar").val('');

		}
	}else{
		$("#monederoausar").val('');
	}
}
function GuardarMonedero() {
	var valoringresado=$("#monederoausar").val();
		if (valoringresado<=monederodisponible) {
				if (valoringresado<=total) {


			monedero=valoringresado;
			$("#modalmonedero").modal('hide');
			CalcularTotales();

		}else{

			alert('El valor es mayor');

		}
	}else{
		alert('El valor es mayor');

	}
}

function RealizarpagoCliente() {
   var respuesta=0;
   var mensaje='';
   var pedido='';
   var informacion='';
   var pagina = "RealizarPago.php";
   var iduser=idparticipante;
   //var constripe=constripe;
   var idtipodepago=$("#tipopago").val();
   var descuentocupon="";
   var codigocupon="";
   var sumatotalapagar=total;
  /* var comision=comision;
   var comisiontotal=comisiontotal;
   var comisionmonto=comisionmonto;
   var impuestototal=impuestototal;
   var subtotalsincomision=subtotalsincomision;
   var impuesto=impuesto;
   var monedero=monedero;*/
   var opcion=0;
   var idopcion=0;
   //var confoto=confoto;
   var bandera=1;
   var montovisual=$("#montovisual").val();
     $(".opccard").each(function(){
              if($(this).is(':checked')){

                opcion=1;
                idopcion=$(this).attr('id');
              }
          });
    var datostarjeta="";
    var datostarjeta2="";
     if (opcion==1) {
        datostarjeta=$("#datostarjeta_"+idopcion).html();
        datostarjeta2=$("#datostarjetaspan_"+idopcion).text();
      }
     var rutacomprobante=resultimagencomprobante;
     var comentarioimagenes=arraycomentarios;
      if (confoto==1) {

        if (rutacomprobante.length==0) {
          bandera=0;
        }
      }
   var datos='pagos='+JSON.stringify(pagos)+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&descuentosaplicados="+JSON.stringify(descuentosaplicados)+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestotal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto+"&descuentosmembresia="+JSON.stringify(descuentosmembresia)+'&datostarjeta='+datostarjeta+'&datostarjeta2='+datostarjeta2+"&monedero="+monedero;
      datos+='&confoto='+confoto+"&rutacomprobante="+rutacomprobante+"&comentarioimagenes="+comentarioimagenes+"&campomonto="+campomonto+"&montovisual="+montovisual+"&cambiomonto="+cambiomonto;
    pagina = urlphp+pagina;
    if (bandera==1) {
         
          CrearModalEspera();
    var promise = $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
    success: function(data) {
        informacion=data;
        respuesta=data.respuesta;
        mensaje=data.mensaje;
        pedido=data.idnotapago;

      
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

                

                     // console.log(informacion);                   

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
                    // PagoNorealizado(mensaje,output.paymentIntent,notapago);
                         // alerta('',mensaje);

                    }
                    else if (output.error==1) {
                  
                      var mensaje = "Opps, La tarjeta fue bloqueada, ha excedido los "+output.intentos+" intentos";
                    //  PagoNorealizado(mensaje,output.paymentIntent,notapago);
                     // alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                    }
                     else if (output.error) {
                      var mensaje = "La tarjeta fue declinada";
                    // PagoNorealizado(mensaje,output.paymentIntent,notapago);
                      //alerta('',mensaje);
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
                      localStorage.setItem('membresiaelegida','');

                    // alerta('',mensaje);

                      //PagoRealizado(mensaje,output.paymentIntent,notapago);

                    }

                    LimpiarVariables();
                    SeleccionarClientePagos(0);
                      }else{

                       
                      setTimeout(function(){
                         LimpiarVariables();
                           SeleccionarClientePagos(0);
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

          }else{

          		if (confoto==1) {
              if (bandera==0) {

                    if (rutacomprobante.length==0) {
                        alerta('','Falta por subir comprobante');
                      }
              }
          	}

          }
        
        

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

                <div class="" style="">
                <div style="padding-top:1em;"></div>

                  <div id="" class="mensajeproceso" style="font-size:20px;font-weight:bold;" >En proceso...
                    <img src="images/loader.gif" style="width:20%;display: flex;justify-content: center;align-items: center;margin:0px auto;">

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
      

 	$("#modalespera").modal();
 	$("#divespera").html(html);

}

function AbrirModalDetalle(idnotapago,idusuario) {
	$("#modaldetallenota").modal();
	ObtenerDetalleNota(idnotapago,idusuario);
}

function ObtenerDetalleNota(idnotapago,idusuario) {
	var datos="idnotapago="+idnotapago+"&id_user="+idusuario;
	 var pagina = "ObtenerDetalleNota.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(resp){

      	var pagos=resp.pagos;
      	var descuentos=resp.descuentos;
      	var descuentosmembresia=resp.descuentosmembresia;
      	var respuesta=resp.respuesta;
      	PintardetalleNota(respuesta[0]);
      	PintarPagos(pagos);

      	if (descuentos.length>0) {

      	PintarDescuentosDetalle(descuentos);

      }

      	if (descuentosmembresia.length>0) {
      	PintarDescuentosDetalleMembresia(descuentosmembresia[0]);

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

function PintarPagos(respuesta) {
	var html="";
	var sumapagos=0;
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<tr style="text-align: center;">

				      <td  width="40">`+respuesta[i].concepto+` </td>
				
				      <td  width="40">$<span id="monto_`+respuesta[i].idpago+`">`+respuesta[i].monto+`</span></td>
			    </tr>`;
		
			    sumapagos=parseFloat(sumapagos)+parseFloat(respuesta[i].monto);
		}


	}
	$("#subtotal").text(formato_numero(sumapagos,'2','.',','));
	$(".listadopagos").html(html);
}
function PintarDescuentosDetalle(respuesta) {
	var html="";
	console.log(respuesta);
	if (respuesta.length>0) {
		
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulo+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].iddescuento+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}
	//$(".listadodescuentos").html(html);
}

function PintarDescuentosDetalleMembresia(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulo+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].idmembresia+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}

	//$(".listadodescuentosmembresia").html(html);
}

function PintardetalleNota(respuesta) {
	var html="";

	html+=`
	<div class="row">
	<div class="col-md-6" style="
    margin: 0;
    padding: 0;">
		<div class="">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body">
			<div class="row" style="
			    /* margin-left: 1em; */
			    ">
			    	<div class="col-md-12" style="text-align: right;font-size: 16px;">SUBTOTAL: </div>
			    	<div class="col-md-12" style="text-align: right;font-size: 16px;">MONEDERO: </div>
			
				<div class="col-md-12" style="text-align: right;font-size: 16px;">DESCUENTO: </div>
				<div class="col-md-12" style="text-align: right;font-size: 16px;">DESCUENTO MEMBRESÍA: </div>
					<div class="col-md-12 divcomision" style="text-align: right;font-size: 16px;">COMISIÓN: </div>

				<div class="col-md-12" style="text-align: right;font-size: 20px;">TOTAL:</div>

			</div>
		</div>
	</div>
	</div>
	</div>
</div>
	<div class="col-md-6">

		<div class="row">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="    padding-left: 0;
    padding-right: 1px;">
			<div class="row">
				<div class="col-md-12" style="text-align: right;">$<span id="subtotal" style="
    font-size: 16px;"></span></div>
						<div class="col-md-12" style="text-align: right;">$<span id="monedero" style="
    font-size: 16px;">`+formato_numero(respuesta.montomonedero,2,'.',',')+`</span></div>
				
				<div class="col-md-12" style="text-align: right;">$<span id="descuento" style="
    font-size: 16px;">`+formato_numero(respuesta.descuento,2,'.',',')+`</span>
				</div>
				<div class="col-md-12" style="text-align: right;padding-top: 24px;">$<span id="descuentomembresia" style="font-size: 16px;">`+formato_numero(respuesta.descuentomembresia,2,'.',',')+`</span><br>
				</div><br>

					<div class="col-md-12 divcomision" style="text-align: right;">$<span id="comision" style=" font-size: 16px;">`+formato_numero(respuesta.comisiontotal,2,'.',',')+`</span>
				</div>
				<div class="col-md-12" style="text-align: right;font-size: 20px;/* padding-top: 6px; */">$<span id="total">`+formato_numero(respuesta.total,2,'.',',')+`</span></div></div>

			</div>
		</div>
	</div>
	</div>
		</div>
	</div>


	`;

	$(".modaldetalle").html(html);
}

function AbrirModalNuevoPago() {
	$("#modalnuevopago").modal();
}
function HabilitarOpcion(opcion) {
	$(".opciones").prop('checked',false);
	$("#opcion_"+opcion).prop('checked',true);
	$("#listado").html();
	$("#servicioslistado").css('display','none');
	$("#membresiaslistado").css('display','none');
	$("#divservicios").css('display','none');
	$("#divmembresia").css('display','none');
	$("#servicioslistado").val(0);
	$("#membresiaslistado").val(0);
	if (opcion==1) {
		$("#listado").css('display','block');
		$("#divservicios").css('display','block');
		ObtenerServiciosListado();
		$("#servicioslistado").css('display','block');


	}
	if (opcion==2) {
		$("#listado").css('display','block');
		$("#divmembresia").css('display','block');
		ObtenerMembresiaListado();
		$("#membresiaslistado").css('display','block');
	}
	if (opcion==3) {

	}


}

function ObtenerServiciosListado() {
      $.ajax({
      type: 'POST',
      dataType: 'json',
	  url:'catalogos/pagos/ObtenerServiciosListado.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){

	var respuesta=resp.respuesta;

      	if (respuesta.length>0) {
      		PintarListadoServicio(respuesta);
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

function PintarListadoServicio(respuesta) {
	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idservicio+`">`+respuesta[i].titulo+`</option>`;
			
		}

		$("#servicioslistado").html(html);
	}
}
function ObtenerMembresiaListado() {
      $.ajax({
      type: 'POST',
      dataType: 'json',
	  url:'catalogos/pagos/ObtenerMembresiaListado.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){


      	var respuesta=resp.respuesta;

      	if (respuesta.length>0) {
      		PintarListadoMembresia(respuesta);
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

function PintarListadoMembresia(respuesta) {
	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idmembresia+`">`+respuesta[i].titulo+`</option>`;
			
		}

		$("#membresiaslistado").html(html);
	}
}

function GuardarPago() {
	var concepto=$("#txtconcepto").val();
	var monto=$("#txtmonto").val();
	var idservicio=0;
	var idmembresia=0;
	var idopcion=0;

	if ($("#servicioslistado")) {
		idservicio=$("#servicioslistado").val();
	}

	if (idservicio==null) {
		idservicio=0;
	}

	if ($("#membresiaslistado")) {
	idmembresia=$("#membresiaslistado").val();
	}
	if (idmembresia==null) {
		idmembresia=0;
	}
	$(".opciones").each(function( index ) {
		 if($(this).is(':checked')){
		 	var opciones=$(this).attr('id');
		 	var dividir=opciones.split('_');
		 	idopcion=dividir[1];
		 }
	});

	var datos="idpago=0"+"&concepto="+concepto+"&monto="+monto+"&idservicio="+idservicio+"&idmembresia="+idmembresia+"&idopcion="+idopcion+"&idusuario="+idparticipante;
	  $.ajax({
      type: 'POST',
      data:datos,
      dataType: 'json',
	  url:'catalogos/pagos/GuardarPago.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){
      	if (resp.respuesta==1) {

      		SeleccionarClientePagos(idparticipante);
      		$("#modalnuevopago").modal('hide');
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
