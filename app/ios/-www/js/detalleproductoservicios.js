var subcategoriascache=[];
var totalelementos=0;
let iniciocon2=0;
let idsucursalalmacenada=0;
/*
function ObtenerCategoriasProductodetalle(argument) {
	var pagina = "ObtenerCategoriasProducto.php";
	var id_user=localStorage.getItem('id_user');
	var datos="iduser="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;
			idcategoriapadre=0;
			if (respuesta.length>0) {

				PintarCategoriaProductodetalle(respuesta);
				ObtenerProductosSinCategoriaDetalle();

			}else{

				ObtenerProductos();
			}

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

}*/

function  PintarCategoriaProductodetalle(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {

			if (respuesta[i].foto!=null) {
					imagen=urlimagenes+`categoriapaquete/imagenescategoria/`+codigoserv+respuesta[i].foto;
	
				}else{

					imagen=localStorage.getItem('logo');
				}
		


		var funcion="";
		if (respuesta[i].sub>0) {
  					
  					funcion="DetalleSubCategoriadetalle("+respuesta[i].idcategoriapaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleCategoriaProducto("+respuesta[i].idcategoriapaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta cambiarfuente" style="width:100%;" id="tarjeta_`+respuesta[i].idcategoriapaquete+`" onclick="`+funcion+`">
		          <div class="card demo-card-header-pic" style="border-radius: 10px;">`;
		         
		       
		        html+=`  <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;" 
		          class="card-header align-items-flex-end"></div>

		        <div class="" style="display: flex;
    justify-content: center;
    align-items: center;text-align: center;height: 50px;background:#C7AA6A;font-size: 16px;    
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;">
   				 <p style="margin:0px;text-align:center;color: white;

   				 ">`+respuesta[i].nombre;
			    
			       html+=` </p>`;

			     

		html+=`	</div>
		      </div>
		      </div>
			`;
		}
	}

	$(".divproductosservicios").append(html);
}



function ObtenerProductosSinCategoriaDetalle() {
	var pagina = "ObtenerProductosSinCategoria.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var datos="iduser="+id_user+"&idsucursal="+idsucursal;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;
			PintarProductosSinCategoriaDetalle(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarProductosSinCategoriaDetalle(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		var estiloimagen="";
		if (respuesta[i].foto!=null) {
				imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+respuesta[i].foto;
	
			}else{
			estiloimagen="opacity:0.2;"

				imagen=localStorage.getItem('logo');
			}
		

		var funcion="";
		if (respuesta[i].servicio==1) {
  					
  					funcion="DetalleServicioCalendario("+respuesta[i].idpaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleProducto("+respuesta[i].idpaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta cambiarfuente" style="width:50%;margin-bottom: 10px;" id="tarjeta_`+respuesta[i].idpaquete+`">
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

			      	if (respuesta[i].preciofijo!=0 && respuesta[i].precioventa!=null) {
			       		precioante=respuesta[i].precioventa;

			       		html+=`<a class="precioanterior">`+precioante+`</a>`;
			       	}


			      	

		        html+=`  <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;`+estiloimagen+`" onclick="`+funcion+`"
		          class="card-header align-items-flex-end"></div>

		        <div class="" style="text-align: center;height: 45px;justify-content: center;
    display: flex;">
   				 <p style="" class="nombrepaquetes">`+respuesta[i].nombrepaquete;
			    
			       html+=` </p>`;

			       if (respuesta[i].servicio==0) {
			       	var precio=0;
			       	if (respuesta[i].preciofijo!=0 && respuesta[i].precioventa!=null) {
			       		precio=respuesta[i].preciofijo;
			       	}else{
			       		precio=respuesta[i].precioventa;
			       	}
			      html+=` <span style="" class="preciopaqueteestilo">$`+precio+`</span>`;
    				

    				}else{

    					html+=`<p></p>`;
    				}

		html+=`	</div>
		      </div>
		      </div>
			`;
		}
	}


	$(".divproductosservicios").append(html);
}



function PintarProductosConCategoriadetalle(respuesta,div) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			var estiloimagen="";
		if (respuesta[i].foto!=null) {
					imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+respuesta[i].foto;

				}else{
				estiloimagen="opacity:0.2;"

				imagen=localStorage.getItem('logo');
				}


		var funcion="";
				if (respuesta[i].servicio==1) {
					$(".title2").text('Escoge un servicio');
  					
  					funcion="DetalleServicioCalendario("+respuesta[i].idpaquete+")";
						
			      
			      	}else{
			     	$(".title2").text('Escoge un producto');

			      		 funcion="DetalleProducto("+respuesta[i].idpaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta cambiarfuente contadortarjeta2" style="width:100%;margin-bottom: 10px;" id="tarjeta_`+respuesta[i].idpaquete+`">
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

			      	 if (respuesta[i].preciofijo!=0 && respuesta[i].preciofijo!=null) {
			       		precioante=respuesta[i].precioventa;
			       		respuesta[i].precioventa=respuesta[i].preciofijo;
			       		html+=`<a class="precioanterior">`+precioante+`</a>`;
			       	}



		        html+=`  <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;`+estiloimagen+`" onclick="`+funcion+`"
		          class="card-header align-items-flex-end"></div>

		        <div class="" style="display: flex;
    				justify-content: center;
    				align-items: center;
    				text-align: center;
    				height: 50px;
    				background: #C7AA6A;
    				font-size: 18px;
    				border-bottom-left-radius: 10px;
    				border-bottom-right-radius: 10px;" onclick="`+funcion+`">
   				 <p style="margin:0px;text-align:center;color: white;" >`+respuesta[i].nombrepaquete;
			   	html+=` <span style="" class="preciopaqueteestilo2">$`+respuesta[i].precioventa+`</span>`;

			    html+=` </p>`;

			       //if (respuesta[i].servicio==0) {
    				/*}else{

    					html+=`<p></p>`;
    				}*/

		html+=`	</div>
		      </div>
		      </div>
			`;
		}
	}


	
	$("."+div).append(html);
		
	
}

function DetalleSubCategoriadetalle(idcategoria) {
	
	localStorage.setItem('idcategoria',idcategoria);
	GoToPage('subcategoriasdetalle');
}

function DetalleCategoriaProducto(idcategoria) {
	localStorage.setItem('idcategoriaseleccionada',idcategoria)
	localStorage.setItem('idcategoriaproducto',idcategoria);
	GoToPage('productoscategoriadetalle');
}

//aqui
function ObtenerProductosCategoriasdetalle(div) {
	var inicio=0;

	var pagina = "ObtenerProductosCategoriaPaginado.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoriaproducto');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio="+inicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			PintarProductosConCategoriadetalle(respuesta,div);
			iniciocon2=resp.inicio;
			totalelementos=resp.totalelementos;
	

			 idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);

			if (idcategoriapadre>0) {
			//	localStorage.setItem('idcategoria',idcategoriapadre);
			}
		}

		var contadortarjeta2=$(".contadortarjeta2").length;

		if (totalelementos>contadortarjeta2) {
			var html=`
				 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       			<div class="preloader infinite-scroll-preloader"></div>
				<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
					<button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasProductos('`+div+`')">
				Cargar más ...</button>
				</div>
						`;
				$(".btnproductomas").append(html);

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


function CargarmasProductos(div) {

	$(".cargandopre").show();
	$(".infinite-scroll-preloader").show();
	setTimeout(() => {
	
	var pagina = "ObtenerProductosCategoriaPaginado.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoriaproducto');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio="+iniciocon2;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			

			PintarProductosConCategoriadetalle(respuesta,div);
			iniciocon2=resp.inicio;
			totalelementos=resp.totalelementos;
			llegoAlFinalp=false;

			//var idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);

			if (idcategoriapadre>0) {
			//	localStorage.setItem('idcategoria',idcategoriapadre);
			}
		}

		$(".cargandopre").hide();
		$(".infinite-scroll-preloader").hide();


		var contadortarjeta2=$(".contadortarjeta2").length;
//aqui

		if (totalelementos==contadortarjeta2) {
			
			$(".btnproductomas").remove();

			}

		


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

		//}
	}, 2000);
}

