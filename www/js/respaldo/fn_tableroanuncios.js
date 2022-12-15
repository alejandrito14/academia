
function Guardartableroanuncios(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var descripcion=$("#v_descripcion").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();

		var id=$("#id").val();
		var datos = new FormData();

		var archivos = document.getElementById("image"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo

		//Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
		//objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
		//que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
		for (i = 0; i < archivo.length; i++) {
			datos.append('archivo' + i, archivo[i]);
		}
		datos.append('v_titulo',nombre); 
		datos.append('v_descripcion',descripcion);
		datos.append('v_orden',orden); 
		datos.append('id',id);
		datos.append('v_estatus',estatus);
	
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/tableroanuncios/ga_anuncios.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					contentType: false, //Debe estar en false para que pase el objeto sin procesar
					data: datos, //Le pasamos el objeto que creamos con los archivos
					processData: false, //Debe estar en false para que JQuery no procese los datos a enviar
					cache: false, //Para que˘
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						var resp = msj.split('|');
						
						   console.log("El resultado de msj es: "+msj);
						 	if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }
}

function ColocarCheckbox(valor) {
	
	if (valor==1) {
	$("#v_activaranuncios").prop('checked',true);
	}else{
		$("#v_activaranuncios").prop('checked',false);

	}
}

function ColocarCheckboxOmitirAlfinal(valor) {
	if (valor==1) {
	$("#v_activaromitirfinal").prop('checked',true);
	}else{
		$("#v_activaromitirfinal").prop('checked',false);

	}
}



function AbrirModalAnuncio(idanuncio) {
	$("#idanuncio").val(idanuncio);
	ListadoImagenesAnuncio();
	VerListadoImagenesAnuncio();
	$("#modalimagenanuncio").modal();

}


