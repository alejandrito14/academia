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
			$("#lblnumeronota").text(resultado.folio);
			$(".lblresumen").text(formato_numero(resultado.subtotal,2,'.',','));
			$(".lblcomision").text(formato_numero(resultado.comisiontotal,2,'.',','));
			$(".lbltotal").text(formato_numero(resultado.total,2,'.',','));
			$(".monedero").text(formato_numero(resultado.montomonedero,2,'.',','));
			$(".metodopago").text(resultado.tipopago);
			if (resultado.datostarjeta!='') {
			$(".datostarjeta").html(resultado.datostarjeta);
			$(".infodatostarjeta").append(resultado.datostarjeta2);

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
			Pintarpagosdetalle(pagos);
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
                            <p class="text-muted small" style="font-size:18px;" id="concepto_`+listado[i].idpago+`">
                              Pago de `+listado[i].concepto+`
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