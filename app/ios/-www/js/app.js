// Dom7
var $$ = Dom7;
var device1 = Framework7.getDevice();
var estiloparrafo="";
// Theme
var theme = 'md';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}
 
// Preloader
setTimeout(function () {
    $('.loader-screen').hide();
}, 2000);

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  el: '#app',
  theme,
  view : {
	//pushState: true,
	//browserHistory: true,
  },
  // store.js,
  store: store,
  
  // routes.js,
  routes: routes,
   touch: {
    // Enable fast clicks
   // fastClicks: true,
  },
  popup:{
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
var intervalo=0;
var intervalocitas=0;

var pictureSource;   // picture source
 var destinationType; 
var produccion =1;
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

localStorage.setItem('zonahoraria',userTimeZone);

var idcategoriapadre=0;
var codigoservicio="0";
$(document).ready(function() {

    if (produccion == 0) {
      codigoservicio='125';

    }else{
      codigoservicio='127';
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
var version='1.0.29';

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
var rutaserver="";
var puertosockect="";
var tipoletra="";


var codigoserv="";
var urlphp = ""; 
var urlimagenes = ""; 
var urlimagendefault="";
var urlimagenlogo="";
var globalsockect="";
var imagenesbancos="";
var urlimagendefaultservicio=""
var idcategoriapadre=0;

function Cargar() {

//  ObtenerServidor(codigoservicio);

    if (produccion == 0) {
      codigoservicio='125';

    }else{
      codigoservicio='127';
    }
 
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
var puertosockect="";
var carpetaapp="";
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
    codigoserv="125/";
    urlphp = rutaserver+"/is-barber/app/php/"; 
    urlimagenes = rutaserver+"/is-barber/www/catalogos/"; 
    urlimagendefault=rutaserver+"/is-barber/www/images/sinfoto.png";
    urlimagenlogo=rutaserver+"/is-barer/www/images/sinimagenlogo.png";
    globalsockect=rutaserver+":"+puertosockect+"/";
    imagenesbancos=rutaserver+"/is-barber/www/assets/images/";
    urlimagendefaultservicio=rutaserver+"/is-barber/images/sin-servicio.jpg"

}else{
    codigoserv=codigoservicio+"/";
    urlphp = rutaserver+"/IS-BARBER/app/"+carpetaapp+"/php/";
    urlimagenes = rutaserver+"/IS-BARBER/catalogos/"; 
    urlimagendefault=rutaserver+"/IS-BARBER/images/sinfoto.png"
    urlimagenlogo=rutaserver+"/IS-BARBER/images/sinimagenlogo.png";
    urlimagendefaultservicio=rutaserver+"/IS-BARBER/images/sin-servicio.jpg"

    imagenesbancos=rutaserver+"/IS-BARBER/assets/images/";
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
    localStorage.setItem('celular','');

        if(localStorage.getItem('iduserrespaldo')!=undefined && localStorage.getItem('iduserrespaldo')!=null)
          {
            var iduserrespaldo=localStorage.getItem('iduserrespaldo');
            localStorage.setItem('id_user',iduserrespaldo);
            localStorage.removeItem('iduserrespaldo');

          }
  /* pictureSource=navigator.camera.PictureSourceType;
   destinationType=navigator.camera.DestinationType;
*/
   var uid='000';
    localStorage.setItem("UUID",uid);
    if (device1.ios) {
      localStorage.setItem("SO", "ios");
     // var uid= device.uuid;

  
    localStorage.setItem("UUID",uid);
    }

    if (device1.android) {
      localStorage.setItem("SO", "android");

       // var uid= device.uuid;
      localStorage.setItem("UUID",uid);
    }

    if (device1.desktop) { 

      localStorage.setItem("SO", "desktop");
    }
   


      if( window.isphone ) {
 

    var p1 = new Promise(function(resolve, reject) {
      resolve(getToken());
     
    });

    p1.then(function(value) {
     var tokenfirebase=localStorage.getItem('tokenfirebase');
       
    // ObtenerConfiVersion();     
    
    
    },function(reason) {
     console.log(reason); // Error!
  });


    
    }

      var sesion=localStorage.getItem('session');
      var iduser=localStorage.getItem('id_user'); 
      $(".landing").css('display','none');
    
         if(sesion==1)
          {
            if (iduser>0) {

            
               ValidarUsuarioSession();
             
             }else{
               /*var imagen=urlimagenes+'empresa/imagenempresa/'+codigoserv+localStorage.getItem('imagensplashprincipal');
               $(".imagenprincipal").html('<img src="'+imagen+'" alt="" style="width:100%;">');
               $(".imagenprincipal").addClass('dark-bg');
*/

               setTimeout(function () {
                    $$(".page-content").removeClass('marginauto');
                    $$('.imagenprincipal').addClass('salida');
                    $$(".imagenprincipal").css('display','none');  
                    $$(".landing").css('display','block');
                        MostrarAnuncios(); 
                      myStopFunction(intervalo);
                     

                  }, 4000);
               

             }


          }else{

            /* var imagen=urlimagenes+'empresa/imagenempresa/'+codigoserv+localStorage.getItem('imagensplashprincipal');
               $(".imagenprincipal").html('<img src="'+imagen+'" alt="" style="width:100%;">');
               $(".imagenprincipal").addClass('dark-bg');*/
          // MostrarAnuncios();   
         // GoToPage('landing');
            setTimeout(function () {
                    $$(".page-content").removeClass('marginauto');
                    $$('.imagenprincipal').addClass('salida');
                    $$(".imagenprincipal").css('display','none');  
                    $$(".landing").css('display','block');
                    MostrarAnuncios(); 
                    myStopFunction(intervalo);
                    
                  }, 4000);     
          }
    
    


      

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });
  
   /*  ObtenerConfiEmpresa();

    */

}

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

       MostrarAnuncios(); 
    });

   

});
// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  app.panel.close();
 
