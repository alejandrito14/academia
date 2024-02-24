var contarcomplementos=0;
function detallepaquete(idpaquete) {


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

			PintarDescripcion(paquete,grupos,opciones,imagenesdelpaquete,idpaquete);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function AbrirlModal() {

	var comentario="";
  if (localStorage.getItem('comentariopaquete')!=null && localStorage.getItem('comentariopaquete')!='') {

  	 comentario=localStorage.getItem('comentariopaquete');
  }

 app.dialog.create({
		          title: '',
		          text:'Instrucciones especiales',
		          content: '<div class="dialog-input-field item-input"><div class=""> <textarea id="comentariopaquete" style="height: 4em;width: 100%;" placeholder="Escribir aqui">'+comentario+'</textarea></div></div>',

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
			                //Button 1 clicked

			                //alert(enlace);
			              // window.open(enlace);
			            }
			            else if(index === 1){
			                //Button 2 clicked
			              GuardarInstrucciones();
			            }
			          
			        },
		          verticalButtons: false,
		        }).open();
      
	    	


 /* if (localStorage.getItem('comentariopaquete')!=null && localStorage.getItem('comentariopaquete')!='') {

  	var comentario=localStorage.getItem('comentariopaquete');
  	$("#comentariopaquete").val(comentario);
  }*/
}


function PintarDescripcion(paquete,grupos,opciones,imagenesdelpaquete,idpaquete) {
   
    localStorage.setItem('comentariopaquete','');
		/*var idca=paquete.idcategorias;

    localStorage.setItem('idcategoria',idca);
*/
  $("#instruc").attr("onclick","AbrirlModal()");

	var idsucursal=localStorage.getItem('idsucursales');
	//ObtenerPaquetesVinculado(idpaquete,idsucursal,paquete);

	PintarImagenesPaquete(paquete,imagenesdelpaquete);

	
	var nombre=`<span id="paquete"  class="bordesredondeados paquetetitulo cambiarfuente">`+paquete.nombrepaquete+`</span>`;
	
	$("#nombrepaquete").html(nombre);
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
	$("#precio").text(paquete.precioventa);
	$("#precioventa").text(paquete.precioventa);
	$("#preciouni").text(paquete.precioventa);
	localStorage.setItem('precio',paquete.precioventa);
	if (paquete.precioventa==0) {
		$(".precioriginal").css('display','none');
	
	}
	$(".precioriginal").text('$'+formato_numero(paquete.precioventa,2,'.',','));

	$(".preciopaquete").text('$'+paquete.precioventa);


	$("#agregaracesta").html('<span style="font-size:18px;">AGREGAR</span> $'+paquete.precioventa);


	$("#cantidadx").text(' 1');
	$("#preciox").text('$'+paquete.precioventa);


	if (paquete.activarcomentario==1) {

		$("#activarcomentario").css('display','block');
	}


	$("#agregaracesta2").attr('onclick','AbrirModalPaquete('+paquete.idpaquete+','+paquete.promocion+','+paquete.cantidad+','+paquete.considerar+',\''+paquete.nombrepaquete+'\','+porfechas+','+directo+','+repetitivo+','+lunes+','+martes+','+miercoles+','+jueves+','+viernes+','+sabado+','+domingo+','+aplicariva+','+ivaaumentar+')');

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

function ColocarCheck(idgrupo,idgrupopaquetes,idgrupoopcion,tope,costo) {

	
	
	if($("#grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"_"+idgrupoopcion).prop('checked')) {
    
    		$("#grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"_"+idgrupoopcion).prop('checked',false);

		}else{

			$("#grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"_"+idgrupoopcion).prop('checked',true);

		}
	
		Verificartope(idgrupo,idgrupopaquetes,idgrupoopcion,tope,costo);

}

function ColocarCheck2(idgrupo,idgrupopaquetes,idgrupoopcion,tope,costo) {


	$("input[name=grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"]").attr('checked',false);
    $("#grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"_"+idgrupoopcion).attr('checked',true).trigger('change');

    


}


var nuevo=[];


function Verificartope(idgrupo,idgrupopaquetes,idgrupoopcion,tope,costo) {

	var seleccionados=[];
	var noseleccionados=[];

	
	$("input[name=grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"]").each(function( index ) {
				$('#'+$(this).attr('id')).attr("disabled", false);

				var id=$(this).attr('id');
	  if($('#'+$(this).attr('id')).is(':checked')){

	  			

	  			seleccionados.push(id);

			}else{

			noseleccionados.push(id);

			}

	});


	var contar=seleccionados.length;
	var dato="";

	if (contar>=tope) {


	$("input[name=grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"]").each(function( index ) {



	  if($('#'+$(this).attr('id')).is(':checked')){
	  			var id1=$(this).attr('id');

	  			var id=$(this).attr('id').split('_');
	  			idgrupo1=id[1];
	  			idgrupopaquetes1=id[2];
	  			idgrupoopcion1=id[3];


	  				if (idgrupo1==idgrupo && idgrupopaquetes1==idgrupopaquetes && idgrupoopcion1==idgrupoopcion) {
	  					
	  					

	  					dato="grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"_"+idgrupoopcion;
	  					
	  				}

	  			

			}

	});
	if(contar>tope) {

	
	$("#"+dato).prop('checked',false);
	$("#"+dato).attr("disabled", true);
	removeItemFromArr(seleccionados,dato);

	}



	$("input[name=grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"]").each(function( index ) {
	  var id1=$(this).attr('id');
	  $("#"+id1).prop('checked',false);
	  $("#"+id1).attr("disabled", true);

	});

	for (var i = 0; i <seleccionados.length; i++) {

		$("#"+seleccionados[i]).prop('checked',true);
		$("#"+seleccionados[i]).attr("disabled", false);

	}

	for (var i = 0; i <noseleccionados.length; i++) {

		$("#"+noseleccionados[i]).prop('checked',false);
		$("#"+noseleccionados[i]).attr("disabled", true);

	}

}


var cantidad=$("#cantidad").val();

	suma=0;


	 

	$(".textosuma").each(function(){

		var id=$(this).attr('id');

		var grupo=id.split('_');

		formarid="grupoopcion_"+grupo[1]+'_'+grupo[2]+'_'+grupo[3];


			  if($('#'+formarid).is(':checked')){

				var id=$(this).attr('id');

	  			var texto=$("#"+id).text();
	  			

	  			var dividirtex=texto.split('$')[1];
	  			if (dividirtex=== undefined) {
	  				dividirtex=0;
	  			}
	  			dividirtex=parseFloat(dividirtex)*parseFloat(cantidad);

	  			suma=parseFloat(suma)+parseFloat(dividirtex);

	  		}

	});
	

	var preciopaquete=$("#precioventa").text();
	preciopaquete=parseFloat(preciopaquete)*parseFloat(cantidad);

	var sumatoria=parseFloat(suma)+parseFloat(preciopaquete);
	//$("#agregaracesta").text('AGREGAR $'+formato_numero(sumatoria,2,'.',','));

	$(".preciopaquete").text('$'+formato_numero(sumatoria,2,'.',','));
	$("#precio").text(sumatoria);
	$("#preciouni").text(sumatoria/cantidad);

	$("#preciox").text('$'+formato_numero(sumatoria,2,'.',','));
	$("#cantidad").val(cantidad);


}


function Verificartope2(idgrupo,idgrupopaquetes,idgrupoopcion,tope,costo) {

	var seleccionados=[];
	var noseleccionados=[];

	
	$("input[name=grupoopcion_"+idgrupo+"_"+idgrupopaquetes+"]").each(function( index ) {
				$('#'+$(this).attr('id')).attr("disabled", false);

				var id=$(this).attr('id');
	  if($('#'+$(this).attr('id')).is(':checked')){

	  			

	  			seleccionados.push(id);

			}else{

			noseleccionados.push(id);

			}

	});


	var contar=seleccionados.length;
	var dato="";

	


var cantidad=$("#cantidad").val();

	suma=0;


	 

	$(".textosuma").each(function(){

		var id=$(this).attr('id');

		var grupo=id.split('_');

		formarid="grupoopcion_"+grupo[1]+'_'+grupo[2]+'_'+grupo[3];


			  if($('#'+formarid).is(':checked')){

				var id=$(this).attr('id');

	  			var texto=$("#"+id).text();
	  			

	  			var dividirtex=texto.split('$')[1];
	  			if (dividirtex=== undefined) {
	  				dividirtex=0;
	  			}
	  			dividirtex=parseFloat(dividirtex)*parseFloat(cantidad);

	  			suma=parseFloat(suma)+parseFloat(dividirtex);

	  		}

	});
	

	var preciopaquete=$("#precioventa").text();
	preciopaquete=parseFloat(preciopaquete)*parseFloat(cantidad);

	var sumatoria=parseFloat(suma)+parseFloat(preciopaquete);
	//$("#agregaracesta").text('AGREGAR $'+formato_numero(sumatoria,2,'.',','));

	$(".preciopaquete").text('$'+formato_numero(sumatoria,2,'.',','));
	$("#precio").text(sumatoria);
	$("#preciouni").text(sumatoria/cantidad);

	$("#preciox").text('$'+formato_numero(sumatoria,2,'.',','));
	$("#cantidad").val(cantidad);

}
function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}
 

function HacerSuma() {
	
	var seleccionados=[];
	var noseleccionados=[];


	
	$(".opciones").each(function( index ) {

				var id=$(this).attr('id');
	  		if($('#'+$(this).attr('id')).is(':checked')){

	  			

	  			seleccionados.push(id);

			}else{

			noseleccionados.push(id);

			}


	});
	suma=0;
		var cantidad=parseInt($("#cantidad").val())+1;

	for (var i = 0; i <seleccionados.length; i++) {


				var id=seleccionados[i].split('_');
	  			idgrupo1=id[1];
	  			idgrupopaquetes1=id[2];
	  			idgrupoopcion1=id[3];

	  			var texto=$("#texto_"+idgrupo1+"_"+idgrupopaquetes1+"_"+idgrupoopcion1).text();
	  			

	  			var dividirtex=texto.split('$')[1];
	  			if (dividirtex=== undefined) {
	  				dividirtex=0;
	  			}
	  			dividirtex=parseFloat(dividirtex)*parseFloat(cantidad);
	  			suma=parseFloat(suma)+parseFloat(dividirtex);



	}


	var preciopaquete=$("#precioventa").text();

	preciopaquete=parseFloat(preciopaquete)*parseFloat(cantidad);
	var sumatoria=parseFloat(suma)+parseFloat(preciopaquete);
	$("#agregaracesta").text('AGREGAR $'+formato_numero(sumatoria,2,'.',','));
	$("#precio").text(sumatoria);

	$("#preciouni").text(sumatoria/cantidad);

	 $(".preciopaquete").text('$'+formato_numero(sumatoria,2,'.',','));

	 $("#cantidadx").text(' '+cantidad);
	$("#preciox").text('$'+formato_numero(sumatoria,2,'.',','));

	$("#cantidad").val(cantidad);
}