function ObtenerProductosCategoriasdetalleresp(div) {

	var pagina = "ObtenerProductosCategoria.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoriaproducto');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			PintarProductosConCategoriadetalle(respuesta,div);

			//var idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);

			if (idcategoriapadre>0) {
			//	localStorage.setItem('idcategoria',idcategoriapadre);
			}
		}
		
		/*	var nombrecate=resp.categoria.nombre;
			$(".titlecatalogo").text(nombrecate);
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

function ObtenerSubCategoriasdetallepaginado(idpagina) {
	var pagina = "ObtenerSubCategoriaspaginado.php";
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="idcategoria="+idcategoria;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;
			var categoriapadre=resp.idcategoriapadre;
			var categoria=resp.categoria.nombre;
			idcategoriapadre=categoriapadre;

			var cateservicio=resp.categoria.servicio;

				if (cateservicio==0) {

					$(".title2").text('Escoge un producto');
				}else{

					$(".title2").text('Escoge un servicio');
				}
			if (respuesta.length>0) {
				//console.log('sub y productos');
				PintarSubCategoriaProductodetalle(respuesta);
				var div="divsub";
				//ObtenerProductosCategoriasdetalle(div);
				localStorage.setItem('idcategoria',categoriapadre);

			/*$(".titlecatalogosub").text(categoria);
			$(".titlecatalogosub").css('display','block');
*/

			}else{
				console.log('productos'+ categoriapadre);

				localStorage.setItem('idcategoria',categoriapadre);
				var div="divproductosservicios";
				ObtenerProductosCategoriasdetalle(div);
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

  let iniciocon = 0;
  let cantidad = 10; // Puedes ajustar la cantidad según tus necesidades
  let categoriasCargadas = [];
  let totalelementossubcategoria=0;
function ObtenerSubCategoriasdetalle(inicio) {


	var pagina = "ObtenerSubCategoriasPaginado.php";
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="idcategoria="+idcategoria+"&inicio="+inicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;
			var categoriapadre=resp.idcategoriapadre;
			var categoria=resp.categoria.nombre;
			idcategoriapadre=categoriapadre;
			iniciocon=resp.inicio;
			totalelementossubcategoria=resp.totalelementos;
			var cateservicio=resp.categoria.servicio;

			categoriasCargadas=respuesta;
			llegoAlFinal=false;
				if (cateservicio==0) {

					$(".title2").text('Escoge un producto');
				}else{

					$(".title2").text('Escoge un servicio');

				}
			if (respuesta.length>0) {
				//console.log('sub y productos');
				PintarSubCategoriaProductodetalle(respuesta);
				var div="divsub";

				var categoriacantidad=respuesta.length;
				var contador=$(".contadortarjeta").length;

				if (totalelementossubcategoria>contador) {						var html=`
						 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       					<div class="preloader infinite-scroll-preloader"></div>
						<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
						         	 <button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasSubCategorias()">
						        	 Cargar más ...</button>
						     		 </div>
						`;
						$(".btnmassub").append(html);



				}
				//localStorage.setItem('idcategoriaproducto',categoriapadre);

				//ObtenerProductosCategoriasdetalle(div);
				//localStorage.setItem('idcategoria',categoriapadre);

			/*$(".titlecatalogosub").text(categoria);
			$(".titlecatalogosub").css('display','block');
*/

			}else{
				console.log('productos'+ categoriapadre);

				//localStorage.setItem('idcategoria',categoriapadre);
				var div="divproductosservicios";
				ObtenerProductosCategoriasdetalle(div);
			}



			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	//}
	
}



function PintarSubCategoriaProductodetalle(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		
		imagen=urlimagenes+`categoriapaquete/imagenescategoria/`+codigoserv+respuesta[i].foto;
		var funcion="";
		if (respuesta[i].sub>0) {
  					
  					funcion="DetalleSubCategoriadetalle("+respuesta[i].idcategoriapaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleCategoriaProducto("+respuesta[i].idcategoriapaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta contadortarjeta cambiarfuente" style="width:100%;" id="tarjeta_`+respuesta[i].idcategoriapaquete+`" onclick="`+funcion+`">
		          <div class="card demo-card-header-pic" style="border-radius: 10px;">`;
		         
		       
		        html+=`  <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;" 
		          class="card-header align-items-flex-end"></div>

		        <div class="" style="display: flex;
    justify-content: center;
    align-items: center;text-align: center;height: 50px;background:#C7AA6A;font-size: 18px;   
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;">
   				 <p style="margin:0px;text-align:center;color: white;">`+respuesta[i].nombre;
			    
			       html+=` </p>`;

			     

		html+=`	</div>
		      </div>
		      </div>
			`;
		}
	}

	if ($(".divsub")) {
		
		$(".divsub").append(html);
	}else{
		$(".divproductosservicios").append(html);
	}
	
//CargarEventoScroll();
	
}

function CargarmasSubCategorias() {

	$(".cargandopre").show();
	$(".infinite-scroll-preloader").show();

	setTimeout(() => {
	var pagina = "ObtenerSubCategoriasPaginado.php";
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="idcategoria="+idcategoria+"&inicio="+iniciocon;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;
			var categoriapadre=resp.idcategoriapadre;
			var categoria=resp.categoria.nombre;
			idcategoriapadre=categoriapadre;
			iniciocon=resp.inicio;
			totalelementossubcategoria=resp.totalelementos;
			var cateservicio=resp.categoria.servicio;

		
				if (cateservicio==0) {

					$(".title2").text('Escoge un producto');
				}else{

					$(".title2").text('Escoge un servicio');

				}
			if (respuesta.length>0) {
				//console.log('sub y productos');
				PintarSubCategoriaProductodetalle(respuesta);
				var div="divsub";

				$(".cargandopre").hide();
				$(".infinite-scroll-preloader").hide();

				var contador=$(".contadortarjeta").length;
				if (totalelementossubcategoria==contador) {
					$(".btnmassub").remove();
				}				

				//localStorage.setItem('idcategoriaproducto',categoriapadre);

				//ObtenerProductosCategoriasdetalle(div);
				//localStorage.setItem('idcategoria',categoriapadre);

			/*$(".titlecatalogosub").text(categoria);
			$(".titlecatalogosub").css('display','block');
*/

			}else{
				console.log('productos'+ categoriapadre);

				//localStorage.setItem('idcategoria',categoriapadre);
				var div="divproductosservicios";
				ObtenerProductosCategoriasdetalle(div);
			}



			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	//}
}, 2000);
}



function ConsultarCategoriaPadre(argument) {
	// body...
}

function DetalleServicioCalendario(idpaquete) {
		localStorage.setItem('idpaquete',idpaquete);
		//GoToPage('detalleservicio');
		//Disponilidadfecha2();
		GoToPage('seleccionarfecha');
		// ObtenerListadoEspecialista();
}
var llegoAlFinal = false;

function CargarEventoScroll(argument) {
	$$('.infinite-scroll-preloader').hide();

	var lastScrollTop=0;
	var pos=0;
/*	$$(document).on('scroll', '.page-content', function(){
		

    var scrollHeight = $$('.infinite-scroll').prop('scrollHeight');
    var scrollTop = $$(this).scrollTop();
    var windowHeight = $$(this).height();

*/
    var totalelementoslista=$(".contadortarjeta").length;
	    if (totalelementos==totalelementoslista) {
			$$('.infinite-scroll-preloader').remove();
	   		$$(".cargandopre").remove();
		
			llegoAlFinal = true;
	   
	    }else{

	    	
	    if (!llegoAlFinal) {
	    	   $$('.infinite-scroll-preloader').show();
   			   $$(".cargandopre").show();
	        llegoAlFinal = true;
	        setTimeout(() => {
  

	        // Llama a tu función aquí una vez que llegues al final
	        ObtenerSubCategoriasdetalle(iniciocon);
	       	$$('.infinite-scroll-preloader').hide();
		   	$$(".cargandopre").show();
	
			}, 2000);
	    }

	}

	/*},true);*/

}



var llegoAlFinalp = false;

function CargarEventoScrollProducto(argument) {
	$$('.infinite-scroll-preloader').hide();
   	$$(".cargandopre").hide();

	var lastScrollTop=0;
	var pos=0;
	//$$(document).on('scroll', '.page-content', function(){


    var scrollHeight = $$('.infinite-scroll2').prop('scrollHeight');
    var scrollTop = $(this).scrollTop();
   // var scrollTop = $$('.page-content').offset().top;
    var windowHeight = $$(this).height();
			    	//$(".scroll").html('<p>'+scrollHeight+'-'+scrollTop+'=='+windowHeight+'</p>');


    var totalelementoslista=$(".contadortarjeta2").length;
	   
    console.log('totalelementoslista'+totalelementoslista+' '+'totalelementos'+totalelementos);
	    if (totalelementos==totalelementoslista) {
			$$('.infinite-scroll-preloader').remove();
	   		$$(".cargandopre").remove();
		
			llegoAlFinalp = true;
	   
	    }else{
	    	//$(".scroll").html('<p>'+llegoAlFinalp+' '+scrollHeight+'-'+Math.trunc(scrollTop)+'=='+Math.trunc(windowHeight)+'</p>');
	    	
	    if (!llegoAlFinalp ) {
	    	   $$('.infinite-scroll-preloader').show();
   			   $$(".cargandopre").show();
	        llegoAlFinalp = true;
	       // alert('entro');
	        setTimeout(() => {
  

	        // Llama a tu función aquí una vez que llegues al final
	        ObtenerProductosCategoriasdetalle2('divproductosservicios2',iniciocon2);
	       	$$('.infinite-scroll-preloader').hide();
		   	$$(".cargandopre").show();
	
			}, 2000);
	    }

	}

	//},true);

}


function ObtenerProductosCategoriasdetalle2(div,inicio) {

	var pagina = "ObtenerProductosCategoriaPaginado.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoriaproducto');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio="+inicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			

			PintarProductosConCategoriadetalle(respuesta,div);
			iniciocon2=resp.inicio;
			totalelementos=resp.totalelementos;
			llegoAlFinalp=false;

			//var idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);

			if (idcategoriapadre>0) {
			//	localStorage.setItem('idcategoria',idcategoriapadre);
			}
		}
		
		/*	var nombrecate=resp.categoria.nombre;
			$(".titlecatalogo").text(nombrecate);
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