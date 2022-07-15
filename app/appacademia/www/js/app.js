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
});

 var pictureSource;   // picture source
 var destinationType; 

$(document).ready(function() {



 
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;


    }

    if( window.isphone ) {
       
     pictureSource=navigator.camera.PictureSourceType;
     destinationType=navigator.camera.DestinationType;
      mediaType = navigator.camera.MediaType;
        document.addEventListener("deviceready", Cargar, false);
    } else {


        Cargar();
    }


 });



  


var produccion = 0;

 


var lhost = "localhost:8888";
var rhost = "issoftware1.com.mx";
var version='1.0.1';

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
if (produccion == 0) {
    var codigoserv="106/";

    var urlphp = "http://localhost:8888/is-academia/app/php/"; 
    var urlimagenes = "http://localhost:8888/is-academia/www/catalogos/"; 
    var urlimagendefault="http://localhost:8888/is-academia/www/images/sinfoto.png";
    var urlimagenlogo="http://localhost:8888/is-academia/www/images/sinimagenlogo.png";
    var globalsockect="http://localhost:3400/";

} else {
    var codigoserv="109/";
    var urlphp = "https://issoftware1.com.mx/IS-ACADEMIA/app/appwoolis/php/";
    var urlimagenes = "https://issoftware1.com.mx/IS-ACADEMIA/catalogos/"; 
    var urlimagendefault="https://issoftware1.com.mx/IS-ACADEMIA/images/sinfoto.png"
    var urlimagenlogo="https://issoftware1.com.mx/IS-ACADEMIA/images/sinimagenlogo.png";
    var globalsockect="https://issoftware1.com.mx:3000/";
   // var urlimagenvacia="https://issoftware1.com.mx/IS-ACADEMIA/images/sinimagenlogo.png";

}
 
function Cargar() {
   
  getConfiguracion();
   localStorage.setItem("SO", "web");
 

  // body...
   /* ObtenerConfiEmpresa();*/

   // ObtenerConfiguracionColores();
   


  //localStorage.setItem('idsucursales',0);
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

  /* pictureSource=navigator.camera.PictureSourceType;
   destinationType=navigator.camera.DestinationType;
*/
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
            

   GuardarTokenBase(0); 
  
  }, function(reason) {
  console.log(reason); // Error!
});
  

   /*  ObtenerConfiEmpresa();

    */

}


$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized for all pages
  

  /* coverimg */
 /* $$('.coverimg').each(function () {
    var imgpath = $$(this).find('img');
    $$(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
    imgpath.hide();
  });*/

 /* $$('.accordion-toggle').on('click', function () {
    $$(this).toggleClass('active')
    $$(this).closest('.accordion-list').find('.accordion-content').toggleClass('show')
  })*/

  /* static footer*/



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

  }, 2000);



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

  }, 6000);
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
//ValidacionUsuario();

 // var promesa=getValidacionUsuario();
   /* promesa.then(r => {
      var existe=r.existe;

      if (existe==1) {*/
           
 
     /* }else{*/
 getValidacionUsuario().then(r => {

        var existe=r.existe;

  if (existe==0) {

      Cargarperfilfoto();
      CargarFoto();
      CargarDatos();
     $$(".iniciotab").attr('onclick','CargarInicio()');
      ObtenerMembresiaActivas();



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
 $$(".iniciotab").attr('onclick','CargarInicio()');

  Cargarperfilfoto();
  CargarFoto();
  CargarDatosAdmin();

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
     CargarDatosAdmin();
    // When loading done, we need to reset it
    app.ptr.done(); // or e.detail();
  }, 2000);
});

})

$$(document).on('page:init', '.page[data-name="homecoach"]', function (e) {
  Cargarperfilfoto();
  CargarFoto();
  $$(".iniciotab").attr('onclick','CargarInicio()');
 
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

  Cargarperfilfoto();
  CargarFoto();
  $$('#btncerrarsesion').attr('onclick','salir_app()')
  $$("#datosacceso").attr('onclick','Datosacceso()');
  $$(".badgefoto").attr('onclick','AbrirModalFoto()');
  $$('#btncambiaralias').attr('onclick','AbrirModalAlias()')


  regresohome();
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


});


