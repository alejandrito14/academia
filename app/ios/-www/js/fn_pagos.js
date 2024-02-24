var descuentosaplicados=[];
var descuentosmembresia=[];
var arraycomentarios=[];
var resultimagendatosfactura=[];
var dynamicSheet4="";
var swiper1="";
var lastcard=0;

function ObtenerTotalPagos() {
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
		success: function(respuesta){
				var resultado=respuesta.total;
			$(".totalpagos").text('$'+formato_numero(resultado,2,'.',','));

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
          if (resultado[0].fechaformato!='') {
             $(".divvencimiento").css('display','block');
             $(".vencimiento").text(resultado[0].fechaformato);
          }
         
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
                        <div class="col-80">
                        <p>Seleccionar todos</p>
                        </div>
                        <div class="col-20">
                        <input type="checkbox" id="checktodos" onchange="SeleccionarTodos()" style="    width: 30px;height: 20px;" />
                        </div>
                    </div>
                 </li>

		`;
		for (var i = 0; i <pagos.length; i++) {
			html+=`
				<li class="list-item">
                    <div class="row">
                        <div class="col-80">
                            <p class="text-muted " id="concepto_`+pagos[i].idpago+`">
                               Pago de `+pagos[i].concepto+`
                            </p>`;
                          if(pagos[i].fechaformato!=''){

                             html+=`<p class="text-muted small">Vencimiento `+pagos[i].fechaformato+`</p>`;
                          }
                        html+=`<p class="text-muted small"> `+pagos[i].nombre+` `+pagos[i].paterno+` `+pagos[i].materno+`</p>`;
                            
                        if (pagos[i].alumnos!='') {

                         html+=`<p class="text-muted small"> Asignados:`+pagos[i].alumnos+` Aceptados: `+pagos[i].aceptados+`</p>`;
 
                        }


                     if (pagos[i].fechamin!='') {

                         html+=`<p class="text-muted small"> Fecha inicio: `+pagos[i].fechamin+`</p>
                         <p  class="text-muted small"> Fecha fin: `+pagos[i].fechamax+`</p>`;
 
                        }

                         html+=` <p class="text-muted small">$`+pagos[i].monto+`</p>

                          <input type="hidden" value="`+pagos[i].monto+`" class="montopago" id="val_`+pagos[i].idpago+`">
                        </div>
                        <div class="col-20">`;

                        if (pagos[i].dividido==2) {


                          if (pagos[i].alumnos==pagos[i].aceptados) {

                             html+=` <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" style="width: 30px;height: 20px;" />`;
                               html+=` <input type="hidden" id="sepuede_`+pagos[i].idpago+`" class="" value="1" style="" />`;

                          }else{

                            html+=` <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Advertencia(`+pagos[i].idpago+`)" style="width: 30px;height: 20px;" />`;
                               html+=` <input type="hidden" id="sepuede_`+pagos[i].idpago+`" class="" value="0" style="" />`;

                          }
     
                        }else{

                         html+=` <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" style="width: 30px;height: 20px;" />`;
                         html+=` <input type="hidden" id="sepuede_`+pagos[i].idpago+`" class="" value="1" style="" />`;

                        }

                      

                      html+=`

                        <input type="hidden" id="tipo_`+pagos[i].idpago+`" value="`+pagos[i].tipo+`"  />

                        <input type="hidden" id="servicio_`+pagos[i].idpago+`" value="`+pagos[i].idservicio+`"  />
                        <input type="hidden" id="fechainicial_`+pagos[i].idpago+`" value="`+pagos[i].fechainicial+`"  />
                        <input type="hidden" id="fechafinal_`+pagos[i].idpago+`" value="`+pagos[i].fechafinal+`"  />
                        <input type="hidden" id="usuario_`+pagos[i].idpago+`" value="`+pagos[i].idusuarios+`"  />

                        </div>
                    </div>
                 </li>

			`;
		}

		$(".listadopagos").html(html);
	}else{
        $(".listadopagos").css('display','none');

  }
}

function Advertencia(idpago) {
  $("#check_"+idpago).prop('checked',false);

  alerta('','Para pagar, todos los participantes deben aceptar');

}

function SeleccionarTodos() {
	if ($("#checktodos").is(':checked')) {
		//$(".seleccionar").prop('checked',true);

    $(".seleccionar").each(function( index ) {

       var id=$(this).attr('id');
       var explode=id.split('_');

       var sepuede=$("#sepuede_"+explode[1]).val();
          console.log(explode);
        if ($("#val_"+explode[1]).val()>0  && sepuede==1) {

          $("#check_"+explode[1]).prop('checked',true);
        }

      });
	 }else{
		//$(".seleccionar").prop('checked',false);
    $(".seleccionar").each(function( index ) {

        var id=$(this).attr('id');
        var explode=id.split('_');
       
         $("#check_"+explode[1]).prop('checked',false);
       

        });
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
  var contarseleccionadoscero=0;
  var pagocero=0;
    pagosarealizar=[];
	$( ".seleccionar" ).each(function(index) {
	
		 if($(this).is(':checked')){
		 	var id=$(this).attr('id');
     console.log('idelemento'+id);
		 	var dividir=id.split('_')[1];
		 	var contador=$("#val_"+dividir).val();
		 	suma=parseFloat(suma)+parseFloat(contador);
    


      if (contador==0) {
       // $(this).prop('checked',false);
        pagocero=1;  
        contarseleccionadoscero++;    
      }

		 	concepto=$("#concepto_"+dividir).text();
      tipo=$("#tipo_"+dividir).val();
      if ($("#servicio_"+dividir)) {
          servicio=$("#servicio_"+dividir).val();
 
           }else{
            servicio=0;
           }
      if ($("#fechainicial_"+dividir)) {
          fechainicial=$("#fechainicial_"+dividir).val();
 
           }else{
            fechainicial="";
           }
       if ($("#fechafinal_"+dividir)) {
          fechafinal=$("#fechafinal_"+dividir).val();
 
           }else{
            fechafinal="";
           }

          if ($("#usuario_"+dividir)) {
          usuario=$("#usuario_"+dividir).val();
 
           }else{
            usuario="";
           }


         
		 	contar++;
      console.log(contar)
		 	var objeto={
		 		id:dividir,
		 		concepto:concepto.trim(),
		 		monto:contador,
        tipo:tipo,
        servicio:servicio,
        fechainicial:fechainicial,
        fechafinal:fechafinal,
        usuario:usuario
		 	};
		 	pagosarealizar.push(objeto);


      

		 }
	
	});
 
   if (contar!=contarseleccionadoscero) {
    if (pagocero==1) {
      
      alerta('','El pago con monto cero se debe pagar en un ticket independiente');
      $( ".seleccionar" ).each(function( index ) {
  
     if($(this ).is(':checked')){
        var id=$(this).attr('id');
     
        var dividir=id.split('_')[1];
        var valor=$("#val_"+dividir).val();

        if (valor==0) {
        for (var i=0;i< pagosarealizar.length; i++) {
          
           if (pagosarealizar[i].id==dividir) {
           
            $("#check_"+dividir).prop('checked',false);

            pagosarealizar.splice(i,1);

           }
        
        }
      }

        }
      });
    }

  }
  


	if (contar==0) {
		$(".btnpagar").prop('disabled',true);
		$("#checktodos").prop('checked',false);
		$(".cantidad").text(formato_numero(suma,2,'.',','));
		localStorage.setItem('montopago',suma);
	}
	if (contar>0) {

     if (contar!=contarseleccionadoscero) {
    if (pagocero==1) {
          $(".btnpagar").prop('disabled',true);
          $(".checktodos").prop('checked',false);
          $(".cantidad").text(formato_numero(suma,2,'.',','));
          localStorage.setItem('montopago',suma);

      }else{

         $(".btnpagar").prop('disabled',false);
       $(".cantidad").text(formato_numero(suma,2,'.',','));
       localStorage.setItem('montopago',suma);

         

      }
    }else{
       $(".btnpagar").prop('disabled',false);
       $(".cantidad").text(formato_numero(suma,2,'.',','));
       localStorage.setItem('montopago',suma);

       
    }

	
	}

  localStorage.setItem('pagos',JSON.stringify(pagosarealizar));

}

function ResumenPago() {

	GoToPageHistory('resumenpago');
}

function CargarPagosElegidos() {

	var listado=JSON.parse(localStorage.getItem('pagos'));
	console.log(listado);
	var html="";
	for (var i = 0; i <listado.length; i++) {
   var color='';
      if (listado[i].monto<0) {
        color='red';
      }
			html+=`
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

			`;
		}

		$(".listadopagoselegidos").html(html);
}


function Cargartipopago(tipodepagoseleccionado) {


    var pagina = "obtenertipodepagos.php";
    var datos="tipo=0";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
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

function CargartipopagoFactura(tipodepagoseleccionado) {
   var pagina = "obtenertipodepagos.php";
    var datos="tipo=1";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
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
  /* var html='';

  if (opciones.length>0) {
     html+=`  <option  class="first-option" value="0" >Seleccionar método de pago</option>`;
    for (var i = 0; i <opciones.length; i++) {

    html+=`  <option value="`+opciones[i].idtipodepago+`">`+
             opciones[i].tipo  +`</option>`;

          }

    }


  $("#tipopago").html(html);

*/



 var html="";

      var classe="swiper-slide-active";

    if (opciones.length>0) {

      html+=` <div class="swiper-wrapper" style="margin-left: 1em;">`;
    for (var i = 0; i < opciones.length; i++) {
      esicono=0;
      imagenicono="";

      if (opciones[i].icono!=null && opciones[i].icono!='') {
        imagenicono=`<span class="material-icons-outlined">`+opciones[i].icono+`</span>`;
         esicono=1;
      }
      esimagen=0;
      if (opciones[i].imagen!=null && opciones[i].imagen!='' ) {
         esimagen=1;
        imagenicono=urlimagenes+"tipodepagos/imagenes/"+codigoserv+"/"+opciones[i].imagen;
      }

     
      var checked="";
     
        html+=`
<div class="swiper-slide swiper-slide-active" role="group"  style="margin-right: 20px;width:auto;">
        <div class="card cardtipopago" id="cardtipopago_`+opciones[i].idtipodepago+`" style="height: 55px!important;padding: 10px;" onclick="CargarOpcionesTipopago(`+opciones[i].idtipodepago+`)">
        <div class="card-content   featured-card" style="padding-top: 9px;">
           
            <div class="card-info">
             `;
                if (imagenicono!='' && esicono==1 && esimagen==0) {
                  html+=imagenicono;
                }

                if (imagenicono!='' && esimagen==1 && esicono==0) {

                 html+=`<img src="`+imagenicono+`" alt="" style="width:30px;">`;
                }

              html+=` 
          <h5 class="title" >
               <a >`+opciones[i].tipo+`
                </a>
              </h5>
              <p class="location">
              </p>
              <h6 class="text-primary vacancy">
              </h6>
            </div>
          </div>
        </div>
        </div>

        `;
        classe="";
    }

    html+=`</div>`;
   
    $$(".divtablerotipo").html(html);

    if (swiper1 && swiper1.destroy) {
      // Destruir el Swiper existente si está presente
      swiper1.destroy(true, true); // Los parámetros true limpian los eventos y la estructura del DOM
    }

      swiper1 = new Swiper(".divtablerotipo", {
         slidesPerView: "auto",
        spaceBetween: 1,
        pagination: false,

      });
      $(".divtablerotipo").css('display','block');



      swiper1.update();
  }else{

    $(".divtablerotipo").css('display','none');

  }
  }


function ObtenerTotalCarrito() {

   return new Promise(function(resolve, reject) {
  var idusuario=localStorage.getItem('id_user');

var datos="idusuario="+idusuario;
var pagina="ObtenerCarrito.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      var res=resp.respuesta;
      PintarCarrito2(res);
      var total=resp.totalcarrito;
      resolve(total);
      localStorage.setItem('sumatotalapagar',total);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });

});
}


