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

  var idservicio=0;
	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
				if (respuesta[i].ultimomensaje.foto!='' && respuesta[i].ultimomensaje.foto!=null && respuesta[i].ultimomensaje.foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].ultimomensaje.foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}else{
        if (respuesta[i].ultimomensaje.sexo=='M') {

          urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
  
        }else{
          urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
    
        }

       
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			
	       var usuarios=respuesta[i].usuarios;
         var nombres="";
         var contador=usuarios.length-1;
         if (usuarios.length>0) {
        
            for (var j = 0; j <usuarios.length; j++) {

              if (usuarios[j].alias!='' &&  usuarios[j].alias!=null) {
                 nombres+=usuarios[j].alias;
                 }else{
                nombres+=usuarios[j].nombre;
               }
             

                if (j<contador) {

                  nombres+=', ';
                }
             }
         }

         if (respuesta[i].servicio.idservicio!=idservicio) {
             idservicio=respuesta[i].servicio.idservicio

             html=`
              <div class="row margin-bottom ">
                <div class="col">
                <h5 class="title">
               `+respuesta[i].servicio.titulo+`
                </h5>
                </div>
                <div class="col-auto align-self-center">
               
                </div>
              </div>

              <div class="chat_`+respuesta[i].servicio.idservicio+`"></div>
             `;

              $(".listamensajessala").append(html);

         }

			html1=`


		<li class="lista" style="background: white;
      padding-top: 1em;
      padding-bottom: 1em;
      margin-left: 1em;
      margin-right: 1em;
      list-style: none;    margin-bottom: 1em;
    border-radius: 10px;" id="lista_`+respuesta[i].idsala+`">
    <div class="row">
                  <div class="col-30">
                    <div class="avatar  shadow rounded-10 " onclick="MostrarSala1(`+respuesta[i].idsala+`,`+respuesta[i].servicio.idusuarios_servicios+`,`+respuesta[i].servicio.idservicio+`)">
                    	`+imagen+`
                    </div>
                  </div>
                  <div class="col-60">

                    <p class="text-color-theme no-margin-bottom cortartexto" id="elemento_`+respuesta[i].idsala+`" onclick="QuitarClass(`+respuesta[i].idsala+`)" style=" width: 230px;text-overflow: ellipsis;overflow: hidden;">`+nombres+`</p>

                    <p class="text-muted " style="font-size:16px;" onclick="MostrarSala1(`+respuesta[i].idsala+`,`+respuesta[i].servicio.idusuarios_servicios+`,`+respuesta[i].servicio.idservicio+`)">'`+respuesta[i].ultimomensaje.mensaje+`'</p>
                   <p class="text-muted small" style="opacity:0.6;">`+respuesta[i].ultimomensaje.fecha+`</p>

                  </div>
                  <div class="col-10">
                    <p class="" onclick="MostrarSala1(`+respuesta[i].idsala+`,`+respuesta[i].servicio.idusuarios_servicios+`,`+respuesta[i].servicio.idservicio+`)"><i style="text-align: right;
    display: flex;
    justify-content: right;" class="bi bi-chevron-right"></i></p>

                  </div>

                  </div>
                </li>


			`;

         $(".chat_"+idservicio).append(html1);

		}

	
	}
}

