
    //Funcion para abrir la camara del phone
    function TomarFotoimagengrupal(iduser) {
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
        navigator.camera.getPicture(onSuccessimagengrupal,onError,options);
    }

    //El valor devuleto al tomar la foto lo envia a esta funcion 
    function onSuccessimagengrupal(RutaImagen) {
        //app.popup.close('.popup-opciones-subir-fotos');
        //document.getElementById("miimagen").src = RutaImagen;
        fichero=RutaImagen;
        
        var iduser = localStorage.getItem("id_user");
        
        //alert(v_idcamiones_gasolina);
        //app.dialog.alert("El ID DE CAMIONES GASOLINA ES: "+v_idcamiones_gasolina);
        
        
        guardar_foto_imagengrupal(iduser);
    }



    function guardar_foto_imagengrupal(iduser) {
      var idsucursal=localStorage.getItem('idsucursal');
        //app.preloader.show()
            app.dialog.preloader('Cargando...');

        var idimagengrupal=$("#v_idimagengrupal").val();

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        

        //Agregamos parametros
        var params = new Object();
        params.iduser = iduser;
        params.idimagengrupal = idimagengrupal;
        params.idsucursal=idsucursal;
        console.log("Valor del parametro "+iduser+' od');
        
        options.params = params;

        
        
        var ft = new FileTransfer();

        //ft.upload(fichero, "http://192.168.1.69/svnonline/iasistencia/registroasistencia/php/asistencia_fotos_g_actividad.php", respuesta, fail, options);
        
        
        console.log("El ID DEL PERFIL ES: "+iduser);
        //ft.upload(fichero, urlphp+"asistencia_fotos_g_actividad.php", respuesta, fail, options);
        
        ft.upload(fichero, urlphp+"subirimagengrupal.php", respuestafotoimagengrupal, fail, options);

        
    }


    function respuestafotoimagengrupal(r)
    {
        var resp = r.response;
        var obj = JSON.parse(resp);
        var result = obj[0]['respuesta'];
        var ruta = obj[0]['ruta'];
        var idclienteimagengrupal = obj[0]['idclienteimagengrupal'];

        //app.preloader.hide();
        app.dialog.close();
        if(result == 1){

            localStorage.setItem('fotoimagengrupal',ruta);

            //Todo se completo bien
            //$('#v_descripcion_detalle_foto').val('');
            //$('#miimagen').attr("src","img/lazy-placeholder.gif");

            //closepop('.popup-detalle-actividad-foto');
            app.dialog.alert("","Se subió la imagen correctamente");


            //alerta('La foto se ha guardado correctamente','PROCESO TERMINADO');
            
            //cargar_datos_actividad(idservicios_seguimientos);
            
            CargarFotoimagengrupal();
            //var idclienteimagengrupal=idclienteimagengrupal;

        //  Cargardetalle(idclienteimagengrupal);


    }else{
            //Hubo un error
            alerta(result,"ERROR");
        }   
    }




    
    function AbrirModalFotoimagengrupal() {

        var id_user=localStorage.getItem("id_user");
       
      
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
                TomarFotoimagengrupal(id_user)
              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getPhotoimagengrupal(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

       
    }






    function onPhotoDataSuccessimagengrupal(imageData) {

        var id_user = localStorage.getItem("id_user");
        var idimagengrupal=$("#v_idimagengrupal").val();
        var idsucursal=localStorage.getItem('idsucursal');

        var datos= 'iduser='+id_user+'&imagen='+imageData+'&idimagengrupal='+idimagengrupal+"&idsucursal="+idsucursal;


        var pagina = urlphp+"subirimagengrupal2.php";

        $.ajax({
            url: pagina,
            type: 'post',
            dataType: 'json',
            data:datos,
            async:false,
            beforeSend: function() {
        // setting a timeout
            app.dialog.preloader('Cargando...');

    },

    success: function(data) {



            app.dialog.close();

        localStorage.setItem('fotoimagengrupal',data.ruta);

        app.dialog.alert("Se subió la imagen correctamente",localStorage.getItem("UserName"));
         CargarFotoimagengrupal();

           // CargarFoto();
         //  var idclienteimagengrupal=data.idclienteimagengrupal;

          // Cargardetalle(idclienteimagengrupal);


      }
  }); 

    }

 //
 function getPhotoimagengrupal(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessimagengrupal, onError, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });


        //  navigator.camera.getPicture(onSuccess,onError,options);

    }

    function CargarFotoimagengrupal() {
      


      var html="";  
html+=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div> 
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
              <div class="iconocerrar link sheet-close" style="z-index:100;">
                                        <span class="bi bi-x-circle-fill"></span>
                                     </div>

              <div class="" style="height: 100%;">
                   <div class="row">
                                 <div class="col-20">
                                    
                                </div>

                                 <div class="col-60">
                                 <span class="titulomodal"></span>
                                 </div>
                                 <div class="col-20">
                                 <span class="limpiarfiltros"></span>
                                 </div>
                             </div>
                <div class="page-content" style="background: white; height: 100%;width: 100%;border-radius: 20px;">
                        
                             <div class="" style="position: absolute;top:2em;width: 100%;">
                                
                                  <div class="">
                                      <div class="block" style="margin-right:1em;margin-left:1em;">

                                       `;
                
                                    html+=`
                                           
                                           <div class="row" style="margin-bottom:1em;margin-top:3em;">
                                                 <div class="col-100 fotoimagen">
                                                    <div class="  margin-bottom" style="margin-right: 1em;
                                              margin-left: 1em;">
                                                        <div class="card-content ">
                                                         <img src="" alt="" style="    width: 100%;height: 70%;border-radius: 10px;" class="imglogoimagengrupal" />
                                                        </div>
                                                    </div>
                                                </div> 
                                           
                                            </div>
                                            <div class="row">
                                               <div class="col">
                                                      <button class=" button button-fill button-large bg-color-white text-color-theme button-raised " id="btncancel" type="button" > Cancelar</button>
                                                </div>
                                                 <div class="col">
                                                 <button class=" button button-fill button-large color-theme button-raised" id="btnguardarimagen" type="button"> Guardar</button>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                             </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>`;
      dynamicSheet2 = app.sheet.create({
        content: html,
        swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
             var foto=localStorage.getItem("fotoimagengrupal");

              if (foto!='null' && foto!='') {
                $(".imglogoimagengrupal").attr('src',urlphp+"upload/imagengrupal/"+foto);

              }else{
                $(".imglogoimagengrupal").attr('src',urlimagenimagengrupal);

              }

             $$("#btnguardarimagen").attr('onclick','Guardarimagengrupal()');
             $$("#btncancel").attr('onclick','CancelarFotogrupal()');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet2.open();


    }

    function CancelarFotogrupal() {
         localStorage.setItem('fotoimagengrupal','');

          dynamicSheet2.close();

    }


    function Cargardetalle(idclienteimagengrupal) {

        GoToPage("/detalleimagengrupal/"+idclienteimagengrupal);

    }


    /*function ObtenerListadoimagengrupals() {
        var id_user = localStorage.getItem("id_user");
        var idsucursal=localStorage.getItem('idsucursal');

        var datos= 'iduser='+id_user+"&idsucursal="+idsucursal;


        var pagina = urlphp+"listadoimagengrupalsUsuario.php";
        $.ajax({
            url: pagina,
            type: 'post',
            dataType: 'json',
            data:datos,
            beforeSend: function() {
            // setting a timeout
          //  app.preloader.show()
                
                        

        },

        success: function(data) {

            //app.preloader.hide()

            

            var listado=data.respuesta;

            //PintarListado(listado);


        }
    }); 
    }*/

/*    function PintarListado(resultado) {

        var html="";
  if (resultado.length>0) {
    for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null') {

        urlimagen=urlimagenes+`upload/sucursal/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style=""/>';
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style=""/>';
      }
      
      html+=`
         <li class="list-item sucursal_" style="background:white;" id="sucursal_`+resultado[i].idsucursales+`" >
         <div class="row">
         <div class="col-auto">
         <div class="avatar avatar-50 shadow rounded-10">
                   `+imagen+`
                  </div>
                </div>
                <div class="col-30 align-self-center no-padding-left">
                <p class="text-color-theme no-margin-bottom">`+resultado[i].sucursal+`</p>
                  <p class="text-muted size-12">Fecha de registro:`+resultado[i].fechaformato+`</p>
                </div>
                  
                  
                   `;
    
  html+=`              

              
                    <div class="col">
                    <span style="font-size: 28px;display: flex;justify-content: center;" onclick="AgregarImagenesSucursal(`+resultado[i].idsucursales+`)"><i class="bi-card-image"></i></span>

                    </div>

                    <div class="col">
                    <span style="font-size: 28px;display: flex;justify-content: center;" onclick="AgregarPromociones(`+resultado[i].idsucursales+`)"><i class="bi-tags-fill"></i></span>

                    </div>
                  <div>
                </div>
               </div>
               </li> 

      `;

    }

    $(".listadoimagengrupals").html(html);
  }
}
*/
   


    function EliminarImagenGrupal(idimagengrupal) {
        

        var datos= 'idimagengrupal='+idimagengrupal;
        var pagina = urlphp+"eliminarimagengrupal.php";
            app.dialog.confirm('¿Seguro de eliminar la imagen?','', function () {

                $.ajax({
                    url: pagina,
                    type: 'post',
                    dataType: 'json',
                    data:datos,
                    beforeSend: function() {
                            // setting a timeout
                            app.preloader.show()

                        },

                    success: function(data) {
                        app.preloader.hide();
                        ObtenerImagenesGrupalServicio();


                    }
                });

            });
    
    }



