var descuentosaplicados=[];
var descuentosmembresia=[];
var arraycomentarios=[];
var resultimagendatosfactura=[];
var dynamicSheet4="";
var dynamicSheet5="";
var dynamicSheet1="";
var dynamicSheet2="";
 var swiper1 ="";
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
             //$(".divvencimiento").css('display','block');
            // $(".vencimiento").text(resultado[0].fechaformato);
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
		<li class="list-item lipagos" style="    padding-top: 10px;">
                    <div class="row" >
                        <div class="col-80">
                        <p>Seleccionar todos</p>
                        </div>
                        <div class="col-20">`;
                        //<input type="checkbox" id="checktodos" onchange="SeleccionarTodos()" style="    width: 30px;height: 20px;" />
                             html+=`
                              <div class="toggle">
                                  <label>
                                    <input type="checkbox" id="checktodos"  onchange="SeleccionarTodos()" />
                                    <span class="toggle-icon"></span>
                                  </label>
                                </div>

                            `;
                       html+=` </div>
                    </div>
                 </li>

		`;
		for (var i = 0; i <pagos.length; i++) {
			html+=`
				<li class="list-item lipagos">
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

                         html+=` <p class="text-muted small" style="font-size:20px;color:red;">$`+formato_numero(pagos[i].monto,2,'.',',')+`</p>

                          <input type="hidden" value="`+pagos[i].monto+`" class="montopago" id="val_`+pagos[i].idpago+`">
                         <input type="hidden" value="`+pagos[i].tipopago+`" class="tipopago" id="tipopago_`+pagos[i].idpago+`">

                        </div>
                        <div class="col-20">`;

                        if (pagos[i].dividido==2) {


                          if (pagos[i].alumnos==pagos[i].aceptados) {

                            html+=`
                              <div class="toggle">
                                  <label>
                                    <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" />
                                    <span class="toggle-icon"></span>
                                  </label>
                                </div>

                            `;
                            // html+=` <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" style="width: 30px;height: 20px;" />`;
                               html+=` <input type="hidden" id="sepuede_`+pagos[i].idpago+`" class="" value="1" style="" />`;

                          }else{

                            html+=`
                              <div class="toggle">
                                  <label>
                                    <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Advertencia(`+pagos[i].idpago+`)" />
                                    <span class="toggle-icon"></span>
                                  </label>
                                </div>

                            `;

                           // html+=` <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Advertencia(`+pagos[i].idpago+`)" style="width: 30px;height: 20px;" />`;
                               html+=` <input type="hidden" id="sepuede_`+pagos[i].idpago+`" class="" value="0" style="" />`;

                          }
     
                        }else{

                              html+=`
                              <div class="toggle">
                                  <label>
                                    <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" />
                                    <span class="toggle-icon"></span>
                                  </label>
                                </div>

                            `;

                        // html+=` <input type="checkbox" id="check_`+pagos[i].idpago+`" class="seleccionar" onchange="Seleccionarcheck(`+pagos[i].idpago+`)" style="width: 30px;height: 20px;" />`;
                         html+=` <input type="hidden" id="sepuede_`+pagos[i].idpago+`" class="" value="1" style="" />`;

                        }

                      

                      html+=`

                        <input type="hidden" id="tipo_`+pagos[i].idpago+`" value="`+pagos[i].tipo+`"  />
                        <input type="hidden" id="habilitarmonedero_`+pagos[i].idpago+`" value="`+pagos[i].habilitarmonedero+`"  />
                        <input type="hidden" id="monederousado_`+pagos[i].idpago+`" value="`+pagos[i].monederousado+`"  />

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

          tipopago=$("#tipopago_"+dividir).val();
         var habilitarmonedero=$("#habilitarmonedero_"+dividir).val();
         var monederousado=$("#monederousado_"+dividir).val();
		 	contar++;
      console.log('mon'+monederousado)
		 	var objeto={
		 		id:dividir,
		 		concepto:concepto.trim(),
		 		monto:contador,
        tipo:tipo,
        servicio:servicio,
        fechainicial:fechainicial,
        fechafinal:fechafinal,
        usuario:usuario,
        tipopago:tipopago,
        habilitarmonedero:habilitarmonedero,
        monederousado:monederousado
		 	};
		 	pagosarealizar.push(objeto);


     
		 }
	
	});
 // console.log(contar+''+contarseleccionadoscero);
 // console.log('pago cero'+pagocero);
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
/*var contartipo=0;
var sintitpo=0;
var concepto="";
var contipo=[];
  if (pagosarealizar.length>0) {
    for (var i =0; i < pagosarealizar.length; i++) {
      
      var tipopago=pagosarealizar[i].tipopago;

      if (tipopago>0) {
         concepto=concepto+'*'+pagosarealizar[i].concepto+'<br>';
        contartipo++;
        contipo.push(pagosarealizar[i]);

      }else{
        sintitpo++;
      }
    }

  }
  var pasa=0;
  if (contartipo>0 && sintitpo==0) {

        var tipo=0;
        if (contipo.length>=2) {
          
          var igual=0;
              for(var i = 0; i < contipo.length; i++) {
                 tipo=contipo[i].tipopago

                 if (i< contipo.length-1) {
                   if (contipo[i + 1].tipopago === contipo[i].tipopago) {
                   igual++;
                  }
                }

            }
            var con=contipo.length-1;


            if (igual==con) {
              pasa=1;
            }else{
              pasa=0;
            }
        }else{

          pasa=1;
        }
    

    
  }

  else if (sintitpo>0 && contartipo==0) {
    pasa=1;
  }

  else{

    pasa=0;
  }*/

  VerificarPagosRelacionados().then(r => {
    var concepto="";
    var pasa=r.pasa;
      if (pasa==1) {
      GoToPageHistory('resumenpago');

       }else{

        var conceptos=r.conceptos;

        for (var i = 0; i < conceptos.length; i++) {
          concepto+='*'+conceptos[i]+'<br>';
        }

        alerta('','Los siguientes pagos: <br>  '+concepto+' se deberán de pagar de forma individual');
      }

  });


  
}


function VerificarPagosRelacionados() {
      return new Promise(function(resolve, reject) {

        var pagina = "VerificarPagosRelacionados.php";
        var iduser=localStorage.getItem('id_user');
        var datos="pagosarealizar="+JSON.stringify(pagosarealizar)+"&iduser="+iduser;
        $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        async:false,
        success: function(resp){
          resolve(resp);
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

function CargarPagosElegidos() {

	var listado=JSON.parse(localStorage.getItem('pagos'));
	console.log(listado);
 
	var html="";
	for (var i = 0; i <listado.length; i++) {
   var color='';
      if (listado[i].monto<0) {
        color='red';
      }
      var todosdescuento=0;
			html+=`
				<li class="list-item" style="color:`+color+`">
                    <div class="row" style="padding-right: 1em;padding-left: 1em;">
                        <div class="col-80" style="padding:0;">
                            <p class="text-muted small" style="font-size:18px;" id="concepto_`+listado[i].id+`">
                              `+listado[i].concepto+`
                            </p>`;
                            var estilo="";

                            if (listado[i].monederousado>0) {

                             estilo="text-decoration:line-through;";

                            }
                           html+=` <p class="text-muted " id="montopago_`+listado[i].id+`" style="font-size:30px;text-align:right;`+estilo+`">

                            $`+formato_numero(listado[i].monto,2,'.',',')+`
                            </p>`;

                           

                        html+=` <input type="hidden" value="`+listado[i].monto+`" class="montopago" id="val_`+listado[i].id+`">
                        </div>
                        <div class="col-20">`;
                     

                        html+=`</div>

                        </div>

                        <div id="descuentospagos_`+listado[i].id+`"></div>
                       `;
                          
                          
                              

                       html+=`



                        </div>`;

                         if (listado[i].monederousado>0) {
                              html+=`

                              <div class="row" style="padding-left: 1em; padding-right: 1em;">
                              <div class="col-80" style="padding: 0;" >
                              <p style="color:#d77a34;text-align: left;margin-top: 10px;">Monedero aplicado </p>
                              </div>
                              <div class="col-80" style="color:#d77a34;font-size:30px;text-align: right;margin: 0;padding: 0;" >
                                <p> -$`+formato_numero(listado[i].monederousado,2,'.',',')+`</p> 
                              </div>
                              </div>
                              `;
       
                            }
                       html+=` <div class="row" >
                        <div class="col-90" style="padding:0;text-align: end;margin-top: 1em;">

                        `;

                        if (listado[i].habilitarmonedero==1) {
                           if (listado[i].monederousado==0) {
                        html+=`  <span class="chip  btnmonedero" 
                          id="" style=" height: 30px;width:150px;background:#007aff;color:white;margin-right: 10px;text-align:center;justify-content: center;" 
                          onclick="AbrirModalmonedero('`+listado[i].id+`')">
                                
                                Aplicar monedero
                                </span>`;

                              }else{

                         html+=`  <span class="chip  btnmonedero" 
                          id="" style=" height: 30px;width:150px;background:#007aff;color:white;margin-right: 10px;text-align:center;justify-content: center;" 
                          onclick="RevertirMonedero('`+listado[i].id+`')">
                                
                                Revertir
                                </span>`;


                              }
                            }

                           html+=`
                               </div>
                              <div class="col-20"></div>
                            </div>

                            <div id="subtotal_`+listado[i].id+`"></div>
                            
                           </div>
                           </div>
                         </li>`;
		}



		$(".listadopagoselegidos").html(html);


    var html2="";
      for (var i = 0; i <listado.length; i++) {

                 if (descuentosaplicados.length>0) {
                                       
                                listado[i].descuentos=[];
                                for (var k = 0; k <descuentosaplicados.length; k++) {

                                  if (descuentosaplicados[k].idpago == listado[i].id) {
                                   html2=`
                                    <div class="row desc" style="    padding-right: 1em;padding-left: 1em;">

                                   <div class="col-80" style="    margin-top: 10px;padding:0;">

                                      <p class="text-muted" style="text-align: left;">Descuento `+descuentosaplicados[i].titulo+`</p> 

                                         </div>
                                   <div class="col-80" style="margin: 0;padding: 0;">
                                      <p style="text-align: right;font-size:30px;"> -$`+formato_numero(descuentosaplicados[i].montoadescontar,2,'.',',')+`</p> 
                                   </div>

                                   </div>
                                   `;
                                   todosdescuento=todosdescuento+descuentosaplicados[i].montoadescontar;
                                   listado[i].descuentos.push(descuentosaplicados[k]);
                                    
                                      $("#montopago_"+listado[i].id).css('text-decoration','line-through');
                                   
                                     $("#descuentospagos_"+listado[i].id).append(html2);

                                    }
                                }
                              }


                                   if (descuentosmembresia.length>0) {
                                       
                                  listado[i].descuentosmembresia=[];
                                for (var k = 0; k <descuentosmembresia.length; k++) {

                                  if (descuentosmembresia[k].idpago == listado[i].id) {
                                   html2=`
                                   <div class="row desc" style="padding-right: 1em; padding-left: 1em;">
                                   <div class="col-80" style="    margin-top: 10px;padding:0;">

                                           <p class="text-muted" style="text-align: left;">Descuento `+descuentosmembresia[i].titulo+`</p> 

                                         </div>
                                   <div class="col-80" style="margin: 0;padding: 0;">
                                      <p style="text-align: right;font-size:30px;"> -$`+formato_numero(descuentosmembresia[i].montoadescontar,2,'.',',')+`</p> 
                                   </div>

                                     </div>
                                   `;
                                  todosdescuento=todosdescuento+descuentosaplicados[i].montoadescontar;

                                   listado[i].descuentosmembresia.push(descuentosmembresia[k]);
                                  $("#descuentospagos_"+listado[i].id).append(html2);


                                    }
                                }

                                $("#montopago_"+listado[i].id).css('text-decoration','line-through');

                              }


                            html2=` <div class="row" style="padding-right: 1em;padding-left: 1em;">
                              <div class="col-80" style="text-align: end;    margin: 0;padding: 0; ">

                            `;
                              var t=parseFloat(listado[i].monto)-parseFloat(todosdescuento)-parseFloat(listado[i].monederousado);
                              html2+=`<p class="text-muted small" style="text-align: left;font-size:18px;"> 
                              Subtotal </p>

                              `;
                           html2+=` </div>
                                 <div class="col-80" style="font-size:30px;margin: 0;padding: 0;" >
                                   <p class="text-muted " style="text-align: right;"> $`+formato_numero(t,2,'.',',')+`</p> 
                               </div>`;

                         $("#subtotal_"+listado[i].id).append(html2);


                        }

            localStorage.setItem('pagos',JSON.stringify(listado));

}


function Cargartipopago(tipodepagoseleccionado) {


    var pagina = "obtenertipodepagos2.php";
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

function CargartipopagoSeleccionado(tipodepagoseleccionado) {
     return new Promise(function(resolve, reject) {

    var pagina = "obtenertipodepagos5.php";
    var factura=0;
    var datos="tipodepagoseleccionado="+tipodepagoseleccionado+"&factura="+factura;
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(datos){

      var opciones=datos.respuesta;
  
      Pintartipodepagos(opciones,tipodepagoseleccionado);
      resolve(1);
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


function CargartipopagoSeleccionado2(tipodepagoseleccionado) {
     return new Promise(function(resolve, reject) {

    var pagina = "obtenertipodepagos5.php";
    var factura=0;
    var datos="tipodepagoseleccionado="+tipodepagoseleccionado+"&factura="+factura;
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(datos){

      var opciones=datos.respuesta;
  
      Pintartipodepagos(opciones,tipodepagoseleccionado);
      resolve(1);
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


function CargartipopagoFactura(tipodepagoseleccionado) {
   var pagina = "obtenertipodepagos5.php";
    var datos="tipodepagoseleccionado="+tipodepagoseleccionado+"&factura=1";
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


/*function Pintartipodepagos(opciones,tipodepagoseleccionado) {
   var html='';

  if (opciones.length>0) {
     html+=`  <option value="0">Seleccionar método de pago</option>`;
    for (var i = 0; i <opciones.length; i++) {

    html+=`  <option value="`+opciones[i].idtipodepago+`">`+
             opciones[i].tipo  +`</option>`;

          }

    }


  $("#tipopago").html(html);


  }*/

  function Pintartipodepagos(opciones, tipodepagoseleccionado) {
 

 var html="";

      var classe="swiper-slide-active";

    if (opciones.length>0) {

      html+=` <div class="swiper-wrapper" style="margin-left: 1em;">`;
    for (var i = 0; i < opciones.length; i++) {
      var checked="";
     
        html+=`
