var alumnoseleccionado="";
var nombreseleccionado="";
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
function VerdatelleNotapago(idnotapago,idusuario,idmenumodulo) {
	var datos="idnotapago="+idnotapago+"&idusuario="+idusuario+"&idmenumodulo="+idmenumodulo;

	idmenumodu=idmenumodulo;
	  $.ajax({
      type: 'POST',
      data:datos,
	  url:'catalogos/notaspago/detallenota.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){
      
	  $("#main").html(resp);
          
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
}

function ObtenerClientesNotas() {
	$.ajax({
		url:'catalogos/asignarmembresias/ObtenerAlumnos.php', //Url a donde la enviaremos
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
		  var resp = msj.usuarios;
		$("#myModalUsuariosnotas").modal();

		  PintarUsuariosAlumnos(resp);

			 			
			}
	});
}


function PintarUsuariosAlumnos(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			 var nombre=respuesta[i].nombre+" "+respuesta[i].paterno+" "+respuesta[i].materno+` - `+respuesta[i].usuario;

			html+=`

				<div class="form-check alumnos_"  id="alumnos_`+respuesta[i].idusuarios+`">		 
		  		<input  type="checkbox"   value="`+respuesta[i].idusuarios+`" class="form-check-input chkalumno" id="inputalumno_`+respuesta[i].idusuarios+`" onchange="SeleccionarAlumno(`+respuesta[i].idusuarios+`,'`+nombre+`')">
		  		<label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;">`+nombre+`</label> 
				</div>						    		

			`;
		}
		$("#divusuarios").html(html);
	}
}

function SeleccionarAlumno(idusuario,nombre) {
	
	$(".chkalumno").prop('checked',false);
	$("#inputalumno_"+idusuario).prop('checked',true);

	alumnoseleccionado=idusuario;
	nombreseleccionado=nombre;
	monederoaplicado=0;
}

function ObtenerPagos() {

	$("#myModalUsuariosnotas").modal('hide');
	$(".nombreusuario").val(nombreseleccionado);
	$(".nombreusuario2").text(nombreseleccionado);

	$(".divtodospagos").css('display','block');
	ObtenerPagosCliente();
	$("#botones").css('display','block');
	 $(".btnnuevopago").css('display','block');
}


function ObtenerPagosCliente() {
	
	var datos="idusuario="+alumnoseleccionado;
	  	idparticipante=alumnoseleccionado;

	$.ajax({
		url:'catalogos/notaspago/ObtenerPagosCliente.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 dataType:'json',
	 data:datos,
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
	  		var pagos=msj.pagos;
	  		PintarPagosPorpagar(pagos);
		 		
			}
	});
}
function PintarPagosPorpagar(pagos) {
	var html="";
	if (pagos.length>0) {
		html+=`<ul class="list-group">
		 		<li class="list-group-item  " style="">

		       <div class="row">
				   <div class="col-md-7">
				   </div>
				  <div class="col-md-4">

					<p style="float: right;">Seleccionar todos  <input type="checkbox" id="checktodos" onchange="SeleccionarTodos()" style="float:rigth;">
					</p>
			 	  </div>
		 	  </div>
		</li>

		`;
		for (var i = 0; i <pagos.length; i++) {
			html+=`

			  <li class="list-group-item  align-items-center">
			   <div class="row">
			   <div class="col-md-10">
			   		<p id="concepto_`+pagos[i].idpago+`">Pago de `+pagos[i].concepto+`</p>`;
			    	 if(pagos[i].fechaformato!=''){

                             html+=`<p class="">Vencimiento `+pagos[i].fechaformato+`</p>`;
                          }
                        html+=`<p class=""> `+pagos[i].nombre+` `+pagos[i].paterno+` `+pagos[i].materno+`</p>
   
                          <p class="">$`+pagos[i].monto+`</p>
                          <input type="hidden" value="`+pagos[i].monto+`" class="montopago" id="val_`+pagos[i].idpago+`">

                   </div>
                   <div class="col-md-2">

					    <span class="badge ">
 						<input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" style="float:rigth;" />
                        <input type="hidden" id="tipo_`+pagos[i].idpago+`" value="`+pagos[i].tipo+`"  />
                        
					    </span>
			   		 </div>
			    
			    </div>

			  </li>
  

			`;
		}

		html+=`</ul>`;


	}

	$(".todospagos").html(html);
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
      		tipo=$("#tipo_"+dividir).val();
		 	contar++;

		 	var objeto={
		 		id:dividir,
		 		concepto:concepto.trim(),
		 		monto:contador,
        tipo:tipo
		 	};

		 	console.log(objeto);
		 	pagosarealizar.push(objeto);

		 }
	
	});
 $("#uldescuentos").html('');
 $(".divmonedero").css('display','block');
 $(".divresumen").css('display','block');
 $(".divtotal").css('display','block');
 $(".divmetodopago").css('display','block');
 $(".divpagar").css('display','block');
 $(".divresumenpago").css('display','block');
 $(".divcomision").css('display','none');

