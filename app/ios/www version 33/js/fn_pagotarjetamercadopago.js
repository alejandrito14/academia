
var cardForm="";
function IrNuevaTarjetaMercadopago() {
  
    GoToPage('mercadopagotarjeta');
  }

function RegresarAmetodo() {
    page='metodopago';
    app.views.main.router.navigate("/"+page+"/",{reloadCurrent: true,clearPreviousHistory:true,});

}

function ObtenerTarjetasMercadopago(setlastcard=false) {
    var idtipodepago=localStorage.getItem('idtipodepago');
    var fname = "getCardList";
    var pagina = "ObtenerDatosMercadoPago.php";
    var idcliente = localStorage.getItem('id_user');
    var datos = "idcliente=" + idcliente + "&fname="+fname+"&idtipodepago="+idtipodepago;
    $("#btnatras").css('display','none');

    HideDiv("divagregartarjeta");
    ShowDiv("divlistadotarjetas");

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp + pagina,
        data: datos,
        async: false,
        success: function (datos) {
            PintarTarjetasMercadopago(datos,setlastcard);
            HabilitarBotonPagar();
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}

function LoadSetupIntentMercadoPago(){

 
    'use strict';
    $('#v_cardholder-name').val("");
    if($('#' + "checkclassnombre").is(":checked")){
      $("#"+ "checkclassnombre").prop('checked', false);
    }
    app.dialog.preloader();

    //var displayError = document.getElementById("card-errors");
    //displayError.textContent = "";
   // HideDiv("divlistadotarjetas");
    //ShowDiv("divagregartarjeta")
    
    var clavepublica=localStorage.getItem('clavepublica');

  //  var pkey = "pk_test_51JNNdFJrU4M0Qnc879SI1I0o7BIpTnoMgioMaKYGDbOjTLCcfl8Rx8TLTlqPbBEifMXrRGqREEOBjCXY6RQo83Uw00M5z8GOPe"
    var pkey = clavepublica;
 
     const mp = new MercadoPago(clavepublica);
    /*var elements = stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
          },
        ],
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        locale: window.__exampleLocale
      });*/
    
      // Floating labels
     /* var inputs = document.querySelectorAll('.cell.example.example2 .input');
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener('focus', function() {
          input.classList.add('focused');
          input.classList.add('form-control');
        });
        input.addEventListener('blur', function() {
          input.classList.remove('focused');
        });
        input.addEventListener('keyup', function() {
          if (input.value.length === 0) {
            input.classList.add('empty');
          } else {
            input.classList.remove('empty');
          }
        });
      });
*/    
      /*var elementStyles = {
        base: {
          color: 'black',
          fontWeight: 500,
          fontFamily: 'inherit',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          background:'white',
    
          '::placeholder': {
            color: '#e0e0e0', 
            fontSize: '16px',
          },
          ':-webkit-autofill': {
            color: '#e39f48',
          },
        },
        invalid: {
          color: '#E25950',
    
          '::placeholder': {
            color: '#FFCCA5',
          },
        },
        
      };*/
    
      /*var elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
        formcontrol:'form-control',
      

      };
    
    var cardNumber = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardNumber.mount('#v_card-number');
  
    var cardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardExpiry.mount('#v_card-expiry');
  
   var cardCvc = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardCvc.mount('#v_card-cvc');


  cardNumber.on('change', function(event) {
    checkFormFields(cardNumber,cardExpiry,cardCvc);
  });
  cardExpiry.on('change', function(event) {
    checkFormFields(cardNumber,cardExpiry,cardCvc);
  });
  cardCvc.on('change', function(event) {
    var timer = setTimeout(function() {
    checkFormFields(cardNumber,cardExpiry,cardCvc);
  }, 1000); // Espera 1 segundo antes de verificar
  });*/



    /////SetupIntent/////
    var fname = "setupIntent";
    var pagina = "ObtenerDatosMercadoPago.php";
    var idcliente = localStorage.getItem('id_user');
    var idtipodepago=localStorage.getItem('idtipodepago');

    var datos = "idcliente=" + idcliente + "&fname="+fname+"&idtipodepago="+idtipodepago;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp + pagina,
        data: datos,
        async: false,
        success: function (datos) {
            var setupIntent = datos;
            var button = document.getElementById("submit-card");
             EstablecerNombreCliente();
               app.dialog.close();
            /////GUARDAR TARJETA////
            button.addEventListener("click", function(event) {
              event.preventDefault();
             
              var cardname = document.getElementById("v_cardholder-name").value;

              //changeLoadingState(true);
              /* const myPromise = new Promise((resolve, reject) => {
        CrearModalEspera3(() => {
          
              stripe
                .confirmCardSetup(setupIntent.client_secret, {
                  payment_method: {
                    card: cardNumber,
                    billing_details: { name: cardname }
                  }
                })
                .then(function(result) {
                  if (result.error) {
                    //changeLoadingState(false);
                    var displayError = document.getElementById("card-errors");
                    if(result.error.message.includes("payment_method_data[billing_details][name]")){
                      displayError.textContent = "Ingrese el nombre del titular de su tarjeta";
                    }
                    else{
                      displayError.textContent = result.error.message;
                    }
                  } else {

                    dynamicSheet1.close();
                    dynamicSheet2.close();
                    // The PaymentMethod was successfully set up
                    setupComplete(stripe, setupIntent.client_secret);
                    ObtenerTarjetasStripe(true);
                  }
                });
            });

             resolve("Modal cerrado después de realizar el cargo");
            });*/

        });
        

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}
function PintarTarjetasMercadopago(tarjetas,setlastcard=false) {
    var html = '';
    var logo = localStorage.getItem('logo');
    if (tarjetas.length > 0) {
      $("#btnatras").css('display','block');
        checked = "";
        checkclass = "opccard"

       
        lastcardid = GetLastCardMercado().lastcard_stripe;
        for (var i =0; i < tarjetas.length; i++) {
            if(lastcardid == tarjetas[i].id  && setlastcard == false)
              checked = "checked";
            else if(setlastcard && i == 0){
              SetLastCardMercado(tarjetas[i].id);
              checked = "checked";
            }
            var json=JSON.stringify(tarjetas[i].card);
            html += `<div class="row" id="scard`+ i +`" style="margin-top: 1em;
    margin-bottom: 1em;">`+ 
            `<div class="col-20">`;
           // `<input type="checkbox" name="tarjetatopay" class="`+checkclass+`" id="`+ checkclass + i +`"  onchange="CheckCardSelection(this,'`+ checkclass +`','`+ tarjetas[i].id +`');" `+checked+`>` +

           html+= `

              <div class="toggle" style="margin-right: 10px;">
              <label>
                <input type="checkbox" name="tarjetatopay" class="`+checkclass+`" id="`+ checkclass + i +`"  onchange="CheckCardSelection(this,'`+ checkclass +`','`+ tarjetas[i].id +`');" `+checked+` />
                <span class="toggle-icon"></span>
                </label>
               </div>
             </div>

            <div  class="col-60">
            <div id="datostarjeta_`+ checkclass + i +`" style="line-height: 2em;font-size: 18px;color: white;">
            <img src="`+imagenesbancos + tarjetas[i].card.brand + `.png" alt="card" style="float:left;" width="36" height="32">`+
            `<span id="datostarjetaspan_`+ checkclass + i +`"  >&nbsp&nbsp****` + tarjetas[i].card.last4 + `&nbsp&nbsp`+
            
             ("0" + tarjetas[i].card.exp_month).slice(-2) + "/" + ("0" + tarjetas[i].card.exp_year).slice(-2) +`</span><div>
              </div>
            </div>

            

            </div>

                <div class="col-20" style="margin: 0;
    padding: 0;">
                ` +
                    `<a class="botoneliminar" style="line-height: 3;margin-top: 0;" onclick="eliminarTarjeta('`+tarjetas[i].id +`','scard`+i+`');" style="float:left" >
                     <span style="color:red;font-size:22px;"  class="material-icons-outlined">delete</span>`+
                    `<span class="if-not-md">

                    </a>

                </div>
        </div>
            `;
            checked = "";


        }
        ShowDiv("btnnextpage");
    }
    else {
        html += `<div class="simple-list" style="color: white;">(No tienes tarjetas guardadas)</div>`;
        //HideDiv("btnnextpage");
        SetLastCardMercado(null);
        //LoadSetupIntent();       
    }
 

   // $("#listadotarjetas").html(html);
}

function GetLastCardMercado() {
     var idtipodepago=localStorage.getItem('idtipodepago');

  var fname = "getLastCard";
  var pagina = "ObtenerDatosMercadoPago.php";
  var idcliente = localStorage.getItem('id_user');
  var datos = "idcliente=" + idcliente + "&fname="+fname+"&idtipodepago="+idtipodepago;
  $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp + pagina,
      data: datos,
      async: false,
      success: function (datos) {
        
        lastcard = datos;
      }, error: function (XMLHttpRequest, textStatus, errorThrown) {
          var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
          console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
      }
  });
  return lastcard;
}



