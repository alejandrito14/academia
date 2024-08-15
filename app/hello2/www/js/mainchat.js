var socket;

var cambiando="20";
var iduser=localStorage.getItem('id_user');
//localStorage.setItem('idusuario',iduser);
var idusuario=iduser;
var myScroll;
  

  


  //CargarSoportesAnteriores();



/*  
 socket=io.connect(globalsockect);
        socket.on('connect', function (data) {
        socket.emit('conectado', { customId:idusuario,tipouser:1 });


    });
 socket.on('mensajerespuestacliente',function (data) {
       console.log("mensaje respuesta");

   PintarMensaje(data);
});

  socket.on('concluir',function (data) {
       console.log("mensaje concluir");

   ConclusionSoporte(data);
});*/
function CargarFunciones() {
  // body...


   $("textarea").keyup(function () {
 
      
      var value = $(this).height();
      console.log(value+"-"+cambiando);
      if (cambiando!=value) {
      var tamaniodiv=$("#divmensaje").height()+20;

      $("#divmensaje").css('height',tamaniodiv);

      cambiando=$(this).height();
            console.log("entro");

      }
     
    });

   /* $('textarea').on('change, keydown',function(e) {
    window.setTimeout(function() {

      $('textarea')
       .css('height','auto') // <-- acá lo dejo scrollear por un instante
       .css('height',$('textarea')[0].scrollHeight+'px');

    },50);
  });*/


   $('.envio').on('click', function () {
     var  idsoporte=localStorage.getItem('idsoporte');
     var value=$("#mensajetxt").val();
        if ($("#mensajetxt").val().trim()==='') {
        
      }else{
        if (idsoporte==0) {

          IniciaChat();

        }else{

          EnviaMensaje();
        }
      }
    });
     ActualizarMensajes();      



}


function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}

