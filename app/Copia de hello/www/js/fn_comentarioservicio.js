
function ObtenerComentarios() {
	var idservicio=localStorage.getItem('idservicio');
    var idusuario=localStorage.getItem('id_user');
    var idtipousuario=localStorage.getItem('idtipousuario');
    var datos="idservicio="+idservicio+"&idusuario="+idusuario+"&idtipousuario="+idtipousuario;
    var pagina = "ObtenerComentariosServicio.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        crossDomain: true,
        cache: false,
        async:false,
        success: function(datos){

           	PintarListadoComentarios(datos.respuesta);

            },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                var error;
                    if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                    if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                    console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
        });
}

function PintarListadoComentarios(resultado) {
	
	if (resultado.length>0) {
		var html="";
		for (var i = 0; i <resultado.length; i++) {
					 if (resultado[i].foto!='' && resultado[i].foto!=null  && resultado[i].foto!='null') {

        urlimagen=urlphp+`upload/perfil/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style=""/>';
      }else{

        if (resultado[i].sexo=='M') {

                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
        
                }

               // urlimagen="img/icon-usuario.png";
                imagen='<img src="'+urlimagen+'" alt="" />';
            }

			html+=`<li>
                                    <div class="item-content">
                                        <div class="item-media">
                                            <figure class="avatar avatar-50 rounded-10">
                                               `+imagen+`
                                            </figure>
                                        </div>
                                        <div class="item-inner">
                                            <div class="item-title-row">
                                                <div class="item-title">`+resultado[i].nombre+` `+resultado[i].paterno+`</div>
                                            </div>
                                            <div class="item-subtitle small text-muted margin-bottom-half">
                                                
                                                <span class="float-right">
                                                    <i class="bi bi--fill"></i>
                                                    <i class="bi bi--fill"></i>
                                                    <i class="bi bi--fill"></i>
                                                    <i class="bi bi--fill"></i>
                                                    <i class="bi bi--fill"></i>
                                                </span>
                                            </div>
                                            <p class="text-muted">`+resultado[i].comentario+`</p>


                                        </div>

                                        <div class="col-20 align-self-center text-align-right" style="    margin-right: 1em;">`;
                                        	

							                    html+=`
							                    
                                        </div>
                                    </div>
                                </li>
                               
                               


			`;
		}

		$("#listacomentarios").html(html);
	}
}


function NuevoComentario() {
    var pagina = "Guardarcomentario.php";
  
    var comentario=$("#txtcomentariocaja").val();
    var idservicio=localStorage.getItem('idservicio');
    var iduser=localStorage.getItem('id_user');
    var datos="idservicio="+idservicio+"&comentario="+comentario+"&iduser="+iduser;
    var bandera=1;
    if (comentario=='') {
        bandera=0;
    }
    if (bandera==1) {
        $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        async:false,
        success: function(datos){
          ObtenerComentarios();
          $("#txtcomentario").val('');
          $(".input-clear-button").css('opacity',0);
          $(".input-clear-button").css('visibility','hidden');
          $("#txtcomentariocaja").val('');
          //alerta('','Se han guardado el comentario correctamente');

        },error: function(XMLHttpRequest, textStatus, errorThrown){ 
          var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                    //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                    console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
        }

      });
    }else{
        var msg="";
        if (comentario=='') {
             msg+="Campo comentario vacío";
         }

         alerta('',msg);
    }

  }


