var modaldialogo="";
var arrayhorarios=[];
function Disponilidadfecha2() {

	GoToPage('disponibilidadfecha');
}

function Disponibilidadespecialista() {
	GoToPage('disponibilidadespecialista');
}
function CargarCalendario() {
	//todos los dias que no tengan disponibilidad se bloqueen
  //color negro lo disponible 
  //al darle click colocar en botones los paquetes
  //al seleccionar un producto colocar los horarios solo la hora inicial distinguir am y pm
  var paqueteid=localStorage.getItem('idpaquete');
  var fecha=new Date();
  var anio = fecha.getFullYear();
  var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);

  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=0;
  var iduser=localStorage.getItem('id_user');
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio+"&iduser="+iduser;
  var pagina = "ObtenerDisponibilidadPaqueteSucursal.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];
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

     var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar',
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
              RefrescarFechas1(c);

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
              RefrescarFechas1(c);

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
           
           localStorage.setItem('fecha',fecha1);
         // CargarEspecialista();
         // $(".divbarbero").css('display','block');
          //$(".divpintarhorarios").html('');
         //   $(".divhorarios").css('display','none');

          //  $(".divpintarservicios").html('');
          //  $(".divservicios").css('display','none');
         // horaseleccionada="";
        //  HabilitarBoton();
        HabilitarBotonContinuar();

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

function HabilitarBotonContinuar() {

  if (localStorage.getItem('fecha')!=undefined && localStorage.getItem('fecha')!='') {
      $(".btncontinuareleccion").css('display','block');
      $(".btncontinuareleccion").attr('onclick','GoToPage("seleccionarhorario")');
  }else{

      $(".btncontinuareleccion").css('display','none');

  }
}