function EscogerSubida() {

     app.dialog.create({
      title: '',
      text: '',
      buttons: [
      {
        text: 'Tomar Foto',
      },
      {
        text: 'Subir Foto',
      },
      {
        text: 'Cancelar',
        color:'#ff3b30',

      },
      
      ],

      onClick: function (dialog, index) {
        if(index === 0){
                //Button 1 clicked
                capturePhoto();
              //  app.dialog.alert("Tomar foto");
              }
              else if(index === 1){
                //Button 2 clicked
                getPhoto(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

              }
              else if(index === 2){
                //Button 3 clicked

              }
            },
            verticalButtons: true,
          }).open();

   }

function Enviar() {
     var  idsoporte=localStorage.getItem('idsoporte');


  if (idsoporte==0) {

    IniciaChat();

  }else{

    EnviaMensaje();
  }


  
}


function IniciaChat() {
  var nombre=localStorage.getItem('Snombre');

var correo=localStorage.getItem('Semail');
var mensaje=$("#mensajetxt").val();
var idusuario=localStorage.getItem('Sid');
var conimagen="0";

localStorage.setItem('nombrechat',nombre);
var datos= 'usuario='+idusuario+'&nombre='+nombre+'&correo='+correo+'&mensaje='+mensaje+'&conimagen='+conimagen;

 var nombre=localStorage.getItem('nombreusuario');
  var  idsoporte=localStorage.getItem('idsala');
  var correo=localStorage.getItem('correo');
  var mensaje=$("#mensajetxt").val();
  var conimagen="0";
var idusuario=localStorage.getItem('id_user');

localStorage.setItem('nombrechat',nombre);
var datos= 'usuario='+idusuario+'&soporte='+idsoporte+'&nombre='+nombre+'&correo='+correo+'&mensaje='+mensaje+'&conimagen='+conimagen;
var pagina="EnviarMensaje.php";
 $.ajax({
       // url: ruta2+'Chatiss/EnviaMensaje',
        url: urlphp+pagina,
        type: 'post',
        dataType: 'json',
        data:datos,
     success: function(data) {

      localStorage.setItem('usuario',1);
      //localStorage.setItem('idsoporte',data.soporte);
         
            var arrayusuarios=localStorage.getItem('usuariossala');
          Envio(nombre,correo,mensaje,data.soporte,data.imagen,data.idmensaje,arrayusuarios);


         
        }
    });
}

function EnviaMensaje(text) {

  var nombre=localStorage.getItem('nombre');
  var  idsoporte=localStorage.getItem('idsala');
  var correo=localStorage.getItem('correo');
  var mensaje=text;
  var conimagen="0";
var idusuario=localStorage.getItem('id_user');
  var imagenperfil="";
  var ruta=0;
       if(localStorage.getItem('foto')==''){

        imagenperfil=localStorage.getItem('avatar');
        ruta=1;
       }else{
         imagenperfil=localStorage.getItem('foto');
         ruta=2
       }

        
localStorage.setItem('nombrechat',nombre);
var datos= 'usuario='+idusuario+'&soporte='+idsoporte+'&nombre='+nombre+'&correo='+correo+'&mensaje='+mensaje+'&conimagen='+conimagen;
var pagina="EnviarMensaje.php";
 $.ajax({
       // url: ruta2+'Chatiss/EnviaMensaje',
        url: urlphp+pagina,
        type: 'post',
        dataType: 'json',
        data:datos,
     success: function(data) {

      localStorage.setItem('usuario',1);
      //localStorage.setItem('idsoporte',data.soporte);
         
            var arrayusuarios=localStorage.getItem('usuariossala');
          Envio(nombre,correo,mensaje,data.soporte,data.imagen,data.idmensaje,arrayusuarios,idsoporte,imagenperfil,ruta);


         
        }
    });

}

function Envio(nombre,correo,mensaje,soporte,imagen,idmensaje,arrayusuarios,idsoporte,imagenperfil,ruta) {


  //app.dialog.alert(""+imagen);



     var html='<div class="message message-sent message-first message-last message-tail" id="msj_'+idmensaje+'"'
   if (imagen==0) {

       html+='onclick="MenuOpciones('+idmensaje+')">'
   }else{
   html+=' onclick="MenuOpciones2('+idmensaje+',\''+imagen.trim()+ '\')">'

   }
   var foto=imagenperfil;
    if (ruta==1) {
    rutaimagen=urlphp+"imagenesapp/"+foto;

   }
   if (ruta==2) {
    rutaimagen=urlphp+"upload/perfil/"+foto;
   }

  
    html+=` <div class="message-avatar" style="background-image:url('`+rutaimagen+`')">`;
    html+= '  </div>'
    html+='<div class="message-content" style="padding-left:2px;">'
      html+='<div class="message-name">'+nombre+'</div>'
       html+=   ' <div class="message-bubble">'
       html+=   ' <div class="message-text">'
       if (imagen==0) {

      html+=mensaje
       }else{


       html+='<div  >'
             html+='<img style="width:150px;height:200px;" src="'+ruta2+"archivosmensaje/"+imagen+'" class="">'
/*                html+='<a onclick="VerImagen(\''+mensajes[i].imagen.trim()+ '\')"  style="float:left;margin: 25px 10px 0px 20px;"><span style="background-image:url(img/descarga.png);">aqui</span></a>' 
*/
/*            html+='<a href="'+ruta2+'archivosmensaje/'+mensajes[i].imagen.trim()+'" download="'+mensajes[i].imagen.trim()+'" style="float:left;margin: 25px 10px 0px 20px;"><span class="glyphicon glyphicon-download-alt" style="color:write">aqui</span></a>' 
*/       html+='</div>'
/*       html+='<img style="width:150px;height:200px;" src="'+ruta2+"archivosmensaje/"+imagen+'" class="">'
*/       }

       html+='</div>'
      
      html+=   '  </div>'
     html+= ' </div>'


   html+= ' </div>';
    var divmensajes= $("#mensajes").html();
    var mensajes=divmensajes+html;
   // $("#mensajes").html(mensajes);

    ActualizarMensajesLeidos();
    ObtenerMensajesAnteriores();
   $$('.messages-content').scrollTop( $('.messages-content').get(0).scrollHeight, 400 );

/*    myMessagebar.scrollMessages();  
*/     //$("#formdatos").addClass('abajomensaje');
     var idusuario=localStorage.getItem('id_user');
     var tipo="Invitado";
/*    socket=io.connect('http://localhost:3000');
*/
  

   var JSon={"idusuario":idusuario,"soporte":idsoporte,"socketid":socket.id,"nombre":nombre,"mensaje":mensaje,"imagen":imagen,"idmensaje":idmensaje,"arrayusuarios":JSON.parse(arrayusuarios),"rutaimagen":rutaimagen};
   console.log(JSon);
  Mandarmensaje(JSon);

  $("#mensajetxt").val('');
 /* $("textarea").css('height','28');
  $("#divmensaje").css('height','44');
  */

    

   // var alto=0,alto2=0;

   /* $(".message").each(function( index ) {
       var t=$(this).height();

       alto=alto+t;
    });
     $(".messages-title").each(function( index ) {
       var t=$(this).height();

         alto2=alto2+t;
      });
       console.log("alto"+alto);

        
      var tamaniodiv=alto+alto2+20;
        console.log("tamanio"+tamaniodiv);
        


          myScroll.scrollTo(0, (-1*tamaniodiv));*/

  // $('#mensajes').scrollTop( $('#mensajes').prop('scrollHeight')+20); 

     //  $("#mensajes").animate({ scrollTop: $('#mensajes').prop("scrollHeight")}, 1000);

    // Enviotecla();

}


function Enviotecla() {

    $( "#mensajetxt" ).keypress(function() {
      var key = window.event.keyCode;

    
        if (key === 13) {
            Enviomensaje();
        }
        else {
            return true;
        }
  });
}



function Mandarmensaje(JSon) {
  console.log("mandando"+JSon);
    socket.emit('nuevomensaje',JSon);

}


function PintarMensaje(data) {

    //app.dialog.confirm(data.imagen);

  

      var html='<div class="message message-received message-first message-last message-tail" >'
      html+='  <div class="message-avatar" style="background-image:url('+data.rutaimagen+');margin-right:0px;">'
      html+='</div>'
      html+='<div class="message-content" style="padding-left:2px;">'
      html+='<div class="message-name">'+data.nombre+'</div>'
      html+='<div class="message-header"></div>'
      html+='<div class="message-bubble">'
      html+=' <div class="message-text-header"></div>'
      html+='<div class="message-text">'
    if (data.imagen=="") {
           html+=data.mensaje
      
        }else{
      html+='<div onclick="VerImagen(\''+data.imagen.trim()+ '\')" >'

       html+='<img style="width:150px;height:200px;" src="'+ruta2+"archivosmensaje/"+data.imagen+'" class="">'

       html+='</div>'
      }

      html+='</div>'
      html+=' <div class="message-text-footer"></div>'
      html+=' </div><div class="message-footer"></div>'
      html+=' </div>'
    
      html+='</div>';

    var divmensajes= $("#mensajes").html();
    var mensajes=divmensajes+html;

  
    $("#mensajes").html(mensajes);
    if ($("#mensajes")) {
    ActualizarMensajes();


    }

    if ($("#lbl_mensajes")) {
    $("#lbl_mensajes").css('display','block');

      var numero=parseInt($("#lbl_mensajes").text());
    var nummensajes=numero+1;
      $("#lbl_mensajes").text(nummensajes);
      $("#lbl_mensajes").css('display','flex');

    }
   /* var alto=0,alto2=0;

     $(".message").each(function( index ) {
       var t=$(this).height();

       alto=alto+t;
    });
      $(".messages-title").each(function( index ) {
       var t=$(this).height();

         alto2=alto2+t;
      });*/
      // console.log("alto"+alto);

        
     /* var tamaniodiv=alto+alto2+20;
        console.log("tamanio"+tamaniodiv);
        */


        //  myScroll.scrollTo(0, (-1*tamaniodiv));
/*        myMessagebar.scrollMessages();  
*/
}

function CargarSoportesAnteriores() {

  var iduser=localStorage.getItem('Sid');


  var datos="idusuario="+iduser;

   $.ajax({
        url: ruta2+'Chatiss/ObtenerSoporteAnteriores',
        type: 'post',
        dataType: 'json',
        data:datos,
        
     success: function(data) {

        var mensajes=data.soportes;

        var html="";
        var soporteid="";

        if (mensajes.length > 0) {
          var cantidad=mensajes.length;

          for (var i = 0; i <mensajes.length; i++) {
            if (soporteid!=mensajes[i].idsoporte) {
            html+='<div class="messages-title" style="font-weight: bold;" >'+mensajes[i].fechaletra+'</div>'

            }
            if (mensajes[i].idusuario==iduser) {

              html+='<div class="message message-sent message-first message-last message-tail" id="msj_'+mensajes[i].idmensaje+'"'
              if (mensajes[i].imagen!=0) {
              html+=' onclick="MenuOpciones2('+mensajes[i].idmensaje+',\''+mensajes[i].imagen.trim()+ '\')"  >'

              }else{
              html+=' onclick="MenuOpciones('+mensajes[i].idmensaje+')">'
              }
              html+=' <div class="message-avatar" style="background-image:url(img/icon-usuario.png)"> '
              html+='    </div> '
              html+='<div class="message-content" style="padding-left:2px;">'
              html+='<div class="message-name">'
              html+=mensajes[i].usuario+'</div>'
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
              html+=mensajes[i].texto
                }
              html+=' </div> '
               html+=' </div>'
               html+=' </div>'
              
               html+=' </div>'


            }else{

            html+=' <div class="message message-received message-first message-last message-tail">'
            html+='  <div class="message-avatar" style="background-image:url(img/icon-usuario.png);margin-right:0px;">'
            html+='  </div>'
            html+=' <div class="message-content" style="padding-left:2px;">'
            html+=' <div class="message-name">'+mensajes[i].soporte+'</div>'
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
            html+=mensajes[i].texto
            }
            html+='</div>'
            html+='  <div class="message-text-footer">'
            html+='  </div> </div>'
            html+='  <div class="message-footer">'
            html+='  </div> '
            html+=' </div>'
            
            html+=' </div>';

            }

            soporteid=mensajes[i].idsoporte;
           
            
          }
          if (mensajes[cantidad-1].soporteactivo==1) {
/*            app.dialog.alert(""+mensajes[cantidad-1].idsoporte);
*/            localStorage.setItem('idsoporte',mensajes[cantidad-1].idsoporte);

          }

        $("#mensajes").html(html);
        
        myScroll = new IScroll('#contenido', {/*scrollbars: true,*/
      mouseWheel: true, 
      interactiveScrollbars: true,
      /*shrinkScrollbars: 'scale',
      fadeScrollbars: true*/});
      var alto=0,alto2=0;
       $(".message").each(function( index ) {
       var t=$(this).height();

         alto=alto+t;
      });

        $(".messages-title").each(function( index ) {
       var t=$(this).height();

         alto2=alto2+t;
      });


/*       console.log("alto"+alto);
*/
        
      var tamaniodiv=alto+alto2;
        console.log("tamanio"+tamaniodiv.toFixed(2));
        console.log("scrooll i"+(-1*tamaniodiv));


          myScroll.scrollTo(0, (-1*tamaniodiv));
      
      
           // $("#mensajes").height(tamaniodiv);
/*            $('#mensajes').css('transform', 'translate(0px,'+(-1*tamaniodiv/1.5)+') translateZ(0px)');
*/

        }else{


            


            var html=' <div class="message message-received message-first message-last message-tail">'
            html+='  <div class="message-avatar" style="background-image:url(img/icon-usuario.png);margin-right:0px;">'
            html+='  </div>'
            html+=' <div class="message-content" style="padding-left:2px;">'
            html+=' <div class="message-name">Soporte</div>'
            html+='  <div class="message-header">'
            html+='  </div>'
            html+=' <div class="message-bubble">'
            html+='  <div class="message-text-header">'
            html+='  </div>'
            html+='  <div class="message-text">'
            html+='Bienvenido al chat '
            
            html+='</div>'
            html+='  <div class="message-text-footer">'
            html+='  </div> </div>'
            html+='  <div class="message-footer">'
            html+='  </div> '
            html+=' </div>'
            
            html+=' </div>';

           localStorage.setItem('idsoporte','0');



           $("#mensajes").append(html);
           
        myScroll = new IScroll('#contenido', {/*scrollbars: true,*/
      mouseWheel: true, 
      interactiveScrollbars: true,
      /*shrinkScrollbars: 'scale',
      fadeScrollbars: true*/});
      

    
        }

      

       
        }
    });
}

