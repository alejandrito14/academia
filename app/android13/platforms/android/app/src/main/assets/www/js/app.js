// Dom7
var $$ = Dom7;

// Theme
var theme = 'ios';
var device1 = Framework7.getDevice();

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  el: '#app',
  theme,
  // store.js,
  store: store,
  // routes.js,
  routes: routes,
   touch: {
    // Enable fast clicks
   // fastClicks: true,
  },

  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },

   // Input settings
  input: { //investigar para que funcionan
    scrollIntoViewOnFocus: device1.cordova && !device1.electron,
    scrollIntoViewCentered: device1.cordova && !device1.electron,
  
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {


      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }

    },
  },


    methods: {
        onBackKeyDown: function() {

            var leftp = app.panel.left && app.panel.left.opened;
            var rightp = app.panel.right && app.panel.right.opened;

            if ( leftp || rightp ) {

                app.panel.close();
                return false;
            }else if ($$('.modal-in').length > 0) {
              
                app.dialog.close();
                app.popup.close();
                return false;
            } else if (app.views.main.router.url == '/home/' || app.views.main.router.url == '/homeadmin/' || app.views.main.router.url == '/homecoach/') {

                    navigator.app.exitApp();
            } else {

                mainView.router.back();
           }
         }
       }
});

 var pictureSource;   // picture source
 var destinationType; 
 var produccion = 1;

var codigoservicio="0";
$(document).ready(function() {

  if (produccion == 0) {
      codigoservicio='106';

    }else{
           // codigoservicioreal='109';

      codigoservicio='109';
    }


    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;


    }

    if( window.isphone ) {
       
    document.addEventListener("deviceready", Cargar, false);

     pictureSource=navigator.camera.PictureSourceType;
     destinationType=navigator.camera.DestinationType;
      mediaType = navigator.camera.MediaType;
      
    } else {


        Cargar();
    }
  
    


 });



  



var lhost = "localhost:8888";
var rhost = "issoftware1.com.mx";
var version='1.0.33';

localStorage.setItem('versionapp',version);
var abrir=0;
var intervalo;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var intervalo2=0;
var intervalo3=0;
var intervalo4=0;
var intervalo5=0;
var intervalo6=0;
var identificadorDeTemporizador=0;
var rutaserver=localStorage.getItem('servidor');
var puertosockect=localStorage.getItem('puertosocket');


    var codigoserv="";
    var urlphp = ""; 
    var urlimagenes = ""; 
    var urlimagendefault="";
    var urlimagenlogo="";
    var globalsockect="";
    var imagenesbancos="";
    var urlimagendefaultservicio=""


function Cargar() {

//  ObtenerServidor(codigoservicio);
  var rutaserver="";
var puertosockect="";
var carpetaapp="";
   
   var datos="clave=issoftware"+"&codservicio="+codigoservicio;
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'https://is-software.net/isadmin/obtenerservidorapp.php',
    crossDomain: true,
    cache: false,
    data:datos,
    async:false,
    success: function(resp){

      if (resp.vigente==1) {
        var servidor=resp.datosservidor.urlapp;
        var puertosocket=resp.datosservidor.puertosocket;

        localStorage.setItem('servidor',servidor);
        localStorage.setItem('puertosocket',puertosocket);

         rutaserver=resp.datosservidor.urlapp;
         puertosockect=resp.datosservidor.puertosocket;
         carpetaapp=resp.datosservidor.carpetaapp;
      }else{
        localStorage.setItem('servidor','http://localhost:8888/');
        localStorage.setItem('puertosocket','3000');
        rutaserver="http://localhost:8888";
        puertosockect="3000";

      }


  if (produccion == 0) {
    codigoserv="106/";
    urlphp = rutaserver+"/is-academia/app/php/"; 
    urlimagenes = rutaserver+"/is-academia/www/catalogos/"; 
    urlimagendefault=rutaserver+"/is-academia/www/images/sinfoto.png";
    urlimagenlogo=rutaserver+"/is-academia/www/images/sinimagenlogo.png";
    globalsockect=rutaserver+":"+puertosockect+"/";
    imagenesbancos=rutaserver+"/is-academia/www/assets/images/";
    urlimagendefaultservicio=rutaserver+"/is-academia/images/sin-servicio.jpg"

}else{
    codigoserv=codigoservicio+"/";
    urlphp = rutaserver+"/IS-ACADEMIA/app/"+carpetaapp+"/php/";
    urlimagenes = rutaserver+"/IS-ACADEMIA/catalogos/"; 
  
    urlimagendefault=rutaserver+"/IS-ACADEMIA/images/sinfoto.png"
    urlimagenlogo=rutaserver+"/IS-ACADEMIA/images/sinimagenlogo.png";
    urlimagendefaultservicio=rutaserver+"/IS-ACADEMIA/images/sin-servicio.jpg"

    imagenesbancos=rutaserver+"/assets/images/";
    globalsockect=rutaserver+":"+puertosockect+"/";
   // var urlimagenvacia="https://issoftware1.com.mx/IS-ACADEMIA/images/sinimagenlogo.png";

}
 


      getConfiguracion();
    localStorage.setItem("SO", "web");

    localStorage.setItem('rutaine',0);
    localStorage.setItem('validacion',0);

    localStorage.setItem('confecha',0);
    localStorage.setItem('condirecionentrega',0);
    localStorage.setItem('idtipodepago',0);
    localStorage.setItem('llevafoto',0);
    localStorage.setItem('rutacomprobante','');
    localStorage.setItem('idopcionespedido',0);
    localStorage.setItem('iddireccion',0);
    localStorage.setItem('factura',0);
    localStorage.setItem('montocliente','');
    localStorage.setItem('asenta','');
    localStorage.setItem('datosbuscar6','');
    localStorage.setItem('datosbuscar3','');
    localStorage.setItem('nuevadireccion',1);
    localStorage.setItem('comentarioimagenes','');
    localStorage.setItem('habilitarsumaenvio',0);
    localStorage.setItem('idfacturacion','');
    localStorage.setItem('codigocupon','');
    localStorage.setItem('idcupon',0);
    localStorage.setItem('costoenvio',0);
    localStorage.setItem('idclientes_envios','');
    localStorage.setItem('observacionpedido','');
    localStorage.setItem('idusuarios_envios','');

    localStorage.setItem('montodescontado','');
    localStorage.setItem('datostarjeta','');
    localStorage.setItem('adelante',1);
    localStorage.setItem('idtutorado','');
    localStorage.setItem('cont',-1);
    localStorage.setItem('valor','');
    localStorage.setItem('avatar','');
        if(localStorage.getItem('iduserrespaldo')!=undefined && localStorage.getItem('iduserrespaldo')!=null)
          {
            var iduserrespaldo=localStorage.getItem('iduserrespaldo');
            localStorage.setItem('id_user',iduserrespaldo);
            localStorage.removeItem('iduserrespaldo');

          }
  
    var uid='000';
    localStorage.setItem("UUID",uid);
    if (device1.ios) {
      localStorage.setItem("SO", "ios");
      var uid= device.uuid;

  
    localStorage.setItem("UUID",uid);
    }

    if (device1.android) {
      localStorage.setItem("SO", "android");

        var uid= device.uuid;
      localStorage.setItem("UUID",uid);
    }

    if (device1.desktop) { 

      localStorage.setItem("SO", "desktop");
    }
   


     
 

    var p1 = new Promise(function(resolve, reject) {
      resolve(getToken());
     
    });

    p1.then(function(value) {
          var tokenfirebase=localStorage.getItem('tokenfirebase');
       
     ObtenerConfiVersion();     
     GuardarTokenBase(0); 

    }, function(reason) {
    console.log(reason); // Error!
  });
  


      

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");

          var servidor='issoftware1.com.mx';
          var puertosocket='3000';

          localStorage.setItem('servidor',servidor);
          localStorage.setItem('puertosocket',puertosocket);

          rutaserver='https://issoftware1.com.mx';
          puertosockect='3000';
          carpetaapp='appwoolis';


          codigoserv=codigoservicio+"/";
          urlphp = rutaserver+"/IS-ACADEMIA/app/"+carpetaapp+"/php/";
          urlimagenes = rutaserver+"/IS-ACADEMIA/catalogos/"; 
        
          urlimagendefault=rutaserver+"/IS-ACADEMIA/images/sinfoto.png"
          urlimagenlogo=rutaserver+"/IS-ACADEMIA/images/sinimagenlogo.png";
          urlimagendefaultservicio=rutaserver+"/IS-ACADEMIA/images/sin-servicio.jpg"

          imagenesbancos=rutaserver+"/IS-ACADEMIA/assets/images/";
          globalsockect=rutaserver+":"+puertosockect+"/";


           getConfiguracion();
          localStorage.setItem("SO", "web");

          localStorage.setItem('rutaine',0);
          localStorage.setItem('validacion',0);

          localStorage.setItem('confecha',0);
          localStorage.setItem('condirecionentrega',0);
          localStorage.setItem('idtipodepago',0);
          localStorage.setItem('llevafoto',0);
          localStorage.setItem('rutacomprobante','');
          localStorage.setItem('idopcionespedido',0);
          localStorage.setItem('iddireccion',0);
          localStorage.setItem('factura',0);
          localStorage.setItem('montocliente','');
          localStorage.setItem('asenta','');
          localStorage.setItem('datosbuscar6','');
          localStorage.setItem('datosbuscar3','');
          localStorage.setItem('nuevadireccion',1);
          localStorage.setItem('comentarioimagenes','');
          localStorage.setItem('habilitarsumaenvio',0);
          localStorage.setItem('idfacturacion','');
          localStorage.setItem('codigocupon','');
          localStorage.setItem('idcupon',0);
          localStorage.setItem('costoenvio',0);
          localStorage.setItem('idclientes_envios','');
          localStorage.setItem('observacionpedido','');
          localStorage.setItem('idusuarios_envios','');

          localStorage.setItem('montodescontado','');
          localStorage.setItem('datostarjeta','');
          localStorage.setItem('adelante',1);
          localStorage.setItem('idtutorado','');
          localStorage.setItem('cont',-1);
          localStorage.setItem('valor','');
          localStorage.setItem('avatar','');
        if(localStorage.getItem('iduserrespaldo')!=undefined && localStorage.getItem('iduserrespaldo')!=null)
          {
            var iduserrespaldo=localStorage.getItem('iduserrespaldo');
            localStorage.setItem('id_user',iduserrespaldo);
            localStorage.removeItem('iduserrespaldo');

          }

         var uid='000';
         localStorage.setItem("UUID",uid);
        if (device1.ios) {
          localStorage.setItem("SO", "ios");
          var uid= device.uuid;

      
        localStorage.setItem("UUID",uid);
        }
    if (device1.android) {
          localStorage.setItem("SO", "android");

            var uid= device.uuid;
          localStorage.setItem("UUID",uid);
        }

        if (device1.desktop) { 

          localStorage.setItem("SO", "desktop");
        }
        
         var p1 = new Promise(function(resolve, reject) {
            resolve(getToken());
           
          });

          p1.then(function(value) {
                var tokenfirebase=localStorage.getItem('tokenfirebase');
             
           ObtenerConfiVersion();     
           GuardarTokenBase(0); 

          }, function(reason) {
          console.log(reason); // Error!
        });
  


      }

    });
  
   /*  ObtenerConfiEmpresa();

    */

}