//Cargar();
  
 
}); 
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
     $(".btnsalir").attr('onclick','salir_app()');
     $(".btniracarrito").attr('onclick','IraCarrito()');
    $$(".page-content").addClass('marginauto');
    CargarMenu();
    myStopFunction(intervalocitas);

    entrarinvitado().then(resultado => {
    
     
    var invitado= localStorage.getItem('invitado');
     CargarDatos();
    if (invitado==1) {

      $(".menuoculto").css('display','none');
      $(".menuusuario").css('visibility','hidden');
      $(".btnsalir").css('display','');
      $(".lblusuario").css('display','none');

      
    }else{
      $(".lblusuario").attr('onclick','GoToPage("perfil")');
      ObtenerCitasProgramadas();

      var pregunta=localStorage.getItem('pregunta');
    if (pregunta==0) {

           AbrirModalPreguntaSesion(); 
    
           }

        CargarMenu();

    }
 
        Visualizarmenu();
        GuardarTokenBase(0); 
    
    $(".panelizquierdo").attr('onclick','toggleMenu()');
   
    var pregunta=localStorage.getItem('pregunta');
   /*     if (pregunta==0) {
        app.dialog.confirm('','¿Desea mantener la sesión activa?', function () {
        localStorage.setItem('session',1);

        localStorage.setItem('pregunta',1);
        },
         function () {
            
                        localStorage.setItem('pregunta',1);
                  }
            );
           }*/

  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });






});


$$(document).on('page:init', '.page[data-name="homeespecialista"]', function (e) {
        $(".btnsalir").attr('onclick','salir_app()');
        $(".btnscan2").attr('onclick','scanqr2()');
        $$(".page-content").addClass('marginauto');
        $(".panelizquierdo").attr('onclick','toggleMenu()');
        Visualizarmenu();
        CargarMenu();
      CargarDatosEspecialista();
  var pregunta=localStorage.getItem('pregunta');
    if (pregunta==0) {

    AbrirModalPreguntaSesion(); 
     /*app.dialog.confirm('','¿Desea mantener la sesión activa?', function () {
        localStorage.setItem('session',1);
        localStorage.setItem('pregunta',1);
         // app.dialog.alert('','Se guardó la sesión'); 
        },

         function () {
             localStorage.setItem('pregunta',1);
                  }
            );*/
           }

});

$$(document).on('page:init', '.page[data-name="welcome"]', function (e) {
   
      ObtenerCategorias(1);
      ObtenerDetalleEmpresa();
      $("#btnvermas").attr('onclick',"AbrirModalDescripcion()");
    
});