function PintarCarrito2(respuesta) {

  var html="";
  if (respuesta.length>0) {

    $("#cantidadagregados").text(respuesta.length);
    for (var i = 0; i < respuesta.length; i++) {

       var estilo="";
      if (respuesta[i].foto!='' && respuesta[i].foto!=null ) {
          imagen=urlimagenes+'paquetes/imagenespaquete/'+codigoserv+respuesta[i].foto;
  
        }else{
            estilo="opacity:0.2";
          imagen=localStorage.getItem('logo');
        }


      html+=`
      <li class="item-content">
              <div class="item-media">
              <img src="`+imagen+`" alt="" style="    width: 100px;
    border-radius: 10px;`+estilo+`"></div>
              <div class="item-inner">
                <div class="row">
                  <div class="col-60">
                    <p style="margin:0;">`+respuesta[i].cantidad+` `+respuesta[i].nombrepaquete+`</p>
                    <p style="margin:0;">`+respuesta[i].titulo+`</p>
                    `;
                   /* if (respuesta[i].servicio==0) {
                   html+=` <p style="margin:0;">Cantidad: `+respuesta[i].cantidad+`
                       
                      
                    </p>`; 
                  }*/

          if (respuesta[i].usuarioespecialista!=null && respuesta[i].usuarioespecialista!='') {
                   html+=` <p style="margin:0;">`+respuesta[i].usuarioespecialista+`
                    </p>`; 
                   html+=` <p style="margin:0;">`+respuesta[i].fechaformato+`
                    </p>`; 

                  }

                  html+=`</div> 

                  <div class="col-40">
                     <p>$`+respuesta[i].costototal+`</p>
                     <p>
                     </p>
                  </div>
                 </div>`;

               

                html+=` </div>

              </div>
            </li>

      `;

    
    }
  }


  $(".listadocarrito2").html(html);
 // Destruir();
 
}

function CalcularTotales() {

  var comisionmonto=0;
  var comisionporcentaje=0;
  var impuesto=0;
  var comision=0;
  var comisionpornota=0;
  var tipocomisionpornota=localStorage.getItem('tipocomisionpornota');
   $(".divtipopago").css('display','block');
  var descuentocupon=0;
  var totaldescuentos=0;
	var sumatotal=0;
  var monedero=0;
  var montocupon=0;
	//for (var i = 0; i <obtenerpagos.length; i++) {
		promesa=ObtenerTotalCarrito();
	//}

  promesa.then(r => {

    sumatotal=r;

 
	monedero=localStorage.getItem('monedero');
  montocupon=localStorage.getItem('montocupon');

	var descuentocupon=localStorage.getItem('descuentocupon');
	
  var totaldescuentos=0;
 /* for (var i = 0; i <descuentosaplicados.length; i++) {

    totaldescuentos=parseFloat(totaldescuentos)+parseFloat(descuentosaplicados[i].montoadescontar);

  }*/

 /* for (var i = 0; i <descuentosmembresia.length; i++) {

    totaldescuentos=parseFloat(totaldescuentos)+parseFloat(descuentosmembresia[i].montoadescontar);

  }*/
  var resta=parseFloat(sumatotal)-parseFloat(monedero)-parseFloat(montocupon)-parseFloat(descuentocupon)-parseFloat(totaldescuentos);
  var sumaconcomision=resta;


  if (localStorage.getItem('monedero')!=0) {

    $(".divsubtotal").css('display','block');
    $(".divmonedero").css('display','block');

    $(".lblsubtotal").text(formato_numero(sumatotal,2,'.',','));
    $(".lblmonedero").text(formato_numero(monedero,2,'.',','));


  }

   if (localStorage.getItem('montocupon')!=0) {

    $(".divcupon").css('display','block');
    $(".lblcupon").text(formato_numero(montocupon,2,'.',','));

    montocupon=localStorage.getItem('montocupon');

  }

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

        if (localStorage.getItem('comisionpornota')!=0){

          comisionpornota=localStorage.getItem('comisionpornota');
        }

              localStorage.setItem('comisionnota',0);

         if (comisionpornota>0 && comisionpornota!='') {

              if (tipocomisionpornota==1) {//monto
                comimonto1=comisionpornota;
                comision=parseFloat(comision)+parseFloat(comisionpornota);
              
              }

              if (tipocomisionpornota==2) {
              
                comimonto1=parseFloat(comisionpornota)/100;
                comimonto1=parseFloat(comimonto1)*parseFloat(sumaconcomision);
            
                comision=parseFloat(comision)+parseFloat(comimonto1);
              }

              localStorage.setItem('comisionnota',comimonto1);

                
            }


      if (comision!=0 || comisionmonto!=0 || comisionpornota!=0 ) {
        console.log('comision'+comision+'-'+comisionmonto+'-'+comisionpornota);
        $(".divcomision").css('display','block');
        $(".lblcomision").text(formato_numero(comision,2,'.',','));
        localStorage.setItem('comisiontotal',comision);

        sumaconcomision=parseFloat(sumaconcomision)+parseFloat(comision);
      }

    localStorage.setItem('subtotalsincomision',resta.toFixed(2));
	  localStorage.setItem('sumatotalapagar',sumaconcomision.toFixed(2));
   

	  $(".lblresumen").text(formato_numero(resta,2,'.',','));
    $(".lbltotal").text(formato_numero(sumaconcomision,2,'.',','));
    var suma=localStorage.getItem('sumatotalapagar');
    
    
   
    if (suma==0 ) {
    
        $(".btnpagar").attr('disabled',false);
        $(".btnpagar").css('display','block');

        $(".divtipopago").css('display','none');
        $(".preguntafactura").css('display','none');

    }


    $(".opccard").each(function(){
              if($(this).is(':checked')){

                  $(".btnpagar").attr('disabled',false);
                  $(".btnpagar").css('display','block');
              }
          });

          if(localStorage.getItem("rutacomprobante")!='' && localStorage.getItem("rutacomprobante")!=undefined){
             $(".btnpagar").attr('disabled',false);
             $(".btnpagar").css('display','block');
          }


  });


}


function AbrirModalmonedero() {
	
	
       var html=`
         
              <div class="block">
               <div class="row" style="">
                	<p style="font-size:26px;padding:1px;"  >$<span id="monedero">0.00</span></p>

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Cantidad a utilizar:</label>
                	<input type="number" name="txtcantidad" id="txtcantidad" onkeyup="ValidarNumero()";  />
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

function ValidarNumero() {
  var numero= $("#txtcantidad").replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1$2');

    $("#txtcantidad").val(numero);
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
    var pagina = "ObtenerMonedero.php";
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
    $(".monederotxt").text(respuesta);

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
      CalcularTotales();
      var sumatotalapagar1=localStorage.getItem('sumatotalapagar');
    
      $("#montocliente").val(parseFloat(round(sumatotalapagar1)));
      $("#montovisual").val('$'+formato_numero(round(sumatotalapagar1),2,'.',','));
     

       localStorage.setItem('montocliente',sumatotalapagar1);

      $("#campomonto").css('display','block');
       localStorage.setItem('datostarjeta2','');
       localStorage.setItem('datostarjeta','');

        $(".botoneditar").attr('onclick','EditarMontoCliente()');
        $("#btnpagarresumen").attr('disabled',false);

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
      localStorage.setItem('campomonto',0);

  }

  //Recalcular4();


}
/*function CargarOpcionesTipopago(idtipopago) {

  if($(".opccard")){
      $(".opccard").each(function(){
          $(this).attr('checked',false);

      });
  }
  

	var idtipopago=$("#tipopago").val();
	var datos="idtipopago="+idtipopago;
	var pagina="Cargartipopago.php";
    $(".divtransferencia").css('display','none');
    $("#divagregartarjeta").css('display','none');
    $("#divlistadotarjetas").css('display','none');
    $$("#btnpagarresumen").prop('disabled',true);
    $("#aparecerimagen").css('display','none');
    $("#campomonto").css('display','none');
      localStorage.setItem('comisionmonto',0);
      localStorage.setItem('comisionporcentaje',0);
      localStorage.setItem('impuesto',0);
      localStorage.setItem('comision',0);
      localStorage.setItem('comisiontotal',0);
      localStorage.setItem('impuestotal',0);
      localStorage.setItem('comisionpornota',0);
      localStorage.setItem('tipocomisionpornota',0);
      localStorage.setItem('cambio',0);
      localStorage.setItem('idtipodepago',0);
  if (idtipopago>0) {
  
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(respuesta){
      var resultado=respuesta.respuesta;

      localStorage.setItem('comisionpornota',resultado.comisionpornota);
      localStorage.setItem('tipocomisionpornota',resultado.tipocomisionpornota);
     
     	HabilitarOpcionespago(resultado.idtipodepago,resultado.habilitarfoto,resultado.constripe,resultado.habilitarcampomonto,resultado.habilitarcampomontofactura);
    if (resultado.habilitarfoto==1) {
     		$(".divtransferencia").css('display','block');
     		var html="";
     	 var datosdecuenta=resultado.cuenta.split('|');

              var html1="";
              for (var j = 0; j <datosdecuenta.length; j++) {
                    html1+='<p style="text-align:center;">'+datosdecuenta[j]+'</p>';
              }


              html+=` <div class="cuentas" id="cuenta_`+resultado.idtipodepago+`" style="" >
              <label class="">
                <div class="row">
                 
                  <div class="" style="text-align: justify;-webkit-line-clamp: 200;" >
                    <div style="     margin-right: 1em;
    margin-left: 1em;   padding-left: 1em;padding-right: 1em;padding-top: .2em;padding-bottom: .2em;background: #dfdfdf;border-radius: 10px;font-size:16px;">
                 <p style="text-align:center;">Deposita a la Cuenta</p> `+
                  html1
                  +`
                  <p style="text-align:center;">y sube una captura de tu pago.</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>`;

            html+=`
            	<div id="habilitarfoto" style="display: block;">
      <div class="subdivisiones" style="margin-top: 1.5em" ><span style="margin-top: .5em;margin-left: 1em;">Comprobante</span></div>

           <div class="" style="    margin-right: 1em;
    margin-left: 1em;">
                  <div class="">
                      <button  onclick="AbrirModalFotoComprobante()" class="button button button-fill color-theme button-large button-raised  estiloboton" style="margin-top: 1em;background:#4cd964;"> Sube tu comprobante</button>
                             <div class="check-list" style="    display: none;
                                          margin-right: 10em;
                                           top: -.2em;
                                          position: absolute;
                                             right: -6em;"><span>
                                             </span>
                                             </div>
               

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
  }else{
   //ObtenerDescuentosRelacionados();
    CalcularTotales();
  }
}*/