function SetLastCardMercado(cardid) {
  var idtipodepago=localStorage.getItem('idtipodepago');

  var fname = "setLastCard";
  var pagina = "ObtenerDatosMercadoPago.php";
  var idcliente = localStorage.getItem('id_user');
  var datos = "idcliente=" + idcliente + "&fname="+fname + "&lastcard="+cardid+"&idtipodepago="+idtipodepago;
  
  if (cardid!=null) {
  $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp + pagina,
      data: datos,
      async: false,
      success: function (datos) {

        $("#btnpagarnota").attr('disabled',false);
        $("#btnpagarnota").css('display','block');

      }, error: function (XMLHttpRequest, textStatus, errorThrown) {
          var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
          console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
      }
  });
  }else{

            $("#btnpagarnota").attr('disabled',true);

  }
}

function CheckCardSelection(obj,objclass,cardid)
{
  $('.'+objclass).prop('checked', false);
  $("#"+ obj.id).prop('checked', true);

  SetLastCardMercado(cardid);
 
}



function NuevaTarjetaMercadopago(){ 

  var htmlformulario=`
    <div class="" id="divagregartarjeta">

      <div class="divisiones2" style="    margin-bottom: 1em;
    margin-top: 1em;font-weight: bold;"><span style="margin-top: .5em;margin-left: .5em;"></span></div>
      <div class="block h-100 no-margin">

            <div class="row" style="">

      <div class="col-100 margin-left-auto margin-right-auto align-self-center  padding-vertical" style="">

         <div class="form-elements" style="    margin-right: 2em;
    margin-left: 2em;">
         <form action="" id="paymentForm">
         <div class="list form-list no-margin margin-bottom" id="my-form" style="    margin-top: 20px;">
           <ul style="">
            <li class="item-content item-input is-valid liemail">
            <div class="item-inner">

               <div class="item-title item-floating-label">Email
              </div>
             <div class="item-input-wrap">
              <input type="text" name="v_email" id="v_email" class="">
              <span class="input-clear-button">
              </span>
             </div>
            </div>
            </li>

              
            <li class="item-content item-input is-valid liestatura">
            <div class="item-inner">
              <div class="item-title item-floating-label">Nombre de la tarjeta
              </div>
              <div class="item-input-wrap">
                <input id="cardholderName" data-checkout="cardholderName" type="text" >
                <span class="input-clear-button">
                </span>

              </div>
            </div>
            </li>

             <li class="item-content item-input is-valid linumerotarjeta">
            <div class="item-inner">
              <div class="item-title">Número de tarjeta
              </div>
           
               <div id="cardNumber" style="height: 50px;"></div>
           
            </div>
            </li>

               <li class="item-content item-input is-valid linumerotarjeta">
                <div class="item-inner">
                <div class="item-title">Fecha de vencimiento
                </div>
           
               <div id="cardExpirationDate" style="height: 50px;"></div>
       
              </div>
            </li>

            <li class="item-content item-input is-valid linumerotarjeta">
            <div class="item-inner">
             <div class="item-title">CVV
              </div>
             <div id="securityCode" style="height: 50px;"> </div>
            
            </div>

            </li>
          </ul>
          </div>

            <div id="issuerInput" style="display:none;">
                    <label for="issuer" style="display:none;">Banco emissor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
             </div>

              <div>
                <label for="installments" style="display:none;">Parcelas</label>
                <select type="text" id="installments" name="installments" style="display:none;"></select>
              </div>
            <div>
                        <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                        <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                        <input type="hidden" name="description" id="description" value="description" />
                        <br>
                        <button type="submit">Pagar</button>
                        <br>
                      </div>


        </div>

        </form>

        <a class="button button-fill botonesredondeado botones cambiarfuente " id="submit-card" style="height: 60px;
    line-height: 40px;
    /* width: 100%; */
    color: white!important;
    background: #c7aa6a!important;
    margin-top: 1em;" onclick="PagarConMercadoPago()">Guardar Tarjeta</a>


         </div> 
      </div>
    </div> 
     </div>
    </div>   

  `;
var nombre="";
var correo="";

//var c=localStorage.getItem('correo');
var c="";
if (c!='' && c!='undefined') {
  correo=c;
}
htmlformulario=`

   <div class="row" style="">

      <div class="col-100 margin-left-auto margin-right-auto align-self-center  padding-vertical" style="">


    <form id="form-checkout" style="margin: 20px;">
       <div class="list form-list no-margin margin-bottom" id="my-form" style="">
           <ul style="">

          
            <li class="item-content item-input is-valid liemail" style="height: 60px;">
            <div class="">
             <div id="form-checkout__cardNumber" class="container" ></div>
             </div>
            </li>
 <li class="item-content item-input is-valid liemail" style="height: 60px;">
            <div class="">
      <div id="form-checkout__expirationDate" class="container"></div>
      </div>
 </li>

  <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">

      <div id="form-checkout__securityCode" class="container"></div>

       </div>
 </li>

  <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="" style="width:100%;">
      <input type="text" id="form-checkout__cardholderName" value="`+nombre+`" style="width: 100%;"/>

      </div>

</li>

 <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">
      <select id="form-checkout__issuer"></select>

      </div>
  </li>


 <li class="item-content item-input is-valid liemail" style="height: 60px;display:none;">
      <div class="">

      <select id="form-checkout__installments"></select>

      </div>

 </li>

 <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">


      <input type="email" id="form-checkout__cardholderEmail" value="`+correo+`"/>

 </div>

 </li>
      <button type="submit" id="form-checkout__submit" class="button button-fill color-theme button-large button-raised btnpagar" style="margin-top:10px;">Pagar</button>
      <progress value="0" class="progress-bar" style="display:none;">Cargando...</progress>
    </form>
  
    </div>
  </div>

`;

      // Aquí puedes realizar acciones cuando el modal se ha abierto
      

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;">
            <div class="toolbar" style="">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="border-top-left-radius: 20px;border-top-right-radius:20px;    margin-top: 1em; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style=" height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <p class="titulomodal cambiarfuente" style="text-align: center;font-size: 20px; margin-bottom:10px;">Ingresar datos de tarjeta</p>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:2em;width: 100%;">
                  
                         `+htmlformulario+`
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
        // Events
        on: {
          open: function (sheet) {
           
        

          },
          opened: function (sheet) {
             //HideDiv("btnnextpage");
              //SetLastCard(null);
             // var displayError = document.getElementById("card-errors");
            //  displayError.textContent = "";
              //LoadSetupIntent();

              $('#v_fechavencimiento').mask('00/00');


                $('#v_numetotarjeta').on('input', function() {
                  var maxLength = 16; // Número máximo de caracteres permitidos
                  var inputValue = $(this).val();
                  
                  if (inputValue.length > maxLength) {
                    $(this).val(inputValue.slice(0, maxLength)); // Limitar el valor al número máximo de caracteres
                  }
                });


                  $('#v_cvv').on('input', function() {
                  var maxLength = 4; // Número máximo de caracteres permitidos
                  var inputValue = $(this).val();
                  
                  if (inputValue.length > maxLength) {
                    $(this).val(inputValue.slice(0, maxLength)); // Limitar el valor al número máximo de caracteres
                  }
                });

                  var llavepublica=localStorage.getItem('clavepublica');
//Mercadopago.setPublishableKey(public);
                   
            


              
                    mp = new MercadoPago(llavepublica); 


                  TarjetaLoad2(mp)
                
            $("#submit-card").text('Pagar');
            $("#submit-card").attr('onclick','GuardarTarjetaMercado()');
            $$("#btnatras").attr('onclick','CancelarNuevaTarjeta()');
            
          },
          close:function (sheet) {
            // BorrarIntervalo();
            

          },
        }
      });

       dynamicSheet1.open();
  
 
}
function CargarNuevaTarjetaMercadopago(argument) {
  
  var htmlformulario=`
    <div class="" id="divagregartarjeta">

      <div class="divisiones2" style="    margin-bottom: 1em;
    margin-top: 1em;font-weight: bold;"><span style="margin-top: .5em;margin-left: .5em;"></span></div>
      <div class="block h-100 no-margin">

            <div class="row" style="">

      <div class="col-100 margin-left-auto margin-right-auto align-self-center  padding-vertical" style="">

         <div class="form-elements" style="    margin-right: 2em;
    margin-left: 2em;">
         <form action="" id="paymentForm">
         <div class="list form-list no-margin margin-bottom" id="my-form" style="    margin-top: 20px;">
           <ul style="">
            <li class="item-content item-input is-valid liemail">
            <div class="item-inner">

               <div class="item-title item-floating-label">Email
              </div>
             <div class="item-input-wrap">
              <input type="text" name="v_email" id="v_email" class="">
              <span class="input-clear-button">
              </span>
             </div>
            </div>
            </li>

              
            <li class="item-content item-input is-valid liestatura">
            <div class="item-inner">
              <div class="item-title item-floating-label">Nombre de la tarjeta
              </div>
              <div class="item-input-wrap">
                <input id="cardholderName" data-checkout="cardholderName" type="text" >
                <span class="input-clear-button">
                </span>

              </div>
            </div>
            </li>

             <li class="item-content item-input is-valid linumerotarjeta">
            <div class="item-inner">
              <div class="item-title">Número de tarjeta
              </div>
           
               <div id="cardNumber" style="height: 50px;"></div>
           
            </div>
            </li>

               <li class="item-content item-input is-valid linumerotarjeta">
                <div class="item-inner">
                <div class="item-title">Fecha de vencimiento
                </div>
           
               <div id="cardExpirationDate" style="height: 50px;"></div>
       
              </div>
            </li>

            <li class="item-content item-input is-valid linumerotarjeta">
            <div class="item-inner">
             <div class="item-title">CVV
              </div>
             <div id="securityCode" style="height: 50px;"> </div>
            
            </div>

            </li>
          </ul>
          </div>

            <div id="issuerInput" style="display:none;">
                    <label for="issuer" style="display:none;">Banco emissor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
             </div>

              <div>
                <label for="installments" style="display:none;">Parcelas</label>
                <select type="text" id="installments" name="installments" style="display:none;"></select>
              </div>
            <div>
                        <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                        <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                        <input type="hidden" name="description" id="description" value="description" />
                        <br>
                        <button type="submit">Pagar</button>
                        <br>
                      </div>


        </div>

        </form>

        <a class="button button-fill botonesredondeado botones cambiarfuente " id="submit-card" style="height: 60px;
    line-height: 40px;
    /* width: 100%; */
    color: white!important;
    background: #c7aa6a!important;
    margin-top: 1em;" onclick="PagarConMercadoPago()">Guardar Tarjeta</a>


         </div> 
      </div>
    </div> 
     </div>
    </div>   

  `;
var nombre=localStorage.getItem('nombre')+' '+localStorage.getItem('paterno');

htmlformulario=`

   <div class="row" style="">

      <div class="col-100 margin-left-auto margin-right-auto align-self-center  padding-vertical" style="">


    <form id="form-checkout" style="margin: 20px;">
       <div class="list form-list no-margin margin-bottom" id="my-form" style="">
           <ul style="">

          
            <li class="item-content item-input is-valid liemail" style="height: 80px;">
            <div class="">
             <div id="form-checkout__cardNumber" class="container" ></div>
             </div>
            </li>
 <li class="item-content item-input is-valid liemail" style="height: 60px;">
            <div class="">
      <div id="form-checkout__expirationDate" class="container"></div>
      </div>
 </li>

  <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">

      <div id="form-checkout__securityCode" class="container"></div>

       </div>
 </li>

  <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">
      <input type="text" id="form-checkout__cardholderName" value="`+nombre+`" style="width: 100%;"/>

      </div>

</li>

 <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">
      <select id="form-checkout__issuer"></select>

      </div>
  </li>


 <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">

      <select id="form-checkout__installments"></select>

      </div>

 </li>

 <li class="item-content item-input is-valid liemail" style="height: 60px;">
      <div class="">


      <input type="email" id="form-checkout__cardholderEmail" />

 </div>

 </li>
      <button type="submit" id="form-checkout__submit" class="button button-fill color-theme button-large button-raised btnpagar" style="margin-top:10px;">Pagar</button>
      <progress value="0" class="progress-bar" style="display:none;">Cargando...</progress>
    </form>
  
    </div>
  </div>

`;

      // Aquí puedes realizar acciones cuando el modal se ha abierto
      

var html=` <div class="" style="height: 100%;">
           
            <div class="sheet-modal-inner" style="border-top-left-radius: 20px;border-top-right-radius:20px;    margin-top: 1em; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="" style="height: 100%;">
                <div style=" height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <p class="titulomodal cambiarfuente" style="text-align: center;font-size: 20px; "></p>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="top:1em;width: 100%;">
                  
                         `+htmlformulario+`
                          </div>

                    </div>

                 </div>

          </div>
                
              </div>
            </div>
          </div>`;
  
    $(".divformulario").html(html);
    
    $('#v_fechavencimiento').mask('00/00');


                $('#v_numetotarjeta').on('input', function() {
                  var maxLength = 16; // Número máximo de caracteres permitidos
                  var inputValue = $(this).val();
                  
                  if (inputValue.length > maxLength) {
                    $(this).val(inputValue.slice(0, maxLength)); // Limitar el valor al número máximo de caracteres
                  }
                });


                  $('#v_cvv').on('input', function() {
                  var maxLength = 4; // Número máximo de caracteres permitidos
                  var inputValue = $(this).val();
                  
                  if (inputValue.length > maxLength) {
                    $(this).val(inputValue.slice(0, maxLength)); // Limitar el valor al número máximo de caracteres
                  }
                });

                  var llavepublica=localStorage.getItem('clavepublica');
//Mercadopago.setPublishableKey(public);
                   
            


              
                    mp = new MercadoPago(llavepublica); 


                  TarjetaLoad2(mp)
               
}