$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized for all pages
  
          $(".versionapp").text(version);

//ObtenerConfiVersion();

});

$$(document).on('page:afterin', function (e) {
  /* scroll from top and add class */
  $$('.view-main .page-current .page-content').on('scroll', function () {
    if ($$(this).scrollTop() > '10') {
      $$('.view-main .navbar-current').addClass('active');
    } else {
      $$('.view-main .navbar-current').removeClass('active');
    }
  });

  /* static footer*/
  if ($$('.page.page-current .footer').length > 0) {
    $$('.view.view-main .page-content').addClass('has-footer');
  } else {
    $$('.view.view-main .page-content').removeClass('has-footer');
  }
  $$('.centerbutton .nav-link').on('click', function () {
    $$(this).toggleClass('active')
  })

});

$$(document).on('page:init', '.page[data-name="splash"]', function (e) {

  var imagensplashprincipal=localStorage.getItem('imagensplashprincipal');

  if (imagensplashprincipal!='') {
        imagen1=urlimagenes+`configuracion/imagenes/`+codigoserv+imagensplashprincipal;


    $(".dark-bg").css('background-image','url('+imagen1+')');
  }else{

        $(".dark-bg").css('background-image','url("../img/iss.png")');

  }

  setTimeout(function () {
    $$('.loader-wrap').hide();

  }, 100);



  setTimeout(function () {

      var id_user=localStorage.getItem('id_user');
      var session=localStorage.getItem('session');
      var idtipousuario=localStorage.getItem('idtipousuario');
     
if (session==1) {
     
  

        getVistoAnuncio().then(r => {
       
          
         if(r.visto == 0 && r.configuracion.mostraranuncios==1)
          {  
            app.views.main.router.navigate('/landing/');

            }else{
           Cargarperfilfoto();
             //resolve({ url: './pages/inicio2.html', })
                if (id_user>0 && session==1) {

                      var idcliente=localStorage.getItem('id_user');
                       GuardarTokenBase(idcliente);

                    if (idtipousuario==0) {
                        app.views.main.router.navigate('/homeadmin/');

                    }
                    if (idtipousuario==3) {
                        app.views.main.router.navigate('/home/');

                    }
                    if (idtipousuario==5) {
                        app.views.main.router.navigate('/homecoach/');

                    }
                  }

             
            }
        });

    

  }else{
   
      app.views.main.router.navigate('/landing/');

  }

  }, 1000);
});

$$(document).on('page:init', '.page[data-name="thankyouorder"]', function (e) {
  setTimeout(function () {
    app.views.main.router.navigate('/home/');
  }, 3000);
});

$$(document).on('page:init', '.page[data-name="landing"]', function (e) {

  var promesa=getConfiguracion();
    promesa.then(r => {
      var omitiralfinal=r.respuesta.activaromitirfinal;

      if (omitiralfinal==1) {
            $(".skipbtn").attr('onclick','Omitir()');
        //$(".skipbtn").css('display','none');
      }else{

            $(".skipbtn").text('Omitir');
            $(".skipbtn").attr('onclick','Saltar()');

      }

        ObtenerAnuncios(omitiralfinal);
    });

   

});

$$(document).on('page:init', '.page[data-name="verify"]', function (e) {
  document.getElementById('timer').innerHTML = '03' + ':' + '00';
  startTimer();

  function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
      return
    }

    document.getElementById('timer').innerHTML =
      m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
  }

});



/* pwa app install */
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  console.log('beforeinstallprompt Event fired');
  e.preventDefault();
  deferredPrompt = e;
  return false;
});



$$(document).on('page:init', '.page[data-name="home"]', function (e) {

 getValidacionUsuario().then(r => {

        var existe=r.existe;


  if (existe==0) {

      Cargarperfilfoto();
      
      CargarDatos();
      ObtenerMembresiaActivas();//obtiene la membresia del usuario
  
    
  var pregunta=localStorage.getItem('pregunta');
 

 
    if (pregunta==0) {

     app.dialog.confirm('','¿Desea mantener la sesión activa?', function () {

        localStorage.setItem('session',1);

        localStorage.setItem('pregunta',1);

         // app.dialog.alert('','Se guardó la sesión'); 

        },

         function () {
                 
                        localStorage.setItem('pregunta',1);

                  }
            );


      

           }

      var $ptrContent = $$('.ptr-content');
        // Add 'refresh' listener on it
          $ptrContent.on('ptr:refresh', function (e) {
          // Emulate 2s loading
          setTimeout(function () {
             CargarDatos();
            // When loading done, we need to reset it
            app.ptr.done(); // or e.detail();
          }, 2000);
        });



         }else{

          GoToPage('login');

         }


       });
    
    
/*
    var promesa=getConfiguracion();
    promesa.then(r => {
      var omitiralfinal=r.respuesta.activaromitirfinal;

      if (omitiralfinal==1) {
            $(".skipbtn").attr('onclick','Omitir()');

      }else{

            $(".skipbtn").text('Omitir');
            $(".skipbtn").attr('onclick','Saltar()');

      }

        ObtenerAnuncios(omitiralfinal);
    });*/

       
  });




$$(document).on('page:init', '.page[data-name="homeadmin"]', function (e) {
 //$$(".iniciotab").attr('onclick','CargarInicio()');

  Cargarperfilfoto();
  CargarFoto();
  CargarDatosAdmin();
  localStorage.setItem('valorlistado',0);
  localStorage.setItem('buscadorvalor','');
  localStorage.setItem('v_categoriasvalor',0);
  localStorage.setItem('v_coachvalor',0);
    localStorage.setItem('v_mes',0);
      localStorage.setItem('v_anio',0);
  var pregunta=localStorage.getItem('pregunta');

    if (pregunta==0) {

     app.dialog.confirm('','¿Desea mantener la sesión activa?', function () {

        localStorage.setItem('session',1);

        localStorage.setItem('pregunta',1);

         // app.dialog.alert('','Se guardó la sesión'); 

        },

         function () {
                 
                        localStorage.setItem('pregunta',1);

                  }
            );


      

    }


    var $ptrContent = $$('.ptr-content');
// Add 'refresh' listener on it
$ptrContent.on('ptr:refresh', function (e) {
  // Emulate 2s loading
  setTimeout(function () {  
    var swiper = app.swiper.get('.cardpublicidad');
        swiper.destroy();
     CargarDatosAdmin();
    $(".seleccionador" ).each(function(index) {
        $(this).css('display','block')
    });

    // When loading done, we need to reset it
    app.ptr.done(); // or e.detail();
  }, 2000);
});

})

$$(document).on('page:init', '.page[data-name="homecoach"]', function (e) {
  Cargarperfilfoto();
  CargarFoto();
  //$$(".iniciotab").attr('onclick','CargarInicio()');
  localStorage.setItem('categoriavalor',0);
  localStorage.setItem('buscadorvalor','');
  CargarDatosCoach();
  var pregunta=localStorage.getItem('pregunta');

    if (pregunta==0) {

     app.dialog.confirm('','¿Desea mantener la sesión activa?', function () {

        localStorage.setItem('session',1);

        localStorage.setItem('pregunta',1);

         // app.dialog.alert('','Se guardó la sesión'); 

        },

         function () {
                 
                        localStorage.setItem('pregunta',1);

                  }
            );


    }


    var $ptrContent = $$('.ptr-content');
// Add 'refresh' listener on it
$ptrContent.on('ptr:refresh', function (e) {
  // Emulate 2s loading
  setTimeout(function () {
     CargarDatosCoach();
    // When loading done, we need to reset it
    app.ptr.done(); // or e.detail();
  }, 2000);
});

})




