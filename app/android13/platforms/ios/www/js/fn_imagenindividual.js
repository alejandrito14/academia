
    //Funcion para abrir la camara del phone
    function TomarFotoimagenindividual(iduser) {
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
        navigator.camera.getPicture(onSuccessimagenindividual,onError,options);
    }

    //El valor devuleto al tomar la foto lo envia a esta funcion 
    function onSuccessimagenindividual(RutaImagen) {
        //app.popup.close('.popup-opciones-subir-fotos');
        //document.getElementById("miimagen").src = RutaImagen;
        fichero=RutaImagen;
        
        var iduser = localStorage.getItem("id_user");
        
        //alert(v_idcamiones_gasolina);
        //app.dialog.alert("El ID DE CAMIONES GASOLINA ES: "+v_idcamiones_gasolina);

        
        guardar_foto_imagenindividual(iduser);
    }



    function guardar_foto_imagenindividual(iduser) {
      var idsucursal=localStorage.getItem('idsucursal');
        //app.preloader.show()
        app.dialog.preloader('Cargando...');

        var idimagenindividual=$("#v_idimagenindividual").val();

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        

        //Agregamos parametros
        var params = new Object();
        params.iduser = iduser;
        params.idimagenindividual = idimagenindividual;
        params.idsucursal=idsucursal;
        console.log("Valor del parametro "+iduser+' od');
        
        options.params = params;

        
        
        var ft = new FileTransfer();

        //ft.upload(fichero, "http://192.168.1.69/svnonline/iasistencia/registroasistencia/php/asistencia_fotos_g_actividad.php", respuesta, fail, options);
        
        
        console.log("El ID DEL PERFIL ES: "+iduser);
        //ft.upload(fichero, urlphp+"asistencia_fotos_g_actividad.php", respuesta, fail, options);
        
        ft.upload(fichero, urlphp+"subirimagenindividual.php", respuestafotoimagenindividual, fail, options);

        
    }


    function respuestafotoimagenindividual(r)
    {
        var resp = r.response;
        var obj = JSON.parse(resp);
        var result = obj[0]['respuesta'];
        var ruta = obj[0]['ruta'];
        var idclienteimagenindividual = obj[0]['idclienteimagenindividual'];
        //app.preloader.hide();
        app.dialog.close();
        if(result == 1){

            localStorage.setItem('fotoimagenindividual',ruta);

            //Todo se completo bien
            //$('#v_descripcion_detalle_foto').val('');
            //$('#miimagen').attr("src","img/lazy-placeholder.gif");

            //closepop('.popup-detalle-actividad-foto');
            app.dialog.alert("","Se subió la imagen correctamente");


            //alerta('La foto se ha guardado correctamente','PROCESO TERMINADO');
            
            //cargar_datos_actividad(idservicios_seguimientos);
            
            CargarFotoimagenindividual();
         

    }else{
            //Hubo un error
            alerta(result,"ERROR");
        }   
    }




    
    function AbrirModalFotoimagenIndividual() {

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
                TomarFotoimagenindividual(id_user)
              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getPhotoimagenindividual(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

       
    }






    function onPhotoDataSuccessimagenindividual(imageData) {

        var id_user = localStorage.getItem("id_user");
        var idimagenindividual=$("#v_idimagenindividual").val();
        var idservicio=localStorage.getItem('idservicio');
        var iduserseleccionado=localStorage.getItem('iduserseleccionado');
        var datos= 'iduser='+id_user+'&imagen='+imageData+'&idimagenindividual='+idimagenindividual+"&idservicio="+idservicio+"&iduserseleccionado="+iduserseleccionado;


        var pagina = urlphp+"subirimagenindividual2.php";

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

        localStorage.setItem('fotoimagenindividual',data.ruta);

        app.dialog.alert("Se subió la imagen correctamente",localStorage.getItem("UserName"));
         CargarFotoimagenindividual();


      }
  }); 

    }

 //
 function getPhotoimagenindividual(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessimagenindividual, onError, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });


        //  navigator.camera.getPicture(onSuccess,onError,options);

    }

    function CargarFotoimagenindividual() {




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
                                                         <img src="" alt="" style="    width: 100%;height: 70%;border-radius: 10px;" class="imglogoimagenindividual" />
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
             var foto=localStorage.getItem("fotoimagenindividual");

              if (foto!='null' && foto!='') {
               
                $(".imglogoimagenindividual").attr('src',urlphp+"upload/imagenindividual/"+foto);

              }else{
                $(".imglogoimagenindividual").attr('src',urlimagenimagenindividual);

              }

             $$("#btnguardarimagen").attr('onclick','GuardarimagenIndividual()');
             $$("#btncancel").attr('onclick','CancelarFotoIndividual()');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet2.open();
       

    }
    function CancelarFotogrupal() {
         localStorage.setItem('fotoimagenindividual','');

          dynamicSheet2.close();

    }



    function Cargardetalle(idclienteimagenindividual) {

        GoToPage("/detalleimagenindividual/"+idclienteimagenindividual);

    }


    /*function ObtenerListadoimagenindividuals() {
        var id_user = localStorage.getItem("id_user");
        var idsucursal=localStorage.getItem('idsucursal');

        var datos= 'iduser='+id_user+"&idsucursal="+idsucursal;


        var pagina = urlphp+"listadoimagenindividualsUsuario.php";
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

    $(".listadoimagenindividuals").html(html);
  }
}
*/
   


   


