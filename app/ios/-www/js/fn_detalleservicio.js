function detalleservicio(idpaquete) {


	var datos="idpaquete="+idpaquete;
		var pagina = "ObtenerDetallepaquete.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
				

			var paquete=datos.respuesta.paquete;
			var grupos=datos.respuesta.grupos;
			var opciones=datos.respuesta.opciones;
			var imagenesdelpaquete=datos.respuesta.imagenespaquete;
			contarcomplementos=0;

			PintarDescripcionServicio(paquete,grupos,opciones,imagenesdelpaquete,idpaquete);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}



function PintarDescripcionServicio(paquete,grupos,opciones,imagenesdelpaquete,idpaquete) {
   
    localStorage.setItem('comentariopaquete','');
		/*var idca=paquete.idcategorias;

    localStorage.setItem('idcategoria',idca);
*/
  $("#instruc").attr("onclick","AbrirlModal()");

	var idsucursal=localStorage.getItem('idsucursales');
	//ObtenerPaquetesVinculado(idpaquete,idsucursal,paquete);
	var imagenvacio=[];
	//PintarImagenesPaquete(paquete,imagenvacio);
	PintarImagenesPaquete2(paquete,imagenesdelpaquete);
	
	var nombre=`<span id="paquete"  class="bordesredondeados paquetetitulo">`+paquete.nombrepaquete+`</span>`;
	
	$(".nombrepaquete").html(nombre);
	$("#descripcion").text(paquete.descripcion);

	var porfechas=paquete.definirfecha;
	var directo=paquete.aplicardirecto;
	var repetitivo=paquete.repetitivo;
	var lunes=paquete.lunes;
	var martes=paquete.martes;
	var miercoles=paquete.miercoles;
	var jueves=paquete.jueves;
	var viernes=paquete.viernes;
	var sabado=paquete.sabado;
	var domingo=paquete.domingo;
	var aplicariva=paquete.siniva;
	var ivaaumentar=paquete.iva;


	if (paquete.promocion==1 && paquete.preciofijo!='' && paquete.preciofijo>0) {

		paquete.precioventa=paquete.preciofijo;

	}
	/*$("#precio").text(paquete.precioventa);
	$("#precioventa").text(paquete.precioventa);
	$("#preciouni").text(paquete.precioventa);
*/
	if (paquete.precioventa==0) {
		$(".precioriginal").css('display','none');
	
	}
	/*$(".precioriginal").text('$'+formato_numero(paquete.precioventa,2,'.',','));

	$(".preciopaquete").text('$'+paquete.precioventa);
*/

	$("#agregaracesta").text('AGREGAR $'+paquete.precioventa);


	$("#cantidadx").text(' 1');
	$("#preciox").text('$'+paquete.precioventa);


	if (paquete.activarcomentario==1) {

		$("#activarcomentario").css('display','block');
	}


	$("#agregaracesta2").attr('onclick','AgregarAcesta('+paquete.idpaquete+','+paquete.promocion+','+paquete.cantidad+','+paquete.considerar+',\''+paquete.nombrepaquete+'\','+porfechas+','+directo+','+repetitivo+','+lunes+','+martes+','+miercoles+','+jueves+','+viernes+','+sabado+','+domingo+','+aplicariva+','+ivaaumentar+')');

	var htmlgrupos="";
		if (grupos.length>0) {

		for (var i = 0; i <grupos.length; i++) {


			tope="";
			obliga="";
			oblig1="";
			if (grupos[i].multiple==1) {
				if (grupos[i].tope!='' && grupos[i].tope!=0) {

					if (grupos[i].topesecundario!=0) {
						grupos[i].tope=grupos[i].topesecundario;
					}


					if (grupos[i].obligatorio==1) {
						oblig1=`<b style="color:#7e7d79">(obligatoria 1 selección)</b>`;



					}

					/*if (grupos[i].topesecundario!=0 && grupos[i].obligatorio==1) {

						obliga=obliga;
					}*/

					tope='<span style="color:#a09f9a;" id="topegrupo_'+grupos[i].idgrupo+'_'+grupos[i].idgrupopaquetes+'">(Escoge '+grupos[i].tope+''+obliga+')</span>';
				}

			}else{

					tope='<span style="color:#a09f9a;" id="topegrupo_'+grupos[i].idgrupo+'_'+grupos[i].idgrupopaquetes+'"></span>';
				if (grupos[i].obligatorio==1) {
					obliga="obligatorio";
					tope='<span style="color:#a09f9a;" id="topegrupo_'+grupos[i].idgrupo+'_'+grupos[i].idgrupopaquetes+'">('+obliga+')</span>';
					oblig1="";
					}

			}
			
			htmlgrupos+=`
			<div class="content-block-title grupoetiqueta" style=""><div class="ribbon"></div><p class="nombregrupo" id="nombregrupo_`+grupos[i].idgrupo+'_'+grupos[i].idgrupopaquetes+`">`+grupos[i].nombregrupo+' '+oblig1+'</p>'+tope+`</div>
				<div class="list">
  				<ul id="grupo_`+grupos[i].idgrupo+`_`+grupos[i].idgrupopaquetes+`">
  					<input type="text"  style="display:none;" class="obligatoriocomplemento" value="`+grupos[i].obligatorio+`" id="grupoobli_`+grupos[i].idgrupo+`_`+grupos[i].idgrupopaquetes+`">


  				  </ul>
				</div>  

			`;

		}


	}

	$("#grupos").html(htmlgrupos);


	if (opciones.length>0) {
		contarcomplementos=opciones.length;
		for (var i = 0; i <opciones.length; i++) {



			for (var j = 0; j <opciones[i].length; j++) {
			
			
			
			if (opciones[i][j].multiple==1) {

				htmlopcion=` <li>`;

							     var costo="";
							     var precio="";
					        	if (opciones[i][j].sincoprecio==1) {

					        		costo='$'+opciones[i][j].costo;
					        		precio=opciones[i][j].costo;

					        	}

					        	if (opciones[i][j].topesecundario!=0) {
					        		
					        		opciones[i][j].tope=opciones[i][j].topesecundario;
					        	}
					    htmlopcion+=`<input type="checkbox" class="opciones" onchange="Verificartope(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`,`+opciones[i][j].tope+`,`+precio+`)" name="grupoopcion_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`"  id="grupoopcion_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`_`+opciones[i][j].idgrupoopcion+`" value="`+opciones[i][j].opcion+`" style="display: block!important;float: left;top: 1em;position: absolute;margin-left: 1.5em;">`;
					  
					    htmlopcion+=`<label class="item-content" style="margin-left: 1.5em;">
					        <!-- Checked by default -->
					        <div class="item-inner ">

					        `;
			
					        var cadena=opciones[i][j].opcion.length;

					        /*	if (cadena>20) {

					        htmlopcion+=`  <div class="item-title" onclick="ColocarCheck(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`,`+opciones[i][j].tope+`,`+precio+`)" style="width:11em;">`+truncString(opciones[i][j].opcion,20,'...')+` </div><span id="span_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`_`+opciones[i][j].idgrupoopcion+`" class="material-icons material-icons-outlined" style="font-size: 18px;color:#757575;" onclick="Expandirinformacion(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`)">add_circle_outline</span><div class="item-after">`+costo+`</div>`;
					     
					    }else{*/

					        htmlopcion+=`  <div class="item-title" style="    white-space: break-spaces;
    text-align: left;
    padding-left: 1em;"   onclick="ColocarCheck(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`,`+opciones[i][j].tope+`,`+precio+`)" style="width:11em;">`+opciones[i][j].opcion+` </div><div class="item-after">`+costo+`</div>`;


					 //   }
					      /* htmlopcion+=`

					       <div class="row" style="
									    
									    "><div class="col" style="
									    float: left;
									">
									`+truncString(opciones[i][j].opcion,20,'...')+` 
									</div><div class="col-10" style="
									    float: left;
									    padding-right: 3em;
									">`+costo+`</div>

									</div>

					       `;*/
					       htmlopcion+=`</div>
					      </label>
					    </li>

					    	<label style="display:none;" class="label-radio item-content textosuma" id="texto_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`_`+opciones[i][j].idgrupoopcion+`" style="display: block;">
              <div class="item-inner">
               
                <div class="item-text " style="margin-left: 1em;text-align: center;-webkit-line-clamp:10;">

                  <div style="padding-top: .2em;padding-bottom: .2em;background: #e9e9e9;border-radius: 10px;font-size:16px;padding-left: 1em; padding-right: 1em;">
                   `+opciones[i][j].opcion+`<div style="display:none;">`+costo+`</div>
                  </div>
                </div>
              </div>
            </label>

					    `;

			var obtener=$("#grupo_"+opciones[i][j].idgrupo+"_"+opciones[i][j].idgrupopaquetes).html();

			obtener=obtener+htmlopcion;

			$("#grupo_"+opciones[i][j].idgrupo+"_"+opciones[i][j].idgrupopaquetes).html(obtener);


			}else{


				htmlopcion=`<li>`;
				  				 var costo="";
					        	if (opciones[i][j].sincoprecio==1) {

					        		costo='$'+opciones[i][j].costo;
					        	}

				htmlopcion+=` <input type="radio" class="opciones" name="grupoopcion_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`" onchange="Verificartope2(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`,`+opciones[i][j].tope+`,`+precio+`)"  value="`+opciones[i][j].opcion+`" id="grupoopcion_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`_`+opciones[i][j].idgrupoopcion+`" style="display: block!important;float: left;top: 1em;position: absolute;margin-left: 1.5em;">`;		        	

			      htmlopcion+=`<label class="item-content" style="margin-left: 1.5em;">`;


			      htmlopcion+=`<div class="item-inner"  >
			        `;
					      

      							    var cadena=opciones[i][j].opcion.length;

					        	/*if (cadena>20) {

					        htmlopcion+=`  <div class="item-title"  onclick="ColocarCheck2(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`,`+opciones[i][j].tope+`,`+precio+`)" style="width:11em;">`+truncString(opciones[i][j].opcion,20,'...')+` </div><span id="span_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`_`+opciones[i][j].idgrupoopcion+`" class="material-icons material-icons-outlined" style="font-size: 18px;color:#757575;" onclick="Expandirinformacion(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`)">add_circle_outline</span><div class="item-after">`+costo+`</div>`;
					     
					    }else{*/

					        htmlopcion+=`  <div class="item-title" style=" white-space: break-spaces;
    text-align: left;
    padding-left: 1em;"  onclick="ColocarCheck2(`+opciones[i][j].idgrupo+`,`+opciones[i][j].idgrupopaquetes+`,`+opciones[i][j].idgrupoopcion+`,`+opciones[i][j].tope+`,`+precio+`)" style="width:11em;">`+opciones[i][j].opcion+` </div><div class="item-after">`+costo+`</div>`;


					   // }
/*			          <div class="item-title" >`+opciones[i][j].opcion+` </div><div class="item-after">`+costo+`</div>
*/			      htmlopcion+=`  </div>


			      </label>
			    </li>

			       </label>
					    </li>

					    	<label style="display:none;" class="label-radio item-content textosuma" id="texto_`+opciones[i][j].idgrupo+`_`+opciones[i][j].idgrupopaquetes+`_`+opciones[i][j].idgrupoopcion+`" style="display: block;">
              <div class="item-inner">
               
                <div class="item-text " style="margin-left: 1em;text-align: center;-webkit-line-clamp:10;">

                  <div style="padding-top: .2em;padding-bottom: .2em;background: #e9e9e9;border-radius: 10px;font-size:16px;padding-left: 1em; padding-right: 1em;">
                   `+opciones[i][j].opcion+`<div style="display:none;">`+costo+`</div>
                  </div>
                </div>
              </div>
            </label>

				`;


			var obtener=$("#grupo_"+opciones[i][j].idgrupo+"_"+opciones[i][j].idgrupopaquetes).html();

			obtener=obtener+htmlopcion;

			$("#grupo_"+opciones[i][j].idgrupo+"_"+opciones[i][j].idgrupopaquetes).html(obtener);

			}




		


						for (var k = 0; k <grupos.length; k++) {


								if (opciones[i][j].idgrupo==grupos[k].idgrupo && opciones[i][j].idgrupopaquetes==grupos[k].idgrupopaquetes) {

									if (opciones[i][j].tope==opciones[i].length) {

										$("#topegrupo_"+opciones[i][j].idgrupo+"_"+opciones[i][j].idgrupopaquetes).css('display','none');
									}

								}

							}


						}

				}

		}





}