function RefrescarFechas1(valor) {
  var mes = calendarInline.currentMonth;
  var anio = calendarInline.currentYear;
  var mes=(mes + 1)<10?'0'+(mes + 1):(mes + 1);
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');
  var idespecialista=0;
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio+"&iduser="+iduser;

  var pagina = "ObtenerDisponibilidadPaqueteSucursal.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];
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


         calendarInline.params.events = eventos;
         calendarInline.params.disabled = nodisponiblejs;

     calendarInline.update();
          $(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
          $(".calendar-day-event").css('display','none');
          $(".calendar-day-weekend .calendar-day-number").addClass('nodisponible');

            $(".divbarbero").css('display','none');
            $(".divpintarhorarios").html('');
            $(".divhorarios").css('display','none');
            $(".divpintarbarbero").html('');
            $(".divpintarservicios").html('');
            $(".divservicios").css('display','none');
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
  //var nextMonthIndex = currentMonth.getMonth() + 1;
}

function ConsultarFecha(fecha) {

         // app.preloader.show();
       
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');
  var datos="fecha="+fecha+"&idpaquete="+paqueteid+"&idsucursal="+sucursal+"&iduser="+iduser;
  var pagina = "ObtenerDisponibilidadPaqueteSucursal.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      var respuesta=resp.intervalos;
     // app.preloader.hide();
      localStorage.setItem('fecha',fecha);
      if (respuesta.length>0) {
       // alerta('','Se encontraron horarios disponibles');
      }
      PintarIntervalos(respuesta);
      
      
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}

function PintarIntervalos(respuesta) {
  var html="";
 if (respuesta.length>0) {
    html+=`<option value="0">Seleccionar horario</option>`;

  for (var i = 0; i <respuesta.length; i++) {
    html+=`<option value="`+respuesta[i].horainicial+`_`+respuesta[i].horafinal+`">`+respuesta[i].horainicial+`-`+respuesta[i].horafinal+`</option>`;

  }
 }

 $("#v_horarios").html(html);

 //ObtenerEspecialistaHora();
}

function ObtenerEspecialistaHora() {
  var fecha=localStorage.getItem('fecha');
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');
  var horario=$("#v_horarios").val();
  var datos="fecha="+fecha+"&idpaquete="+paqueteid+"&idsucursal="+sucursal+"&horario="+horario+"&iduser="+iduser;

    var pagina = "ObtenerDisponibilidadHoraEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      
      var respuesta=resp.especialista;
      PintarEspecialista2(respuesta);
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}


function PintarEspecialista(respuesta) {
 var html="";
  console.log(respuesta);
  if (respuesta.length>0) {
        html+=`<div class="swiper-wrapper">`;

    for (var i = 0; i < respuesta.length; i++) {
      var materno=respuesta[i].materno!=null?respuesta[i].materno:'';
     /* html+=`
      <div class=" especialistassu sinseleccionar" onclick="ConsultarFechaHorariosEspecia(`+respuesta[i].idespecialista+`,'`+respuesta[i].costo+`')" style="" id="especialista_`+respuesta[i].idespecialista+`">
      <p style="margin:0px;"> `+respuesta[i].nombre+` `+respuesta[i].paterno+` `+materno+`
       $`+respuesta[i].costo+`</p>
      </div>`;*/


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
                 $`+respuesta[i].costo+`
                </h5>
                <span id="costo_`+respuesta[i].idespecialista+`" style="display:none;">`+respuesta[i].costo+`</span>
              
              </div>
          </div>
          
</div>
           </a>
           

          `;

    }


      html+=`</div>`;
      html+=`  <div class="swiper-pagination" style="bottom: -6px!important;"></div>`;

  }

 // $(".divpintarbarbero").html(html);



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
     var costo=$("#costo_"+dividirid).text();
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

        localStorage.setItem('precio',0);

         if (consulta==1) {

          ConsultarFechaHorariosEspecia(dividirid,costo);
                localStorage.setItem('precio',costo);

           //ConsultarPaqueteEspecialista(dividirid);
          }


   });


}

function ConsultarFechaHorariosEspecia(idespecialista,costo) {

        

/*  if ($("#especialista_"+idespecialista).hasClass('sinseleccionar')) {
      $(".especialistassu").removeClass('seleccionado');
      $(".especialistassu").addClass('sinseleccionar');

      $("#especialista_"+idespecialista).removeClass('sinseleccionar');
      $("#especialista_"+idespecialista).addClass('seleccionado');
      consulta=1;
      localStorage.setItem('idespecialista',idespecialista);
      localStorage.setItem('precio',costo);
    }else{

      $("#especialista_"+idespecialista).removeClass('seleccionado');
      $("#especialista_"+idespecialista).addClass('sinseleccionar');
      consulta=0;
      localStorage.setItem('idespecialista',0);
      localStorage.setItem('precio',0);

    }*/

//if (consulta==1) {
  var iduser=localStorage.getItem('id_user');
  var fecha=localStorage.getItem('fecha');
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var datos="fecha="+fecha+"&idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&iduser="+iduser;
  var pagina = "ObtenerDisponibilidadPaqueteEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var respuesta=resp.intervalos;
    
     // app.preloader.hide();
      localStorage.setItem('fecha',fecha);
      if (respuesta.length>0) {
       // alerta('','Se encontraron horarios disponibles');
      }
      arrayhorarios = respuesta;
      PintarIntervalos3(respuesta);
        horaseleccionada="";
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
  /*}else{
            $(".divhorarios").css('display','none');
            $(".divpintarhorarios").html('');
            horaseleccionada="";
            HabilitarBoton();

  }*/
}

function PintarIntervalos3(respuesta) {
   var html="";
    $(".divhorarios").css('display','none');

  if (respuesta.length>0) {
    $(".divhorarios").css('display','block');

    html+=`<div class="">`;
    for (var i = 0; i <respuesta.length; i++) { 
      html+=`<a class=" button button-fill button-small button-round horariossele sinseleccionarhora" style="" onclick="SeleccionarHorario4(this)" id="horario_`+i+`">`+respuesta[i].horainicial+`</a>`;
    }

    html+=`</div>`;
  }


  $(".divpintarhorarios").html(html);
}

function SeleccionarHorario4(objeto) {
  $(".horariossele").removeClass('seleccionadohora');
  objeto.classList.add('seleccionadohora');
  var idelemento=objeto.id;

  var posicion=idelemento.split('_')[1];
  horaseleccionada=arrayhorarios[posicion];

    HabilitarBoton2();
//aqui
  ObtenerListadoEspecialista();
}

function SeleccionarHorario3(i) {

  if ($("#horario_"+i).hasClass('sinseleccionarhora')) {
    
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

function PintarEspecialista2(respuesta) {
  var html="";
  if (respuesta.length>0) {
    html+=`<option value="0">Seleccionar barbero</option>`;
    for (var i =0;i<  respuesta.length; i++) {
      respuesta[i]
      html+=`<option value="`+respuesta[i].idespecialista+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`</option>`;
    }
  }else{
    html+=`<option value="0">No se encontraron barberos</option>`;


  }

  $("#v_especialista2").html(html);
}

function AgendarCita() {
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

      var html="";
        html+=`
        <p>¡Gracias!</p>
        <p>
      Tu cita ha sido agregada para el dia `+cita.fecha+` a las `+cita.horainicial+` con `+cita.nombre+` `+cita.paterno+`</p>
     <p>Para confirmar tu cita, realiza tu pago
      </p>
      `;

      var funcion="";
      funcion+=`
        <span class="dialog-button" id="btniracarrito" onclick="CerarModalD()">Cerrar</span>
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

function VerCarrito(){
 
    app.dialog.close();
  GoToPage('carrito');
}

function CrearModalAviso(html,funcion) {
  

  var html=`
  
           <div class="" style="text-align: center;">
              <div class="toolbar" style="display:none;">
                  <div class="toolbar-inner" >
                      <div class="left">

                      <span style="color:black;margin-left:1em;font-size: 14px;
          font-weight: bold;"></span></div>

                        <div class="right">
                         
                        </div>
                    </div>
              </div>

                <div class="sheet-modal-inner" style="">
                <div style="padding-top:1em;"></div>

                  <div id="" class="dialog-inner" style="font-size:20px;" >
                    `+html+`
                  </div>
                  <div class="dialog-buttons">
                    `+funcion+`
                  </div>
                        
                </div>



                  </div>
               </div>

        
              `;
      


 modaldialogo=app.dialog.create({
              title: '',
              text:'',
              content:html,

              buttons: [
              
                
              ],

              onClick: function (dialog, index) {

                  if(index === 0){
                   
                  }
                 
                
              },
              verticalButtons: true,
            }).open();
    

}

function ObtenerEspecialistaCosto() {
  var idpaquete=localStorage.getItem('idpaquete');
   var idsucursal=localStorage.getItem('idsucursal');
   var horario=$("#v_horarios").val();
   var fecha=localStorage.getItem('fecha');
   var idusuario=localStorage.getItem('id_user');
   var idespecialista=$("#v_especialista").val();
   var pagina = "ObtenerCostoPaquete.php";
   $("#demo-calendar-default").val('');
   $("#v_horarios2").html('');
   $("#v_horarios2").val(0);
   var datos="idpaquete="+idpaquete+"&idsucursal="+idsucursal+"&horario="+horario+"&fecha="+fecha+"&idusuario="+idusuario+"&idespecialista="+idespecialista;
 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      localStorage.setItem('idespecialista',idespecialista);
      var res=resp.costo[0];
      console.log(res);
    $(".precioriginal").text('$'+res.costo);
    localStorage.setItem('precio',res.costo);
    localStorage.setItem('cantidad',1);

   

      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}


function ObtenerEspecialistaCosto2() {
  var idpaquete=localStorage.getItem('idpaquete');
   var idsucursal=localStorage.getItem('idsucursal');
   var horario=$("#v_horarios").val();
   var fecha=localStorage.getItem('fecha');
   var idusuario=localStorage.getItem('id_user');
   var idespecialista=$("#v_especialista2").val();
   var pagina = "ObtenerCostoPaquete.php";

   var datos="idpaquete="+idpaquete+"&idsucursal="+idsucursal+"&horario="+horario+"&fecha="+fecha+"&idusuario="+idusuario+"&idespecialista="+idespecialista;
 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      localStorage.setItem('idespecialista',idespecialista);
      var res=resp.costo[0];
      console.log(res);
    $(".precioriginal").text('$'+res.costo);
    localStorage.setItem('precio',res.costo);
    localStorage.setItem('cantidad',1);

    $(".btnagendarcita").css('display','block');

      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}
function CargarEspecialista() {
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal;

    var pagina = "ObtenerEspecialistaPaqueteSucursal.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
      
      var respuesta=resp.especialista;
      PintarEspecialista(respuesta);
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}
   let calendarInline;

 var calendarDefault;
 var eventos=[];
var arraymes=['01','02','03','04','05','06','07','08','09','10','11','12'];
function AbrirCalendario() {
    
   
 
    ObtenerFechasCalendario('03','2023');
          
}

function ObtenerFechasDisponibles() {

      $("#demo-calendar-default").attr('onfocus','AbrirCalendario()');


}

function ObtenerFechasCalendario(mes,anio) {
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');
  var idespecialista=$("#v_especialista").val();
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio+"&iduser="+iduser;

  var pagina = "ObtenerFechasCalendario.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
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

   
    
      // Inline with custom toolbar
      var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        inputEl: '#demo-calendar-default',
        weekHeader: true,
         events: eventos,
        firstDay:0,
        dateFormat: 'dd/mm/yyyy',

         renderToolbar: function () {
          return `
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="left" style="margin-left:1em;">
                <a href="#" class="link "><i class="icon icon-back "></i></a>
              </div>
              <div class="center"></div>
              <div class="right" style="margin-right:1em;">
                <a href="#" class="link"><i class="icon icon-forward "></i></a>
              </div>
            </div>
          </div>
          `;
        },
        on: {
          init: function (c) {
            $(".calendar-year-selector").css('display','none');
            //$('.current-month-value').text(monthNames[c.currentMonth] + ' ' + c.currentYear);
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
  
            $(".calendar-month-selector").css('cssText' , 'justify-content: center!important');

            $(".calendar .toolbar").removeClass('toolbar-top');
          
            $(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
            
             $('.calendar-custom-toolbar .left .link').on('click', function () {
              calendarInline.prevMonth();
             // CargarFechasRefrescar1(calendarInline);

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
             // CargarFechasRefrescar1(calendarInline);

            });


      $(".calendar-day-today .calendar-day-number").addClass('diaactual');
      var fechaac=new Date();
            var mes=(fechaac.getMonth() + 1)<10?'0'+(fechaac.getMonth() + 1):(fechaac.getMonth() + 1);
          var dia=fechaac.getDate()<10?'0'+fechaac.getDate():fechaac.getDate();
          fecha=fechaac.getFullYear()+'-'+ mes+'-'+dia;
            //ConsultarFecha(fecha);


          },
         calendarChange:function (c) {
         
          var fechaac=new Date();
            var mes=fechaac.getMonth()+1;
          var dia=fechaac.getDate();
          fechaactualdata=fechaac.getFullYear()+'-'+ mes+'-'+dia;

            var fecha=c.getValue();

            var convertirfecha=new Date(fecha);
            var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
          var mesdata=convertirfecha.getMonth();

          var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
          var diadata=convertirfecha.getDate();

          fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
            ConsultarFechaHorarios(fecha1);
            var fechadata=convertirfecha.getFullYear()+'-'+mesdata+'-'+diadata;

              $(".calendar-day").each(function( index ) {
             var datafecha=$(this).data('date');

             if (datafecha==fechadata && datafecha!= fechaactualdata) {

              $(this).children().eq(0).addClass('seleccionado');
              //return 0;
             }else{

             $(this).children().eq(0).removeClass('seleccionado');

             }




        });
          
      
          },

            monthYearChangeStart: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
             //$('.current-month-value').text(monthNames[c.currentMonth] + ' ' + c.currentYear);
             console.log('entro');

          },


      monthYearChangeEnd: function (c) {
            $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
             //$('.current-month-value').text(monthNames[c.currentMonth] + ' ' + c.currentYear);
             console.log('entro change end');
           //  CargarFechasRefrescar1(calendarInline);

          },
          open:function (c) {
                 $(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
                 $(".calendar-day-event").css('display','none');
                 $(".calendar-day-weekend .calendar-day-number").addClass('nodisponible');

          },
          
        
        }
      });
     calendarInline.open();
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}


function HabilitarBotonAgendar() {
  var v_horarios2=$("#v_horarios2").val();

  if (v_horarios2!=0) {

    $(".btnagendarcita").css('display','block');
  }
}


function AgendarCita2() {

 // app.dialog.confirm('','¿Seguro que desea agendar una cita?' , function () {

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

      var html="";
       /* html+=`
        <p>Gracias</p>
        <p>Tu cita quedó agendada para el dia
       `+cita.fecha+` a las `+cita.horainicial+` con `+cita.nombre+` `+cita.paterno+`</p>
      `;*/

       html+=`
       
     <p style="margin-top: 60px;" class="`+estiloparrafo+`"> Para confirmar tu cita debes realizar el pago
      </p>
      `;

      var funcion="";
      funcion+=`
        <span class="dialog-button" id="btniracarrito" onclick="CerarModalD()">Cerrar</span>
      `;
      GoToPage('carrito');


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
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                            `+html+`

                            </div>
                          </div>

                          </div>

                 <div class="row margin-bottom " style="padding-top: 1em;margin-left: 3em;margin-right: 3em;margin-top:20px;">
                           

                            <div class="col-100" style="">
                            <button style="background: rgb(199, 170, 106);color: white;" type="button" class="button button-fill color-theme button-large button-raised cambiarfuente faustina" onclick="CerrarModalAntes()">Aceptar</button>
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
      
             $(".cambiarfuente").css('display','none');
            if (tipoletra!='') {
              
              $(".cambiarfuente").addClass(tipoletra);
              $(".cambiarfuente").css('display','block');

            }
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');
           
          },
        }
      });

       dynamicSheet1.open();


     // CrearModalAviso(html,funcion);
      
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
//});
}
var cacheespecialista=[];
function ObtenerListadoEspecialista() {
  // body...
    var idsucursal=localStorage.getItem('idsucursal');
    var idpaquete=localStorage.getItem('idpaquete');
    var fecha=localStorage.getItem('fecha');
    var horario=horaseleccionada.horainicial+'_'+horaseleccionada.horafinal;
    var datos='idsucursal='+idsucursal+"&idpaquete="+idpaquete+"&horaseleccionada="+horario+"&fecha="+fecha;
    var pagina = "ObtenerEspecialistaPaqueteSucursal.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    data:datos,
    success: function(datos){
      var especialistas=datos.especialista;
      cacheespecialista=especialistas;
     // PintarDetalleEspecialistas2(especialistas);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

  }

  function PintarDetalleEspecialistas2(respuesta) {
   

  var html="";
/*var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: white;">
            <div class="toolbar" style="background: black;">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: black; ">
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
                     <span class="titulomodal" style=" margin-top:1em;">Barberos</span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                  
                          <div class="">
                            <div class="" style="">
                              <div class="" style="">
                       
                              <div class="list">
                                <div>
                              `;*/

                              if (respuesta.length>0) {
                                for (var i = 0; i <respuesta.length; i++) {
                                    
                                    if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

                                                urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
                                                imagen='<img src="'+urlimagen+'" alt="" />';
                                                }else{

                                                    
                                                if (respuesta[i].sexo=='M') {

                                                  urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
                                          
                                                    }else{
                                                      urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
                                                
                                                    }

                                                  imagen='<img src="'+urlimagen+'" alt="" style="width:100px;"  />';
                                                }

                                  html+=`

                                  <div style="margin-top: 1em;" onclick="DetalleEspecialista2(`+respuesta[i].idespecialista+`,'`+respuesta[i].costo+`')" class="estilobarbero cambiarfuente">
                                  <div class="item-content">
                                  <div class="item-media">
                                   <div class="card-media">
                                    <a>
                                    <img src="`+urlimagen+`" alt="" style="width: 85px;border-radius: 50%;height: 80px;">
                                    </a>
                                  </div>

                                  </div>

                                  <div class="item-inner">
                                    <div class="">
                                      <div class="">
                                        <p style="margin:0;margin-left: 5px;font-weight: bold;">`+respuesta[i].nombre+` `+respuesta[i].paterno+`</p>
                                        <div class="row" style="">

                                        `;



                                      html+=  `
                  
                

                                        </div>
                                            <p style="margin:0;margin-left: 5px;"></p>
                                        </div>

                                  
                        
                                    </div>
                                    <div class="item-subtitle"></div>
                                    <div class="item-text"></div>
                                  </div>
                                  </div>
                                
                                </div>
                                  `;
                                }
                              }
                              
                             
              $(".divlistadobarbero").html(html);
                   
          
   /* dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           
      

          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
          close:function (sheet) {
            // BorrarIntervalo();
          
          },
        }
      });

       dynamicSheet1.open();*/
  }

