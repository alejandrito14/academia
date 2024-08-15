var lastcard=0;
var dynamicSheet1="";
function PagoTarjeta() {
    app.router.navigate("/continuarstripe/");
}

function BackTo(){
      
      app.router.navigate("/continuarmetodopago/");
}
 
function BackToList(){
  HideDiv("divagregartarjeta");
  ShowDiv("divlistadotarjetas");
  $("#abackpage").attr("onclick","BackTo()");
  ShowDiv("btnnextpage");

}
function HideDiv(divid){
  $("#"+divid).css('visibility','hidden');
  $("#"+divid).css('display','none');
}

function ShowDiv(divid){
  $("#"+divid).css('visibility','visible');
  $("#"+divid).css('display','block');
}

function ObtenerTarjetasStripe(setlastcard=false) {
    var idtipodepago=localStorage.getItem('idtipodepago');
    var fname = "getCardList";
    var pagina = "ObtenerDatosStripe.php";
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
            PintarTarjetas(datos,setlastcard);
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

function NuevaTarjetaStripe(){ 

  var htmlformulario=`
    <div class="" id="divagregartarjeta">

      <div class="divisiones2" style="    margin-bottom: 1em;
    margin-top: 1em;font-weight: bold;"><span style="margin-top: .5em;margin-left: .5em;"></span></div>
      <div class="block h-100 no-margin">

            <div class="row" style="">

      <div class="col-85 margin-left-auto margin-right-auto align-self-center  padding-vertical" style="">

         <div class="">
         <div class="list form-list no-margin margin-bottom" id="my-form" style="">
           <ul>
            
              <li class="item-content item-input is-valid linombree">
                <div class="item-inner">
                <div class="item-title item-label" >*Nombre en la tarjeta</div> 

                <div class="item-input-wrap" style="height: 56px;font-size: 15px;">
                  <input type="text" name="cardholder-name" placeholder="TITULAR DE LA TARJETA" class="mayusculas place input-with-value" id="v_cardholder-name" />
                  <span class="input-clear-button"></span>
                </div>
                  <label for="" id="lblnombre" class="lbl" style="color:red;"></label>
              
                </div>
              </li>
              <li class="item-content item-input is-valid linombree">
                <div class="item-inner">
                <div class="item-title item-label">*Número de tarjeta</div>
                <div class="item-input-wrap" style="height: 56px;font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element" id="v_card-number" style="margin-top: .5em;" >
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  <span class="input-clear-button"></span>
                </div>
                <label for="" id="lblntarjeta" class="lbl" style="color:red;"></label>
                
                </div>
              </li> 
              <li class="item-content item-input is-valid linombree">
                <div class="item-inner">
                <div class="item-title item-label">*Fecha de vencimiento</div>
                <div class="item-input-wrap" style="height: 56px;font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element" id="v_card-expiry" style="margin-top: .5em;">
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  <span class="input-clear-button"></span>
                </div>
                <label for="" id="lblntarjeta" class="lbl" style="color:red;"></label>
                </div>
               

              </li> 

              <li class="item-content item-input is-valid linombree">
                <div class="item-inner">
                <div class="item-title item-label">*CVC</div>
                <div class="item-input-wrap" style="height: 56px;font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element" id="v_card-cvc" style="margin-top: .5em;">
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  <span class="input-clear-button"></span>
                </div>
                <label for="" id="lblcvc" class="lbl" style="color:red;"></label>
               
                </div>
              </li>
          </ul>
          <div class="sr-field-error " id="card-errors" role="alert" style="color:#E25950;margin-left: 1em;"></div>
          <div class=" ">
          
          </div>


        </div>

        <a class="button button-fill botonesredondeado botones" onclick="" id="submit-card" style="height: 60px;
    line-height: 40px;
    /* width: 100%; */
    color: white!important;
    background: #FFC830!important;
    
    margin-top: 1em;">Guardar Tarjeta</a>



     <a class="button button-fill botonesredondeado botones" onclick="" id="btnatras" style="height: 60px;
    line-height: 40px;
    color: white!important;
    background: red!important;
  
    margin-top: 1em;">Cancelar</a>  
         </div> 
      </div>
    </div> 
     </div>
    </div>   

  `;


      // Aquí puedes realizar acciones cuando el modal se ha abierto
      

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: white;">
            <div class="toolbar" style="background: white;">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px;    margin-top: 1em; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
                    <span class="bi bi-x-circle-fill"></span>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: white; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <p class="titulomodal" style="    text-align: center;
    font-size: 18px;
    font-weight: bold;">Nueva tarjeta</p>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                  
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
              var displayError = document.getElementById("card-errors");
              displayError.textContent = "";
              LoadSetupIntent();

            $$("#btnatras").attr('onclick','CancelarNuevaTarjeta()');
          },
          close:function (sheet) {
            // BorrarIntervalo();
          
          },
        }
      });

       dynamicSheet1.open();
  
 
}