function HacerResta() {


	
	var seleccionados=[];
	var noseleccionados=[];
		var resta=$("#cantidad").val()-1;

	if (resta<=0) {



	}else{



	
	
	$(".opciones").each(function( index ) {

				var id=$(this).attr('id');
	  		if($('#'+$(this).attr('id')).is(':checked')){

	  			

	  			seleccionados.push(id);

			}else{

			noseleccionados.push(id);

			}


	});
	suma=0;
		var cantidad=parseInt($("#cantidad").val())-1;

	for (var i = 0; i <seleccionados.length; i++) {


				var id=seleccionados[i].split('_');
	  			idgrupo1=id[1];
	  			idgrupopaquetes1=id[2];
	  			idgrupoopcion1=id[3];

	  			var texto=$("#texto_"+idgrupo1+"_"+idgrupopaquetes1+"_"+idgrupoopcion1).text();
	  			

	  			var dividirtex=texto.split('$')[1];
	  			if (dividirtex=== undefined) {
	  				dividirtex=0;
	  			}
	  			dividirtex=parseFloat(dividirtex)*parseFloat(cantidad);
	  			suma=parseFloat(suma)+parseFloat(dividirtex);



	}


	var preciopaquete=$("#precioventa").text();

	preciopaquete=parseFloat(preciopaquete)*parseFloat(cantidad);
	var sumatoria=parseFloat(suma)+parseFloat(preciopaquete);
	//$("#agregaracesta").text('AGREGAR $'+formato_numero(sumatoria,2,'.',','));
	$("#precio").text(sumatoria);

	$("#preciouni").text(sumatoria/cantidad);

	 $(".preciopaquete").text('$'+formato_numero(sumatoria,2,'.',','));

	 $("#cantidadx").text(' '+cantidad);
	$("#preciox").text('$'+formato_numero(sumatoria,2,'.',','));

	$("#cantidad").val(cantidad);
	}
}

function AgregarAcesta(idpaquete,promocion,cantidad,considerar,nombreproducto,porfechas,directo,repetitivo,lunes,martes,miercoles,jueves,viernes,sabado,domingo,aplicariva,ivaaumentar) {
	dynamicSheet1.close();
	var opciones=[];
	var texto=[];
	var titulosgrupos=[];
	//app.dialog.confirm('','¿Desea agregar '+nombreproducto+' al carrito de compras?' , function () {


	$(".opciones").each(function(index) {

	  if($('#'+$(this).attr('id')).is(':checked')){

	  			var id=$(this).attr('id').split('_');
	  			idgrupo1=id[1];
	  			idgrupopaquetes1=id[2];
	  			idgrupoopcion1=id[3];

	  			var textoetiqueta=$("#texto_"+idgrupo1+"_"+idgrupopaquetes1+"_"+idgrupoopcion1).text();	  			
	  			opciones.push($(this).attr('id'));
	  			texto.push(textoetiqueta);


	  			var grupo=$(`#nombregrupo_`+idgrupo1+`_`+idgrupopaquetes1).text();

	  			var nombregrupo={
	  				idgrupo1:idgrupo1,
	  				idgrupopaquetes1:idgrupopaquetes1,
	  				idgrupoopcion1:idgrupoopcion1,
	  				grupo:grupo,
	  				textoetiqueta:strtrim(textoetiqueta),
	  				idpaquete:idpaquete
	  				
	  			};
	  			titulosgrupos.push(nombregrupo);
			}

	});

	var comple=1;

	if (opciones.length==0) {

	 comple=0;
		//alerta('','Seleccionar complementos');

	}



	
	var existeobligatorio=0;
	var arrayobligatorio=[];
	$(".obligatoriocomplemento").each(function(index) {
		var valorobligatorio=$(this).val();
		if (valorobligatorio==1) {
			var id=$(this).attr('id').split('_');
			var obli=id[1]+'_'+id[2];
			arrayobligatorio.push(obli);

			
		}


	});


	var arrayobligatorio2=[];
	/*console.log('arrayobligatorio');

	console.log(arrayobligatorio);
	console.log('-----------------');*/

	if (arrayobligatorio.length>0) {
	for (var i = 0; i <arrayobligatorio.length; i++) {

		var armarid="grupo_"+arrayobligatorio[i];

		var seleccionado=0;
			contar = $("#"+armarid+" li input[name='grupoopcion_"+arrayobligatorio[i]+"']").length;
			contador=0;
		  $("#"+armarid+" li input[name='grupoopcion_"+arrayobligatorio[i]+"']").each(function(){


		  		idelemento=$(this).attr('id');

		  		//console.log('idelemento'+idelemento);

		  		if ($("#"+idelemento).is(':checked')) {

		  			seleccionado++;

		  		}


		  		contador++;
		  		//console.log('contador'+contador);

		  			if (contar==contador) {

		  				if (seleccionado==0) {

		  					arrayobligatorio2.push(arrayobligatorio);

		  				}
		  			}

        	 
        	});
	}
}




	
		var foto =$("#imagenpaquete").attr('src');
		var nombrepaquete=$("#paquete").text();
		var cantidadpro=$("#cantidad").val();
		var contararrayobligatorio2=arrayobligatorio2.length;

		if (contararrayobligatorio2==0) {
		if (comple==1) {


			if (cantidadpro>=cantidad) {
					AgregarPaquete(idpaquete,promocion,opciones,texto,foto,nombrepaquete,cantidadpro,considerar,porfechas,directo,repetitivo,lunes,martes,miercoles,jueves,viernes,sabado,domingo,titulosgrupos,aplicariva,ivaaumentar);
					Contarcarrito();

			}else{

				alerta('','La cantidad debe ser mayor para aplicar promoción');
			}

		

		}

		if (comple==0) {

			if (contarcomplementos>0) {

				 app.dialog.confirm('','No seleccionaste complementos ¿Deseas continuar?', function () {
				 if (cantidadpro>=cantidad) {

					AgregarPaquete(idpaquete,promocion,opciones,texto,foto,nombrepaquete,cantidad,considerar,porfechas,directo,repetitivo,lunes,martes,miercoles,jueves,viernes,sabado,domingo,titulosgrupos,aplicariva,ivaaumentar);
					Contarcarrito();


					}else{

						alerta('','La cantidad debe ser mayor para aplicar promoción');


					
					}
				});
			}else{


				 if (cantidadpro>=cantidad) {

				AgregarPaquete(idpaquete,promocion,opciones,texto,foto,nombrepaquete,cantidad,considerar,porfechas,directo,repetitivo,lunes,martes,miercoles,jueves,viernes,sabado,domingo,titulosgrupos,aplicariva,ivaaumentar);
				Contarcarrito();


				}else{

					alerta('','La cantidad debe ser mayor para aplicar promoción');


						}


					}

				}
			
			}else{


			alerta('','Te falta por seleccionar una opción obligatoria');



			}


		

	
      	// });
	

	
}


function AbrirModalPaquete(idpaquete,promocion,cantidad,considerar,nombreproducto,porfechas,directo,repetitivo,lunes,martes,miercoles,jueves,viernes,sabado,domingo,aplicariva,ivaaumentar) {
  var aviso="¿Desea agregar <span style='color:white;'>"+nombreproducto+"</span> al carrito de compras?";
  var parrafo="<p class='cambiarfuente' style='font-size:30px;line-height:1;'>"+aviso+"</p>";
   

  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;font-weight: 600;color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;
                      

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50" style="">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="AgregarAcesta(`+idpaquete+`,`+promocion+`,`+cantidad+`,`+considerar+`,'`+nombreproducto+`',`+porfechas+`,`+directo+`,`+repetitivo+`,`+lunes+`,`+martes+`,`+miercoles+`,`+jueves+`,`+viernes+`,`+sabado+`,`+domingo+`,`+aplicariva+`,'`+ivaaumentar+`')">Si</button>
                            </div>
                             <div class="col-50" style="">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAviso()">No</button>
                            </div>
                          
                          </div>
                          `;

                      
                         html+=` </div>

                         


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });


       dynamicSheet1.open();

}

function strtrim(str) {
  if(str == null) return str;
  //return str.replace(/\s+$/g, '');

  return str.replace(/\s+$/g, '').replace(/^\s+/g, "");
}

function AgregarPaquete(idpaquete,promocion,opciones,texto,foto,nombre,cantidadp,considerar,porfechas,directo,repetitivo,lunes,martes,miercoles,jueves,viernes,sabado,domingo,titulosgrupos,aplicariva,ivadelpaquete) {
	
		var precioriginal=$("#precioriginal").text();
		var cantidad=$("#cantidad").val();
		//alert(cantidad);
		var precio=$("#precio").text();
		var preuni=$("#preciouni").text();
		var descripcion=$("#descripcion").text();
		var comentariopaquete=localStorage.getItem('comentariopaquete');
		var lu="",ma="",mie="",jue="",vie="",sa="",domi="";
			$(".modalpaquete").remove();
	

		if (lunes==1) {
			lu="divdias";
		}
		if (martes==1) {
			ma="divdias";
		}
		if(miercoles==1){
			mie="divdias";
		}
		if(jueves==1){
			jue="divdias";
		}
		if (viernes==1) {
			vie="divdias"
		}

		if (sabado==1) {
			sa="divdias";
		}
		if (domingo==1) {
			domi="divdias";
		}
		var dias='';
		dias+='<span style="padding:.3em;" class="'+lu+'">L</span> ';
		dias+='<span style="padding:.3em;" class="'+ma+'">M</span> ';
		dias+='<span style="padding:.3em;" class="'+mie+'">M</span> ';
		dias+='<span style="padding:.3em;" class="'+jue+'">J</span> ';
		dias+='<span style="padding:.3em;" class="'+vie+'">V</span> ';
		dias+='<span style="padding:.3em;" class="'+sa+'">S</span>  ';
		dias+='<span style="padding:.3em;" class="'+domi+'">D</span>';


		if (aplicariva==1) {

			precioiva=(ivadelpaquete/100)*precio;
			precioti=parseFloat(precio)+parseFloat(precioiva);
			precioi=precio;
			preciotiva=precioti;
		}



		if (aplicariva==0) {

			if (ivadelpaquete=='') {

				ivadelpaquete=0;
			}

			dividir=(ivadelpaquete/100)+1;
			precioiva=parseFloat(precio)/parseFloat(dividir);
			precioti=parseFloat(precio)-parseFloat(precioiva);

			precioi=parseFloat(precio)-parseFloat(precioti);
			preciotiva=parseFloat(precioi)+parseFloat(precioti); 
		}




	  	const prod = {
	  		idpaquete : idpaquete,
	  		cant :cantidad,
	  		opciones : opciones,
	  		texto : texto,
	  		img : foto,
	  		nombre:nombre,
	  		price:precio,
	  		preuni:preuni,
	  		cantidad:cantidadp,
	  		considerar:considerar,
	  		promocion:promocion,
	  		porfechas:porfechas,
	  		directo:directo,
	  		repetitivo:repetitivo,
	  		dias:dias,
	  		descripcion:descripcion,
	  		precioriginal:precioriginal,
	  		comentariopaquete:comentariopaquete,
	  		titulosgrupos:titulosgrupos,
	  		totpaq:precio,
	  		totpaquedesc:0,
	  		totantespagar:precioi,
	  		ivapaquete:precioti,
	  		totpaqdespuesiva:preciotiva,
	  		incluyeiva:aplicariva,
	  		encontrado:0

	  	}



	  	let productosLS;

	  	productosLS = obtenerProductosLocalStorage();
	  	var encontrado=0;
	 if (productosLS==null || productosLS.length==0) {

	  		//guardarProductoLocalStorage(prod);

	  		//alerta('','Producto agregado al carrito exitosamente');

	//productos = obtenerProductosLocalStorage();
		guardarProductoCarrito(prod);
	}else{



		//localStorage.setItem('carrito', JSON.stringify(productosLS));
   	    //localStorage.setItem('carritocopia2',JSON.stringify(productosLS));

   	    guardarProductoCarrito(prod);

		//guardarProductoLocalStorage(prod);
	  	//	alerta('','Producto agregado al carrito exitosamente');

	}

	/*if (promocion==1) {


		GoToPage("promociones");


	}else{

	 GoToPage("detalleproductoservicios");
	}
*/

}

