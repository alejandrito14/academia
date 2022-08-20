function listadochats() {
	var id_user=localStorage.getItem('id_user');

	var datos="idusuario="+id_user;
	var pagina = "ObtenerChatdeServicios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		async:false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarChatServicios(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	
}
function PintarChatServicios(respuesta) {

	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
				if (respuesta[i].ultimomensaje.foto!='' && respuesta[i].ultimomensaje.foto!=null) {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].ultimomensaje.foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen=localStorage.getItem('logo');
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			
			/*html+=`
				 <a href="/messages/" class="item-content color-inherit">
                    <div class="item-media">
                       
                           `+imagen+`
                        
                    </div>
                    <div class="item-inner">
                        <div class="row">
                            <div class="col">
                                <p><br /><small class="text-muted">
                                        <i class="bi bi-check-all text-color-blue"></i>Hello!</small>
                                </p>
                            </div>
                            <div class="col-auto text-align-right">
                                <p class="text-muted small">Just now</p>
                            </div>
                        </div>
                    </div>
                </a>

			`;*/

			html+=`
			<div class="row" onclick="MostrarSala(`+respuesta[i].idsala+`)">
                  <div class="col-30">
                    <div class="avatar  shadow rounded-10 ">
                    	`+imagen+`
                    </div>
                  </div>
                  <div class="col-60">
                    <p class="text-color-theme no-margin-bottom">`+respuesta[i].ultimomensaje.nombre+` `+respuesta[i].ultimomensaje.paterno+`</p>

                    
                    <p class="text-muted size-12">`+respuesta[i].ultimomensaje.mensaje+`</p>
                   <p class="text-muted small" style="opacity:0.6;">`+respuesta[i].ultimomensaje.fecha+`</p>

                  </div>
                  <div class="col-10">
                    <p class=""><i style="text-align: right;
    display: flex;
    justify-content: right;" class="bi bi-chevron-right"></i></p>

                  </div>
                </div>


			`;


		}

		$(".listamensajessala").html(html);
	}
}

function MostrarSala(idsalachat) {

	localStorage.setItem('idsala',idsalachat);

	GoToPage('messages');
}
function ObtenerMensajesAnteriores() {
	
	var id_user=localStorage.getItem('id_user');
	var idsalachat=localStorage.getItem('idsala');
	var datos="idusuario="+id_user+"&idsala="+idsalachat;
	var pagina = "ObtenerMensajesSala.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		async:false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var usuarios=[];

			for (var i = 0; i <datos.usuarios.length; i++) {
				usuarios.push(datos.usuarios[i]);
			}


			localStorage.setItem('usuariossala',JSON.stringify(usuarios));
			PintarMensajes(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}
function PintarMensajes(mensajes) {
	var id_user=localStorage.getItem('id_user');
	if (mensajes.length>0) {
		var html="";
		
          var cantidad=mensajes.length;

          for (var i = 0; i <mensajes.length; i++) {
      /*      if (soporteid!=mensajes[i].idsoporte) {
            html+='<div class="messages-title" style="font-weight: bold;" >'+mensajes[i].fecha+'</div>'

            }*/
            if (mensajes[i].idusuarioenvio==id_user) {

              html+='<div class="message message-sent message-first message-last message-tail" id="msj_'+mensajes[i].idmensaje+'"'
              if (mensajes[i].imagen!=0) {
              html+=' onclick="MenuOpciones2('+mensajes[i].idmensaje+',\''+mensajes[i].imagen.trim()+ '\')"  >'

              }else{
              html+=' onclick="MenuOpciones('+mensajes[i].idmensaje+')">'
              }
              html+=' <div class="message-avatar" style="background-image:url(img/iconousuario.png)"> '
              html+='    </div> '
              html+='<div class="message-content" style="padding-left:2px;">'
              html+='<div class="message-name">'

              html+=mensajes[i].nombre+'</div>'
              html+='   <div class="message-bubble">'
              html+=' <div class="message-text">'
              if (mensajes[i].imagen!=0) {
              html+='<div >'

                        html+='<img style="width:150px;height:200px;" src="'+ruta2+"archivosmensaje/"+mensajes[i].imagen+'" class="">'
/*                html+='<a onclick="VerImagen(\''+mensajes[i].imagen.trim()+ '\')"  style="float:left;margin: 25px 10px 0px 20px;"><span style="background-image:url(img/descarga.png);">aqui</span></a>' 
*/
/*            html+='<a href="'+ruta2+'archivosmensaje/'+mensajes[i].imagen.trim()+'" download="'+mensajes[i].imagen.trim()+'" style="float:left;margin: 25px 10px 0px 20px;"><span class="glyphicon glyphicon-download-alt" style="color:write">aqui</span></a>' 
*/            html+='</div>'
                }else{
              html+=mensajes[i].mensaje
                }
              html+=' </div> '
               html+=' </div>'
               html+=' </div>'
              
               html+=' </div>'


            }else{

            html+=' <div class="message message-received message-first message-last message-tail">'
            html+='  <div class="message-avatar" style="background-image:url(img/iconosoporte.jpg);margin-right:0px;">'
            html+='  </div>'
            html+=' <div class="message-content" style="padding-left:2px;">'
            html+=' <div class="message-name">'+mensajes[i].nombre+'</div>'
            html+='  <div class="message-header">'
            html+='  </div>'
            html+=' <div class="message-bubble">'
            html+='  <div class="message-text-header">'
            html+='  </div>'
            html+='  <div class="message-text">'
            if (mensajes[i].imagen!=0) {
                    html+='<div onclick="VerImagen(\''+mensajes[i].imagen.trim()+ '\')" >'
              html+='<img style="width:150px;height:200px;" src="'+ruta2+"archivosmensaje/"+mensajes[i].imagen+'" class="">'
/*            html+='<a onclick="VerImagen(\''+mensajes[i].imagen.trim()+ '\')"  style="float:left;margin: 25px 10px 0px 20px;"><span style="background-image:url(img/descarga.png);">aqui</span></a>' 
*//*            html+='<a href="'+ruta2+'archivosmensaje/'+mensajes[i].imagen.trim()+'" download="'+mensajes[i].imagen.trim()+'" style="float:left;margin: 25px 10px 0px 20px;"><span class="glyphicon glyphicon-download-alt" style="color:write">aqui</span></a>' 
*/          html+='</div>'
            }else{
            html+=mensajes[i].mensaje
            }
            html+='</div>'
            html+='  <div class="message-text-footer">'
            html+='  </div> </div>'
            html+='  <div class="message-footer">'
            html+='  </div> '
            html+=' </div>'
            
            html+=' </div>';

            }

           /* soporteid=mensajes[i].idsoporte;*/
           
            
          }
           $("#mensajes").html(html);
			$$('.messages-content').scrollTop( $('.messages-content').get(0).scrollHeight, 400 );

         }

	
}