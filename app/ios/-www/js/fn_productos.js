function ObtenerProductos() {
	var idsucursal=localStorage.getItem('idsucursal');
	var iduser=localStorage.getItem('id_user');
	var pagina = "ObtenerListadoPaquetes.php";
	var datos="idsucursal="+idsucursal+"&iduser="+iduser;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			
			var respuesta=datos.respuesta;
			PintarProductos(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarProductos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		
		imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+respuesta[i].foto;
		var funcion="";
		if (respuesta[i].servicio==1) {
  					
  					funcion="DetalleServicio("+respuesta[i].idpaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleProducto("+respuesta[i].idpaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta" onclick="`+funcion+`" style="width:50%;" id="tarjeta_`+respuesta[i].idpaquete+`">
		          <div class="card demo-card-header-pic" style="border-radius: 10px;">`;
		         
		         var classe="";

		           if (respuesta[i].favorita==1) {
		           	classe="favorito";
		           }


		           html+=` <a onclick="PaqueteFavorito(`+respuesta[i].idpaquete+`,`+respuesta[i].favorita+`)" class="link `+classe+`" style="z-index: 1000;position: absolute;right: 0;margin: 1em;" id="paquete_`+respuesta[i].idpaquete+`">`;
			        	
			        
						 favorito=`<span class="material-icons-outlined " style="color:gray;">favorite_border</span>`;
                        if (respuesta[i].favorita==1) {

                        favorito=`<span class="material-icons-outlined colorred">favorite</span>`;


                        }
  

			      html+=favorito+`  </a>`;

			      	

		        html+=`  <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;" 
		          class="card-header align-items-flex-end"></div>

		        <div class="" style="display: block;text-align: center;height: 50px;">
   				 <p style="margin:0px;text-align:center;">`+respuesta[i].nombrepaquete;
			    
			       html+=` </p>`;

			       if (respuesta[i].servicio==0) {
			      html+=` <p style="margin:0;text-align:center;color:white;    font-size: 14px;
    font-weight: bold;    margin: auto;
    width: 80px;background:black;margin:auto;width:100px;border-radius: 10px;">$`+respuesta[i].precioventa+`</p>`;
    				}else{

    					html+=`<p></p>`;
    				}

		html+=`	</div>
		      </div>
		      </div>
			`;
		}
	}

	$(".divproductosservicios").html(html);
}

function PaqueteFavorito(idpaquete,valor) {


			$("#paquete_"+idpaquete).html('');

			var favorito="";
			if ($("#paquete_"+idpaquete).hasClass('favorito')) {
			
			$("#paquete_"+idpaquete).removeClass('favorito');
				favorito=`<span class="material-icons-outlined " style="color:gray;">favorite_border</span>`;

				valor=0;

			}else{

				
			 favorito=`<span class="material-icons-outlined colorred">favorite</span>`;

				$("#paquete_"+idpaquete).addClass('favorito');
			
				valor=1;
			}
			$("#paquete_"+idpaquete).html(favorito);
			

	var pagina = "ColocarFavorito.php";
	var id_user=localStorage.getItem('id_user');
	var datos="idpaquete="+idpaquete+"&iduser="+id_user+"&valor="+valor;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){


			//ObtenerProductos();
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function DetalleProducto(idpaquete) {
	
	localStorage.setItem('idpaquete',idpaquete);
	GoToPage('detallepaquete');

}

function DetalleServicio(idpaquete) {
		localStorage.setItem('idpaquete',idpaquete);
		//GoToPage('detalleservicio');
		//Disponilidadfecha2();
		
		  var promesa=Verificarfechashorarios();
        	 promesa.then(r => {
         	if (r.length>0) {

         			GoToPage('seleccionarhorario');
	
         	}else{

         		var aviso='Horarios no disponibles';
         		AbrirModalAviso(aviso);
         	}

	});
		// ObtenerListadoEspecialista();
}

function Verificarfechashorarios(argument) {
    return new Promise(function(resolve, reject) {

  var fecha=localStorage.getItem('fecha');
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');
  var idespecialista=0;
  var datos="fecha="+fecha+"&idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&iduser="+iduser;
  var pagina = "ObtenerDisponibilidadPaqueteEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var respuesta=resp.intervalos;
      arrayhorarios=respuesta;
       //calendarInline.close();
     // app.preloader.hide();
      localStorage.setItem('fecha',fecha);
      if (respuesta.length>0) {
       // alerta('','Se encontraron horarios disponibles');
      }

      resolve(respuesta);

     // PintarIntervalos2(respuesta);
     
      
      //resolve(respuesta);
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