function ConclusionSoporte(data) {
  localStorage.setItem('idsoporte',0);

  app.dialog.alert('Se ha concluido Soporte', 'Soporte Terminado!');
}

/*function VerImagen(imagen) {

  var dynamicPopup = app.popup.create({
  content: '<div class="popup">'+
              '<div class="block">'+
              '<p style="float:right;"><a onclick="DescargaImagen(\''+imagen.trim()+ '\')"" class="link popup-close">Descargar</a></p>'+

              '<p style=""><a href="#" class="link popup-close">Cerrar</a></p>'+

          '<img id="imagendescarga" style="max-width: 100%;width:320px;height:auto;" src="'+ruta2+"archivosmensaje/"+imagen+'" class="">'+

              '</div>'+
            '</div>',
  // Events
  on: {
    open: function (popup) {
      console.log('Popup open');
    },
    opened: function (popup) {
      console.log('Popup opened');
    },
  }
});
    dynamicPopup.open();


}*/

function IniciaChat2(imagen) {
  var nombre=localStorage.getItem('Snombre');

var correo=localStorage.getItem('Semail');
var mensaje=$("#mensajetxt").val();
var idusuario=localStorage.getItem('Sid');
var conimagen="1";


localStorage.setItem('nombrechat',nombre);
var datos= 'usuario='+idusuario+'&nombre='+nombre+'&correo='+correo+'&conimagen='+conimagen+'&imagen='+imagen;
/*
 $.ajax({
        url: ruta2+'Chatiss/InicioChat',
        type: 'post',
        dataType: 'json',
        data:datos,
     success: function(data) {*/

      localStorage.setItem('idsoporte',1);
            console.log('sopor'+data.soporte);
            app.dialog.alert(data.imagen);
          Envio(nombre,correo,mensaje,data.soporte,data.imagen,data.idmensaje);

/*
         
        }
    });*/

}