$$(document).on('page:init', '.page[data-name="registrofoto"]', function (e) {
  /* swiper carousel projects */
  $$('#btncontinuarregistro').attr('onclick','IrRegistro()')
  $$(".badgefoto").attr('onclick','AbrirModalFoto()');
  $$('#btnregistrardeportenivel').attr('onclick','AbrirModalDeporte()')

   
    ObtenerdatosRegistro();
    CargarFoto();


});

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  /* swiper carousel projects */
  $$('#btncontinuar').attr('onclick','Registrar()')
   localStorage.setItem('vcorreoregistro','');
   localStorage.setItem('vcontra1registro','');
   localStorage.setItem('vcontra2registro','');

   localStorage.setItem('objeto','');
   /*if ( localStorage.getItem("nombre")!=null ) {

    var nombre= localStorage.getItem("nombre");
    var paterno=localStorage.getItem("paterno");
    var materno=localStorage.getItem("materno");
    var fechanacimiento=localStorage.getItem("fechanacimiento");
    var genero=localStorage.getItem('genero');

      $("#v_nombre").val(nombre);
      $("#v_paterno").val(paterno);
      $("#v_materno").val(materno);
      $("#v_fecha").val(fechanacimiento);
      $("#v_sexo").val(genero);


   }else{
*/
    
    ObtenerdatosRegistro();
    ConsultarDepende();
  // }
 


});


$$(document).on('page:init', '.page[data-name="registrodatosacceso"]', function (e) {
  /* swiper carousel projects */
  $$('#btncontinuaracceso').attr('onclick','RegistrarAcceso()');
  $$('#btnregresaracceso').attr('onclick','RegresarAcceso()');
  $$('#btnmembresia').attr('onclick','SolicitarMembresia()');
  $$('#btnregistraralumnos').attr('onclick','AlumnosSecundarios()');

  ObtenerTiposUsuarios();
  $$('#v_tipousuario').attr('onchange','TipoUsuario()');
  CargardatosIngresados();
  TipoUsuario();
  leerLocalStorage();
  $$('#v_contra2').attr('onkeyup','coincidePassword("v_contra1","v_contra2")');
  localStorage.setItem('objeto','');
  ObtenerdatosAcceso();
  ConsultarDepende();

 $$('#v_contra1').attr('onkeyup',"Contarletrasinput('v_contra1','ojitoicono')");
 $$('#span1').attr('onclick',"CambiarAtributoinput('v_contra1')"); 
 $$('#v_contra2').attr('onkeyup',"CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra2','ojitoicono2');");
 $$('#span2').attr('onclick',"CambiarAtributoinput2('v_contra2')");
 
});

$$(document).on('page:init', '.page[data-name="datospersonales"]', function (e) {

Cargardatospersonales();

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

  $$('#span1').attr('onclick',"CambiarAtributoinput('v_clave')"); 
$(".spanvisible").attr('onclick',"LimpiarElemento('v_clave')");

      var id_user=localStorage.getItem('id_user');
      var session=localStorage.getItem('session');
      var idtipousuario=localStorage.getItem('idtipousuario');

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

  ObtenerTutorados();
});

$$(document).on('page:init', '.page[data-name="nuevotutorado"]', function (e) {
   var id=-1;
   $("#v_idtu").val(id);
ObtenerParentesco();
      $("#tituloventana").html('Nuevo <span style="color: #0abe68;">tutorado</span>');

    if (localStorage.getItem('idtutorado')!='' && localStorage.getItem('idtutorado')!=undefined) {
    
      var id=localStorage.getItem('idtutorado');
      $("#v_idtu").val(id);

      Obtenerdatostutorado(id);
      $("#tituloventana").html('Editar <span style="color: #0abe68;">tutorado</span>');
    }
         


          var v=$("#v_idtu").val();

          if (v=='' || v==-1) {
            
           $$('#btnguadartuto').attr('onclick','GuardarTutoradoForm(-1)');

          }else{
          $$('#btnguadartuto').attr('onclick','GuardarTutoradoForm('+v+')');

          }
phoneFormatter('v_celulartu');

});


$$(document).on('page:init', '.page[data-name="forgotpassword"]', function (e) {

    $$('#recuperarcontrase').attr('onclick','recuperar()');


});