function DetalleEspecialista2(idespecialista,costo) {
/*  dynamicSheet1.close();
*/
  localStorage.setItem('idespecialista',idespecialista);
  localStorage.setItem('precio',costo);

   
   ObtenerDetalleAntesdeAgendar();
   
    //AgendarCita2();

  //GoToPage('disponibilidadespecialista');

}

function ObtenerDetalleAntesdeAgendar(argument) {
   var idpaquete=localStorage.getItem('idpaquete');
   var idsucursal=localStorage.getItem('idsucursal');
   var horario=horaseleccionada.horainicial+'_'+horaseleccionada.horafinal;
   var fecha=localStorage.getItem('fecha');
   var idusuario=localStorage.getItem('id_user');
   var idespecialista=localStorage.getItem('idespecialista');
   var costo=localStorage.getItem('precio');

  
    var datos='idsucursal='+idsucursal+"&idpaquete="+idpaquete+"&horario="+horario+"&fecha="+fecha+"&idusuario="+idusuario+"&idespecialista="+idespecialista+"&costo="+costo;
    var pagina = "ObtenerDetalleAntesdeAgendar.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    data:datos,
    success: function(resp){

        var dia=resp.fecha;
        var hora=horaseleccionada.horainicial+' Hrs.';
        var paquete=resp.paquete[0].nombrepaquete;
        var especialista=resp.especialista[0].nombre+' '+resp.especialista[0].paterno;
      var html="";
        html+=`

        <p style="text-align: justify;margin-top: 60px;" class="`+estiloparrafo+`">
      Tu cita quedará agendada el dia <span style="color:white">`+dia+`</span> a las <span style="color:white">`+hora+`</span> 
      con el servicio <span style="color:white">`+paquete+`</span> atendido por el barbero <span style="color:white">`+especialista+`</span>.</p>
      <p style="" class="`+estiloparrafo+`">¿Es correcto?</p>
     
      `;

      var funcion="";
      funcion+=`
        <span class="dialog-button" id="btniracarrito" onclick="AgregarAgenda()">Si</span>
        <span class="dialog-button" id="btniracarrito" onclick="CerarModalD()">No</span>

      `;
     // CrearModalAviso(html,funcion);

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
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="AgregarAgenda()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAntes()">No</button>
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
      
             $(".cambiarfuente").css('display','none');
            if (tipoletra!='') {
              
              $(".cambiarfuente").addClass(tipoletra);
              $(".cambiarfuente").css('display','block');

            }
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');
           
          },
        }
      });

       dynamicSheet1.open();
     
      
    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

}