$$(document).on('page:init', '.page[data-name="profile"]', function (e) {
  /* swiper carousel highlights */
  var swiper1 = new Swiper(".summayswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

 
 $(".versionapp").text(version);
  regresohome();
  var nombreusuario= localStorage.getItem('alias');
  $$(".nombreusuario").text(nombreusuario);
var tipoUsuario=localStorage.getItem('tipoUsuario');
  $$(".tipousuario").text(tipoUsuario);

 var idtipousuario=localStorage.getItem('idtipousuario');

                if (idtipousuario==0) {
                  classtipo='tipoadmin';
                    }
                    if (idtipousuario==3) {
                    classtipo='tipoalumno';
                    }
                    if (idtipousuario==5) {
                      classtipo='tipocoach';
                    }
             
  $$(".tipousuario").addClass(classtipo);
 ObtenerIdUsuarioPrincipal().then(function (result) {

  Cargarperfilfoto();
  CargarFoto();
  ObtenerMembresiaActivaUsuario();
  $$('#btncerrarsesion').attr('onclick','salir_app()')
  $$("#datosacceso").attr('onclick','Datosacceso()');
  $$(".badgefoto").attr('onclick','AbrirModalFoto()');
  $$('#btncambiaralias').css('display','none');
  $$('#btncambiaralias').attr('onclick','AbrirModalAlias()')
  $$("#btnmembresia").attr('onclick','GoToPage("membresiaactiva")');
  $$("#btneliminarcuenta").attr('onclick','EliminarCuenta()');

  VerificarAsociacion();
  });


  var promesa2=getConfiguracion();
    promesa2.then(r => {
    
        var btnayuda=r.respuesta.botonayuda;
       
        if (btnayuda==1) {

            $(".btnayuda").css('display','block');
            $$(".btnayuda").attr('onclick','AbrirModalAyuda()');

          }
    });
      


})

$$(document).on('page:afterin', '.page[data-name="blogs"]', function (e) {
  /* swiper carousel projects */
  var swiper12 = new Swiper(".tagsswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

});



$$(document).on('page:init', '.page[data-name="register"]', function (e) {
  /* swiper carousel projects */
  $$('#btnvalidarcelular').attr('onclick','ValidarCelular()')
 phoneFormatter('telefono');
$$(".leidoacepto").attr('onclick','SeleccionarCheckLeido()');
$$('#telefono').attr('onfocus',"Cambiar(this);");
$$('#telefono').attr('onblur',"Cambiar2(this);");
  $$('.regreso').attr('onclick',"GoToPage('login')");

});

$$(document).on('page:init', '.page[data-name="token"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
 $$("#t1").focus();
 $$('#t1').attr('onkeyup',"Siguiente('t1','t2')");
 $$('#t2').attr('onkeyup',"Siguiente('t2','t3')");
 $$('#t3').attr('onkeyup',"Siguiente('t3','t4')");
 $$('#t4').attr('onkeyup',"Validarcaja('t4');ValidarToken();");
 $$("#reenviotoken").attr('onclick',"ReenvioTokenCel()");
 $("#btncancelar1").attr("onclick","EliminarVariables()");


});


$$(document).on('page:init', '.page[data-name="registrofoto"]', function (e) {
  /* swiper carousel projects */
  $$('#btncontinuarregistro').attr('onclick','IrRegistro()')
  $$(".badgefoto").attr('onclick','AbrirModalFoto()');
  $$('#btnregistrardeportenivel').attr('onclick','AbrirModalDeporte()')
  ObtenerdatosRegistro();
  CargarFotodefault();

  $$('#v_alias').attr('onfocus',"Cambiar(this)");
  $$('#v_alias').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");
  $$('.regreso').attr('onclick',"RegresarInicio()");
  $$('#v_alias').attr('onkeyup','ValidarAlias()');

});

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  /* swiper carousel projects */
  $$('#btncontinuar').attr('onclick','Registrar()')
   localStorage.setItem('vcorreoregistro','');
   localStorage.setItem('vcontra1registro','');
   localStorage.setItem('vcontra2registro','');

   localStorage.setItem('objeto','');

    var fecha=new Date();
    var dia=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate();
    var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);
    var anio=fecha.getFullYear();
    var fechaactualdata=anio+'-'+ mes+'-'+dia;

    $("#v_fecha").val(fechaactualdata);
  
    ObtenerdatosRegistro();
    ConsultarDepende();

  
$$('#v_nombre').attr('onfocus',"Cambiar(this)");
$$('#v_nombre').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_paterno').attr('onfocus',"Cambiar(this)");
$$('#v_paterno').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_materno').attr('onfocus',"Cambiar(this)");
$$('#v_materno').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_fecha').attr('onfocus',"Cambiar(this)");
$$('#v_fecha').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");


$$('#v_sexo').attr('onfocus',"Cambiar(this)");
$$('#v_sexo').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");




});


$$(document).on('page:init', '.page[data-name="registrodatosacceso"]', function (e) {
  /* swiper carousel projects */
  $$('#btncontinuaracceso').attr('onclick','RegistrarAcceso()');
  $$('#btnregresaracceso').attr('onclick','RegresarAcceso()');
  $$('#btnmembresia').attr('onclick','SolicitarMembresia()');
  $$('#btnregistraralumnos').attr('onclick','AlumnosSecundarios()');

  /*ObtenerTiposUsuarios();

  $$('#v_tipousuario').val(3);*/
  $$('#v_tipousuario').attr('onchange','TipoUsuario()');
  $$("#v_tipousuario").val(localStorage.getItem('idtipousuario'));

  CargardatosIngresados();
  TipoUsuario();
  leerLocalStorage();
  $$('#v_contra2').attr('onkeyup','coincidePassword("v_contra1","v_contra2")');
  localStorage.setItem('objeto','');
  ObtenerdatosAcceso();
  ConsultarDepende();

 $$('#v_contra1').attr('onkeyup',"Aparecercruz('v_contra1','limpiar','ojitoicono');");
 $$('#span1').attr('onclick',"CambiarAtributoinput4('v_contra1')"); 
 $$('#v_contra2').attr('onkeyup',"CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','limpiar2','ojitoicono2');");
 $$('#span2').attr('onclick',"CambiarAtributoinput2('v_contra2')");
 $(".limpiar").attr('onclick',"LimpiarElemento2('v_contra1')");
 $(".limpiar2").attr('onclick',"LimpiarElemento3('v_contra2')");

 $("#v_correo").attr('onblur','CopiarEnUsuario();Cambiar2(this);QuitarEspacios(this);');
 $$('#v_correo').attr('onfocus',"Cambiar(this)");

 $("#v_usuario").attr('onblur','Validarvacio();Cambiar2(this);');
 $$('#v_usuario').attr('onfocus',"Cambiar(this)");
 $("#v_usuario").attr('onkeyup','QuitarEspacios(this)');
  $$('#v_contra1').attr('onfocus',"Cambiar(this)");
  $$('#v_contra1').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

  $$('#v_contra2').attr('onfocus',"Cambiar(this)");
  $$('#v_contra2').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");
$("#v_tipousuario").attr('onblur','Cambiar2(this);');
 $$('#v_tipousuario').attr('onfocus',"Cambiar(this)");




});

$$(document).on('page:init', '.page[data-name="datospersonales"]', function (e) {

Cargardatospersonales();
//$(".btnguardardatos").attr('onclick','Guardardatospersonales()');

});

$$(document).on('page:init', '.page[data-name="datosacceso"]', function (e) {

  ObtenerTiposUsuarios();
  CargardatosIngresados();
  TipoUsuario();
  ObtenerdatosAcceso2();
 $$('#v_contra1').attr('onkeyup',"Contarletrasinput('v_contra1','ojitoicono')");
 $$('#span1').attr('onclick',"CambiarAtributoinput('v_contra1')"); 
 $$('#v_contra2').attr('onkeyup',"CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra2','ojitoicono2');");
 
 $$('#span2').attr('onclick',"CambiarAtributoinput2('v_contra2')");
 $$("#btnguardar").attr('onclick','GuardarDatosacceso()');

});

$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $$('#btnlogin').attr('onclick','validar_login()');
  localStorage.setItem("nombre","");
localStorage.setItem("paterno","");
localStorage.setItem("materno","");
localStorage.setItem("fechanacimiento","");
localStorage.setItem('genero',"");
$$('#v_clave').attr('onkeyup',"Contarletrasinput('v_clave','ojitoicono')");


$$('#v_usuario').attr('onfocus',"Cambiar(this)");
$$('#v_usuario').attr('onblur',"Cambiar2(this);QuitarEspacios(this)");

$$('#v_clave').attr('onfocus',"Cambiar(this)");
$$('#v_clave').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");
 $(".versionapp").text(version);

/*$("#v_usuario" ).keypress(function() {
  if ($(this).val().length>0) {
 
  }
});*/
  $$('#span1').attr('onclick',"CambiarAtributoinput('v_clave')"); 
$(".spanvisible").attr('onclick',"LimpiarElemento('v_clave')");

      var id_user=localStorage.getItem('id_user');
      var session=localStorage.getItem('session');
      var idtipousuario=localStorage.getItem('idtipousuario');

  $(".btnaccion").attr('onclick','Accion(this)');

        if (id_user>0 && session==1) {

                      var idcliente=localStorage.getItem('id_user');
                       GuardarTokenBase(idcliente);

                    if (idtipousuario==0) {
                        app.views.main.router.navigate('/homeadmin/');

                    }
                    if (idtipousuario==3) {
                        app.views.main.router.navigate('/home/');

                    }
                    if (idtipousuario==5) {
                        app.views.main.router.navigate('/homecoach/');

                    }
                  }

});


$$(document).on('page:init', '.page[data-name="registrotutorados"]', function (e) {
localStorage.setItem('registro',1);
  ObtenerTutorados();
});

$$(document).on('page:init', '.page[data-name="registroasociados"]', function (e) {
localStorage.setItem('registro',2);

  ObtenerAsociados();
});

$$(document).on('page:init', '.page[data-name="nuevotutorado"]', function (e) {
   var id=-1;


   $("#v_idtu").val(id);
ObtenerParentesco();
/*      $("#tituloventana").html('Nuevo <span style="color: #0abe68;">tutorado</span>');
*/

    $("#inputtutor").attr('checked',true);
    $("#inputsincelular").attr('checked',true);
    $("#lisincelular").css('display','none');
     $(".licelulartu").css('display','none');

      var fecha=new Date();
    var dia=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate();
    var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);
    var anio=fecha.getFullYear();
    var fechaactualdata=anio+'-'+ mes+'-'+dia;

    $("#v_fechatu").val(fechaactualdata);
  

    if (localStorage.getItem('idtutorado')!='' && localStorage.getItem('idtutorado')!=undefined) {
    
      var id=localStorage.getItem('idtutorado');
      $("#v_idtu").val(id);
      Habilitar();
      Obtenerdatostutorado(id);
      $("#tituloventana").html('Editar <span style="color: #0abe68;">tutorado</span>');
      $("#btncancelartuto").css('display','none');
      $("#mensajevalidacion").html('');
    }else{

    
     $(".lifechanacimientotu").css('display','none');
     $(".lisexotu").css('display','none');
     $(".liparentescotu").css('display','none');
     $(".mostrar").css('display','none');
    }
         
  $("#inputtutor").attr('onchange','SoyTutor()');
  $("#inputsincelular").attr('onchange','SinCelular()');
  
          var v=$("#v_idtu").val();

          if (v=='' || v==-1) {
            
           $$('#btnguadartuto').attr('onclick','GuardarTutoradoForm(-1)');

          }else{
          $$('#btnguadartuto').attr('onclick','GuardarTutoradoForm('+v+')');

          }
phoneFormatter('v_celulartu');

/*$("#inputsincelular").attr('onchange','SinCelular()');
*/

$("#v_paternotu").attr('onblur','QuitarEspacios(this)');
$("#v_maternotu").attr('onblur','QuitarEspacios(this)');

  $("#inputpregunta").attr('onchange','ActivarBusqueda()');


  $("#btnvalidartuto").attr('onclick','ValidarNombreAlumno()');
  $("#btncancelartuto").attr('onclick','DeshacerAccion()');

  var registro=localStorage.getItem('registro');
      if (registro==1) {

        $(".btnregreso").attr('href','/registrotutorados/');
       // GoToPage('registrotutorados');
      }else{
        $(".btnregreso").attr('href','/registroasociados/');

        //GoToPage('registroasociados');
      }


});

