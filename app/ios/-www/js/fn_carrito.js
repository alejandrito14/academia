function PintarCantidadcarrito() {
var idusuario=localStorage.getItem('id_user');

var datos="idusuario="+idusuario;
var pagina="ObtenerCarrito.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      var res=resp.respuesta;
  $(".btniracarrito").css('display','none');
    if (res.length>0) {
      
        $(".btniracarrito").css('display','block');
        $(".bcantidadcarrito").text(res.length);      
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

function CargarCarrito() {
var idusuario=localStorage.getItem('id_user');

var datos="idusuario="+idusuario;
var pagina="ObtenerCarrito.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
    	var res=resp.respuesta;
      if (res.length>0) {
        PintarCarrito(res);
        var total=formato_numero(resp.totalcarrito,2,'.',',');
        $(".totalcarrito").text(total);
        localStorage.setItem('sumatotalapagar',total);
      
      }else{

        GoToPage('home');
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

function ActualizarValoresCarrito() {
var idusuario=localStorage.getItem('id_user');
var datos="idusuario="+idusuario;
var pagina="ActualizarValoresCarrito.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
     

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}

function PintarCarrito(respuesta) {

	var html="";
      $("#cantidadagregados").text(respuesta.length);

	if (respuesta.length>0) {

    var numero=respuesta.length;

		for (var i = 0; i < respuesta.length; i++) {
      var estilo="";
      var estilolista="itemcarrito1";
         if (numero % i === 0) {
          estilolista="itemcarrito2";
        }
      if (respuesta[i].foto!='' && respuesta[i].foto!=null ) {
          imagen=urlimagenes+'paquetes/imagenespaquete/'+codigoserv+respuesta[i].foto;
  
        }else{
            estilo="opacity:0.2";
          imagen=localStorage.getItem('logo');
        }

        html+=`
          <li class="item-content cambiarfuente `+estilolista+`" style="    margin-top: 1em;
    margin-right: 1em;
    margin-left: 1em;
    border-bottom: 1px solid;
    margin-bottom: 1em;">
            <div class="row" style="margin-bottom: 10px;">
              <div class="col-70">
                <div class="icon-text-container">`;
                if (respuesta[i].servicio==1) {
                  etiqueta="Servicio";
                }

                if (respuesta[i].servicio==0) {
                  etiqueta="Producto";
                }

               html+=`
               <span class="material-icons-outlined">inventory_2
                </span> <p style="margin:0;">`+etiqueta+`: <span class="texto">`+respuesta[i].nombrepaquete+`</span>
                </p>

                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                <span class="material-icons-outlined">local_atm</span>
                  <p style="margin:0;">Costo: <span class="texto">$`+respuesta[i].costototal+`</span>
                  </p>
                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                 <span class="material-icons-outlined">
                    add_business
                    </span>
                    <p style="margin:0;">
                   
                    Negocio: <span class="texto">`+respuesta[i].titulo+`</span></p>
                     </div>
                    `;

                       if (respuesta[i].servicio==0) {
                   html+=` <p>
                       
                        <div class="stepper stepper-small stepper-init cantidads_`+respuesta[i].idcarrito+`" id="c_`+respuesta[i].idcarrito+`">
                          <div class="stepper-button-minus" style="border:0;" ></div>
                          <div class="stepper-input-wrap" style="border:0;">
                            <input type="text" id="cantidad_`+respuesta[i].idcarrito+`" value="`+respuesta[i].cantidad+`"  min="1" max="100" step="1" readonly />
                          </div>
                          <div class="stepper-button-plus" style="border:0;" ></div>
                        </div>
                     

                    </p>`; 
                  }else{


                    html+=` 
                        <div class="icon-text-container" style="margin-top: 10px;">
                        <span class="material-icons-outlined">supervised_user_circle</span>
                    <p style="margin:0;">Barbero: <span class="texto">`+respuesta[i].usuarioespecialista+`</span></p>
                    </div>
                    `;
                    html+=`
                   <div class="icon-text-container" style="margin-top:10px;">
                     <span class="material-icons-outlined">calendar_month</span>

                     <p style="margin:0;">Fecha/Hora: <span class="texto">`+respuesta[i].fechaformato+`</span></p>

                     </div>
                     `;

                        if (respuesta[i].concortesia==1  ) {


                          if (respuesta[i].idcortesia>0 ) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">`+respuesta[i].nombrepaquetecortesia+`</span></p>

                           </div>`;

                      }


                      if (respuesta[i].idcortesia==0 && respuesta[i].colococortesia==1) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">Ninguna</span></p>

                           </div>`;
                      }

                       /* html+=`
                        <div class="col-100" style="padding-bottom: 1em;
    padding-top: 1em;">
                      <button class="button  color-theme  " style="background:#C7AA6A;padding:10px 20px;" onclick="ObtenerCortesia(`+respuesta[i].idcarrito+`,`+respuesta[i].idpaquete+`)">
                        Cortesia
                       </button>
                     
                     </div>
                      `;*/

                    }else{

                 
          

                    }
                  }

                  

              html+=` </div>
                <div class="col-30">`;

                  if (respuesta[i].precioante!=0) {
                     html+=`
                     <div class="col-100">
                     <p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta[i].precioante+`</p>
                     </div>
                     `;

                  }


                   html+=`
                   <div class="col-100">
                      <button class="button color-red" onclick="AbrirModalEliminarProductoCarrito(`+respuesta[i].idcarrito+`,'`+respuesta[i].nombrepaquete+`')">
                        <span class="material-icons-outlined" style="font-size: 30px;margin-left:1em;margin-right:1em;">
                        delete
                        </span>
                       </button>
                     
                     </div>
                     `;

                 



             html+=` </div>

            </div>
          </li>

        `;

			/*html+=`
			<li class="item-content">
              <div class="item-media">
              <img src="`+imagen+`" alt="" style="    width: 100px;
    border-radius: 10px;`+estilo+`"></div>
              <div class="item-inner">
                <div class="row">
                  <div class="col-60">
                    <p style="margin:0;">`+respuesta[i].nombrepaquete+`</p>
               	    <p style="margin:0;">`+respuesta[i].titulo+`</p>
                    `;
                    if (respuesta[i].servicio==0) {
                   html+=` <p>
                       
                        <div class="stepper stepper-small stepper-init cantidads_`+respuesta[i].idcarrito+`" id="c_`+respuesta[i].idcarrito+`">
                          <div class="stepper-button-minus" style="border:0;" ></div>
                          <div class="stepper-input-wrap" style="border:0;">
                            <input type="text" id="cantidad_`+respuesta[i].idcarrito+`" value="`+respuesta[i].cantidad+`"  min="1" max="100" step="1" readonly />
                          </div>
                          <div class="stepper-button-plus" style="border:0;" ></div>
                        </div>
                     

                    </p>`; 
                  }else{


                    html+=` <p style="margin:0;">`+respuesta[i].usuarioespecialista+`</p>`;
                    html+=` <p style="margin:0;">`+respuesta[i].fechaformato+`</p>`;


                  }

                  html+=`</div>	

                  <div class="col-40">`;

                  if (respuesta[i].precioante!=0) {
                     html+=`<p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta[i].precioante+`</p>`;

                  }

                    html+=` <p style="margin:0;">$`+respuesta[i].costototal+`</p>
                     <p><button class="button color-red" onclick="EliminarProductoCarrito(`+respuesta[i].idcarrito+`,'`+respuesta[i].nombrepaquete+`')">
                        <span class="material-icons-outlined" style="font-size: 30px;">
                        delete
                        </span>
                       </button>
                     </p>
                  </div>
                 </div>`;

               

                html+=` </div>

              </div>
            </li>

			`;*/

    
		}
	}


	$(".listadocarrito").html(html);
 // Destruir();
  Inicializar();
}
function Destruir() {
  $('.stepper').each(function(index, stepperEl) {
      var stepper =app.stepper.get(stepperEl);


  });
}

function Inicializar() {
 $('.stepper').each(function(index, stepperEl) {
  var stepper = app.stepper.create({
    el: stepperEl,
    on: {
        stepperChange: function (e) {
      
          var id=e.el.id;
          var dividir=id.split('_')[1];
          var valor=e.value;
          e.setValue(valor);
          SumarCarrito(dividir,valor);
           
        }
    }
});
})
}
function SumarCarrito(idcarrito,valor) {


          var pagina="SumarCarrito.php";
         // var cantidad=$("#cantidad_"+idcarrito).val();
         var datos="idcarrito="+idcarrito+"&operacion=1"+"&cantidad="+valor;

    
           $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp+pagina,
            data:datos,
            success: function(resp){

              CargarCarrito();
              $("#divdescuentoaplicado").css('display','none');
              localStorage.setItem('idcupon',0);
              localStorage.setItem('montocupon',0);
              localStorage.setItem('codigocupon','');

            },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                var error;
                    if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                    if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                        //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
              }

            });
          

 
}