function AgregarAgenda() {
  dynamicSheet1.close();
 AgendarCita2();

}

function CerrarModalAntes() {
  dynamicSheet1.close();
}


function CargarCalendarioDispo() {
  //todos los dias que no tengan disponibilidad se bloqueen
  //color negro lo disponible 
  //al darle click colocar en botones los paquetes
  //al seleccionar un producto colocar los horarios solo la hora inicial distinguir am y pm
  var paqueteid=localStorage.getItem('idpaquete');
  var fecha=new Date();
  var anio = fecha.getFullYear();
  var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);
  var iduser=localStorage.getItem('id_user');
  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=localStorage.getItem('idespecialista');
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio+"&iduser="+iduser;
  var pagina = "ObtenerFechasCalendario.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];
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

     var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      calendarInline = app.calendar.create({
        containerEl: '#demo-calendar',
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
              RefrescarFechas2(c);
             localStorage.setItem('fecha','');
             HabilitarBotonContinuar();

            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
              RefrescarFechas2(c);
            localStorage.setItem('fecha','');
            HabilitarBotonContinuar();
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
           
           localStorage.setItem('fecha',fecha1);
     
          //ConsultarFechaHorarios();
          //horaseleccionada="";
          HabilitarBotonContinuar();
          //aqui
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

function RefrescarFechas2() {
   var mes = calendarInline.currentMonth;
  var anio = calendarInline.currentYear;
  var mes=(mes + 1)<10?'0'+(mes + 1):(mes + 1);
  var iduser=localStorage.getItem('id_user');
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var idespecialista=localStorage.getItem('idespecialista');
  var datos="idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&mes="+mes+"&anio="+anio+"&iduser="+iduser;

  var pagina = "ObtenerFechasCalendario.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
       eventos=[];
       nodisponiblejs=[];
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

         calendarInline.params.events = eventos;
         calendarInline.params.disabled = nodisponiblejs;

         calendarInline.update();
          $(".calendar-day-has-events .calendar-day-number").addClass('calendarevento');
          $(".calendar-day-event").css('display','none');
          $(".calendar-day-weekend .calendar-day-number").addClass('nodisponible');

            $(".divpintarhorarios").html('');
            $(".divhorarios").css('display','none');
            $(".divpintarservicios").html('');
            $(".divservicios").css('display','none');
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
}


function ConsultarFechaHorarios() {

         // app.preloader.show();
  var fecha=localStorage.getItem('fecha');
  var paqueteid=localStorage.getItem('idpaquete');
  var sucursal=localStorage.getItem('idsucursal');
  var iduser=localStorage.getItem('id_user');
  var idespecialista=0;
  var datos="fecha="+fecha+"&idpaquete="+paqueteid+"&idsucursal="+sucursal+"&idespecialista="+idespecialista+"&iduser="+iduser;
  var pagina = "ObtenerDisponibilidadPaqueteEspecialista.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var respuesta=resp.intervalos;
      arrayhorarios=respuesta;
       //calendarInline.close();
     // app.preloader.hide();
      localStorage.setItem('fecha',fecha);
      if (respuesta.length>0) {
       // alerta('','Se encontraron horarios disponibles');
      }
      PintarIntervalos2(respuesta);
     
      
      //resolve(respuesta);
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}

function PintarIntervalos2(respuesta) {
  var html="";
    $(".divhorarios").css('display','none');

  if (respuesta.length>0) {
    $(".divhorarios").css('display','block');

    html+=`<div class="">`;
    for (var i = 0; i <respuesta.length; i++) { 
      html+=`<a class=" button button-fill button-small button-round cambiarfuente horariossele sinseleccionarhora" style="" onclick="SeleccionarHorario4(this)" id="horario_`+i+`">`+respuesta[i].horainicial+`</a>`;
    }

    html+=`</div>`;
  }


  $(".divpintarhorarios").html(html);

}

function CerarModalD() {
  
  modaldialogo.close();
}

function HabilitarBoton2() {

  if (horaseleccionada!='') {
    $(".btncontinuarcita2").css('display','block');

  }else{
   $(".btncontinuarcita2").css('display','none');
 
  }
}

function ValidarAntesListadoEspecialista() {
  // body...
  console.log(cacheespecialista);
  if (cacheespecialista.length>0) {

    AbrirModalPreguntaElegir();
   // GoToPage("listadoespecialista");
  }else{
    
    var aviso="Barberos no disponibles";
    AbrirModalAviso(aviso);
  }
  

}

function AbrirModalPreguntaElegir() {
  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
           
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
                          <div class="row" style="margin-left: 2em;margin-right: 2em;margin-top:20px;">
                          <div class="col-100">
                          <p class="cambiarfuente cambiarfuente2 `+estiloparrafo+`" style="color: #c7aa6a;text-align: center;">¿Deseas un barbero en especial?</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente cambiarfuente2" onclick="ElegirBarbero()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente cambiarfuente2" onclick="BuscarBarberoDisponible()">No</button>
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
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           idcortesiaelegida=0;
           $(".cambiarfuente2").css('display','none');
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }
          $(".cambiarfuente2").css('display','block');

          },
        }
      });

       dynamicSheet1.open();
}

function BuscarBarberoDisponible() {
   var idsucursal=localStorage.getItem('idsucursal');
    var idpaquete=localStorage.getItem('idpaquete');
    var fecha=localStorage.getItem('fecha');
    var horario=horaseleccionada.horainicial+'_'+horaseleccionada.horafinal;
    var datos='idsucursal='+idsucursal+"&idpaquete="+idpaquete+"&horaseleccionada="+horario+"&fecha="+fecha;
    var pagina = "ObtenerEspecialistaPaqueteSucursal.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    data:datos,
    success: function(datos){
             dynamicSheet1.close();

      var especialista=datos.especialista;
      var elementoaleatorio=obtenerElementoAleatorio(especialista);

      DetalleEspecialista2(elementoaleatorio.idespecialista,elementoaleatorio.costo);

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}

function ElegirBarbero() {
  dynamicSheet1.close();
  GoToPage('listadoespecialista')
}

function obtenerElementoAleatorio(arr) {
  const indiceAleatorio = Math.floor(Math.random() * arr.length);
  return arr[indiceAleatorio];
}
/*function DisponibilidadBarbero(idpaquete) {
localStorage.setItem('idpaquete',idpaquete);
  ObtenerListadoEspecialista();
}*/