$$(document).on('page:init', '.page[data-name="celular"]', function (e) {
      
  // phoneFormatter('telefono');
  //aqui telefono
   $$('#btnvalidarcelular').attr('onclick','ValidarCelular()');
   $$("#inputleido").attr('onchange','ValidarCheckLeido()');
   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

  var input = $("#telefono");
  // Establece la cantidad máxima de números permitidos
  var maxNumbers = 10;
  // Agrega un controlador de eventos para el evento 'input' del campo
  input.on("input", function() {
    var value = input.val();
// Elimina cualquier carácter que no sea un número
    var sanitizedValue = value.replace(/\D/g, "");
    // Limita la longitud de la cadena a la cantidad máxima de números
    sanitizedValue = sanitizedValue.slice(0, maxNumbers);
    // Actualiza el valor del campo con la cadena sanitizada
    input.val(sanitizedValue);
  });
      
    
});

$$(document).on('page:init', '.page[data-name="login2"]', function (e) {
  

  if (localStorage.getItem('idusuarioinvitado')!='' && localStorage.getItem('idusuarioinvitado')!=undefined) {

    var idu=localStorage.getItem('idusuarioinvitado');
    localStorage.setItem('id_user',idu);
  }    
  
  $$('#btnlogin').attr('onclick','validar_login2()');
  $$('#btnregresar').attr('onclick','RegresarCarrito()'); 

  $$(".btninvitado").attr('onclick','entrarinvitado()');
   $(".versionapp").text(version);
    
});

$$(document).on('page:init', '.page[data-name="colocartoken"]', function (e) {
      
 $$("#t5").focus();
/* $$('#t1').attr('onkeyup',"Siguiente('t1','t2')");
 $$('#t2').attr('onkeyup',"Siguiente('t2','t3')");
 $$('#t3').attr('onkeyup',"Siguiente('t3','t4')");*/
 $$('#t5').attr('onkeyup',"ValidarToken();");
 $$("#botoncontinuartoken").attr('onclick','ValidarTokenBoton()');
  
 $$("#reenviotoken").attr('onclick',"ReenvioTokenCel()");
 $("#btncancelar1").attr("onclick","EliminarVariables()");

if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
    
});


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$('#btncontinuar').attr('onclick','Registrar()')
$$('#v_nombre').focus();
$$('#v_nombre').attr('onfocus',"Cambiar(this)");
$$('#v_nombre').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_paterno').attr('onfocus',"Cambiar(this)");
$$('#v_paterno').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_materno').attr('onfocus',"Cambiar(this)");
$$('#v_materno').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_fecha').attr('onfocus',"Cambiar(this)");
$$('#v_fecha').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");

$$('#v_email').attr('onfocus',"Cambiar(this)");
$$('#v_email').attr('onblur',"Cambiar2(this);QuitarEspacios(this);");
$$("#v_contra1").attr('onkeyup','ComprobacionContrase()');

$$("#v_contra2").attr('onkeyup','ComprobacionContrase()');
$('.show-pass').on('click',function(){
      $(this).toggleClass('active');
      var passInput = $(this).parent().find('input');
      var inputType = passInput.attr('type');
      if( inputType == 'password'){
        passInput.attr('type','text');
      }else if(inputType == 'text'){
        passInput.attr('type','password');
      }
    });

$("#txtsexoh").attr('onclick','SeleccionarhM("H")');
$("#txtsexom").attr('onclick','SeleccionarhM("M")');

 if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

});

$$(document).on('page:init', '.page[data-name="intereses"]', function (e) {
  ObtenerIntereses();
  
  $("#btnguardarinteres").attr('onclick','GuardarIntereses()');
    
});

$$(document).on('page:init', '.page[data-name="login"]', function (e) {
 
  $$(".btnregistro").attr('onclick','vistaRegistro()');
  $$('#btnlogin').attr('onclick','validar_login()');
  $$('#btnregresar').attr('onclick','RegresarLanding()'); 

  $$(".btninvitado").attr('onclick','entrarinvitado()');
   $(".versionapp").text(version);
   ObtenerEdad();
    if (tipoletra!='') {

      $(".cambiarfuente").each(function(index) {
          console.log($(this));

          $(this).addClass(tipoletra);

    });

    }

    if (localStorage.getItem('celular')!=undefined && localStorage.getItem('celular')!='') {
      var usuario=localStorage.getItem('celular');
     
      $("#v_usuario").val(usuario);
      //phoneFormatter('v_usuario');
      $("#v_clave").focus();
   
    }else{
        $("#v_usuario").focus();

      //phoneFormatter('v_usuario');
    }


  var input = $("#v_usuario");
  // Establece la cantidad máxima de números permitidos
  var maxNumbers = 10;
  // Agrega un controlador de eventos para el evento 'input' del campo
  input.on("input", function() {
    var value = input.val();
// Elimina cualquier carácter que no sea un número
    var sanitizedValue = value.replace(/\D/g, "");
    // Limita la longitud de la cadena a la cantidad máxima de números
    sanitizedValue = sanitizedValue.slice(0, maxNumbers);
    // Actualiza el valor del campo con la cadena sanitizada
    input.val(sanitizedValue);
  });
       


});

