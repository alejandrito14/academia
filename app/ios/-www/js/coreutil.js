//////////GENERAL FUNCTIONS////////////

function HideTag(tid){
	$("#"+tid).css('visibility','hidden');
	$("#"+tid).css('display','none');
}
  
function ShowTag(tid){
	$("#"+tid).css('visibility','visible');
	$("#"+tid).css('display','block');
}

function GoToPage(page)
{
	if (page == "/")
		app.views.main.router.navigate("/",{reloadCurrent: false});
	
	else{
		app.views.main.router.navigate("/"+page+"/",{reloadCurrent: false});
    	//	app.views.main.router.navigate("/"+page+"/",{reloadCurrent: false,clearPreviousHistory:true,});

    //GoToPage("/"+page+"/",{reloadCurrent: false});
	}
}

function GoToPageHistory(page)
{
	if (page == "/")
		app.views.main.router.navigate("/",{reloadCurrent: false});
	
	else{
		
		app.views.main.router.navigate("/"+page+"/",{reloadCurrent: false,clearPreviousHistory:true,});
    	//	app.views.main.router.navigate("/"+page+"/",{reloadCurrent: false,clearPreviousHistory:true,});

    //GoToPage("/"+page+"/",{reloadCurrent: false});
	}
}

function GetServerData(sUrl,sParams,sPage){
	var rdata 
	jQuery.support.cors = true;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: sUrl + sPage,
        data: sParams,
        async: false,
        success: function (data) {
            rdata = data;
			//alert(rdata);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
			//alert(XMLHttpRequest.responseText);
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + sPage + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            console.log("Error leyendo fichero jsonP " + sPage + " " + error, "ERROR");
            rdata = null;       
        }
    });
	return rdata
}


function LoadJS(jsname)
{
    var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = jsname;
	document.body.appendChild(script);
}

////////////////PAGE FUNCTIONS///////////////////

function BackPage(page,backPage){
	$$('#aback_' + page).on('click', function (e) {
		GoToPage(backPage);
	});
}

function NextPage(page,nextPage){
	$$('#anext_' + page).on('click', function (e) {
		GoToPage(nextPage);
	});
}

function SetPageTitle(page,title){
	$("#tlt_" + page).text(title);
}

function SetPageSubtitle(page,title){
	$("#stlt_" + page).text(title);
}

function HideNextBtn(page)
{
	HideTag("dnext_" + page);
}

function HideBackBtn(page)
{
	HideTag("dback_" + page);
}


function ShowNextBtn(page)
{
	ShowTag("dnext_" + page);
}

function ShowBackBtn(page)
{
	ShowTag("dback_" + page);
}

function BuscarEnarray(array,elemento) {
	
	for (var i = 0; i <array.length; i++) {
		
		if (array[i]==elemento) {
			return true;
			break;
		}
	}
}

function BuscarPosicion(array,elemento) {
	
	for (var i = 0; i <array.length; i++) {
		
		if (array[i]==elemento) {
			return i;
		}
	}
}


///////////////WIDGETS//////////////


///////Convertir en widget buscador/////
function FiltrarDatos(idInput,jData,idName) {

	var buscador=$("#"+idInput).val();
	var concidencia=[];
	//var listado=JSON.parse(jData);
	var listado=jData;
  
	if (buscador!='') {
	if (listado.length>0) {
	
	
	for (var i =0; i < listado.length; i++) {
	  $(".clasesp"+listado[i][idName]).each(function() { //checar para estandarizar id
			cadena=$(this).text().toLowerCase();
			if (cadena.indexOf(buscador.toLowerCase())!=-1 ) {
				  if (!BuscarEnarray(concidencia,listado[i][idName])) {
					concidencia.push(listado[i][idName]);
				  }
			}else{
				  if (BuscarEnarray(concidencia,listado[i].idcliente)) {
					posicion=BuscarPosicion(concidencia,listado[i][idName]);
					concidencia.splice(posicion,posicion);
				  }
			}
	
		//console.log(concidencia);
	  });
	}
	  $(".categoriaslip").css('display','none');
	
	  if (concidencia.length>0) {
		for (var i =0; i <concidencia.length; i++) {
		  
		  $(".clasesp"+concidencia[i]).css('display','block');
		  }
		}else{
			$(".categoriaslip").css('display','none');
			$(".clasesp0").css('display','block');
		}
	  }else{
		$(".categoriaslip").css('display','none');
		$(".clasesp0").css('display','block');
	  }
	}else{
	  $(".categoriaslip").css('display','block');
		$(".clasesp0").css('display','none');
	}
}

