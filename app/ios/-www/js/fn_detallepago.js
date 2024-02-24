var detalleimagen=[];
function Pintardetallepago() {

	var idnotapago=localStorage.getItem('idnotapago');
	var idusuario=localStorage.getItem('id_user');
	var datos="idnotapago="+idnotapago+"&id_user="+idusuario;
	var pagina = "ObtenerDetallePago.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina, 
		data:datos, 
		async:false,
		success: function(resp){
			var resultado=resp.respuesta[0];
      var subtotalnota=resp.subtotalnota;
      var subtotalcupon=resp.subtotalcupon;
			$("#lblnumeronota").text(resultado.folio);
			$(".lblresumen").text(formato_numero(subtotalnota,2,'.',','));
			$(".lblcomision").text(formato_numero(resultado.comisiontotal,2,'.',','));
			$(".lbltotal").text(formato_numero(resultado.total,2,'.',','));
			$(".lblmonedero").text(formato_numero(resultado.montomonedero,2,'.',','));
			$(".metodopago").text(resultado.tipopago);
      $(".lblcupon").text(formato_numero(subtotalcupon,2,'.',','));
			if (resultado.datostarjeta!='') {
			$(".datostarjeta").html(resultado.datostarjeta);
			$(".infodatostarjeta").append(resultado.datostarjeta2);

			}
      if (resultado.descripcioncupon!=null && resultado.descripcioncupon!='' && resultado.idcupon>0) {

        var cupon=`
          <p style="color: #C7AA6A;text-align:center;font-size:30px;margin:0;" class="cambiarfuente">`+resultado.codigocupon+`</p>
              <p style="color: #C7AA6A;text-align:center;" class="cambiarfuente">Descuento aplicado `+resultado.descripcioncupon+`</p>
        `;

        $(".cuponaplicado").html(cupon);
      }

			if (resultado.requierefactura==1) {


				var html="";
				html+=`<p>
					Razon social: `+resultado.razonsocial+`
					
				</p>`;
				html+=`<p>
					RFC.: `+resultado.rfc+`</p>`;
			html+=`<p>
					Correo.: `+resultado.correo+`</p>`;
			html+=`<p>
					Cod. Postal: `+resultado.codigopostal+`</p>`;
					var imagenes=resultado.imagenconstancia;
					if (imagenes!='') {
  
					var imagen=imagenes.split(',');
					detalleimagen=imagen;
					var htmlimagenes="";
					for (var i = 0; i < imagen.length; i++) {
						        urlimagen=urlphp+`upload/datosfactura/`+imagen[i];

						html+=`
							<div class="row">
		                        <div class="col-20" style="margin:0;padding:0;">
		                          <figure class="avatar   rounded-10">
		                          <img src="`+urlimagen+`" alt="" style="width:60px;height:60px;" onclick="DetalleImagen(`+i+`)">
		                          </figure>
		                        </div>

                       		 </div>

						`;
					}
				}

					$(".datosfiscales").html(html);
				

			}
			var pagos=resp.pagos;

			Pintarpagosdetalle2(pagos);
			 $("#visualizardescuentos").css('display','none');

			var descuentos=resp.descuentos;
			if (descuentos.length>0) {
			Pintardescuentosdetalle(descuentos);	
			}

			var descuentosmembresia=resp.descuentosmembresia;
			if (descuentosmembresia.length>0) {
				Pintardescuentomembresiadetalle(descuentosmembresia);
			}

			var imagenescomprobante=resp.imagenescomprobante;

			if (imagenescomprobante.length > 0) {
				PintarImagenesComprobante(imagenescomprobante);
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

function DetalleImagen(posicion) {
	 urlimagen=urlphp+`upload/datosfactura/`+detalleimagen[posicion];
	   var myPhotoBrowser = app.photoBrowser.create({
       
        photos: [
         urlimagen
            ]
      });
      //Open photo browser on click
      myPhotoBrowser.open();
      $(".popup-close").text('Cerrar');
     $(".popup-close").css('margin-top','100px');
	
}

function Pintarpagosdetalle(listado) {
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
                            <p class="text-muted small" style="font-size:18px;margin:0;" id="concepto_`+listado[i].idpago+`">
                              `+listado[i].concepto+` 
                            </p>
                            <p style="margin:0;">Cantidad: `+listado[i].cantidad+`

                            </p>
                            <p class="text-muted " style="font-size:30px;text-align:right;">$`+formato_numero(listado[i].monto,2,'.',',')+`</p>

                          <input type="hidden" value="`+listado[i].monto+`" class="montopago" id="val_`+listado[i].idpago+`">
                        </div>
                        <div class="col-20">

                        </div>
                    </div>
                 </li>

			`;
		}

		$(".listadopagoselegidos").html(html);

	}

	function Pintarpagosdetalle2(respuesta) {
		// body...
		var html="";
        var numero=respuesta.length;

		for (var i = 0; i <respuesta.length; i++) {

			var color='';
		      if (respuesta[i].monto<0) {
		        color='red';
		      }

         var estilolista="itemcarrito1";
         if (numero % i === 0) {
          estilolista="itemcarrito2";
        }
		imagen=urlimagenes+'paquetes/imagenespaquete/'+codigoserv+respuesta[i].foto;

			/*html+=`
				
			<li class="item-content">
              <div class="item-media">
              <img src="`+imagen+`" alt="" style="width: 80px;border-radius: 10px;"></div>
              <div class="item-inner">
                <div class="row" style="margin-left: 1em;">
                  <div class="col-100">
                    <p style="margin:0;"> `+listado[i].concepto+` </p>
               	
                     <p style="margin:0;">Cantidad: `+listado[i].cantidad+`</p>`;

                     if (listado[i].usuarioespecialista!='' && listado[i].usuarioespecialista!=null) {

                     	html+=`<p style="margin:0;">Especialista: `+listado[i].usuarioespecialista+`</p>`;

                     	html+=`<p style="margin:0;">Fecha: `+listado[i].fecha+`</p>`;
                 

                     }
               html+= `</div>
                     


                            <div class="col-40">
                	<p class="text-muted " style="font-size:20px;margin:0px;">$`+formato_numero(listado[i].monto,2,'.',',')+`</p>

                     <p>
                     </p>
                  </div>

                    </div>	

          
                 </div> </div>

              
            </li>

			`;*/


//itemcarrito1

			 html+=`
          <li class="item-content cambiarfuente `+estilolista+`" style="    margin-top: 1em;
    margin-right: 1em;
    margin-left: 1em;
    border-bottom: 1px solid;
    margin-bottom: 1em;">
            <div class="row" style="margin-bottom: 10px;">
              <div class="col-70">
                <div class="icon-text-container">`;
                if (respuesta[i].servicio==1) {
                  etiqueta="Servicio";
                }

                if (respuesta[i].servicio==0) {
                  etiqueta="Producto";
                }

               html+=`
               <span class="material-icons-outlined">inventory_2
                </span> <p style="margin:0;">`+etiqueta+`: <span class="texto">`+respuesta[i].concepto+`</span>
                </p>

                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                <span class="material-icons-outlined">local_atm</span>
                  <p style="margin:0;">Costo: <span class="texto">$`+respuesta[i].monto+`</span>
                  </p>
                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                 <span class="material-icons-outlined">
                    add_business
                    </span>
                    <p style="margin:0;">
                   
                    Negocio: <span class="texto">`+respuesta[i].titulo+`</span></p>
                     </div>
                    `;

                       if (respuesta[i].servicio==0) {
                      html+=`<p style="margin:0;">Cantidad: `+respuesta[i].cantidad+`</p>`;
                  /* html+=` <p>
                       
                        <div class="stepper stepper-small stepper-init cantidads_`+respuesta[i].idcarrito+`" id="c_`+respuesta[i].idcarrito+`">
                          <div class="stepper-button-minus" style="border:0;" ></div>
                          <div class="stepper-input-wrap" style="border:0;">
                            <input type="text" id="cantidad_`+respuesta[i].idcarrito+`" value="`+respuesta[i].cantidad+`"  min="1" max="100" step="1" readonly />
                          </div>
                          <div class="stepper-button-plus" style="border:0;" ></div>
                        </div>
                     

                    </p>`; */
                  }else{


                    html+=` 
                        <div class="icon-text-container" style="margin-top: 10px;">
                        <span class="material-icons-outlined">supervised_user_circle</span>
                    <p style="margin:0;">Barbero: <span class="texto">`+respuesta[i].usuarioespecialista+`</span></p>
                    </div>
                    `;
                    html+=`
                   <div class="icon-text-container" style="margin-top:10px;">
                     <span class="material-icons-outlined">calendar_month</span>

                     <p style="margin:0;">Fecha/Hora: <span class="texto">`+respuesta[i].fechaformato+`</span></p>

                     </div>
                     `;

                        if (respuesta[i].concortesia==1  ) {


                          if (respuesta[i].idcortesia>0 ) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">`+respuesta[i].nombrepaquetecortesia+`</span></p>

                           </div>`;

                      }


                      if (respuesta[i].idcortesia==0 && respuesta[i].colococortesia==1) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">Ninguna</span></p>

                           </div>`;
                      }

                       /* html+=`
                        <div class="col-100" style="padding-bottom: 1em;
    padding-top: 1em;">
                      <button class="button  color-theme  " style="background:#C7AA6A;padding:10px 20px;" onclick="ObtenerCortesia(`+respuesta[i].idcarrito+`,`+respuesta[i].idpaquete+`)">
                        Cortesia
                       </button>
                     
                     </div>
                      `;*/

                    }else{

                 
          

                    }
                  }

                  

              html+=` </div>
                <div class="col-30">`;

                  if (respuesta[i].precioante!=0) {
                     html+=`
                     <div class="col-100">
                     <p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta[i].precioante+`</p>
                     </div>
                     `;

                  }


                   html+=`
                   <div class="col-100">
                   
                     </div>
                     `;

                 



             html+=` </div>

            </div>
          </li>

        `;
		}


		$(".listadopagoselegidos").html(html);


		
	}