function CargarOpcionesTipopago(idtipopago) {

  if($(".opccard")){
      $(".opccard").each(function(){
          $(this).attr('checked',false);

      });
  }

   $(".btnpagar").attr('disabled',true);
   $(".btnpagar").css('display','none');

  $(".cardtipopago").removeClass('seleccionadotipo');
  $("#cardtipopago_"+idtipopago).addClass('seleccionadotipo');

  //var idtipopago=$("#tipopago").val();
  var datos="idtipopago="+idtipopago;
  var pagina="Cargartipopago.php";
    $(".divtransferencia").css('display','none');
    $("#divagregartarjeta").css('display','none');
    $("#divlistadotarjetas").css('display','none');
    $("#aparecerimagen").css('display','none');
    $("#campomonto").css('display','none');
      localStorage.setItem('comisionmonto',0);
      localStorage.setItem('comisionporcentaje',0);
      localStorage.setItem('impuesto',0);
      localStorage.setItem('comision',0);
      localStorage.setItem('comisiontotal',0);
      localStorage.setItem('impuestotal',0);
      localStorage.setItem('comisionpornota',0);
      localStorage.setItem('tipocomisionpornota',0);
      localStorage.setItem('cambio',0);
      localStorage.setItem('idtipodepago',0);
   //CrearModalEsperaDialogDos();
   var preloader = document.querySelector('.preloader');

    preloader.style.display = 'block';

  if (idtipopago>0) {
  
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
       beforeSend: function() {
        // Mostrar el spinner
        

    },
      success: function(respuesta){
      var resultado=respuesta.respuesta;

      localStorage.setItem('comisionpornota',resultado.comisionpornota);
      localStorage.setItem('tipocomisionpornota',resultado.tipocomisionpornota);
     $(".btnnuevatarjeta").css('display','none');

      HabilitarOpcionespago(resultado.idtipodepago,resultado.habilitarfoto,resultado.constripe,resultado.habilitarcampomonto,resultado.habilitarcampomontofactura);
    if (resultado.habilitarfoto==1) {
        $(".divtransferencia").css('display','block');
        var html="";
       var datosdecuenta=resultado.cuenta.split('|');

              var html1="";
              for (var j = 0; j <datosdecuenta.length; j++) {
                    html1+='<p style="text-align:center;">'+datosdecuenta[j]+'</p>';
              }


              html+=` <div class="cuentas" id="cuenta_`+resultado.idtipodepago+`" style="" >
              <label class="">
                <div class="col-100">
                 
                  <div class="" style="   text-align: justify;
    -webkit-line-clamp: 200;
    display: inline-block;
    width: 100%;height: 4em;" >
                    <div style="padding-left: 1em;padding-right: 1em;padding-top: .2em;padding-bottom: .2em;background: #dfdfdf;border-radius: 10px;font-size:16px;" class="cambiarfuente">
                  `+
                  html1
                  +`
                    </div>
                  </div>
                </div>
              </label>
            </div>`;

            html+=`
              <div id="habilitarfoto" style="display: block;">
      <div class="subdivisiones" style="margin-top: 1.5em" ><span style="margin-top: .5em;margin-left: .5em;"></span></div>

           <div class=""  >
                  <div class="row">
                      <button  onclick="AbrirModalFotoComprobante()" class="button button-fill button-large button-raised botonesaccion botonesredondeado estiloboton cambiarfuente" style="margin-top: 1em;background:#c7aa6a;"> Sube tu comprobante</button>
                             <div class="check-list" style="    display: none;
                                          margin-right: 10em;
                                           top: -.2em;
                                          position: absolute;
                                             right: -6em;"><span>
                                             </span>
                                             </div>
               

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
          $(".btnnuevatarjeta").css('display','block');
          $(".btnnuevatarjeta").attr('onclick','NuevaTarjetaStripe()');

            HabilitarBotonPagar();
           
        }

         /* if (resultado.conmercadopagotarjeta==1) {

          
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
          ObtenerTarjetasMercadopago();
          $(".btnnuevatarjeta").css('display','block');

          $(".btnnuevatarjeta").attr('onclick','NuevaTarjetaMercadopago()');

            HabilitarBotonPagar();

         }*/
         CalcularTotales();

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      },
        complete: function() {
            setTimeout(function() {
            // Ocultar el preloader
            preloader.style.display = 'none';
          }, 2000); 
        // Ocultar el spinner
        //app.dialog.close();
        }

    });
  }else{
   ObtenerDescuentosRelacionados();
    CalcularTotales();
  }
}

function ObtenerTarjetasStripe2(setlastcard=false) {
    var idtipodepago=localStorage.getItem('idtipodepago');
    var fname = "getCardList";
    var pagina = "ObtenerDatosStripe.php";
    var idcliente = localStorage.getItem('id_user');
    var datos = "idcliente=" + idcliente + "&fname="+fname+"&idtipodepago="+idtipodepago;
    $("#btnatras").css('display','none');

    HideDiv("divagregartarjeta");
    ShowDiv("divlistadotarjetas");

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp + pagina,
        data: datos,
        async: false,
        success: function (datos) {
            PintarTarjetas(datos,setlastcard);
            HabilitarBotonPagar();
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}

function Atras() {
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('visibility','visible');
  $("#divlistadotarjetas").css('display','block');
  $("#btnpagarresumen").css('display','block');
ObtenerTarjetasStripe();
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
     // app.dialog.preloader('Cargando...');

    $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
      beforeSend: function() {
        // setting a timeout
       app.dialog.preloader('Cargando...');
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

  var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos: [
    foto,
    ],
    type: 'popup',
    theme: 'dark',
  });

  $(".link .popup-close .icon-only > i").remove('icon icon-back ');


  myPhotoBrowserPopupDark.open();
  $(".popup-close").html('<span>Cerrar</span>');
}

function ValidacionCargosTutorados() {

  var iduser=localStorage.getItem('id_user');
  var pagina = "ValidacionCargosTutor2.php";
  var datos= 'pagos='+localStorage.getItem('pagos')+"&id_user="+iduser;
  pagina = urlphp+pagina;

   return new Promise(function(resolve, reject) {

     $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
      success: function(resp) {
        
        resolve(resp);

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

   });

}

function ValidacionCitas() {
    var iduser=localStorage.getItem('id_user');
    var pagina = "ValidacionCitas.php";
    var datos= "id_user="+iduser;
    pagina = urlphp+pagina;

   return new Promise(function(resolve, reject) {

     $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
      success: function(resp) {
        
        resolve(resp);

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

   });
}

function RealizarCargo() {
 //app.dialog.confirm('','¿Está seguro  de realizar el pago?' , function () {

  ValidacionCitas().then(r => {
//ValidacionCargosTutorados
 
    if (r.citasapartada==0) {
       var respuesta=0;
     var mensaje='';
     var pedido='';
     var informacion='';
   var pagina = "RealizarPago2.php";
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
   var monedero=localStorage.getItem('monedero');
   var opcion=0;
   var idopcion=0;
   var confoto=localStorage.getItem('llevafoto');
   var bandera=1;
   var campomonto=localStorage.getItem('campomonto'); 
   var montovisual=localStorage.getItem('montocliente');
   var cambiomonto=localStorage.getItem('cambio');
   var comisionpornota=localStorage.getItem('comisionpornota');
   var comisionnota=localStorage.getItem('comisionnota');
   var tipocomisionpornota=localStorage.getItem('tipocomisionpornota');
   var requierefactura=$("#requierefactura").is(':checked')?1:0;
   var idusuariosdatosfiscales=0; 
   var checkConfirm=$("#checkConfirm").is(':checked')?1:0;


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
     var rutacomprobante=localStorage.getItem('rutacomprobante');
     var comentarioimagenes=localStorage.getItem('comentarioimagenes');
      if (confoto==1) {

        if (localStorage.getItem('rutacomprobante')=='') {
          bandera=0;
        }
      }

       if (requierefactura==1) {
        idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
        if (idusuariosdatosfiscales==0 || idusuariosdatosfiscales==undefined) {
          bandera=0;
        }
      
     }
     var codigocupon=localStorage.getItem('codigocupon');
     var montocupon=localStorage.getItem('montocupon');
     var idcupon=localStorage.getItem('idcupon');
     console.log(descuentosaplicados);
   var datos='pagos='+localStorage.getItem('pagos')+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestototal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto+"&descuentosmembresia="+JSON.stringify(descuentosmembresia);
      datos+='&confoto='+confoto+"&rutacomprobante="+rutacomprobante+"&comentarioimagenes="+comentarioimagenes;
      datos+='&campomonto='+campomonto+'&montovisual='+montovisual+'&cambiomonto='+cambiomonto;
      datos+='&comisionpornota='+comisionpornota+"&comisionnota="+comisionnota+"&tipocomisionpornota="+tipocomisionpornota;
      datos+='&datostarjeta2='+datostarjeta2+"&monedero="+monedero;
      datos+='&datostarjeta='+datostarjeta;
      datos+='&requierefactura='+requierefactura+"&checkConfirm="+checkConfirm;
      datos+='&idusuariosdatosfiscales='+idusuariosdatosfiscales;
      datos+='&montocupon='+montocupon+"&idcupon="+idcupon;
      datos+='&descuentosaplicados='+JSON.stringify(descuentosaplicados);
    pagina = urlphp+pagina;
    if (bandera==1) {
          $(".dialog-buttons").css('display','none');
       
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

        localStorage.removeItem('idusuariosdatosfiscales');
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
                                        $(".mensajeerror").text(JSON.stringify(output));
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
                      var mensaje = `<p style="line-height:1;">¡Muchas gracias por tu compra!</p>`;
                          mensaje+= `<p><span style="font-size: 60px;" class="material-icons-outlined">check_circle</span></p>`;

                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','none');
                                        $(".mensajeexito").css('display','block');
                                        $(".mensajeexito").html(mensaje);

                                        $(".butonok").css('display','block');
                                        $(".butoerror").css('display','none');
                      localStorage.setItem('membresiaelegida','');

                    // alerta('',mensaje);

                      //PagoRealizado(mensaje,output.paymentIntent,notapago);

                    }


                      }else{

                       
                      setTimeout(function(){
                         LimpiarVariables2();
                         $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','none');
                          var mensaje =`<p>¡Muchas gracias por tu compra!</p>`;
                          mensaje+= `<p><span style="font-size: 60px;" class="material-icons-outlined">check_circle</span></p>`;
                          $(".mensajeexito").css('display','block');

                          $(".mensajeexito").html(mensaje);
                          $(".butonok").css('display','block');
                          $(".butoerror").css('display','none');

                      }, 3000);
                         

                      }
       


               }else{

                          var output=JSON.stringify(informacion.output);
                          var mensaje = "Oops, algo no está bien, intenta de nuevo";

                          $(".mensajeerror").text(mensaje);//quitar
                          $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','block');
                          $(".mensajeexito").css('display','none');
                          $(".butonok").css('display','none');
                          $(".butoerror").css('display','block');

                      
               }

                
        

          });

          }else{


              if (bandera==0) {

                    if (localStorage.getItem('rutacomprobante')=='') {
                        alerta('','Falta por subir comprobante');
                      }
              }


               if (requierefactura==1) {
                idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
                if (idusuariosdatosfiscales==0 || idusuariosdatosfiscales==undefined) {
                      alerta('','Falta por seleccionar dato fiscal');

                }
              
             }

          }
        
         }else{
           dynamicSheet1.close();

            var aviso="La fecha y hora de la cita ya no se encuentra disponible en la sucursal";
                AbrirModalAviso(aviso);
                //alerta('','La fecha y hora de la cita ya no se encuentra disponible en la sucursal');

              }
        //})

  
      },function () {

          
           

    });
        
  
          //});

        
}

function ConfirmacionPago() {
     // CrearModalEspera();

   const myPromise = new Promise((resolve, reject) => {
        CrearModalEspera2(() => {
              RealizarCargo();
                resolve("Modal cerrado después de realizar el cargo");
            });

        });
        

       myPromise.then((successMessage) => {
          console.log(successMessage); // Esto se ejecutará después de cerrar el modal y realizar el cargo
      });
}

function CrearModalEspera2(callback) {
  
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 50%;background: black;">
            
            <div class="sheet-modal-inner" style=" ">
              
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       
                          
                          
                      

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente">
                           
                          <div id="" class="mensajeproceso  `+estiloparrafo+`" style="color:#c7aa6a;" >En proceso...
                            <img src="img/loading.gif" style="width:20%;display: flex;justify-content: center;align-items: center;margin:0px auto;margin-top: 20px;">

                          </div>
                          <p id="" class="mensajeerror `+estiloparrafo+`" style="font-weight:bold;display:none;color:#c7aa6a;text-align:center;" >Oops, algo no está bien, intenta de nuevo.</p>
                          <p id="" class="mensajeexito `+estiloparrafo+`" style="font-weight:bold;display:none;color:#c7aa6a;text-align:center;" >Se realizó correctamente</p>

                        </div>

                        

                          

                          </div>
                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100" style="margin-left: 1em;margin-right: 1em;">
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente butonok" onclick="VerCompras()"  id="btnConfirm">Aceptar</button>
                            </div>

                            <div class="col-100" style="margin-left: 1em;margin-right: 1em;" >
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente butoerror" onclick="CerrarEspera2()"  id="btnCancel" >Aceptar</button>
                            </div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: false,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

           $(".cambiarfuente2").css('display','none');
            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
           
            }
          $(".cambiarfuente2").css('display','block');
 

          },
          opened: function (sheet) {
                 console.log('Sheet opened');

          },
        }
      });



       dynamicSheet1.open();


        setTimeout(() => {
        // Ejecuta RealizarCargo() dentro del timeout
        callback();
    }, 1000); // Cambiado a 5000 milisegundos (5 segundos)
}

function CerrarEspera2(argument) {
  dynamicSheet1.close();
}

function AbrirConfirmacion() {

  /*var html= `
      <div class="">
        <div class="block">
          <p style="text-align:center;">¿Estás seguro de continuar?</p>
          <label class="item-checkbox item-content">
            <input type="checkbox" id="checkConfirm" onchange="ValidarCheckConfirm()" />
            <i class="icon-checkbox" style="float: left;margin-right: 4px;"></i> 
         
             <div class="item-inner" style="margin-left: 40px;">
                <div class="item-title">Acepto los <a onclick="VerTerminos()">términos y condiciones</a></div>
              </div>

          </label>
          <p class="color-red" id="errorMessage" style="display: none;color:red;">Por favor, acepta los términos y condiciones.</p>
        </div>
        <div class="block">
          <p class="row">
            <a href="#" class="col-100 button" id="btnCancel">Cancelar</a>

            <a href="#" class="col-100 button button-fill" id="btnConfirm" style="display:none;">Aceptar</a>
          </p>
        </div>
      </div>
    `;
      var confirmModal = app.dialog.create({
      content:html,
              buttons: [
            
              ],

              onClick: function (dialog, index) {

                  if(index === 0){
                   
                  }
                 
                
              },
              verticalButtons: true,
            }).open();
 */
//aqui 


 var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
            
            <div class="sheet-modal-inner" style=" ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       
                          
                          
                      

                          html+=`
                          <div class="row" style="margin-left: 1em; margin-right: 1em; margin-top: 60px;">
                          <div class="col-100">
                          <p style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente cambiarfuente2">¿Estás seguro de continuar?</p>
                          </div>
                            <div class="col-100">
                               <div class="block">
                      <label class="">
                                  <input type="checkbox" id="checkConfirm" onchange="ValidarCheckConfirm()" style=" height: 40px;width: 20px;float: left;">
                                   
                                   <div class="" style="margin-left: 40px;">
                                      <div class="cambiarfuente" style="font-size: 20px;color:white;">Acepto los <a onclick="VerTerminos()" class="">términos y condiciones</a></div>
                                    </div>

                                </label>
                                <p class="color-red" id="errorMessage" style="display: none;color:red;">Por favor, acepta los términos y condiciones.</p>
                              </div>

                            </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente"   id="btnConfirm">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" id="btnCancel" >No</button>
                            </div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           idcortesiaelegida=0;

           $(".cambiarfuente2").css('display','none');
            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
           
            }
          $(".cambiarfuente2").css('display','block');
 

          },
          opened: function (sheet) {
                 console.log('Sheet opened');

          },
        }
      });

       dynamicSheet1.open();

    // Agregar evento al botón de "Aceptar"
  $$('#btnConfirm').on('click', function () {
    // Verificar si el checkbox está marcado
    if ($$('#checkConfirm').prop('checked')) {
      // Aquí puedes realizar la acción que desees al confirmar con el checkbox aceptado
      dynamicSheet1.close();

      CrearModalEspera();
      RealizarCargo();
      // Cierra el modal
      
    } else {
      // Mostrar un mensaje de error si el checkbox no está marcado
      $$('#errorMessage').show();
    }
  });

  // Agregar evento al botón de "Cancelar"
  $$('#btnCancel').on('click', function () {
    // Aquí puedes realizar alguna acción si el usuario cancela la confirmación
    console.log('Confirmación cancelada');
    // Cierra el modal
    dynamicSheet1.close();
  });







}