function EnviaMensaje2(imagen) {
  var nombre=localStorage.getItem('Snombre');
  var  idsoporte=localStorage.getItem('idsoporte');
  var correo=localStorage.getItem('Semail');
  var mensaje=$("#mensajetxt").val();
  var conimagen="1";

var idusuario=localStorage.getItem('Sid');

localStorage.setItem('nombrechat',nombre);
var datos= 'usuario='+idusuario+'&soporte='+idsoporte+'&nombre='+nombre+'&correo='+correo+'&mensaje='+mensaje+'&conimagen='+conimagen+'&imagen='+imagen;;

 /*$.ajax({
        url: ruta2+'Chatiss/EnviaMensaje',
        type: 'post',
        dataType: 'json',
        data:datos,
     success: function(data) {
*/
      localStorage.setItem('usuario',1);
      localStorage.setItem('idsoporte',1);
            console.log(data.soporte);
          Envio(nombre,correo,mensaje,data.soporte,data.imagen,data.idmensaje);


         
      /*  }
    });*/

}


function MenuOpciones(elemento) {

     app.dialog.create({
      title: '',
      text: '',
      buttons: [
      {
        text: 'Eliminar',
      },
     /* {
        text: 'Copiar',
      },*/
      {
        text: 'Cancelar',
        color:'#ff3b30',

      },
      
      ],

      onClick: function (dialog, index) {
        if(index === 0){
                //Button 1 clicked
                EliminaMensaje(elemento);
              //  app.dialog.alert("Tomar foto");
              }
            /*  else if(index === 1){
                //Button 2 clicked
                CopiarMensaje(elemento);
                // app.dialog.alert("foto GALERIA");

              }*/
              else if(index === 2){
                //Button 3 clicked

              }
            },
            verticalButtons: true,
          }).open();

   }

   function EliminaMensaje(elemento) {
  var soporte=localStorage.getItem('idsoporte');
    var datos= 'idmensaje='+elemento+'&soporte='+soporte;

     /*$.ajax({
            url: ruta2+'Chatiss/EliminarMensaje',
            type: 'post',
            dataType: 'json',
            data:datos,
         success: function(data) {*/

              $("#msj_"+elemento).remove();
             var idusuario=localStorage.getItem('usuario');

             var JSon={"idusuariosoporte":data.idusuariosoporte,"soporte":soporte,"socketid":socket.id,"idmensaje":elemento};

              socket.emit('eliminarmensaje',JSon);
             
         /*   }
        });*/
    
   }

   function CopiarMensaje(elemento) {
    // body...
   }

  



