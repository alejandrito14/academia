
    //Funcion para abrir la camara del phone
    function TomarFotoimagencita(iduser) {
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
        navigator.camera.getPicture(onSuccessimagencita,onError,options);
    }

    //El valor devuleto al tomar la foto lo envia a esta funcion 
    function onSuccessimagencita(RutaImagen) {
        //app.popup.close('.popup-opciones-subir-fotos');
        //document.getElementById("miimagen").src = RutaImagen;
        fichero=RutaImagen;
        
        var iduser = localStorage.getItem("id_user");
        
        //alert(v_idcamiones_gasolina);
        //app.dialog.alert("El ID DE CAMIONES GASOLINA ES: "+v_idcamiones_gasolina);

        
        guardar_foto_imagencita(iduser);
    }



    function guardar_foto_imagencita(iduser) {
      var idcita=localStorage.getItem('idcita');
        //app.preloader.show()
        app.dialog.preloader('Cargando...');

        var idimagencita=$("#v_idimagencita").val();

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        

        //Agregamos parametros
        var params = new Object();
        params.iduser = iduser;
        params.idimagencita = idimagencita;
        params.idcita=idcita;
        console.log("Valor del parametro "+iduser+' od');
        
        options.params = params;

        
        var ft = new FileTransfer();

        //ft.upload(fichero, "http://192.168.1.69/svnonline/iasistencia/registroasistencia/php/asistencia_fotos_g_actividad.php", respuesta, fail, options);
        
        console.log("El ID DEL PERFIL ES: "+iduser);
        //ft.upload(fichero, urlphp+"asistencia_fotos_g_actividad.php", respuesta, fail, options);
        
        ft.upload(fichero,urlphp+"subirimagencita.php", respuestafotoimagencita, fail, options);

        
    }


    function respuestafotoimagencita(r)
    {
        var resp = r.response;
        var obj = JSON.parse(resp);
        var result = obj[0]['respuesta'];
        var ruta = obj[0]['ruta'];
        var idclienteimagencita = obj[0]['idclienteimagencita'];
        //app.preloader.hide();
        app.dialog.close();
        if(result == 1){

            localStorage.setItem('fotoimagencita',ruta);
            //Todo se completo bien
            //$('#v_descripcion_detalle_foto').val('');
            //$('#miimagen').attr("src","img/lazy-placeholder.gif");

            //closepop('.popup-detalle-actividad-foto');
            //app.dialog.alert("","Se subió la imagen correctamente");


            //alerta('La foto se ha guardado correctamente','PROCESO TERMINADO');
            
            //cargar_datos_actividad(idservicios_seguimientos);
            
            CargarFotoimagencita();
         

    }else{
            //Hubo un error
            alerta(result,"ERROR");
        }   
    }

    function fail(r) {
      AbrirModalAviso(r);
    }


    
    function AbrirModalFotoimagencita() {

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
                TomarFotoimagencita(id_user)
              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getPhotoimagencita(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

       
    }






    function onPhotoDataSuccessimagencita(imageData) {

        var id_user = localStorage.getItem("id_user");
        var idimagencita=$("#v_idimagencita").val();
        var idcita=localStorage.getItem('idcita');
        var iduserseleccionado=localStorage.getItem('iduserseleccionado');
        var datos= 'iduser='+id_user+'&imagen='+imageData+'&idimagencita='+idimagencita+"&idcita="+idcita+"&iduserseleccionado="+iduserseleccionado;


        var pagina = urlphp+"subirimagencita2.php";

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

        localStorage.setItem('fotoimagencita',data.ruta);

        //app.dialog.alert("Se subió la imagen correctamente",localStorage.getItem("UserName"));
         CargarFotoimagencita();


      }
  }); 

    }

 //
 function getPhotoimagencita(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessimagencita, onError, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });


        //  navigator.camera.getPicture(onSuccess,onError,options);

    }

    function CargarFotoimagencita() {


      var html="";  
html+=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: black;">
           <div class="toolbar" style="background: black;margin-top: 1em;">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: black;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
            </div>

          
                <div class="page-content" style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                        
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
                                                         <img src="" alt="" style="width: 100%;height: 70%;border-radius: 10px;" class="imglogoimagencita" />
                                                        </div>
                                                    </div>
                                                </div> 
                                           
                                            </div>
                                            <div class="row">
                                               <div class="col">
                                                      <button style="background: white;color:black;" class=" button button-fill button-large  button-raised " id="btncancel" type="button" > Cancelar</button>
                                                </div>
                                                 <div class="col">
                                                 <button style="background: #C7AA6A;color:white;" class=" button button-fill button-large button-raised" id="btnguardarimagen" type="button"> Guardar</button>
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
             var foto=localStorage.getItem("fotoimagencita");

              if (foto!='null' && foto!='') {
               
                $(".imglogoimagencita").attr('src',urlphp+"upload/imagencita/"+foto);

              }else{
                $(".imglogoimagencita").attr('src',urlimagenimagencita);

              }

             $$("#btnguardarimagen").attr('onclick','Guardarimagencita()');
             $$("#btncancel").attr('onclick','CancelarFotocita()');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet2.open();
       

    }
    function CancelarFotogrupal() {
         localStorage.setItem('fotoimagencita','');

          dynamicSheet2.close();

    }

    function CancelarFotocita(argument) {
           localStorage.setItem('fotoimagencita','');

          dynamicSheet2.close();
    }



    function Cargardetalle(idclienteimagencita) {

        GoToPage("/detalleimagencita/"+idclienteimagencita);

    }


    /*function ObtenerListadoimagencitas() {
        var id_user = localStorage.getItem("id_user");
        var idsucursal=localStorage.getItem('idsucursal');

        var datos= 'iduser='+id_user+"&idsucursal="+idsucursal;


        var pagina = urlphp+"listadoimagencitasUsuario.php";
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

    $(".listadoimagencitas").html(html);
  }
}
*/
   


   