function ValidarCheckConfirm() {
  if ($$('#checkConfirm').is(':checked')) {
    $("#btnConfirm").css('display','block');

    }else{

      $("#btnConfirm").css('display','none');

    }
}
function VerTerminos() {
    var html=
    `<div class="sheet-modal" style="height: 400px;
    z-index: 99999;">
          <div class="toolbar">
        <div class="toolbar-inner">
          <div class="left"></div>
          <div class="right">
            <a class="link sheet-close">Cerrar</a>
          </div>
        </div>
      </div>
      <div class="sheet-modal-inner">
          <div class="page-content">
              <div class="block">
              <div style="text-align:justify;" id="divterminos"></div>
              </div>
            </div>
          </div>
    </div>`;

    var sheet = app.sheet.create({
    content: html,
    on: {
      opened: function () {
        ObtenerTerminos();
      }
    }
  });

    sheet.open();
}

function ObtenerTerminos() {
   var pagina = "Obtenerdatosconfi.php";
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
    success: function(res){
      var respuesta=res.respuesta;
    // console.log(respuesta.terminoscondiciones);
     $("#divterminos").html(respuesta.terminoscondiciones);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });
}

function ObtenerDescuentosRelacionados() {
   var iduser=localStorage.getItem('id_user');
 descuentosaplicados=[];
 $$("#uldescuentos").html('');
 $$(".desc").remove();
  var datos= 'pagos='+localStorage.getItem('pagos')+"&id_user="+iduser;
  var pagina = "ObtenerDescuentosRelacionados.php";

var promesa= new Promise(function(resolve, reject) {

   $.ajax({
      url: urlphp+pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
    success: function(res) {
    
      var resultado=res.descuentos;
      descuentosaplicados=[];
      localStorage.setItem('idtipodepago',100);
      PintarDescuentos(resultado);
       
      resolve(resultado);
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
 }).then(function(value) { 
 console.log('1'); 
   ObtenerDescuentoMembresia();

 });




}

function PintarDescuentos(respuesta) {
   var html="";
  $("#visualizardescuentos").css('display','none');

 if (respuesta.length>0) {
    descuentosaplicados=respuesta;
    $("#visualizardescuentos").css('display','block');

  for (var i = 0; i <respuesta.length; i++) {
    html+=`
     <li class="list-item desc">
                    <div class="row">
                        <div class="col-80" style="padding: 0;">
                            <p class="text-muted small" style="font-size:18px;" id="">
                            Descuento `+respuesta[i].titulo+`
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
 }

 $("#uldescuentos").append(html);

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
                  <div id="" class="mensajeerror" style="font-size:20px;font-weight:bold;display:none;" >Oops, algo no está bien, intenta de nuevo.</div>
                  <div id="" class="mensajeexito" style="font-size:20px;font-weight:bold;display:none;" >Se realizó correctamente</div>



                <span class="dialog-button dialog-button-bold butonok" onclick="VerCompras()" style="display:none;position:static!important;">OK</span>

                <span class="dialog-button dialog-button-bold butoerror" onclick="CerrarEspera()" style="display:none;position:static!important;">OK</span>


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

function VerCompras() {
 // app.dialog.close();
  dynamicSheet1.close();
  GoToPage('listadocompras');
}
function CerrarEspera() {
  app.dialog.close();
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

function VerListadoPagados() {

  GoToPage('listadopagospagados');
  
}

function ObtenerPagosPagados() {
  
  var pagina = "ObtenerTodosPagosPagados.php";
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
      PintarpagosPagados(pagos);


      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });
}
function PintarpagosPagados(pagos) {
  
  if (pagos.length>0) {
    var html="";
   
     var numero=pagos.length;

  

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

      var colorborde='#c7aa6a';

           if (numero % i === 0) {
           
           colorborde='#9c9c9c';
           }

      html+=`
        <li class="col-100" id="pago_`+pagos[i].idnotapago+`" style=" border: 1px solid `+colorborde+`;
    border-radius: 10px; margin-right: 1em; margin-left: 1em;margin-bottom: 1em;padding: 1em;">
                    <div class="row">
                        <div class="col-70">
                            <p class="text-muted "  id="concepto_`+pagos[i].idnotapago+`">
                               Compra #`+pagos[i].concepto+`
                            </p>

                          <p class="text-muted small">Pagado `+pagos[i].fechaformatopago+`</p>
                          <p class="text-muted small">$`+formato_numero(pagos[i].monto,2,'.',',')+`</p>
                        <a id="btncalendario" style=" color: #007aff!important;text-align: center;justify-content: center;" onclick="Detallepago(`+pagos[i].idnotapago+`)">Ver detalle</a>


                        </div>
                        <div class="col-30">

                          <p class="text-muted small `+claseestatus+`">`+pagos[i].textoestatus+`</p>

                        </div>
                    </div>
                 </li>

      `;
    }

    $(".listadopagos").html(html);
  }
}

function ObtenerDescuentoMembresia() {
  var pagina = "ObtenerMembresiaUsuario.php";
  var id_user=localStorage.getItem('id_user');
  var datos= 'pagos='+localStorage.getItem('pagos')+"&id_user="+id_user+"&descuentosaplicados="+JSON.stringify(descuentosaplicados);
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    success: function(respuesta){

      var descuentomembresia=respuesta.descuentomembresia;
        descuentosmembresia=[];

      if (descuentomembresia.length>0) {
        PintarDescuentosMembresia(descuentomembresia);
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

function PintarDescuentosMembresia(respuesta) {
 
  var html="";

 if (respuesta.length>0) {
    descuentosmembresia=respuesta;
    $("#visualizardescuentos").css('display','block');

  for (var i = 0; i <respuesta.length; i++) {
    html+=`
     <li class="list-item desc">
                    <div class="row">
                        <div class="col-80" style="padding: 0;">
                            <p class="text-muted small" style="font-size:18px;" id="">
                            Descuento `+respuesta[i].titulomembresia+`
                            </p>
                             <p class="text-muted " style="font-size:30px;text-align:right;">$<span class="lbldescuento">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></p>

                        </div>
                        <div class="col-20">
                        <span class="chip color-green btncupon" style="display:none;
                                height: 30px;
                                
                                margin-right: 1em;
                                margin-left: 1em;top: 3em;" onclick="AplicarDescuento(`+respuesta[i].idservicios_membresia+`,`+respuesta[i].idmembresia+`)"><span class="chip-label">Aplicar</span></span>
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

function Detallepago(idnotapago) {
  localStorage.setItem('idnotapago',idnotapago);
  GoToPage('detallepago');
}

 function PintarlistaImagen() {
    var html="";
      localStorage.setItem('comentarioimagenes',arraycomentarios);
      $$(".btnpagar").prop('disabled',true);
      $$(".btnpagar").css('display','none');

     $(".check-list").css('display','none');

      if (localStorage.getItem('rutacomprobante')!=undefined && localStorage.getItem('rutacomprobante')!='') {
     
          var comprobante=localStorage.getItem('rutacomprobante');
          var comprobante1=comprobante.split(',');

     
      if (comprobante1.length) {
        $$(".btnpagar").prop('disabled',false);
        $$(".btnpagar").css('display','block');

         $(".check-list").css('display','block')
        for (var i = 0; i < comprobante1.length; i++) {
        ruta=urlphp+`upload/comprobante/`+comprobante1[i];

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
                      <span class="botoneditar " onclick="ColocarComentarioComprobante(`+i+`);" >
                      <i class="bi-pencil"></i>
                      </span>
                    </div>
                    <div class="col">
                       <span class="botoneliminar" style="margin-rigth:1em;" onclick="EliminarimagenComprobante(\'`+comprobante1[i]+`\')" >
                      <i class="bi-trash-fill"></i>
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

                    
          /*           
            html+=`<li>
            <label class="label-radio item-content">
              <div class="item-inner">
            
                <div class="item-text"  style="margin-left: 1em;color:#757575;font-size: 14px;" id="">
                <label>

                    <img onclick="VisualizarImagen(\'`+ruta+`\')"  class="bordesredondeados" src="`+ruta+`" width="80">
                    </label>
                  </div>

                  <div class="item-subtitle"></div>
                       <div class="item-title letrablack" >
                           <div class="item-text" >
                           
                            </div>


                       </div>

                  
                </div>

                <div class="">

                       <span class="botoneditar " onclick="ColocarComentarioComprobante(`+i+`);" >
                      <i class="bi-pencil"></i>
                      </span>
               
                   <span class="botoneliminar" style="margin-rigth:1em;" onclick="EliminarimagenComprobante(\'`+comprobante1[i]+`\')" >
                    
                  <i class="bi-trash-fill"></i>

                  </span>
                </div>

               </label> 
          </li>
          <li>


            <label  class="item-content">

            <div class="item-row"> 
            `;


          
                      html+=`<span style="font-weight:bold;vertical-align:text-top;margin-right: 4px;`+visible+`" id="comentariocomprobante_`+i+`">

                       Comentario:
                           </span>
                           <span style="color:#757575;" id="textocomprobante_`+i+`">`+arraycomentarios[i]+`</span>
         
                  </div>
          </label>
          </li>


          `;*/
            }
      }else{

       /* html+=`<li class="" onclick="">
            <a href="#" class="item-link item-content"> <div class="item-media"></div>
              <div class="item-inner">
                <div class="item-title-row">
                
                </div>
                <div class="item-subtitle"></div>
                 <div class="item-title letrablack"></div>
                  <div class="item-after"></div>
                <div class="item-text">
                   No se encontraron imagenes
                </div>
              </div>
            </a></li>`;*/



      }

    }else{


       html+=``;

    }

    $("#lista-imagenescomprobante").html(html);
  }

 
var imagenes=[];
 function EliminarimagenComprobante(imagen) {
   
    app.dialog.confirm('','¿Está seguro  de eliminar la imagen?' , function () {

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

     });

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

function PintarDatofiscalElegido() {
  
  if (localStorage.getItem('idusuariosdatosfiscales')!=null && localStorage.getItem('idusuariosdatosfiscales')>0 ) {
      var pagina = "Obtenerdatofiscal.php";
      var id_user=localStorage.getItem('id_user');
      var idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
      var datos="idusuariosdatosfiscales="+idusuariosdatosfiscales+"&id_user="+id_user;
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(resp){
        var respuesta=resp.respuesta;
        var razonsocial=respuesta.razonsocial;
        var rfc=respuesta.rfc;
        var email=respuesta.correo;
        var codigopostal=respuesta.codigopostal;
        var pais=respuesta.pais;
        var estado=respuesta.estado;
        var municipio=respuesta.municipio;
        var colonia=respuesta.colonia;
        var calle=respuesta.direccion;
        var noexterior=respuesta.noexterior;
        var nointerior=respuesta.nointerior;
        var formapago=respuesta.formapago;
        var metodopago=respuesta.metodopago;
        var usocfdi=respuesta.usocfdi;
        var idusuariosdatosfiscales=respuesta.idusuariosdatosfiscales;
        var imagen=resp.imagenes[0];


        urlimagen=urlphp+`upload/datosfactura/`+imagen.ruta;
   

    var  html=`<li style="border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;" class="listadatosfactura"  id="listadatosfactura_" >
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
                        <div class="col-20" style="margin:0;padding:0;">
                          <figure class="avatar   rounded-10">
                          <img src="`+urlimagen+`" alt="" style="width:60px;height:60px;">
                          </figure>
                        </div>
                        
                          <div class="col-50" style="margin:0;padding:0;">
                            <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;" id="participante_">`+respuesta.razonsocial+`
                            </div>
                         
                            <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;" id="correo_">`+respuesta.rfc+`
                            </div>
                        
                            <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;">`+respuesta.correo+`</div>
                            
                            <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;">`+respuesta.codigopostal+`</div>
 
                            </div>
                            <div class="col-10" style="margin:0;padding:0;">
                             
                            </div>
                            <div class="col-10" style="margin:0;padding:0;">

                             
                            </div>

                            <div class="col-10 factura_" style="padding:0;" >

                            </div>

                            </div>
                 
                         </div>
                        </div>
                    </label>
                 </li>
                `;

                $(".lidatosfacturaelegido").html(html);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
  
  }else{

    $(".listadatosfactura").remove();

  }
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



function LimpiarVariables2(argument) {
 
                 
                  localStorage.setItem('metodopago','');
                  localStorage.setItem('formapago','');
                  localStorage.setItem('usocfdi','');
                  localStorage.setItem('rutacomprobante','');
                  localStorage.setItem('comentarioimagenes','');
                  localStorage.setItem('conmensaje','');
                  localStorage.setItem('factura',0);
                  localStorage.setItem('validacioncupon',0);
                  localStorage.setItem('cambio',0);
                  localStorage.setItem('nuevototal',0);
                  localStorage.setItem('idcupon',0);
                  localStorage.setItem('codigocupon','');
                  localStorage.setItem('montodescontado',0);
                  localStorage.setItem('idsucursalproveedorcodigo','');
                  localStorage.setItem('montocliente','');
                  localStorage.setItem('metodopago','');
                  localStorage.setItem('formapago','');
                  localStorage.setItem('usocfdi','');
                  localStorage.setItem('observacionpedido','');

                  localStorage.setItem('montoafacturar',0);
                  localStorage.setItem('ivapaquetes',0);
                  localStorage.setItem('comisionporcentaje',0);
                  localStorage.setItem('comisionmonto',0);
                  localStorage.setItem('montoafacturar',0);
                  localStorage.setItem('datostarjeta','');
                  localStorage.setItem('datostarjeta2','');
                  localStorage.setItem('ivapaquetes2',0);
                  localStorage.setItem('ivapaquetes',0);
                  localStorage.setItem('enviovariable','');
                  localStorage.setItem('costoenvio',0);
                 // localStorage.setItem('sumatotalapagar','');
                  localStorage.setItem('comisionpornota',0);
                  localStorage.setItem('comisionnota',0);
                  localStorage.setItem('tipocomisionpornota',0);

                  resultimagencomprobante=[];
                  arraycomentarios=[];


}


function PagoNorealizado(mensaje,idpayment,idnota) {


  var datos="idnota="+idnota+"&idpayment="+idpayment;

        var pagina = "Cambiodeestatusnorealizado.php";
        pagina = urlphp+pagina;

          $.ajax({
            url: pagina,
            type: 'post',
            dataType: 'json',
            data:datos,
            async:false,

             beforeSend: function(){
                 

                 },
          success: function(data) {
            modaldialogo.close();

            alerta('',mensaje);

            GoToPage("listadopagos");


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


function EditarMontoCliente() {

  var sumatotalapagar1=localStorage.getItem('sumatotalapagar');
  app.dialog.create({
        title: '',
        text:'Captura el monto ',
        content: '<div class="dialog-input-field item-input"><div class=""><input type="number" id="txtmontocliente2" style="height: 4em;width: 100%;text-align:center;" placeholder="$0.00" value="'+round(sumatotalapagar1)+'"></div></div>',

            buttons: [
              {
              text: 'Cerrar',
              },
              {
              text: 'Guardar',
                },
                
            ],

              onClick: function (dialog, index) {

                  if(index === 0){

                    CancelarMonto();
                      //Button 1 clicked

                      //alert(enlace);
                    // window.open(enlace);
                  }
                  else if(index === 1){
                      //Button 2 clicked
                   GuardarMonto2();
                  }
                
              },
              verticalButtons: false,
            }).open();
      
}


function GuardarMonto2() {
  var valor=$("#txtmontocliente2").val();

  localStorage.setItem('montocliente',valor);

  $("#montocliente").val(round(valor));

  var sumatotalapagar=parseFloat(localStorage.getItem('sumatotalapagar'));
  var montovisual=parseFloat(valor);
  if (montovisual>=sumatotalapagar) {
    $("#montovisual").val('$'+formato_numero(round(valor),2,'.',','));
    $("#btnpagarresumen").attr('disabled',false);
    var resta=montovisual-sumatotalapagar;

    localStorage.setItem('cambio',resta);
  }else{

    alerta('','Monto menor al total');
  }
//editar
}

function CancelarMonto() {
   app.dialog.close();
}


function RequiereFactura() {

  $("#listadotarjetas").html('');
 
  if ($("#requierefactura").is(':checked')) {

    AbrirModalDatos();
    CargartipopagoFactura(0);

  }else{

    Cargartipopago(0);
    $(".lidatosfacturaelegido").html('');
    if(localStorage.getItem('idusuariosdatosfiscales')!=undefined) {
      localStorage.removeItem('idusuariosdatosfiscales');
    }
  }

    $(".lidatosfactura").html('');
    CargarOpcionesTipopago();
    HabilitarOpcionespago(0,0,0,0,0);
    CalcularTotales();
}

function AbrirModalDatos() {
  var html="";

  html+=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
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

                        `;
        

                    html+=`
                    <div class="formulario" style="display:none">
                    <h3 style="text-align:center;font-size:22px;margin-bottom:1em;">Datos de facturación</h3>
                        <div class="row">
                        <form class="was-validated needs-validation">
                            <div class="list form-list no-margin margin-bottom">
                              <ul>
                                <input type="hidden" id="v_idfactura" value="0"/>
                                <li class="item-content item-input lirazonsocial is-valid">
                                <div class="item-inner">
                                <div class="item-title item-floating-label" id="flotante">Razon social</div>
                                <div class="item-input-wrap">
                                     <input type="text"   id="v_razonsocial">
                                     <span class="input-clear-button">
                                     </span>
                                  </div>
                                </div>
                                </li>

                                 <li class="item-content item-input lirfc is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Rfc</div>
                                  <div class="item-input-wrap">
                                  <input type="text"  id="v_rfc">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>


                                 <li class="item-content item-input liemail is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Email</div>
                                  <div class="item-input-wrap">
                                  <input type="text"   id="v_email">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                <li class="item-content item-input licodigopostal is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Código postal</div>
                                  <div class="item-input-wrap">
                                  <input type="text"   id="v_codigopostal" onkeyup="Buscarcodigo()">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                <li class="item-content item-input lipais is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">País</div>
                                  <div class="item-input-wrap">
                                  <select id="v_pais" onchange="ObtenerEstado(0,$(this).val())"></select>
                                       
                                    </div>
                                  </div>
                                </li>

                                 <li class="item-content item-input liestado is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Estado</div>
                                  <div class="item-input-wrap">
                                  <select name="v_estado" id="v_estado" onchange="ObtenerMunicipios(0,$(this).val())"></select>
                                  
                                    </div>
                                  </div>
                                </li>

                                 <li class="item-content item-input limunicipio is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Municipio</div>
                                  <div class="item-input-wrap">
                                  <select name="v_municipio" id="v_municipio"></select>
                                 
                                    </div>
                                  </div>
                                </li>

                                 <li class="item-content item-input licolonia is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Asentamiento</div>
                                  <div class="item-input-wrap">
                                  <input type="text"   id="v_colonia" onclick="FiltrarColonias()">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                 <li class="item-content item-input licalle is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Calle</div>
                                  <div class="item-input-wrap">
                                  <input type="text"   id="v_calle">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                 <li class="item-content item-input linoexterior is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">No. exterior</div>
                                  <div class="item-input-wrap">
                                  <input type="text"   id="v_noexterior">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>
                                 <li class="item-content item-input linointerior is-valid">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">No. interior</div>
                                  <div class="item-input-wrap">
                                  <input type="text"   id="v_nointerior">
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                <li class="item-content item-input liformapago is-valid item-input-with-value">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Forma de pago</div>
                                  <div class="item-input-wrap">
                                  <select name="" id="v_formapago"></select>
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                <li class="item-content item-input limetodopago is-valid item-input-with-value">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Método de pago</div>
                                  <div class="item-input-wrap">
                                        <select name="" id="v_metodopago"></select>
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                <li class="item-content item-input liusocfdi is-valid item-input-with-value">
                                 <div class="item-inner">
                                  <div class="item-title item-floating-label" id="flotante">Uso de cfdi</div>
                                  <div class="item-input-wrap">
                                        <select name="" id="v_usocfdi"></select>
                                       <span class="input-clear-button">
                                       </span>
                                    </div>
                                  </div>
                                </li>

                                
                                
                              </ul>
                            </div>

                        </form>
                        </div>
                        <div class="row">
                          <div class="" id="vimagen" style="display:none;"></div>
                        </div>
                        <div class="row">
                          <a id="btnsubirimagen" onclick="AbrirModalImagenDatosFactura()" style="border-radius: 10px;
                          height: 60px;margin-left:1em;margin-right:1em;" class="button button-fill button-large button-raised margin-bottom color-theme">
                            <div class="fab-text">Subir imagen de constancia (SAT)</div>
                          </a>
                        </div>

                         <div class="row" style="margin-bottom:1em;margin-top:3em;">

                           <a id="btnguardardatosfactura" onclick="GuardarDatosfactura()" style="border-radius: 10px;
                            height: 60px;margin-left:1em;margin-right:1em" class="button button-fill button-large button-raised margin-bottom color-theme">
                              <div class="fab-text">Guardar</div>
                            </a>

                            <a id="btnregresar" onclick="RegresarFormfactura()" style="border-radius: 10px;
                            height: 60px;margin-left:1em;margin-right:1em" class="button button-fill button-large button-raised margin-bottom color-theme">
                              <div class="fab-text">Cancelar</div>
                            </a>
                          </div>

                    </div>
                    <div class="divcolonias" style="display:none;">

                       <form class="searchbar bordesredondeados" style="background: #ffffff!important;margin-left: 1em;margin-right: 1em;">
                        <div class="searchbar-inner">
                          <div class="searchbar-input-wrap">
                            <input type="search" placeholder="Buscar asentamiento" id="buscador4" style="font-size: 16px;background: white;" />
                            <i class="searchbar-icon"></i>
                            <span class="input-clear-button" onclick="Vertodoscolonia()" ></span>
                          </div>
                          <span class="searchbar-disable-button if-not-aurora">Cancel</span>
                        </div>
                      </form>

                      <div class="list media-list" style="margin-top: 1em;">

                        <ul id="listadocolonias" style="font-size: 14px;"></ul>
                         <a id="btnseleccionar" onclick="GuardarColonia()" style="border-radius: 10px;
                            height: 60px;color: white;" class="button button-fill button-large button-raised margin-bottom color-theme">
                              <div class="fab-text">Aceptar</div>
                            </a>
                      </div>
                    </div>


                    <div class="divlistadodatosfiscales" >
                         <div class="list media-list" style="margin-top: 1em;">

                           <ul id="listadodatosfiscales" style="font-size: 14px;"></ul>
                            

                            
                        </div>
                    </div>

                   


                    </div>
                    </div>
                 </div>
              </div>
                    
                  </div>
                </div>
              </div>`;
    dynamicSheet4 = app.sheet.create({
        content: html,
      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
              ObtenerDatosfiscales();
              ObtenerMetodoPago();
              ObtenerFormaPago();
              ObtenerPais(0);
              ObtenerUsoCfdi();
              $(".lipais").addClass('item-input-focused');


          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },

           close:function (sheet) {
             PintarDatofiscalElegido();

         
            
           },

           closed:function (sheet) {
             if (localStorage.getItem('idusuariosdatosfiscales')==undefined) {
                
                 $("#requierefactura").prop('checked', false);
             }

              if ($("#requierefactura").is(':checked')) {

                    CargartipopagoFactura(0);

                  }else{
                  
                    Cargartipopago(0);
                    $(".lidatosfacturaelegido").html('');
                    if(localStorage.getItem('idusuariosdatosfiscales')!=undefined) {
                      localStorage.removeItem('idusuariosdatosfiscales');
                    }
                  }

          },
        }
      });

       dynamicSheet4.open();

}
function ObtenerDatosfiscales() {
  var pagina="ObtenerDatosfiscales.php";
  var idusuario=localStorage.getItem('id_user');
  var datos="idusuario="+idusuario;

  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(res){
      var respuesta=res.respuesta;

      PintarDatosfiscales(respuesta);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}



function ObtenerColoniasFactura() {

  var pagina="ObtenerColonias2.php";
  var codigopostal=$("#v_codigopostal").val();
  var idpais=$("#v_pais").val();
  var idestado=$("#v_estado").val();
  var idmunicipio=$("#v_municipio").val();
  var tipoasen=0;
  var codigopostal=$("#v_codigopostal").val();

  var datos="idpais="+idpais+"&idestado="+idestado+"&idmunicipio="+idmunicipio+"&tipoasen="+tipoasen+"&v_codigopostal="+codigopostal;
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(datos){
    
      console.log(datos);

      var respuesta=datos.respuesta;

      PintarColoniasFactura(respuesta);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

  }


  function PintarColoniasFactura(datos) {
  
    var html="";

    if (datos.length>0) {
    for (var i = 0; i <datos.length; i++) {
      
          localStorage.setItem('listadocolonias',JSON.stringify(datos));

        html+=`  <li class="coloniasli clasescolonia`+datos[i].idcodigopostal+`">

            <label class="" style="">
                 <input type="checkbox" name="my-radio" class="colonias" onchange="Seleccionar1(\'`+datos[i].asenta+`\',\'`+datos[i].tipo_asenta+`\',`+i+`)"  id="colonia_`+i+`" style="display: block!important;float: left;top: 1em;position: absolute; margin-left: 1em;">
                 <div class="item-content">
              <div class="item-inner">
               
                <div class="item-text" style="margin-left: 1em;padding-top: 0.1em;" onclick="Seleccionar1(\'`+datos[i].asenta+`\',\'`+datos[i].tipo_asenta+`\',`+i+`)">
                <label>`+datos[i].tipo_asenta+` `+datos[i].asenta+`</label>`
                +`
                </div>

              </div>
               <div class="item-after">
                
                </div>
                </div>
            </label>
          </li>`;
    }

  html+=`
    <li class="coloniasli clasescolonia0" style="display:none;">

    <label class="label-radio item-content">
              <div class="item-inner">
               
                <div class="item-text" style="margin-left: 1em;" id="colonia_">
                <label>NO SE ENCONTRARON COINCIDENCIAS
                </div>

              </div>
               <div class="item-after">
                
                </div>
            </label>
            </li>`;

  }else{



    html=`
    <li>

    <label class="label-radio item-content">
              <div class="item-inner">
               
                <div class="item-text" style="margin-left: 1em;" id="colonia_">
                <label>NO SE ENCONTRARON COLONIAS
                </div>

              </div>
               <div class="item-after">
                
                </div>
            </label>
            </li>`;


  }

  
  $("#listadocolonias").html(html);

  }

function GuardarColonia() {
   $(".formulario").css('display','block');
   $(".divcolonias").css('display','none');


     if(localStorage.getItem('asenta')!==undefined && localStorage.getItem('asenta')!=''){

          var asenta=localStorage.getItem('asenta');

          $("#v_colonia").val(asenta);
          $(".licolonia").addClass('item-input-focused');

        }
    


}
function FiltrarColonias() {
  $(".formulario").css('display','none');
  $(".divcolonias").css('display','block');

   var codigopostal=$("#v_codigopostal").val();
  var idpais=$("#v_pais").val();
  var idestado=$("#v_estado").val();
  var idmunicipio=$("#v_municipio").val();
  var tipoasen=0;
  var codigopostal=$("#v_codigopostal").val();
  if (codigopostal!='' && idpais!='' && idpais>0 && idestado!='' && idestado>0 && idmunicipio!='' && idmunicipio>0) {

   ObtenerColoniasFactura(); 
   $$("#buscador4").attr('onkeyup','Buscarcolonia()');
   $("#buscador4").val('');

  }
  
  
             

}
var arraydatosfactura=[];
function GuardarDatosfactura(valor) {

   $(".lirazonsocial").removeClass('is-invalid');
      $(".lirfc").removeClass('is-invalid');
      $(".liemail").removeClass('is-invalid');
      $(".licodigopostal").removeClass('is-invalid');
      $(".lipais").removeClass('is-invalid');
      $(".liestado").removeClass('is-invalid');
      $(".limunicipio").removeClass('is-invalid');
      $(".licolonia").removeClass('is-invalid');
      $(".licalle").removeClass('is-invalid');
      $(".linoexterior").removeClass('is-invalid');
      $(".liformapago").removeClass('is-invalid');
      $(".limetodopago").removeClass('is-invalid');
      $(".liusocfdi").removeClass('is-invalid');
      $(".lipais").removeClass('is-invalid');
      $(".limunicipio").removeClass('is-invalid');
      $(".liestado").removeClass('is-invalid');
      $(".licalle").removeClass('is-invalid');
      $(".licolonia").removeClass('is-invalid');

      $(".lirazonsocial").addClass('is-valid');
      $(".lirfc").addClass('is-valid');
      $(".liemail").addClass('is-valid');
      $(".licodigopostal").addClass('is-valid');
      $(".lipais").addClass('is-valid');
      $(".liestado").addClass('is-valid');
      $(".limunicipio").addClass('is-valid');
      $(".licolonia").addClass('is-valid');
      $(".licalle").addClass('is-valid');
      $(".linoexterior").addClass('is-valid');
      $(".liformapago").addClass('is-valid');
      $(".limetodopago").addClass('is-valid');
      $(".liusocfdi").addClass('is-valid');
      $(".lipais").addClass('is-valid');
      $(".limunicipio").addClass('is-valid');
      $(".liestado").addClass('is-valid');
      $(".licalle").addClass('is-valid');
      $(".licolonia").addClass('is-valid');


  var razonsocial=$("#v_razonsocial").val();
  var rfc=$("#v_rfc").val();
  var email=$("#v_email").val();
  var codigopostal=$("#v_codigopostal").val();
  var formapago=$("#v_formapago").val();
  var metodopago=$("#v_metodopago").val();
  var v_pais=$("#v_pais").val();
  var v_estado=$("#v_estado").val();
  var v_municipio=$("#v_municipio").val();
  var v_colonia=$("#v_colonia").val();
  var v_calle=$("#v_calle").val();
  var v_noexterior=$("#v_noexterior").val();
  var v_nointerior=$("#v_nointerior").val();
  var textovpais= $('#v_pais option:selected').text();
  var textovestado= $('#v_estado option:selected').text();
  var textovmunicipio=$("#v_municipio option:selected").text();
  var id=$("#v_idfactura").val();
  var v_usocfdi=$("#v_usocfdi").val();

  var bandera=1;
  var pagina="Guardardatosfiscales.php";
   
   var datos="id="+id+
    "&razonsocial="+razonsocial+
    "&v_rfc="+rfc+
    "&v_correo="+email+
    "&v_codigopostal="+codigopostal+
    "&formapago="+formapago+
    "&metodopago="+metodopago+
    "&v_pais="+v_pais+
    "&v_estado="+v_estado+
    "&v_municipio="+v_municipio+
    "&v_colonia="+v_colonia+
    "&v_calle="+v_calle+
    "&v_noexterior="+v_noexterior+
    "&v_nointerior="+v_nointerior+
    "&v_usocfdi="+v_usocfdi+
    "&textovpais="+textovpais+
    "&textovestado="+textovestado+
    "&textovmunicipio="+textovmunicipio+
    "&idusuario="+localStorage.getItem('id_user')+
    "&imagendatosfactura="+resultimagendatosfactura;

    if (resultimagendatosfactura.length==0) {
      bandera=0;
    }

    if (razonsocial=='') {

      bandera=0;
    }

    if (rfc=='') {
      bandera=0;
    }

    if (email=='') {
      bandera=0;
    }
    if (codigopostal=='') {
      bandera=0;
    }

     if (v_pais==null) {
      bandera=0;
    }

    if(v_estado==null) {
      bandera=0;
    }
    if (v_municipio==null) {
      bandera=0;
    }
    if (v_colonia=='') {
      bandera=0;
    }
    if (v_calle=='') {
      bandera=0;
    }
    if (formapago==null) {
       bandera=0;
    }

     if (metodopago==null) {
       bandera=0;
    }

    if(v_usocfdi==null) {
       bandera=0;
    }

    if (bandera==1) {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(datos){
    resultimagendatosfactura=[];
      ObtenerDatosfiscales();
     RegresarFormfactura();
    
    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

}else{

  var msj="";

      

    if (razonsocial=='') {

       $(".lirazonsocial").removeClass('is-valid');
      $(".lirazonsocial").addClass('is-invalid');


    }

    if (rfc=='') {
    $(".lirfc").removeClass('is-valid');
      $(".lirfc").addClass('is-invalid');

    }

    if (email=='') {
     $(".liemail").removeClass('is-valid');
      $(".liemail").addClass('is-invalid');

    }
    if (codigopostal=='') {

       $(".licodigopostal").removeClass('is-valid');
      $(".licodigopostal").addClass('is-invalid');

    }

     if (v_pais==null) {

       $(".lipais").removeClass('is-valid');
      $(".lipais").addClass('is-invalid');

    }


    if(v_estado==null) {
     
       $(".liestado").removeClass('is-valid');
      $(".liestado").addClass('is-invalid');

    }
    if (v_municipio==null) {
      
       $(".limunicipio").removeClass('is-valid');
      $(".limunicipio").addClass('is-invalid');

    }
    if (v_colonia=='') {
     $(".licolonia").removeClass('is-valid');
      $(".licolonia").addClass('is-invalid');
    }
    if (v_calle=='') {
     $(".licalle").removeClass('is-valid');
     $(".licalle").addClass('is-invalid');
    }


     if (formapago==null) {
        $(".liformapago").removeClass('is-valid');
      $(".liformapago").addClass('is-invalid');

    }

     if (metodopago==null) {

         $(".limetodopago").removeClass('is-valid');
      $(".limetodopago").addClass('is-invalid');


    }

    if(v_usocfdi==null) {
      
       $(".liusocfdi").removeClass('is-valid');
      $(".liusocfdi").addClass('is-invalid');


    }
    if (bandera==0) {

      msj+="Te falta por agregar una opción obligatoria<br>";
    }

    if (resultimagendatosfactura.length==0) {
      msj+="Falta por agregar al menos una imagen<br>";
    }
    alerta('',msj);


  }
  
}

function PintarDatosfiscales(respuesta) {
  var html="";

 

 if (respuesta.length>0) {
  for (var i = 0; i <respuesta.length; i++) {

      var imagenes=respuesta[i].imagenes;

      if (imagenes.length>0) {
              var imagen=urlphp+'upload/datosfactura/'+imagenes[0].ruta;

            }else{

             var imagen=urlimagendefaultservicio;

            }

      html+=`<li style="border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;" class="listadatosfactura"  id="listadatosfactura_`+respuesta[i].idusuariosdatosfiscales+`" >
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
                        <div class="col-20" style="margin:0;padding:0;">
                          <figure class="avatar   rounded-10">
                          <img src="`+imagen+`" alt="" style="width:60px;height:60px;">
                          </figure>
                        </div>
                        
                          <div class="col-50" style="margin:0;padding:0;">
                            <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;" id="participante_">`+respuesta[i].razonsocial+`
                            </div>
                         
                            <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;" id="correo_">`+respuesta[i].rfc+`
                            </div>
                        
                            <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;">`+respuesta[i].correo+`</div>
                            
                            <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;">`+respuesta[i].codigopostal+`</div>
 
                            </div>
                            <div class="col-10" style="margin:0;padding:0;">
                              <span class="botoneditar" onclick="Editardatosfactura(`+respuesta[i].idusuariosdatosfiscales+`)">
                               <i class="bi-pencil-fill"></i>
                              </span>

                            </div>
                            <div class="col-10" style="margin:0;padding:0;">

                              <a class="botoneliminar" style="line-height:0;margin-top: 0;" onclick="Eliminardatosfactura(`+respuesta[i].idusuariosdatosfiscales+`)">
                                 <i style="color:red;font-size:22px;" class="bi bi-trash-fill">
                                 </i>
                              </a>
                            </div>

                            <div class="col-10 factura_`+respuesta[i].idusuariosdatosfiscales+`" style="padding:0;" >
                            <input type="checkbox" id="datosfactura_`+respuesta[i].idusuariosdatosfiscales+`" style="width: 30px;height: 20px;position: absolute;" class="checkdatosfactura" onchange="SeleccionarDatofiscal(`+respuesta[i].idusuariosdatosfiscales+`)" >

                            </div>

                            </div>
                 
                         </div>
                        </div>
                    </label>
                 </li>
                `;

                
  }
 }

  html+=`
                      <div class="row">
                          <a id="btnnuevodatofiscal" onclick="NuevoDatofiscal()" style="border-radius: 10px;
                            height: 60px;color: white;margin-right:1em;margin-left:1em;" class="button button-fill button-large button-raised margin-bottom color-theme">
                              <div class="fab-text">Nuevo dato fiscal</div>
                            </a>
                         </div>


                          <div class="row">
                          <a id="btnaceptarfiscal" onclick="Aceptardatofiscal()" style="border-radius: 10px;
                            height: 60px;color: white;display:none;margin-right:1em;margin-left:1em;" class="button button-fill button-large button-raised margin-bottom color-theme">
                              <div class="fab-text">ACEPTAR</div>
                            </a>
                         </div>
                       
                `;

     

      $("#listadodatosfiscales").html(html);
}



function SeleccionarDatofiscal(idusuariosdatosfiscales) {
  
  $(".checkdatosfactura").attr('checked',false);

  if ($("#datosfactura_"+idusuariosdatosfiscales).is(':checked')) {
  
       $("#datosfactura_"+idusuariosdatosfiscales).attr('checked',false);
       $("#btnaceptarfiscal").css('display','block');

      }else{

      $("#btnaceptarfiscal").css('display','none');
      $("#datosfactura_"+idusuariosdatosfiscales).attr('checked',true);

  }

 
}

function Aceptardatofiscal() {
  var valor=0;
  var idusuariosdatosfiscales=0;
   $(".checkdatosfactura").each(function( index ) {
          if($(this).is(':checked')){
            var idelemento=$(this).attr('id');
             idusuariosdatosfiscales=idelemento.split('_')[1];

          }
      });

   if(idusuariosdatosfiscales>0) {

      localStorage.setItem('idusuariosdatosfiscales',idusuariosdatosfiscales);

    }else{

    localStorage.removeItem('idusuariosdatosfiscales');
  }
  dynamicSheet2.close();
}

function Editardatosfactura(idusuariosdatosfiscales) {
      var pagina = "Obtenerdatofiscal.php";
      var id_user=localStorage.getItem('id_user');
      var datos="idusuariosdatosfiscales="+idusuariosdatosfiscales+"&id_user="+id_user;
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(resp){
        var respuesta=resp.respuesta;
        resultimagendatosfactura=[];
        NuevoDatofiscal();

        var razonsocial=respuesta.razonsocial;
        var rfc=respuesta.rfc;
        var email=respuesta.correo;
        var codigopostal=respuesta.codigopostal;
        var pais=respuesta.pais;
        var estado=respuesta.estado;
        var municipio=respuesta.municipio;
        var colonia=respuesta.colonia;
        var calle=respuesta.direccion;
        var noexterior=respuesta.noexterior;
        var nointerior=respuesta.nointerior;
        var formapago=respuesta.formapago;
        var metodopago=respuesta.metodopago;
        var usocfdi=respuesta.usocfdi;
        var idusuariosdatosfiscales=respuesta.idusuariosdatosfiscales;
        var imagenes=resp.imagenes;
        $("#v_razonsocial").val(razonsocial);
        $("#v_rfc").val(rfc);
        $("#v_email").val(email);
        $("#v_codigopostal").val(codigopostal);
        Buscarcodigo();
        $("#v_pais").val(pais);
        $("#v_estado").val(estado);
        $("#v_municipio").val(municipio);
        $("#v_colonia").val(colonia);
        $("#v_calle").val(calle);
        $("#v_noexterior").val(noexterior);
        $("#v_nointerior").val(nointerior);
        $("#v_formapago").val(formapago);
        $("#v_metodopago").val(metodopago);
        $("#v_usocfdi").val(usocfdi);
        $("#v_idfactura").val(idusuariosdatosfiscales);

        $(".lirazonsocial").addClass('item-input-focused');
        $(".lirfc").addClass('item-input-focused');
        $(".liemail").addClass('item-input-focused');
        $(".licolonia").addClass('item-input-focused');
        $(".licalle").addClass('item-input-focused');
        $(".linoexterior").addClass('item-input-focused');
        $(".linointerior").addClass('item-input-focused');
        $(".linointerior").addClass('item-input-focused');


        if (imagenes.length>0) {

          for (var i = 0; i < imagenes.length; i++) {
            
              var ruta=imagenes[i].ruta;
              resultimagendatosfactura.push(ruta);
          }

          PintarlistaImagenfactura();
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





function NuevoDatofiscal() {
  $("#v_idfactura").val(0);
   $("#v_razonsocial").val('');
   $("#v_rfc").val('');
   $("#v_email").val('');
   $("#v_codigopostal").val('');
   $("#v_pais").val('');
   $("#v_estado").val('');
   $("#v_municipio").val('');
   $("#v_colonia").val('');
   $("#v_calle").val('');
   $("#v_noexterior").val('');
   $("#v_nointerior").val('');
   $("#v_formapago").val('');
   $("#v_metodopago").val('');
   $("#v_usocfdi").val('');


  $(".formulario").css('display','block');
  $(".divcolonias").css('display','none');
  $(".divlistadodatosfiscales").css('display','none');
}

function RegresarFormfactura() {
  $(".formulario").css('display','none');
  $(".divcolonias").css('display','none');
  $(".divlistadodatosfiscales").css('display','block');
}

function ObtenerMetodoPago() {

    var pagina = "Obtenermetodopago.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      async:false,
      success: function(datos){
        var resultado=datos.respuesta;
        PintarmetodoPago(resultado);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });

}

/*function Editardatosfactura(valor) {
  AbrirModalDatos();
  var v_razonsocial="";
  var v_rfc="";
  var v_email="";
  var v_codigopostal="";
  var v_formapago="";
  var v_metodopago="";
  var v_pais="";
  var v_estado="";
  var v_municipio="";
  var v_colonia="";
  var v_calle="";
  var v_noexterior="";
  var v_nointerior="";

  console.log(valor);
  console.log(arraydatosfactura);
  for (var i = 0; i < arraydatosfactura.length; i++) {
      
      if (valor==i) {
             v_razonsocial=arraydatosfactura[i].razonsocial;
             v_rfc=arraydatosfactura[i].rfc;
             v_email=arraydatosfactura[i].email;
             v_codigopostal=arraydatosfactura[i].codigopostal;
             v_formapago=arraydatosfactura[i].formapago;
             v_metodopago=arraydatosfactura[i].metodopago;
             v_pais=arraydatosfactura[i].v_pais;
             v_estado=arraydatosfactura[i].v_estado;
             v_municipio=arraydatosfactura[i].v_municipio;
             v_colonia=arraydatosfactura[i].v_colonia;
             v_calle=arraydatosfactura[i].v_calle;
             v_noexterior=arraydatosfactura[i].v_noexterior;
             v_nointerior=arraydatosfactura[i].v_nointerior;

             break;
         }
  }

  $("#v_razonsocial").val(v_razonsocial);
  $("#v_rfc").val(v_rfc);
  $("#v_email").val(v_email);
  $("#v_codigopostal").val(v_codigopostal);
  $("#v_formapago").val(v_formapago);
  $("#v_metodopago").val(v_metodopago);
  Buscarcodigo();
  $("#v_pais").val(v_pais);
  $("#v_estado").val(v_estado);
  $("#v_municipio").val(v_municipio);
  $("#v_colonia").val(v_colonia);
  $("#v_calle").val(v_calle);
  $("#v_noexterior").val(v_noexterior);
  $("#v_nointerior").val(v_nointerior);

}*/

function Eliminardatosfactura(idusuariosdatosfiscales) {

    app.dialog.confirm('','¿Seguro de eliminar el dato de facturación?', function () {
      var pagina = "Eliminardatosfactura.php";
      var id_user=localStorage.getItem('id_user');
      var datos="idusuariosdatosfiscales="+idusuariosdatosfiscales+"&id_user="+id_user;
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(datos){

       ObtenerDatosfiscales();

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
  
    


    });

}

function PintarmetodoPago(resultado) {
  var html="";
  if (resultado.length>0) {
    for (var i =0; i <resultado.length; i++) {
        html+=`<option value="`+resultado[i].c_metodopago+`">`+resultado[i].c_metodopago+'-'+resultado[i].descripcion+`</option>`;
    }
  }

  $$("#v_metodopago").html(html);
}
function ObtenerFormaPago() {
     var pagina = "Obtenerformapago.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      async:false,
      success: function(datos){
        var resultado=datos.respuesta;
        PintarformaPago(resultado);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
  
}

function PintarformaPago(resultado) {
  var html="";
  if (resultado.length>0) {
    for (var i = 0; i <resultado.length; i++) {
        html+=`<option value="`+resultado[i].cformapago+`">`+resultado[i].descripcion+`</option>`;

    }
  }

  $("#v_formapago").html(html);
}

function AbrirModalImagenDatosFactura() {
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

                TomarFotoDatosfactura(id_user)

              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getFotoDatosfactura(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

}

function ObtenerUsoCfdi() {
  
   var pagina = "ObtenerUsocfdi.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      async:false,
      success: function(datos){
        var resultado=datos.respuesta;
        PintarUsocfdi(resultado);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
}
function PintarUsocfdi(resultado) {
  var html="";
  if (resultado.length>0) {
    for (var i = 0; i <resultado.length; i++) {
        html+=`<option value="`+resultado[i].c_uso+`">`+resultado[i].descripcion+`</option>`;

    }
  }

  $("#v_usocfdi").html(html);
}

//Funcion para abrir la camara del phone
  function TomarFotoDatosfactura(iduser) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    navigator.camera.getPicture(onSuccessDatosfactura,onError,options);
  }

  //El valor devuleto al tomar la foto lo envia a esta funcion 
  function onSuccessDatosfactura(RutaImagen) {
    //app.popup.close('.popup-opciones-subir-fotos');
    //document.getElementById("miimagen").src = RutaImagen;
    fichero=RutaImagen;
    
    var iduser = 0;
  
    
    guardar_foto_datosfactura(iduser);
  }



  function guardar_foto_datosfactura(iduser) {

    //app.preloader.show()
          app.dialog.preloader('Cargando...');




  var pagina = "subirconstanciafiscal.php";


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
    
    ft.upload(fichero, urlphp+pagina, respuestafotodatosfactura, fail, options);

    
  }


  function respuestafotodatosfactura(r)
  {
    //borrarfoto();


    var resp = r.response;
    var obj = JSON.parse(resp);
    var result = obj[0]['respuesta'];
    var ruta = obj[0]['ruta'];

    //app.preloader.hide();
    app.dialog.close();
    if(result == 1){
 
      if(localStorage.getItem('rutadatosfactura')!=undefined) {
          localStorage.setItem('rutadatosfactura','');
      }
      //var jsonimagen=JSON.parse(localStorage.getItem('rutacomprobante'));

      resultimagendatosfactura.push(ruta);

     localStorage.setItem('rutadatosfactura',resultimagendatosfactura);
      alerta('','Imagen importada exitosamente');

      PintarlistaImagenfactura();

    }else{
      //Hubo un error
      alerta(result,"ERROR");
    $(".check-list").css('display','none');

      $("#aparecerimagendatosfactura").css('display','none');
      $("#aparecerimagendatosfactura").attr('onclick','');

    } 
  }


function onPhotoDataSuccessdatosfactura(imageData) {
 // borrarfoto();
  var pagina = "subirconstanciafiscal2.php";

    var datos= 'imagen='+imageData;

    var pagina = urlphp+pagina;
     // app.dialog.preloader('Cargando...');
    $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
      beforeSend: function() {
        // setting a timeout
       app.dialog.preloader('Cargando...');
    },

    success: function(data) {
      app.dialog.close();

      ruta=data.ruta;

      if(localStorage.getItem('rutadatosfactura')!=undefined) {
          localStorage.setItem('rutadatosfactura','');
      }
     
      resultimagendatosfactura.push(ruta);

     localStorage.setItem('rutadatosfactura',resultimagendatosfactura);

      alerta('','Imágen importada exitosamente');

      PintarlistaImagenfactura();

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
 function getFotoDatosfactura(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessdatosfactura, onError, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });
    }


    function PintarlistaImagenfactura(){
      var html="";
      $("#vimagen").html('');

      if (resultimagendatosfactura.length > 0) {

        html+=`<div class="list media-list">
          <ul>
        `;

        for(var i = 0; i < resultimagendatosfactura.length; i++) {
          var imagen=urlphp+'upload/datosfactura/'+resultimagendatosfactura[i];
          
          html+=`
            <li style="border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;" class="" id="imagendatos_`+i+`" >
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
                        <div class="col-20" style="margin:0;padding:0;">
                          <figure class="avatar   rounded-10">
                          <img src="`+imagen+`" alt="" style="width:60px;height:60px;">
                          </figure>
                        </div>
                        
                          <div class="col-50" style="margin:0;padding:0;">
                            <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;" id="participante_">
                            </div>
                         
                            <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;" id="correo_">
                            </div>
                        
                            <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;"></div>
                            
                            <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;"></div>
 
                            </div>
                            <div class="col-10" style="margin:0;padding:0;">
                              

                            </div>
                            <div class="col-10" style="margin:0;padding:0;">

                              <a class="botoneliminar" style="line-height:0;margin-top: 0;" onclick="EliminarImagenFactura(`+i+`)">
                                 <i style="color:red;font-size:22px;" class="bi bi-trash-fill">
                                 </i>
                              </a>
                            </div>

                            <div class="col-10 factura_6" style="padding:0;">

                            </div>

                            </div>
                 
                         </div>
                        </div>
                    </label>
                 </li>

          `;
        }
        html+=`
          </ul>
        </div>`;

              $("#vimagen").css('display','block');


      }

       $("#vimagen").html(html);
    }

    function EliminarImagenFactura(posicion) {

          app.dialog.confirm('','¿Seguro de eliminar la imagen?', function () {

         $("#imagendatos_"+posicion).remove();

         for (var i =0; i < resultimagendatosfactura.length; i++) {
           if (i == posicion) {

            resultimagendatosfactura.splice(i,1);
            return 0;
           }
         }

         PintarlistaImagenfactura();
      });
    }

function CargarTotal() {
 CargarCarrito();
}



function CrearModalEspera3(callback) {
  
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 50%;background: black;">
            
            <div class="sheet-modal-inner" style=" ">
              
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       
                          
                          
                      

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                           
                          <div id="" class="mensajeproceso" style="font-weight:bold;color:#c7aa6a;" >En proceso...
                            <img src="img/loading.gif" style="width:20%;display: flex;justify-content: center;align-items: center;margin:0px auto;margin-top: 20px;">

                          </div>
                          <p id="" class="mensajeerror" style="font-weight:bold;display:none;color:#c7aa6a;text-align:center;line-height: 1;" >Oops, algo no está bien, intenta de nuevo.</p>
                          <p id="" class="mensajeexito" style="font-weight:bold;display:none;color:#c7aa6a;text-align:center;line-height: 1;" >Se realizó correctamente</p>

                        </div>

                        

                          

                          </div>
                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100" style="margin-left: 1em;margin-right: 1em;">
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente butonok" onclick="VerCompras()"  id="btnConfirm">Aceptar</button>
                            </div>

                            <div class="col-100" style="margin-left: 1em;margin-right: 1em;" >
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente butoerror" onclick="CerrarEspera2()"  id="btnCancel" >Aceptar</button>
                            </div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet2 = app.sheet.create({
        content: html,

      swipeToClose: false,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

           $(".cambiarfuente2").css('display','none');
            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
           
            }
          $(".cambiarfuente2").css('display','block');
 

          },
          opened: function (sheet) {
                 console.log('Sheet opened');

          },
        }
      });



       dynamicSheet2.open();


        setTimeout(() => {
        // Ejecuta RealizarCargo() dentro del timeout
        callback();
    }, 5000); // Cambiado a 5000 milisegundos (5 segundos)
}


function AbrirModalCupones() {
   
  var parrafo="<p class='cambiarfuente "+estiloparrafo+"' >¿Tienes un cupón?</p>";
   

  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;
                      

                          html+=`
                          <div class="row" style="    margin-left: 3em; margin-right: 3em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>

                            <div class="row" style="margin-top: 1em;margin-bottom: 1em;">

                                            <div class="col-100" style="margin-bottom: 1em;">
                                              <div class="item-inner" style="margin-top: 4px; ">
                                                    <div class="item-input-wrap">
                                                     <input type="text" id="txtaplicar" class="form-control cambiarfuente faustina" style="font-size: 20px;width: 100%;background: white;color: black;border-radius: 5px;height: 55px;padding-left: 4px;" name="">
                                                     </div>
                                              </div>
                                          </div>
                                          <div class="col-100">
                                            <button type="button" class="button button-fill button-large cambiarfuente botonesredondeado botones faustina" style="background: rgb(199, 170, 106); display: block; color: white !important;" onclick="AplicarCupon()">Aplicar</button>

                                          </div>
                                      
                                     </div>
                          </div>

                          </div>`;

                          html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100">
                            </div>

                          
                          </div>
                          `;

                      
                         html+=` </div>

                         


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });


       dynamicSheet1.open();
}

function AplicarCupon() {
  var codigocupon=$("#txtaplicar").val();
  var idsucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');

  var datos="codigocupon="+codigocupon+"&idsucursal="+idsucursal+"&iduser="+iduser;
  var pagina = "ValidarCupon.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(datos){
        
        dynamicSheet1.close();
      var respuesta=datos.respuesta;
      var cupones=datos.cupones;
      var mensaje=datos.mensaje;
      if (respuesta==0) {
        validacioncupon=respuesta;
         var textomensaje="";

         for (var i = 0; i < mensaje.length; i++) {

              textomensaje += mensaje[i]+"\n";
          }

          AbrirModalAviso(textomensaje);

       

      }

      if (respuesta==1) {
        validacioncupon=datos.nuevototal;
        datoscupon=datos.cupones[0];
        localStorage.setItem('montocupon',validacioncupon.montopaquetes);
        localStorage.setItem('codigocupon',codigocupon);
        localStorage.setItem('idcupon',datoscupon.idcupon);
          var textomensaje="";
         for (var i = 0; i < mensaje.length; i++) {

              textomensaje += mensaje[i]+"\n";
          }

          //AbrirModalAviso(textomensaje);

          if (datoscupon.tipodescuento==0) {
            monto=datoscupon.descuento+'%';
          }

          if (datoscupon.tipodescuento==1) {
             monto='$'+datoscupon.descuento;
          }

          var html=`
              <p style="color: #C7AA6A;text-align:center;font-size:30px;margin:0;" class="cambiarfuente" >`+codigocupon+`</p>
              <p style="color: #C7AA6A;text-align:center;"  class="cambiarfuente">Descuento aplicado `+monto+`</p>

          `;
          $(".lbldescuentocupon").html(formato_numero(validacioncupon.montopaquetes,2,'.',','));
          $(".cuponaplicado").html(html);
          $(".cuponaplicado").css('display','block');
          $("#divdescuentoaplicado").css('display','block');
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


////pago tarjeta




///CUANDO SELECCIONAMOS UNA TARJETA////
/*function CheckCardSelection(obj,objclass,cardid)
{
  $('.'+objclass).prop('checked', false);
  $("#"+ obj.id).prop('checked', true);

  SetLastCard(cardid);
 

}*/

