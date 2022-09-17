function ObtenerAnuncios(omitiralfinal) {

	
    /*  var swiper = new Swiper(".introswiper", {
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
        },
      });*/
 

	var pagina = "ObtenerAnuncios.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			var anuncios=datos.respuesta;
			PintarAnuncios(anuncios,omitiralfinal);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarAnuncios(anuncios,omitiralfinal) {
		var html="";
	for (var i = 0; i <anuncios.length; i++) {
		var imagen="";
		imagen=urlimagenes+`anuncios/imagenes/`+codigoserv+anuncios[i].imagen;

		classe="";
		if (i==0) {
			classe="swiper-slide-active";
		}

		/* if (anuncios[i].imagen!='') {

              	html+=`<img src="`+imagen+`" alt="" class="max-width-100 margin-left-auto margin-right-auto margin-bottom" style="width:300px;">`;

              }*/

		html+=`
		  <div class="swiper-slide `+classe+`" role="group"  style="    padding: 0;
    margin: 0; "  id="slider_`+i+`">
              <img class="row h-100" src="`+imagen+`" style="height:100%;width:100%;"/>

              <div class="textolandig">
              <div class="">
              <div class="">`

             
          
             html+=` </div>
              <div class="">
              <div class="">`;
              if (anuncios[i].titulo!='') {
              	html+=`<h1 class="text-color-theme margin-bottom" style="font-size:30px;">
             `+anuncios[i].titulo+`
             </h1>`;

              }
              
              if (anuncios[i].descripcion!='') {

              	html+=` <p class="size-18 text-muted " style="font-size:20px;color:white!important;">
              `+anuncios[i].descripcion+`
              </p>`;
              }
            
             
                     html+=  `</div>
                         </div>
                        </div>
                       </div>
                     </div>

          </div>

		`;

	}

	$("#swiper-wrapper-anuncios").html(html);

			 var swiper = new Swiper('.swiper-anuncios', {

				      pagination: {
				        el: '.swiper-pagination',
				       dynamicBullets:true,
				      },
				     /* slideToClickedSlide: true,
				      lazyLoading:true,*/
				   		

				    });

	  var cantidad= anuncios.length-1;


	  if (anuncios.length>1) {
	  	$(".skipbtn").text('Siguiente');
		$(".skipbtn").attr('onclick','Omitir()');


	  }else{
	  	$(".skipbtn").attr('onclick','Saltar()');
		$(".skipbtn").text('Omitir');

	  }
	if (omitiralfinal==1) {
		console.log(swiper);
		swiper.on('slideChange', function (e) {
		   console.log('*** mySwiper.activeIndex', swiper.activeIndex);
		  

			    if (swiper.activeIndex==cantidad) {
			    	 $(".skipbtn").text('Ok');
			    	 $(".skipbtn").css('display','block');
			   		 $(".skipbtn").attr('onclick','Saltar()');

			    }else{
			    	$(".skipbtn").text('Siguiente');
			    	$(".skipbtn").attr('onclick','Omitir()');

			    	//$(".skipbtn").css('display','none');
			    }

			    	var contenedor = app.swiper.get('.swiper-anuncios');
			console.log(contenedor);

		});

		swiper.on('slideChangeTransitionEnd', function (e) {
		   console.log('ok mySwiper.activeIndex', swiper.activeIndex);
		  

		});

		
	
		


	}else{

		$(".skipbtn").attr('onclick','Saltar()');
		$(".skipbtn").text('Omitir');
	}


	
}
function Omitir() {
	var swiper = app.swiper.get('.swiper-anuncios');
	swiper.slideNext();

}

/*document.addEventListener('swiper-anuncios', function(e) {
    console.log(e.target); // the element that was swiped
    console.log(e.detail.dir); // swiped direction
});*/

function Saltar() {

	var logged = localStorage.getItem('session');
	var iduser=0;
	if (logged === '1') {
		iduser=localStorage.getItem('id_user');

	}
	if (iduser>0) {

		var respuesta=0;
		var datos="id_user="+iduser;
		var pagina = "SaltarAnuncios.php";
		var promise=$.ajax({
			type: 'POST',
			dataType: 'json',
			data:datos,
			url: urlphp+pagina,
			success: function(resp){
				console.log(resp.respuesta);
				
				var respuesta=resp;

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
					if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
					if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
									//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
									console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});



		 promise.then(function(respuesta){

		 	if(respuesta.respuesta == 1) {
				
					 var id_user=localStorage.getItem('id_user');
    			     var session=localStorage.getItem('session');
   				     var idtipousuario=localStorage.getItem('idtipousuario');
				 if (id_user>0 && session==1) {

				          if (idtipousuario==2) {
				              app.views.main.router.navigate('/homeadmin/');

				          }
				          if (idtipousuario==3) {
				              app.views.main.router.navigate('/home/');

				          }
				          if (idtipousuario==5) {
				              app.views.main.router.navigate('/homecoach/');

				          }
				  

				      }else{
				           app.views.main.router.navigate('/login/');

				      }

				}

		 });
	}else{

		localStorage.setItem('anunciovisto',1);
		localStorage.removeItem("id_user");
		GoToPage('login');

	}

}

function getVistoAnuncio() {
    return new Promise(function(resolve, reject) {
	iduser=localStorage.getItem('id_user');

	var datos="id_user="+iduser;


		var pagina = "ObtenerVistoAnuncio.php";
				$.ajax({
				type: 'POST',
				dataType: 'json',
				data:datos,
				url: urlphp+pagina,
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



function getValidacionTelefono() {

    return new Promise(function(resolve, reject) {
	iduser=localStorage.getItem('id_user');

	var datos="id_user="+iduser;
		var pagina = "ObtenerValidaciontelefono.php";

				$.ajax({
				type: 'POST',
				dataType: 'json',
				data:datos,
				url: urlphp+pagina,
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