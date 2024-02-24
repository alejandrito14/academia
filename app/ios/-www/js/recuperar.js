var telefonousuario="";
function recuperar() {



	var usuario=$("#v_email").val();
  telefonousuario=usuario;
  var number = usuario.replace(/[^\d]/g, '');

    if (number.length == 7) { 
      usuario = number.replace(/(\d{3})(\d{4})/, "$1-$2"); 
    } else if (number.length == 10) { 

      usuario = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"); 

    } 
    if (usuario!='') {
    Elegirsmswhatsap2(usuario);
	   }else{

      var aviso="Por favor ingresa un número de celular";
      AbrirModalAviso(aviso);
     }

}

function EjecutarRecuperacion(usuario,eleccion) {
  dynamicSheet1.close();
  var datos='v_email='+usuario+"&eleccionusuario="+eleccion;
  var pagina = "recuperacion.php";

  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: datos,
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    beforeSend: function() {
        // setting a timeout
        app.preloader.show();
    },
    success: function(datos){
      app.preloader.hide();

      var respuesta=datos.respuesta;

      if (respuesta.idusuario>0) {
        localStorage.setItem('email',respuesta.email);
        localStorage.setItem('usuario',respuesta.usuario);
        localStorage.setItem('celular',respuesta.celular);
        localStorage.setItem('idusuarioinvitado',respuesta.idusuario);
        GoToPage("verificacion");

      }else{
        var aviso="Celular no encontrado";
        AbrirModalAviso(aviso);
      }

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      app.preloader.hide();

      var error;
                  if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                  if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
              }
            });
}



function Elegirsmswhatsap2(usuario) {
 
     var html="";
        html+=`

        <p class="`+estiloparrafo+`" style="margin-top: 60px;">¿Cómo deseas recibir el token de verificación?</p>
     
      `;

    
        var html2="";

var htmlmodal=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
            
            <div class="sheet-modal-inner" style="">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       
                    

                          htmlmodal+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;margin-top:20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                            `+html+`

                            </div>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;margin-left: 2em;margin-right: 2em;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente cambiarfuente2" onclick="EjecutarRecuperacion('`+usuario+`',1)">SMS</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente cambiarfuente2" onclick="EjecutarRecuperacion('`+usuario+`',2)">WhatsApp</button>
                            </div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: htmlmodal,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
      
             $(".cambiarfuente2").css('display','none');
            if (tipoletra!='') {
              
              $(".cambiarfuente").addClass(tipoletra);
              

            }
            
              $(".cambiarfuente2").css('display','block');

          },
          opened: function (sheet) {
            console.log('Sheet opened');
           
          },
        }
      });

       dynamicSheet1.open();

       }
function AbrirModalAviso(aviso) {
   
  var parrafo="<p class='cambiarfuente "+estiloparrafo+"' style='font-size:30px;line-height:1;'>"+aviso+"</p>";
   

  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;
                      

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAviso()">Cerrar</button>
                            </div>

                          
                          </div>
                          `;

                      
                         html+=` </div>

                         


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });


       dynamicSheet1.open();
}

function CargarBoton() {

  $$("#botoncontinuartoken").attr('onclick','VerificarToken()');
}
function VerificarToken1() {
    var token1=$("#t5").val();
    /*var token2=$("#t2").val();
    var token3=$("#t3").val();
    var token4=$("#t4").val();
*/
    var tokeningresado=token1;

  var email=localStorage.getItem('celular');
  var pagina = "verificacion.php";

  var datos='v_email='+email+"&token="+tokeningresado;

  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: datos,
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    beforeSend: function() {
        // setting a timeout
       // app.preloader.show();

    },
    success: function(datos){
      //app.preloader.hide();


      if (datos.respuesta.idusuario>0) {

      $("#botoncontinuartoken").css('display','block');
       

      }else{

        $("#botoncontinuartoken").css('display','none');

     //   alerta('Token no válido','');

      }


    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      app.preloader.hide();

      var error;
                  if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                  if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
              }
            });

}

function VerificarToken() {
  
  var token1=$("#t5").val();
  var tokeningresado=token1;
	var email=localStorage.getItem('celular');
	var pagina = "verificacion.php";

	var datos='v_email='+email+"&token="+tokeningresado;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: datos,
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();


    	var respuesta=datos.respuesta;

    	if (respuesta.idusuario>0) {


    		GoToPage("cambiocontra");


    	}else{

          var aviso="Token no válido";
        AbrirModalAviso(aviso);

    	}


    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});

}