function MostrarSala1(idsalachat,idusuarios_servicios,idservicio) {

	localStorage.setItem('idsala',idsalachat);
  localStorage.setItem('idusuarios_servicios',idusuarios_servicios);
  localStorage.setItem('idservicio',idservicio);
  localStorage.setItem('bandera',1);
	GoToPage('messages');
}
function MostrarSala(idsalachat,idservicio) {

  localStorage.setItem('idsala',idsalachat);
  localStorage.setItem('idservicio',idservicio);
    localStorage.setItem('bandera',0);

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
      var datosusuarios=datos.datosusuarios;
			var usuarios=[];

			for (var i = 0; i <datos.usuarios.length; i++) {
				usuarios.push(datos.usuarios[i]);

			}

      PintarUsuariosSala(datosusuarios);
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

function PintarUsuariosSala(respuesta) {
  var html="";
 if (respuesta.length>0) {
   

    for (var i = 0; i <respuesta.length; i++) {
      html+=`

      <p>`+respuesta[i].nombre+` `+respuesta[i].paterno+` ha entrado al grupo</p>
      `;
    }
  

 }
  $(".usuarios").append(html);
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

              if (mensajes[i].sexo=='M') {
                foto=localStorage.getItem('avatarmujer');
              }else{
                foto=localStorage.getItem('avatarhombre');
       
              }

               rutaimagen=urlphp+"imagenesapp/"+foto;

              if (mensajes[i].foto!='null' && mensajes[i].foto!=null && mensajes[i].foto!='') {

              rutaimagen=urlphp+"upload/perfil/"+mensajes[i].foto;


              }

            if (mensajes[i].idusuarioenvio==id_user) {

              html+='<div class="message message-sent message-first message-last message-tail" id="msj_'+mensajes[i].idmensaje+'"'
              if (mensajes[i].imagen!=0) {
              html+=' onclick="MenuOpciones2('+mensajes[i].idmensaje+',\''+mensajes[i].imagen.trim()+ '\')"  >'

              }else{
              html+=' onclick="MenuOpciones('+mensajes[i].idmensaje+')">'
              }
          

              html+=` <div class="message-avatar" style="background-image:url('`+rutaimagen+`')"> `;
              html+='    </div> '
              html+='<div class="message-content" style="padding-left:2px;">'
              html+='<div class="message-name">'

              html+=mensajes[i].nombre+'</div>'
              html+='   <div class="message-bubble">'
              html+=' <div class="message-text" style="font-size:18px;">'
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
               html+='</div>'
            html+='<div class="message-text-footer" style="font-size:14px;">'
            html+=' '+mensajes[i].fechaformato;
              if (mensajes[i].leido==1) {

                html+='<span style="margin-left:1em;"><i class="bi-check2-all"></i></span>';
              }

            html+=' </div> </div>'
            html+='  <div class="message-footer">'
            html+='  </div> '
            html+=' </div>'
            
            html+=' </div>';


            }else{

            html+=' <div class="message message-received message-first message-last message-tail">'
              html+=` <div class="message-avatar" style="background-image:url('`+rutaimagen+`')"> `;
            html+='  </div>'
            html+=' <div class="message-content" style="padding-left:2px;">'
            html+=' <div class="message-name">'+mensajes[i].nombre+'</div>'
            html+='  <div class="message-header">'
            html+='  </div>'
            html+=' <div class="message-bubble">'
            html+='  <div class="message-text-header">'
            html+='  </div>'
            html+='  <div class="message-text" style="font-size:18px;">'
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
            html+='<div class="message-text-footer" style="font-size:14px;">'
            html+=' '+mensajes[i].fechaformato;
        
            html+=' </div> </div>'
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

function AbrirPantallaChats() {
  GoToPage('chatservicio');
}


function listadochatservicio() {
  var id_user=localStorage.getItem('id_user');
  var idservicio=localStorage.getItem('idservicio');
  var datos="idusuario="+id_user+"&idservicio="+idservicio;
  var pagina = "ObtenerChats.php";
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

      PintarChatServicios2(respuesta);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
  
}


function PintarChatServicios2(respuesta) {

  if (respuesta.length>0) {
    var html="";
    for (var i = 0; i <respuesta.length; i++) {
        if (respuesta[i].ultimomensaje.foto!='' && respuesta[i].ultimomensaje.foto!=null && respuesta[i].ultimomensaje.foto!='null') {

        urlimagen=urlphp+`upload/perfil/`+respuesta[i].ultimomensaje.foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
      }else{
        if (respuesta[i].ultimomensaje.sexo=='M') {

          urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
  
        }else{
          urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
    
        }

       
        imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
      }
      

         var usuarios=respuesta[i].usuarios;
         var nombres="";
         var contador=usuarios.length-1;
         if (usuarios.length>0) {
        
            for (var j = 0; j <usuarios.length; j++) {
              nombres+=usuarios[j].alias;

                if (j<contador) {

                  nombres+=', ';
                }
             }
         }



      html+=`

      <li class="lista" style="background: white;
    padding-top: 1em;
    padding-bottom: 1em;
    margin-left: 1em;
    margin-right: 1em;
    list-style: none;margin-bottom: 1em;
    border-radius: 10px;" id="lista_`+respuesta[i].idsala+`">
                <div class="row">
                  <div class="col-30">
                    <div class="avatar  shadow rounded-10 " onclick="MostrarSala(`+respuesta[i].idsala+`,`+respuesta[i].servicio.idservicio+`)">
                      `+imagen+`
                    </div>
                  </div>
                  <div class="col-60">

                    <p class="text-color-theme no-margin-bottom cortartexto" id="elemento_`+respuesta[i].idsala+`" onclick="QuitarClass(`+respuesta[i].idsala+`)" style=" width: 230px;text-overflow: ellipsis;overflow: hidden;">`+nombres+`</p>

                    <p class="text-muted " style="font-size:16px;" onclick="MostrarSala(`+respuesta[i].idsala+`,`+respuesta[i].servicio.idservicio+`)">'`+respuesta[i].ultimomensaje.mensaje+`'</p>
                   <p class="text-muted small" style="opacity:0.6;">`+respuesta[i].ultimomensaje.fecha+`</p>

                  </div>
                  <div class="col-10">
                    <p class="" onclick="MostrarSala(`+respuesta[i].idsala+`,`+respuesta[i].servicio.idservicio+`)">
                    <i style="text-align: right; display: flex;justify-content: right;" class="bi bi-chevron-right"></i></p>

                  </div>

                  </div>
                </li>
                </div>


      `;


    }

    $(".listamensajessala").append(html);
  }
}

function QuitarClass(idsala) {
  
  if ($("#elemento_"+idsala).hasClass('cortartexto')) {
    $("#elemento_"+idsala).removeClass('cortartexto');
  
    }else{
   $("#elemento_"+idsala).addClass('cortartexto');

  }
}
function ActualizarMensajesLeidos() {
  
  var id_user=localStorage.getItem('id_user');
  var idsalachat=localStorage.getItem('idsala');
  var datos="idusuario="+id_user+"&idsala="+idsalachat;
  var pagina = "ActualizarMensajes.php";
  $.ajax({ 
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    async:false,
    data:datos,
    success: function(datos){

      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}

function VerificarSalaServicio() {
  var id_user=localStorage.getItem('id_user');
  var idsalachat=localStorage.getItem('idsala');
  var datos="idusuario="+id_user+"&idsala="+idsalachat;
  var pagina = "VerificarSalaServicio.php";
  $.ajax({ 
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    async:false,
    data:datos,
    success: function(res){

      if (res.paso==1) {

        $(".demo-send-message-link").css('display','none');
        $(".messagebar-area").css('display','none');
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