//Comprobar elementos en localStorage
function obtenerProductosLocalStorage() {
	let productoLS;

	//console.log(localStorage.getItem('carrito'));
    //comprobar si hay algo en localSotrage
    if(localStorage.getItem('carrito')===null){
    	productoLS = [];
    }else{

    	productoLS = JSON.parse(localStorage.getItem('carrito'));
    }

   // console.log(productoLS);
    return productoLS;
}


function guardarProductoLocalStorage(producto){
	localStorage.setItem('idpaquete',0);
	
	//console.log(producto);
	console.log('entro a guardar cariito');
	let productos;

	productos = obtenerProductosLocalStorage();
	productos.push(producto);

    //curso seleccionado se agrega al arreglo vacio o al final de los elementos existentes
    
    localStorage.setItem('carrito', JSON.stringify(productos));
    localStorage.setItem('carritocopia2', JSON.stringify(productos));

   // console.log(JSON.parse(localStorage.getItem('carrito')));



}

function guardarProductoCarrito(producto) {

	var iduser=localStorage.getItem('id_user');
	var idsucursal=localStorage.getItem('idsucursal');
	var datos="iduser="+iduser+"&producto="+JSON.stringify(producto)+"&idsucursal="+idsucursal;
	var pagina = "GuardarProductoCarrito.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;

	 		GoToPage("carrito");

			
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


//Imprimir  de localStorage
/*function leerLocalStorage() {
	console.log('entro leer carrito');
	let productoLS;

	productoLS = obtenerProductosLocalStorage();
	var html ='';

	var contador=productoLS.length;
	var suma=0;
	var cont=0;
	//console.log('contador'+contador);
	if(contador>0) {
		productoLS.forEach(function (producto){
        //construir template
        var htmlpromocion='';
        if (producto.promocion==1 ) {

        	htmlpromocion=`
        	<li>

        	<div class="row">

        	<div class="col-20"></div>
        	<div class="col-80">
        	<span style="margin-left:.6em;background: yellow; border-radius: 40px;">Promoción</span>`;

        	if (producto.porfechas==1) {

        	 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción por fechas</div>`;
	
        	}

        	if(producto.directo==1){

               htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción directa</div>`;

        	}

        	if (producto.repetitivo==1) {

        		 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.dias+`</div>`;

        	}

        	if (producto.considerar>1) {
        	htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.considerar+`x`+producto.cantidad+`</div>`;


        	}


        	htmlpromocion+=`
        		</div>
        		</div>
        	</li>`;
        }


        html+=`

        <li id="elemento_`+cont+`" class="elemento">
        <div class="item-inner item-cell">
        <div class="item-row">

        <div class="item-cell">

        <div class="item-media" style="margin:1em;" onclick="VisualizarImagen(\'`+producto.img+`\')">
        <img style="width:100%;" src="`+producto.img+`" width="80"/></div>

        </div>
        <div class="item-cell">
        <div class="" style="font-size: 15px;" >`+producto.nombre+`</div>
        <div class="item-text" ><span style="font-size: 20px;" ></span>

        </div>
        <div class="item-after">
        </div>
		<div  style="font-size: 16px;">

		<span>`+producto.cant+`</span>x<span style="font-size: 15px;">$`+formato_numero(producto.preuni,2,'.',',')+`</span>

		</div>
       
		

        </div>
           <div class="item-cell">
        <span style="margin-left:3em;font-size: 16px;float:right;font-weight:bold;margin-top: 1.6em;">$`+formato_numero(producto.price,2,'.',',')+`</span>

           </div>



        <div class="item-cell">
        <div class="item-row">


        </div>
        <div class="item-row">
        <div class="item-cell">

         <span class="botoneliminar" onclick="eliminarProducto(`+cont+`)" data-id="`+producto.idpaquete+`" >
                <i class="icon f7-icons ios-only">delete_forever</i>
                <i class="icon material-icons md-only">delete_forever</i>
                <span class="if-not-md"></span>

            </span>

        </div>
        </div>

        <div class="item-row">
        <div class="item-cell">


        </div>
        <div class="item-row">


        </div>
        </div>
        </div>


        </div>

        </li>

        `+htmlpromocion+`


        `;

        total=parseFloat(producto.cant)*parseFloat(producto.preuni);
        suma=parseFloat(suma)+parseFloat(total);	



        cont++;


    });


		var totalg=parseFloat(suma);
		var htmlsuma=`

		<div class="list media-list">
		<ul>
			<li>
			<a href="#" class="item-link item-content">
			<div class="item-inner item-cell">
				<div class="item-row">
				<div class="item-cell"></div>
				<div class="item-cell"></div>
				<div class="item-cell"></div>
				</div>
			<div class="row">
			<div class="col-22"></div>
			<div class="col-70">

			<label style="font-size:16px;"><span style="font-weight:bold;">SUBTOTAL:</span> $`+formato_numero(suma,2,'.',',')+`</label>
			</div>
			</div>
			<div class="row">
			<div class="col-40"></div>
			<div class="col-60">
			
			<div class="row">
			<label style="font-size:16px;margin-left: .2em;" id="totalpedido"><span style="font-weight:bold;">TOTAL:</span> $`+formato_numero(totalg,2,'.',',')+`</label>
			</div>
			</div>
			</div>
			</div>
			</a>
			</li>
		</ul>
		</div>


		`;



		var htmlsuma2=`<div id="totalesdecarrito">
		<div style="background-color:#dfdfdf;border-radius:10px;padding-top: .5px;padding-bottom: .5px;">
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;margin-left: .8em;">Subtotal:</span></div>
          <div class="" style="font-size: 22px;">$`+formato_numero(suma,2,'.',',')+`</div>
        </div>
      </div>


		<div class="block">
      <div class="row no-gap" style="text-align: center;">
          <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 2em;">Total:</span></div>
          <div class="" style="font-size: 22px;font-weight:bold;">$`+formato_numero(totalg,2,'.',',')+`</div>
        </div>
        </div>

        </div>

    
		
		<div class="list inset" style="margin-top:2em;">
		<ul>
		<li>
		<button onclick="ContinuarPedido()" class="col button button-fill botones botonesredondeado" style="
    font-weight:bold;text-transform:unset;width: 14em;
    margin-left: auto;
    margin-right: auto;">Confirmar orden </button>
		</li>

	<br>
		<li>
		<a href="/home/" class="col button button-fill botones botonesredondeado" style="
    font-weight:bold;text-transform:unset; width: 14em;
    margin-left: auto;
    margin-right: auto;">Seguir comprando</a>
		</li>

		</ul>
		</div>

		</div>`;
		
		
	
		$("#totalesdecarrito").html(htmlsuma2);
		

	}else{


		html+=`<div class="card ">
		<div class="card-header"></div>
		<div class="card-content card-content-padding">
		CARRITO VACÍO

		</div>
		</div>`;
		
		$("#totalesdecarrito").html('');

	}

	$("#lista-carrito").html(html);

}*/


function leerLocalStorage() {
	console.log('entro leer carrito');
	let productoLS;

	productoLS = obtenerProductosLocalStorage();
	var html ='';

	var contador=productoLS.length;
	var suma=0;
	var cont=0;
	
	//console.log('contador'+contador);
	if(contador>0) {


		productoLS.forEach(function (producto){
        //construir template

       	
        var htmlpromocion='';
        if (producto.promocion==1 ) {

        	htmlpromocion=`
        
			<li>

        	<div class="row">

        	<div class="col-20"></div>
        	<div class="col-70">
        	<span style="margin-left:.8em;background: yellow; border-radius: 40px;">Promoción</span>`;

        	if (producto.porfechas==1) {

        	 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción por fechas</div>`;
	
        	}

        	if(producto.directo==1){

               htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción directa</div>`;

        	}

        	if (producto.repetitivo==1) {

        		 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.dias+`</div>`;

        	}

        	if (producto.considerar>1) {
        	htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.considerar+`x`+producto.cantidad+`</div>`;


        	}


        	htmlpromocion+=`
        		</div>
        		</div>
        	`;
        }

        cadenap = producto.precioriginal;

       cadena=cadenap.indexOf("$");

		if (cadena != -1) {
		  
			var precioo=producto.precioriginal;
			var productoprecio=precioo.split('$');


			if (productoprecio[1]==0) {

				producto.precioriginal="";
			}


		}

       


        html+=`

        <li id="elemento_`+cont+`" class="elemento"  >
        <div class="">
        <div class="item-row">

	        <div class="item-cell">

		        <div class="item-media" style="margin:1em;" onclick="VisualizarImagen(\'`+producto.img+`\')">
		        <img style="width:100%;border-radius: 20px;" src="`+producto.img+`" width="80"/>`;
		        if (producto.precioriginal!='') {

		        html+=`<div class="preciooriginal1">`+producto.precioriginal+`</div>`;	
		       
		        }


		      html+=`  </div>
		        </div>
		        <div class="item-cell">
		        <div class="" style="font-size: 15px;" >`+producto.nombre+`</div>
		        <div class="item-text" >
		        <span style="font-size: 20px;" ></span>

		        </div>
		        <div class="item-after">
		        </div>
				<div  style="font-size: 16px;">
				<span style="font-weight:bold;">`+producto.cant+` `+`</span>x <span style="font-size: 15px;"> $`+formato_numero(producto.preuni,2,'.',',')+`</span>
				</div>`;

				if (producto.encontrado==1) {

					html+=`	<div class="divdescuentoaplicado">Desc. aplicado</div>`;

				}
		       
	       html+=` </div>
	           <div class="">

	           </div>



		        <div class="item-cell">
		        <div class="item-row">
		       

		        </div>
		        <div class="item-row">
		        <div class="item-cell">



        `;


		       html+=` </div>
		        </div>

        <div class="item-row">
                        <span style="font-size: 16px;float:right;font-weight:bold;margin-top: 1.6em;">$`+formato_numero(producto.price,2,'.',',')+`</span>

	        <div class="item-cell">

	         <span class="botoneliminar" onclick="eliminarProducto(`+cont+`)" data-id="`+producto.idpaquete+`" >
                <i class="icon material-icons ">delete_forever</i>
                <span class="if-not-md"></span>

            </span>
	        </div>
        
        <div class="item-row">
         

        </div>
        </div>
        </div>


        </div>

        </div>
        <div class="item-row" >`+htmlpromocion+`</div>
        <div class="" style="border-bottom: 1px solid #f3f3f3;" >`;


       		 var grupoopcion=producto.texto;


       		 if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;" class="titulocomplementos">Complementos</p>`;
       		 var opcionesdegrupo=producto.titulosgrupos;

       		 	var anterior=0;

       		 	for (var k =0; k <opcionesdegrupo.length; k++) {
       		 		

       		 	if (anterior!=opcionesdegrupo[k].idgrupo1) {
       		 		html+=`<p id="grupo_`+k+`_`+opcionesdegrupo[k].idgrupo1+`" class="grupo`+opcionesdegrupo[k].idgrupo1+`" style="text-align: center;font-weight:bold;">`+opcionesdegrupo[k].grupo+`</p>`;
       		 		
       		 		}
       		 		var comple=opcionesdegrupo[k].textoetiqueta;
       		 		var encontrado=comple.indexOf('$');
	        		classdiv="";
	        		dato1=comple;
					dato2="";
	        		if (encontrado!= -1) {

	        			classdiv="divcomplemento";

	        			dividircomple=comple.split('$');
	        			dato1=dividircomple[0];
	        			dato2='$'+dividircomple[1];
	        		}

       		 		html+=`<div> 

       		 			<p style="text-align: center;" ><span>`+producto.cant+` x </span>
	        		`+dato1+`<span class="`+classdiv+`">`+dato2+`</span></p>

       		 		</div>`;

       		 		anterior=opcionesdegrupo[k].idgrupo1;


       		 	}
	      /*  for(var j = 0; j < grupoopcion.length; j++) {

	        		var comple=grupoopcion[j];

	        		var encontrado=comple.indexOf('$');
	        		classdiv="";
	        		dato1=comple;
					dato2="";
	        		if (encontrado!= -1) {

	        			classdiv="divcomplemento";

	        			dividircomple=comple.split('$');
	        			dato1=dividircomple[0];
	        			dato2='$'+dividircomple[1];
	        		}
	        		
	        		html+=`

	        		<div class="row">
	        		<div class="col-10"></div>

	        		<div class="">
	        		<p style="text-align: center;" >
	        		`+dato1+`<span class="`+classdiv+`">`+dato2+`</span></p>
	        		</div>
	        		<div class="col-10"></div>

	        		</div>

	        		`;

	        	}*/
       	
       		}


       		if (producto.comentariopaquete!='') {

       		html+=`<p style="text-align: center;font-weight:bold;">Instrucciones especiales</p>`;
       		html+=`<p style="text-align: center;">`+producto.comentariopaquete+`</p>`;

           		}

      html+= ` </div>

        </li>
               


        `;





       


       	total=parseFloat(producto.cant)*parseFloat(producto.preuni);
        suma=parseFloat(suma)+parseFloat(total);	
        cont++;

    });




		var totalg=parseFloat(suma);


		localStorage.setItem('totalnota',totalg);

		var htmlsuma2=`

			<div id="totalesdecarrito">
		<div style="background-color:#dfdfdf;border-radius:10px;padding-top: .5px;padding-bottom: .5px;color:black;">
		<div class="block" style="display:block;">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;margin-left: .8em;">Subtotal:</span></div>
          <div class="" style="font-size: 22px;">$`+formato_numero(suma,2,'.',',')+`</div>
        </div>
      </div>`;




      	htmlsuma2+=`
      	<div class="block descuentoaparecer " id="descuentoaparecer" style="display: none;">
            <div class="row no-gap" style="text-align: center;"> 
              <div class="">
                <span style="font-size: 22px;margin-left: .8em;color: red;">Dcto.<span class="simbolo" id="simbolo"></span>:</span>
              </div>
              <div class="descuento" id="descuento" style="font-size: 22px;color: red;"></div>
            </div>
          </div>

      	`;

		htmlsuma2+=`<div class="block">
      <div class="row no-gap" style="text-align: center;">
          <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;">Total:</span></div>
          <div class="totalapagar" id="totalapagar" style="font-size: 22px;font-weight:bold;">$`+formato_numero(totalg,2,'.',',')+`</div>
        </div>
        </div>

        </div>



		</div>
		`;

		$("#totalesdecarrito").html(htmlsuma2);
	}else{


		html+=`<div class="card ">
		<div class="card-header"></div>
		<div class="card-content card-content-padding">
		CARRITO VACÍO

		</div>
		</div>`;
		
		$("#totalesdecarrito").html('');

		$("#continuarpedido").css('display','none');

	}

	$("#lista-carrito").html(html);

}