function CancelarNuevaTarjeta() {
  dynamicSheet1.close();
  //setupComplete(stripe, setupIntent.client_secret);
  //ObtenerTarjetasStripe(true);
}

function PintarTarjetas(tarjetas,setlastcard=false) {


    var html = '';
    var logo = localStorage.getItem('logo');
    if (tarjetas.length > 0) {
      $("#btnatras").css('display','block');
        checked = "";
        checkclass = "opccard"

       
        lastcardid = GetLastCard().lastcard_stripe;
        for (var i =0; i < tarjetas.length; i++) {
            if(lastcardid == tarjetas[i].id  && setlastcard == false)
              checked = "checked";
            else if(setlastcard && i == 0){
              SetLastCard(tarjetas[i].id);
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
            <div id="datostarjeta_`+ checkclass + i +`" style="line-height: 2em;">
            <img src="`+imagenesbancos + tarjetas[i].card.brand + `.png" alt="card" style="float:left;" width="36" height="32">`+
            `<span id="datostarjetaspan_`+ checkclass + i +`"  >&nbsp&nbsp****` + tarjetas[i].card.last4 + `&nbsp&nbsp`+
            
             ("0" + tarjetas[i].card.exp_month).slice(-2) + "/" + ("0" + tarjetas[i].card.exp_year).slice(-2) +`</span><div>
              </div>
            </div>

            

            </div>

                <div class="col-20" style="margin: 0;
    padding: 0;">
                ` +
                    `<a class="botoneliminar" style="line-height:0;margin-top: 0;margin-left:1em;" onclick="eliminarTarjeta('`+tarjetas[i].id +`','scard`+i+`');" style="float:left" >
                       <i style="color:red;font-size:22px;" class="bi bi-trash-fill"></i>`+
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
        html += `<div class="simple-list">No tienes tarjetas guardas</div>`;
        //HideDiv("btnnextpage");
        SetLastCard(null);
        //LoadSetupIntent();       
    }
 

    $("#listadotarjetas").html(html);
}

function LoadSetupIntent(){

 
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
    $("#abackpage").attr("onclick","BackToList()");
    
          var clavepublica=localStorage.getItem('clavepublica');

  //  var pkey = "pk_test_51JNNdFJrU4M0Qnc879SI1I0o7BIpTnoMgioMaKYGDbOjTLCcfl8Rx8TLTlqPbBEifMXrRGqREEOBjCXY6RQo83Uw00M5z8GOPe"
    var pkey = clavepublica;
 
    var stripe = Stripe(pkey);
    var elements = stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
          },
        ],
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        locale: window.__exampleLocale
      });
    
      // Floating labels
      var inputs = document.querySelectorAll('.cell.example.example2 .input');
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener('focus', function() {
          input.classList.add('focused');
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
    
      var elementStyles = {
        base: {
          color: '#212121',
          fontWeight: 500,
          fontFamily: 'inherit',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
    
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
      };
    
      var elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
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

    /////SetupIntent/////
    var fname = "setupIntent";
    var pagina = "ObtenerDatosStripe.php";
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
              //changeLoadingState(true);
              var cardname = document.getElementById("v_cardholder-name").value;
          
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
                    // The PaymentMethod was successfully set up
                    setupComplete(stripe, setupIntent.client_secret);
                    ObtenerTarjetasStripe(true);
                  }
                });
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

function setupComplete(stripe, clientSecret) {
  stripe.retrieveSetupIntent(clientSecret).then(function(result) {
    var setupIntent = result.setupIntent;
    var setupIntentJson = JSON.stringify(setupIntent, null, 2);

    //document.querySelector(".sr-payment-form").classList.add("hidden");
    //document.querySelector(".sr-result").classList.remove("hidden");
    //document.querySelector("pre").textContent = setupIntentJson;
    //setTimeout(function() {
    //  document.querySelector(".sr-result").classList.add("expand");
    //}, 200);

    //changeLoadingState(false);
  });
};

function eliminarTarjeta(icard,idtag){
  var idtipodepago=localStorage.getItem('idtipodepago');


  app.dialog.confirm('','¿Seguro que desea eliminar la tarjea?', function () {
  app.preloader.show();
  $.post(urlphp + "borrartarjeta.php",
  {
    fname: "deleteCard",
    id: icard,
    idtipodepago:idtipodepago
  })
  .done(function (result, status, xhr) { 
      HideDiv(idtag);
     
      var checkbox = $("#" + idtag + " label input");
      if(checkbox.is(":checked")){

        ObtenerTarjetasStripe(true);

      }
      app.preloader.hide();
  })
  .fail(function (xhr, status, error) {
      app.preloader.hide();
  });
});
}

///CUANDO SELECCIONAMOS UNA TARJETA////
function CheckCardSelection(obj,objclass,cardid)
{
  $('.'+objclass).prop('checked', false);
  $("#"+ obj.id).prop('checked', true);

  SetLastCard(cardid);
 

}

function SetLastCard(cardid) {
  var idtipodepago=localStorage.getItem('idtipodepago');

  var fname = "setLastCard";
  var pagina = "ObtenerDatosStripe.php";
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

function GetLastCard() {
  var idtipodepago=localStorage.getItem('idtipodepago');

  var fname = "getLastCard";
  var pagina = "ObtenerDatosStripe.php";
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

function EstablecerNombreCliente(){

  var idtipodepago=localStorage.getItem('idtipodepago');

  var fname = "getClientName";
  var pagina = "ObtenerDatosStripe.php";
  var idcliente = localStorage.getItem('id_user');
  var datos = "idcliente=" + idcliente + "&fname="+fname+"&idtipodepago="+idtipodepago;
  var lastcard;

  var checkbox = $("#checkclassnombre");
 // if(checkbox.is(":checked")){
  $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp + pagina,
      data: datos,
      async: false,
      success: function (datos) {
        clientname = datos;
        console.log(clientname);
       $('#v_cardholder-name').val(clientname.nombre + " " +clientname.paterno );

      }, error: function (XMLHttpRequest, textStatus, errorThrown) {
          var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
          console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
      }
  });
  //}
  /*else{
    $('#v_cardholder-name').val("");
  }*/
}

function RealizarPago(idpedido) {
  //changeLoadingState(true, "#submit");
  CreatePaymentIntent(idpedido);
}

function CreatePaymentIntent(idpedido) {
  //alert(idpedido);
  var idtipodepago=localStorage.getItem('idtipodepago');
  var fname = "paymentIntent";
  var pagina = "ObtenerDatosStripe.php";
  var idcliente = localStorage.getItem('id_user');
  var datos = "idcliente=" + idcliente + "&fname="+fname+"&idtipodepago="+idtipodepago+"&idpedido="+idpedido;
  var data;
  $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp + pagina,
      data: datos,
      async: false,
      success: function (datos) {
        data = datos;
        var stripe = Stripe(data.publicKey);
        // Setup Stripe elements to collect payment method details
        //setupElements(data.publicKey);
        // Setup event handlers
        //setupAuthenticationView(data.clientSecret, data.paymentMethod);
        //setupNewPaymentMethodView(data.clientSecret);
        //hideEl(".sr-select-pm");

      if (data.error && data.error === "authentication_required") {
       var mensaje = "La tarjeta requiere autenticación (3DSecure)";
       PagoNorealizado(mensaje,data.paymentIntent,idpedido);

      } else if (data.error) {
        var mensaje = "La tarjeta fue declinada";
        PagoNorealizado(mensaje,data.paymentIntent,idpedido);
      } else if (data.succeeded) {
        // Card was successfully charged off-session
        // No recovery flow needed
        paymentIntentSucceeded(stripe,data.clientSecret, ".sr-select-pm");
        var mensaje = "El pago se ha completado con éxito";
       
        PagoRealizado(mensaje,data.paymentIntent,idpedido);

      }

      }, error: function (XMLHttpRequest, textStatus, errorThrown) {
          var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
          console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
      }
  });

}

function showEl (selector) {
  document.querySelector(selector).classList.remove("hidden");
}

function hideEl (selector) {
  document.querySelector(selector).classList.add("hidden");
}

/* Show a success message when the payment is complete */
function paymentIntentSucceeded(stripe,clientSecret, viewSelector) {
  //hideEl(viewSelector);
  //showEl(".code-preview");
 
  stripe.retrievePaymentIntent(clientSecret).then(function(result) {
    var paymentIntent = result.paymentIntent;
    var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
   // alert(paymentIntent.status);
    //document.querySelector("pre").textContent = paymentIntentJson;
    //document.querySelector(".code-preview").classList.add("expand");
  });
};