function Reestablecercontra() {
	var contra1=$("#v_contra1").val();
	var contra2=$("#v_contra2").val();

	if (contra1!='' && contra2!='') {
      if (contra1.length>5 && contra2.length>5 && contra1.length<=10 && contra2.length<=10) {

		if (contra1==contra2) {
			var email=localStorage.getItem('celular');

			var pagina = "cambiocontra.php";

			var datos='v_email='+email+"&v_contra="+contra1;

			$.ajax({
				type: 'POST',
				dataType: 'json',
				data: datos,
				url: urlphp+pagina,
				crossDomain: true,
				cache: false,
				beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();


    	var respuesta=datos.respuesta;


    	if (respuesta.idusuario>0) {
        var aviso="La contraseña se reestableció exitosamente";
        var funcionsi="IraHome()";
        var funcionno="";
    		//alerta('La contraseña se reestableció exitosamente','');
        AbrirModalAvisoRess(aviso,funcionsi,funcionno);
        //EliminarVariables();
    		//GoToPage("/");
        localStorage.setItem("id_user", respuesta.idusuario);
        localStorage.setItem("nombre", respuesta.nombre);
        localStorage.removeItem('idusuarioinvitado');
        localStorage.setItem('invitado',0);
        localStorage.setItem("paterno",respuesta.paterno);
        localStorage.setItem("materno", respuesta.materno);
        localStorage.setItem("foto", respuesta.foto);
        localStorage.setItem('pregunta',0);
        localStorage.setItem('habilitarfactura','0');
        localStorage.setItem('idtipousuario',respuesta.tipousuario);

        


    	}else{
        var aviso="Falló al reestablecer contraseña";
        AbrirModalAviso(aviso);
    	

    	}



    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});



		}else{

			var aviso = "No coinciden las contraseñas";

			AbrirModalAviso(aviso);

		}

  }else{
      var aviso = "La contraseña debe contener de 6 a 10 caracteres";

    AbrirModalAviso(aviso);

  }
	}else{
		    		//alerta('No se permiten campos vacíos','');
        var aviso="No se permiten campos vacíos";
        AbrirModalAviso(aviso);
      

	}

}

function IraHome() {
    dynamicSheet1.close();

      var idtipousuario=localStorage.getItem('idtipousuario');
      if (idtipousuario==3) {
          GoToPage('home');
        }
        if (idtipousuario==5) {
          GoToPage('homeespecialista');

        }
        if (idtipousuario==0) {

          GoToPage('homeadmin');
    
        }
}


function Iralogin(){
  dynamicSheet1.close();
  GoToPage('login');

}

function AbrirModalAvisoRess(aviso,funcionsi,funcionno) {
  
  var parrafo="<p class='cambiarfuente "+estiloparrafo+"' style=''>"+aviso+"</p>";
   

  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;
                      

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100" style="margin-right: 1em;margin-left: 1em;">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="`+funcionsi+`">Aceptar</button>
                            </div>

                          
                          </div>
                          `;

                      
                         html+=` </div>

                         


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: false,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });


       dynamicSheet1.open();

}

function ReenvioToken() {
	
	var pagina = "recuperacion.php";

	var usuario=localStorage.getItem('celular');
	var datos='v_email='+usuario;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: datos,
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();

    	var respuesta=datos.respuesta;


    	if (respuesta.idusuario>0) {
    		localStorage.setItem('email',respuesta.email);
        var aviso="Se envió token de verificación";
        AbrirModalAviso(aviso)
    		//alerta('','');

    	}else{


    		alerta('E-mail no encontrado','');

    	}



    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});
}



  var cambiar1=1;
  var cambiar2=1;

      function Contarletrasinput(elemento,classe) {

          var longitud=$("#"+elemento).val().length;
        if (longitud>0) {


          $("."+classe).css('display','block');
          $(".spanvisible").css('display','block');

        }else{

        $("."+classe).css('display','none');
         $(".spanvisible").css('display','none');

        }

      }


function CambiarAtributoinput(elemento) {



        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_clave" value="`+valor+`"  placeholder="Contraseña" id="v_clave" class="place input-with-value" style="width: 80%;" onkeyup="Contarletrasinput('v_clave','ojitoicono');">`;


            $(".cambiarinput").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

           var html=`<input type="password" name="v_clave"  value="`+valor+`" placeholder="Contraseña" id="v_clave" class="place input-with-value" style="width: 80%;" onkeyup="Contarletrasinput('v_clave','ojitoicono');">`;
           

            $(".cambiarinput").html(html); 
            cambiar1=1;
        }

        $("#v_clave").attr('onblur','Cambiar2(this);');
        $$('#v_clave').attr('onfocus',"Cambiar(this)");

        
      }



function CambiarAtributoinput2(elemento) {

        if (cambiar2==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 80%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','limpiar2','ojitoicono2');" class="place input-with-value">`;


            $(".cambiarinput2").html(html);

          cambiar2=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput2").html(''); 

            var html=`<input type="password" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 80%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','limpiar2','ojitoicono2');" class="place input-with-value">`;
           

            $(".cambiarinput2").html(html); 
            cambiar2=1;
        }
        
          $$('#v_contra2').attr('onfocus',"Cambiar(this)");
         $$('#v_contra2').attr('onblur',"Cambiar2(this)");

      }