function ObtenerImagenesIndividualServicio(){
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
                 PintarimagenindividualListado(respuesta);
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
function PintarimagenindividualListado(resultado) {

        var html="";
  if (resultado.length>0) {
    for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagenindividual/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      }
      

      html+=`
         

               <div class="col-100 medium-50 large-33">
                <a  class="card margin-bottom">
                    <div class="card-content card-content-padding">
                        <div class="row">
                            <div class="col-100">
                                <div class="h-190  rounded-10 coverimg margin-bottom" onclick="VisualizarImagen(\'`+urlimagen+`\')" style="background-image: url('`+urlimagen+`');">
                                    
                                </div>
                            </div>
                            <div class="col align-self-center">
                                <p class="text-color-theme margin-bottom-half"></p>
                                <p class="text-muted small"></p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

      `;

    }

  }

    
    $(".listadoimagenes").html(html);

}

function GuardarimagenIndividual() {
 
  var id=$("#v_idimagenindividual").val();
 
  var foto=localStorage.getItem('fotoimagenindividual');
  var idservicio=localStorage.getItem('idservicio');
  var iduser=localStorage.getItem('id_user');
  var iduserseleccionado=localStorage.getItem('idusuarioseleccionado');

  var datos="v_idimagenindividual="+id+"&foto="+foto+"&iduser="+iduser+"&idservicio="+idservicio+"&iduserseleccionado="+iduserseleccionado;
  var bandera=1;

  if (localStorage.getItem('fotoimagenindividual')=='' || localStorage.getItem('fotoimagenindividual')==null) {

    bandera=0;
  }


      if (bandera==1) {


        var pagina = "Guardarimagenindividual.php";
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp+pagina,
            data:datos,
            crossDomain: true,
            cache: false,
            async:false,
            success: function(datos){
                dynamicSheet2.close();
                localStorage.setItem('fotoimagenindividual','');

                alerta('','Registro guardado correctamente');
                ObtenerImagenesIndividuales();
                
               
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

function ObtenerImagenesIndividuales() {
    var idservicio=localStorage.getItem('idservicio');
    var iduserseleccionado=localStorage.getItem('idusuarioseleccionado');
    var datos="idservicio="+idservicio+"&iduserseleccionado="+iduserseleccionado;
    var pagina = "ObtenerServicioImagenesIndividuales.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        success: function(datos){

            var respuesta=datos.respuesta;

           
                 Pintarimagenindividuales(respuesta);
     
           

            },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                var error;
                    if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                    if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                    console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
        });
}

function Pintarimagenindividuales(resultado) {
    var html="";
    if (resultado.length>0) {
        for (var i = 0; i <resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagenindividual/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      }

            html+=`
           <li style="
    border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
                      <div class="col-20" onclick="VisualizarImagen(\'`+urlimagen+`\')">
                        <figure class="avatar   rounded-10">
                      <img src="`+urlimagen+`" alt="" style="width:60px;height:60px;">
                        </figure>
                        </div>
                        
                    <div class="col-60">
                         <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;" id="">
                         </div>
                     
                         <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;" id="">
                            </div>
                    
                              <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;"></div>
               
                        </div>

                        <div class="col-20">
                         <div class="col"> 
                           

                            <a class="button button-fill button-large color-theme button-raised margin-bottom-half " style="
                                position: absolute;
                                height: 30px;
                                background: red;
                                width: 20px;
                                margin-right: 1em;"
     onclick="EliminarImagenIndividual(`+resultado[i].idimagenesindividual+`);">
                                <i style="color: white;font-size:18px;margin-left: 0.2em;" class="bi bi-trash-fill"></i>
                                 <span class="if-not-md">
                                 </span>
                        </a>
                        </div>
                        </div>

                        
                            <div class="col-30">


                                </div>


                         </div>
               
                     
              </div>

            
          </div></label>
          </li>

            `;
        }
    }

    $(".listadoimagenesindividuales").html(html);
}


function NuevaImagen() {
    GoToPage('nuevaimagenindividual');
}

function EliminarImagenIndividual(idimagenesindividual) {
    var datos= 'idimagenesindividual='+idimagenesindividual;
        var pagina = urlphp+"eliminarimagenindividual.php";
            app.dialog.confirm('¿Seguro de eliminar la imagen?','', function () {
                            app.preloader.show();

                $.ajax({
                    url: pagina,
                    type: 'post',
                    dataType: 'json',
                    data:datos,
                    beforeSend: function() {
                            // setting a timeout

                        },

                    success: function(data) {
                        app.preloader.hide();
                        ObtenerImagenesIndividuales();


                    }
                });

            });
}

function ObtenerImagenesIndividualServicioUsuario() {
    var idservicio=localStorage.getItem('idservicio');
    var idusuario=localStorage.getItem('id_user');
    var datos="idservicio="+idservicio+"&iduserseleccionado="+idusuario;
    var pagina = "ObtenerServicioImagenesIndividuales.php";
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
            $(".galeriaindividual").css('display','none');

            if (respuesta.length>0) {
                $(".galeriaindividual").css('display','block');
                 PintarimagenindividualListado(respuesta);
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

function PintarimagenindividualListado(resultado) {
    
        var html="";
  if (resultado.length>0) {
    for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagenindividual/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      }
      

      html+=`
         
               <div class="col-100 medium-50 large-33">
                <a  class="card margin-bottom">
                    <div class="card-content card-content-padding">
                        <div class="row">
                            <div class="col-100">
                                <div class="h-190  rounded-10 coverimg margin-bottom" onclick="VisualizarImagen(\'`+urlimagen+`\')" style="background-image: url('`+urlimagen+`');">
                                    
                                </div>
                            </div>
                            <div class="col align-self-center">
                                <p class="text-color-theme margin-bottom-half"></p>
                                <p class="text-muted small"></p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

      `;

    }

  }

    
    $(".listadoimagenesindividual").html(html);

}