function AbrirModalEliminarProductoCarrito(idcarrito,nombre) {
  var aviso='¿Seguro que desea eliminar '+nombre+' del carrito?';

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
                          <p class="cambiarfuente cambiarfuente2" style="color: #c7aa6a;font-size: 30px;text-align: center;line-height: 1;" class="cambiarfuente `+estiloparrafo+`">`+aviso+`</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="EliminarProductoCarrito(`+idcarrito+`,'`+nombre+`')">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAviso()">No</button>
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

/*function RestarCarrito(idcarrito) {
  var datos="idcarrito="+idcarrito+"&operacion=0";
  var pagina="SumarCarrito.php";


         
   if (cantidad>0) {

   $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    success: function(resp){
        CargarCarrito();

 
    
    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });

       }else{

            $("#cantidad_"+idcarrito).val(1);
          }



}*/

function EliminarProductoCarrito(idcarrito,nombre) {
  dynamicSheet1.close();
 // app.dialog.confirm('','¿Seguro que desea eliminar '+nombre+' del carrito?' , function () {
    var id_user=localStorage.getItem('id_user');
  var pagina = "EliminarProductoCarrito.php";
  var datos="id_user="+id_user+"&idcarrito="+idcarrito;
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    success: function(resp){

      
        CargarCarrito();
      
    
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

function IrAPago() {

  var idusuario=localStorage.getItem('id_user');

  var invitado=localStorage.getItem('invitado');



      var promesa=VerificarProductosCarritoConCortesia();
         promesa.then(r => {
          var carrito=r.respuesta;
          var concortesia=r.concortesia;
          var cortesiasporagregar=r.cortesiasporagregar;
            if (carrito.length>0 && concortesia==1 && cortesiasporagregar>0) {


              ObtenerCortesia(carrito[0].idcarrito,carrito[0].idpaquete);
 
            }else{

              AbrirModalNecesitas();
            }

        });


      //GoToPage('resumenpago');
    //}

       
   
}

function VerificarCarrito() {
  return new Promise(function(resolve, reject) {

  var idusuario=localStorage.getItem('id_user');
  var datos="idusuario="+idusuario;
  var pagina="ObtenerCarrito.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

     
      resolve(resp);
    
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

function RegesoCarrito(argument) {
  
  var idusuario=localStorage.getItem('id_user');

  var invitado=localStorage.getItem('invitado');




      var promesa=VerificarCarrito();
         promesa.then(r => {
          var carrito=r.respuesta;
         
            if (carrito.length>0 ) {


              AbrirModalDeseasConservarlo();
 
            }else{

              GoToPage('detallesucursal');
              
            }

        });
}


function AbrirModalDeseasConservarlo() {
 
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
                          <p  style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`">Tienes algo pendiente por pagar</p>
                          <p  style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`">¿Deseas conservarlos?</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="IrSucursal()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="LimpiarCarrito()">No</button>
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
           $(".cambiarfuente").css('display','none');
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }
          $(".cambiarfuente").css('display','block');

          },
        }
      });

       dynamicSheet1.open();
}

function LimpiarCarrito() {

  var id_user=localStorage.getItem('id_user');
  var datos="id_user"+id_user;
  var pagina = "EliminarCarrito.php";
  var datos="id_user="+id_user;
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    success: function(resp){

       dynamicSheet1.close();
    GoToPage('detallesucursal');
      
    
   },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }

    });

 
}