$$(document).on('page:init', '.page[data-name="detallesucursal"]', function (e) {
 
    idcategoriapadre=0;
    var invitado=  localStorage.getItem('invitado');

    if (invitado==1) {

      $(".menuoculto").css('display','none');
      $(".menuusuario").css('visibility','hidden');
      $(".btnsalir").css('display','');
    }
      ObtenerDatosSucursal();
      $(".btnagregarmas").attr('onclick','Agregarmasproducto()');
      PintarCantidadcarrito();
      $(".btniracarrito").attr('onclick','IraCarrito()');
      Visualizarmenu();

});

$$(document).on('page:init', '.page[data-name="detalleproductoservicios"]', function (e) {

    var invitado=  localStorage.getItem('invitado');

    if (invitado==1) {

      $(".menuoculto").css('display','none');
      $(".menuusuario").css('visibility','hidden');
      $(".btnsalir").css('display','');
    }
      localStorage.setItem('idcategoria',0);
      if (idcategoriapadre!=0) {

        localStorage.setItem('idcategoria',idcategoriapadre);
 
      }
     console.log('detalleproductoservicios');
    ObtenerCat();
   

   
     if (tipoletra!='') {

      $(".cambiarfuente").addClass(tipoletra);
    }
//ObtenerProductos();
 $$('.cargandopre').hide();
$('.infinite-scroll-preloader').hide();
     

});

$$(document).on('page:init', '.page[data-name="subcategorias"]', function (e) {
 
ObtenerSubCategorias();


    
});

$$(document).on('page:init', '.page[data-name="productoscategoria"]', function (e) {
 
    var invitado=  localStorage.getItem('invitado');

    if (invitado==1) {

      $(".menuoculto").css('display','none');
      $(".menuusuario").css('visibility','hidden');
      $(".btnsalir").css('display','');
    }

    var div="divproductosservicios2";
    //ObtenerProductosCategorias(div);
    PintarProductosConCategoria(categoriascache5[0],div);
 

     if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

    if (idcategoriapadre!=0) {

  localStorage.getItem('idcategoria',idcategoriapadre);
  $(".regreso").attr("onclick","GoToPage('subcategorias')");
  
  }else{

  $(".regreso").attr("onclick","GoToPage('detalleproductoservicios')");

}

 $$('.cargandopre').hide();
$('.infinite-scroll-preloader').hide();

});

$$(document).on('page:init','.page[data-name="detallepaquete"]',function(e)
{

   var sistema=localStorage.getItem('SO');

  
        var paqueteid=localStorage.getItem('idpaquete');
        detallepaquete(paqueteid);

      if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
    $(".ptr-content").css('overflow','scroll');

});

$$(document).on('page:init','.page[data-name="detalleservicio"]',function(e)
{

        var paqueteid=localStorage.getItem('idpaquete');
        detalleservicio(paqueteid);
        $(".ptr-content").css('overflow','scroll');

        $(".disponibilidadfecha").attr('onclick','Disponilidadfecha2()');
        $(".disponibilidadespecialista").attr('onclick','ObtenerListadoEspecialista()');
        $(".precioriginal").html('');

});

$$(document).on('page:init','.page[data-name="disponibilidadfecha"]',function(e)
{
    var paqueteid=localStorage.getItem('idpaquete');
    detalleservicio(paqueteid);
  
     $("#v_especialista2").attr('onchange','ObtenerEspecialistaCosto2()');

     $("#v_horarios").attr('onchange','ObtenerEspecialistaHora()');
     $(".btnagendarcita").attr('onclick','AgendarCita()');
     CargarCalendario();
});