function PintarImagenesPaquete2(paquete,imagenesdelpaquete) {
	var estilo=""
	if (paquete.foto!='' && paquete.foto!=null) {
		imagen=urlimagenes+'paquetes/imagenespaquete/'+codigoserv+paquete.foto;
	}else{
		estilo="opacity:0.2";
		imagen=localStorage.getItem('logo');
	}


	$("#imagenpaquete").attr('src',imagen);
	
	$(".imagenpaquetediv").attr('onclick','VisualizarImagen(\''+imagen+'\')');


		html=`  <div   
                      data-speed="900"
                      data-pagination='{"el": ".swiper-pagination"}'
                      data-space-between="50"
                      class="swiper-container   sliderpaquete paqueteli clases`+paquete.idpaquete+`" id="sliderpaquete_`+paquete.idpaquete+`"  >
                      <div class="swiper-wrapper" id="contenidopaquete_`+paquete.idpaquete+`" >

                      </div>
                       <div class="swiper-pagination" style="bottom: 20px!important;"></div>


                    </div>

                    <div class="paquetesli clases`+paquete.idpaquete+`" id="titulo_`+paquete.idpaquete+`" style="margin-top: -1em;"></div>


                    `;

                   $("#imagenespaquete").append(html);


                	html2=`<div class="swiper-slide">`;
        		html2+=`<div class="contorno demo-facebook-card bordesredondeados " style="" >
                        <div class="">
                          <div class="demo-facebook-avatar">
                        </div>
                        </div>
                        <div class="card-content" style="margin-right: 1em;margin-left: 1em;"> `;

                        if (paquete.foto!='' && paquete.foto!=null) {
                        	imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+paquete.foto;

                        }else{

                        	imagen=localStorage.getItem('logo');
                        }


                       html2+=`<div style="" class="">
  
                        <img class="bordesredondeados " onclick="VisualizarImagen(\'`+imagen+`\')" src="`+imagen+`"
                          style="width:100%;border-radius:10px;margin-bottom:1em;`+estilo+`" />

                          </div>`;
            
                      html2+=`</div>
                      </div>`;

                    html2+=` 

                     </div>`;

                     $("#contenidopaquete_"+paquete.idpaquete).html(html2);


                     if (imagenesdelpaquete.length>0) {

                     	for (var i = 0; i < imagenesdelpaquete.length; i++) {
                     			var html3="";

                     			obtener= $("#contenidopaquete_"+imagenesdelpaquete[i].idpaquete).html();
                     				
                     				urlimg=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+imagenesdelpaquete[i].imagen;

                     				html3+=`<div class="swiper-slide">`;
				        		html3+=`<div class="contorno demo-facebook-card bordesredondeados" >
				                        <div class="">
				                          <div class="demo-facebook-avatar">
				                        </div>
				                        </div>

				                        <div class="card-content" style="margin-right: 1em;margin-left: 1em;"> 
				                        <div style="" >
				   						
				                        <img class="bordesredondeados " onclick="VisualizarImagen(\'`+urlimg+`\')" src="`+urlimg+`" style="width:100%;border-radius:10px;margin-bottom:1em;"/>


				                          </div>`;
				        
				                    html3+= ` </div>
				                      </div>`;

				                    html3+=` 

				                     </div>`;

				                    htmlslider= obtener+html3;

                    			 $("#contenidopaquete_"+imagenesdelpaquete[i].idpaquete).html(htmlslider);



                     	}
                     }


                      var swiper = new Swiper('#sliderpaquete_'+paquete.idpaquete, {

				      centeredSlides: true,
				      spaceBetween: 30,
				      pagination: {
				        el: '.swiper-pagination',
				       
				      },
				      autoplay: {
							    delay:2500,
							  },
				    });

                      $(".swiper-pagination").css('bottom','10px!important');
                      
}