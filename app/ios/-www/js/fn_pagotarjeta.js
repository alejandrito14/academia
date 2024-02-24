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

function checkFormFields(cardNumber,cardExpiry,cardCvc) {

    var cardholderName = document.getElementById("v_cardholder-name").value;
    var submitButton = document.getElementById("submit-card");
    console.log(cardNumber._complete);
        console.log(cardExpiry._complete);
        console.log(cardCvc._complete);
    // Verifica si los elementos de tarjeta están completos y si el nombre en la tarjeta está lleno
    if (cardNumber._complete && cardExpiry._complete && cardCvc._complete && cardholderName) {
      submitButton.style.display='';
    } else {
      submitButton.style.display='none';
    }
  }






function NuevaTarjetaStripe(){ 

  var htmlformulario=`
    <div class="" id="divagregartarjeta">

      <div class="divisiones2" style="    margin-bottom: 1em;
    margin-top: 1em;font-weight: bold;"><span style="margin-top: .5em;margin-left: .5em;"></span></div>
      <div class="block h-100 no-margin">

            <div class="row" style="">

      <div class="col-100 margin-left-auto margin-right-auto align-self-center  padding-vertical" style="">

         <div class="form-elements" style="    margin-right: 2em;
    margin-left: 2em;">
         <form action="">
         <div class="list form-list no-margin margin-bottom" id="my-form" style="">
           <ul style="background: black;">
            
              <li class="item-content item-input col-100 item-input-with-value is-valid linombree cambiarfuente">
                <div class="item-inner">
                <div class="item-title item-label" style="    color: #9c9c9c;
    font-size: 18px;" >Nombre en la tarjeta</div> 

                <div class="item-input-wrap" style="font-size: 15px;">
                  <input type="text" name="cardholder-name" placeholder="Nombre en la tarjeta" class="mayusculas place form-control input-with-value cambiarfuente" id="v_cardholder-name" style="font-size:20px;" />
                </div>
                  <label for="" id="lblnombre" class="lbl" style="color:red;"></label>
              
                </div>
              </li>
              <li class="item-content item-content item-input col-100 item-input-with-value is-valid linombree cambiarfuente">
                <div class="item-inner">
                <div class="item-title item-label" style="color: #9c9c9c;
    font-size: 18px;">Número de tarjeta</div>
                <div class="item-input-wrap" style="font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element form-control" id="v_card-number" style="    height: 30px!important;margin-top: .5em;" >
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                 
                </div>
                <label for="" id="lblntarjeta" class="lbl" style="color:red;"></label>
                
                </div>
              </li> 
              <li class="item-content item-content item-input col-100 item-input-with-value is-valid linombree cambiarfuente">
                <div class="item-inner">
                <div class="item-title item-label" style="color: #9c9c9c;
    font-size: 18px;">Fecha de vencimiento</div>
                <div class="item-input-wrap" style="font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element form-control" id="v_card-expiry" style="    height: 30px!important;margin-top: .5em;">
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  
                </div>
                <label for="" id="lblntarjeta" class="lbl" style="color:red;"></label>
                </div>
               

              </li> 

              <li class="item-content item-content item-input col-100 item-input-with-value is-valid linombree cambiarfuente">
                <div class="item-inner">
                <div class="item-title item-label" style="color: #9c9c9c;
    font-size: 18px;">CVC</div>
                <div class="item-input-wrap" style="font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element form-control" id="v_card-cvc" style="    height: 30px!important;margin-top: .5em;">
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                 
                </div>
                <label for="" id="lblcvc" class="lbl" style="color:red;"></label>
               
                </div>
              </li>
          </ul>
          <div class="sr-field-error " id="card-errors" role="alert" style="color:#E25950;margin-left: 1em;"></div>
          <div class=" ">
          
          </div>


        </div>

        </form>

        <a class="button button-fill botonesredondeado botones cambiarfuente " onclick="" id="submit-card" style="height: 60px;
    line-height: 40px;
    /* width: 100%; */
    color: white!important;
    background: #c7aa6a!important;
    display:none;
    margin-top: 1em;">Guardar Tarjeta</a>


         </div> 
      </div>
    </div> 
     </div>
    </div>   

  `;


      // Aquí puedes realizar acciones cuando el modal se ha abierto
      

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: black;">
            <div class="toolbar" style="background: black;">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: black;border-top-left-radius: 20px;border-top-right-radius:20px;    margin-top: 1em; ">
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
                     <p class="titulomodal cambiarfuente" style="text-align: center;font-size: 20px;color:#C7AA6A; ">Ingresar datos de tarjeta</p>
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
           
         if (tipoletra!='') {
                $(".cambiarfuente").addClass(tipoletra);
              }

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


  
  // Agregar eventos para verificar cuando los campos cambien
 



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
    
      var elementStyles = {
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
        
      };
    
      var elementClasses = {
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
  });



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
             
              var cardname = document.getElementById("v_cardholder-name").value;

              //changeLoadingState(true);
               const myPromise = new Promise((resolve, reject) => {
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
}

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