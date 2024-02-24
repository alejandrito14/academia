
function CargarCalendario5() {

	//todos los dias que no tengan disponibilidad se bloqueen
	//color negro lo disponible 
	//al darle click colocar en botones los paquetes
	//al seleccionar un producto colocar los horarios solo la hora inicial distinguir am y pm
  var paqueteid=0;
  var fecha=new Date();
  var anio = fecha.getFullYear();
  var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);
  var iduser=localStorage.getItem('id_user');
  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=0;
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio+"&iduser="+iduser;
  var pagina = "ObtenerFechasSucursal.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];

       if (resp.hasOwnProperty('disponible')) {
      if (resp.disponible.length>0) {
        var disponible=resp.disponible;

        for (var i =0; i < disponible.length; i++) {
            var fecha=disponible[i];
              var dividirfecha=fecha.split('-');
              var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
              
             var anio=dividirfecha[0];
            var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
            var dia=dividirfecha[2];
          
            var objeto={
              date:new Date(anio,mes,dia),
              color:'rgb(245,212,95)',
            };
              eventos.push(objeto);
        }
      }

    }

    if (resp.hasOwnProperty('nodisponible')) {

       if (resp.nodisponible.length>0) {

       		 var nodisponible=resp.nodisponible;

        for (var i =0; i <nodisponible.length;i++) {
           
            var fecha=nodisponible[i];
            var dividirfecha=fecha.split('-');
            var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
              
            var anio=dividirfecha[0];
            var mes=(dividirfecha[1].replace(/^(0+)/g, '')-1);
            var dia=dividirfecha[2];
          
            var objeto={
              date:new Date(anio,mes,dia),
              color:'rgb(245,212,95)',
            };
              nodisponiblejs.push(objeto);
        }

       }
     }

		 var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar-inline-container',
        weekHeader: true,
        events: eventos,
        disabled: nodisponiblejs,
        firstDay:0,
        dateFormat: 'dd/mm/yyyy',
        renderToolbar: function () {
          return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a  class="link icon-only"><i class="icon icon-back"></i></a>' +
            '</div>' +
            '<div class="center"></div>' +
            '<div class="right">' +
            '<a  class="link icon-only"><i class="icon icon-forward"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>';
        },
        on: {
          init: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
            $('.calendar-custom-toolbar .left .link').on('click', function () {
              calendarInline.prevMonth();
            	RefrescarFechasEspecialista(c);

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
            	RefrescarFechasEspecialista(c);

            });
          },

           calendarChange:function (c) {
          
            var fecha=c.value;


            var convertirfecha=new Date(fecha);
            var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
          var mesdata=convertirfecha.getMonth();

          var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
          var diadata=convertirfecha.getDate();

          fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
           
           // ConsultarFechaEspecialista(fecha1);
           localStorage.setItem('fecha',fecha1);
          
   /*       ObtenerEspecialistasSucursal();
       		$(".divpintarhorarios").html('');
      	    $(".divhorarios").css('display','none');

            $(".divpintarservicios").html('');
            $(".divservicios").css('display','none');
      		horaseleccionada="";*/
      		HabilitarBoton();

          },

          monthYearChangeStart: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
          }
        }
      });

  			     $(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
                 $(".calendar-day-event").css('display','none');
                 $(".calendar-day-weekend .calendar-day-number").addClass('nodisponible');



       },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
    
}

function ObtenerEspecialistasSucursal() {

    var idespecialista=0;
    var idsucursal=localStorage.getItem('idsucursal');
    var datos='idespecialista='+idespecialista+"&idsucursal="+idsucursal;
    var pagina = "ObtenerEspecialistasSucursal.php";
    
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      async:false,
      data:datos,
      success: function(resp){
        var respuesta=resp.especialista;
        $(".divbarbero").css('display','block');
        PintarEspecialistaSucursal(respuesta);

          },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

}