function ContinuarPedido() {

	var carrito=localStorage.getItem('carrito');
	localStorage.setItem('carritocopia',carrito);

	Comprobaciondepedido2();



	var id_user=localStorage.getItem('id_user');

	if (id_user!=0) {


			localStorage.setItem('adelante',1);


		var validacion=localStorage.getItem('validacion');

			
			if (validacion==0) {

				GoToPage("continuar");

			}else{

			MensajeValidacion();

			}

	}else{

		alerta('Por favor inicia sesión o regístrate para continuar','');
		localStorage.setItem('continuar',1);
		 GoToPage("/");

	}

	
}

function MensajeValidacion(){

		if (localStorage.getItem('validacion')!=0 && localStorage.getItem('validacion')!=undefined) {

		var validacion=JSON.parse(localStorage.getItem('validacion'));

			var validadosucursal=validacion.validadosucursal;

			console.log('validadosucursal'+validadosucursal);

			if(validadosucursal==1) {
				var mensaje="";
                var elementosvalidados=validacion.paquetesvalidar;
               var  novalidados=0;
                for (var i = 0; i <elementosvalidados.length; i++) {
                	  var validarpaquete=elementosvalidados[i].validarpaquete;
                        var conpromocion=elementosvalidados[i].conpromocion;
                        var existepromocion=elementosvalidados[i].existepromocion;
                        var paquetevalidado=elementosvalidados[i].paquetevalidado;
                        colocar=0;
						if (validarpaquete==0 && paquetevalidado==0 ) {
								colocar=1;	
						}


						if (validarpaquete==1 && paquetevalidado==0) {
								colocar=1;	
						}

						if (colocar==1) {
							
						var paquete =elementosvalidados[i].paquete.nombrepaquete;
						
						mensaje=mensaje+'<br>*'+paquete+'<br>';
						novalidados++;
						}							
					}


					if (novalidados>0) {

						alerta('','Los siguientes paquetes no se encuentran disponibles'+mensaje+' Para continuar tiene que eliminarlos ');
					}


			}else{

				alerta('','La sucursal no se encuentra activa');
			}

		}
}

//Eliminar curso del carrito en el DOM
function eliminarProducto(idcontador){
   // e.preventDefault();

   let producto, productoId;
  /*  if(e.target.classList.contains('borrar-curso')){
    	alert('aqui');
        producto = e.target.parentElement.parentElement;
        productoId = curso.querySelector('a').getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
    }*/
  app.dialog.confirm('','¿Seguro de eliminar el producto?', function () {
          
       
    $(".elemento").each(function(){
    	var id=$(this).attr('id');

    	//console.log(id);

    	var elemento=id.split('_');
    	//console.log(elemento[1]);

    	if (idcontador==elemento[1]) {
    		$("#elemento_"+idcontador).remove();
    	}


    });


    eliminarProductoLocalStorage(idcontador);

   // alerta('','Producto eliminado');

   	productoLS = obtenerProductosLocalStorage();
	var contador=productoLS.length;

		if (contador==0) {

			Inicio();
			localStorage.setItem('montodescontado',0);
			localStorage.setItem('codigocupon','');
			localStorage.setItem('idcupon','');
 
			//GoToPage("/home/");

		}
		var codigocupon=localStorage.getItem('codigocupon');
		if (codigocupon!='') {
			AplicarCupon();
		
		}else{

			 leerLocalStorage();
   			 Recalcular1();


		}
 
   
     });
}

//Eliminar  por el data-id en el localStorage
function eliminarProductoLocalStorage(idcontador){
	let productosLS;

	productosLS = obtenerProductosLocalStorage();
	//console.log('eliminando');
	conta=0;
	productosLS.forEach(function(productoLS, index){
		//console.log('entro al for'+productoLS.idpaquete+'-'+idcontador);
	
		if (conta==idcontador) {

		productosLS.splice(index, 1);

		}


	conta++;
		
	});

	localStorage.setItem('carrito', JSON.stringify(productosLS));
	localStorage.setItem('carritocopia2', JSON.stringify(productosLS));

}

function Contarcarrito() {
			$(".iconocarrito").css('display','none');

	productoLS = obtenerProductosLocalStorage();
	var contador=productoLS.length;
 
 	var paddin=0;
	if (contador>0) {
		$(".badge1").text(contador);

			paddin=1;
		$(".iconocarrito").css('display','block');

		}else{
			$(".iconocarrito").css('display','none');
			$(".badge1").text(0);

			paddin=0;
		}

		var estatus='0,1,2,3';
		//console.log('paddin'+paddin);
	

	iduser=localStorage.getItem('id_user');

/*	if (iduser!=0 && iduser!=null) {
*/		//ContarPedidospendientes(paddin,estatus);
	//}
	
}