$$(document).on('page:init', '.page[data-name="nuevoasociado"]', function (e) {
   var id=-1;
   $("#v_idtu").val(id);
  ObtenerParentesco(0);
  OcultarCampos();

    var fecha=new Date();
    var dia=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate();
    var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);
    var anio=fecha.getFullYear();
    var fechaactualdata=anio+'-'+ mes+'-'+dia;

    $("#v_fechatu").val(fechaactualdata);

    if (localStorage.getItem('idtutorado')!='' && localStorage.getItem('idtutorado')!=undefined) {
    
      var id=localStorage.getItem('idtutorado');
      $("#v_idtu").val(id);

      Obtenerdatostutorado(id);
       MostrarCampos();
       $("#mensajevalidacion").html('');
       $("#btnvalidartuto").css('display','none');
       $("#btncancelaraso").css('display','none');
       $("#tituloventana").html('Editar <span style="color: #0abe68;">asociado</span>');
    }
         
  $("#inputtutor").attr('onchange','SoyTutor()');
  $("#inputsincelular").attr('onchange','SinCelular()');

  $("#inputcelular").attr('onchange','ElegirTipoBusqueda1()');
  $("#inputcodigo").attr('onchange','ElegirTipoBusqueda2()');
  $("#btnvalidartuto").attr('onclick','ValidarCelCodigo()');
          var v=$("#v_idtu").val();

          if (v=='' || v==-1) {
            
           $$('#btnguadartuto').attr('onclick','GuardarTutoradoForm(-1)');

          }else{
          $$('#btnguadartuto').attr('onclick','GuardarTutoradoForm('+v+')');

          }
phoneFormatter('v_celulartu');

$("#inputsincelular").attr('onchange','SinCelular()');


$("#v_paternotu").attr('onblur','QuitarEspacios(this)');
$("#v_maternotu").attr('onblur','QuitarEspacios(this)');

  $("#inputpregunta").attr('onchange','ActivarBusqueda()');


  $("#btncancelaraso").attr('onclick','OcultarCampos()');

});



$$(document).on('page:init', '.page[data-name="forgotpassword"]', function (e) {

    $$('#recuperarcontrase').attr('onclick','recuperar()');

    phoneFormatter('v_email');
 $("#v_email").attr('onblur','Cambiar2(this);');
 $$('#v_email').attr('onfocus',"Cambiar(this)");

});

$$(document).on('page:init', '.page[data-name="verificacion"]', function (e) {

 $$("#t1").focus();
 $$('#t1').attr('onkeyup',"Siguiente('t1','t2')");
 $$('#t2').attr('onkeyup',"Siguiente('t2','t3')");
 $$('#t3').attr('onkeyup',"Siguiente('t3','t4')");
 $$('#t4').attr('onkeyup',"Validarcaja('t4');VerificarToken1();CargarBoton();");
 $$("#reenviotoken").attr('onclick',"ReenvioToken()");
 $("#btncancelar1").attr("onclick","EliminarVariables()");

});
$$(document).on('page:init', '.page[data-name="cambiocontra"]', function (e) {

 $$('#v_contra1').attr('onkeyup',"CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra1','spanvisible','ojitoicono');AparecerBoton();");
 $$('#span1').attr('onclick',"CambiarAtributoinputpass('v_contra1')"); 
 $$('#v_contra2').attr('onkeyup',"CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','spanvisible2','ojitoicono2');AparecerBoton();");
 $$('#span2').attr('onclick',"CambiarAtributoinputpass2('v_contra2')");
 $$('#btncambiocontrase').attr('onclick','Reestablecercontra()');
 $(".spanvisible").attr('onclick',"LimpiarElemento('v_contra1')");
 $(".spanvisible2").attr('onclick',"LimpiarElemento4('v_contra2')");
 $("#btncancelar").attr("onclick","EliminarVariables()");
 $$("#btncambiocontrase").css('display','none');

 $("#v_contra1").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
 $$('#v_contra1').attr('onfocus',"Cambiar(this);");

 $("#v_contra2").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
 $$('#v_contra2').attr('onfocus',"Cambiar(this)");

 AbrirInfo();

   
   


});


$$(document).on('page:init', '.page[data-name="chat"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
regresohome();
 $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".lista")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".lista")');
 ObtenerIdUsuarioPrincipal().then(function (result) {

  listadochats();

  });
});
$$(document).on('page:init', '.page[data-name="chattutorado"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
 $(".regreso").attr('onclick','RegresaraHome()');


 $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".lista")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".lista")');

  listadochatstutorado();
});


$$(document).on('page:init', '.page[data-name="chatservicio"]', function (e) {
 
   if (localStorage.getItem('idtipousuario')==0) {
     $(".regreso").attr('href','/detalleservicioadmin/');
   // ObtenerParticipantesAlumnosServicio();
   }

  if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');
    //ObtenerParticipantesAlumnosServicio();

   }
   if (localStorage.getItem('idtipousuario')==5){
      $(".regreso").attr('href','/detalleserviciocoach/');
   //ObtenerParticipantesAlumnosServicio();
    }


  $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".lista")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".lista")');

  listadochatservicio();
  $$(".btnelegirparticipantes").attr('onclick','ElegirParticipantesChat()');
});

$$(document).on('page:init', '.page[data-name="notificaciones"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
regresohome();
 ObtenerIdUsuarioPrincipal().then(function (result) {

    ObtenerListadoNotificaciones();

  });
});

$$(document).on('page:init', '.page[data-name="pagos"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
 regresohome();
  localStorage.setItem('idtipodepago',0);

 ObtenerIdUsuarioPrincipal().then(function (result) {
    
  //ObtenerTotalPagos();
  //ProximopagoaVencer();

  $$('#btnlistadopagos').attr('onclick','VerListadoPago()')
  $$('#btnlistadopagados').attr('onclick','VerListadoPagados()')
  ObtenerMonedero();

  });

  $$("#btnvermonedero").attr('onclick','VerMovimientosMonedero()');


myStopFunction(identificadorDeTemporizador);

});

$$(document).on('page:init', '.page[data-name="listadopagos"]', function (e) {
  $(".regreso").attr("onclick","GoToPage('pagos')");

  ObtenerTodosPagos();
  ObtenerPagosMembresia();
  //$(".seleccionar" ).each(function( index ) {
       /*$(this).attr('checked',true);   */ 
  SeleccionarTodos();

  /*  $(".seleccionar").each(function( index ) {

       var id=$(this).attr('id');
       var explode=id.split('_');
        
        if ($("#val_"+explode[1]).val()>0) {

          $("#check_"+explode[1]).attr('checked',true);
        }

      });*/ 
 // });
  localStorage.setItem('idtipodepago',0);

  $("#checktodos").attr('checked',true);
  $("#btnpagar").prop('disabled',false);
  HabilitarBotonPago();
  $(".btnpagar").attr('onclick','ResumenPago()');
  localStorage.setItem('monedero',0);
  localStorage.setItem('cupon','');
  localStorage.setItem('descuentocupon',0);
});

$$(document).on('page:init', '.page[data-name="listadopagospagados"]', function (e) {
  $(".regreso").attr('href','/pagos/');
ObtenerPagosPagados();
 $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');

});




$$(document).on('page:init', '.page[data-name="datosemergencia"]', function (e) {

CargarCompanias();
$$("#btnguardardatosemergencia").attr('onclick','GuardarDatosEmergencia()');

Cargardatosemergencia();
phoneFormatter('v_numero1');
phoneFormatter('v_numero2');



});

$$(document).on('page:init', '.page[data-name="datosdesalud"]', function (e) {

$$("#btnguardardatosalud").attr('onclick','GuardarDatosSalud()');

Cargardatossalud();



});


$$(document).on('page:init', '.page[data-name="datosdireccion"]', function (e) {

$$("#btnnuevadireccion").attr('onclick','AbrirFormDireccion()');

$$("#btnubicacion").attr('onclick','IniciarSeguimientoGeo()');
ObtenerDirecciones2();

});


$$(document).on('page:init', '.page[data-name="nuevadireccion"]', function (e) {

$$("#btnguardardireccion").attr('onclick','Guardardireccion()');
$$("#v_codigopostal").attr('onkeyup','Buscarcodigo()');
$$("#v_pais").attr('onchange','ObtenerEstado(0,$(this).val())');
$$("#v_estado").attr('onchange','ObtenerMunicipios(0,$(this).val())');
$$("#v_colonia").attr('onclick','ColocarColonia()');
$$("#btnborrarcodigo").attr('onclick','BorarCodigo()');
$$(".btngeolocalizar").attr('onclick','IniciarSeguimientoGeo()');
  ObtenerPais(0);
        $("#tituloform").text('Nueva dirección');

  var variable=localStorage.getItem('nuevadireccion');

  //alert('nueva direccion'+variable);
    var idusuarios_envios=localStorage.getItem('idusuarios_envios');

    if (localStorage.getItem('idusuarios_envios')!==undefined && localStorage.getItem('idusuarios_envios')!='') {

      Editardireccion();
      $("#tituloform").text('Editar dirección');

    }

  if (variable!=1) {

    if(localStorage.getItem('datosbuscar2')!==undefined && localStorage.getItem('datosbuscar2')!=''){

      

          var datos=localStorage.getItem('datosbuscar2');
          var json=JSON.parse(datos);

          var id=json.id;
          var codigopostal=json.codigopostal;
          var idpais=json.idpais;
          var idestado=json.idestado;
          var idmunicipio=json.idmunicipio;
          var tipoasentamiento=json.tipoasentamiento;
          ObtenerPais(idpais);
          $("#v_codigopostal").val(codigopostal);

            var nombre=json.nombre;
            var paterno=json.paterno
            var materno=json.materno;
            var sexo=json.sexo;
            var celular=json.celular;
            var telefono=json.telefono;
            var calle=json.calle;
            var no_exterior=json.no_exterior;
            var no_interior=json.no_interior;
            var v_calle1=json.v_calle1;
            var v_calle2=json.v_calle2;
            var v_referencia=json.v_referencia;
            var v_email=json.v_email;
            var v_contra1=json.v_contra1;
            var v_contra2=json.v_contra2;
            var v_edad=json.v_edad;

    
            Buscarcodigo2(tipoasentamiento);

          $("#v_id").val(id);
          $("#v_calle").val(calle);
          $("#no_exterior").val(no_exterior);
          $("#no_interior").val(no_interior);
          $("#v_calle1").val(v_calle1);
          $("#v_calle2").val(v_calle2);
          $("#v_referencia").val(v_referencia);

      
      }

        if(localStorage.getItem('asenta')!==undefined && localStorage.getItem('asenta')!=''){

  var asenta=localStorage.getItem('asenta');

          $("#v_colonia").val(asenta);

        }
    }



});

