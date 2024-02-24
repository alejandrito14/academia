

function ObtenerCat() {
	
	//alert('entro categoria');
if (categoriascache.length>0) {

					PintarCategoriaProductodetalle(categoriascache);

					if (totalelementoscategoria>categoriascache.length) {
						var html=`
						 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       					<div class="preloader infinite-scroll-preloader"></div>
						<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
						         	 <button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasCategorias()">
						        	 Cargar más ...</button>
						     		 </div>
						`;
						$(".btnmas").append(html);



					}

				
		}
}


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
  					
  					funcion="Colocarvariablecache("+respuesta[i].idcategoriapaquete+")";
						
			      
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

function Colocarvariablecache(idcategoria) {
	var idsucursal=localStorage.getItem('idsucursal');
	 localStorage.setItem('idcategoria',idcategoria);
	/*if (cache.length==0) {

		cache={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache2.length==0) {

		cache2={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache3.length==0) {
		cache3={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache4.length==0) {
		cache4={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache5.length==0) {
		cache5={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache6.length==0) {

		cache6={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache7.length==0) {
		cache7={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache8.length==0) {
		cache8={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache9.length==0) {
		cache9={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}

	if (cache10.length==0) {
		cache10={
			 'idsucursal':idsucursal,
			 'pantalla':'pantalla2'
			 };
		return 0;
	}
*/	

	if (categoriascache2.length>0) {

		var idcategoriaarray=categoriascache2[0][0].iddepende;

		if (idcategoriaarray!=idcategoria) {

			categoriascache2=[];
		}
	}

	if (categoriascache2.length>0) {

				GoToPage('subcategoriasdetalle');


	}else{

	var pagina = "ObtenerSubCategoriasPaginado.php";
	
	var datos="idcategoria="+idcategoria+"&inicio=0";
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
			inicioconcat=resp.inicio;
			totalelementossubcategoria=resp.totalelementos;
			var cateservicio=resp.categoria.servicio;



			if (categoriascache2.length==0) {
				//categoriascache2=respuesta;
				categoriascache2.push(respuesta);
				GoToPage('subcategoriasdetalle');

				//alert('categoriascache2');
				return 0;
			}
			if (categoriascache3.length==0) {
				categoriascache3.push(respuesta);
				//alert('categoriascache3');

				return 0;
			}
			if (categoriascache4.length==0) {
				categoriascache4.push(respuesta);
				

				return 0;
			}
			if (categoriascache5.length==0) {
				categoriascache5=respuesta;

				return 0;
			}
			if (categoriascache6.length==0) {
				categoriascache6=respuesta;

				return 0;
			}
			
			if (categoriascache7.length==0) {
				categoriascache7=respuesta;

				return 0;
			}
			if (categoriascache8.length==0) {
				categoriascache8=respuesta;

				return 0;
			}
			if (categoriascache9.length==0) {
				categoriascache9=respuesta;

				return 0;
			}

			if (categoriascache10.length==0) {
				categoriascache10=respuesta;

				return 0;
			}

			
			
			if (respuesta.length>0) {

				//console.log('sub y productos');
				//PintarSubCategoriaProductodetalle(respuesta);
			
				
				/*
				if (totalelementossubcategoria>contador) {						
					var html=`
						 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       					<div class="preloader infinite-scroll-preloader"></div>
						<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
						         	 <button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasSubCategorias()">
						        	 Cargar más ...</button>
						     		 </div>
						`;
						$(".btnmassub").append(html);



				}*/
			

			}else{
			
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




}



function PintarSubCategoriaProductodetalle(respuesta) {


	var html="";

	
	console.log(categoriascache2);
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


	if (totalelementossubcategoria>respuesta.length) {

					var html=`
						 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       					<div class="preloader infinite-scroll-preloader"></div>
						<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
						         	 <button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasSubCategorias()">
						        	 Cargar más ...</button>
						     		 </div>
						`;
						$(".btnmassub").append(html);



				}
	
//CargarEventoScroll();
	
}

function DetalleCategoriaProducto(idcategoria) {

	localStorage.setItem('idcategoria',idcategoria);

	if (categoriascache3.length>0) {

		var idcategoriaarray=categoriascache3[0][0].iddepende;

		if (idcategoriaarray!=idcategoria) {

			categoriascache3=[];
		}
	}

	if (categoriascache2.length>0) {
				console.log('aqi'+idcategoria);

			encontrado=false;
		for (var i = 0; i < categoriascache2[0].length; i++) {
			if (categoriascache2[0][i].idcategoriapaquete==idcategoria) {
				encontrado=true;
				
			}
		}

		if (encontrado==false) {
			categoriascache2=[];

		}
	/*	if (idcategoriaarray!=idcategoria) {

			categoriascache2=[];
		}*/
	}



	if (categoriascache3.length>0) {

		GoToPage('productoscategoriadetalle');


	}else{

	var inicio=0;
	var pagina = "ObtenerProductosCategoriaPaginado.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	//var idcategoria=localStorage.getItem('idcategoriaproducto');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio="+inicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			//PintarProductosConCategoriadetalle(respuesta,div);
			iniciocon2=resp.inicio;
			totalelementosproducto=resp.totalelementos;
	

			 idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);

			if (idcategoriapadre>0) {
			//	localStorage.setItem('idcategoria',idcategoriapadre);
			}
		}

		var contadortarjeta2=$(".contadortarjeta2").length;

	/*	if (totalelementos>contadortarjeta2) {
			var html=`
				 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       			<div class="preloader infinite-scroll-preloader"></div>
				<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
					<button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasProductos('`+div+`')">
				Cargar más ...</button>
				</div>
						`;
				$(".btnproductomas").append(html);

			}*/

			if (categoriascache3.length==0) {
				categoriascache3.push(respuesta);
				//alert('categoriascache3');
				console.log(categoriascache3);
				GoToPage('productoscategoriadetalle');

				return 0;
			}
			if (categoriascache4.length==0) {
				categoriascache4.push(respuesta);
				

				return 0;
			}
			if (categoriascache5.length==0) {
				categoriascache5=respuesta;

				return 0;
			}
			if (categoriascache6.length==0) {
				categoriascache6=respuesta;

				return 0;
			}
			
			if (categoriascache7.length==0) {
				categoriascache7=respuesta;

				return 0;
			}
			if (categoriascache8.length==0) {
				categoriascache8=respuesta;

				return 0;
			}
			if (categoriascache9.length==0) {
				categoriascache9=respuesta;

				return 0;
			}

			if (categoriascache10.length==0) {
				categoriascache10=respuesta;

				return 0;
			}

			
			
			if (respuesta.length>0) {

				//console.log('sub y productos');
				//PintarSubCategoriaProductodetalle(respuesta);
			
				
				/*
				if (totalelementossubcategoria>contador) {						
					var html=`
						 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       					<div class="preloader infinite-scroll-preloader"></div>
						<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
						         	 <button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasSubCategorias()">
						        	 Cargar más ...</button>
						     		 </div>
						`;
						$(".btnmassub").append(html);



				}*/
			

			}else{
			
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


}

function PintarProductosConCategoriadetalle(respuesta,div) {
	var html="";

	//var respuesta=;

	//alert('pintarproductos');
	console.log(respuesta);
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
   				 <p style="margin:0px;text-align:center;color: white;" class="cambiarfuente" >`+respuesta[i].nombrepaquete;
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

	console.log('pro'+totalelementosproducto);
	if (totalelementosproducto>categoriascache3[0].length) {
			var html=`
				 <div class="cargandopre" style="text-align: center;width:100%;">Cargando</div>
       			<div class="preloader infinite-scroll-preloader"></div>
				<div class="" style="margin-right: 1em;margin-left: 1em;width: 100%;">
					<button style="background: #C7AA6A; color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente faustina" onclick="CargarmasProductos('`+div+`')">
				Cargar más ...</button>
				</div>
						`;
				$(".btnproductomas").html(html);

			}
}

function DetalleServicioCalendario(idpaquete) {
	
		localStorage.setItem('idpaquete',idpaquete);
		
		GoToPage('seleccionarfecha');
}


function CargarmasSubCategorias() {

	$(".cargandopre").show();
	$(".infinite-scroll-preloader").show();

	setTimeout(() => {
	var pagina = "ObtenerSubCategoriasPaginado.php";
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="idcategoria="+idcategoria+"&inicio="+inicioconcat;
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
			inicioconcat=resp.inicio;
			totalelementossubcategoria=resp.totalelementos;
			var cateservicio=resp.categoria.servicio;

		
				if (cateservicio==0) {

					$(".title2").text('Escoge un producto');
				}else{

					$(".title2").text('Escoge un servicio');

				}
			if (respuesta.length>0) {
				//console.log('sub y productos');
				

				for (var i = 0; i < respuesta.length; i++) {
					categoriascache2[0].push(respuesta[i]); 
				}

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


function CargarmasProductos(div) {

	$(".cargandopre").show();
	$(".infinite-scroll-preloader").show();
	setTimeout(() => {
	
	var pagina = "ObtenerProductosCategoriaPaginado.php";
	var idsucursal=localStorage.getItem('idsucursal');
	var id_user=localStorage.getItem('id_user');
	var idcategoria=localStorage.getItem('idcategoria');
	var datos="iduser="+id_user+"&idcategoria="+idcategoria+"&idsucursal="+idsucursal+"&inicio="+iniciocon2;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			var respuesta=resp.respuesta;

			//PintarProductosConCategoriadetalle(respuesta,div);
			iniciocon2=resp.inicio;
			totalelementosproducto=resp.totalelementos;
			

			//var idcategoriapadre=resp.idcategoriapadre;
			if (respuesta.length>0) {

				for (var i = 0; i <respuesta.length; i++) {
					categoriascache3[0].push(respuesta[i]);
				}
			 PintarProductosConCategoriadetalle(respuesta,div);
			//idcategoriapadre=resp.idcategoriapadre;
				//alert('ObtenerProductosCategoriasdetalle '+idcategoriapadre);
				$(".cargandopre").hide();
				$(".infinite-scroll-preloader").hide();

			
		}

		

		var contadortarjeta2=$(".contadortarjeta2").length;
//aqui

		if (totalelementosproducto==contadortarjeta2) {
			
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