CargarPagosElegidos();
ObtenerDescuentosRelacionadosNotas();
	/*if (contar==0) {
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
*/
}


function CargarPagosElegidos() {

	var listado=pagosarealizar;
	console.log(listado);
	var html="";
	html+=`<ul class="list-group">`;
	for (var i = 0; i <listado.length; i++) {
   var color='';
      if (listado[i].monto<0) {
        color='red';
      }
			/*html+=`
				<li class="list-item" style="color:`+color+`">
                    <div class="row">
                        <div class="col-80" style="padding:0;">
                            <p class="text-muted small" style="font-size:18px;" id="concepto_`+listado[i].id+`">
                              `+listado[i].concepto+`
                            </p>
                            <p class="text-muted " style="font-size:30px;text-align:right;">$`+formato_numero(listado[i].monto,2,'.',',')+`</p>

                          <input type="hidden" value="`+listado[i].monto+`" class="montopago" id="val_`+listado[i].id+`">
                        </div>
                        <div class="col-20">

                        </div>
                    </div>
                 </li>

			`;*/

			html+=`
			<li class="list-group-item  align-items-center" style="color:`+color+`">
			   <div class="row">
			   <div class="col-md-10">
			   		<p id="concepto_`+listado[i].id+`"> `+listado[i].concepto+`</p>
                    <p class="" style="float: right;">$`+formato_numero(listado[i].monto,2,'.',',')+`</p>
                    <input type="hidden" value="`+listado[i].monto+`" class="montopago" id="val_`+listado[i].id+`">

                   </div>
                   <div class="col-md-2">

					    <span class="badge ">
                        <input type="hidden" id="tipo_`+listado[i].id+`" value="`+listado[i].id+`">
                        
					    </span>
			   		 </div>
			    
			    </div>

			  </li>

			`;
		}
		html+=`</ul>`;

		$(".listadopagoselegidos").html(html);
}