<div class="swiper-slide swiper-slide-active" role="group"  style="margin-right: 20px;width:auto;">
        <div class="card cardtipopago" id="cardtipopago_`+opciones[i].idtipodepago+`" style="height: 35px!important;padding: 10px;" onclick="CargarOpcionesTipopago(`+opciones[i].idtipodepago+`)">
        <div class="card-content card-content-padding  featured-card">
           
            <div class="card-info">
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
        spaceBetween: 20,
        pagination: false,

      });
      $(".divtablerotipo").css('display','block');



      swiper1.update();
  }else{

    $(".divtablerotipo").css('display','none');

  }

}



function CalcularTotales() {

  var comisionmonto=0;
  var comisionporcentaje=0;
  var impuesto=0;
  var comision=0;
  var comisionpornota=0;
  var tipocomisionpornota=localStorage.getItem('tipocomisionpornota');
   $(".divtipopago").css('display','block');


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

  for (var i = 0; i <descuentosmembresia.length; i++) {

    totaldescuentos=parseFloat(totaldescuentos)+parseFloat(descuentosmembresia[i].montoadescontar);

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
    $(".lbltotalapagar").text(formato_numero(suma,2,'.',','));

    if (suma==0 ) {
        $$("#btnpagarnota").css('display','block');

        $("#btnpagarnota").attr('disabled',false);
   
        $(".divtipopago").css('display','none');
        $(".preguntafactura").css('display','none');

    }
      var restatotaldes=parseFloat(sumatotal)-parseFloat(descuentocupon)-parseFloat(totaldescuentos);

     
    if (monedero==restatotaldes) {

      localStorage.setItem('idtipodepago',0);

    }
    if (restatotaldes==0) {

      localStorage.setItem('idtipodepago',100);

    }


}


var monederousuario=0;


function AbrirModalmonedero(idpago) {


	  var listado=localStorage.getItem('pagos');
	  var id_user=localStorage.getItem('id_user');
    var pagina = "VerificarPagosMonedero.php";
    var datos="id_user="+id_user+"&pagos="+listado+"&idpago="+idpago;
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      var respuesta=resp.monedero;
      var montopago=resp.montopago;

      var valor=montopago;
      if (montopago>=respuesta) {

      var valor=respuesta;

      }
       var html=`
         
              <div class="">
               <div class="row" style="">
                	<p style="font-size:26px;padding:1px;"  >$<span id="monedero">0.00</span></p>

                </div>

                <div class="row" style="padding-top:1em;justify-content: center;">
                	<label style="font-size:16px;padding:1px;">Cantidad a utilizar:</label>
                	<input type="number" name="txtcantidad" id="txtcantidad" onkeyup="ValidarNumero()"; value="`+valor+`" style="width: 100px;font-size: 26px;"/>
                </div>
                <p id="txtadvertencia" style="color:red;"></p>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Tienes en monedero',

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
                CerrarDialog();
          }
          else if(index === 1){
                AplicarMonedero(idpago);
              
            }
           },

          verticalButtons: false,
           close:false,
        }).open();


       $("#monedero").text(formato_numero(respuesta,2,'.',','));
       $(".monederotxt").text(formato_numero(respuesta,2,'.',','));
       monederousuario=respuesta;
       
       },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });
		
		//ObtenerMonedero();

}

function CerrarDialog() {
     app.dialog.close();

}
function ValidarNumero() {
 /* var numero= $("#txtcantidad").replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1$2');

    $("#txtcantidad").val(numero);*/
}

function AplicarMonedero(idpago) {

    $("#txtadvertencia").text('');
    var txtcantidad=parseFloat($("#txtcantidad").val());
    var sumatotalapagar=localStorage.getItem('sumatotalapagar');
    if (monederousuario>0) {
  if (txtcantidad!='' &&txtcantidad!=0) {
      if (txtcantidad>monederousuario) {
         $("#txtadvertencia").text('La cantidad supera el monedero acumulado');
         alerta('','La cantidad supera el monedero acumulado');

      }else{



        if (txtcantidad>parseFloat(sumatotalapagar)) {
          console.log('1');
          $("#txtadvertencia").text('La cantidad ingresada es mayor al total');
              alerta('','La cantidad ingresada es mayor al total');

        }else{
            if (txtcantidad>0) {
              

               var listado=localStorage.getItem('pagos');
                var id_user=localStorage.getItem('id_user');
                var pagina = "AplicarMonederoPago.php";
                var datos="id_user="+id_user+"&pagos="+listado+"&idpago="+idpago+"&txtcantidad="+txtcantidad;
                $.ajax({
                type: 'POST',
                dataType: 'json',
                url: urlphp+pagina,
                data:datos,
                async:false,
                success: function(resp){
                  var respuesta=resp.pagos;
                  console.log(respuesta);
                  localStorage.setItem('pagos',JSON.stringify(respuesta));
                 
                  var monederousado=resp.monederousado;
                  localStorage.setItem('monedero',monederousado);
                  CargarPagosElegidos();
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

             app.dialog.close();

        }
      
      }

    }else{
                    app.dialog.close();
                              console.lo('3');

        alerta('','Ingrese una cantidad válida')
      }

  }else{

              app.dialog.close();
          console.log('4');

    alerta('','No cuenta con monedero acumulado');
  }


   
	/*var monederousuario=parseFloat($("#monedero").text());
	var txtcantidad=parseFloat($("#txtcantidad").val());
  var sumatotalapagar=localStorage.getItem('sumatotalapagar');
	if (monederousuario>0) {
	if (txtcantidad!='' &&txtcantidad!=0) {
			if (txtcantidad>monederousuario) {
				 $("#txtadvertencia").text('La cantidad supera el monedero acumulado');
			   alerta('','La cantidad supera el monedero acumulado');

      }else{



        if (txtcantidad>parseFloat(sumatotalapagar)) {
          console.log('1');
          $("#txtadvertencia").text('La cantidad ingresada es mayor al total');
              alerta('','La cantidad ingresada es mayor al total');

        }else{
            if (txtcantidad>0) {
              localStorage.setItem('monedero',txtcantidad);

              CalcularTotales();
             
              $(".monedero").text(formato_numero(txtcantidad,2,'.',','));
              console.log('2');

              $(".btnmonedero .chip-label").text('Revertir');
              $(".btnmonedero").attr('onclick','RevertirMonedero()');

            }

             app.dialog.close();

        }
			
			}

		}else{
                    app.dialog.close();
                              console.lo('3');

				alerta('','Ingrese una cantidad válida')
			}

	}else{

              app.dialog.close();
          console.log('4');

		alerta('','No cuenta con monedero acumulado');
	}*/
	
}

function RevertirMonedero(idpago) {

    var listado=localStorage.getItem('pagos');
    var id_user=localStorage.getItem('id_user');
    var pagina = "RevertirPagosMonedero.php";
    var datos="id_user="+id_user+"&pagos="+listado+"&idpago="+idpago;
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var respuesta=resp.pagos;
      console.log(respuesta);
      localStorage.setItem('pagos',JSON.stringify(respuesta));
     
      var monederousado=resp.monederousado;
      localStorage.setItem('monedero',monederousado);
      CargarPagosElegidos();
      CalcularTotales();
        /*$(".btnmonedero .chip-label").text('Aplicar');
        $(".btnmonedero").attr('onclick','AbrirModalmonedero()');
*/
         },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });

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
    $("#monedero").text(formato_numero(respuesta,2,'.',','));
    $(".monederotxt").text(formato_numero(respuesta,2,'.',','));
    var sumatotalapagar=localStorage.getItem('sumatotalapagar');


   /* if (parseFloat(respuesta)>=parseFloat(sumatotalapagar)) {

      $("#txtcantidad").val(sumatotalapagar);
    }else{
    
      $("#txtcantidad").val(respuesta);

    }*/

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

function HabilitarOpcionespago(idtipodepago,foto,stripe,habilitarcampo,habilitarcampomontofactura,habilitarmercadopago) {


 
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

      $$("#btnpagarnota").prop('disabled',true);

      $$("#btnpagarnota").css('display','none');
      

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
        //$("#btnpagarresumen").attr('disabled',false);

         $$("#btnpagarnota").prop('disabled',false);

         $$("#btnpagarnota").css('display','block');
      

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
function CargarOpcionesTipopago(idtipopago) {

  if($(".opccard")){
      $(".opccard").each(function(){
          $(this).attr('checked',false);

      });
  }

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
     
     	HabilitarOpcionespago(resultado.idtipodepago,resultado.habilitarfoto,resultado.constripe,resultado.habilitarcampomonto,resultado.habilitarcampomontofactura,resultado.habilitarmercadopago);
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
                 
                  <div class="" style="text-align: justify;-webkit-line-clamp: 200;display: inline-block;" >
                    <div style="    padding-left: 1em;padding-right: 1em;padding-top: .2em;padding-bottom: .2em;background: #dfdfdf;border-radius: 10px;font-size:16px;">
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
                  <div>
                      <button  onclick="AbrirModalFotoComprobante()" class="button button-fill botonesaccion botonesredondeado estiloboton" style="margin-top: 1em;background:#4cd964;"> Sube tu comprobante</button>
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


        if (resultado.habilitarmercadopago==1) {

          
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
          localStorage.setItem('clavepublica',resultado.keypublicamercado);
          localStorage.setItem('claveprivada',resultado.keyprivadamercado);
          ObtenerTarjetasMercadopago();
          $(".btnnuevatarjeta").css('display','block');
          $(".btnnuevatarjeta").text('Ingresa datos de tarjeta');

          $(".btnnuevatarjeta").attr('onclick','NuevaTarjetaMercadopago()');

            HabilitarBotonPagar();

         }

         
         CalcularTotales();

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      },
        complete: function() {
        // Ocultar el spinner
        //app.dialog.close();
        }

    });
  }else{
   ObtenerDescuentosRelacionados();
    CalcularTotales();
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


  /*=== Popup Dark ===*/
  var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos: [
    foto,
    ],
    type: 'popup',
    //theme: 'dark',
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

function ValidacionAceptar() {

 return new Promise(function(resolve, reject) {
   var pagina = "ValidacionPagoAceptarServicio.php";
   var iduser = localStorage.getItem('id_user');
   var datos='pagos='+localStorage.getItem('pagos')+"&id_user="+iduser;

    $.ajax({
      url: urlphp+pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
    success: function(res) {
    
     
       
      resolve(res);
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

function ValidacionBuscarasignacion() {

 return new Promise(function(resolve, reject) {
   var pagina = "ValidacionBuscarasignacion.php";
   var iduser = localStorage.getItem('id_user');
   var datos='pagos='+localStorage.getItem('pagos')+"&id_user="+iduser;

    $.ajax({
      url: urlphp+pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
    success: function(res) {
    
     
       
      resolve(res);
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



 app.dialog.confirm('','¿Está seguro  de realizar el pago?' , function () {

   ValidacionBuscarasignacion().then(r=>{
  var noencontrado=0;
      var pagosencontrados=r.pagosencontrados;
      if (pagosencontrados.length>0) {

        for (var i = 0; i < pagosencontrados.length; i++) {
          console.log(pagosencontrados[i].idusuarios_servicios);
          if (pagosencontrados[i].idusuarios_servicios == 'null' || pagosencontrados[i].idusuarios_servicios==null) {

            noencontrado++;
          }
       }
      }

       if (noencontrado==0) {

  ValidacionCargosTutorados().then(r => {
 
 
    if (r.pagosadeudados==0) {

      $$("#btnpagarresumen").attr('onclick','');
      $$("#btnpagarresumen").addClass('disabled-button');
       var respuesta=0;
     var mensaje='';
     var pedido='';
     var informacion='';
   var pagina = "RealizarPago7.php";
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

     console.log(descuentosaplicados);
   var datos='pagos='+localStorage.getItem('pagos')+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestototal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto+"&descuentosmembresia="+JSON.stringify(descuentosmembresia);
      datos+='&confoto='+confoto+"&rutacomprobante="+rutacomprobante+"&comentarioimagenes="+comentarioimagenes;
      datos+='&campomonto='+campomonto+'&montovisual='+montovisual+'&cambiomonto='+cambiomonto;
      datos+='&comisionpornota='+comisionpornota+"&comisionnota="+comisionnota+"&tipocomisionpornota="+tipocomisionpornota;
      datos+='&datostarjeta2='+datostarjeta2+"&monedero="+monedero;
      datos+='&datostarjeta='+datostarjeta;
      datos+='&requierefactura='+requierefactura;
      datos+='&idusuariosdatosfiscales='+idusuariosdatosfiscales;
      datos+='&descuentosaplicados='+JSON.stringify(descuentosaplicados);
    pagina = urlphp+pagina;
    if (bandera==1) {
          $(".dialog-buttons").css('display','none');
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
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

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
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

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
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    
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
                      var mensaje = "Oops, algo no está bien, intenta de nuevo";


                          $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','block');
                          $(".mensajeexito").css('display','none');
                          $(".butonok").css('display','none');
                          $(".butoerror").css('display','block');

                      alerta('',mensaje);
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

                alerta('','Para poder realizar el pago, el tutor debe pagar los pagos acumulados');

              }
        })


  }else{

    GoToPage('listadopagos');
  }

});
  
      },function () {

          
           

});



        
  
         //  });

        
}


function ObtenerDescuentosRelacionados() {
  console.log('descuentos');
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

      if (resultado.length>0) {


            descuentosaplicados=resultado;

      }
     // PintarDescuentos(resultado);
       
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

 }).then(function (value) {

    CargarPagosElegidos();
 });




}

function PintarDescuentos(respuesta) {
   var html="";
  $("#visualizardescuentos").css('display','none');

 if (respuesta.length>0) {
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

 //$("#uldescuentos").append(html);

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



                <span class="dialog-button dialog-button-bold butonok" onclick="VerPagos()" style="display:none;position:static!important;">OK</span>

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

function VerPagos() {
  app.dialog.close();
  GoToPage('pagos');
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
      $$("#btnpagarnota").prop('disabled',true);
      if (seleccion==1) {
          $$("#btnpagarnota").css('display','block');

          $$("#btnpagarnota").prop('disabled',false);
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
                          <p class="text-muted small">$`+pagos[i].monto+`</p>
                          <span class="text-muted small `+claseestatus+`">`+pagos[i].textoestatus+`</span>


                        </div>
                        <div class="col-30">
                        <a id="btncalendario" style=" color: #007aff!important;text-align: center;justify-content: center;display: flex;" onclick="Detallepago(`+pagos[i].idnotapago+`)">Ver detalle</a>
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

      var descuentomem=respuesta.descuentomembresia;
        descuentosmembresia=[];

      if (descuentomem.length>0) {
            descuentosmembresia=descuentomem;

       // PintarDescuentosMembresia(descuentomembresia);
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


 //$("#uldescuentos").append(html);

}

function Detallepago(idnotapago) {
  localStorage.setItem('idnotapago',idnotapago);
  GoToPage('detallepago');
}

 function PintarlistaImagen() {
    var html="";
      localStorage.setItem('comentarioimagenes',arraycomentarios);
      $$("#btnpagarresumen").prop('disabled',true);

     $(".check-list").css('display','none');

      if (localStorage.getItem('rutacomprobante')!=undefined && localStorage.getItem('rutacomprobante')!='') {
     
          var comprobante=localStorage.getItem('rutacomprobante');
          var comprobante1=comprobante.split(',');

     
      if (comprobante1.length) {

        $$("#btnpagarnota").css('display','block');
        $("#btnpagarnota").attr('disabled',false);
   
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
                  localStorage.setItem('sumatotalapagar','');
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
function RequiereFactura2(tipodepagoselegidos) {
    AbrirModalDatos2(tipodepagoselegidos);


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
              $(".btnaceptarfiscal").attr("onclick","Aceptardatofiscal()");


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

function AbrirModalDatos2(tipodepagoselegidos) {
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
    dynamicSheet5 = app.sheet.create({
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

          $(".btnaceptarfiscal").attr("onclick","Aceptardatofiscal()");

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
                  
                    CargartipopagoSeleccionado(tipodepagoselegidos);
                    $(".lidatosfacturaelegido").html('');
                    if(localStorage.getItem('idusuariosdatosfiscales')!=undefined) {
                      localStorage.removeItem('idusuariosdatosfiscales');
                    }

                    CargarOpcionesTipopago(0);
                  }

             

          },
        }
      });

       dynamicSheet5.open();

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
                          <a  style="border-radius: 10px;
                            height: 60px;color: white;display:none;margin-right:1em;margin-left:1em;" class="button button-fill button-large button-raised margin-bottom color-theme btnaceptarfiscal">
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
       $(".btnaceptarfiscal").css('display','block');

      }else{

      $(".btnaceptarfiscal").css('display','none');
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

  if (dynamicSheet5!='') {
    dynamicSheet5.close();
  }

  if (dynamicSheet4!='') {
    dynamicSheet4.close();
  }
  
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
var pagosenmodal=[];

function AbrirModalPagosParaAceptar(pagosporaceptar,posicion) {
  
pagosenmodal=pagosporaceptar;
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               
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
                 <div class="" style="position: absolute;top:2em;width: 100%;">
                  
                    <div class=""> 
                      <div class="block" style="margin-right:1em;margin-left:1em;">`;
                       
                     //  for (var i = 0; i < pagosporaceptar.length; i++) {
                      html+=`

                      <div class="row" style="height:12em;">
                       <div class="col-100">
                       <div class="row" style="margin-top:.5em;">
                    
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick=""><span style="color:black;font-size:18px;"> </span><br><span style="margin-top:.5em;font-size:16px;"></span></span>
                     <span class="text-color-theme size-12" style="text-align:center;"></span>

                     <h3 class="text-muted no-margin-bottom" style="text-align: center;" >`+pagosporaceptar[posicion].concepto+`</h3>
                          
                     <h3 class="fechasservicio" style=" text-align: center;font-weight: bold; 
    color: #919191;font-size: 16px;">`+pagosporaceptar[posicion].fechainicial+` - `+pagosporaceptar[posicion].fechafinal+`</h3>
                         <h4 style="text-align: center;font-size: 18px;" class="">Numero de horarios: <span class="cantidadhorarios">`+pagosporaceptar[posicion].horarios+`</span></h4>  
                           <a class="btncalendario" style="text-align:center;color:#007aff;font-size: 14px;" onclick="VerHorarios(`+pagosporaceptar[posicion].idservicio+`)">Ver horarios
                           </a>


                  </div>
                  <div class="row">
                   <div class="col">
                    <p style="text-align:center;">`+pagosporaceptar[posicion].politicasservicio+`</p></div>
                  </div>
                  
                  <div class="row" style="margin-top:1em;">

                    <div class="col-100" style="text-align:center;">
                    
                    <button class="button button-fill button-large color-theme button-raised margin-bottom-half" id="btnaceptartermino_`+pagosporaceptar[posicion].idpago+`" onclick="AceptarTerminosPago(`+pagosporaceptar[posicion].idpago+`,`+pagosporaceptar.length+`,`+posicion+`)">Aceptar</button>
                      <div style="display:none;">
                       <input type="checkbox" id="check_`+pagosporaceptar[posicion].idpago+`" class="checkaceptar">
                     </div>
                    </div>
                    <div class="col-100">
                    <button class="button button-fill button-large color-theme button-raised margin-bottom-half" id="btnrechazarterminos" onclick="RechazarTerminospago(`+pagosporaceptar[posicion].idusuarios_servicios+`)" style="background:gray;">Rechazar</button>
                    </div>
                  
                                  

                  </div>

                </div>
                  
                </div>

         


                      `;
                     //  }


                
                      html+=`
                             <div class="row" style="margin-top: 100px;">

                   

                </div>

                      <div class="row" style="padding-top: 100px;">
                      <div class="col-100">
                    <button class="button button-fill button-large color-theme button-raised margin-bottom-half" id="btnregresar" onclick="Regresarapagos()" style="background:gray;   ">Regresar a pagos</button>
                    </div>
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
 closeByBackdropClick: false,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
          close:function (sheet) {
            console.log('Sheet close');
           /* var valor=pagosporaceptar.length-1;
            if (posicion<valor) {
              posicion=posicion+1;
              AbrirModalPagosParaAceptar(pagosporaceptar,posicion);
            }*/
          }
        }
      });

       dynamicSheet1.open();
}
function AceptarTerminosPago(idpago,contador,posicion) {
     app.dialog.confirm('','¿Está seguro  de aceptar el servicio?' , function () {

  $("#check_"+idpago).prop('checked',true);
  $("#btnaceptartermino_"+idpago).css('background','#ededed');
    GuardarAceptarTerminosPago(idpago);
    var con=0;
   /* $(".checkaceptar" ).each(function( index ) {
      if($( this ).is(':checked')){

        con++;
      }
    });*/

    dynamicSheet1.close();


           var valor=contador-1;
            if (posicion<valor) {
              posicion=posicion+1;
              AbrirModalPagosParaAceptar(pagosenmodal,posicion);
            }
    
    });

}
function RechazarTerminospago(idusuarios_servicios) {
  PantallaRechazarTerminos2(idusuarios_servicios);


}

function PantallaRechazarTerminos2(idusuarios_servicios) {
   var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                  <label style="font-size:16px;padding:1px;">Motivo:</label>
                  <textarea name="" id="txtcomentariorechazo" cols="30" rows="3"></textarea>
                <span class="mensajemotivo"></span>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Rechazar servicio',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Aceptar',
            },
            
          ],

           onClick: function (dialog, index) {
            if(index === 0){
             
          }
          else if(index === 1){
               RechazarTerminos2(idusuarios_servicios);

            }

        },
          verticalButtons: false,
        }).open();
  
}

function VerHorarios(idservicio) {
 localStorage.setItem('idservicio',idservicio);
  MostrarHorarios();
}

function RechazarTerminos2(idusuarios_servicios) {
  var pagina = "RechazarTerminos.php";
  var id_user=localStorage.getItem('id_user');
  var motivo=$("#txtcomentariorechazo").val();
  var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios+"&motivocancelacion="+motivo;

  if (motivo!='' && motivo.length>=10) {
      app.dialog.close();
      CrearModalEsperaDialog();

  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    success: function(datos){

      if (datos.respuesta==1) {

         $(".mensajeproceso").css('display','none');
             $(".mensajeerror").css('display','none');
             $(".mensajeexito").css('display','block');
             $(".botonok").css('display','block');
        Regresarapagos();
        //alerta('','Operación realizada');
       // GoToPage('home');
      }
      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          $(".mensajeproceso").css('display','none');
                    $(".mensajeerror").css('display','block');
                    $(".mensajeexito").css('display','none');
                    $(".botonok").css('display','block');
      }

    });
  }else{

    alerta('','Para continuar coloque un motivo de rechazo, cantidad mínima de 10 caracteres');
  }
}

function Regresarapagos() {
 dynamicSheet1.close();
 GoToPage('listadopagos');
}

function ContinuarPago() {
  dynamicSheet1.close();
 
}

function GuardarAceptarTerminosPago(idpago) {
   var pagina = "GuardarAceptarTerminosPago.php";
    var datos="idpago="+idpago;
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(resp){
       

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
}

function ContinuarMetodoPago() {
  GoToPage('metodopago');
}
