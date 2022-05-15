 function AbrirModalFoto() {

    var id_user=localStorage.getItem("id_user");

 	
 	app.dialog.create({
 		  title: 'Foto de perfil',
      text: 'Elige una foto de para tu perfil',
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
                TomarFoto(id_user)
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




  

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {

        var id_user = localStorage.getItem("id_user");
        
        var datos= 'iduser='+id_user+'&imagen='+imageData;

        
        var pagina = urlphp+"fotoperfil2.php";

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

           

             app.preloader.hide()

           localStorage.setItem('foto',data.ruta);

            app.dialog.alert("La foto se ha guardado correctamente",localStorage.getItem("UserName"));

            CargarFoto();
                    
             
            }
        }); 
          
    }


    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });

     // DestinationType:navigator.camera.DestinationType.DATA_URL,sourceType:PictureSourceType
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccess, onError, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });


        //  navigator.camera.getPicture(onSuccess,onError,options);

    }

    // Called if something bad happens.
    //
    function onFail(message) {
      app.dialog.alert("No se cargo imagen");
     // alert('Failed because: ' + message);
    }


 