function ObtenerImagenescitaServicio(){
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
                 PintarimagencitaListado(respuesta);
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
function PintarimagencitaListado(resultado) {

        var html="";
  if (resultado.length>0) {
    for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagencita/`+resultado[i].foto;
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

function Guardarimagencita() {
 
  var id=$("#v_idimagencita").val();
 
  var foto=localStorage.getItem('fotoimagencita');
  var idcita=localStorage.getItem('idcita');
  var idusuario=localStorage.getItem('id_user');

  var datos="idimagencita="+id+"&foto="+foto+"&iduser="+idusuario+"&idcita="+idcita;
  var bandera=1;

  if (localStorage.getItem('fotoimagencita')=='' || localStorage.getItem('fotoimagencita')==null) {

    bandera=0;
  }


      if (bandera==1) {


        var pagina = "Guardarimagencita.php";
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
                localStorage.setItem('fotoimagencita','');

                //alerta('','');
               var aviso="Registro guardado correctamente";
                AbrirModalAviso(aviso)
                ObtenerImagenescita();
                
               
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

function ObtenerImagenescitaCliente() {
    var idcita=localStorage.getItem('idcita');
    var datos="idcita="+idcita;
    var pagina = "ObtenerImagenescita.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        success: function(datos){

            var respuesta=datos.respuesta;

           
                 Pintarimagencita3(respuesta);
     
           

            },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                var error;
                    if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                    if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                    console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
        });
}

function Pintarimagencita3(resultado) {

 var html="";
 $("#titulogaleria").css('display','none');
 if (resultado.length>0) {

   $("#titulogaleria").css('display','block');

  for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagencita/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      }


   html+=`
   <div class="tarjeta" style="" id="tarjeta">
            <div class="card demo-card-header-pic" style="border-radius: 10px;"> 
            <a  class="link " style="z-index: 1000;position: absolute;right: 0;margin: 1em;" id="paquete_4">
            <span class="material-icons-outlined " style="color:gray;display: none;">
            favorite_border</span>  
            </a>  
            <div style="background-image:url('`+urlimagen+`');border-radius: 10px 10px 0px 0px;background-size: cover;" onclick="VisualizarImagen2(\'`+urlimagen+`\')"
            class="card-header align-items-flex-end">
             </div>

          <div class="" style="text-align: center;height: 45px;justify-content: right;display: flex;">
       </div>
        </div>
        </div>

   `;
  }
 }

     $(".listadoimagenescita").html(html);


 // body...
}

function ObtenerImagenescita() {
    var idcita=localStorage.getItem('idcita');
    var datos="idcita="+idcita;
    var pagina = "ObtenerImagenescita.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        success: function(datos){

            var respuesta=datos.respuesta;

           
                 Pintarimagencita2(respuesta);
     
           

            },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                var error;
                    if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                    if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                    console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
        });
}

function Pintarimagencita2(resultado) {

 var html="";
 if (resultado.length>0) {
  for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagencita/`+resultado[i].foto;
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      
      }else{

        urlimagen=localStorage.getItem('logo');
        imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;"/>';
      }


   html+=`
   <div class="tarjeta" style="" id="tarjeta">
            <div class="card demo-card-header-pic" style="border-radius: 10px;"> 
            <a  class="link " style="z-index: 1000;position: absolute;right: 0;margin: 1em;" id="paquete_4">
            <span class="material-icons-outlined " style="color:gray;display: none;">
            favorite_border</span>  
            </a>  
            <div style="background-image:url('`+urlimagen+`');border-radius: 10px 10px 0px 0px;background-size: cover;" onclick="VisualizarImagen2(\'`+urlimagen+`\')"
            class="card-header align-items-flex-end">
             </div>

          <div class="" style="text-align: right;height: 45px;">
    <span onclick="EliminarImagencita(`+resultado[i].idimagencita+`)"  class="material-icons-outlined " style="margin-right: 10px;margin-top: 10px;font-size: 30px;">delete</span>
       </div>
        </div>
        </div>

   `;
  }
 }

     $(".listadoimagenescita").html(html);


 // body...
}
var myPhotoBrowserPopupDark="";
function VisualizarImagen2(foto) {

   myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos: [
    foto,
    ],
     theme: 'dark',
    type: 'popup',
    on:{
     opened:function (argument) {
      $(".popup-close").css('display','none');

    $(".right").html('<div class="iconocerrar2"></div>');
    $(".iconocerrar2").append(`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>`);

       $(".photo-browser-popup").css('z-index',99999);
      $(".iconocerrar2").attr('onclick','CerrarModalfoto()');

     }
     ,
     close:function (argument) {
      $(".iconocerrar2").remove();
     }
    }
    //theme: 'dark',
  });

  $(".link .popup-close .icon-only > i").remove('icon icon-back ');

  myPhotoBrowserPopupDark.open();
  
 
}