function AbrirModalNecesitas() {
 
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
                          <div class="row" style="margin-left: 1em; margin-right: 1em; margin-top: 60px;">
                          <div class="col-100">
                          <p style="color: #c7aa6a;text-align: center;" class="cambiarfuente cambiarfuente2 `+estiloparrafo+`">¿Necesitas algo más?</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="IrServiciosProductos()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="IrAResumenpago()">No</button>
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

function IrSucursal() {
  dynamicSheet1.close();
  GoToPage('detallesucursal');
}

function IrServiciosProductos() {
    dynamicSheet1.close();
  GoToPage('detalleproductoservicios');
}

/*function IrApago2(argument) {
  dynamicSheet1.close();
  GoToPage('resumenpago');


}*/

function IrAResumenpago(argument) {
  dynamicSheet1.close();
  
   var nombre=localStorage.getItem('nombre');
  if (nombre=='Invitado' || nombre=='') {
   
      //GoToPage('celular');

      AbrirModalAvisoLogin();
    
  }else{

     // var monedero=localStorage.getItem('monedero');
       var promesa= ConsultarMonedero();
         promesa.then(r => {
            var monedero=r.respuesta;

            if (monedero>0) {
                AbrirModalMonedero();
              
              }else{

              GoToPage('escogermetodopago');
            }

         });
    
    

      
      
  }


}

function AbrirModalAvisoLogin() {
   var parrafo=`<p class="cambiarfuente `+estiloparrafo+`" >Para continuar es necesario tu registro</p>`;
       parrafo+=`<p class="cambiarfuente `+estiloparrafo+`" >¿Estas registrado?</p>`;

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
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;text-align: center;
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
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="IraLogin()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="IraRegistroCelular()">No</button>
                            </div>
                          </div>
                          `;

                      
                         html+=` </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                         

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

function IraRegistroCelular(argument) {
     dynamicSheet1.close();
     GoToPage('celular');
 } 

 function CerrarModalAviso(argument) {
     dynamicSheet1.close();

 }

 function IraLogin(argument) {
   dynamicSheet1.close();
     GoToPage('login');
 }

function AbrirModalMonedero() {
  monederousuario=0;
  var promesa= ConsultarMonedero();
         promesa.then(r => {
           monederousuario=r.respuesta;
           
  
  var parrafo="<p class='cambiarfuente "+estiloparrafo+"' >Tienes en monedero $"+monederousuario+"</p>";
      parrafo+="<p class='cambiarfuente "+estiloparrafo+"'  >¿Deseas utilizarlo?</p>";


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
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="AbrirMonedero()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="IrAmetodopago()">No</button>
                            </div>
                          </div>
                          `;

                      
                         html+=` </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100"><button style="background: #C7AA6A;display:none;" type="button" class="button button-fill color-theme button-large button-raised btnagregarcortesia cambiarfuente" onclick="">Aceptar</button></div>
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

     });
     
}

function AbrirMonedero(){
  dynamicSheet1.close();
   var promesa= VerificarCarritoMonedero();
         promesa.then(r => {
          monederousuario=r.monederoporusar;
          monederousado=r.monederousado;
          localStorage.setItem('monedero',monederousado);
         // console.log(r.respuesta);
          if (r.respuesta.length>0) {
              var carritomonedero=r.respuesta[0];
              console.log(carritomonedero);
              AbrirModalAgregarMonedero(carritomonedero,monederousuario);
          
            }else{

            GoToPage('escogermetodopago');

          }

  

        });
 
}

function AbrirModalAgregarMonedero(carritomonedero,monederoporusar) {
           // console.log(carritomonedero);
            var montopago=(carritomonedero.costototal-carritomonedero.montocupon);
            var valor=parseFloat(montopago);
              if (parseFloat(montopago)>=parseFloat(monederoporusar)) {

               valor=monederoporusar;
               
              }

              if(parseFloat(monederoporusar)<=parseFloat(montopago)) {
                     valor=monederoporusar;

              }

                if(parseFloat(monederoporusar)>=parseFloat(montopago)) {
                     valor=montopago;

              }

 /* var parrafo="<p class='cambiarfuente "+estiloparrafo+"' style='margin:0;'><span style='color:white'>Total</span></p>";
      parrafo+="<p class='cambiarfuente "+estiloparrafo+"' style='margin:0;'>$"+sumatotalapagar+"</p>"
      parrafo+="<p class='cambiarfuente "+estiloparrafo+"' style='margin:0;'><span style='color:white'>Monedero disponible</span></p>";
      parrafo+="<p class='cambiarfuente "+estiloparrafo+"' style='margin:0;'>$"+r.respuesta+"</p>"*/
     var parrafo="<p class='cambiarfuente "+estiloparrafo+"'>"+carritomonedero.nombrepaquete+"</p>";
     var resta=carritomonedero.costototal-carritomonedero.montocupon;
         parrafo+="<p class='cambiarfuente "+estiloparrafo+"'> $"+formato_numero(resta,2,'.',',')+"</p>";

      parrafo+="<p class='cambiarfuente "+estiloparrafo+"' style='' >¿Cuanto deseas utilizar?</p>"

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
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;">
                          <div class="col-100">
                              <form>
                            <div class="list" style="margin:0;">
                              <ul class="row">
                                <li class="item-content col-100 item-input item-input-with-value">
                                  <div class="item-inner">
                                    <div class="item-input-wrap">
                                      <input type="text" placeholder="" value="`+valor+`" id="monederousado" class="form-control"/>
                                    </div>
                                  </div>
                                </li>

                                </ul>
                                </div>


                                </form>

                           <div id="txtadvertencia" style="color:red;"></div>

                          </div>

                          </div>`;

                          html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;display:flex;justify-content:center;">
                            <div class="col-100">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="ColocarMonederoUsar(`+montopago+`,`+monederoporusar+`,`+carritomonedero.idcarrito+`)">Aceptar</button>
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
           idcortesiaelegida=0;

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
function IrAmetodopago(){
 dynamicSheet1.close();
 GoToPage('escogermetodopago');
}
var monederousuario=0;


function ColocarMonederoUsar(costocarrito,monederoporusar,idcarrito) {

   $("#txtadvertencia").text('');
    var txtcantidad=parseFloat($("#monederousado").val());

    var sumatotalapagar=localStorage.getItem('sumatotalapagar');
    if (monederoporusar>0) {
  if (txtcantidad!='' &&txtcantidad!=0){
      if (txtcantidad>monederoporusar) {
         $("#txtadvertencia").text('La cantidad supera el monedero disponible');
         //alerta('','La cantidad supera el monedero acumulado');

      }else{



        if (txtcantidad>costocarrito) {
          console.log('1');
          $("#txtadvertencia").text('La cantidad ingresada es mayor al total');
             // alerta('','La cantidad ingresada es mayor al total');

        }else{
            if (txtcantidad>0) {
            //localStorage.setItem('monedero',txtcantidad);
              dynamicSheet1.close();
           // GoToPage('escogermetodopago');
              GuardarMonederoCarrito(idcarrito,txtcantidad);
           }


        }
      
      }

    }else{
                    
        alerta('','Ingrese una cantidad válida')
      }

  }else{

       

    alerta('','No cuenta con monedero acumulado');
  }
}

function GuardarMonederoCarrito(idcarrito,txtcantidad) {
   var datos="idcarrito="+idcarrito+"&txtcantidad="+txtcantidad;
   var pagina="GuardarMonederoCarrito.php";
   $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      AbrirMonedero();
    
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}

/*function ColocarMonederoUsar() {

   $("#txtadvertencia").text('');
    var txtcantidad=parseFloat($("#monederousado").val());

    var sumatotalapagar=localStorage.getItem('sumatotalapagar');
    if (monederousuario>0) {
  if (txtcantidad!='' &&txtcantidad!=0){
      if (txtcantidad>monederousuario) {
         $("#txtadvertencia").text('La cantidad supera el monedero acumulado');
         //alerta('','La cantidad supera el monedero acumulado');

      }else{



        if (txtcantidad>parseFloat(sumatotalapagar)) {
          console.log('1');
          $("#txtadvertencia").text('La cantidad ingresada es mayor al total');
             // alerta('','La cantidad ingresada es mayor al total');

        }else{
            if (txtcantidad>0) {
            localStorage.setItem('monedero',txtcantidad);
             dynamicSheet1.close();
            GoToPage('escogermetodopago');

      }


        }
      
      }

    }else{
                    
        alerta('','Ingrese una cantidad válida')
      }

  }else{

       

    alerta('','No cuenta con monedero acumulado');
  }
}*/

function ConsultarMonedero() {
  return new Promise(function(resolve, reject) {
  var idusuario=localStorage.getItem('id_user');
  var datos="id_user="+idusuario;
  var pagina="ObtenerMonedero.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      resolve(resp);
    
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

function Agregarmasproducto() {
  if (localStorage.getItem('idsucursal')!=undefined && localStorage.getItem('idsucursal')!=null) {
      GoToPage('detalleproductoservicios');
      
    }else{

      GoToPage('home');
  
    }
}

function ObtenerCortesia(idcarrito,idpaquete) {
  var idusuario=localStorage.getItem('id_user');

var datos="idcarrito="+idcarrito+"&idpaquete="+idpaquete;
var pagina="ObtenerCortesiaPaquete.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
     
      var respuesta=resp;

      AbrirModalCortesia(respuesta,idcarrito);

     
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}
var idcortesiaelegida="";

/*function AbrirModalCortesia(resp,idcarrito) {
  
  var producto=resp.paquete;
  var servicio="producto";
  if (producto.servicio==1) {
    servicio="servicio";
  }
  var parrafo=`<p class="cambiarfuente `+estiloparrafo+`">El `+servicio+` <span style='color:white;'> `+producto.nombrepaquete+`</span> te da una cortesía</p>`;
      parrafo+=`<p class="cambiarfuente `+estiloparrafo+`">¿Cuál eliges?</p>`;

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
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                        var respuesta=resp.respuesta;
          
                          html+=`

                          <div class="row margin-bottom " style="padding-top: 1em; margin-top: 10px;display: flex;justify-content: center;">
                         `;

                       
                                html+=` 
                    
                               <div class="col-100 " style="    padding-top: 1em;padding-bottom: 1em;    display: flex;justify-content: center;">
                                 <div class="row" style="width: 50%;">
                                   

                                  <div class="col-40"> 
                                    <div class="toggle">
                                    <label>
                                      <input type="checkbox" id="cortesia_0" class="btncortesias" onchange="ElegirCortesia(`+idcarrito+`,0)" />
                                      <span class="toggle-icon"></span>
                                    </label>
                                   </div>
                                  
                                  </div>

                                   <div class="col-60">
                                     <p style="margin:0;color: white;font-size: 25px;" class="cambiarfuente">Ninguna</p>
                                    </div> 
                                 </div> 
                              
                                </div>
                                
                              

                         `;
                          
                            if (respuesta.length>0) {
                              for (var i = 0; i < respuesta.length; i++) {
                                         imagen=urlimagenes+'paquetes/imagenespaquete/'+codigoserv+respuesta[i].foto;

                           html+=` 
                             
                               <div class="col-100" style="padding-top:8px;padding-bottom:8px;    display: flex;justify-content: center;">
                                 
                                 <div class="row opcionescortesia" style="width:50%;">

                                  <div class="col-40" > 
                                       <div class="toggle">
                                              <label class="">
                                                <input type="checkbox" class="btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onchange="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)">
                                                <span class="toggle-icon"></span>
                                              </label>
                                            </div>
                                     
                                  </div>

                                   <div class="col-60" >
                                     <p style="margin:0;color: white;font-size: 25px;" class="cambiarfuente">`+respuesta[i].nombrepaquete+`</p>
                                    </div>  

             
                                 </div> 
                               </div> 
                              

                                `;
                              }
                            }

                          html+=`
                         
                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100"><button style="background: #C7AA6A;display:none;" type="button" class="button button-fill color-theme button-large button-raised btnagregarcortesia cambiarfuente" onclick="">Aceptar</button></div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        
        on: {
          open: function (sheet) {
           idcortesiaelegida=0;

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

            $( ".elementostoogle" ).each(function( index ) {
                var id=$(this).attr('id');
               var toggle = app.toggle.create({
                  el: id,
                  on: {
                    change: function () {
                      console.log('Toggle changed')
                    }
                  }
                })
            });
                


               

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });

       dynamicSheet1.open();
}*/


function AbrirModalCortesia(resp,idcarrito) {
  console.log(resp);
  var sucursalimageninguna=resp.sucursal.imagenninguna;
  var producto=resp.paquete;
  var servicio="producto";
  if (producto.servicio==1) {
    servicio="servicio";
  }
  var imagenninguna=urlimagenes+`sucursal/imagenes/`+codigoserv+sucursalimageninguna;

  var parrafo=`<p class="cambiarfuente `+estiloparrafo+`">El `+servicio+` <span style='color:white;'> `+producto.nombrepaquete+`</span> te da una cortesía</p>`;
      parrafo+=`<p class="cambiarfuente `+estiloparrafo+`">¿Cuál eliges?</p>`;

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
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                        var respuesta=resp.respuesta;
          
                          html+=`

                          <div class="row margin-bottom " style="padding-top: 1em; margin-top: 10px;display: flex;justify-content: center;">
                         `;

                       
                                html+=` 
                        
                                 <div data-space-between="12" data-slides-per-view="auto" data-centered-slides="false" class="swiper-container swiper-init divtablerocortesia">
                                  

                         `;
                          
                 

      html+=` <div class="row" style="margin-left: 1em;">`;
      html+=`
         <div class="tarjeta contadortarjeta cambiarfuente  " style="width:100%;"  onclick="ElegirCortesia(`+idcarrito+`,0,'Ninguna')">
              <div class="card demo-card-header-pic" style="border-radius: 10px;">  
              <div style="background-image:url(`+imagenninguna+`);border-radius: 10px 10px 0px 0px;" class="card-header align-items-flex-end"></div>                
      

            <div class="cardcortesia" id="cardcortesia_0"  style="display: flex;
    justify-content: center;
    align-items: center;text-align: center;height: 50px;background:#9c9c9c ;font-size: 18px;   
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;">
           <p style="margin:0px;text-align:center;color: white;">Ninguna</p> </div>
          </div>
          </div>

      `;
/*
      html+=`
          <div class="swiper-slide swiper-slide-active" role="group"  style="margin-right: 20px;width: 40%;">
        <div class="card cardcortesia" id="cardcortesia_0" style="height: 55px!important;padding: 10px;"  onclick="ElegirCortesia(`+idcarrito+`,0)">
        <div class="card-content   featured-card" style="padding-top: 9px;">
           
            <div class="card-info">

            <span class="material-icons-outlined" style="color: red;
    font-size: 35px;">
              block
              </span>
             `;
         

              html+=` 
         
              <p class="location">
              </p>
              <h6 class="text-primary vacancy">
              </h6>
            </div>
          </div>
        </div>


         <h5 class="title" style="color: white!important;text-align: center;margin: 0;">
               <a style="
    color: white;
    text-align: center;">Ninguna
                </a>
              </h5>
        </div>

      `;*/

    if (respuesta.length>0) {

    for (var i = 0; i < respuesta.length; i++) {
      
          var imagen="";
        if (respuesta[i].foto!='' && respuesta[i].foto!=null) {
             imagen=urlimagenes+`paquetes/imagenespaquete/`+codigoserv+respuesta[i].foto;
     
        }else{


          imagen=localStorage.getItem('logo');
        }

      var checked="";
     
      html+=`
        <div class="tarjeta contadortarjeta cambiarfuente  " style="width:100%;"   onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`,'`+respuesta[i].nombrepaquete+`')">
              <div class="card demo-card-header-pic" style="border-radius: 10px;">  
              <div style="background-image:url(`+imagen+`);border-radius: 10px 10px 0px 0px;" class="card-header align-items-flex-end"></div>

            <div class="cardcortesia" id="cardcortesia_`+respuesta[i].idcortesia+`" style="display: flex;
    justify-content: center;
    align-items: center;text-align: center;height: 50px;background:#9c9c9c ;font-size: 18px;   
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;">
           <p style="margin:0px;text-align:center;color: white;">`+respuesta[i].nombrepaquete+` </p> </div>
          </div>
          </div>

      `;
       /* html+=`
<div class="swiper-slide swiper-slide-active" role="group"  style="margin-right: 20px;width: 40%;">
        <div class="card cardcortesia" id="cardcortesia_`+respuesta[i].idcortesia+`" style="height: 55px!important;padding: 10px;"  onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)">
        <div class="card-content   featured-card" style="padding-top: 9px;">
           
            <div class="card-info">
             `;
              if (imagen!='') {

                 html+=`<img src="`+imagen+`" alt="" style="width:60px;">`;
                }

              html+=` 
         
              <p class="location">
              </p>
              <h6 class="text-primary vacancy">
              </h6>
            </div>
          </div>
        </div>


              <h5 class="title" style="color: white!important;text-align: center;margin: 0;">
               <a style="
    color: white;
    text-align: center;">`+respuesta[i].nombrepaquete+`
                </a>
              </h5>
        </div>

        `;*/
    }
  }

    html+=`
         </div>
    </div>`;
   


                          html+=`
                         
                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100"><button style="background: #C7AA6A;display:none;" type="button" class="button button-fill color-theme button-large button-raised btnagregarcortesia cambiarfuente" onclick="">Aceptar</button></div>
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

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

           
/*
    if (swiper1 && swiper1.destroy) {
      swiper1.destroy(true, true); 
    }

      swiper1 = new Swiper(".divtablerocortesia", {
         slidesPerView: "auto",
        spaceBetween: 1,
        pagination: false,

      });*/



     // swiper1.update();
  
                


               

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });

       dynamicSheet1.open();
}
function ElegirCortesia(idcarrito,idcortesia,nombrecortesia) {
    idcortesiaelegida=0;
    $("#cardcortesia_"+idcortesia).addClass('seleccionadocortesia');
    idcortesiaelegida=idcortesia;
    dynamicSheet1.close();

   

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
                          <div class="row" style="margin-left: 1em; margin-right: 1em; margin-top: 60px;">
                          <div class="col-100">
                          <p style="color: #c7aa6a;text-align: center;" class="cambiarfuente cambiarfuente2 `+estiloparrafo+`">Has elegido <span style="color:white;">`+nombrecortesia+`</span> como cortesía. ¿Estás seguro de tu elección?</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="GuardarCortesiaCarrito(`+idcarrito+`,`+idcortesiaelegida+`)">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAviso()">No</button>
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

 //$(".btnagregarcortesia").css('display','block');
 //$(".btnagregarcortesia").attr('onclick','GuardarCortesiaCarrito('+idcarrito+','+idcortesia+')');


function GuardarCortesiaCarrito(idcarrito,idcortesia) {
  var datos="idcarrito="+idcarrito+"&idcortesia="+idcortesiaelegida;
  var pagina="GuardarCortesiaCarrito.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
     
      dynamicSheet1.close();

      

        var promesa=VerificarProductosCarritoConCortesia();
         promesa.then(r => {
          var carrito=r.respuesta;
          var concortesia=r.concortesia;
          var cortesiasporagregar=r.cortesiasporagregar;
            if (carrito.length>0 && concortesia==1 && cortesiasporagregar>0) {


              ObtenerCortesia(carrito[0].idcarrito,carrito[0].idpaquete);
 
            }else{

              AbrirModalNecesitas();
            }

        });

     //aqui
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
          console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
      }
    });
}

function VerificarProductosCarritoConCortesia() {
   return new Promise(function(resolve, reject) {


  var idusuario=localStorage.getItem('id_user');
  var datos="idusuario="+idusuario;
  var pagina="VerificarProductosCarritoConCortesia.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      resolve(resp);
    
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


function VerificarCarritoMonedero() {
   return new Promise(function(resolve, reject) {


  var idusuario=localStorage.getItem('id_user');
  var datos="idusuario="+idusuario;
  var pagina="VerificarCarritoMonedero.php";

 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){

      resolve(resp);
    
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