function ContarPedidospendientes(paddin,estatus) {
	
		var iduser=localStorage.getItem('id_user');

	var estatus="";
	var datos="iduser="+iduser+"&estatus="+estatus;
		var pagina = "ObtenerTodospedidos.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
				//console.log(datos);

			var notas=datos.respuesta;

			var contardor=notas.length;
			var pendiente=0;
			var aceptado=0;
			var enviado=0;
			var cancelado=0;
			for (var i = 0; i < notas.length; i++) {
				if (notas[i].estatus==0) {
					pendiente++;
				}
				if (notas[i].estatus==1) {
					aceptado++;
				}
				if (notas[i].estatus==2) {
					enviado++;
				}
				if (notas[i].estatus==3) {
					cancelado++;
				}
			}

		


			$(".badge2").text(pendiente);
			$(".badge35").text(aceptado);
			$(".badge4").text(enviado);

			$(".badge5").text(cancelado);

			if (paddin==1) {

				$(".iconocarrito").css('bottom','30px');


					if (enviado>0) {

							$(".iconoenviado").css('bottom','90px');
						}

						if (enviado==0 && aceptado>0) {

							$(".iconoaceptado").css('bottom','90px');
						}
						if (enviado==0 && aceptado==0 && pendiente>0) {

							$(".iconopendiente").css('bottom','90px');
						}

						if (enviado>0 && aceptado>0) {

							$(".iconoaceptado").css('bottom','150px');


						}

						if (enviado>0 && pendiente>0 && aceptado==0) {

							$(".iconopendiente").css('bottom','150px');


						}


						if (aceptado>0 && pendiente>0 && enviado==0) {

							$(".iconopendiente").css('bottom','150px');
	
						}

					if (aceptado==0 && pendiente>0 && enviado==0) {

							$(".iconopendiente").css('bottom','90px');
	
						}


						if (aceptado>0 && pendiente>0 && enviado>0) {

							$(".iconopendiente").css('bottom','210px');

						}


					if (enviado==0) {

					$(".iconoenviado").css('display','none');
	
					}

					if (aceptado==0) {

					$(".iconoaceptado").css('display','none');
	
					}

					if (pendiente==0) {

					$(".iconopendiente").css('display','none');
	
					}
				
			}

			if (paddin==0) {

				botom=0;

				if (botom==0) {
					if (enviado>0) {

						$(".iconoenviado").css('bottom','30px');
						botom=1;
						}

				}
				if (botom==0) {

					if (aceptado>0) {
						
						$(".iconoaceptado").css('bottom','30px');
						botom=1;
					}
				}

				if (botom==0) {
					if (pendiente>0) {
						
						$(".iconopendiente").css('bottom','30px');
						botom=1;
					}
				}





					
						if (enviado>0 && aceptado>0) {

							$(".iconoaceptado").css('bottom','90px');


						}

						if (enviado>0 && pendiente>0 && aceptado==0) {

							$(".iconopendiente").css('bottom','90px');


						}


						if (aceptado>0 && pendiente>0 && enviado==0) {

							$(".iconopendiente").css('bottom','90px');
	
						}

						if (aceptado>0 && pendiente>0 && enviado>0) {

							$(".iconopendiente").css('bottom','150px');

						}

						if (enviado==0) {

					$(".iconoenviado").css('display','none');
	
					}

					if (aceptado==0) {

					$(".iconoaceptado").css('display','none');
	
					}

					if (pendiente==0) {

					$(".iconopendiente").css('display','none');
	
					}

			}


					if (enviado>0) {

					$(".iconoenviado").css('display','block');
	
					}

					if (aceptado>0) {

					$(".iconoaceptado").css('display','block');
	
					}

					if (pendiente>0) {

					$(".iconopendiente").css('display','block');
	
					}

					if (cancelado>0) {

						$(".iconocancelado").css('display','block');
					}else{

						$(".iconocancelado").css('display','none');

					}

			/*if (contardor>0) {
				$(".badge2").text(contardor);


				if (paddin==1) {

					$(".iconopedido").css('bottom','6em');
					$(".iconocarrito").css('bottom','11em');

					//console.log('padding-bottom','5em');
				}else{

					$(".iconopedido").css('bottom','6em');
	
				}

			}else{

			$(".iconocarrito").css('bottom','6em');

			$(".iconopedido").css('display','none');
			$(".badge2").text(0);


				


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


//Imprimir  de localStorage
function leerCarrito() {
	console.log('entro leer carrito');
	let productoLS;

	productoLS = obtenerProductosLocalStorage();
	var html ='';

	var contador=productoLS.length;
	var suma=0;
	var cont=0;
	//console.log('contador'+contador);
	if(contador>0) {


		productoLS.forEach(function (producto){
        //construir template

       	
        var htmlpromocion='';
        if (producto.promocion==1 ) {

        	htmlpromocion=`
        	<li>

        	<div class="row">

        	<div class="col-20"></div>
        	<div class="col-70">
        	<span style="margin-left:.8em;background: yellow; border-radius: 40px;">Promoción</span>`;

        	if (producto.porfechas==1) {

        	 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción por fechas</div>`;
	
        	}

        	if(producto.directo==1){

               htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción directa</div>`;

        	}

        	if (producto.repetitivo==1) {

        		 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.dias+`</div>`;

        	}

        	if (producto.considerar>1) {
        	htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.considerar+`x`+producto.cantidad+`</div>`;


        	}


        	htmlpromocion+=`
        		</div>
        		</div>
        	</li>`;
        }


           cadenap = producto.precioriginal;

       cadena=cadenap.indexOf("$");

		if (cadena != -1) {
		  
			var precioo=producto.precioriginal;
			var productoprecio=precioo.split('$');


			if (productoprecio[1]==0) {

				producto.precioriginal="";
			}


		}

        
        html+=`

        <li id="elemento_`+cont+`" class="elemento"  >
        <div class="">
        <div class="item-row">

        <div class="item-cell">

        <div class="item-media" style="margin:1em;" onclick="VisualizarImagen(\'`+producto.img+`\')">
        <img style="width:100%;border-radius: 20px;" src="`+producto.img+`" width="80"/></div>`;

        if (producto.precioriginal!='') {

		        html+=`<div class="preciooriginal1">`+producto.precioriginal+`</div>`;	
		       
		        }
       html+=` </div>
        <div class="item-cell">
        <div class="" style="font-size: 15px;" >`+producto.nombre+`</div>
        <div class="item-text" ><span style="font-size: 20px;" ></span>

        </div>
        <div class="item-after">
        </div>
		<div  style="font-size: 16px;"><span style="font-weight:bold;">`+producto.cant+` `+`</span>x <span style="font-size: 15px;">$`+formato_numero(producto.preuni,2,'.',',')+`</span>
		</div>
       
        </div>
           <div class="">

           </div>



        <div class="item-cell">
        <div class="item-row">


        </div>
        <div class="item-row">
        <div class="item-cell">

                <span style="margin-left:3em;font-size: 16px;float:right;font-weight:bold;margin-top: 1.6em;">$`+formato_numero(producto.totpaq,2,'.',',')+`</span>


        `;


       html+=` </div>
        </div>

        <div class="item-row">
        <div class="item-cell">


        </div>
        <div class="item-row">


        </div>
        </div>
        </div>


        </div>
        </div>

         <div class="item-row" >`+htmlpromocion+`</div>
        <div class="" style="border-bottom: 1px solid #f3f3f3;" >`;



       		  var grupoopcion=producto.texto;


       		 if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;" class="titulocomplementos">Complementos</p>`;
       		 var opcionesdegrupo=producto.titulosgrupos;

       		 	var anterior=0;

       		 	for (var k =0; k <opcionesdegrupo.length; k++) {
       		 		

       		 	if (anterior!=opcionesdegrupo[k].idgrupo1) {
       		 		html+=`<p id="grupo_`+k+`_`+opcionesdegrupo[k].idgrupo1+`" class="grupo`+opcionesdegrupo[k].idgrupo1+`" style="text-align: center;font-weight:bold;">`+opcionesdegrupo[k].grupo+`</p>`;
       		 		
       		 		}
       		 		var comple=opcionesdegrupo[k].textoetiqueta;
       		 		var encontrado=comple.indexOf('$');
	        		classdiv="";
	        		dato1=comple;
					dato2="";
	        		if (encontrado!= -1) {

	        			classdiv="divcomplemento";

	        			dividircomple=comple.split('$');
	        			dato1=dividircomple[0];
	        			dato2='$'+dividircomple[1];
	        		}

       		 		html+=`<div> 

       		 			<p style="text-align: center;" ><span>`+producto.cant+` x </span>
	        		`+dato1+`<span class="`+classdiv+`">`+dato2+`</span></p>

       		 		</div>`;

       		 		anterior=opcionesdegrupo[k].idgrupo1;


       		 	}
       		 }

       		 /*if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;">Complementos</p>`;

	        	for(var i = 0; i < grupoopcion.length; i++) {


	        		
	        		var comple=grupoopcion[i];

	        		var encontrado=comple.indexOf('$');
	        		classdiv="";
	        		dato1=comple;
					dato2="";
	        		if (encontrado!= -1) {

	        			classdiv="divcomplemento";

	        			dividircomple=comple.split('$');
	        			dato1=dividircomple[0];
	        			dato2='$'+dividircomple[1];
	        		}
	        		
	        		html+=`

	        		<div class="row">
	        		<div class="col-10"></div>

	        		<div class="">
	        		<p style="text-align: center;" >
	        		`+dato1+`<span class="`+classdiv+`">`+dato2+`</span></p>
	        		</div>
	        		<div class="col-10"></div>

	        		</div>

	        		`;
	        	}
       	
       		}*/

       		if (producto.comentariopaquete!='') {

       		html+=`<p style="text-align: center;font-weight:bold;">Instrucciones especiales</p>`;
       		html+=`<p style="text-align: center;">`+producto.comentariopaquete+`</p>`;

           		}

      html+= ` </div>

        </li>
               


        `;





       
/*
       		 var grupoopcion=producto.texto;

       		 if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;">Complementos</p>`;

	        	for(var i = 0; i < grupoopcion.length; i++) {


	        		
	        		html+=`<p style="text-align: center;">`+grupoopcion[i]+`</p>`;
	        	}
       	
       		}*/

       	total=parseFloat(producto.cant)*parseFloat(producto.preuni);
        suma=parseFloat(suma)+parseFloat(total);	
        cont++;

    });


		var datosextras=JSON.parse(localStorage.getItem('datosextras'));



		var totalg=parseFloat(suma);


		var htmlsuma2=`

			<div id="totalesdecarrito">
		<div style="background-color:#dfdfdf;border-radius:10px;padding-top: .5px;padding-bottom: .5px;">
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;margin-left: .8em;">Subtotal:</span></div>
          <div class="subtotalapagar" style="font-size: 22px;">$`+formato_numero(suma,2,'.',',')+`</div>
        </div>
      </div>`;


      if (localStorage.getItem('montodescontado')!=0) {


      	

      	var descuento= localStorage.getItem('montodescontado');

     	var variabledescuento=localStorage.getItem('variabledescuento');


		htmlsuma2+=`
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;padding-left:1em;color:red;">Descuento `+variabledescuento+`:</span></div>
          <div class="descuento" style="font-size: 22px;color:red;">-$`+formato_numero(descuento,2,'.',',')+`</div>
        </div>
      </div>
		`;





      }
      


      /*var habilitarsumaenvio=localStorage.getItem('habilitarsumaenvio');
      var cadena2=0;

      if (habilitarsumaenvio==1) {

      	if (parseInt(datosextras.sucursalproveedorcodigo)>0) {


				var cadena=datosextras.textodatoscostoenvio.split('$');
				
				if (cadena.length>2) {

					if (cadena[1]==cadena[2]) {

							cadena2=cadena[1];
						}else{

							cadena2=cadena[2];
						}


				}else{

					cadena2=cadena[1];
				}
				


      		 htmlsuma2+=`	<div class="block">
      <div class="row no-gap" style="text-align: center;">
          <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;">Envío:</span></div>
          <div class="costoenviopago" style="font-size: 22px;font-weight:bold;">$`+formato_numero(cadena2,2,'.',',')+`</div>
        </div>
        </div>

       
		`;

		totalg=parseFloat(totalg)+parseFloat(cadena2);
		}
      }*/


        /*if (localStorage.getItem('ivapaquetes')!=0) {

        montofacturar=localStorage.getItem('montoafacturar');
      	ivapaquetes=localStorage.getItem('ivapaquetes');

      	totalg=parseFloat(totalg)+parseFloat(ivapaquetes);

		htmlsuma2+=`
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;padding-left: 1em;font-weight:bold;">I.V.A.<span style="font-size: 10px" class="montoafacturar">($`+formato_numero(montofacturar,2,'.',',')+`)</span>:</span></div>
          <div class="" style="font-size: 22px;font-weight:bold;">$`+formato_numero(ivapaquetes,2,'.',',')+`</div>
        </div>
      </div>
		`;

      }*/

		var comisiontotal=0;
       /* if (localStorage.getItem('comisiontotal')!=0) {

        	comisiontotal=localStorage.getItem('comisiontotal');
     
      htmlsuma2+=`<div class="block comisionaparecer" id="comisionaparecer">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;">Comisión:</span></div>
              <div class="comision" id="comision" style="font-size: 22px;font-weight:bold;">$`+formato_numero(comisiontotal,2,'.',',')+`</div>
            </div>
            </div>`;


        }*/
   
   		totalg=parseFloat(totalg)-parseFloat(descuento)+parseFloat(comisiontotal);


	 htmlsuma2+=`	<div class="block">
      <div class="row no-gap" style="text-align: center;">
          <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;">Total:</span></div>
          <div class="totalapagar" style="font-size: 22px;font-weight:bold;">$`+formato_numero(totalg,2,'.',',')+`</div>
        </div>
        </div>

        </div>



		</div>
		`;


		/*var montoafacturar=0;
        if (localStorage.getItem('montoafacturar')!=0) {

        	montoafacturar=localStorage.getItem('montoafacturar');
     
      htmlsuma2+=`<div class="block totalfacturaaparecer" id="totalfacturaaparecer">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 2em;">Total a facturar:</span></div>
              <div class="totalafacturarpagar" id="totalafacturarpagar" style="font-size: 22px;font-weight:bold;">$`+formato_numero(montoafacturar,2,'.',',')+`</div>
            </div>
            </div>`;


        }*/


	

		$("#totalesdecarrito").html(htmlsuma2);


		var confecha=localStorage.getItem('confecha');
		var condireccionentrega=localStorage.getItem('condirecionentrega');



		var opcionelegida=datosextras.opcionelegida;

		htmlopcionelegida=`
                <div class="item-text">`+opcionelegida+`</div>
              `;

		$("#opcionelegida").html(htmlopcionelegida);

		if (confecha==1) {

			var fechaen=datosextras.fecha.split('T');
			var fechadividida=fechaen[0].split('-');

			var fechaordena=fechadividida[2]+'/'+fechadividida[1]+'/'+fechadividida[0];

				htmlfe=`
                <div class="item-text">`+fechaordena+' '+fechaen[1]+`</div>
             `;
			$("#fechaentrega").html(htmlfe);

		}

		

		if (condireccionentrega==1) {

			var direccion=datosextras.textodireccion;

			//var htmldire=`<p style="font-weight:bold;">DIRECCIÓN DE ENVÍO:</p><p style="text-align:center">`+direccion+`</p>`;		
			
			htmldire=`
                <div class="item-text" style="-webkit-line-clamp:4!important">`+direccion+`</div>
            `;

			$("#direccionentrega").html(htmldire);

		}

		var formapago=datosextras.opcionelegidapago;
			htmlforma=`
                <div class="item-text">`+formapago+`</div>
            `;

             if (datosextras.montocliente!='' && datosextras.montocliente!=null) {

			          htmlforma+=`
			              <div class="item-text">$`+formato_numero(datosextras.montocliente,2,'.',',')+`</div>
			            `;

			            }

			    	if (datosextras.confoto==1) {

			    			PintarlistaImagen3();


			  	}
 
			 

			$("#formadepago").html(htmlforma);




			var factura=datosextras.factura;
			$("#facturacion").css('display','none');

			if (factura==1) {

				
				$("#facturacion").css('display','block');

				var razonsocial=datosextras.textodatosfactura;
				htmlrazon=`
                <div class="" style="color:#757575;font-size: 14px;">`+razonsocial+`</div>
           												 `;
				$("#razonsocial").html(htmlrazon);

				var metodopago=datosextras.textometodopago;

				htmlmetodo=`
                <div class="item-text">`+metodopago+`</div>`;
				$("#metodopago1").html(htmlmetodo);

				var formapago=datosextras.textoformapago;

				htmlforma=`
                <div class="item-text">`+formapago+`</div>`;
				$("#formapago1").html(htmlforma);

				var usocfdi=datosextras.textousocfdi;
				htmluso=`
                <div class="item-text">`+usocfdi+`</div>`;
				$("#usocfdi1").html(htmluso);
			}

				$("#observacionespedido").css('display','none');
				$("#botonobservaciones").css('display','none');

				var activoobservacion=localStorage.getItem('activoobservacion');

				if (activoobservacion==1) {


					$("#botonobservaciones").css('display','block');
				}

				/*$("#observacionespedido").css('display','block');
				 htmlobser=` <div class="item-text">`+datosextras.observacionpedido+`</div>`;
				$("#observaciones").html(htmlobser);
*/
			


		if (condireccionentrega==1) {
			if (parseInt(datosextras.sucursalproveedorcodigo)>0) {


				var cadena=datosextras.textodatoscostoenvio.split('$');
				var cadena2="";
				if (cadena.length>2) {

					cadena2=' '+cadena[2];
				}

				$("#costodeenviopedido").css('display','block');
				 htmlenvio=` <div class="item-text" style="-webkit-line-clamp:4;">`+cadena[0]+` $`+cadena[1]+` `+cadena2+`</div>`;
				$("#costoenvio").html(htmlenvio);

			}

		}else{

		$("#costodeenviopedido").css('display','none');

		}



		if (localStorage.getItem('codigocupon')!='') {

		/*	alert('aq');
			var codigocupon=localStorage.getItem('codigocupon');
			$("#cuponaplicado").css('display','block');
				 htmlcupon=` <div class="item-text" style="-webkit-line-clamp:4;">`+codigocupon+`</div>`;

			$("#cupondescripcion").html(htmlcupon);*/
		}
		

	}else{


		html+=`<div class="card ">
		<div class="card-header"></div>
		<div class="card-content card-content-padding">
		NO SE ENCONTRARON DATOS

		</div>
		</div>`;
		
		$("#totalesdecarrito").html('');

	}

	$("#lista-carrito").html(html);

}