///////Converitr en widget buscador////
function LimpiarFiltro(argument) {
	$(".categoriaslip").css('display','block');
	$(".clasesp0").css('display','none');
}

class MediaList {
	constructor() {
	  this.liClass = '';
	  this.aOnclick = '';
	  this.imageWidth = '54px'
	  this.itemMediaSrc = '';
	  this.title = '';
	  this.afterTitle = '';
	  this.subtitle = "";
	  this.btnTitle = ""
	  this.text = "";
	  this.html = "";
	  this.showButton = true; 
	}

	getHtml(){
		var htmlItemMedia = '';
		if (this.itemMediaSrc != ''){
			htmlItemMedia = 
			`<div class="item-media">
			   	<img src="`+this.itemMediaSrc+`" width="`+this.imageWidth+`" />
			</div>`
		}
		var htmlCardFooter = "";
		if (this.btnTitle != ""){
			htmlCardFooter = 
			`<div class="card-footer"><a href="#" class="link" style="visibility:hidden;">Like</a><a onclick="`+ this.aOnclick +`" class="button button-small button-round button-fill">`+ this.btnTitle +`</a></div>`
		}

		this.html += `
		  <div class="card `+ this.liClass +`">
		  <div class="card-content card-content-padding">
		  <div class="list media-list">
		  <a onclick="#" class="item-content">`
		  		+ htmlItemMedia +
		  	   `<div class="item-inner" style="padding-bottom:8px;">
			  	<div class="item-title-row">
					<div class="item-title">`+ this.title + `</div>
					<div class="item-after">`+this.afterTitle+`</div>
			  	</div>
			  	<div class="item-subtitle">`+ this.subtitle+`</div>
			  	<div class="item-text" style="width:100%;">
			  		`+this.text+`
			  	</div>
		  </div>
		  </a>
		  </div>
        </div>`
		+htmlCardFooter+
		`</div>`;	  	
		return this.html;
	}
  }

  
  function BuscarEnLista(idbuscador,clista) {


		var buscador=$(idbuscador).val().toLowerCase();
		//console.log(buscador);
		//var datos="idsucursal="+idsucursal+"&buscador="+buscador;
	
		$(clista).each(function(){
				var id=$(this).attr('id');
				obtener=$('#'+id).text().toLowerCase();
				cadena=$(this).text().toLowerCase();

				//console.log(cadena);
					  if (obtener.indexOf(buscador.toLowerCase())!=-1 ) {
						  $('#'+id).css('display','block');	
					  }else{
						  $('#'+id).css('display','none');	
					  }
			});
}

function myStopFunction(variable) {
  clearInterval(variable);
  variable=false;
  identificadorDeTemporizador=false;
}

function LimpiarResultado(clista) {
	$(clista).css('display','block');
}


function CrearModalEsperaDialog() {
  

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

                  <div id="" class="mensajeproceso" style="font-size:20px;font-weight:bold;" >En proceso...
                    <img src="img/loading.gif" style="width:20%;display: flex;justify-content: center;align-items: center;margin:0px auto;">

                  </div>
                  <div id="" class="mensajeerror" style="font-size:20px;font-weight:bold;display:none;" >Error en la conexción,vuelva a intentar.</div>
                  <div id="" class="mensajeexito" style="font-size:20px;font-weight:bold;display:none;" >Se realizó correctamente</div>




                <span class="dialog-button dialog-button-bold botonok" onclick="CerrarEspera()" style="display:none;position:static!important;">OK</span>


                  <div style="color:red;font-size:20px;"></div>

                     
                      
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