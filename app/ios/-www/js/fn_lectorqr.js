function scanqr() {
	
	cordova.plugins.barcodeScanner.scan(
      function (result) {

      	if (result.format=='QR_CODE') {

           var arreglo=[];
           arreglo.push(result.text);
           var idcita=localStorage.getItem('idcita');
            var id_user=localStorage.getItem('id_user');
            var datos="id_user="+id_user+"&idcita="+idcita+"&textqr="+JSON.stringify(arreglo);
            
            var pagina = "validarqr.php";
            $.ajax({
              type: 'POST',
              dataType: 'json',
              url: urlphp+pagina,
              data:datos,
              success: function(res){ 
                var respuesta=res;

                // alert(respuesta.validado+'id'+respuesta.idusuario);
                if (respuesta.validado==1) {

                  localStorage.setItem('idcita',respuesta.cita);
                  alerta('','Check-in validado');
                }

                else if (respuesta.validado==2) {
                  localStorage.setItem('cita',respuesta.cita);

      
                 
                }

                else{

                var aviso="Qr no válido";
                  AbrirModalAviso(aviso);
 
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
         
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloque un código qr dentro del área de escaneo", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
}


function scanqr2() {
  
  cordova.plugins.barcodeScanner.scan(
      function (result) {

        if (result.format=='QR_CODE') {
           var arreglo=[];
           arreglo.push(result.text);
           var idcita=localStorage.getItem('idcita');
            var id_user=localStorage.getItem('id_user');
            var datos="id_user="+id_user+"&idcita="+idcita+"&textqr="+JSON.stringify(arreglo);
            
            var pagina = "validarqr2.php";
            $.ajax({
              type: 'POST',
              dataType: 'json',
              url: urlphp+pagina,
              data:datos,
              success: function(res){ 
                var respuesta=res;

                if (respuesta.validado==1) {

                  localStorage.setItem('idcita',respuesta.cita);
                 // alerta('','Se ha validado el qr');

                  GoToPage('validadoqrcita');
                  var detallecita=res.detallecita[0];
                  AbrirValidacionQr2(detallecita);
                }
 
                 if (respuesta.validado==2) {
                  localStorage.setItem('cita',respuesta.cita);

                  var aviso="La cita se encuentra fuera de horario";
                  AbrirModalAviso(aviso);
                  
                }

                if(respuesta.validado==0){

                // alerta('','Qr no válido');
                  var aviso="Qr no válido";
                  AbrirModalAviso(aviso);
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
         
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloque un código qr dentro del área de escaneo", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
}


function scanqr3() {
  
  cordova.plugins.barcodeScanner.scan(
      function (result) {

        if (result.format=='QR_CODE') {

           var arreglo=[];
           arreglo.push(result.text);
           var idcita=localStorage.getItem('idcita');
            var id_user=localStorage.getItem('id_user');
            var datos="id_user="+id_user+"&idcita="+idcita+"&textqr="+JSON.stringify(arreglo);
            
            var pagina = "validarqr3.php";
            $.ajax({
              type: 'POST',
              dataType: 'json',
              url: urlphp+pagina,
              data:datos,
              success: function(res){ 
                var respuesta=res;

                if (respuesta.validado==1) {

                  localStorage.setItem('idcita',respuesta.cita);
                 // alerta('','Se ha validado el qr');

                  GoToPage('validadoqrcita');

                  var detallecita=res.detallecita[0];
                  AbrirValidacionQr2(detallecita);
                }
 
                if (respuesta.validado==2) {
                  localStorage.setItem('cita',respuesta.cita);

                  var aviso="La cita se encuentra fuera de horario";
                  AbrirModalAviso(aviso);
                  
                 
                }

                if (respuesta.validado==0){

                  var aviso="Qr no válido";
                  AbrirModalAviso(aviso);
 
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
         
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloque un código qr dentro del área de escaneo", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
}

function AbrirValidacionQr2(respuesta) {
      
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: black;">
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
                
                    <div class="">
                      <div class="block" style="margin-right:1em;margin-left:1em;">
                        

                          <div class="card-content" style="margin-top:2em;">
                          <div class="row">
                            <div class="col-100">
                              <h3 style="margin-left: 1em;
                                margin-right: 1em;
                                text-align: center;line-height:1;
                      ">Check-in realizado exitosamente</h3>
                            </div>
                          </div>
                        </div>
              
                        <div class="card-content ">
                        <div class="row">
                        <div class="col-100">
                          <div class="" style="margin-top:1em;">
                          

                                <span class="material-icons-outlined" style=" width: 30px;
                                    justify-content: center;
                                    font-size: 100px;
                                    display: flex;
                                    margin: auto;color:#5ac35b;">
                                      check_circle_outline
                                      </span>
                          </div>
                        </div>
          
                          <div class="col-100">
                          </div>
                        </div>
                            <div class="row">
                              <div class="col">`;

                   html+=`
                 <div class=" cambiarfuente " style="list-style: none;background: black;">
                        <li class="item-content cambiarfuente" style="    margin-top: 1em;
                    margin-right: 1em;
                    margin-left: 1em;
                    border-bottom: 1px solid;
                    margin-bottom: 1em;">
                      <div class="row" style="margin-bottom: 10px;">
                       <div class="col-90">
                        <div class="icon-text-container">`;
                        if (respuesta.servicio==1) {
                          etiqueta="Servicio";
                        }

                        if (respuesta.servicio==0) {
                          etiqueta="Producto";
                        }

               html+=`
               <span class="material-icons-outlined">inventory_2
                </span> <p style="margin:0;">`+etiqueta+`: <span class="texto">`+respuesta.concepto+`</span>
                </p>

                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                <span class="material-icons-outlined">local_atm</span>
                  <p style="margin:0;">Costo: <span class="texto">$`+respuesta.costo+`</span>
                  </p>
                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                 <span class="material-icons-outlined">
                    add_business
                    </span>
                    <p style="margin:0;">
                   
                    Negocio: <span class="texto">`+respuesta.titulo+`</span></p>
                     </div>
                    `;

                       if (respuesta.servicio==0) {
                      html+=`<p style="margin:0;">Cantidad: `+respuesta.cantidad+`</p>`;
                 
                  }else{


                    html+=` 
                        <div class="icon-text-container" style="margin-top: 10px;">
                        <span class="material-icons-outlined">supervised_user_circle</span>
                    <p style="margin:0;">Barbero: <span class="texto">`+respuesta.nombre+` `+respuesta.paterno+`</span></p>
                    </div>
                    `;
                    html+=`
                   <div class="icon-text-container" style="margin-top:10px;">
                     <span class="material-icons-outlined">calendar_month</span>

                     <p style="margin:0;">Fecha/Hora: <span class="texto">`+respuesta.fechaformato+` `+respuesta.horainicial+'-'+respuesta.horafinal+`</span></p>

                     </div>
                     `;

                        if (respuesta.concortesia==1  ) {


                          if (respuesta.idcortesia>0 ) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">`+respuesta.nombrepaquetecortesia+`</span></p>

                           </div>`;

                      }


                      if (respuesta.idcortesia==0 && respuesta.colococortesia==1) {

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
                <div class="col-10">`;

                  if (respuesta.precioante!=0) {
                     html+=`
                     <div class="col-100">
                     <p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta.precioante+`</p>
                     </div>
                     `;

                  }


                           html+=`
                           <div class="col-100">
                           
                             </div>
                             `;

                 



                               html+=` </div>

                                </div>
                            </li>

                          </div>`;
                  html+=`

                              </div>
                            </div>
                          </div>
                        </div>

                        </div>
                        <div class="row">
                          <div class="col">
                          <h4 style="
                            text-align: center;
                            font-size: 28px;
                            color: red;
                            padding-top: 1em;
                        "></h4>
                          </div>
                        </div>
                        <div class="row" style="margin-top:6em;">
                        
                       
                      </div>
                    </div>
              

                    </div>

                    </div>

                 </div>

          </div>
                
              </div>
            </div>
          </div>`;
          
    dynamicSheet4 = app.sheet.create({

        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
    
          
          },
          opened: function (sheet) {
          
          },

          close:function () {
            // AbrirModalCita(respuesta.idcita);
          }
        }
      });

       dynamicSheet4.open();
  }