function ObtenerPaquetesPromociones() {

	var idsucursales=localStorage.getItem('idsucursales');

	var pagina = "ObtenerPromocionesSucursal.php";
	var datos="idsucursales="+idsucursales;
	$.ajax({

		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
				
			var datos=datos.respuesta;

			PintarPaquetespromociones(datos);



		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					}
		});
}

function PintarPaquetespromociones(datos) {
	var html='';
	
	if (datos.length>0) {

					localStorage.setItem('listadopaquetes',JSON.stringify(datos));


			for (var i = 0; i <datos.length; i++) {

				var htmlpromocion="";
				if (datos[i].promocion==1 && datos[i].preciofijo!='' && datos[i].preciofijo>0) {

					datos[i].precioventa=datos[i].preciofijo;
			
				}


				if (datos[i].promocion==1 && datos[i].considerar>1) {

							htmlpromocion=`

					<div class="item-after">`+datos[i].considerar+'x'+datos[i].cantidad +`</div>

					`;
				}


					html+=`  <li class="categoriaslip clasesp`+datos[i].idpaquete+`" >
            <a  class="item-link item-content">`;

             if (datos[i].foto!='' && datos[i].foto!=null) {
                        	imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+datos[i].foto;

                        }else{

                        	imagen=urlimagendefault;
                        }

                 if (datos[i].precioventa==0) {

            		datos[i].precioventa="";
            	}else{
            		datos[i].precioventa="$"+datos[i].precioventa;

            	}

            html+=` <div class="item-media">
           		 <img onclick="Verdetallepaquete(`+datos[i].idpaquete+`)" class="bordesredondeados" src="`+imagen+`" width="120" />
             	</div>
              <div class="item-inner">
                <div class="item-title-row">
                
                </div>
                <div class="item-subtitle"></div>
 <div class="item-title letrablack" >
 <div onclick="Verdetallepaquete(`+datos[i].idpaquete+`)" style="
    line-height: 1;
    white-space: break-spaces;">`+truncString(datos[i].nombrepaquete,40,'...')+`</div>`;

/*                 <div class="item-title letrablack" ><div onclick="Verdetallepaquete(`+datos[i].idpaquete+`)">`+truncString(datos[i].nombrepaquete,17,'...')+`</div>
*/

html+=`<div onclick="Verdetallepaquete(`+datos[i].idpaquete+`)" class="item-text" style="height: 6em;
    font-size: 10px;
    white-space: break-spaces;
    line-height: 1;
    -webkit-line-clamp: 10!important;
    padding-top: 0.5em
;">`+datos[i].descripcion+`</div>
                 `;



                 var cadena=datos[i].nombrepaquete.length;

                /* if (cadena>=40) {
              html+=`   <div style="float: right;">
	    		<span id="span_`+datos[i].idpaquete+`" class="material-icons material-icons-outlined" style="font-size: 18px;color:#757575;" onclick="Expandirinformacionpaquete(`+datos[i].idpaquete+`)">add_circle_outline</span>
	    </div>`;
			}*/

  html+= ` </div>

  	 <div class="item-after" onclick="Verdetallepaquete(`+datos[i].idpaquete+`)" style="
		    font-weight: bold;
		    color: black;">`;

				if (datos[i].precioventa!='') {
					html+=`<div class="textoababoizquierda precioriginal" id="precioriginal">`+datos[i].precioventa+`</div>`;
				}

			html+=`</div>
                <div class="item-text"></div>
              </div>
            </a>
            </li>


             	<label style="display:none;" class="label-radio item-content textopaquete" id="textopaquete_`+datos[i].idpaquete+`" >
              <div class="item-inner">
               
                <div class="item-text " style="margin-left: 1em;text-align: center;-webkit-line-clamp:10;">

                  <div style="padding-top: .2em;padding-bottom: .2em;background: #e9e9e9;border-radius: 10px;font-size:16px;padding-left: 1em; padding-right: 1em;">
                   `+datos[i].nombrepaquete+`<div style="display:none;">`+datos[i].precioventa+`</div>
                  </div>
                </div>
              </div>
            </label>


            `;

			}


				html+=`  <li class="categoriaslip clasesp0" style="display:none;">
		<a href="#" class="item-link item-content">
		<div class="item-media"></div>
		<div class="item-inner">
		<div class="item-title-row">
		<div class="item-title"></div>
		<div class="item-after"></div>
		</div>
		<div class="item-subtitle"></div>
		<div class="item-text">
		NO SE ENCUENTRAN COINCIDENCIAS.
		</div>
		</div>
		</a>
		</li>`;
	}else{

			html+=`  <li class="categoriaslip clases0" style="display:none;">
		<a href="#" class="item-link item-content">
		<div class="item-media"></div>
		<div class="item-inner">
		<div class="item-title-row">
		<div class="item-title"></div>
		<div class="item-after"></div>
		</div>
		<div class="item-subtitle"></div>
		<div class="item-text">
		NO SE ENCUENTRAN REGISTROS.
		</div>
		</div>
		</a>
		</li>`;


	}

	$("#listadopaquetes").html(html);
}


