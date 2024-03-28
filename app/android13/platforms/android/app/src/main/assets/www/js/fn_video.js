 var path="";
 function captureSuccess(mediaFiles) {
       var i, len;
       // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
             path = mediaFiles[0].fullPath;

             uploadFile();
            // do something interesting with the file
        //}
    }

    // Called if something bad happens.
    //
    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        alert(msg);
        //navigator.notification.alert(msg, null, 'Uh oh!');
    }

    // A button will call this function
    //
    function captureVideo() {
        // Launch device video recording application,
        // allowing user to capture up to 2 video clips
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
    }

    // Upload files to server
    function uploadFile() {
        
       var win = function (r) {
        alert(r.ruta);
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    var fail = function (error) {

        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

    var fileURL = path;
    alert(fileURL);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "video/mp4";
    options.chunkedMode = false;

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, urlphp+"subirvideogrupal.php", win, fail,options);
    
    }


    
    function AbrirModalFotovideogrupal() {

        var id_user=localStorage.getItem("id_user");
       
      
            app.dialog.create({
                title: '',
                text: '',
                buttons: [
                {
                    text: 'Grabar video',
                },
                {
                    text: 'Subir video',
                },
                {
                    text: 'Cancelar',
                    color:'#ff3b30',

                },

                ],

                onClick: function (dialog, index) {
                    if(index === 0){
                //Button 1 clicked
                captureVideo()
              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getVideogrupal(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

       
    }

 function getVideogrupal(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessvideo, onError, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source,
        mediaType: mediaType.VIDEO

         });
        //  navigator.camera.getPicture(onSuccess,onError,options);

    }




    function onPhotoDataSuccessvideo(imageData) {

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

        localStorage.setItem('fotovideogrupal',data.ruta);

        app.dialog.alert("Se subió imagen correctamente",localStorage.getItem("UserName"));
         CargarVideo();

           // CargarFoto();
         //  var idclienteimagengrupal=data.idclienteimagengrupal;

          // Cargardetalle(idclienteimagengrupal);


      }
  }); 

}
