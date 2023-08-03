function VerMovimientosMonedero() {
	GoToPage('monedero');
}

function ObtenerMovimientosMonedero() {
	
	var pagina = "ObtenerMovimientosMonedero.php";
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
		success: function(resp){

			PintarMovimientos(resp.respuesta);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

}
function PintarMovimientos(respuesta) {
	var html="";
	var tipo = ['ABONO','CARGO'];
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			var colocar="";
			var tipoarray=respuesta[i].tipo;
			if (tipoarray==0) {
				colocar='+';
				color="#4fab2a";
			}	
			if (tipoarray==1) {
				colocar='-';
				color="black";

			}

			html+=`
				<div style="margin-top: 1em;margin-bottom: 1em;
    padding-top: 10px;
    padding-bottom: 10px;" onclick="" class="estilomonedero row">
								

								<div class="col-30">
									<div class="" style="display: flex;
    justify-content: center;
    margin: 10%;">
                                    <a class="iconomonedero">

									<i class="bi-wallet2"></i>
								    </a>
                                  </div>
								</div>


								<div class="col-70">
								<div class="">
									<div class="">
									<p style="margin:0;margin-left: 5px;">`+respuesta[i].concepto+`</p>`;
									if (respuesta[i].folio!=null) {
									html+=`<p style="margin:0;margin-left: 5px;">#`+respuesta[i].folio+`</p>`;
										}
									html+=`<p style="margin:0;margin-left: 5px;font-weight: 600;"> <span style="color:`+color+`">`+colocar+` $`+respuesta[i].monto+`</span></p>
									<p style="margin:0;margin-left: 5px;">`+respuesta[i].fecha+`</p>

                					<p style="margin:0;margin-left: 5px;"></p>

									</div>
									</div>
									<div class="item-subtitle"></div>
									<div class="item-text"></div>
								</div>
								</div>
																
							

			`;
		}

		$(".divmonedero").html(html);
	}


}