$$(document).on('page:init', '.page[data-name="colonias"]', function (e) {
$$("#buscador4").attr('onkeyup','Buscarcolonia()');
  localStorage.setItem('nuevadireccion',0);

  var datos=localStorage.getItem('datosbuscar2');

  var json=JSON.parse(datos);


  var idpais=json.idpais;
  var idestado=json.idestado;
  var idmunicipio=json.idmunicipio;
  var tipoasentamiento=json.tipoasentamiento;

  ObtenerColonias(idpais,idestado,idmunicipio,tipoasentamiento);

});


$$(document).on('page:init', '.page[data-name="servicios"]', function (e) {
  regresohome();
  ObtenerConfiguracion();
  ObtenerServiciosAdicionales();


});
$$(document).on('page:init', '.page[data-name="serviciosregistrados"]', function (e) {
  regresohome();
  //myStopFunction(identificadorDeTemporizador);

  
 $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado3()');

 //ObtenerServiciosRegistrados().then(r => {
        
      $("#filtrocoach").css('display','block');
      $(".v_coach").attr('onchange','FiltroServiciosCoach()');
       localStorage.setItem('pantalla','serviciosregistrados');
      $("#filtrocategorias").css('display','block');
      $("#filtro").css('display','block');
      $("#filtromes").css('display','block');
      $("#filtroanio").css('display','block');

      $("#v_meses").attr('onchange','FiltroServiciosCoach()');
      $("#v_anios").attr('onchange','FiltroServiciosCoach()');

      $(".buscador").attr('onkeyup','FiltroBuscador()');
      filtrar=0;

        $("#v_categorias").attr('onchange','FiltroServiciosCat()');
 
        
       //}).then(r => {

         ObtenerCategoriasFiltro();
         ObtenerCoachesFiltro();

         if (localStorage.getItem('v_categoriasvalor')!=undefined && localStorage.getItem('v_categoriasvalor')!=0 ) {
            
              var valorlistado=localStorage.getItem('v_categoriasvalor');
              $(".v_categorias").val(valorlistado);
            //  FiltroServiciosCat();
          
              filtrar=1;
         
             }

        
       //}).then(r=>{


         if (localStorage.getItem('v_coachvalor')!=undefined && localStorage.getItem('v_coachvalor')!=0) {
            
              var valorlistado=localStorage.getItem('v_coachvalor');
              $(".v_coach").val(valorlistado);
                         
                  filtrar=1;   

             }


            //FiltroServiciosCoach();
            CargarMeses();
          


            if (localStorage.getItem('v_mes')!=0) {
               filtrar=1;
               var valormes=localStorage.getItem('v_mes');
              $(".v_meses").val(valormes);

            }

          var valoranio=0;
            if (localStorage.getItem('v_anio')!=0) {
                filtrar=1;

                valoranio=localStorage.getItem('v_anio');
               
            }

              Cargaranios(valoranio);

            if ( filtrar==1) {
             FiltroServiciosCoach(); 
            }
            
      // }).then(r=>{

        
      // });
       

       
    


});


$$(document).on('page:init', '.page[data-name="detalleservicio"]', function (e) {
  
  if (localStorage.getItem('idusuertutorado')!=undefined &&   localStorage.getItem('idusuertutorado')!=''){
 
   $(".regreso").attr('href','/listadotutoservicios/');


  }else{

    $(".regreso").attr('href','/serviciosasignados/');
  
  }
 


  ObtenerServicioAsignado();
  $$("#abrirpantallacali").attr('onclick','AbirPantallaCalificarServicio()');
 // $$("#Abrirchat").attr('onclick','ElegirParticipantesChat()');
  
$$("#Abrirchat").attr('onclick','AbrirPantallaChats()');
$$("#btncalendario").attr('onclick','FechasServicio()');
 
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');
  
  $(".btnimagenesinformativas").attr('onclick','ImagenesInformativas()');
  $(".btncancelarservicio").attr('onclick','CancelarServicio()');
  myStopFunction(identificadorDeTemporizador);
});

$$(document).on('page:init', '.page[data-name="detalleservicio2"]', function (e) {
  
  if (localStorage.getItem('idusuertutorado')!=undefined &&   localStorage.getItem('idusuertutorado')!=''){
 
   $(".regreso").attr('href','/listadotutoservicios/');


  }else{

    $(".regreso").attr('href','/serviciosasignados/');
  
  }
 


  ObtenerServicioAsignado2();
  $$("#abrirpantallacali").attr('onclick','AbirPantallaCalificarServicio()');
  $$("#Abrirchat").attr('onclick','AbrirPantallaChats()');
  $$("#btncalendario").attr('onclick','FechasServicio()');
 
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');
  $(".btnimagenesinformativas").attr('onclick','ImagenesInformativas()');
  $(".btncancelarservicio").attr('onclick','CancelarServicio()');
  myStopFunction(identificadorDeTemporizador);
});


$$(document).on('page:init', '.page[data-name="detalleserviciocoach"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosasignados/');


  
  
 // $$("#abrirpantallacali").attr('onclick','PantallaCalificacion()');
  $$("#Abrirchat").attr('onclick','AbrirPantallaChats()');
  $$("#btncalendario").attr('onclick','FechasServicio()');
  $$(".btnimagengrupal").attr('onclick','AbrirModalFotoimagengrupal()');
 
  ObtenerParticipantesAlumnos();
  
  VerificarSihayEvaluacion();
ObtenerServicioAsignado();
  $$(".btnasistencia").attr('onclick','Asistencia()');
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');
  //Verificarcantidadhorarios();

    $(".btncancelarservicio").attr('onclick','PantallaCancelarServicio()');
  myStopFunction(identificadorDeTemporizador);

});

$$(document).on('page:init', '.page[data-name="detalleserviciocoach2"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosasignados/');
  myStopFunction(identificadorDeTemporizador);

  ObtenerServicioAsignadoCoach();
  
 // $$("#abrirpantallacali").attr('onclick','PantallaCalificacion()');
  $$("#Abrirchat").attr('onclick','AbrirPantallaChats()');
  $$("#btncalendario").attr('onclick','FechasServicio()');


  $$(".btnasistencia").attr('onclick','Asistencia()');
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');
  //Verificarcantidadhorarios();
  $$(".btnimagengrupal").attr('onclick','AbrirModalFotoimagengrupal()');

    $(".btncancelarservicio").attr('onclick','PantallaCancelarServicio()');

});

$$(document).on('page:init', '.page[data-name="detalleservicioadmin"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosregistrados/');
  myStopFunction(identificadorDeTemporizador);

 
  ObtenerParticipantesAlumnosAdmin();
   VerificarcantidadhorariosAdmin();
   ObtenerServicioAdmin();
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');
  $$("#btncalendario").attr('onclick','FechasServicio()');

 
  $$("#abrirpantallacali").attr('onclick','PantallaCalificacion()');
  $$("#Abrirchat").attr('onclick','AbrirPantallaChats()');
 /* $$("#btncalendario").attr('onclick','FechasServicio()');
  
  ObtenerImagenesGrupal();
  Verificarcantidadhorarios();
  VerificarSihayEvaluacion();
*/
  $$(".btnasistencia").attr('onclick','Asistencia()');
 
  $(".btncancelarservicio").attr('onclick','PantallaCancelarServicio()');

});

$$(document).on('page:init', '.page[data-name="detalleservicioactivo"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosactivos/');

  ObtenerServicioAdmin();
  ObtenerParticipantesAlumnosAdmin();
 $(".btncalendario").attr('onclick','MostrarHorarios()');

  $$("#btnasignaralumno").attr('onclick','GuardarAsignacionServicio()');
  $$("#btncalendario").attr('onclick','FechasServicio()');

  Verificarcantidadhorarios();
 var idusuertutorado=localStorage.getItem('idusuertutorado');

  if (idusuertutorado=='') {
 

  }else{

  $(".regreso").attr('href','/listadotutoservicios/');

 }


});

$$(document).on('page:init', '.page[data-name="detalleservicioactivocoach"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosactivoscoach/');

  ObtenerServicioAdmin();
  ObtenerParticipantesAlumnosAdmin();

  $$("#btnasignaralumno").attr('onclick','GuardarAsignacionServicioCoach()');
  $$("#btncalendario").attr('onclick','FechasServicio()');
  Verificarcantidadhorarios();





});

$$(document).on('page:init', '.page[data-name="asistenciaservicio"]', function (e) {
  
  ObtenerAlumnosAsistencia();
  ProxihorarioAsistencia();
  $$("#btnguardarasistencia").attr('onclick','GuardarAsistencia()');

  $$("#btnmashorarios").attr('onclick','Obtenermashorarios()');

  $$(".colocarhorarios").attr('onclick','Obtenermashorarios()');

  if (localStorage.getItem('idtipousuario')==0) {
  $(".regreso").attr('href','/detalleservicioadmin/');

  }
  if (localStorage.getItem('idtipousuario')==5) {

    $(".regreso").attr('href','/detalleserviciocoach/');
  }

});

$$(document).on('page:init', '.page[data-name="asignaralumnos"]', function (e) {
 
  if (localStorage.getItem('idtipousuario')==0) {
     $(".regreso").attr('href','/detalleservicioadmin/');
    ObtenerAlumnosAdmin();
   // ObtenerParticipantesAlumnosServicio();
   }

  if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');
     ObtenerAlumnos();
    //ObtenerParticipantesAlumnosServicio();

   }
   if (localStorage.getItem('idtipousuario')==5){
      $(".regreso").attr('href','/detalleserviciocoach/');
   ObtenerAlumnos();
   //ObtenerParticipantesAlumnosServicio();
    }



    $$("#buscadorusuarioasignado").attr('onkeyup','BuscarEnLista("#buscadorusuarioasignado",".listaa_")');
    $(".limpiarfiltro").attr('onclick','LimpiarResultado(".lista_")');

    $$("#buscadorusuario").attr('onkeyup','BuscarEnLista("#buscadorusuario",".lista_")');
    $$("#limpiarfiltro").attr('onclick','LimpiarFiltroalumnos()');
    $$("#btnguardarasignacion").attr('onclick','GuardarAsignacion()');

    $$("#btnpasar").attr('onclick','QuitarElemento()');
    $$("#btnpasar2").attr('onclick','AgregarElemento()');
    $$("#btncancelarasi").attr('onclick','CancelarAsignacion()');




});