$$(document).on('page:init', '.page[data-name="verificacion"]', function (e) {

 $$("#t1").focus();
 $$('#t1').attr('onkeyup',"Siguiente('t1','t2')");
 $$('#t2').attr('onkeyup',"Siguiente('t2','t3')");
 $$('#t3').attr('onkeyup',"Siguiente('t3','t4')");
 $$('#t4').attr('onkeyup',"Validarcaja('t4');VerificarToken1();CargarBoton();");
 $$("#reenviotoken").attr('onclick',"ReenvioToken()");

});
$$(document).on('page:init', '.page[data-name="cambiocontra"]', function (e) {

 $$('#v_contra1').attr('onkeyup',"Contarletrasinput('v_contra1','ojitoicono')");
 $$('#span1').attr('onclick',"CambiarAtributoinput('v_contra1')"); 
 $$('#v_contra2').attr('onkeyup',"CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra2','ojitoicono2');");
 $$('#span2').attr('onclick',"CambiarAtributoinput2('v_contra2')");
 $$('#btncambiocontrase').attr('onclick','Reestablecercontra()');



});


$$(document).on('page:init', '.page[data-name="chat"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
regresohome();
listadochats();
});

$$(document).on('page:init', '.page[data-name="notificaciones"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
regresohome();

});

$$(document).on('page:init', '.page[data-name="pagos"]', function (e) {
  /* swiper carousel projects */
 // $$('#btnverificartoken').attr('onclick','ValidarCelular()')
regresohome();
ObtenerTotalPagos();
ProximopagoaVencer();
$$('#btnlistadopagos').attr('onclick','VerListadoPago()')


});

$$(document).on('page:init', '.page[data-name="listadopagos"]', function (e) {
  $(".regreso").attr('href','/pagos/');

  ObtenerTodosPagos();
  $(".seleccionar" ).each(function( index ) {
       $(this).attr('checked',true);     
  });

  $("#checktodos").attr('checked',true);
  $("#btnpagar").prop('disabled',false);
  HabilitarBotonPago();
  $(".btnpagar").attr('onclick','ResumenPago()');
  localStorage.setItem('monedero',0);
  localStorage.setItem('cupon','');
  localStorage.setItem('descuentocupon',0);
});


$$(document).on('page:init', '.page[data-name="membresia"]', function (e) {

regresohome();

CargarInformacionMembresia();

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
  ObtenerServiciosRegistrados();


});


$$(document).on('page:init', '.page[data-name="detalleservicio"]', function (e) {
  
  $(".regreso").attr('href','/serviciosasignados/');
  ObtenerServicioAsignado();
  $$("#abrirpantallacali").attr('onclick','PantallaCalificacion()');
  $$("#Abrirchat").attr('onclick','ElegirParticipantesChat()');
  $$("#btncalendario").attr('onclick','FechasServicio()');
  Verificarcantidadhorarios();
  VerificarSihayEvaluacionUsuario();
  ConsultarSihayComentarios();
    $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');

});

$$(document).on('page:init', '.page[data-name="detalleserviciocoach"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosasignados/');

  ObtenerServicioAsignado();
 // $$("#abrirpantallacali").attr('onclick','PantallaCalificacion()');
  $$("#Abrirchat").attr('onclick','ElegirParticipantesChat()');
  $$("#btncalendario").attr('onclick','FechasServicio()');
  ObtenerParticipantesAlumnos();
  ObtenerImagenesGrupal();
  Verificarcantidadhorarios();
  VerificarSihayEvaluacion();

  $$(".btnasistencia").attr('onclick','Asistencia()');
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');
  //Verificarcantidadhorarios();
});


$$(document).on('page:init', '.page[data-name="detalleservicioadmin"]', function (e) {
  
  //regresohome();
  $(".regreso").attr('href','/serviciosregistrados/');

  ObtenerServicioAdmin();
  ObtenerParticipantesAlumnosAdmin();
  $$("#btnpermisoasignaralumno").attr('onclick','VerificarTotalAlumnos()');

 // $$("#abrirpantallacali").attr('onclick','PantallaCalificacion()');
  /*$$("#Abrirchat").attr('onclick','ElegirParticipantesChat()');
  $$("#btncalendario").attr('onclick','FechasServicio()');
  
  ObtenerImagenesGrupal();
  Verificarcantidadhorarios();
  VerificarSihayEvaluacion();

  $$(".btnasistencia").attr('onclick','Asistencia()');
 */
});

$$(document).on('page:init', '.page[data-name="asistenciaservicio"]', function (e) {
  
  $(".regreso").attr('href','/detalleserviciocoach/');
  ObtenerAlumnosAsistencia();
  ProxihorarioAsistencia();
  $$("#btnguardarasistencia").attr('onclick','GuardarAsistencia()');

  $$("#btnmashorarios").attr('onclick','Obtenermashorarios()');

  $$(".colocarhorarios").attr('onclick','Obtenermashorarios()');

});