function PintarEspecialistaSucursal(respuesta) {
  var html="";
  console.log(respuesta);
  if (respuesta.length>0) {
    html+=`<div class="swiper-wrapper">`;
    for (var i = 0; i < respuesta.length; i++) {
      var materno=respuesta[i].materno!=null?respuesta[i].materno:'';
      
        urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;

                          if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

                          urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
                             }else{


                           if (respuesta[i].sexo=='M') {

                             urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
                                          
                               }else{
                                 urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
                                                
                                }

                            }

     /* html+=`
      <div class=" especialistassu sinseleccionar" onclick="ConsultarPaqueteEspecialista(`+respuesta[i].idespecialista+`)" style="" id="especialista_`+respuesta[i].idespecialista+`">
      <p style="margin:0px;"> `+respuesta[i].nombre+` `+respuesta[i].paterno+` `+materno+`</p>
    
      </div>`

      ; 

      */
    html+=`<div class="swiper-slide"  style="margin-right:5px!important;width: 30%;height:210px;" >`;


       html+=` 
        <a class="especialistassu sinseleccionar" id="especialista_`+respuesta[i].idespecialista+`" >
        <div class="card-bx featured-card " style="box-shadow:none!important;    height: 150px;"   >
                <div class="card-media " >
                   
                    <img src="`+urlimagen+`" alt="" style="border-radius: 50%;" />
                  
                </div>
                <div class="card-info">
                  <h5 class="title">`+respuesta[i].nombre+` `+respuesta[i].paterno+ `
                </h5>
              
              </div>
          </div>
          </div>

           </a>
          `;

    }

      html+=`</div>`;

  html+=`  <div class="swiper-pagination" style="bottom: -6px!important;"></div>`;

  }

  $(".barberos-swiper").html(html);
 // $(".divpintarbarbero").html(html);
  var swiper6 = new Swiper(".barberos-swiper", {
       slidesPerView: "auto",
      spaceBetween: 0,
      pagination: {
         el: '.swiper-pagination',
         type: 'bullets',
       },

   

    });


   $(".swiper-slide").find('a').click(function(){
     console.log($(this));

     var id=$(this).attr('id');
     var dividirid=id.split('_')[1];
     
    var consulta=0;
        if ($(this).hasClass('sinseleccionar')) {


             $(".especialistassu").removeClass('seleccionado');
             $(".especialistassu").addClass('sinseleccionar');

             $(".especialistassu .card-bx").removeClass('seleccionado');
             $(".especialistassu .card-bx").addClass('sinseleccionar');


             $(this).removeClass('sinseleccionar');
             $(this).addClass('seleccionado');

             $(this).children('div').removeClass('sinseleccionar');
             $(this).children('div').addClass('seleccionado');
             localStorage.setItem('idespecialista',dividirid);
             consulta=1;
        }else{

            $(this).removeClass('seleccionado');
            $(this).addClass('sinseleccionar');

             $(this).children('div').removeClass('seleccionado');
             $(this).children('div').addClass('sinseleccionar');
            consulta=0;
            localStorage.setItem('idespecialista',0);


        }

         if (consulta==1) {

           ConsultarPaqueteEspecialista(dividirid);
          }
//onclick=""

   });
}

function ConsultarPaqueteEspecialista(idespecialista) {

  /*if ($("#especialista_"+idespecialista).hasClass('sinseleccionar')) {
     
  
     $(".especialistassu").removeClass('seleccionado');
     $(".especialistassu").addClass('sinseleccionar');

      $("#especialista_"+idespecialista).removeClass('sinseleccionar');
      $("#especialista_"+idespecialista).addClass('seleccionado');
      consulta=1;
      localStorage.setItem('idespecialista',idespecialista);

    }else{

      $("#especialista_"+idespecialista).removeClass('seleccionado');
      $("#especialista_"+idespecialista).addClass('sinseleccionar');
      consulta=0;
      localStorage.setItem('idespecialista',0);

    }*/


   // if (consulta==1) {

    var idsucursal=localStorage.getItem('idsucursal');
    var datos='idespecialista='+idespecialista+"&idsucursal="+idsucursal;
    var pagina = "ObtenerpaquetesEspecialista.php";
    
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      async:false,
      data:datos,
      success: function(resp){
         
          PintarPaquetesSu(resp.respuesta);
          $(".divhorarios").css('display','none');
          $(".divpintarhorarios").html('');
          horaseleccionada="";
          HabilitarBoton();
          },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
  /*}else{



  }*/
}

/*function ObtenerPaquetesSucursal() {
    var idespecialista=0;
    var idsucursal=localStorage.getItem('idsucursal');
    var datos='idespecialista='+idespecialista+"&idsucursal="+idsucursal;
    var pagina = "ObtenerpaquetesSucursal.php";
    
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      async:false,
      data:datos,
      success: function(resp){
        var respuesta=resp.respuesta;

        console.log(respuesta);

          },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

 
}*/

function PintarPaquetesSu(respuesta) {
   var html="";
  $(".divservicios").css('display','none');

  if (respuesta.length>0) {

    $(".divservicios").css('display','block');
      html+=`<div class="">`;

      for (var i = 0; i <respuesta.length; i++) {
      html+=`<div class="  servicioscalendario sinseleccionar" onclick="ConsultarHorarios(`+respuesta[i].idpaquete+`,'`+respuesta[i].costo+`')" style="" id="paquete_`+respuesta[i].idpaquete+`">`+
      `<p style="margin-top: 1px;margin-bottom: 0px;">`+respuesta[i].nombrepaquete+`</p>
      <p style="margin:0px;"> $`+respuesta[i].costo+`</p>
       <p style="margin:0px;">`+respuesta[i].intervaloservicio+`min.</p>
      </div>`;
      }

      html+=`</div>`;
  }

  $(".divpintarservicios").html(html);
}