var dynamicSheet="";
function AbrirModalInstrucciones(){

	 dynamicSheet = app.sheet.create({
        content: `
         
        `,
        // Events
        on: {
          open: function (sheet) {



          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });


	   if (localStorage.getItem('comentariopaquete')!='') {
            	alert('a');
            }
	  $("#modalpaquete").open();

	/**/
}

function GuardarInstrucciones() {


	var instrucciones=$("#comentariopaquete").val();
	localStorage.setItem('comentariopaquete',instrucciones);

	$("#instrucciones").text(instrucciones);


	if (instrucciones!='') {
	
	$("#verinstrucciones").css('display','block');
	
	}else{

	$("#verinstrucciones").css('display','none');

	}
app.dialog.close();
  	/*$(".modalpaquete").removeClass('modal-in');
  	$(".modalpaquete").addClass('modal-out');
  	$(".sheet-backdrop").removeClass('backdrop-in');
  	$(".modalpaquete").css('display','none');*/
}


function CerrarModal() {
	$("#comentariopaquete").val('');
	$(".modalpaquete").removeClass('modal-in');
  	$(".modalpaquete").addClass('modal-out');
  	$(".sheet-backdrop").removeClass('backdrop-in');
  	$(".modalpaquete").css('display','none');
}

function PintarImagenesPaquete(paquete,imagenesdelpaquete) {
	var estilo="";
	
		if (paquete.foto2!='' && paquete.foto2!=null) {
		imagen=urlimagenes+'paquetes/imagenespaquete/'+codigoserv+paquete.foto2;

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
        		html2+=`<div class="contorno demo-facebook-card bordesredondeados " style="margin-left: 1em; margin-right: 1em;" >
                        <div class="">
                          <div class="demo-facebook-avatar">
                        </div>
                        </div>
                        <div class="card-content" style="margin-right: 1em;margin-left: 1em;"> `;

                        if (paquete.foto2!='' && paquete.foto2!=null) {
                        	imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+paquete.foto2;

                        }else{

                        	imagen=localStorage.getItem('logo');
                        }


                       html2+=`<div style="" class="">
  
                        <img class="bordesredondeados " onclick="VisualizarImagen(\'`+imagen+`\')" src="`+imagen+`"
                          style="width:100%;border-radius:10px;margin-bottom:1em;`+estilo+`" />
                           <div class="textoababoderecha precioriginal cambiarfuente" id="precioriginal"></div>

                          </div>`;
                       /* <div class="card-footer" style="">

                          <div style="font-weight: bold;
   										 border-radius: 10%;
   							 padding: .2em;margin-top: .6em;font-size:16px;" class="fuente">`+datos[i].sucursal+`</div>
                        </div>*/
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

				                        <div class="card-content"> 
				                        <div style="" >
				   						
				                           

				                        <img class="bordesredondeados " onclick="VisualizarImagen(\'`+urlimg+`\')" src="`+urlimg+`"
				                          style="width:12em;margin-bottom:1em;" />
				                           <div class="textoababoderecha precioriginal" id="precioriginal"></div>

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
}

function Expandirinformacion(idgrupo,
idgrupopaquetes,idgrupoopcion) {



	if($("#texto_"+idgrupo+'_'+idgrupopaquetes+'_'+idgrupoopcion).css('display') == 'none'){
  		$("#texto_"+idgrupo+'_'+idgrupopaquetes+'_'+idgrupoopcion).css('display','block');
  		  $("#span_"+idgrupo+'_'+idgrupopaquetes+'_'+idgrupoopcion).html('remove_circle_outline');

		}else{
		  
		  $("#texto_"+idgrupo+'_'+idgrupopaquetes+'_'+idgrupoopcion).css('display','none');
  		  $("#span_"+idgrupo+'_'+idgrupopaquetes+'_'+idgrupoopcion).html('add_circle_outline');

		}

	
	
}


function ObtenerPaquetesVinculado(idpaquete,idsucursal,paquete) {

	var pagina = "ObtenerPaquetesVinculados.php";
	var datos="idpaquete="+idpaquete+"&idsucursal="+idsucursal;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			var respuesta=datos.respuesta;
		
			if (respuesta!=null) {
			if (respuesta.length>0) {

				mensaje=respuesta[0].mensaje;

				 app.dialog.create({
		          title: '',
		          text: mensaje,
		          buttons: [
		            {
		              text: 'OMITIR',
		            },
		            {
		              text: 'ACEPTAR',
		            },
		            
		          ],

		          onClick: function (dialog, index) {

			            if(index === 0){
			                //Button 1 clicked

			                //alert(enlace);
			              // window.open(enlace);
			            }
			            else if(index === 1){
			                //Button 2 clicked
			               VisualizarPromociones(respuesta);
			            }
			          
			        },
		          verticalButtons: false,
		        }).open();


      
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

function VisualizarPromociones(respuesta) {
	
	  localStorage.setItem('arreglo',JSON.stringify(respuesta));
	   	GoToPage("promociones");

}


//Imprimir  de localStorage
function leerCarrito2() {
	console.log('entro leer carrito 2');
	let productoLS;

	productoLS = obtenerProductosLocalStorage();
	var html ='';

	var contador=productoLS.length;
	var suma=0;
	var cont=0;
	//console.log('contador'+contador);
	if(contador>0) {


		productoLS.forEach(function (producto){
        //construir template

       	
        var htmlpromocion='';
        if (producto.promocion==1 ) {

        	htmlpromocion=`
        	<li>

        	<div class="row">

        	<div class="col-20"></div>
        	<div class="col-70">
        	<span style="margin-left:.8em;background: yellow; border-radius: 40px;">Promoción</span>`;

        	if (producto.porfechas==1) {

        	 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción por fechas</div>`;
	
        	}

        	if(producto.directo==1){

               htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">Promoción directa</div>`;

        	}

        	if (producto.repetitivo==1) {

        		 htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.dias+`</div>`;

        	}

        	if (producto.considerar>1) {
        	htmlpromocion+=`<div style="margin-left:1.2em;font-size:10px;">`+producto.considerar+`x`+producto.cantidad+`</div>`;


        	}


        	htmlpromocion+=`
        		</div>
        		</div>
        	</li>`;
        }


           cadenap = producto.precioriginal;

       cadena=cadenap.indexOf("$");

		if (cadena != -1) {
		  
			var precioo=producto.precioriginal;
			var productoprecio=precioo.split('$');


			if (productoprecio[1]==0) {

				producto.precioriginal="";
			}


		}

        
        html+=`

        <li id="elemento_`+cont+`" class="elemento"  >
        <div class="">
        <div class="item-row">

        <div class="item-cell">

        <div class="item-media" style="margin:1em;" onclick="VisualizarImagen(\'`+producto.img+`\')">
        <img style="width:100%;border-radius: 20px;" src="`+producto.img+`" width="80"/></div>`;

        if (producto.precioriginal!='') {

		        html+=`<div class="preciooriginal1">`+producto.precioriginal+`</div>`;	
		       
		        }
       html+=` </div>
        <div class="item-cell">
        <div class="" style="font-size: 15px;" >`+producto.nombre+`</div>
        <div class="item-text" ><span style="font-size: 20px;" ></span>

        </div>
        <div class="item-after">
        </div>
		<div  style="font-size: 16px;"><span style="font-weight:bold;">`+producto.cant+` `+`</span>x <span style="font-size: 15px;">$`+formato_numero(producto.preuni,2,'.',',')+`</span>
		</div>`;
		if (producto.encontrado==1) {

					html+=`	<div class="divdescuentoaplicado">Desc. aplicado</div>`;

				}
       
       html+=` </div>
           <div class="">

           </div>



        <div class="item-cell">
        <div class="item-row">


        </div>
        <div class="item-row">
        <div class="item-cell">

                <span style="margin-left:3em;font-size: 16px;float:right;font-weight:bold;margin-top: 1.6em;">$`+formato_numero(producto.price,2,'.',',')+`</span>


        `;


       html+=` </div>
        </div>

        <div class="item-row">
        <div class="item-cell">


        </div>
        <div class="item-row">


        </div>
        </div>
        </div>


        </div>
        </div>

         <div class="item-row" >`+htmlpromocion+`</div>
        <div class="" style="border-bottom: 1px solid #f3f3f3;" >`;



       		  var grupoopcion=producto.texto;


       		 if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;" class="titulocomplementos">Complementos</p>`;
       		 var opcionesdegrupo=producto.titulosgrupos;

       		 	var anterior=0;

       		 	for (var k =0; k <opcionesdegrupo.length; k++) {
       		 		

       		 	if (anterior!=opcionesdegrupo[k].idgrupo1) {
       		 		html+=`<p id="grupo_`+k+`_`+opcionesdegrupo[k].idgrupo1+`" class="grupo`+opcionesdegrupo[k].idgrupo1+`" style="text-align: center;font-weight:bold;">`+opcionesdegrupo[k].grupo+`</p>`;
       		 		
       		 		}
       		 		var comple=opcionesdegrupo[k].textoetiqueta;
       		 		var encontrado=comple.indexOf('$');
	        		classdiv="";
	        		dato1=comple;
					dato2="";
	        		if (encontrado!= -1) {

	        			classdiv="divcomplemento";

	        			dividircomple=comple.split('$');
	        			dato1=dividircomple[0];
	        			dato2='$'+dividircomple[1];
	        		}

       		 		html+=`<div> 

       		 			<p style="text-align: center;" ><span>`+producto.cant+` x </span>
	        		`+dato1+`<span class="`+classdiv+`">`+dato2+`</span></p>

       		 		</div>`;

       		 		anterior=opcionesdegrupo[k].idgrupo1;


       		 	}
       		 }

       		 /*if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;">Complementos</p>`;

	        	for(var i = 0; i < grupoopcion.length; i++) {


	        		
	        		var comple=grupoopcion[i];

	        		var encontrado=comple.indexOf('$');
	        		classdiv="";
	        		dato1=comple;
					dato2="";
	        		if (encontrado!= -1) {

	        			classdiv="divcomplemento";

	        			dividircomple=comple.split('$');
	        			dato1=dividircomple[0];
	        			dato2='$'+dividircomple[1];
	        		}
	        		
	        		html+=`

	        		<div class="row">
	        		<div class="col-10"></div>

	        		<div class="">
	        		<p style="text-align: center;" >
	        		`+dato1+`<span class="`+classdiv+`">`+dato2+`</span></p>
	        		</div>
	        		<div class="col-10"></div>

	        		</div>

	        		`;
	        	}
       	
       		}*/

       		if (producto.comentariopaquete!='') {

       		html+=`<p style="text-align: center;font-weight:bold;">Instrucciones especiales</p>`;
       		html+=`<p style="text-align: center;">`+producto.comentariopaquete+`</p>`;

           		}

      html+= ` </div>

        </li>
               


        `;





       
/*
       		 var grupoopcion=producto.texto;

       		 if (grupoopcion.length>0) {

       		 	html+=`<p style="text-align: center;font-weight:bold;">Complementos</p>`;

	        	for(var i = 0; i < grupoopcion.length; i++) {


	        		
	        		html+=`<p style="text-align: center;">`+grupoopcion[i]+`</p>`;
	        	}
       	
       		}*/

       	total=parseFloat(producto.cant)*parseFloat(producto.preuni);
        suma=parseFloat(suma)+parseFloat(total);	
        cont++;

    });


		var datosextras=JSON.parse(localStorage.getItem('datosextras'));



		var totalg=parseFloat(suma);


		var htmlsuma2=`

			<div >
		<div style="background-color:#dfdfdf;border-radius:10px;padding-top: .5px;padding-bottom: .5px;">
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;margin-left: .8em;">Subtotal:</span></div>
          <div class="subtotalapagar" style="font-size: 22px;">$`+formato_numero(suma,2,'.',',')+`</div>
        </div>
      </div>

   





      `;

var descuento=0;
      if (localStorage.getItem('montodescontado')!=0) {


      	var descuento= localStorage.getItem('montodescontado');

     	var variabledescuento=localStorage.getItem('variabledescuento');


		htmlsuma2+=`
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;padding-left:1em;color:red;">Dcto. `+variabledescuento+`:</span></div>
          <div class="descuento" style="font-size: 22px;color:red;">-$`+formato_numero(descuento,2,'.',',')+`</div>
        </div>
      </div>
		`;




		/*htmlsuma2+=`
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;margin-left: .8em;color:red;">Total a pagar:</span></div>
          <div class="" style="font-size: 22px;">$`+formato_numero(totalg,2,'.',',')+`</div>
        </div>
      </div>
		`;*/

      }
      
      htmlsuma2+=`   <div class="block lineadividirdesc" id="lineadividir" style="display: none;">
            <div class="row no-gap" style="text-align: center;border-bottom: 1px solid;margin-left: 12em;">
              
            </div>
          </div>

          <div class="block subtotal2aparecer" id="subtotal2aparecer" style="display: none;">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;"></span></div>
              <div class="subtotal2aparecerresult" id="subtotal2aparecerresult" style="font-size: 22px;font-weight:bold;"></div>
            </div>
            </div>
          `;


      var habilitarsumaenvio=localStorage.getItem('habilitarsumaenvio');
      var cadena2=0;

      if (habilitarsumaenvio==1) {

      	if (parseInt(datosextras.sucursalproveedorcodigo)>0) {


				var cadena=datosextras.textodatoscostoenvio.split('$');
				
				if (cadena.length>2) {

					if (cadena[1]==cadena[2]) {

							cadena2=cadena[1];
						}else{

							cadena2=cadena[2];
						}


				}else{

					cadena2=cadena[1];
				}
				


      		 htmlsuma2+=`	<div class="block">
      <div class="row no-gap" style="text-align: center;">
          <div class=""><span style="font-size: 22px;padding-left: 1em;">Envío:</span></div>
          <div class="costoenviopago" style="font-size: 22px;">$`+formato_numero(cadena2,2,'.',',')+`</div>
        </div>
        </div>

       
		`;

		totalg=parseFloat(totalg)+parseFloat(cadena2);
		}
      }


      htmlsuma2+=`<div class="block lineadividir dividirsub3" id="dividirsub3">
            <div class="row no-gap" style="text-align: center;border-bottom: 1px solid;margin-left: 12em;">
              
            </div>
          </div>

           <div class="block subtotal3aparecer" id="subtotal3aparecer" style="display: block;">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;"></span></div>
              <div class="subtotal3aparecerresult" id="subtotal3aparecerresult" style="font-size: 22px;font-weight:bold;"></div>
            </div>
            </div>

          `;

          htmlsuma2+=`
          <div class="block montonuevofactura" id="montonuevofactura" style="display: none;">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-size: 22px;padding-left: 1em;"><span style="font-size: 22px" class="">Nuevo monto:</span></span></div>
              <div class="valormontonuevofactura" id="valormontonuevofactura" style="font-size: 22px;"></div>
            </div>
            </div>

          `;

        if (localStorage.getItem('ivapaquetes')!=0) {

        montofacturar=localStorage.getItem('montoafacturar');
      	ivapaquetes=localStorage.getItem('ivapaquetes');

      	totalg=parseFloat(totalg)+parseFloat(ivapaquetes);

		htmlsuma2+=`
		<div class="block">
        <div class="row no-gap" style="text-align: center;"> 
          <div class=""><span style="font-size: 22px;padding-left: 1em;">I.V.A.<span style="font-size: 10px" class="montoafacturar">($`+formato_numero(montofacturar,2,'.',',')+`)</span>:</span></div>
          <div class="" style="font-size: 22px;">$`+formato_numero(ivapaquetes,2,'.',',')+`</div>
        </div>
      </div>
		`;

      }

		var comisiontotal=0;
        if (localStorage.getItem('comisiontotal')!=0) {

        	comisiontotal=localStorage.getItem('comisiontotal');
     
      htmlsuma2+=`<div class="block comisionaparecer" id="comisionaparecer">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-size: 22px;padding-left: 1em;">Com. de tarjeta:</span></div>
              <div class="comision" id="comision" style="font-size: 22px;">$`+formato_numero(comisiontotal,2,'.',',')+`</div>
            </div>
            </div>`;


        }


        htmlsuma2+=`<div class="block lineadividir" id="lineadividir">
            <div class="row no-gap" style="text-align: center;border-bottom: 1px solid;margin-left: 12em;">
          
            </div>
          </div>`;
   
   		totalg=parseFloat(totalg)-parseFloat(descuento)+parseFloat(comisiontotal);


	 htmlsuma2+=`	<div class="block">
      <div class="row no-gap" style="text-align: center;">
          <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 1em;">Total:</span></div>
          <div class="totalapagar" style="font-size: 22px;font-weight:bold;">$`+formato_numero(totalg,2,'.',',')+`</div>
        </div>
        </div>

        </div>



		</div>
		`;


		/*var montoafacturar=0;
        if (localStorage.getItem('montoafacturar')!=0) {

        	montoafacturar=localStorage.getItem('montoafacturar');
     
      htmlsuma2+=`<div class="block totalfacturaaparecer" id="totalfacturaaparecer">
          <div class="row no-gap" style="text-align: center;">
              <div class=""><span style="font-weight:bold;font-size: 22px;padding-left: 2em;">Total a facturar:</span></div>
              <div class="totalafacturarpagar" id="totalafacturarpagar" style="font-size: 22px;font-weight:bold;">$`+formato_numero(montoafacturar,2,'.',',')+`</div>
            </div>
            </div>`;


        }*/


	

		$("#totalesdecarrito").html(htmlsuma2);


		var confecha=localStorage.getItem('confecha');
		var condireccionentrega=localStorage.getItem('condirecionentrega');



		var opcionelegida=datosextras.opcionelegida;

		htmlopcionelegida=`
                <div class="item-text">`+opcionelegida+`</div>
              `;

		$("#opcionelegida").html(htmlopcionelegida);

		if (confecha==1) {

			var fechaen=datosextras.fecha.split('T');
			var fechadividida=fechaen[0].split('-');

			var fechaordena=fechadividida[2]+'/'+fechadividida[1]+'/'+fechadividida[0];

				htmlfe=`
                <div class="item-text">`+fechaordena+' '+fechaen[1]+`</div>
             `;
			$("#fechaentrega").html(htmlfe);

		}

		

		if (condireccionentrega==1) {

			var direccion=datosextras.textodireccion;

			//var htmldire=`<p style="font-weight:bold;">DIRECCIÓN DE ENVÍO:</p><p style="text-align:center">`+direccion+`</p>`;		
			
			htmldire=`
                <div class="item-text" style="-webkit-line-clamp:4!important">`+direccion+`</div>
            `;

			$("#direccionentrega").html(htmldire);

		}

		var formapago=datosextras.opcionelegidapago;
			htmlforma=`
                <div class="item-text">`+formapago+`</div>
            `;

             if (datosextras.montocliente!='' && datosextras.montocliente!=null) {

			          htmlforma+=`
			              <div class="item-text">$`+formato_numero(datosextras.montocliente,2,'.',',')+`</div>
			            `;

			            }

			    	if (datosextras.confoto==1) {

			    			PintarlistaImagen3();


			  	}


			  	if (localStorage.getItem('datostarjeta')!='') {	

			  		var datostarjeta=localStorage.getItem('datostarjeta');
			  		divide=datostarjeta.split('"');

			  		imagen=divide[1];
			  		var datostarjeta2=localStorage.getItem('datostarjeta2');

					  		htmlforma+=`
					  		 <div class="item-media">
					  		 <img src="`+imagen+`" style="width:36px;height:32px;" alt="card"  >
					  		<span style="line-height: 30px;font-size:15px;color:#757575;">`+datostarjeta2+`</span></div>
					  		`;

			  			}
 
			 

			$("#formadepago").html(htmlforma);




			var factura=datosextras.factura;
			$("#facturacion").css('display','none');

			if (factura==1) {

				
				$("#facturacion").css('display','block');

				var razonsocial=datosextras.textodatosfactura;
				htmlrazon=`
                <div class="" style="color:#757575;font-size: 14px;">`+razonsocial+`</div>
           												 `;
				$("#razonsocial").html(htmlrazon);

				var metodopago=datosextras.textometodopago;

				htmlmetodo=`
                <div class="item-text">`+metodopago+`</div>`;
				$("#metodopago1").html(htmlmetodo);

				var formapago=datosextras.textoformapago;

				htmlforma=`
                <div class="item-text">`+formapago+`</div>`;
				$("#formapago1").html(htmlforma);

				var usocfdi=datosextras.textousocfdi;
				htmluso=`
                <div class="item-text">`+usocfdi+`</div>`;
				$("#usocfdi1").html(htmluso);
			}

				$("#observacionespedido").css('display','none');
				$("#botonobservaciones").css('display','none');

				var activoobservacion=localStorage.getItem('activoobservacion');

				if (activoobservacion==1) {


					$("#botonobservaciones").css('display','block');
				}

				/*$("#observacionespedido").css('display','block');
				 htmlobser=` <div class="item-text">`+datosextras.observacionpedido+`</div>`;
				$("#observaciones").html(htmlobser);
*/
			


		if (condireccionentrega==1) {
			if (parseInt(datosextras.sucursalproveedorcodigo)>0) {


				var cadena=datosextras.textodatoscostoenvio.split('$');
				var cadena2="";
				if (cadena.length>2) {

					cadena2=' '+cadena[2];
				}

				$("#costodeenviopedido").css('display','block');
				 htmlenvio=` <div class="item-text" style="-webkit-line-clamp:4;">`+cadena[0]+` $`+cadena[1]+` `+cadena2+`</div>`;
				$("#costoenvio").html(htmlenvio);

			}

		}else{

		$("#costodeenviopedido").css('display','none');

		}



		if (localStorage.getItem('codigocupon')!='') {
		
			var codigocupon=localStorage.getItem('codigocupon');
			var variabledescuento=localStorage.getItem('variabledescuento');

			$("#cuponaplicado").css('display','block');
				 htmlcupon=` <div class="item-text" style="-webkit-line-clamp:4;">`+codigocupon+` `+variabledescuento+`</div>`;

			$("#cupondescripcion").html(htmlcupon);
		}
		

	}else{


		html+=`<div class="card ">
		<div class="card-header"></div>
		<div class="card-content card-content-padding">
		NO SE ENCONTRARON DATOS

		</div>
		</div>`;
		
		$("#totalesdecarrito").html('');

	}

	$("#lista-carrito").html(html);

}