$$(document).on('page:init', '.page[data-name="serviciosasignados"]', function (e) {
  myStopFunction(identificadorDeTemporizador);


  if (localStorage.getItem('idtipousuario')==3) {
        $("#filtrocategorias").css('display','none');
   $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');

      ObtenerServiciosAsignados();
   }
   if (localStorage.getItem('idtipousuario')==5){
      
      $("#filtrocategorias").css('display','block');
      $(".v_categorias").attr('onchange','FiltroCategoriasCoach()');
     ObtenerServiciosAsignadosCoach();
     ObtenerCategoriasFiltro();
   if (localStorage.getItem('v_categoriasvalor')!=undefined) {
            
              var valorlistado=localStorage.getItem('categoriavalor');
              $(".v_categorias").val(valorlistado);
              FiltroCategoriasCoach();
          
          
         
             }


     $(".v_buscador").attr('onkeyup','BuscardorServicio()');
      $(".limpiarspan").attr('onclick','LimpiarResultado3(".list-item")');

   }

  regresohome();

});

$$(document).on('page:init', '.page[data-name="serviciospendientesasignados"]', function (e) {
  regresohome();
  myStopFunction(identificadorDeTemporizador);

  ObtenerServiciosAsignadospendientes();
 
  $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');

});


$$(document).on('page:init', '.page[data-name="aceptacionservicio"]', function (e) {
  
 ObtenerServicioAsignado();
$(".regreso").attr('href','/serviciospendientesasignados/');

 $(".btncalendario").attr('onclick','MostrarHorarios()');
  
myStopFunction(identificadorDeTemporizador);

 var idusuertutorado=localStorage.getItem('idusuertutorado');
 if (idusuertutorado=='') {
  $$("#btnaceptartermino").attr('onclick','AceptarTerminos()');
  $$("#btnrechazartermino").attr('onclick','PantallaRechazarTerminos()');

  }else{
  $$("#btnaceptartermino").attr('onclick','AceptarTerminosTutorado()');
  $$("#btnrechazartermino").attr('onclick','PantallaRechazarTerminosTutorado()');

  $(".regreso").attr('href','/listadotutoservicios/');

 }


});

$$(document).on('page:init', '.page[data-name="aceptacionservicio2"]', function (e) {
  myStopFunction(identificadorDeTemporizador);

 ObtenerServicioAsignado2();
 $$("#btnaceptartermino").attr('onclick','AceptarTerminos()');
 $$("#btnrechazartermino").attr('onclick','PantallaRechazarTerminos()');
 $(".regreso").attr('href','/serviciospendientesasignados/');
  //Verificarcantidadhorarios();

 $(".btncalendario").attr('onclick','MostrarHorarios()');
  

});


$$(document).on('page:init', '.page[data-name="evaluacionesservicio"]', function (e) {
 if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');

   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/detalleserviciocoach/');
    ObtenerParticipantesEvaluacion();
   }


});

$$(document).on('page:init', '.page[data-name="listadoevaluaciones"]', function (e) {
 if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');
     ObtenerListadoEvalucionesUsuario();
   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/evaluacionesservicio/');
    ObtenerListadoEvaluciones();
   }


});

$$(document).on('page:init', '.page[data-name="listadocuestiones"]', function (e) {
 if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/listadoevaluaciones/');

     ListadocuestionesUsuario();
    

    // resolve runs the first function in .then
 // shows "done!" after 1 second
    
   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/listadoevaluaciones/');
/*    ObtenerDatosEncuesta();
*/    Listadocuestiones();

    $("#btnguardarrespuestas").attr('onclick','GuardarRespuestas()');

    ObtenerSitienerespuestas();
   }


});


$$(document).on('page:init', '.page[data-name="comentariosservicio"]', function (e) {
  
   if (localStorage.getItem('idtipousuario')==0){
      
       if (localStorage.getItem('variable')==1) {

        $(".regreso").attr('href','/serviciosregistrados/');
        localStorage.setItem('variable',0)
      }else{
      $(".regreso").attr('href','/detalleservicioadmin/');

       }
    $(".divcomentar").css('display','none');
    ObtenerServicioAdmin();
    ObtenerComentarios();
   }

  if (localStorage.getItem('idtipousuario')==3) {

     if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
       $(".regreso").attr('href','/detalleservicio/');

       }
ObtenerServicioAsignado();
    ObtenerComentarios();
   }
   if (localStorage.getItem('idtipousuario')==5){
       if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
      $(".regreso").attr('href','/detalleserviciocoach/');

       }
    $(".divcomentar").css('display','none');
ObtenerServicioAsignado();
  ObtenerComentarios();
   }

   //ObtenerServicioAsignado();



  $$(".btncomentar").attr('onclick','NuevoComentario()');
});

$$(document).on('page:init', '.page[data-name="elegirparticipantes"]', function (e) {
  

    if (localStorage.getItem('idtipousuario')==0) {

         $(".regreso").attr('href','/chatservicio/');

       
    ObtenerParticipantesAdmin();
   }

  if (localStorage.getItem('idtipousuario')==3) {

         $(".regreso").attr('href','/chatservicio/');

       
    ObtenerParticipantes();
   }
   if (localStorage.getItem('idtipousuario')==5){
     
    $(".regreso").attr('href','/chatservicio/');


      
    ObtenerParticipantes();

   }
  $$("#buscadorusuario1").attr('onkeyup','BuscarEnLista("#buscadorusuario1",".lista_")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".lista_")');

  $$("#btnIniciarChat").attr('onclick','IniciarChat()');

});

$$(document).on('page:init', '.page[data-name="messages"]', function (e) {
  var bandera=localStorage.getItem('bandera');

  if (bandera==0) {
 if (localStorage.getItem('idtipousuario')==0) {
     $(".regreso").attr('href','/chatservicio/');
    
   }

   if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/chatservicio/');
  

   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/chatservicio/');
   
   }
 }else{

    $(".regreso").attr('href','/chat/');

 }
 CargarFunciones();
 CargarFoto();

 if (localStorage.getItem('idsala')!=undefined && localStorage.getItem('idsala')!='') {
   
    ActualizarMensajesLeidos();
    ObtenerMensajesAnteriores();
    VerificarSalaServicio();
 }

});

$$(document).on('page:init', '.page[data-name="resumenpago"]', function (e) {
  
 $$(".regreso").attr('onclick','GoToPage("listadopagos")');
 localStorage.setItem('comisionmonto',0);
 localStorage.setItem('comisionporcentaje',0);
 localStorage.setItem('comision',0);
 localStorage.setItem('impuestotal',0);
 localStorage.setItem('subtotalsincomision',0);
 localStorage.setItem('comisionnota',0);
 localStorage.setItem('comisionpornota',0);
 localStorage.setItem('tipocomisionpornota',0);
 localStorage.setItem('campomonto',0);
 localStorage.setItem('constripe',0);
 localStorage.setItem('comisiontotal',0);

 var demo1 = new Promise((resolve, reject) => {
     
     resolve(ObtenerDescuentosRelacionados());

    }).then(()=>{
       
        

       
    });

 

  //$("#btnpagarresumen").attr('disabled',true);
  $$("#btnatras").attr('onclick','Atras()');
  $$("#btnatras").css('display','none');
  //$$(".btnmonedero").attr('onclick','AbrirModalmonedero()');
  $$(".btncupon").attr('onclick','AbrirModalcupon()');
 
  var listado=JSON.parse(localStorage.getItem('pagos'));
  
  var html="";
  var tipopago='';
  var habilitarmonedero=1;
  for (var i = 0; i < listado.length; i++) {
      if (listado[i].tipopago!='' && listado[i].tipopago!=null) {

         tipopago=listado[i].tipopago;

      }

      if (listado[i].habilitarmonedero!=1) {

        $(".btnmonedero").css('display','none');
      }
   
  }

   /*if (tipopago!='' && tipopago!=undefined) {
 
   
  CargartipopagoSeleccionado(tipopago).then(r => {

   // $("#tipopago").val(tipopago);
    CargarOpcionesTipopago();
 

  });

  //$("#tipopago").val(tipopago);
  $$("#requierefactura").attr('onchange','RequiereFactura2()');
  
 }else{

    Cargartipopago(0);
    
    $$("#requierefactura").attr('onchange','RequiereFactura()');
 
 }*/

 
           
      ValidacionAceptar().then(r => {

      if (r.pagoparaaceptar.length>0) {
          var contapagos=r.pagoparaaceptar.length;
          var pagosparaaceptar=r.pagoparaaceptar;
          
           AbrirModalPagosParaAceptar(pagosparaaceptar,0);


         }

        });
    

 
 
  
 

 //manda a llamar calcular totales al finalizar los descuentos
  
//PintarlistaImagen();
  $$("#tipopago").attr('onchange','CargarOpcionesTipopago()');
  $(".divtransferencia").css('display','none');
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('display','none');

  $$("#btnpagarresumen").attr('onclick','ContinuarMetodoPago()')
});


$$(document).on('page:init', '.page[data-name="metodopago"]', function (e) {
  

 localStorage.setItem('comisionmonto',0);
 localStorage.setItem('comisionporcentaje',0);
 localStorage.setItem('comision',0);
 localStorage.setItem('impuestotal',0);
 localStorage.setItem('subtotalsincomision',0);
 localStorage.setItem('comisionnota',0);
 localStorage.setItem('comisionpornota',0);
 localStorage.setItem('tipocomisionpornota',0);
 localStorage.setItem('campomonto',0);
 localStorage.setItem('constripe',0);
 localStorage.setItem('comisiontotal',0);
  //$("#btnpagarresumen").attr('disabled',true);
  //$$("#btnatras").attr('onclick','Atras()');
  $$("#btnatras").css('display','none');
  //$$(".btnmonedero").attr('onclick','AbrirModalmonedero()');
  $$(".btncupon").attr('onclick','AbrirModalcupon()');
 
  var listado=JSON.parse(localStorage.getItem('pagos'));
  
  var html="";
  var tipopago='';
  var habilitarmonedero=1;
  for (var i = 0; i < listado.length; i++) {
      if (listado[i].tipopago!='' && listado[i].tipopago!=null) {

         tipopago=listado[i].tipopago;

      }

      if (listado[i].habilitarmonedero!=1) {

        $(".btnmonedero").css('display','none');
      }
   
  }
 
 if (tipopago!='' && tipopago!=undefined) {
 
   
  CargartipopagoSeleccionado(tipopago).then(r => {

   // $("#tipopago").val(tipopago);
    CargarOpcionesTipopago();
 

  });

  //$("#tipopago").val(tipopago);
  $$("#requierefactura").attr("onchange","RequiereFactura2(\""+tipopago+"\")");
  
 }else{

    Cargartipopago(0);
    //ObtenerDescuentosRelacionados();
    $$("#requierefactura").attr('onchange','RequiereFactura()');
 
 }

 
  
 $$(".regreso").attr('onclick','GoToPage("resumenpago")');

   $$("#tipopago").attr('onchange','CargarOpcionesTipopago()');
  $(".divtransferencia").css('display','none');
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('display','none');
  $("#btnpagarnota").attr('disabled',true);

  $$("#btnpagarnota").attr('onclick','RealizarCargo()');
  $$("#btnpagarnota").css('display','none');
  CalcularTotales();
});