function CerrarModalfoto() {

 myPhotoBrowserPopupDark.close();
}

function Pintarimagencita(resultado) {
    var html="";
    if (resultado.length>0) {
        for (var i = 0; i <resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagencita/`+resultado[i].foto;
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
                                margin-right: 1em;" onclick="EliminarImagencita(`+resultado[i].idimagenescita+`);">
                              <span class="material-icons-outlined" style="font-size: 30px;">
                           delete
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

    $(".listadoimagenescita").html(html);
}


function NuevaImagen() {
    GoToPage('nuevaimagencita');
}

function EliminarImagencita(idimagenescita) {
    var datos= 'idimagenescita='+idimagenescita;
        var pagina = urlphp+"eliminarimagencita.php";
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
                        ObtenerImagenescita();


                    }
                });

            });
}

function ObtenerImagenescitaServicioUsuario() {
    var idservicio=localStorage.getItem('idservicio');
    var idusuario=localStorage.getItem('id_user');
    var datos="idservicio="+idservicio+"&iduserseleccionado="+idusuario;
    var pagina = "ObtenerServicioImagenescitaes.php";
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
            $(".galeriacita").css('display','none');

            if (respuesta.length>0) {
                $(".galeriacita").css('display','block');
                 PintarimagencitaListado(respuesta);
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

function PintarimagencitaListado(resultado) {
    
        var html="";
  if (resultado.length>0) {
    for (var i = 0; i < resultado.length; i++) {

    if (resultado[i].foto!='' && resultado[i].foto!='null' && resultado[i].foto!=null) {

        urlimagen=urlphp+`upload/imagencita/`+resultado[i].foto;
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

    
    $(".listadoimagenescita").html(html);

}