function ListadoImagenesAnuncio(idanuncio) {
   var idanuncio= $("#idanuncio").val();
    var datos="idanuncio="+idanuncio;
    $("#vfileNames").html("");
        $.ajax({
     type: 'post',
        url: 'catalogos/tableroanuncios/ObtenerImagenesAnuncio.php',
        data:datos,
        dataType: "json",
        success: function(vresponse, vtextStatus, vjqXHR){
                

              var vattachedFiles=vresponse.imagenes;
              var codigo=vresponse.codigo;
              var html=`<table class="table">
                <thead>
                  <tr>
                 
                    <th scope="col">TITULO</th>

                    <th scope="col">IMAGEN</th>

                    <th scope="col">ACCIÓN</th>
                   
                  </tr>
                </thead>
                <tbody>`;

                if (vattachedFiles.length>0) {
                  
                  for (var i =0;i < vattachedFiles.length; i++) {

                   
               html+=`<tr>
                      <td>`+vattachedFiles[i].tituloimagen+`</td>
                      <td scope="row">
                      <img style="width:50px;height:50px;" src="catalogos/tableroanuncios/imagenestablero/`+codigo+`/`+vattachedFiles[i].imagen+`" />
                      </td>
                     
                      <td><span style="cursor:pointer" onclick="deleteArchivoAnuncio(`+ vattachedFiles[i].idimagentablero +`,`+vattachedFiles[i].idtableroanuncio+`);" class="btn btn_rojo" style="font-size:16px;"><span class="mdi mdi-delete-empty"></span></span></td>
                    </tr>`;
                  }

                }
                 
                 
               html+= `</tbody>
              </table>`;


                $("#vfileNames").html(html);
            
    },
    error: function(vjqXHR, vtextStatus, verrorThrown){
            alert(verrorThrown, vtitle, 0);
    }
  });   



 
}



 function SubirImagenservicioInformativa() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#imageninformativa')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/servicios/uploadImagenInformativa.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
             beforeSend: function() {
         $("#d_foto").css('display','block');
     	 $("#d_foto").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	

		    },
            success: function(response) {
               	var ruta='<?php echo $ruta; ?>';
	
                if (response != 0) {
                    $(".card-img-top").attr("src", response);
                    $("#d_foto").css('display','none');
                } else {

                	 $("#d_imageninformativa").html('<img src="'+ruta+'" class="card-img-top" alt="" style="border: 1px #777 solid"/> ');
                    alert('Formato de imagen incorrecto.');
                }
            }
        });
        return false;
    }

    function NuevaImagen() {
    	$("#vfileNames").css('display','none');
    	$("#btnnuevaimagen").css('display','none');
    	$(".formimagen").css('display','block');
    	$(".btnguadarimagen").css('display','block');
    	$(".btnguadarimagen").attr('onclick','GuardarImagenAnuncio()');
    }

    function VerListadoImagenesAnuncio() {
    	$("#vfileNames").css('display','block');
    	$("#btnnuevaimagen").css('display','block');
    	$(".formimagen").css('display','none');
    	$(".btnguadarimagen").css('display','none');
    	$(".btnguadarimagen").attr('onclick','');
    }


    function GuardarImagenAnuncio() {
    	var datos = new FormData();

		var archivos = document.getElementById("imageninformativa"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
		for (i = 0; i < archivo.length; i++) {
			datos.append('archivo' + i, archivo[i]);
		}
		var titulo=$("#txttituloimagen").val();
		var idanuncio=$("#idanuncio").val();
		datos.append('v_titulo',titulo);
		datos.append('v_idanuncio',idanuncio);
		$.ajax({
            url: 'catalogos/tableroanuncios/GuardarImagenTablero.php',
            type: 'post',
            data: datos,
            contentType: false,
            processData: false,
            dataType:'json',
             beforeSend: function() {
      
		    },
            success: function(response) {
              
              var res=response.respuesta;

              if (res==1) {
              	$(".card-img-top").attr('src','');
              	VerListadoImagenesAnuncio();
              	ListadoImagenesAnuncio();
              }
            },
		    error: function(vjqXHR, vtextStatus, verrorThrown){
		            alert(verrorThrown, vtitle, 0);
		    }
        });

    }


function deleteArchivoAnuncio(idimagentablero,idtableroanuncio) {

  var datos='idimagentablero='+idimagentablero+"&idtableroanuncio="+idtableroanuncio;


          var r = confirm("¿Está seguro que desea eliminar la imagen?.");
          if (r == true) {
             
               setTimeout(function () {
                    $.ajax({
                      url: 'catalogos/tableroanuncios/eliminarimagen.php', //Url a donde la enviaremos
                      type: 'post', //Metodo que usaremos
                      data:datos,
                        async:false,

                      error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var error;
                        console.log(XMLHttpRequest);
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
                        $("#contenedor_insumos").html(error);
                      },
                      success: function (msj) {
                        

                        ListadoImagenesAnuncio(idanuncio);
                      }
                    });
                }, 100);

          } 

  
}


   function deleteAttachedFile(vfileName)
     {
        //Purpose: It deletes attached file.
        //Limitations: The end user must accept the deleting attached file.
        //Returns: None.
        
        var vacceptFunctionName=";";
        var vcancelFunctionName="cancelAttachedFileRemoval();";
        var vmessage="¿Está seguro que desea eliminar el archivo adjuntado?.";
        var vtitle="Eliminación de Archivo Adjuntado.";
        
    
      /*  alertify.confirm(vtitle, vmessage, function(){ //alertify.success('Ok');
          deleteAttachedFileData(vfileName); }
                , function(){ alertify.error('Cancel')});*/



        var txt;
          var r = confirm("¿Está seguro que desea eliminar el archivo adjuntado?.");
          if (r == true) {
             deleteAttachedFileData(vfileName);
          } else {
          
          }


     }

 function deleteAttachedFileData(vfileName)
 {
    //Purpose: It deletes attached file data.
    //Limitations: The attached file data must exist in database server and brought by service rest (attachFiles/:vfileName).
    //Returns: None.
    
    var vtitle="Eliminación de Archivo Adjuntado.";
   /* vconfirmDeleteAttachedFile.remove();
    toastr.clear(vconfirmDeleteAttachedFile, { force: true });*/
    
  $.ajax({
     type: 'post',
        url: 'catalogos/productos/eliminarimagen.php',
        data:{vfileName:vfileName},
    dataType: "json",
        success: function(vresponse, vtextStatus, vjqXHR){
            switch(vresponse.messageNumber){
                case -100: alert("Ocurrió un error al tratar de eliminar el archivo adjuntado, intente de nuevo.");
                           break;
                case -1:   alert("Imposible eliminar el archivo adjuntado, no existe.");
                           break;     
                case 0:    toastrAlert("Imposible eliminar el archivo, intente de nuevo.", vtitle, 3);
                           break;
                case 1:    var vattachedFileIndex=getAttachedFileIndexOnList(vfileName);
                        console.log(vattachedFileIndex);
                           if ( vattachedFileIndex>=0){
                             vattachedFiles.splice(vattachedFileIndex,1);
                           }
                           $("#vfileNames").html("");
                           showAttachedFiles();
                          
                           // alertify.alert('El archivo adjuntado ha sido eliminado correctamente.!');
                           alert('El archivo adjuntado ha sido eliminado correctamente.');
                           break; 
            }
    },
    error: function(vjqXHR, vtextStatus, verrorThrown){
            toastrAlert(verrorThrown, vtitle, 0);
    }
  });   
 }


 function getAttachedFileIndexOnList(vfileName)
 {

    
    var vattachedFileIndex=-1;
    for (var vi=0; vi<vattachedFiles.length; vi++){
        if (vfileName==vattachedFiles[vi]){
            vattachedFileIndex=vi;
            vi=vattachedFiles.length;
        }
    }
    
    return vattachedFileIndex;
 }