$$(document).on('page:init', '.page[data-name="calendario"]', function (e) {
  

  if (localStorage.getItem('idtipousuario')==0) {
     $(".regreso").attr('href','/detalleservicioadmin/');
      ObtenerServicioAdmin();
   }

   if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');
      ObtenerServicioAsignado();

   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/detalleserviciocoach/');
    ObtenerServicioAsignado();
   }
  CargarFechas();
   ConsultarTodosHorarios();

});

$$(document).on('page:init', '.page[data-name="calendarioadmin"]', function (e) {
  
   regresohome();
 let calendarInline;
 CargarFechasAdmin(calendarInline);

});

$$(document).on('page:init', '.page[data-name="calificacionesadmin"]', function (e) {
  
    $(".regreso").attr('href','/detalleservicioadmin/');
    ObtenerCalificacionesServicio();
    
});


$$(document).on('page:init', '.page[data-name="nuevaimagengrupal"]', function (e) {
  
 $$(".imglogoimagengrupal").attr('src',urlimagendefaultservicio);
 $$(".fotoimagen").attr('onclick','AbrirModalFotoimagengrupal()');
 $$("#btnguardarimagen").attr('onclick','Guardarimagengrupal()');


});

$$(document).on('page:init', '.page[data-name="nuevaimagenindividual"]', function (e) {
  
 $$(".imglogoimagenindividual").attr('src',urlimagendefaultservicio);
 
 $$(".fotoimagen").attr('onclick','AbrirModalFotoimagenIndividual()');
 $$("#btnguardarimagen").attr('onclick','GuardarimagenIndividual()');


});
$$(document).on('page:init', '.page[data-name="imagenesindividuales"]', function (e) {
  
 if (localStorage.getItem('idtipousuario')==0) {
     $(".regreso").attr('href','/detalleservicioadmin/');
   }

   if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');

   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/detalleserviciocoach/');
   }

   ObtenerImagenesIndividuales();
   $(".btnnuevaimagen").attr('onclick','AbrirModalFotoimagenIndividual()');

});

$$(document).on('page:init', '.page[data-name="nuevovideogrupal"]', function (e) {
  
// $$(".imglogoimagengrupal").attr('src',urlimagendefault);
$$(".divvideo").attr('onclick','AbrirModalFotovideogrupal()');
// $$("#btnguardarimagen").attr('onclick','Guardarimagengrupal()');

});


$$(document).on('page:init', '.page[data-name="serviciosactivos"]', function (e) {
  
  regresohome();
  $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');

  ObtenerServiciosActivos();
    
});

$$(document).on('page:init', '.page[data-name="serviciosactivoscoach"]', function (e) {
  
  regresohome();
  ObtenerServiciosActivosCoach();
    $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');

    
});

$$(document).on('page:init', '.page[data-name="nuevoservicio"]', function (e) {
  
  regresohome();
         localStorage.setItem('edicionservicio',1);


   var demo1 = new Promise((resolve, reject) => {
     
     resolve(ObtenerOrdenServicio());

    }).then(()=>{
       
        ObtenerPoliticasaceptacion();

       
    }).then(()=>{
      asignacionperiodos=[];
      arraydiaselegidos=[];
      arraydiaseleccionados=[];
      asignacioncoach=[];

    localStorage.setItem("fotoimagenservicio",'');

       CargarFechasNuevoServicio();
  $("#v_costo").attr('onkeyup','');
  $("#v_categoria").attr('onchange','SeleccionarCategoria(0)');
   porcentajescoachs=[];
 // ObtenerCategoriaServicios();

  VerificarPermisoUsuario();
  $("#v_reembolso").attr('onchange','HabilitarcantidadReembolso()');
  ObtenerTodasEncuestas();
  CargarZonas();
  //$$(".imglogoimagenservicio").attr('src',urlimagendefault);
  $("#btnagregarcoach").attr('onclick','NuevoCoach(-1)');
  //$$(".fotoimagen").attr('onclick','AbrirModalFotoimagenservicio()');
  $("#btnguardarservicio").attr('onclick','Guardarservicio()');
  $("#btnagregarperiodo").attr('onclick','NuevoPeriodo()');
  
  $("#v_politicaaceptacionseleccion").attr('onchange','SeleccionarPolitica()');
  $(".imglogoimagenservicio").attr('src',urlimagendefaultservicio);
  $$(".fotoimagen").attr('onclick','AbrirModalFotoimagenservicio()');

  $("#v_ligarclientes").attr('onchange','Permitirligar()');
  $("#v_titulo").attr("onblur","Colocardescripcion();CambiarColor2('lititulo');");
  $$('#v_titulo').attr('onfocus',"CambiarColor('lititulo');");

  $("#v_descripcion").attr("onblur","CambiarColor2('lidescripcion');");
  $$('#v_descripcion').attr('onfocus',"CambiarColor('lidescripcion');");
  $("#v_categoria").attr("onblur","CambiarColor2('litiposervicio');");
  $$('#v_categoria').attr('onfocus',"CambiarColor('litiposervicio');");
  
  $("#v_costo").attr("onblur","CambiarColor2('licosto');");
  $$('#v_costo').attr('onfocus',"CambiarColor('licosto');");
  
  $("#v_orden").attr("onblur","CambiarColor2('liorden');");
  $$('#v_orden').attr('onfocus',"CambiarColor('liorden');");
  
  $("#v_estatus").attr("onblur","CambiarColor2('liestatus');");
  $$('#v_estatus').attr('onfocus',"CambiarColor('liestatus');");
  $("#v_fechainicial").attr("onblur","CambiarColor2('lifechainicial');");
  $$('#v_fechainicial').attr('onfocus',"CambiarColor('lifechainicial');");

  $("#v_fechafinal").attr("onblur","CambiarColor2('lifechafinal');");
  $$('#v_fechafinal').attr('onfocus',"CambiarColor('lifechafinal');");
  
  $("#v_politicasaceptacion").attr("onblur","CambiarColor2('lidescripcionpoliticas');");
  $$('#v_politicasaceptacion').attr('onfocus',"CambiarColor('lidescripcionpoliticas');");
  
  $("#v_tiempoaviso").attr("onblur","CambiarColor2('litiempoavisos');");
  $$('#v_tiempoaviso').attr('onfocus',"CambiarColor('litiempoavisos');");
  
  $("#v_tituloaviso").attr("onblur","CambiarColor2('litituloavisos');");
  $$('#v_tituloaviso').attr('onfocus',"CambiarColor('litituloavisos');");
    
  $("#v_descripcionaviso").attr("onblur","CambiarColor2('lidescripcionavisos');");
  $$('#v_descripcionaviso').attr('onfocus',"CambiarColor('lidescripcionavisos');");
    
  $("#v_cantidadreembolso").attr("onblur","CambiarColor2('licantidadreembolso');");
  $$('#v_cantidadreembolso').attr('onfocus',"CambiarColor('licantidadreembolso');");
    
  $("#v_numligarclientes").attr("onblur","CambiarColor2('licantidadligar');");
  $$('#v_numligarclientes').attr('onfocus',"CambiarColor('licantidadligar');");
   
  $("#v_numparticipantesmin").attr("onblur","CambiarColor2('linumparticipantesmin');");
  $$('#v_numparticipantesmin').attr('onfocus',"CambiarColor('linumparticipantesmin');");
  $("#v_numparticipantesmax").attr("onblur","CambiarColor2('linumparticipantesmax');");
  $$('#v_numparticipantesmax').attr('onfocus',"CambiarColor('linumparticipantesmax');");
  $("#btncancelar").css('display','none');

  $("#v_individual").attr("onclick","ValidarCheckmodalidad(1)");
  $("#v_grupal").attr("onclick","ValidarCheckmodalidad(2)");
  $("#v_aceptarserviciopago").attr("onchange","HabilitarOpcionaceptarserviciopago()");

  $("#v_categoriaservicio").attr("onchange","ObtenerHorariosCategoria()");
  $("#habilitarseleccion").attr("onchange","HabilitarSeleccion()");
    }).then(()=>{
        if (localStorage.getItem('idtipousuario')==5) {
      //$("#v_estatus").val(0);
      $("#v_estatus").prop('checked',false);
     }
    if (localStorage.getItem('valor')!=null && localStorage.getItem('valor')!='') {
       porcentajescoachs=[];
       
         ObtenerServicioNuevo(localStorage.getItem('valor'));
         $$("#btncancelarservicio").attr('onclick','CancelarServicioAdmin('+localStorage.getItem('valor')+')');
         localStorage.setItem('edicionservicio',1);
        $("#id").val(localStorage.getItem('valor'));
        $("#txtpagina").html('Editar <span style="color: #0abe68;">servicio</span>');
        $(".lititulo").addClass('item-input-with-value');
        $(".lidescripcion").addClass('item-input-with-value');
        $("#btncancelar").css('display','none');
        if (localStorage.getItem('idtipousuario')==0){
          var paginaregreso=localStorage.getItem('pantalla');
          $(".regreso").attr('onclick','LimpiarVariableHorarios();GoToPage("'+paginaregreso+'");');
      }
    }else{

      ObtenerTipoServicios(0)
      ObtenerCategoriaServicios(0);
    }
   });
 

     
  app.on('accordionOpened', function (el) {
       if (el.id=='general-tab') {
        $("#v_titulo").focus();
      }
      if (el.id=='costos-tab') {
        $("#v_costo").focus();
      }
      if (el.id=='aceptacion-tab') {
        $("#v_politicasaceptacion").focus();
      }

    });
 
myStopFunction(identificadorDeTemporizador);
});
$$(document).on('page:init', '.page[data-name="replicaservicio"]', function (e) {

 ObtenerTipoServicios(0);
 ObtenerCategoriaServicios(0);
  ObtenerPoliticasaceptacion();
 ObtenerServiciosReplica();
 //CargarCalendario();
 CargarFechasNuevoServicio();
localStorage.setItem("fotoimagenservicio",'');
  $("#serviciosreplica").attr('onchange','ObtenerServicioAReplicar(this.value);ObtenerUsuariosServicio(this.value);ObtenerOrdenServicio();');

  $("#btnguardarservicioreplica").attr('onclick','GuardarReplica()');
  $("#btnaplicarcalendario").attr('onclick','AplicarFechas()');
  $("#btnagregarperiodo").attr('onclick','NuevoPeriodo()');
  $("#v_ligarclientes").attr('onchange','Permitirligar()');
  $("#v_titulo").attr("onblur","Colocardescripcion();CambiarColor2('lititulo');");
  $$('#v_titulo').attr('onfocus',"CambiarColor('lititulo');");
  $("#v_reembolso").attr('onchange','HabilitarcantidadReembolso()');
  ObtenerTodasEncuestas();

  $("#btnagregarcoach").attr('onclick','NuevoCoach()');

  $$(".fotoimagen").attr('onclick','AbrirModalFotoimagenservicio()');
  $(".imglogoimagenservicio").attr('src',urlimagendefaultservicio);

  $("#v_politicaaceptacionseleccion").attr('onchange','SeleccionarPolitica()');


  regresohome();

  myStopFunction(identificadorDeTemporizador);
});