$$(document).on('page:init','.page[data-name="disponibilidadespecialista"]',function(e)
{
        var paqueteid=localStorage.getItem('idpaquete');
  ObtenerdetalleEspecialista();

    detalleservicio(paqueteid);
   // CargarCalendario(); 
    //CargarEspecialista();
    CargarCalendarioDispo();
    $("#v_especialista").attr('onchange','ObtenerEspecialistaCosto();');
    $("#demo-calendar-default").attr('onclick','AbrirCalendario()');

    $("#v_horarios2").attr('onchange','HabilitarBotonAgendar()');
    //$(".btnagendarcita").attr('onclick','AgendarCita2()');
    var precio=localStorage.getItem('precio');
    if (precio>0) {
      $(".precioriginal").text('$'+precio);
    }

    if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
});

$$(document).on('page:init', '.page[data-name="resumenpago"]', function (e) {
  
 //$$(".regreso").attr('onclick','GoToPage("listadopagos")');
 
  localStorage.setItem('descuentocupon',0);
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
 localStorage.setItem('monedero',0);
  $("#btnpagarresumen").attr('disabled',true);
  $$("#btnatras").attr('onclick','Atras()');
  $$("#btnatras").css('display','none');
  CalcularTotales(); 
  Cargartipopago(0); 
 
 $$(".btnmonedero").attr('onclick','AbrirModalmonedero()');
 $$(".btncupon").attr('onclick','AbrirModalcupon()');
 

 $$("#requierefactura").attr('onchange','RequiereFactura()');
  

  //ObtenerDescuentosRelacionados();//manda a llamar calcular totales al finalizar los descuentos
  
//PintarlistaImagen();
  $$("#tipopago").attr('onchange','CargarOpcionesTipopago()');
  $(".divtransferencia").css('display','none');
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('display','none');

  $$("#btnpagarresumen").attr('onclick','AbrirConfirmacion()')
   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
      $(".dialog").addClass(tipoletra);
    }
});

$$(document).on('page:init','.page[data-name="homeindex"]',function(e)
{
             setTimeout(function () {
                    $$(".page-content").removeClass('marginauto');

                    $$('.imagenprincipal').addClass('salida');
                    $$(".imagenprincipal").css('display','none');  
                    $$(".landing").css('display','block');
                    MostrarAnuncios(); 
                     myStopFunction(intervalo);
                  }, 4000); 
 $(".btnempezar").attr('onclick','Empezar()');
  /*setTimeout(function () {

      var id_user=localStorage.getItem('id_user');
      var session=localStorage.getItem('session');
      var idtipousuario=localStorage.getItem('idtipousuario');
   
if (session==1) {
     
  

        getVistoAnuncio().then(r => {
       
          
         if(r.visto == 0 && r.configuracion.mostraranuncios==1)
          {  
            app.views.main.router.navigate('/home/');

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
   
      app.views.main.router.navigate('/');

  }

  }, 1000);*/

});


$$(document).on('page:init','.page[data-name="carrito"]',function(e)
{
  localStorage.setItem('monedero',0);
   localStorage.setItem('montocupon',0);
  localStorage.setItem('codigocupon','');
  localStorage.setItem('idcupon','');


   var p1 = new Promise(function(resolve, reject) {
      resolve(ActualizarValoresCarrito());
     
    });

    p1.then(function(value) {
      CargarCarrito();
    });
 

  $(".btnpagar").attr('onclick','IrAPago()');
  $(".btnagregarmas").attr('onclick','Agregarmasproducto()');
  $(".btnregresocarrito").attr('onclick','RegesoCarrito()');
  $$(".btncupon").attr('onclick','AbrirModalCupones()');

  
   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
      $(".dialog").addClass(tipoletra);
    }

    $(".totalcarrito").css('display','');
});

$$(document).on('page:init','.page[data-name="listadocompras"]',function(e)
{

  ObtenerPagosPagados();

   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
     
    }

  $$(".page-content").removeClass('marginauto');
                    
          
  

});

$$(document).on('page:init','.page[data-name="detallepago"]',function(e)
{

  Pintardetallepago();
 

  
});



$$(document).on('page:init','.page[data-name="forgotpassword"]',function(e)
{
  $$('#recuperarcontrase').attr('onclick','recuperar()');

    //phoneFormatter('v_email');
 $("#v_email").attr('onblur','Cambiar2(this);');
 $$('#v_email').attr('onfocus',"Cambiar(this)");
 
  if (tipoletra!='') {

      $(".cambiarfuente").addClass(tipoletra);
   
    }

     var input = $("#v_email");
  // Establece la cantidad máxima de números permitidos
  var maxNumbers = 10;
  // Agrega un controlador de eventos para el evento 'input' del campo
  input.on("input", function() {
    var value = input.val();
// Elimina cualquier carácter que no sea un número
    var sanitizedValue = value.replace(/\D/g, "");
    // Limita la longitud de la cadena a la cantidad máxima de números
    sanitizedValue = sanitizedValue.slice(0, maxNumbers);
    // Actualiza el valor del campo con la cadena sanitizada
    input.val(sanitizedValue);
  });
       
    
});