function Pintardescuentosdetalle(respuesta) {
		  var html="";

 if (respuesta[0].length>0) {
    $("#visualizardescuentos").css('display','block');

  for (var i = 0; i <respuesta[0].length; i++) {
    html+=`
     <li class="list-item">
                    <div class="row">
                        <div class="col-80" style="padding: 0;">
                            <p class="text-muted small" style="font-size:18px;" id="">
                            Descuento `+respuesta[0][i].titulo+`
                            </p>
                             <p class="text-muted " style="font-size:30px;text-align:right;">$<span class="lbldescuento">`+formato_numero(respuesta[0][i].montoadescontar,2,'.',',')+`</span></p>

                        </div>
                        <div class="col-20">
                        <span class="chip color-green btncupon" style="display:none;
                                height: 30px;
                                
                                margin-right: 1em;
                                margin-left: 1em;top: 3em;" ><span class="chip-label"></span></span>
                        </div>
                    </div>
                 </li>

	    `;

	  }
	 }


	 $("#uldescuentos").append(html);
	}	
function Pintardescuentomembresiadetalle(respuesta) {
		 var html="";

 if (respuesta[0].length>0) {
    $("#visualizardescuentos").css('display','block');

  for (var i = 0; i <respuesta[0].length; i++) {
    html+=`
     <li class="list-item">
                    <div class="row">
                        <div class="col-80" style="padding: 0;">
                            <p class="text-muted small" style="font-size:18px;" id="">
                            Descuento `+respuesta[0][i].titulo+`
                            </p>
                             <p class="text-muted " style="font-size:30px;text-align:right;">$<span class="lbldescuento">`+formato_numero(respuesta[0][i].montoadescontar,2,'.',',')+`</span></p>

                        </div>
                        <div class="col-20">
                        <span class="chip color-green btncupon" style="display:none;
                                height: 30px;
                                
                                margin-right: 1em;
                                margin-left: 1em;top: 3em;" ><span class="chip-label"></span></span>
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

	function PintarImagenesComprobante(respuesta) {
		var html="";
		if (respuesta.length>0) {


			for (var i = 0; i <respuesta.length; i++) {
                var ruta=urlphp+`upload/comprobante/`+respuesta[i].rutacomprobante;
				/*html+=`

			<li>
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
	               		 </div>
	                	</div>
                	</label>
                </li>

				`;*/
				visible="display:none;";
				if (respuesta[i].comentario!='' && respuesta[i].comentario!=null) {
					visible="display:block;";
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
                   
                  
                  </div>
                </div>
              </div>

              <div class="row">
              <div style="`+visible+`">
                  <span style="font-weight:bold;vertical-align:text-top;margin-right: 4px;" id="comentariocomprobante_`+i+`">

                         Comentario:
                  </span>
                 <span style="color:#757575;" id="textocomprobante_`+i+`">`+respuesta[i].comentario+`</span>
           
               </div>
              </div>

               </div>
              </div>
            </div>


				`;
			}
		}

		$("#lista-imagenescomprobante").html(html);
	}