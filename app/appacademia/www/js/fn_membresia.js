function ObtenerMembresiaActivas() {

	var id_user=localStorage.getItem('id_user');
	var datos="idusuario="+id_user;
	var pagina = "ObtenerMembresiaActivas.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarModalMembresias(datos.respuesta)

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarNotificacion(respuesta) {
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			idmembresia=respuesta[i].idmembresia;
			console.log(idmembresia);
			  var notificationCallbackOnClose = app.notification.create({
		       // icon: '<i class="icon demo-icon">7</i>',
		        title: 'Membresia',
		        //titleRightText: 'now',
		        subtitle: respuesta[i].titulo,
		        text: respuesta[i].descripcion,
		       // closeOnClick: true,
		        closeButton: true,
		        on: {
		          click: function () {
		          	 notificationCallbackOnClose.close();
		            AbrirPantallaMembresia(idmembresia);

		          },


		        },
		      });

		        notificationCallbackOnClose.open();
		}
	}
}

function AbrirPantallaMembresia(idmembresia) {
	app.dialog.close();
	localStorage.setItem('idmembresia',idmembresia);
	
	GoToPage('membresia');
}

function CargarInformacionMembresia() {
	
	var idmembresia=localStorage.getItem('idmembresia');
	var datos="idmembresia="+idmembresia;
	var pagina = "ObtenerMembresia.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarMembresia(datos.respuesta)

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarMembresia(respuesta) {
	
			imagen=urlimagenes+`membresia/imagenes/`+codigoserv+respuesta.imagen;
			$("#imgmembresia").attr('src',imagen);

			$("#titulo").text(respuesta.titulo);
			$("#descripcion").text(respuesta.descripcion);
      $("#btnpagomembresia").attr('onclick','AdquirirMembresia('+respuesta.idmembresia+')');

}



function PintarModalMembresias(respuesta) {

 
     if (respuesta.length>0) {

  var logo =localStorage.getItem('logo');

  var html=` <div class="" style="height:300px!important;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left">

                <span style="color:black;margin-left:1em;font-size: 14px;
    font-weight: bold;"></span></div>

             

              
                <div class="right">
                 
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="">
              <div class="">
                <div class=" " style="border-radius: 5px;height:250px;">
         
           
      <div
        data-pagination='{"el": ".swiper-pagination"}'
        data-space-between="50"
        class="swiper-container swiper-init demo-swiper" id="cuponerapromo"
      >
        <div class="swiper-pagination"></div>
         <div class="swiper-wrapper">`;
    
    for (var i =0; i <respuesta.length; i++) {


		var urlimagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`membresia/imagenes/`+codigoserv+respuesta[i].imagen;
			}else{

				urlimagen=urlimagendefault;
			}

      html+=`
        <div class="swiper-slide" onclick="">
       <li style="" >

          <div class="item-media" style="" >                                                                                                           
              <input  type="checkbox"  style="display:none;" onchange="" name="cuponesopciones" class="cuponesopciones" id="cupones_" >
              <img  style="border-radius: 10px; width: 75%;" src="`+urlimagen+`"
                  />

          </div>
            <span  class="item-link item-content" onclick="">
              
              <div class="item-inner">
              
                
                <div class="item-text" style="text-align:center;font-size:14px;margin-left: 1em;margin-right: 1em;">`+ respuesta[i].titulo+` </div>`;
               
              html+=`

              </div>

            </span>

            <div class="item-text" style="margin-bottom:.5em;margin-top: 0.5em;">
            <button type="button" style="background: #59c158!important;height: 32px;line-height: 10px;width: 50%;margin: 0 auto;color:white;" onclick="AbrirPantallaMembresia(`+respuesta[i].idmembresia+`)" class="col col-50 button gradient signinbuttn md-elevation-6 botonesredondeado botones">Ver más</button>
            </div>
          
            </li>
                
            `;

             html+=`</div>`;

    }

    html+=` </div>
      </div>`;

         html+=`


        </ul>
      </div>
             </div>
            </div>
          </div>`;
  

  

 app.dialog.create({
              title: '',
              text:'',
              content:html,

              buttons: [
                {
                  text: 'Cerrar',
                },
               
                
              ],

              onClick: function (dialog, index) {

                  if(index === 0){
                      //Button 1 clicked

                      //alert(enlace);
                    // window.open(enlace);
                  }
                 
                
              },
              verticalButtons: false,
            }).open();
      
         var swiper = new Swiper('#cuponerapromo', {

              centeredSlides: true,
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
               
              },
            });

         $(".dialog-inner").css('background','white');
         $(".swiper-pagination").css('cssText', 'bottom: 1px!important;');

       }
   }

function AdquirirMembresia(idmembresia) {
  localStorage.setItem('idmembresia',idmembresia);
	GoToPage('pagomembresia');
}