var cambiarvalor=1;
function CambiarAtributoinput3(elemento) {


        if (cambiarvalor==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=` <input type="text" placeholder="" value="`+valor+`" class="text-align-center " onkeyup="Contarletrasinput('token','ojitoicon');" style="float: left;width: 90%" id="token" placeholder="000000">`;
            $(".cambiainputtoken").html(html);

         	 cambiarvalor=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiainputtoken").html(''); 

            var html=` <input type="password" placeholder="" value="`+valor+`" class="text-align-center " onkeyup="Contarletrasinput('token','ojitoicon');" style="float: left;width: 90%" id="token" placeholder="000000">`;
            $(".cambiainputtoken").html(html); 
            cambiarvalor=1;
        }
        

      }



function CambiarAtributoinput4(elemento) {

        if (cambiarvalor==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" value="`+valor+`" name="v_contra1" placeholder="Contraseña" style="float: left;width: 80%;" id="v_contra1" onkeyup ="Aparecercruz('v_contra1','limpiar','ojitoicono')" class="place input-with-value">`;


            $(".cambiarinput").html(html);

          cambiarvalor=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

            var html=`<input type="password" value="`+valor+`" name="v_contra1" placeholder="Contraseña" style="float: left;width: 80%;" id="v_contra1" onkeyup ="Aparecercruz('v_contra1','limpiar','ojitoicono')" class="place input-with-value">`;
           

            $(".cambiarinput").html(html); 
            cambiarvalor=1;
        }

         $$('#v_contra1').attr('onfocus',"Cambiar(this)");
         $$('#v_contra1').attr('onblur',"Cambiar2(this)");

        

      }


function CambiarAtributoinputpass(elemento) {



        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_contra1" value="`+valor+`"  placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra1','ojitoicono');Aparecercruz('v_contra1','limpiar1','ojitoicono');AparecerBoton();">`;


            $(".cambiarinput").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

           var html=`<input type="password" name="v_contra1"  value="`+valor+`" placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra1','ojitoicono');Aparecercruz('v_contra1','limpiar1','ojitoicono');AparecerBoton();">`;
           

            $(".cambiarinput").html(html); 
            cambiar1=1;
        }
        
         $("#v_contra1").attr('onblur','Cambiar2(this);');
         $$('#v_contra1').attr('onfocus',"Cambiar(this)");


      }

function CambiarAtributoinputpass2(elemento) {



        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_contra2" value="`+valor+`"  placeholder="Contraseña" id="v_contra2" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','spanvisible2','ojitoicono2');AparecerBoton();">`;


            $(".cambiarinput2").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput2").html(''); 

           var html=`<input type="password" name="v_contra2"  value="`+valor+`" placeholder="Contraseña" id="v_contra2" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','spanvisible2','ojitoicono2');AparecerBoton();">`;
           

            $(".cambiarinput2").html(html); 
            cambiar1=1;
        }

          $("#v_contra2").attr('onblur','Cambiar2(this);');
          $$('#v_contra2').attr('onfocus',"Cambiar(this)");

        
      }

function Contarletrasinputpass(elemento,classe) {

          var longitud=$("#"+elemento).val().length;
        if (longitud>0) {


          $("."+classe).css('display','block');
          $(".spanvisible2").css('display','block');

        }else{

        $("."+classe).css('display','none');
         $(".spanvisible2").css('display','none');

        }

      }
function LimpiarElemento(elemento) {
  console.log(elemento);
  $("#"+elemento).val('');
  $("#span1").css('display','none');
  $(".spanvisible").css('display','none');
}
function LimpiarElemento2(elemento) {
  console.log(elemento);
  $("#"+elemento).val('');
  $("#span1").css('display','none');
  $(".limpiar").css('display','none');
}
function LimpiarElemento3(elemento) {
  console.log(elemento);
  $("#"+elemento).val('');
  $("#span2").css('display','none');
  $(".limpiar2").css('display','none');
}
function LimpiarElemento4(elemento) {
  $("#"+elemento).val('');
  $("#span2").css('display','none');
  $(".spanvisible2").css('display','none');
}
function Aparecercruz(elemento,clase,aparecer) {
            var longitud=$("#"+elemento).val().length;

  if (longitud>0) {
    $('.'+clase).css('display','block');
   $("."+aparecer).css('display','block');

  }else{
    
    $('.'+clase).css('display','none');
    $("."+aparecer).css('display','none');

  }
}

function EliminarVariables() {
 /* localStorage.removeItem('id_user');
  localStorage.removeItem('email');
  localStorage.removeItem('celular');
  GoToPage('signin');*/
}

  function AparecerBoton() {
      var valor1=$("#v_contra1").val();
      var valor2=$("#v_contra2").val();


      if (valor1.length>5 && valor2.length>5 && valor1.length<=10 && valor2.length<=10) {
           if (valor1==valor2) {
          $$("#btncambiocontrase").css('display','block');

        }else{

        $$("#btncambiocontrase").css('display','none');

        }
      }else{
      
      $$("#btncambiocontrase").css('display','none');


      }
    }