function MenuOpciones2(elemento,imagen) {

     app.dialog.create({
      title: '',
      text: '',
      buttons: [
      {
        text: 'Eliminar',
      },
      {
        text:'Vista Previa'
      },
  
      {
        text: 'Cancelar',
        color:'#ff3b30',

      },
      
      ],

      onClick: function (dialog, index) {
        if(index === 0){
                //Button 1 clicked
                EliminaMensaje(elemento);
              //  app.dialog.alert("Tomar foto");
              }
              else if(index === 1){
              VerImagen(imagen);

              }
              else if(index === 2){
              

              }
             
            },
            verticalButtons: true,
          }).open();

   }

      

     function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + JSON.stringify(error));
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
  var storageLocation = "";


 function DescargaImagen(imagen) {
  app.dialog.alert("descarga"+imagen);



  // var r=ruta2+"archivosmensaje/"+imagen;

/*window.open(encodeURI(r), '_system');
*/
  var r=ruta2+"archivosmensaje/"+imagen;
  var folder="iss";
  var filename=imagen.split(".")[0];

  //app.dialog.alert(device.platform);

  //DownloadFile(r,folder,imagen);
  //DownloadToDevice(r,imagen);
  Download(r);

 }

     function Download(r) {
        var remoteFile = r;
        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                var localPath = fileEntry.fullPath;
                if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                    localPath = localPath.substring(7);
                }
                var ft = new FileTransfer();
                ft.download(remoteFile,
                    localPath, function(entry) {
                        var dwnldImg = document.getElementById("imagendescarga");
                        dwnldImg.src = entry.fullPath;
                        dwnldImg.style.visibility = "visible";
                        dwnldImg.style.display = "block";
                    }, fail);
            }, fail);
        }, fail);
    }



 function DownloadToDevice(fileurl,imagen) {

        app.dialog.alert("aqui"+fileurl);

/*
  switch (device.platform) {

      case "Android":
      //interna cordova.file.dataDirectory  external cordova.file.externalDataDirectory
          storageLocation =  cordova.file.dataDirectory;
          break;
      case "iOS":
          storageLocation = cordova.file.documentsDirectory;
          break;

  }*/

  //if IOS cordova.file.documentsDirectory
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
 // var filepath = fileEntry.toURL() + imagen;
    var filepath = fileSystem.root.toURL() + "PICTURES/"+imagen;
                app.dialog.alert(filepath);


  var fileTransfer = new FileTransfer();
  app.dialog.alert(filepath);
   
  fileTransfer.download(fileurl, filepath,
    function (fileEntry) {
            app.dialog.alert(fileEntry.toURL());

/*      alert(fileEntry.toURL());
*/      refreshMedia.refresh(path);

      console.log("download complete: " + fileSystem.root.toURL());
    },
    function (error) {
      alert(JSON.stringify(error));
      console.log("ErrorDownload: " + JSON.stringify(error));
    },
    true,
    {}
  );
 



});



  
}



 function DownloadFile(URL, Folder_Name, File_Name) {
//Parameters mismatch check
if (URL == null && Folder_Name == null && File_Name == null) {
    return;
}
else {
    //checking Internet connection availablity
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        return;
    } else {
        download(URL, Folder_Name, File_Name); //If available download function call
    }
  }
}


