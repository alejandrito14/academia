
function CargarCalendario6() {

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