function GuardarTarjetaMercado() {
    // Obtener los datos del formulario
var v_email = $("#v_email").val();
var v_nombretarjeta = $("#cardholderName").val();
var v_numetotarjeta = $("#cardNumber").val();
var expirationYear = $("#expirationYear").val();

var expirationMonth=$("#expirationMonth").val();
var v_cvv = $("#securityCode").val();
var pagina='ObtenerDatosStripe.php';
// Crear el objeto de datos de la tarjeta
var cardData = {
    cardholder_email: v_email,
    cardholder_name: v_nombretarjeta,
    card_number: v_numetotarjeta,
    expiration_month: expirationMonth,
    expiration_year: expirationYear,
    security_code: v_cvv
};

  
// Obtener el token de tarjeta desde Mercado Pago
  mp.createCardToken(cardData, function(status, response) {
       
  console.log(status);

    if (status === 200 && status === 201) {
       console.error('Error al obtener el token de tarjeta:', response);
        // Manejar el error


    const token = response.id;

    // Enviar el token al backend PHP
    const xhr = new XMLHttpRequest();
    xhr.open('POST',  urlphp+pagina, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ token: token }));

    } else {
       /*var token = response.id; // Obtener el token de tarjeta
       var idcliente = localStorage.getItem('id_user');
        console.log('entra');
       var fname = "SaveTarjet";

        // Enviar el token de tarjeta y otros datos relevantes a tu backend
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp+pagina, // URL de tu backend para guardar la tarjeta
            data: {
                idcliente: idcliente,
                token: token,
                fname:fname
                // Otros datos necesarios
            },
            success: function(response) {
                // Manejar la respuesta del backend
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', status, error);
                // Manejar el error
            }
        });*/
    }
    
  });



}

