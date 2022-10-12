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
			$(".lblresumen").text(resultado.subtotal);
			$(".lblcomision").text(resultado.comisiontotal);
			$(".lbltotal").text(resultado.total);
			$(".monedero").text(resultado.montomonedero);
			$(".metodopago").text(resultado.tipopago);
			if (resultado.datostarjeta!='') {
			$(".datostarjeta").html(resultado.datostarjeta);
			$(".infodatostarjeta").append(resultado.datostarjeta2);

			}
			var pagos=resp.pagos;
			Pintarpagosdetalle(pagos);
			var descuentos=resp.descuentos;
			if (descuentos.length>0) {
			Pintardescuentosdetalle(descuentos);	
			}

			var descuentosmembresia=resp.descuentosmembresia;
			if (descuentosmembresia.length>0) {
				Pintardescuentomembresiadetalle(descuentosmembresia);
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

function Pintarpagosdetalle(listado) {
	var html="";
for (var i = 0; i <listado.length; i++) {
			html+=`
				<li class="list-item">
                    <div class="row">
                        <div class="col-80" style="padding:0;">
                            <p class="text-muted small" style="font-size:18px;" id="concepto_`+listado[i].idpago+`">
                              Pago de `+listado[i].concepto+`
                            </p>
                            <p class="text-muted " style="font-size:30px;text-align:right;">$`+listado[i].monto+`</p>

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
	 }else{
	  $("#visualizardescuentos").css('display','none');
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