$$(document).on('page:init', '.page[data-name="asignaralumnos"]', function (e) {
  if (localStorage.getItem('idtipousuario')==0) {
     $(".regreso").attr('href','/detalleservicioadmin/');
    ObtenerAlumnosAdmin();

   }

  if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');
 ObtenerAlumnos();

   }
   if (localStorage.getItem('idtipousuario')==5){
      $(".regreso").attr('href','/detalleserviciocoach/');
 ObtenerAlumnos();

    }

    $$("#buscadorusuario").attr('onkeyup','BuscarEnLista("#buscadorusuario",".lista_")');
    $$("#limpiarfiltro").attr('onclick','LimpiarFiltroalumnos()');
    $$("#btnguardarasignacion").attr('onclick','GuardarAsignacion()');




});

$$(document).on('page:init', '.page[data-name="serviciosasignados"]', function (e) {
  regresohome();


  if (localStorage.getItem('idtipousuario')==3) {
    // $(".regreso").attr('href','/detalleservicio/');
      ObtenerServiciosAsignados();
   }
   if (localStorage.getItem('idtipousuario')==5){
      
     ObtenerServiciosAsignadosCoach();


   }

});


$$(document).on('page:init', '.page[data-name="aceptacionservicio"]', function (e) {
  
 ObtenerServicioAsignado();
 $$("#btnaceptartermino").attr('onclick','AceptarTerminos()');
 $$("#btnrechazartermino").attr('onclick','PantallaRechazarTerminos()');
 $(".regreso").attr('href','/serviciosasignados/');

 
  

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


     if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosregistrados/');
        localStorage.setItem('variable',0)
      }else{
         $(".regreso").attr('href','/detalleservicioadmin/');

       }
    ObtenerParticipantesAdmin();
   }

  if (localStorage.getItem('idtipousuario')==3) {


     if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
         $(".regreso").attr('href','/detalleservicio/');

       }
ObtenerParticipantes();
   }
   if (localStorage.getItem('idtipousuario')==5){
      if (localStorage.getItem('variable')==1) {
        $(".regreso").attr('href','/serviciosasignados/');
        localStorage.setItem('variable',0)
      }else{
    $(".regreso").attr('href','/detalleserviciocoach/');


      }
ObtenerParticipantes();

   }
 

  $$("#btnIniciarChat").attr('onclick','IniciarChat()');

});

$$(document).on('page:init', '.page[data-name="messages"]', function (e) {
  
 $$(".regreso").attr('href','/detalleservicio/');

 CargarFunciones();
 CargarFoto();

 if (localStorage.getItem('idsala')!=undefined && localStorage.getItem('idsala')!='') {
    ObtenerMensajesAnteriores();
 }

});

$$(document).on('page:init', '.page[data-name="resumenpago"]', function (e) {
  
 $$(".regreso").attr('onclick','GoToPage("listadopagos")');
 CargarPagosElegidos();
 Cargartipopago(0)
 
 $$(".btnmonedero").attr('onclick','AbrirModalmonedero()');
 $$(".btncupon").attr('onclick','AbrirModalcupon()');
  CalcularTotales();

  $$("#tipopago").attr('onchange','CargarOpcionesTipopago()');
});


$$(document).on('page:init', '.page[data-name="calendario"]', function (e) {
  
   if (localStorage.getItem('idtipousuario')==3) {
     $(".regreso").attr('href','/detalleservicio/');

   }
   if (localStorage.getItem('idtipousuario')==5){

    $(".regreso").attr('href','/detalleserviciocoach/');

   }
 ObtenerServicioAsignado();
 CargarFechas();

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
  
 $$(".imglogoimagengrupal").attr('src',urlimagendefault);
$$(".fotoimagen").attr('onclick','AbrirModalFotoimagengrupal()');
 $$("#btnguardarimagen").attr('onclick','Guardarimagengrupal()');


});

$$(document).on('page:init', '.page[data-name="nuevovideogrupal"]', function (e) {
  
// $$(".imglogoimagengrupal").attr('src',urlimagendefault);
$$(".divvideo").attr('onclick','AbrirModalFotovideogrupal()');
// $$("#btnguardarimagen").attr('onclick','Guardarimagengrupal()');

});

/*$$(document).on('page:init', '.page[data-name="messages"]', function (e) {

});*/