function ObtenerDescuentosRelacionadosNotas() {
   var iduser=alumnoseleccionado;

  var datos= 'pagos='+JSON.stringify(pagosarealizar)+"&id_user="+iduser;
 // var pagina = "ObtenerDescuentosRelacionados.php";

    $.ajax({
	  url:'catalogos/notaspago/ObtenerDescuentosRelacionados.php', //Url a donde la enviaremos
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
    success: function(res) {

      var resultado=res.descuentos;
      descuentosaplicados=[];

      PintarDescuentosNotas(resultado);
       ObtenerDescuentoMembresiaNotas();
      
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


function PintarDescuentosNotas(respuesta) {
   var html="";
  $("#visualizardescuentos").css('display','none');

 if (respuesta.length>0) {
    descuentosaplicados=respuesta;
    $("#visualizardescuentos").css('display','block');

  
  for (var i = 0; i <respuesta.length; i++) {
  

    html+=`
    <li class="list-group-item  align-items-center" style="background: #46b2e2;">
			   <div class="row">
			   <div class="col-md-10">
			   		<p id="">  Descuento `+respuesta[i].titulo+`</p>
                    <p class="" style="    float: right;">$<span class="lbldescuento">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></p>

                   </div>
                   <div class="col-md-2">

					    <span class="badge ">
                        
					    </span>
			   		 </div>
			    
			    </div>

			  </li>

    `;

  }

      html+=`</ul>`;

 }


 $("#uldescuentos").append(html);
}



function ObtenerDescuentoMembresiaNotas() {
  //var pagina = "ObtenerMembresiaUsuario.php";
  var id_user=alumnoseleccionado;
  var datos= 'pagos='+JSON.stringify(pagosarealizar)+"&id_user="+id_user+"&descuentosaplicados="+JSON.stringify(descuentosaplicados);
  $.ajax({
    type: 'POST',
    dataType: 'json',
	url:'catalogos/notaspago/ObtenerMembresiaUsuario.php', //Url a donde la enviaremos
    crossDomain: true,
    cache: false,
    data:datos,
    async:false,
    success: function(respuesta){

      var descuentomembresia=respuesta.descuentomembresia;
        descuentosmembresia=[];

      if (descuentomembresia.length>0) {
        PintarDescuentosMembresiaNotas(descuentomembresia);
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

function PintarDescuentosMembresiaNotas(respuesta) {
 
  var html="";

 if (respuesta.length>0) {
    descuentosmembresia=respuesta;
    $("#visualizardescuentos").css('display','block');

  for (var i = 0; i <respuesta.length; i++) {
  

     html+=`
    <li class="list-group-item  align-items-center" style="background: #46b2e2;">
			   <div class="row">
			   <div class="col-md-10">
			   		<p id="">  Descuento `+respuesta[i].titulomembresia+`</p>
                    <p class="" style=" float: right;">$<span class="lbldescuento">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></p>

                   </div>
                   <div class="col-md-2">

					    <span class="badge ">
                        
					    </span>
			   		 </div>
			    
			    </div>

			  </li>

    `;

  }
 }else{
  //$("#visualizardescuentos").css('display','none');
 }


 $("#uldescuentos").append(html);

}

function CalcularTotales() {
	var suma=0;
	pagos=[];
	
	if (pagosarealizar.length>0) {

		for (var i = 0; i <pagosarealizar.length; i++) {
			suma=parseFloat(suma)+parseFloat(pagosarealizar[i].monto);
		}
	
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
	console.log(resta);


	$(".lbltotal").html(formato_numero(resta,2,'.',','));


      if (comisionporcentaje!=0 ){
       // comisionporcentaje=localStorage.getItem('comisionporcentaje');
        comimonto=parseFloat(comisionporcentaje)/100;
        
        comimonto=parseFloat(comimonto)*parseFloat(sumaconcomision);

        comision=parseFloat(comimonto)+parseFloat(comisionmonto);
      
       // localStorage.setItem('comision',comision);

     }


     // if (localStorage.getItem('impuesto')!=0 ){
       // impuesto=localStorage.getItem('impuesto');
        impumonto=impuesto/100;

        comision1=parseFloat(comision)*parseFloat(impumonto);
        impuestotal=comision1;
       // localStorage.setItem('impuestotal',comision1);
        comision=parseFloat(comision1)+parseFloat(comision);


     // }
        $(".divcomision").css('display','none');


      if (comision!=0 || comisionmonto!=0 ) {

        $(".divcomision").css('display','block');
        $(".lblcomision").text(formato_numero(comision,2,'.',','));
       // localStorage.setItem('comisiontotal',comision);
        comisiontotal=comision;
        sumaconcomision=parseFloat(sumaconcomision)+parseFloat(comision);
      }
   // subtotalsincomision=total.toFixed(2);
    //localStorage.setItem('subtotalsincomision',resta.toFixed(2));
	  //localStorage.setItem('sumatotalapagar',sumaconcomision.toFixed(2));
	$(".lblresumen").text(formato_numero(resta,2,'.',','));
    $(".lbltotal").text(formato_numero(sumaconcomision,2,'.',','));
    $("#monedero").text(formato_numero(monedero,2,'.',','));	
    var suma=sumaconcomision;

    total=sumaconcomision;
    if (suma==0 && monederoaplicado!=0) {

      $("#btnpagarresumen").attr('disabled',false);
    }
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
		confoto=0;
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
              <div class="">
                <div class="">
                 
                  <div class="" style="   text-align: justify;-webkit-line-clamp: 200;" >

                    <div style="    padding-left: 1em;padding-right: 1em;padding-top: .2em;padding-bottom: .2em;background: #dfdfdf;border-radius: 10px;font-size:16px;">
                  `+
                  html1
                  +`
                    </div>
                  </div>
                </div>
              </div>
            </li>`;

            html+=`
            	<div id="habilitarfoto" style="display: block;">
      <div class="subdivisiones" style="margin-top: 1.5em" ><span style="margin-top: .5em;margin-left: .5em;">Comprobante</span></div>

           <div class=""  >
                  <div>
                      <button type="button"  onclick="AbrirModalFotoComprobante()" class="btn btn-success botonesaccion botonesredondeado estiloboton" style="margin-top: 1em;background:#4cd964;margin-bottom:1em;width:100%;"> SUBIR comprobante</button>
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
  	      if (comisionporcentaje!=0) {
  	      	 $(".divcomision").css('display','block');

  	      }
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

function AbrirModalFotoComprobante() {
	$("#d_foto").css('display','none');
	$("#image").val(''); 
	$("#d_foto").html('<img src="images/sinfoto.png" class="card-img-top" alt="" style="border: 1px #777 solid">');
	$(".card-img-top").attr('src','images/sinfoto.png');
	$("#modalimagencomprobante1").modal();
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

	$("#modalimagencomprobante1").modal('hide');
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
      	var monedero1=datos.monedero;

      		if (monedero1>0) {
         		 monederodisponible=monedero1;
      		}
      	$(".monederodisponible").text(formato_numero(monedero1,2,'.',','));
           
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
     console.log('confoto= '+confoto);
      if (confoto==1) {

        if (rutacomprobante.length==0) {
          bandera=0;
        }
      }
   var datos='pagos='+JSON.stringify(pagosarealizar)+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&descuentosaplicados="+JSON.stringify(descuentosaplicados)+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestotal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto+"&descuentosmembresia="+JSON.stringify(descuentosmembresia)+'&datostarjeta='+datostarjeta+'&datostarjeta2='+datostarjeta2+"&monedero="+monedero;
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

                      var stripe=constripe;
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
                    $(".divresumenpago").css('display','none');
                    ObtenerPagosCliente();
                      }else{

                    
                      setTimeout(function(){
                         
                          // SeleccionarClientePagos(0);
                         $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','none');
                          $(".mensajeexito").css('display','block');
                          var mensaje = "El pago se ha completado con éxito";
                          $(".mensajeexito").text(mensaje);

                          $(".mensajeproceso").css('display','none');
                          $(".mensajeexito").css('display','block');

                          $(".butonok").css('display','block');
                          $(".butoerror").css('display','none');
                          LimpiarVariables();
                           ObtenerPagosCliente();
                          $(".divresumenpago").css('display','none');

                      }, 1000);
                         

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



                <span class="btn btn-success butonok" onclick="VerPagos()" style="display:none;">OK</span>

                <span class="btn btn_rojo butoerror" onclick="CerrarEspera()" style="display:none;">OK</span>


                  <div style="color:red;font-size:20px;"></div>

                     
                      
                </div>



                  </div>
               </div>

        
              `;
      

 	$("#modalespera").modal();
 	$("#divespera").html(html);

}

function CerrarEspera() {

	$("#modalespera").modal('hide');
}

function VerPagos() {

	$("#modalespera").modal('hide');
	ObtenerPagosCliente();
}


function AbrirModalNuevoPago() {
	$("#modalnuevopago").modal();
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

      		ObtenerPagosCliente();
      		$("#modalnuevopago").modal('hide');
      		$("#txtconcepto").val('');
      		$("#txtmonto").val('');
      		$("#opcion_1").prop('checked',false);
      		$("#opcion_2").prop('checked',false);
      		$("#opcion_3").prop('checked',false);
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
 pagosarealizar=[];
$("#montovisual").val(0);
$(".pagosusuario").each(function( index ) {
	$(this).prop('checked',false);
	});
 pagos=[];


suma=0;

 $("#subtotal").html(formato_numero(suma,2,'.',','));

 $(".divmonedero").css('display','none');
 $("#uldescuentos").css('display','none');
 $(".divresumen").css('display','none');
 $(".divcomision").css('display','none');
 $(".divmetodopago").css('display','none');
 $(".divtotal").css('display','none');

 
 $(".listadopagoselegidos").css('display','none');
 $("#tipopago").val(0);
 CargarOpcionesTipopago();
 CalcularTotales();

}

function ObtenerNotasPorvalidar() {
	
	 var pagina = "ObtenerNotasPorvalidar.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url:'catalogos/notaspago/'+pagina, //Url a donde la enviaremos
      async:false,
      success: function(msj){

      	var respuesta=msj.pagos;
      	PintarNotasporvalidar(respuesta);
     
           
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });

}
function PintarNotasporvalidar(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			 html+=`
		    <li class="list-group-item  align-items-center linotasporvalidar" id="nota_`+respuesta[i].idnotapago+`" style="" >
					   <div class="row">
					   <div class="col-md-9">
					   		<p id="">Pago #`+respuesta[i].folio+` </p>
					   		<p>`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</p>
		              		<p class="" style="">`+respuesta[i].fechaformato+`</p>

		                    <p class="" style="">$<span class="">`+formato_numero(respuesta[i].total,2,'.',',')+`</span></p>

		                   </div>
		                   <div class="col-md-3">

							    <span class="badge " style="display:none;">
							    </span>

							    <button type="button" class="btn btn-info" onclick="DetalleNota(`+respuesta[i].idnotapago+`)">Ver detalle</button>
					   		 </div>
					    
					    </div>

					  </li>

		    `;
		}
	}
	$(".notasporvalidar").html(html);
}

function DetalleNota(idnotapago) {
	var datos="idnotapago="+idnotapago;
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
      	var usuario=resp.usuario;
      	var rutaimagenes=resp.rutaimagenes;
      	var imagenescomprobante=resp.imagenescomprobante;
      	PintardetalleNotapago(respuesta[0]);
      	PintarPagos(pagos);
		$("#uldescuentos").html('');
      	if (descuentos.length>0) {

      	PintarDescuentosDetalleNota(descuentos);

      }

      	if (descuentosmembresia.length>0) {
      	PintarDescuentosDetalleMembresiaNota(descuentosmembresia[0]);

      }
      	
      	if (imagenescomprobante.length>0) {
      		PintarImagenesNota(imagenescomprobante,rutaimagenes);
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

function PintardetalleNotapago(respuesta) {
	$(".divdetalle").css('display','block');
estatus=['PENDIENTE','ACEPTADO','CANCELADO'];

	$("#folionota").text('PAGO #'+respuesta.folio);
	$("#fechapago").text(respuesta.fecha);
	//var nombreusuario=usuario.nombre+" "+usuario.paterno+" "+usuario.materno;
	//$("#alumno").text(nombreusuario);
	$("#tipopago").text(respuesta.tipopago);

	$("#estatus").text(estatus[respuesta.estatus]);
	var classe="";
	if (respuesta.estatus==0) {
		classe="notapendiente";
	}

	if (respuesta.estatus==1) {
		classe="notaaceptado";
	}

	if (respuesta.estatus==2) {
		classe="notacancelado";
	}

	$("#estatus").addClass(classe);

	$(".divmonedero").css('display','block');
	$(".divresumen").css('display','block');
	$(".divcomision").css('display','block');
	$(".divtotal").css('display','block');
	//$("#btnState_1").attr('onchange','CambiarEstatusNota('+respuesta.idnotapago+')');
	var html="";
	$("#monedero").html(respuesta.montomonedero);
	$(".lblresumen").html(respuesta.subtotal);
	$(".lblcomision").html(respuesta.comisiontotal);
	$(".lbltotal").html(respuesta.total);
	$(".btncambiarestatus").attr('onclick','Abrirmodalaceptacion('+respuesta.idnotapago+')');

}

function Abrirmodalaceptacion(idnotapago) {
	$("#txtvalidacion").css('border','1px solid #e9ecef');
	$("#txtdescripcion").text('');
	$(".btnvalidacion").attr('onclick','GuardarValidacionNota('+idnotapago+')');
	$("#modalaceptacion").modal();

}

function PintarPagos(respuesta) {

	var html="";
	var sumapagos=0;
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=` <li class="list-group-item  align-items-center" style="" >
					   <div class="row">
					   <div class="col-md-10">
					   		<p id=""> `+respuesta[i].concepto+` </p>
		                    <p class="" style="float: right;">$<span class="">`+formato_numero(respuesta[i].monto,2,'.',',')+`</span></p>

		                   </div>
		                   <div class="col-md-2">

							    <span class="badge ">
		                        
							    </span>
					   		 </div>
					    
					    </div>

					  </li>`;
		
			    sumapagos=parseFloat(sumapagos)+parseFloat(respuesta[i].monto);
		}


	}
	//$("#subtotal").text(formato_numero(sumapagos,'2','.',','));
	$(".listadopagos").html(html);
}


function PintarDescuentosDetalleNota(respuesta) {
	var html="";
	
	if (respuesta.length>0) {
		
		for (var i = 0; i < respuesta.length; i++) {
			
			html+=` <li class="list-group-item  align-items-center" style="background: #46b2e2;">
			   <div class="row">
			   <div class="col-md-10">
			   		<p id="">  Descuento `+respuesta[i][0].titulo+`</p>
                    <p class="" style=" float: right;">$<span class="lbldescuento">`+formato_numero(respuesta[i][0].montoadescontar,2,'.',',')+`</span></p>

                   </div>
                   <div class="col-md-2">

					    <span class="badge ">
                        
					    </span>
			   		 </div>
			    
			    </div>

			  </li>`;
		}
	}
	$("#uldescuentos").append(html);
}

function PintarDescuentosDetalleMembresiaNota(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=` <li class="list-group-item  align-items-center" style="background: #46b2e2;">
			   <div class="row">
			   <div class="col-md-10">
			   		<p id="">  Descuento `+respuesta[i][0].titulo+`</p>
                    <p class="" style=" float: right;">$<span class="lbldescuento">`+formato_numero(respuesta[i][0].montoadescontar,2,'.',',')+`</span></p>

                   </div>
                   <div class="col-md-2">
					    <span class="badge ">
                        
					    </span>
			   		 </div>
			    
			    </div>

			  </li>`;
		}
	}

	$("#uldescuentos").append(html);
}

function PintarImagenesNota(imagenes,rutaimagenes) {
	var html="";

	if (rutaimagenes!='' && rutaimagenes!=null) {
	var ruta="app/"+rutaimagenes+"/php/upload/comprobante/";
		}else{
	var ruta="app/php/upload/comprobante/";

		}
	if (imagenes.length>0) {
		for (var i = 0; i < imagenes.length; i++) {
			
			html+=`
				<div class="card" style="width: 18rem;">
				  <img class="card-img-top" src="`+ruta+imagenes[i].rutacomprobante+`" >
				  <div class="card-body">
				    <h5 class="card-title"></h5>
				    <p class="card-text">`+imagenes[i].comentario+`</p>
				  </div>
				</div>

			`;
		}
	}
	$(".imagenescomprobante").html(html);
}

function GuardarValidacionNota(idnotapago) {
		$("#txtdescripcion").text('');
		$("#txtdescripcion").removeClass('inputrequerido');
		$("#txtvalidacion").css('border','0px');

	var descripcion=$("#txtvalidacion").val();
	var datos="descripcion="+descripcion+"&idnotapago="+idnotapago+"&estado=1";
	var pagina = "Cambiarestatus.php";
     var bandera=1;
	if (descripcion=='') {
		bandera=0;
		$("#txtvalidacion").css('border','1px solid red');
		$("#txtdescripcion").text('Campo requerido');
		$("#txtdescripcion").addClass('inputrequerido');
	}

	if (bandera==1) {
      $.ajax({
      type: 'POST',
      dataType: 'json',
      data:datos,
      url:'catalogos/notaspago/'+pagina, //Url a donde la enviaremos
      async:false,
      success: function(msj){


           $("#modalaceptacion").modal('hide');
           AbrirNotificacion("SE REALIZARON LOS CAMBIOS CORRECTAMENTE","mdi-checkbox-marked-circle ");
           ObtenerNotasPorvalidar();
           $(".divdetalle").css('display','none');

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
  }else{
  	if (descripcion=='') {
		$("#txtvalidacion").css('border','1px solid red');
		$("#txtdescripcion").text('Campo requerido');
	}

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