$$(document).on('page:init', '.page[data-name="reagendarservicio"]', function (e) {
regresohome();
 ObtenerTipoServicios(0);
 ObtenerCategoriaServicios(0);

 if (localStorage.getItem('idtipousuario')==0){
      
     ObtenerServiciosReplica();

   }

    if (localStorage.getItem('idtipousuario')==5){
      
     ObtenerServiciosCoach();

   }
  
  $(".liservicio").addClass('item-input-with-value');
  $("#serviciosreplica").attr('onchange','ObtenerDatosServicio()');

  $("#btnguardarservicioreagendar").attr('onclick','GuardarReagendado()');
  $("#btnaplicarcalendario").attr('onclick','AplicarFechasReagendado()');
  myStopFunction(identificadorDeTemporizador);

});

$$(document).on('page:init', '.page[data-name="membresia"]', function (e) {

regresohome();

CargarInformacionMembresia();


});

$$(document).on('page:init', '.page[data-name="pagomembresia"]', function (e) {

CargarInformacionMembresia();
 Cargartipopago(0);

  $$("#tipopago").attr('onchange','CargarOpcionesTipopago()');
  $(".divtransferencia").css('display','none');
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('display','none');

  $$("#btnpagarresumen").attr('disabled',true);
  $$("#btnatras").attr('onclick','Atras()');
  $$("#btnatras").css('display','none');

});


$$(document).on('page:init', '.page[data-name="listadotutoservicios"]', function (e) {

 $(".regreso").attr('onclick','RegresaraHome()');
//ObtenerServiciosTutorado();
 ObtenerInformacionTutorado();
 ObtenerMisServicioTutorado();
 ObtenerMispendientesTutorado();
 ObtenerServiciosAbiertoTutorado();
 $(".btnmisserviciospendientes").attr('onclick','GoToPage("serviciospendientesasignadostutorado")');
 $(".btnserviciosactivos").attr('onclick','GoToPage("serviciosactivostutorado")');
 $(".btnmisservicios").attr('onclick','GoToPage("serviciosasignadostutorado")');

var filtrotuto=localStorage.getItem('filtrotuto');
 if (filtrotuto==1) {

  $(".titulo").html('Mis servicios');
  ObtenerServiciosAsignadosTutorado();
 }
 if (filtrotuto==2) {
    $(".titulo").html('Mis servicios pendientes');

  ObtenerServiciosAsignadospendientesTutorado();
 }
 if (filtrotuto==3) {
  $(".titulo").html('Servicios abiertos');
  ObtenerServiciosActivos();
 }
 /* if (localStorage.getItem('iduserrespaldo')!=undefined && localStorage.getItem('iduserrespaldo')!=0) {
    var idusuariotuto=localStorage.getItem('idusuariotuto');
    localStorage.setItem('id_user',idusuariotuto);
   }*/
});


$$(document).on('page:init', '.page[data-name="serviciospendientesasignadostutorado"]', function (e) {
 ObtenerInformacionTutorado();
 ObtenerServiciosAsignadospendientesTutorado();
 $(".regreso").attr('onclick','GoToPage("listadotutoservicios")');

});

$$(document).on('page:init', '.page[data-name="serviciosactivostutorado"]', function (e) {
 ObtenerInformacionTutorado();

 $(".regreso").attr('onclick','GoToPage("listadotutoservicios")');
 $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
 $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');

  ObtenerServiciosActivos();
    
});
$$(document).on('page:init', '.page[data-name="serviciosasignadostutorado"]', function (e) {
 ObtenerInformacionTutorado();

 $(".regreso").attr('onclick','GoToPage("listadotutoservicios")');
 ObtenerServiciosAsignadosTutorado();
});


$$(document).on('page:init', '.page[data-name="datosdependencia"]', function (e) {

regresohome();
ObtenerDatosDependencia();

$("#btnquitarasociacion").attr('onclick','DesasociarUsuario()');

});
 $$(document).on('page:init', '.page[data-name="membresiaactiva"]', function (e) {

regresohome();

 PintardatosMembresia();
});


$$(document).on('page:init', '.page[data-name="imagenesinformativas"]', function (e) {
  ObtenerImagenesInformativas();
 
   if (localStorage.getItem('idtipousuario')==0){
      
       if (localStorage.getItem('variable')==1) {

        $(".regreso").attr('href','/serviciosregistrados/');
        localStorage.setItem('variable',0)
      }else{
      $(".regreso").attr('href','/detalleservicioadmin/');

       }
   }

  if (localStorage.getItem('idtipousuario')==3) {

     if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
       $(".regreso").attr('href','/detalleservicio/');

       }

   }
   if (localStorage.getItem('idtipousuario')==5){
       if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
      $(".regreso").attr('href','/detalleserviciocoach/');

       }
   
   }

});

$$(document).on('page:init', '.page[data-name="cancelacionservicio"]', function (e) {

    ObtenerParticipantesAlumnosCancelacion();
    $("#btnguardarcancelacion").attr('onclick','GuardarCancelarServicio()');


  if (localStorage.getItem('idtipousuario')==3) {

     if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
       $(".regreso").attr('href','/detalleservicio/');

       }

   }
   if (localStorage.getItem('idtipousuario')==5){
       if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
      $(".regreso").attr('href','/detalleserviciocoach/');

       }
   
   }


   if (localStorage.getItem('idtipousuario')==0){
       if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosregistrados/');
        localStorage.setItem('variable',0)
      }else{
      $(".regreso").attr('href','/detalleservicioadmin/');

       }
   
   }
});

$$(document).on('page:init', '.page[data-name="serviciosporvalidar"]', function (e) {

regresohome();

   if (localStorage.getItem('idtipousuario')==0){
      

    
      ObtenerServiciosporValidarAdmin().then(r => {


          $("#filtrocoach").css('display','block');

          localStorage.setItem('pantalla','serviciosporvalidar');
          ObtenerCoachesFiltro();
          $(".v_coach").attr('onchange','FiltrarServicios()');


        });


    }


if (localStorage.getItem('idtipousuario')==5) {

    ObtenerServiciosporValidar();


   }

  $(".v_buscador").attr('onkeyup','BuscarEnLista(".v_buscador",".list-item")');
  $(".limpiarspan").attr('onclick','LimpiarResultado(".list-item")');


});
 $$(document).on('page:init', '.page[data-name="detallepago"]', function (e) {

  $(".regreso").attr('href','/listadopagospagados/');
  Pintardetallepago();
});

$$(document).on('page:init', '.page[data-name="listadopagosadmin"]', function (e) {
regresohome();
     $(".btnclick").css('display','none');
    $(".buscador").css('display','none');

if (localStorage.getItem('idtipousuario')==0){
      
      MostarCoaches();
   
    }

if (localStorage.getItem('idtipousuario')==5) {
    $(".buscador").css('display','block');
    $(".v_buscador").attr('onkeyup','BuscarEnListaPagos2()');
    ListadoPagosCoach();
     $(".btnclick").css('display','block');
    $("#btnpendiente").attr('onclick','ActivoPagoCoach(1)')
    $("#btnhistorial").attr('onclick','ActivoPagoCoach(2)')
    $(".limpiarspan").attr('onclick','ListadoPagosCoach()')
   }


});

$$(document).on('page:init', '.page[data-name="detallepagoscoach"]', function (e) {
     $(".regreso").attr('onclick','GoToPage("listadopagosadmin")');

     ListadoPagosCoachLista();
     $(".btnclick").css('display','block');
    $("#btnpendiente1").attr('onclick','ActivoPagoCoachLis(1)')
    $("#btnhistorial1").attr('onclick','ActivoPagoCoachLis(2)')

    $(".v_buscador1").attr('onkeyup','ListadoPagosCoachListaBuscar()');

    $(".limpiarspan").attr('onclick','ListadoPagosCoachLista()')



});


$$(document).on('page:init', '.page[data-name="politicas"]', function (e) {
  
 ObtenerPolitica();

  
  $$('.regreso').attr('onclick',"GoToPage('register')");

});

$$(document).on('page:init', '.page[data-name="politicas2"]', function (e) {
  
 ObtenerPolitica();

  
  $$('.regreso').attr('onclick',"GoToPage('datosemergencia')");

});


$$(document).on('page:init', '.page[data-name="politicas3"]', function (e) {
  
 ObtenerPolitica();

  
  $$('.regreso').attr('onclick',"GoToPage('datosdesalud')");

});

$$(document).on('page:init', '.page[data-name="monedero"]', function (e) {
  
 ObtenerMovimientosMonedero();

  
  $$('.regreso').attr('onclick',"GoToPage('pagos')");

});

$$(document).on('page:init', '.page[data-name="mercadopagotarjeta"]', function (e) {

$(".divformulario").html('');
    let cardForm="";

CargarNuevaTarjetaMercadopago();


  $$('.regreso').attr('onclick',"RegresarAmetodo()");

});



/*$$(document).on('page:init', '.page[data-name="messages"]', function (e) {

});*/