function TarjetaLoad(mp) {

  // Verificar si ya existe una instancia del formulario

  
    const cardNumberElement = mp.fields.create('cardNumber', {
      placeholder: "Número de tarjeta"
    }).mount('cardNumber');
    const expirationDateElement = mp.fields.create('expirationDate', {
      placeholder: "MM/YY",
    }).mount('cardExpirationDate');
    const securityCodeElement = mp.fields.create('securityCode', {
      placeholder: "CVV"
    }).mount('securityCode');

    // Atualização da obtenção dos identificationTypes
    // window.Mercadopago.getIdentificationTypes();
    (async function getIdentificationTypes() {
      try {
        const identificationTypes = await mp.getIdentificationTypes();
        const identificationTypeElement = document.getElementById('docType');
        createSelectOptions(identificationTypeElement, identificationTypes);
      } catch (e) {
        return console.error('Error getting identificationTypes: ', e);
      }
    })();

    function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
      const { label, value } = labelsAndKeys;

      elem.options.length = 0;

      const tempOptions = document.createDocumentFragment();

      options.forEach(option => {
        const optValue = option[value];
        const optLabel = option[label];

        const opt = document.createElement('option');
        opt.value = optValue;
        opt.textContent = optLabel;

        tempOptions.appendChild(opt);
      });

      elem.appendChild(tempOptions);
    }

    // Exemplo de como obter o bin do iframe de cardNumber
    // document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);
    cardNumberElement.on('binChange', guessPaymentMethod);


    // Atualização de como obter o paymentsMethod
    // function guessPaymentMethod(event) {
    //   let cardnumber = document.getElementById("cardNumber").value;
    //   if (cardnumber.length >= 6) {
    //     let bin = cardnumber.substring(0, 6);
    //     window.Mercadopago.getPaymentMethod({
    //       "bin": bin
    //     }, setPaymentMethod);
    //   }
    // };

    // function setPaymentMethod(status, response) {
    //   if (status == 200) {
    //     let paymentMethod = response[0];
    //     document.getElementById('paymentMethodId').value = paymentMethod.id;

    //     getIssuers(paymentMethod.id);
    //   } else {
    //     alert(`payment method info error: ${response}`);
    //   }
    // }

    async function guessPaymentMethod(data) {
      const { bin } = data;
      const { results } = await mp.getPaymentMethods({ bin });
      await setPaymentMethod(results[0].id, bin)
    };

    async function setPaymentMethod(paymentMethodId, bin) {
      document.getElementById('paymentMethodId').value = paymentMethodId;

      await getIssuers(paymentMethodId, bin);
    }

    // Atualização de como obter os Issuers
    // function getIssuers(paymentMethodId) {
    //   window.Mercadopago.getIssuers(
    //     paymentMethodId,
    //     setIssuers
    //   );
    // }

    // function getIssuers(paymentMethodId) {
    //   window.Mercadopago.getIssuers(
    //     paymentMethodId,
    //     setIssuers
    //   );
    // }

    async function getIssuers(paymentMethodId, bin) {
      const issuesr = await mp.getIssuers({ paymentMethodId, bin });

      setIssuers(issuesr, bin)
    }

    // function setIssuers(status, response) {
    //   if (status == 200) {
    //     let issuerSelect = document.getElementById('issuer');
    //     response.forEach(issuer => {
    //       let opt = document.createElement('option');
    //       opt.text = issuer.name;
    //       opt.value = issuer.id;
    //       issuerSelect.appendChild(opt);
    //     });

    //     getInstallments(
    //       document.getElementById('paymentMethodId').value,
    //       document.getElementById('transactionAmount').value,
    //       issuerSelect.value
    //     );
    //   } else {
    //     alert(`issuers method info error: ${response}`);
    //   }
    // }

    function setIssuers(issuers, bin) {
      let issuerSelect = document.getElementById('issuer');
      issuers.forEach(issuer => {
        let opt = document.createElement('option');
        opt.text = issuer.name;
        opt.value = issuer.id;
        issuerSelect.appendChild(opt);
      });

      getInstallments(bin);
    }


    // Atualização de como obter os Installments
    // function getInstallments(paymentMethodId, transactionAmount, issuerId) {
    //   window.Mercadopago.getInstallments({
    //     "payment_method_id": paymentMethodId,
    //     "amount": parseFloat(transactionAmount),
    //     "issuer_id": parseInt(issuerId)
    //   }, setInstallments);
    // }

    async function getInstallments(bin) {
      const installments = await mp.getInstallments({
          amount: document.getElementById('transactionAmount').value,
          bin,
          paymentTypeId: 'credit_card'
        });

        setInstallments(installments)
    }

    // function setInstallments(status, response) {
    //   if (status == 200) {
    //     document.getElementById('installments').options.length = 0;
    //     response[0].payer_costs.forEach(payerCost => {
    //       let opt = document.createElement('option');
    //       opt.text = payerCost.recommended_message;
    //       opt.value = payerCost.installments;
    //       document.getElementById('installments').appendChild(opt);
    //     });
    //   } else {
    //     alert(`installments method info error: ${response}`);
    //   }
    // }

    function setInstallments(installments) {
      document.getElementById('installments').options.length = 0;
      installments[0].payer_costs.forEach(payerCost => {
        let opt = document.createElement('option');
        opt.text = payerCost.recommended_message;
        opt.value = payerCost.installments;
        document.getElementById('installments').appendChild(opt);
      });
    }
    

    doSubmit = false;
    document.getElementById('paymentForm').addEventListener('submit', getCardToken);

    // Atualização de como obter o card token
    // function getCardToken(event) {
    //   event.preventDefault();
    //   if (!doSubmit) {
    //     let $form = document.getElementById('paymentForm');
    //     window.Mercadopago.createToken($form, setCardTokenAndPay);
    //     return false;
    //   }
    // };

    async function getCardToken(event) {
      event.preventDefault();
      if (!doSubmit) {
        let $form = document.getElementById('paymentForm');
        const token = await mp.fields.createCardToken({
            cardholderName: document.getElementById('cardholderName').value,
            identificationType: document.getElementById('docType').value,
            identificationNumber: document.getElementById('docNumber').value,
          })
          setCardTokenAndPay(token.id)
      }
    };

    // Exemplo de como adicionar o token ao formulário e submetê-lo ao backend
    // function setCardTokenAndPay(status, response) {
    //   if (status == 200 || status == 201) {
    //     let form = document.getElementById('paymentForm');
    //     let card = document.createElement('input');
    //     card.setAttribute('name', 'token');
    //     card.setAttribute('type', 'hidden');
    //     card.setAttribute('value', response.id);
    //     form.appendChild(card);
    //     doSubmit = true;
    //     form.submit();
    //   } else {
    //     alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
    //   }
    // };

    function setCardTokenAndPay(token) {
      let form = document.getElementById('paymentForm');
      let card = document.createElement('input');
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', token);
      form.appendChild(card);
      doSubmit = true;
      form.submit();
    };
}

