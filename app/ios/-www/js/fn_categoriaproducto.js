

function ObtenerCategoriasProducto() {
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
			if (respuesta.length>0) {

				PintarCategoriaProducto(respuesta);
				ObtenerProductosSinCategoria();

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
}

function PintarCategoriaProducto(respuesta) {
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
  					
  					funcion="DetalleSubCategoria("+respuesta[i].idcategoriapaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleCategiaProducto("+respuesta[i].idcategoriapaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta" style="width:100%;" id="tarjeta_`+respuesta[i].idcategoriapaquete+`" onclick="`+funcion+`">
		          <div class="card demo-card-header-pic" style="border-radius: 10px;">`;
		         
		       
		        html+=`  <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;" 
		          class="card-header align-items-flex-end"></div>

		        <div class="" style="display: flex;
    justify-content: center;
    align-items: center;text-align: center;height: 50px;background:#C7AA6A;font-size: 18px;    
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

	$(".divproductosservicios").html(html);


		if (totalelementoscategoriacalendario>categoriascache4.length) {
						var html=`
						 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       					<div class="preloader infinite-scroll-preloader"></div>
						<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
						         	 <button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasCategorias2()">
						        	 Cargar más ...</button>
						     		 </div>
						`;
						$(".btnpcatmas").append(html);



					}
}

function CargarmasCategorias2() {
	
$$('.infinite-scroll-preloader').show();
$$('.cargandopre').show();
 setTimeout(() => {
	var pagina = "ObtenerListaFiltroMostrar2.php";
	var id_user=localStorage.getItem('id_user');
	var idsucursal=localStorage.getItem('idsucursal');
	var datos="iduser="+id_user+"&idsucursal="+idsucursal+"&inicio="+iniciocategoriacalendario;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;
			 totalelementoscategoriacalendario=resp.totalelementos;
			 iniciocategoriacalendario=resp.inicio;
			
			if (respuesta.length>0) {
			categoriascache.push(respuesta);
			console.log(respuesta);
			PintarCategoriaProductodetalle(respuesta);
				//ObtenerProductosSinCategoriaDetalle();
				$$('.infinite-scroll-preloader').hide();
				$$('.cargandopre').hide();
				var ele=$(".tarjeta").length;
				if (totalelementoscategoriacalendario==ele) {
					$(".btnpcatmas").hide();
				}


			}else{

				//ObtenerProductos();
			}

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	}, 2000);
}

function ObtenerProductosSinCategoria() {
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
			PintarProductosSinCategoria(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarProductosSinCategoria(respuesta) {
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
  					
  					funcion="DetalleServicio("+respuesta[i].idpaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleProducto("+respuesta[i].idpaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta" style="width:50%;margin-bottom: 10px;" id="tarjeta_`+respuesta[i].idpaquete+`">
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



function PintarProductosConCategoria(respuesta,div) {
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
  					
  					funcion="DetalleServicio("+respuesta[i].idpaquete+")";
						
			      
			      	}else{
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

		        <div  onclick="`+funcion+`" class="" style="display: flex;
    				justify-content: center;
    				align-items: center;
    				text-align: center;
    				height: 50px;
    				background: #C7AA6A;
    				font-size: 18px;
    				border-bottom-left-radius: 10px;
    				border-bottom-right-radius: 10px;">
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


	//aquiconsole.log('pro'+totalelementosproducto);
	if (totalelementosproducto2>categoriascache5[0].length) {
			var html=`
				 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       			<div class="preloader infinite-scroll-preloader"></div>
				<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
					<button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasProductos2('`+div+`')">
				Cargar más ...</button>
				</div>
						`;
				$(".btnproductomas2").html(html);

			}
		
	
}

function CargarmasProductos2(div) {
	$(".cargandopre").show();
	$(".infinite-scroll-preloader").show();
	setTimeout(() => {
	
	var pagina = "ObtenerProductosCategoria.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio="+inicioconproducto;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			//PintarProductosConCategoriadetalle(respuesta,div);
			inicioconproducto=resp.inicio;
			totalelementosproducto2=resp.totalelementos;
			

			//var idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {

				for (var i = 0; i <respuesta.length; i++) {
					categoriascache5[0].push(respuesta[i]);
				}
			 	PintarProductosConCategoria(respuesta,div);
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);
				$(".cargandopre").hide();
				$(".infinite-scroll-preloader").hide();

			
		}

		

		var contadortarjeta2=$(".contadortarjeta2").length;
//aqui

		if (totalelementosproducto2==contadortarjeta2) {
			
			$(".btnproductomas2").remove();

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

function DetalleSubCategoria(idcategoria) {
	localStorage.setItem('idcategoria',idcategoria);
	GoToPage('subcategorias');
}

function DetalleCategiaProducto(idcategoria) {
	localStorage.setItem('idcategoria',idcategoria);
		
//AQUI 

if (categoriascache5.length>0) {

		var idcategoriaarray=categoriascache5[0][0].iddepende;

		if (idcategoriaarray!=idcategoria) {

			categoriascache5=[];
		}
	}


	if (categoriascache5.length>0) {

				GoToPage('productoscategoria');


	}else{

	var pagina = "ObtenerProductosCategoria.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio=0";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
		var respuesta=resp.respuesta;

			//PintarProductosConCategoriadetalle(respuesta,div);
			inicioconproducto=resp.inicio;
			totalelementosproducto2=resp.totalelementos;
	

			 idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);

			if (idcategoriapadre>0) {
			//	localStorage.setItem('idcategoria',idcategoriapadre);
			}
		}

		var contadortarjeta2=$(".contadortarjeta2").length;


			if (categoriascache5.length==0) {
				categoriascache5.push(respuesta);
				
				console.log(categoriascache5);
				GoToPage('productoscategoria');

				return 0;
			}
			//GoToPage('productoscategoria');

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
	
}

function ObtenerProductosCategorias(div) {

	var pagina = "ObtenerProductosCategoria.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			PintarProductosConCategoria(respuesta,div);

			//var idcategoriapadre=resp.idcategoriapadre;
			idcategoriapadre=resp.idcategoriapadre;
			if (idcategoriapadre>0) {
				localStorage.setItem('idcategoria',idcategoriapadre);
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

function ObtenerSubCategorias() {
	var pagina = "ObtenerSubCategorias.php";
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
			if (respuesta.length>0) {
				//console.log('sub y productos');
				PintarSubCategoriaProducto(respuesta);
				var div="divsub";
				ObtenerProductosCategorias(div);
				//localStorage.setItem('idcategoria',categoriapadre);

			/*$(".titlecatalogosub").text(categoria);
			$(".titlecatalogosub").css('display','block');
*/

			}else{
				console.log('productos');

				localStorage.setItem('idcategoria',categoriapadre);
				var div="divproductosservicios";
				ObtenerProductosCategorias(div);
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

function PintarSubCategoriaProducto(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		
		imagen=urlimagenes+`categoriapaquete/imagenescategoria/`+codigoserv+respuesta[i].foto;
		var funcion="";
		if (respuesta[i].sub>0) {
  					
  					funcion="DetalleSubCategoria("+respuesta[i].idcategoriapaquete+")";
						
			      
			      	}else{
			      		 funcion="DetalleCategiaProducto("+respuesta[i].idcategoriapaquete+")";
			      	}
			     

			html+=`

				 <div class="tarjeta cambiarfuente" style="width:100%;" id="tarjeta_`+respuesta[i].idcategoriapaquete+`" onclick="`+funcion+`">
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
	

	
}
function ObtenerListaFiltroMostrar() {
	var idsucursal=localStorage.getItem('idsucursal');
	var datos="idsucursal="+idsucursal+"&inicio=0";
	var pagina = "ObtenerListaFiltroMostrar2.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		data:datos,
		success: function(resp){
			
			 var respuesta=resp.respuesta;
			 totalelementoscategoriacalendario=resp.totalelementos;
			 iniciocategoriacalendario=resp.inicio;
			 idcategoriapadre=0;
			 categoriascache4=respuesta;

			//PintarSubCategoriaProducto(respuesta);

			/*localStorage.setItem('idcategoria',categoria);*/
			//ObtenerSubCategorias();
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}