function download(URL, Folder_Name, File_Name) {
//step to request a file system 
  app.dialog.alert(URL);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

function fileSystemSuccess(fileSystem) {
    var download_link = encodeURI(URL);
    ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    var fp = rootdir.fullPath; // Returns Fulpath of local directory

    fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
    // download function call
    filetransfer(download_link, fp);
}

function onDirectorySuccess(parent) {
    // Directory created successfuly
}

function onDirectoryFail(error) {
    //Error while creating directory
    alert("Unable to create new directory: " + error.code);
}

  function fileSystemFail(evt) {
    //Unable to access file system
    alert(evt.target.error.code);
 }
}


function filetransfer(download_link, fp) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path
fileTransfer.download(download_link, fp,
                    function (entry) {
                        app.dialog.alert(entry.fullPath);

                        alert("download complete: " + entry.fullPath);
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                     //alert("download error target " + error.target);
                     //alert("upload error code" + error.code);
                 }
            );
}

function ActualizarMensajes() {
  var  idsoporte=localStorage.getItem('idsoporte');

/*if (idsoporte > 0) {
  

var datos= 'soporte='+idsoporte;

 $.ajax({
        url: ruta2+'Chatiss/Actualizarmensajes',
        type: 'post',
        dataType: 'json',
        data:datos,
     success: function(data) {

      

         
        }
    });
  }*/
}
/*

var win = function (r) { console.log("Code = " + r.responseCode);
 console.log("Response = " + r.response); console.log("Sent = " + r.bytesSent); 
}
 var fail = function (error) {
  alert("An error has occurred: Code = " + error.code);
   console.log("upload error source " + error.source); 
   console.log("upload error target " + error.target); }
    var options = new FileUploadOptions(); 
    options.fileKey = "file"; 
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
     options.mimeType = "text/plain"; var params = {};
      params.value1 = "test";
       params.value2 = "param"; 
       options.params = params;
        var ft = new FileTransfer();
        ft.upload(fileURI, encodeURI("http://some.server.com/upload.php"), win, fail, options); */