function TarjetaLoad2(mp) {
    var sumatotalapagar=localStorage.getItem('sumatotalapagar');
        app.dialog.preloader('');



    if (cardForm) {

      cardForm.unmount();
    }

     cardForm = mp.cardForm({
      amount: sumatotalapagar,
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Numero de tarjeta",

        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de seguridad",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular de la tarjeta",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emisor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Cuotas",
        },        
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) return console.warn("Form Mounted handling error: ", error);
                 console.log("Form mounted");
          $("#form-checkout__cardNumber").css('height','60px');
          $("#form-checkout__securityCode").css('height','60px');
          $("#form-checkout__expirationDate").css('height','60px');
          //$("#cardNumber").addClass('clase1');
          
                 setTimeout(() => {

                      app.dialog.close();

                 }, "2000");
        },
        onSubmit: event => {
          event.preventDefault();
app.dialog.confirm('','<p>Monto: $'+sumatotalapagar+' </p><p>¿Está seguro  de realizar el pago?</p>' , function () {

      var cardNumber=$("#cardNumber").val();
      var securityCode=$("#securityCode").val();
      var expirationDate=$("#expirationDate").val();
      var email=$("#form-checkout__cardholderEmail").val();
      var nombre=$("#form-checkout__cardholderName").val();
      var bandera=1;
      console.log('bandera'+bandera);
      if (cardNumber=='') {
        bandera=0;
      }
      if (securityCode=='') {
        bandera=0;
      }
      if (expirationDate=='') {
        bandera=0;
      }
      if (email=='') {
        bandera=0;
      }
      if (nombre=='') {
        bandera=0;
      }
            console.log('bandera'+bandera);

      if (bandera==1) {
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();
          var pagina="process_payment.php";
          /*mp.fetch(urlphp+pagina, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descripción del producto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          });*/
          var sumatotalapagar=localStorage.getItem('sumatotalapagar');
    
        ValidacionBuscarasignacion().then(r=>{
  var noencontrado=0;
      var pagosencontrados=r.pagosencontrados;
      if (pagosencontrados.length>0) {

        for (var i = 0; i < pagosencontrados.length; i++) {
          console.log(pagosencontrados[i].idusuarios_servicios);
          if (pagosencontrados[i].idusuarios_servicios == 'null' || pagosencontrados[i].idusuarios_servicios==null) {

            noencontrado++;
          }
       }
      }

       if (noencontrado==0) {

  ValidacionCargosTutorados().then(r => {
 
 
    if (r.pagosadeudados==0) {

      $$("#form-checkout__submit").attr('onclick','');
      $$("#form-checkout__submit").addClass('disabled-button');
       var respuesta=0;
     var mensaje='';
     var pedido='';
     var informacion='';
   var pagina = "process_payment.php";
   var iduser=localStorage.getItem('id_user');
   var constripe=localStorage.getItem('constripe');
   var idtipodepago=localStorage.getItem('idtipodepago');
   var descuentocupon=localStorage.getItem('descuentocupon');
   var codigocupon=localStorage.getItem('codigocupon');
   var sumatotalapagar=localStorage.getItem('sumatotalapagar');
   var comision=localStorage.getItem('comision');
   var comisiontotal=localStorage.getItem('comisiontotal');
   var comisionmonto=localStorage.getItem('comisionmonto');
   var impuestototal=localStorage.getItem('impuestotal');
   var subtotalsincomision=localStorage.getItem('subtotalsincomision');
   var impuesto=localStorage.getItem('impuesto');
   var monedero=localStorage.getItem('monedero');
   var opcion=0;
   var idopcion=0;
   var confoto=localStorage.getItem('llevafoto');
   var bandera=1;
   var campomonto=localStorage.getItem('campomonto'); 
   var montovisual=localStorage.getItem('montocliente');
   var cambiomonto=localStorage.getItem('cambio');
   var comisionpornota=localStorage.getItem('comisionpornota');
   var comisionnota=localStorage.getItem('comisionnota');
   var tipocomisionpornota=localStorage.getItem('tipocomisionpornota');
   var requierefactura=$("#requierefactura").is(':checked')?1:0;
   var idusuariosdatosfiscales=0; 



     $(".opccard").each(function(){
              if($(this).is(':checked')){

                opcion=1;
                idopcion=$(this).attr('id');
              }
          });
    var datostarjeta="";
    var datostarjeta2="";
     if (opcion==1) {
        datostarjeta=$("#datostarjeta_"+idopcion).html();
        datostarjeta2=$("#datostarjetaspan_"+idopcion).text();
      }
     var rutacomprobante=localStorage.getItem('rutacomprobante');
     var comentarioimagenes=localStorage.getItem('comentarioimagenes');
      if (confoto==1) {

        if (localStorage.getItem('rutacomprobante')=='') {
          bandera=0;
        }
      }

       if (requierefactura==1) {
        idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
        if (idusuariosdatosfiscales==0 || idusuariosdatosfiscales==undefined) {
          bandera=0;
        }
      
     }

     console.log(descuentosaplicados);
  
    if (bandera==1) {

          var payer={
                email:email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              };
      var datos="token="+token+"&issuer_id="+issuer_id+"&payment_method_id="+payment_method_id+"&transaction_amount="+Number(sumatotalapagar)+"&installments="+Number(installments)+"&description="+"descripcionproducto"+"&payer="+JSON.stringify(payer);
      datos+="&sumatotalapagar="+sumatotalapagar;
      datos+='&pagos='+localStorage.getItem('pagos')+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestototal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto+"&descuentosmembresia="+JSON.stringify(descuentosmembresia);
      datos+='&confoto='+confoto+"&rutacomprobante="+rutacomprobante+"&comentarioimagenes="+comentarioimagenes;
      datos+='&campomonto='+campomonto+'&montovisual='+montovisual+'&cambiomonto='+cambiomonto;
      datos+='&comisionpornota='+comisionpornota+"&comisionnota="+comisionnota+"&tipocomisionpornota="+tipocomisionpornota;
      datos+='&datostarjeta2='+datostarjeta2+"&monedero="+monedero;
      datos+='&datostarjeta='+datostarjeta;
      datos+='&requierefactura='+requierefactura;
      datos+='&idusuariosdatosfiscales='+idusuariosdatosfiscales;
      datos+='&descuentosaplicados='+JSON.stringify(descuentosaplicados);
      //pagina = urlphp+pagina;
      $(".dialog-buttons").css('display','none');
     CrearModalEspera();
     dynamicSheet1.close();
     var promise =$.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp+pagina, // URL de tu backend para guardar la tarjeta
            data:datos,
            success: function(data) {
              informacion=data;
              respuesta=data.respuesta;
              mensaje=data.mensaje;
              pedido=data.idnotapago;

              localStorage.removeItem('idusuariosdatosfiscales');
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', status, error);
                // Manejar el error
            }
        });

          promise.then(function(){



             if (respuesta==1) {

                

                     // console.log(informacion);                   

                      var stripe=localStorage.getItem('constripe');
                      if(stripe==1){

                       // RealizarPago(pedido);

                        var output=informacion.output;
                        //var idpedido=informacion.idnota;

                       //  data = datos;
                      var stripe = Stripe(output.publicKey);
                      // Setup Stripe elements to collect payment method details
                      //setupElements(data.publicKey);
                      // Setup event handlers
                      //setupAuthenticationView(data.clientSecret, data.paymentMethod);
                      //setupNewPaymentMethodView(data.clientSecret);
                      //hideEl(".sr-select-pm");

                    if (output.error && output.error === "authentication_required") {
                     var mensaje = "La tarjeta requiere autenticación (3DSecure)";
                                       $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    // PagoNorealizado(mensaje,output.paymentIntent,notapago);
                         // alerta('',mensaje);

                    }
                    else if (output.error==1) {
                  
                      var mensaje = "Opps, La tarjeta fue bloqueada, ha excedido los "+output.intentos+" intentos";
                    //  PagoNorealizado(mensaje,output.paymentIntent,notapago);
                     // alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    }
                     else if (output.error) {
                      var mensaje = "La tarjeta fue declinada";
                    // PagoNorealizado(mensaje,output.paymentIntent,notapago);
                      //alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    
                     } else if (output.succeeded) {
                      // Card was successfully charged off-session
                      // No recovery flow needed
                      paymentIntentSucceeded(stripe,output.clientSecret, ".sr-select-pm");
                      var mensaje = "El pago se ha completado con éxito";
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','none');
                                        $(".mensajeexito").css('display','block');
                                        $(".mensajeexito").text(mensaje);

                                        $(".butonok").css('display','block');
                                        $(".butoerror").css('display','none');
                      localStorage.setItem('membresiaelegida','');

                    // alerta('',mensaje);

                      //PagoRealizado(mensaje,output.paymentIntent,notapago);

                    }


                      }else{

                       
                      setTimeout(function(){
                         LimpiarVariables2();
                         $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','none');
                          $(".mensajeexito").css('display','block');
                          $(".butonok").css('display','block');
                          $(".butoerror").css('display','none');

                      }, 3000);
                         

                      }
       


               }else{
                      var mensaje = "Oops, algo no está bien, intenta de nuevo";


                          $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','block');
                          $(".mensajeexito").css('display','none');
                          $(".butonok").css('display','none');
                          $(".butoerror").css('display','block');

                     // alerta('',mensaje);
               }

                
        

          });

          }else{


              if (bandera==0) {

                    if (localStorage.getItem('rutacomprobante')=='') {
                        alerta('','Falta por subir comprobante');
                      }
              }


               if (requierefactura==1) {
                idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
                if (idusuariosdatosfiscales==0 || idusuariosdatosfiscales==undefined) {
                      alerta('','Falta por seleccionar dato fiscal');

                }
              
             }

          }
        
         }else{

                alerta('','Para poder realizar el pago, el tutor debe pagar los pagos acumulados');

              }
        })


  }else{

    GoToPage('listadopagos');
  }

});

}else{


  alerta('Completa los datos del formulario');
}


      },function () {

          
           

});

        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);
          /*var cardNumber=$("#cardNumber").val();
      var securityCode=$("#securityCode").val();
      var expirationDate=$("#expirationDate").val();
      var email=$("#form-checkout__cardholderEmail").val();
      var nombre=$("#form-checkout__cardholderName").val();
      var bandera=1;
      console.log('bandera'+bandera);
      if (cardNumber=='') {
        bandera=0;
      }
      if (securityCode=='') {
        bandera=0;
      }
      if (expirationDate=='') {
        bandera=0;
      }
      if (email=='') {
        bandera=0;
      }
      if (nombre=='') {
        bandera=0;
      }
      if (bandera==0) {
        alerta('Completa los datos del formulario',' ');
      }*/

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          progressBar.removeAttribute("value");

          return () => {
            progressBar.setAttribute("value", "0");
          };
        },

         onValidityChange: (resource) => {
          console.log('validando');
        },

         onError: (resource) => {
      var cardNumber=$("#cardNumber").val();
      var securityCode=$("#securityCode").val();
      var expirationDate=$("#expirationDate").val();
      var email=$("#form-checkout__cardholderEmail").val();
      var nombre=$("#form-checkout__cardholderName").val();
      var bandera=1;
     
      if (cardNumber=='') {
        bandera=0;
      }
      if (securityCode=='') {
        bandera=0;
      }
      if (expirationDate=='') {
        bandera=0;
      }
      if (email=='') {
        bandera=0;
      }
      if (nombre=='') {
        bandera=0;
      }

      if (bandera==0) {
         alerta('Completar los datos del formulario','');
      }

        },
      },
    });
}