$$(document).on('page:init', '.page[data-name="verificacion"]', function (e) {

 $$("#t5").focus();

 $$('#t5').attr('onkeyup',"VerificarToken1();CargarBoton();");

 //$$('#t4').attr('onkeyup',"Validarcaja('t4');");
 $$("#reenviotoken").attr('onclick',"ReenvioToken()");
 $("#btncancelar1").attr("onclick","EliminarVariables()");

  if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
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

 //AbrirInfo();

    $('.show-pass').on('click',function(){
      $(this).toggleClass('active');
      var passInput = $(this).parent().find('input');
      var inputType = passInput.attr('type');
      if( inputType == 'password'){
        passInput.attr('type','text');
      }else if(inputType == 'text'){
        passInput.attr('type','password');
      }
    });


 if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

});

$$(document).on('page:init', '.page[data-name="homeadmin"]', function (e) {
        $(".btnsalir").attr('onclick','AbriModalSalir()');
        $(".btnscan2").attr('onclick','scanqr3()');
        $(".panelizquierdo").attr('onclick','toggleMenu()');
        CargarMenu();
        Visualizarmenu();
        $$(".page-content").addClass('marginauto');
 
      CargarDatosAdmin();
     var pregunta=localStorage.getItem('pregunta');
    if (pregunta==0) {

           AbrirModalPreguntaSesion(); 
    
           }

});


$$(document).on('page:init', '.page[data-name="servicios"]', function (e) {
  myStopFunction(intervalo);
  myStopFunction(control);
 CargarCalendario2();
 $(".regresar").attr('onclick','GoToPage("homeadmin")');
 $(".btnserviciosagendados").attr('onclick','FiltrarEstatus(100)');
 $(".btnserviciosproceso").attr('onclick','FiltrarEstatus(1)');
 $(".btnserviciospendientes").attr('onclick','FiltrarEstatus(0)');
 $(".btnserviciosrealizados").attr('onclick','FiltrarEstatus(2)');
 $(".btnservicioscancelados").attr('onclick','FiltrarEstatus(3)');
 $(".btnserviciosnorealizados").attr('onclick','FiltrarEstatus(4)');
});

$$(document).on('page:init', '.page[data-name="productos"]', function (e) {
 myStopFunction(intervalo);
  myStopFunction(control);
 CargarCalendario3();
 $(".regresar").attr('onclick','GoToPage("homeadmin")');

});

$$(document).on('page:init', '.page[data-name="bloqueos"]', function (e) {

$('input[name="demo-radio-start"]').prop('checked', false);
$('input[name="demo-radio-start"]').change(function () {
    if ($(this).is(':checked')) {

       var valor=$(this).val();

      PintarOpcionBloqueo(valor);
    }
    //Here do the stuff you want to do when 'unchecked'
});

});

$$(document).on('page:init', '.page[data-name="datospersonales"]', function (e) {

    Cargardatospersonales();

    $("#txtsexoh").attr('onclick','SeleccionarhM("H")');
    $("#txtsexom").attr('onclick','SeleccionarhM("M")');
    $("#btnguardardatos").attr('onclick','Guardardatospersonales()');
    $(".regreso").attr('onclick','GoToPage("perfil")');
});
$$(document).on('page:init', '.page[data-name="profile"]', function (e) {


  Cargarperfilfoto();
   CargarFoto();
  $$('#btncerrarsesion').attr('onclick','salir_app()')

  $$("#datosacceso").attr('onclick','Datosacceso()');
  $$(".badgefoto").attr('onclick','AbrirModalFoto()');

  $$(".badgefoto").attr('onclick','AbrirModalFoto()');

  $$("#btneliminarcuenta").attr('onclick','EliminarCuenta()');
 $(".versionapp").text(version);

 

});