function ObtenerImagenesGrupalServicio(){
    var idservicio=localStorage.getItem('idservicio');
    var datos="idservicio="+idservicio;
    var pagina = "ObtenerServicioImagenes.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        crossDomain: true,
        cache: false,
        async:false,
        success: function(datos){

            var respuesta=datos.respuesta;
            $(".galeriagrupal").css('display','none');

            if (respuesta.length>0) {
                $(".galeriagrupal").css('display','block');
                 PintarimagengrupalListado(respuesta);
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
function PintarimagengrupalListado(resultado) {

        var html="";
  if (resultado.length>0) {
    for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagengrupal/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      }
      
        /*<div class="col-100 medium-50 large-33">
                <a  class="card margin-bottom">
                    <div class="card-content card-content-padding">
                        <div class="row">
                            <div class="col-50">
                                <div class="h-190  rounded-10 coverimg margin-bottom" onclick="VisualizarImagen(\'`+urlimagen+`\')" style="background-image: url('`+urlimagen+`');">
                                    
                                </div>
                            </div>
                            <div class="col align-self-center">
                               
                            </div>
                        </div>
                    </div>
                </a>
            </div>*/

      html+=`

            <li style="background: white;    border-radius: 10px;
    padding: 1em;margin-top:1em;" >

            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:100%;">
             
                <div class="row">
                <div class="row">
                      <div class="col-30">
                        <figure class="avatar  rounded-10">
                        <img src="`+urlimagen+`" alt="" style="width:60px;height:60px;" onclick="VisualizarImagen(\'`+urlimagen+`\')">
                        </figure>
                        
                        </div>
                    <div class="col-70" style="
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
">`;

if (localStorage.getItem('idtipousuario')==5) {
    html+=`<a class="button button-fill button-large color-theme button-raised margin-bottom-half " style="
      position: absolute;
        height: 30px;
       background: red;
     width: 20px;
    margin-right: 1em;" onclick="EliminarImagenGrupal(`+resultado[i].idimagenesgrupal+`);">
                                <i style="color: white;font-size:18px;margin-left: 0.2em;" class="bi bi-trash-fill"></i>
                                 <span class="if-not-md">
                                 </span>
                        </a>`;
             }

                        html+=`<div class="row">

                             <div class="row"> </div>
                      
                           <div class="row">

                            <div class="" style="" id="participante">
                           
                                 
                            </div>
                           </div>


                     <div class="row">
                             <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo">
                             </div>
                       
                         </div>

                            </div>


                            
                            </div>

                            <div class="col-20">

                            </div>
                        </div>
                     
              </div>

            
          </div>

          </label>

            </li>

      `;

    }

  }

    
    $(".listadoimagenes").html(html);

}

function Guardarimagengrupal() {
 
  var id=$("#v_idimagengrupal").val();
 
  var foto=localStorage.getItem('fotoimagengrupal');
  var idservicio=localStorage.getItem('idservicio');
  var iduser=localStorage.getItem('id_user');
  var datos="v_idimagengrupal="+id+"&foto="+foto+"&iduser="+iduser+"&idservicio="+idservicio;
  var bandera=1;

  if (localStorage.getItem('fotoimagengrupal')=='' || localStorage.getItem('fotoimagengrupal')==null) {

    bandera=0;
  }


      if (bandera==1) {


        var pagina = "Guardarimagengrupal.php";
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp+pagina,
            data:datos,
            crossDomain: true,
            cache: false,
            async:false,
            success: function(datos){

                localStorage.setItem('fotoimagengrupal','');
                ObtenerImagenesGrupalServicio();
                alerta('','Registro guardado correctamente');
                dynamicSheet2.close();

               // GoToPage('detalleserviciocoach');
                
               
                },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                    var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                    //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                        console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
                }
            });

    }else{


        if (foto=='') {

            bandera=0;
          }



        if (bandera==0) {
            alerta('','Falta por subir una imagen');
        }
    }

}


function AgregarImagenesSucursal(idsucursal) {
 localStorage.setItem('idsucursal',idsucursal);
 
 GoToPage('imagenessucursal');

}

function AgregarPromociones(idsucursal) {
  localStorage.setItem('idsucursal',idsucursal);
 
  GoToPage('promocionessucursal');
}