function ConsultarHorarios(idpaquete,costo) {
  
   if ($("#paquete_"+idpaquete).hasClass('sinseleccionar')) {
      $(".servicioscalendario").removeClass('seleccionado');
      $(".servicioscalendario").addClass('sinseleccionar');

      $("#paquete_"+idpaquete).removeClass('sinseleccionar');
      $("#paquete_"+idpaquete).addClass('seleccionado');
      consulta=1;
      localStorage.setItem('idpaquete',idpaquete);
      localStorage.setItem('precio',costo);

    }else{

      $("#paquete_"+idpaquete).removeClass('seleccionado');
      $("#paquete_"+idpaquete).addClass('sinseleccionar');
      consulta=0;
      localStorage.setItem('idpaquete',0);
      localStorage.setItem('precio',0);

    }

if (consulta==1) {
  var paqueteid=idpaquete;
  var fecha=localStorage.getItem('fecha');
  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=localStorage.getItem('idespecialista');
  var datos="fecha="+fecha+"&idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista;
  var pagina = "ObtenerDisponibilidadPaqueteEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
        horaseleccionada="";
        arrayhorarios=resp.intervalos;

      console.log(resp);
      PintarDisponibleHoras2(arrayhorarios);
       HabilitarBoton();
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}else{

  horaseleccionada="";
  HabilitarBoton();
}

}

function PintarDisponibleHoras2(respuesta) {
  var html="";
    $(".divhorarios").css('display','none');

  if (respuesta.length>0) {
    $(".divhorarios").css('display','block');

    html+=`<div class="">`;
    for (var i = 0; i <respuesta.length; i++) { 
      html+=`<a class=" button button-fill button-small button-round horariossele sinseleccionarhora" style="" onclick="SeleccionarHorario2(`+i+`)" id="horario_`+i+`">`+respuesta[i].horainicial+`</a>`;
    }

    html+=`</div>`;
  }


  $(".divpintarhorarios").html(html);
}

function SeleccionarHorario2(i) {

  if ($("#horario_"+i).hasClass('sinseleccionarhora')) {
      $(".horariossele").removeClass('seleccionadohora');
      $(".horariossele").addClass('sinseleccionarhora');

      $("#horario_"+i).removeClass('sinseleccionarhora');
      $("#horario_"+i).addClass('seleccionadohora');
       horaseleccionada=arrayhorarios[i];

    }else{
      horaseleccionada="";

      $("#horario_"+i).removeClass('seleccionadohora');
      $("#horario_"+i).addClass('sinseleccionarhora');
    }

    console.log(horaseleccionada);

  HabilitarBoton();

}


function AgendarCita4() {
      app.dialog.confirm('','¿Seguro que desea agendar una cita?' , function () {

   var idpaquete=localStorage.getItem('idpaquete');
   var idsucursal=localStorage.getItem('idsucursal');
   var horario=horaseleccionada.horainicial+'_'+horaseleccionada.horafinal;
   var fecha=localStorage.getItem('fecha');
   var idusuario=localStorage.getItem('id_user');
   var idespecialista=localStorage.getItem('idespecialista');
   var costo=localStorage.getItem('precio');
   var cantidad=1;
   var datos="idpaquete="+idpaquete+"&idsucursal="+idsucursal+"&horario="+horario+"&fecha="+fecha+"&idusuario="+idusuario+"&idespecialista="+idespecialista+"&costo="+costo+"&cantidad="+cantidad;
   var pagina = "GuardarCita.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var cita=resp.cita[0];

    /*  var html="";
        html+=`
        <p>Gracias</p>
        <p>Tu cita quedó agendada para el dia
       `+cita.fecha+` a las `+cita.horainicial+` con `+cita.nombre+` `+cita.paterno+`</p>
      `;*/

        var html="";
        html+=`
        <p>¡Gracias!</p>
        <p>
        Tu cita ha sido agregada para el dia `+cita.fecha+` a las `+cita.horainicial+` con `+cita.nombre+` `+cita.paterno+` </p>
        <p>Para confirmar tu cita, realiza tu pago</p>
     
      `;

       var funcion="";
      funcion+=`
        <span class="dialog-button" id="btniracarrito" onclick="CerrarModalD()">Cerrar</span>
      `;
      GoToPage('carrito');

      CrearModalAviso(html,funcion);
      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
});
}

function CerrarModalD() {
  modaldialogo.close();
}