$$(document).on('page:init', '.page[data-name="politicas"]', function (e) {
  
 ObtenerPolitica();

  

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

 $('.show-pass').on('click',function(){
      $(this).toggleClass('active');
      var passInput = $(this).parent().find('input');
      var inputType = passInput.attr('type');
      if( inputType == 'password'){
        passInput.attr('type','text');
      }else if(inputType == 'text'){
        passInput.attr('type','password');
      }
    });

});

$$(document).on('page:init', '.page[data-name="detalleespecialista"]', function (e) {

  ObtenerdetalleEspecialista();
});


$$(document).on('page:init', '.page[data-name="disponibilidadespecialistaelegido"]', function (e) {
  ObtenerdetalleEspecialista();
  CargarCalendario4();
  $(".divhorarios").css('display','none');
  $(".divservicios").css('display','none');
  $(".btnagendarcita").attr('onclick','AgendarCita3()');


});

$$(document).on('page:init', '.page[data-name="disponibilidadfechasucursal"]', function (e) {
    CargarCalendario5();
  $(".btncontinuarcita").attr('onclick','GoToPage("servicioslista")');

   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

});

$$(document).on('page:init', '.page[data-name="validadoqrcita"]', function (e) {
  
  //inicio();
    myStopFunction(intervalo);

  $(".regresarvalidado").attr('onclick','RegresarHomeEspecialista()');
  ObtenerTiempoCita();
  $(".btnfinalizar").attr('onclick','FinalizarCita()');
  //colocarvalor(0,0,10,2);
});


$$(document).on('page:init', '.page[data-name="validadoqrcita2"]', function (e) {
  
  //inicio();
    myStopFunction(intervalo);

 $(".regresarvalidado").attr('onclick','Parar()');
  ObtenerTiempoCita();
  $(".btnfinalizar").attr('onclick','FinalizarCita()');
  //colocarvalor(0,0,10,2);
});

$$(document).on('page:init', '.page[data-name="configuracion"]', function (e) {
  
 ObtenerdatosFormularioConfiguracion();
 $(".btnguardarconfi").attr('onclick','GuardarConfiguracion()');

});

$$(document).on('page:init', '.page[data-name="servicioslista"]', function (e) {
  
//ObtenerListaFiltroMostrar();
myStopFunction(control);
PintarSubCategoriaProducto(categoriascache4);

var invitado=  localStorage.getItem('invitado');

    if (invitado==1) {

      $(".menuoculto").css('display','none');
      $(".menuusuario").css('visibility','hidden');
      $(".btnsalir").css('display','');

      
    }

    if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
});

$$(document).on('page:init', '.page[data-name="seleccionarhorario"]', function (e) {
    
    ConsultarFechaHorarios();
$(".btncontinuarcita2").attr('onclick','ValidarAntesListadoEspecialista()');

   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
      $(".dialog").addClass(tipoletra);
    }
});


$$(document).on('page:init', '.page[data-name="listadoespecialista"]', function (e) {
  //ObtenerListadoEspecialista();

  

  PintarDetalleEspecialistas2(cacheespecialista);
if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
});

$$(document).on('page:init', '.page[data-name="subcategoriasdetalle"]', function (e) {
       


    PintarSubCategoriaProductodetalle(categoriascache2[0]);


 if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }


//ObtenerSubCategoriasdetalle(0);




 $$('.infinite-scroll-preloader').hide();
  $$(".cargandopre").hide();
    
});

$$(document).on('page:init', '.page[data-name="citas"]', function (e) {
  myStopFunction(intervalocitas);
   ObtenerTableroCitas(1);
 
 if (tipoletra!='') {

      $(".cambiarfuente").addClass(tipoletra);
    }

});

$$(document).on('page:init', '.page[data-name="escogermetodopago"]', function (e) {

 localStorage.setItem('descuentocupon',0);
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
 localStorage.setItem('idtipodepago',0);

  $("#btnpagarresumen").attr('disabled',true);
  $$("#btnatras").attr('onclick','Atras()');
  $$("#btnatras").css('display','none');
  CalcularTotales(); 
  Cargartipopago(0); 
 
 $$(".btnmonedero").attr('onclick','AbrirModalmonedero()');
// $$(".btncupon").attr('onclick','AbrirModalCupones()');
 

 $$("#requierefactura").attr('onchange','RequiereFactura()');
  
  $$("#tipopago").attr('onchange','CargarOpcionesTipopago()');
  $(".divtransferencia").css('display','none');
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('display','none');

  $$(".btnpagar").attr('onclick','ConfirmacionPago()')
  

 if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

    $(".regreso").attr("onclick","GoToPage('carrito')");

});