function PagarConMercadoPago() {




 app.dialog.confirm('','¿Está seguro  de realizar el pago?' , function () {

   ValidacionBuscarasignacion().then(r=>{
  var noencontrado=0;
      var pagosencontrados=r.pagosencontrados;
      if (pagosencontrados.length>0) {

        for (var i = 0; i < pagosencontrados.length; i++) {
          console.log(pagosencontrados[i].idusuarios_servicios);
          if (pagosencontrados[i].idusuarios_servicios == 'null' || pagosencontrados[i].idusuarios_servicios==null) {

            noencontrado++;
          }
       }
      }

       if (noencontrado==0) {

  ValidacionCargosTutorados().then(r => {
 
 
    if (r.pagosadeudados==0) {

      $$("#btnpagarresumen").attr('onclick','');
      $$("#btnpagarresumen").addClass('disabled-button');
       var respuesta=0;
     var mensaje='';
     var pedido='';
     var informacion='';
   var pagina = "RealizarPago7.php";
   var iduser=localStorage.getItem('id_user');
   var constripe=localStorage.getItem('constripe');
   var idtipodepago=localStorage.getItem('idtipodepago');
   var descuentocupon=localStorage.getItem('descuentocupon');
   var codigocupon=localStorage.getItem('codigocupon');
   var sumatotalapagar=localStorage.getItem('sumatotalapagar');
   var comision=localStorage.getItem('comision');
   var comisiontotal=localStorage.getItem('comisiontotal');
   var comisionmonto=localStorage.getItem('comisionmonto');
   var impuestototal=localStorage.getItem('impuestotal');
   var subtotalsincomision=localStorage.getItem('subtotalsincomision');
   var impuesto=localStorage.getItem('impuesto');
   var monedero=localStorage.getItem('monedero');
   var opcion=0;
   var idopcion=0;
   var confoto=localStorage.getItem('llevafoto');
   var bandera=1;
   var campomonto=localStorage.getItem('campomonto'); 
   var montovisual=localStorage.getItem('montocliente');
   var cambiomonto=localStorage.getItem('cambio');
   var comisionpornota=localStorage.getItem('comisionpornota');
   var comisionnota=localStorage.getItem('comisionnota');
   var tipocomisionpornota=localStorage.getItem('tipocomisionpornota');
   var requierefactura=$("#requierefactura").is(':checked')?1:0;
   var idusuariosdatosfiscales=0; 



     $(".opccard").each(function(){
              if($(this).is(':checked')){

                opcion=1;
                idopcion=$(this).attr('id');
              }
          });
    var datostarjeta="";
    var datostarjeta2="";
     if (opcion==1) {
        datostarjeta=$("#datostarjeta_"+idopcion).html();
        datostarjeta2=$("#datostarjetaspan_"+idopcion).text();
      }
     var rutacomprobante=localStorage.getItem('rutacomprobante');
     var comentarioimagenes=localStorage.getItem('comentarioimagenes');
      if (confoto==1) {

        if (localStorage.getItem('rutacomprobante')=='') {
          bandera=0;
        }
      }

       if (requierefactura==1) {
        idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
        if (idusuariosdatosfiscales==0 || idusuariosdatosfiscales==undefined) {
          bandera=0;
        }
      
     }

     console.log(descuentosaplicados);
   var datos='pagos='+localStorage.getItem('pagos')+"&id_user="+iduser+"&constripe="+constripe+"&idtipodepago="+idtipodepago+"&descuentocupon="+descuentocupon+"&codigocupon="+codigocupon+"&sumatotalapagar="+sumatotalapagar+"&comision="+comision+"&comisionmonto="+comisionmonto+"&comisiontotal="+comisiontotal+"&impuestototal="+impuestototal+"&subtotalsincomision="+subtotalsincomision+"&impuesto="+impuesto+"&descuentosmembresia="+JSON.stringify(descuentosmembresia);
      datos+='&confoto='+confoto+"&rutacomprobante="+rutacomprobante+"&comentarioimagenes="+comentarioimagenes;
      datos+='&campomonto='+campomonto+'&montovisual='+montovisual+'&cambiomonto='+cambiomonto;
      datos+='&comisionpornota='+comisionpornota+"&comisionnota="+comisionnota+"&tipocomisionpornota="+tipocomisionpornota;
      datos+='&datostarjeta2='+datostarjeta2+"&monedero="+monedero;
      datos+='&datostarjeta='+datostarjeta;
      datos+='&requierefactura='+requierefactura;
      datos+='&idusuariosdatosfiscales='+idusuariosdatosfiscales;
      datos+='&descuentosaplicados='+JSON.stringify(descuentosaplicados);
    pagina = urlphp+pagina;
    if (bandera==1) {
          $(".dialog-buttons").css('display','none');
         CrearModalEspera();
    var promise = $.ajax({
      url: pagina,
      type: 'post',
      dataType: 'json',
      data:datos,
      async:false,
    success: function(data) {
        informacion=data;
        respuesta=data.respuesta;
        mensaje=data.mensaje;
        pedido=data.idnotapago;

        localStorage.removeItem('idusuariosdatosfiscales');
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                        var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                                 //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                         app.dialog.alert('Error leyendo fichero jsonP '+error,'Error');
                     $(".check-list").css('display','none');
                     $("#aparecerimagen").css('display','none');
                    }
                                       

          });



         promise.then(function(){



             if (respuesta==1) {

                

                     // console.log(informacion);                   

                      var stripe=localStorage.getItem('constripe');
                      if(stripe==1){

                       // RealizarPago(pedido);

                        var output=informacion.output;
                        //var idpedido=informacion.idnota;

                       //  data = datos;
                      var stripe = Stripe(output.publicKey);
                      // Setup Stripe elements to collect payment method details
                      //setupElements(data.publicKey);
                      // Setup event handlers
                      //setupAuthenticationView(data.clientSecret, data.paymentMethod);
                      //setupNewPaymentMethodView(data.clientSecret);
                      //hideEl(".sr-select-pm");

                    if (output.error && output.error === "authentication_required") {
                     var mensaje = "La tarjeta requiere autenticación (3DSecure)";
                                       $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    // PagoNorealizado(mensaje,output.paymentIntent,notapago);
                         // alerta('',mensaje);

                    }
                    else if (output.error==1) {
                  
                      var mensaje = "Opps, La tarjeta fue bloqueada, ha excedido los "+output.intentos+" intentos";
                    //  PagoNorealizado(mensaje,output.paymentIntent,notapago);
                     // alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    }
                     else if (output.error) {
                      var mensaje = "La tarjeta fue declinada";
                    // PagoNorealizado(mensaje,output.paymentIntent,notapago);
                      //alerta('',mensaje);
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','block');
                                        $(".mensajeerror").text(mensaje);
                                        $(".mensajeexito").css('display','none');
                                        $(".butonok").css('display','none');
                                        $(".butoerror").css('display','block');
                                        $$("#btnpagarnota").removeClass('disabled-button');
                                        $$("#btnpagarnota").attr('onclick','RealizarCargo()');

                    
                     } else if (output.succeeded) {
                      // Card was successfully charged off-session
                      // No recovery flow needed
                      paymentIntentSucceeded(stripe,output.clientSecret, ".sr-select-pm");
                      var mensaje = "El pago se ha completado con éxito";
                                        $(".mensajeproceso").css('display','none');
                                        $(".mensajeerror").css('display','none');
                                        $(".mensajeexito").css('display','block');
                                        $(".mensajeexito").text(mensaje);

                                        $(".butonok").css('display','block');
                                        $(".butoerror").css('display','none');
                      localStorage.setItem('membresiaelegida','');

                    // alerta('',mensaje);

                      //PagoRealizado(mensaje,output.paymentIntent,notapago);

                    }


                      }else{

                       
                      setTimeout(function(){
                         LimpiarVariables2();
                         $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','none');
                          $(".mensajeexito").css('display','block');
                          $(".butonok").css('display','block');
                          $(".butoerror").css('display','none');

                      }, 3000);
                         

                      }
       


               }else{
                      var mensaje = "Oops, algo no está bien, intenta de nuevo";


                          $(".mensajeproceso").css('display','none');
                          $(".mensajeerror").css('display','block');
                          $(".mensajeexito").css('display','none');
                          $(".butonok").css('display','none');
                          $(".butoerror").css('display','block');

                      alerta('',mensaje);
               }

                
        

          });

          }else{


              if (bandera==0) {

                    if (localStorage.getItem('rutacomprobante')=='') {
                        alerta('','Falta por subir comprobante');
                      }
              }


               if (requierefactura==1) {
                idusuariosdatosfiscales=localStorage.getItem('idusuariosdatosfiscales');
                if (idusuariosdatosfiscales==0 || idusuariosdatosfiscales==undefined) {
                      alerta('','Falta por seleccionar dato fiscal');

                }
              
             }

          }
        
         }else{

                alerta('','Para poder realizar el pago, el tutor debe pagar los pagos acumulados');

              }
        })


  }else{

    GoToPage('listadopagos');
  }

});
  
      },function () {

          
           

});

}
