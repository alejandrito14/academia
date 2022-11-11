
function AbrirPantallaNotificacion() {


		  $("#popupmenu").removeClass('modal-in');
		  $("#popupmenu").addClass('modal-out');
		  $("#popupmenu").css('display','none');
		  $(".popup-backdrop").removeClass('backdrop-in');
		  $("#popupmenu").remove();

		  $(".ptr-content").css('overflow','scroll');
   


         GoToPage("notificacion");

}

function AbrirCerrar() {
	
	
	
}



function AbrirMenu() {

	if (abrir==0) {
				  $(".popup").remove();

		abrir=1;

				nombre=localStorage.getItem("nombre");
				paterno=localStorage.getItem("paterno");
				materno=localStorage.getItem("materno");

				nombrecompleto=nombre+' '+paterno+' '+materno;
	 var dynamicPopup = app.popup.create({
        content: `
         <div class="popup " id="popupmenu" style="overflow: scroll;height:90%!important;">

        <div style="height: 90px;width: 100%;background: gray;">
          
          <div class="" style="    margin-left: 1em;
    margin-right: 1em;">
            <div class="list media-list otralista">
            <ul class="menufondo">

          <li>
            <a href="#" class="item-link item-content">
              <div class="item-media"><img class="imagencliente2" id="imagencliente2" style="border-radius: 100%;height: 62px;" width="60" /></div>
              <div class="item-inner">
                <div class="">
                  <div class="item-title" style="color: white!important;">Hola<span style="padding-left: .2em;" class="nombreusuario">`+nombrecompleto+`</span></div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
          </div>

        </div>
    <div class="block" >
     <!--  <p style="right: 0;position: absolute;top:0;"><a class="link popup-close" href="#"><span class="material-icons material-icons-outlined">
cancel
</span></a></p> -->
      
     <div style="">
      
      <div class="list media-list">
        <ul>



          <li>
            <a onclick="verestatus(0)" class="item-link item-content">
              <div class="item-media">
                
                <i class="icon material-icons " style="color: #f1853c;">shopping_cart</i>
              </div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title"> 

                  Pedidos</div>
                  <div class="item-after"></div>
                </div>
                <div class="item-subtitle"></div>
                <div class="item-text"></div>
              </div>
            </a>
          </li>
        
          <li>
            <a onClick="salir_app();" class="item-link item-content">
               <div class="item-media">
                
                <i class="icon material-icons material-icons-outlined " style="color: #1f5004;">exit_to_app</i>



              </div>

              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">Salir</div>
                  <div class="item-after"></div>
                </div>
                <div class="item-subtitle"></div>
                <div class="item-text"></div>
              </div>
            </a>
          </li>
        
        </ul>
      </div>

     </div>
    </div>
  </div>
        `,
        // Events
        on: {
          open: function (popup) {
            console.log('Popup open');
          },
          opened: function (popup) {
            console.log('Popup opened');
          },
        }
      });

	  dynamicPopup.open();
	  CargarFoto();

	}else{
		  $(".popup").removeClass('modal-in');
		  $(".popup").addClass('modal-out');
		  $(".popup").css('display','none');
		  $(".popup-backdrop").removeClass('backdrop-in');
		  $(".popup").remove();

		  abrir=0;

	}
}

function Remover() {

	 $(".popup-backdrop").remove();

}


function ObtenerCantidadNuevas() {

	var iduser=localStorage.getItem('id_user');
	
		var datos="iduser="+iduser;
		var pagina = "ObtenerNuevasNotificaciones.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resultado){

			$(".badge6").text(resultado.respuesta);

			if (resultado.respuesta>0) {

				$('.badge6').css('visibility','visible');

			}else{

			$('.badge6').css('visibility','hidden');
	
			}
			

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
	
}


function ObtenerListadoNotificaciones() {
		var iduser=localStorage.getItem('id_user');
	
		var datos="iduser="+iduser;
		var pagina = "ObtenerNotificacionesUsuario.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resultado){
			var r=resultado.respuesta;
			PintarNotificaciones(r);
			

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarNotificaciones(r) {
		var html='';
	if (r.length>0) {

		for (var i = 0; i <r.length; i++) {

			var dividir=r[i].texto.split('|');

			if (r[i].estatus==0) {

				background='background: #ececec';
				palomita='<i style="color:red;" class="bi bi-circle"></i>';
				negritas='font-weight: bold;';
			}else{
 
				background='background: #fefefe';
				palomita='<i style="color:green;" class="bi bi-check-circle"></i>';
				negritas='';
			}

			if (r[i].ruta=='') {
				r[i].ruta=0;
			}

			if (r[i].valor=='') {
				r[i].valor=0;
			}

			html+=`

				 <li style="`+background+`;border-radius: 10px;    margin-top: 1em;
    margin-bottom: 1em;" >
            <div class="item-content">
              <div class="item-media">`+palomita+`</div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title"></div>
                </div>
                <div onclick="CambiarEstatusNotificacion(`+r[i].idnotificacioncliente+`)">`;
                	
                	for (var j = 0; j < dividir.length; j++) {
                	    
                	    html+=`<div class="item-subtitle" style="`+negritas+`white-space: break-spaces;">`+dividir[j]+`</div> `
							if (j==1) {
								html+=`<div class="item-subtitle" style="`+negritas+`white-space: break-spaces;">`+r[i].fechaformato+`</div>`;
							}
                	}
                	

                	 html+=`
                	</div>`



              html+=` </div>

              </div>

               <div class="item-after">
          		<span id="span_`+r[i].idnotificacioncliente+`" class="" onclick="Visualizarpagina(\'`+r[i].ruta+`\',`+r[i].valor+`,`+r[i].idnotificacioncliente+`)" style="
				    float: right;
				   	"></span>
				</div>

            </div>
          </li>

			`;


		}


		$("#listadonotificaciones").html(html);






	}else{



	}


	if (localStorage.getItem('idnotificacioncliente')!=0 && localStorage.getItem('idnotificacioncliente')!='') {
			var idnotificacioncliente=localStorage.getItem('idnotificacioncliente');
			//$("#span_"+idnotificacioncliente).text('remove_circle');
			$("#informacion_"+idnotificacioncliente).css('display','block');


		}
}

function Visualizarpagina(pagina,valor,idnotificacioncliente) {

	if (localStorage.getItem('idnotificacioncliente')==idnotificacioncliente) {
			

			$("#span_"+idnotificacioncliente).text('add_circle');
			$("#informacion_"+idnotificacioncliente).css('display','none');
			localStorage.setItem('idnotificacioncliente',0);


	}else{
	
	CambiarEstatusNotificacion(idnotificacioncliente);

	}

}

function CambiarEstatusNotificacion(idnotificacioncliente) {
	
		var datos="idnotificacioncliente="+idnotificacioncliente;
		var pagina = "CambiarEstatusNotificacion.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resultado){
			var resp=resultado.notificacion;
			ObtenerListadoNotificaciones();
			localStorage.setItem('valor',idnotificacioncliente);
			/*if (resp.ruta!='') {
				localStorage.setItem('valor',resp.valor);
				GoToPage(resp.ruta);
			}*/
		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}