$$(document).on('page:init', '.page[data-name="productoscategoriadetalle"]', function (e) {
 //aqui
    var invitado=  localStorage.getItem('invitado');

    if (invitado==1) {

      $(".menuoculto").css('display','none');
      $(".menuusuario").css('visibility','hidden');
      $(".btnsalir").css('display','');
    }

    var div="divproductosservicios2";



console.log('entro a productoscategoriadetalle');
console.log('idcategoriapadre: '+idcategoriapadre);
  



 PintarProductosConCategoriadetalle(categoriascache3[0],'divproductosservicios2');

 $$('.infinite-scroll-preloader').hide();
  $$(".cargandopre").hide();

  console.log(categoriascache2);
  if (categoriascache2.length==0) {

   $(".regreso").attr('href','/detalleproductoservicios/');
  
  }else{
   $(".regreso").attr('href','/subcategoriasdetalle/');


  }
 if (tipoletra!='') {
      
      $(".cambiarfuente").addClass(tipoletra);
    }

    
/*if (idcategoriapadre!=0) {

  localStorage.getItem('idcategoria',idcategoriapadre);
  $(".regreso").attr("onclick","GoToPage('subcategoriasdetalle')");
  
  }else{

  $(".regreso").attr("onclick","GoToPage('detalleproductoservicios')");

}*/
//CargarEventoScrollProducto();
  
});

$$(document).on('page:init', '.page[data-name="seleccionarfecha"]', function (e) {

 CargarCalendario6();
  $(".btncontinuarcita").attr('onclick','GoToPage("seleccionarhorario2")');

   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }

});

$$(document).on('page:init', '.page[data-name="seleccionarhorario2"]', function (e) {
    
      ConsultarFechaHorarios();
      $(".btncontinuarcita2").attr('onclick','ValidarAntesListadoEspecialista()');
//'GoToPage("listadoespecialista")'
   if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
      $(".dialog").addClass(tipoletra);
    }
});


$$(document).on('page:init', '.page[data-name="monedero"]', function (e) {
    
      var promesa= ConsultarMonedero();
         promesa.then(r => {
            var monedero=r.respuesta;

            $("#colocarmonedero").html(formato_numero(monedero,2,'.',','));

            
          });

          if (tipoletra!='') {
      $(".cambiarfuente").addClass(tipoletra);
    }
});



$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
    Cargardatospersonales();
    $("#btndatospersonales").attr('onclick','GoToPage("datospersonales")');
    $("#btneliminarcuenta").attr('onclick','EliminarCuenta()');
    $(".regreso").attr('onclick','IrHome()');
 
   // $("#txtsexoh").attr('onclick','SeleccionarhM("H")');
   // $("#txtsexom").attr('onclick','SeleccionarhM("M")');
   // $("#btnguardardatos").attr('onclick','Guardardatospersonales()');
});


$$(document).on('page:init', '.page[data-name="calendarioespecialista"]', function (e) {

 CargarCalendarioespecialista();
 $(".regresar").attr('onclick','GoToPage("homeespecialista")');
 $(".btnserviciosagendados").attr('onclick','FiltrarEstatusEspe(100)');
 $(".btnserviciosproceso").attr('onclick','FiltrarEstatusEspe(1)');
 $(".btnserviciospendientes").attr('onclick','FiltrarEstatusEspe(0)');
 $(".btnserviciosrealizados").attr('onclick','FiltrarEstatusEspe(2)');
 $(".btnservicioscancelados").attr('onclick','FiltrarEstatusEspe(3)');
 $(".btnserviciosnorealizados").attr('onclick','FiltrarEstatusEspe(4)');


});



/*$$(document).on('page:init', '.page[data-name="disponibilidadfechaadmin"]', function (e) {
  $("#txtfechaadmin").attr('onclick','AbrirModalServicios()');
 CargarCalendario2();
 CargarPaquetes();
 $("#v_paqueteservicio").attr('onchange','SeleccionarServicio()');
 localStorage.setItem('idpaquete',0);
});

 $$(document).on('page:init', '.page[data-name="disponibilidadespecialistaadmin"]', function (e) {

    CargarEspecialistaAdmin();
    $("#v_especialista").attr('onchange','ObtenerEspecialistaCosto();');

    $("#demo-calendar-default").attr('onclick','AbrirCalendario()');

});
 */

