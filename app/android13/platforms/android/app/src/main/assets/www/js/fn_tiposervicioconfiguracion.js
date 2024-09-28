function Obtenerservicioconfiguracion(idtiposervicio) {
	
	var pagina="ObtenerServicioConfiguracion.php";
	$.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    success: function(resp){
    	var respuesta=resp.respuesta;
    	PintardatosservicioConfiguracion(respuesta,idtiposervicio);
    	 

	},error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}

function PintardatosservicioConfiguracion(resp,idtiposervicio) {
	var html="";
    html+=`<option value="" disabled selected>Seleccionar</option>`;

texto="";

	if (resp.length>0) {
		for (var i = 0; i <resp.length; i++) {
            var selected="";
            if (resp[i].idtiposervicioconfiguracion==idtiposervicio) {
                selected="selected";
                texto=resp[i].nombre;


            }
			html+=`
			<option value="`+resp[i].idtiposervicioconfiguracion+`" `+selected+`>`+resp[i].nombre+`
		        </option>
		     

			`;
		}
	}

	$("#listadotipoconfiguracion").html(html);
    $("#listadotipoconfiguracion").closest('.item-link').find('.item-after').text(texto);

}


function Obtenerservicioconfiguracion2(idtiposervicio) {
    
    var pagina="ObtenerServicioConfiguracion.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    async:false,
    success: function(resp){
        var respuesta=resp.respuesta;
        PintardatosservicioConfiguracion2(respuesta,idtiposervicio);
         

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}

function PintardatosservicioConfiguracion2(resp,idtiposervicio) {
    var html="";
    html+=`<option value="" disabled selected>Seleccionar</option>`;

texto="";

    if (resp.length>0) {
        for (var i = 0; i <resp.length; i++) {
            var selected="";
            if (resp[i].idtiposervicioconfiguracion==idtiposervicio) {
                selected="selected";
                texto=resp[i].nombre;


            }
            html+=`
            <option value="`+resp[i].idtiposervicioconfiguracion+`" `+selected+`>`+resp[i].nombre+`
                </option>
             

            `;
        }
    }

    $("#listadotipoconfiguracion2").html(html);
    $("#listadotipoconfiguracion2").closest('.item-link').find('.item-after').text(texto);

}

function ObtenerConfiguracionTipoServicio(idtiposervicioconfiguracion) {
	var datos="idtiposervicioconfiguracion="+idtiposervicioconfiguracion;
	var pagina="ObtenerTipoServicioConfiguracion.php";
	$.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    success: function(resp){
    	$(".tiposervicioconfiguracion").css('display','none');
    	$(".formulario").css('display','block');
    	ObtnerCategorias(idtiposervicioconfiguracion,0);
	},error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });

}

function ObtnerCategorias(idtiposervicioconfiguracion,idvalorseleccionado) {
		var datos="idtiposervicioconfiguracion="+idtiposervicioconfiguracion;
	var pagina="ObtenerCategorias.php";
	$.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    success: function(resp){
    		var resp=resp.respuesta;
    	PintarCategorias(resp,idvalorseleccionado);
	},error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}
function PintarCategorias(resp,idvalorseleccionado) {
	
   // alert(idvalorseleccionado);

	// Suponiendo que tienes el conjunto de datos que proporcionaste almacenado en una variable llamada 'categorias'
let categorias = resp;

// Obtener el elemento con el id "listadocategorias" para usarlo como contenedor del slider
var html="";
    html+=`<option value="" disabled selected>Seleccionar</option>`;

// Crear un string para almacenar el HTML de los slides
let slidesHTML = '';
var texto="";
if (categorias.length>0) {
// Iterar sobre cada categoría y construir el HTML para el contenido de cada slide
categorias.forEach(categoria => {
    selected="";
    if (idvalorseleccionado==categoria.idcategorias) {
        selected="selected";
        texto=categoria.titulo;
    }
  html += `
    <option value="`+categoria.idcategorias+`" `+selected+`>`+categoria.titulo+`</option>` ;
});


    $("#listadotipocategoria").html(html);
    //texto
    $("#listadotipocategoria").closest('.item-link').find('.item-after').text(texto);

  }

}


function ObtenerSubsubcategorias(idcategorias) {
	var datos="idcategorias="+idcategorias;
	var pagina="ObtenerSubsubCategorias.php";
	$.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    success: function(resp){
    	var resp=resp.respuesta;
    	PintarSubsubCategorias(resp);


	},error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}

function PintarSubsubCategorias(resp) {
		

	// Suponiendo que tienes el conjunto de datos que proporcionaste almacenado en una variable llamada 'categorias'
let categorias = resp;

// Obtener el elemento con el id "listadocategorias" para usarlo como contenedor del slider
let listadoCategorias = document.getElementById('listadosubcategorias');
  
// Crear un string para almacenar el HTML de los slides
let slidesHTML = '';
slidesHTML+=`<option value="" disabled selected>Seleccione un nivel</option>`;
if (categorias.length>0) {

// Iterar sobre cada categoría y construir el HTML para el contenido de cada slide
categorias.forEach(categoria => {
  slidesHTML += `
  <option  id="btnsubsub_`+categoria.idcategoriasservicio+`" value="`+categoria.idcategoriasservicio+`" style=" font-size: 10px; padding: 5px;" >`+categoria.nombrecategoria+`</option>`;
});

// Asignar el HTML generado al contenido del contenedor del slider
listadoCategorias.innerHTML = slidesHTML;


  }else{

  listadoCategorias.innerHTML="";

  }


  //onclick="ObtenerDetalleSubsubcategoria(`+categoria.idcategoriasservicio+`)"

}





function ObtenerCategoriasLigadas() {
  var idusuario=localStorage.getItem('id_user');
  var datos="idusuario="+idusuario;
  var pagina="ObtenerCategoriasLigadas.php";
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    success: function(resp){
      
      var resp=resp.tipocoach;
      PintarSubsubCategoriasCoach(resp);

  },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}


function PintarSubsubCategoriasCoach(respuesta) {
    
 /* var html="";
  if (respuesta.length>0) {
    for (var i = 0; i <respuesta.length; i++) {
      html+=`
      <div class="block block-strong block-outline-ios">
            <p class="grid grid-cols-2 grid-gap">
             
              <button class="button button-large button-round button-fill" onclick="ObtenerConfiguracionSubcategoria(`+respuesta[i].idtiposervicioconfiguracion+`,`+respuesta[i].idsubcategoria+`)">`+respuesta[i].nombre+`</button>
            </p>
          </div>

      `;
    }
  }

  $(".tiposervicioconfiguracion").html(html);*/
  var idtiposervicioconfiguracion= respuesta[0].idtiposervicioconfiguracion;
  var idsubcategoria=respuesta[0].idsubcategoria;
  var nombresubcategoria=respuesta[0].nombre;
  var costo=respuesta[0].costo;
ObtenerConfiguracionSubcategoria(idtiposervicioconfiguracion, idsubcategoria)
    .then(function(respuesta) {
        // Hacer algo con la respuesta si es exitosa
        console.log('return promesa');

        console.log(respuesta);
        localStorage.setItem('idtiposervicioconfiguracion',idtiposervicioconfiguracion);
        localStorage.setItem('idsubcategoria',idsubcategoria);
        ObtenerSubsubcategorias(idsubcategoria);
        var tiposervicio=respuesta.tiposervicio[0];
        var precio=0;
        if (costo!=0) {
           precio=costo;
        }else{

           precio=tiposervicio.precio;
        }
        
        
        $("#v_costo").val('$'+precio);
        $("#licategorias").css('display','none');
        $("#lisubcategorias").css('display','none');
        $("#txtcategoria").html(nombresubcategoria);
        $("#v_descripcion").css('display','none');
        $(".lidescripcion").css('display','none');
        $("#costos-tab").css('display','block');
        $("#profile-tab").css('display','block');
        $("#v_costo").addClass('input-focused"');
        $(".classli").addClass('item-input-focused');
        $(".lisubcategoriasli").css('display','block');
        $("#v_costo").prop('disabled','disabled');
        
    })
    .catch(function(error) {
        // Manejar el error si la promesa es rechazada
        console.error(error);
    });


}


function ObtenerConfiguracionSubcategoria(idtiposervicioconfiguracion,idsubcategoria) {
  
  var datos="idtiposervicioconfiguracion="+idtiposervicioconfiguracion;

  var pagina="ObtenerTipoServicioConfiguracion.php";

    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp + pagina,
            data: datos,
            success: function(resp) {
                //$(".tiposervicioconfiguracion").css('display', 'none');
                $(".formulario").css('display', 'block');
                // Puedes hacer más manipulación de los datos si es necesario antes de resolver la promesa
                resolve(resp);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var error;
                if (XMLHttpRequest.status === 404) {
                    error = "Página no existe " + pagina + " " + XMLHttpRequest.status;
                } else if (XMLHttpRequest.status === 500) {
                    error = "Error del Servidor " + XMLHttpRequest.status;
                } else {
                    error = "Error desconocido en la solicitud AJAX";
                }
                // También podrías pasar más información en el reject si es necesario
                reject(error);
            }
        });
    });

}

function ObtenerDetalleSubsubcategoria(idsubsubcategoria) {


    $(".btnsub").removeClass('button-outline');
    $("#btnsubsub_"+idsubsubcategoria).addClass('button-fill');

    var datos="idsubsubcategoria="+idsubsubcategoria;
    var pagina="ObtenerDetalleSubsubcategoria.php";
    $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlphp + pagina,
            data: datos,
            success: function(resp) {
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var error;
                if (XMLHttpRequest.status === 404) {
                    error = "Página no existe " + pagina + " " + XMLHttpRequest.status;
                } else if (XMLHttpRequest.status === 500) {
                    error = "Error del Servidor " + XMLHttpRequest.status;
                } else {
                    error = "Error desconocido en la solicitud AJAX";
                }
                // También podrías pasar más información en el reject si es necesario
                reject(error);
            }
        });
}

  /**/

function ObtenerHorariosparaSeleccion(argument) {
    console.log('horariosseleccion');
    var idsubcategoria = localStorage.getItem('idsubcategoria');
    var idsubsubcategoria = $("#listadosubcategorias").val();
    var domingo = 0, lunes = 0, martes = 0, miercoles = 0, jueves = 0, viernes = 0, sabado = 0;
    var v_dias = [];

    $$('#v_dias option:checked').each(function () {
        var valor = $(this).val();
        v_dias.push(valor);

        switch (parseInt(valor)) {
            case 0: domingo = 1; break;
            case 1: lunes = 1; break;
            case 2: martes = 1; break;
            case 3: miercoles = 1; break;
            case 4: jueves = 1; break;
            case 5: viernes = 1; break;
            case 6: sabado = 1; break;
        }
    });

    var datos = {
        v_tipocategoria: idsubcategoria,
        v_categoria: idsubsubcategoria,
        domingo: domingo,
        lunes: lunes,
        martes: martes,
        miercoles: miercoles,
        jueves: jueves,
        viernes: viernes,
        sabado: sabado
    };

    var pagina = "ObtenerHorariosparaSeleccion.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp + pagina,
        data: datos,
        success: function (resp) {
            var html="";
          var respuesta=resp.respuesta;
          if (respuesta.length>0) {


               for (var i = 0; i < respuesta.length; i++) {

                var dividir=respuesta[i].horainicial.split(':');
                var inicial=dividir[0]+':'+dividir[1];
                var dividir2=respuesta[i].horafinal.split(':');
                var final=dividir2[0]+':'+dividir2[1];
                html+=`<option value="`+respuesta[i].horainicial+`-`+respuesta[i].horafinal+`">`+inicial+`</option>`;
              
               }


          }

          $("#v_horarios").html(html);
         


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) {
                error = "Página no existe " + pagina + " " + XMLHttpRequest.status;
            } else if (XMLHttpRequest.status === 500) {
                error = "Error del Servidor " + XMLHttpRequest.status;
            } else {
                error = "Error desconocido en la solicitud AJAX";
            }
            console.error(error);
        }
    });
}




function ObtenerSubsubcategorias2(idcategorias,seleccionado) {
    
    var datos="idcategorias="+idcategorias;
    var pagina="ObtenerSubsubCategorias.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    success: function(resp){
        var resp=resp.respuesta;
        PintarSubsubCategorias2(resp,seleccionado);


    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}

function PintarSubsubCategorias2(resp,seleccionado) {
        

    // Suponiendo que tienes el conjunto de datos que proporcionaste almacenado en una variable llamada 'categorias'
let categorias = resp;

// Obtener el elemento con el id "listadocategorias" para usarlo como contenedor del slider
let listadoCategorias = document.getElementById('listadosubcategorias');
  
// Crear un string para almacenar el HTML de los slides
let slidesHTML = '';
slidesHTML+=`<option value="" disabled selected>Seleccione un nivel</option>`;
if (categorias.length>0) {
var texto="";
// Iterar sobre cada categoría y construir el HTML para el contenido de cada slide
categorias.forEach(categoria => {
    var sele="";
    if (categoria.idcategoriasservicio==seleccionado) {
        sele="selected";
        texto=categoria.nombrecategoria;
    }
  slidesHTML += `
  <option  id="btnsubsub_`+categoria.idcategoriasservicio+`" value="`+categoria.idcategoriasservicio+`" style=" font-size: 10px; padding: 5px;" `+sele+`>`+categoria.nombrecategoria+`</option>`;
});

// Asignar el HTML generado al contenido del contenedor del slider
listadoCategorias.innerHTML = slidesHTML;

$("#listadosubcategorias").closest('.item-link').find('.item-after').text(texto);


  }else{

  listadoCategorias.innerHTML="";

  }


  //onclick="ObtenerDetalleSubsubcategoria(`+categoria.idcategoriasservicio+`)"

}


function FiltarSubcategoria(idvalorseleccionado) {
    var idtiposervicioconfiguracion=$("#listadotipoconfiguracion").val();
    localStorage.setItem('idtiposervicioconfiguracion',idtiposervicioconfiguracion);
    var datos="idtiposervicioconfiguracion="+idtiposervicioconfiguracion;
    var pagina="ObtenerCategorias.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
            var resp=resp.respuesta;
        PintarCategorias(resp,idvalorseleccionado);
    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}


function FiltarSubcategoria2(idvalorseleccionado) {
    var idtiposervicioconfiguracion=$("#listadotipoconfiguracion2").val();
    localStorage.setItem('idtiposervicioconfiguracion',idtiposervicioconfiguracion);
    var datos="idtiposervicioconfiguracion="+idtiposervicioconfiguracion;
    var pagina="ObtenerCategorias.php";
    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    data:datos,
    async:false,
    success: function(resp){
            var resp=resp.respuesta;
        PintarCategorias2(resp,idvalorseleccionado);
    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });
}
function PintarCategorias2(resp,idvalorseleccionado) {
    
   // alert(idvalorseleccionado);

    // Suponiendo que tienes el conjunto de datos que proporcionaste almacenado en una variable llamada 'categorias'
let categorias = resp;

// Obtener el elemento con el id "listadocategorias" para usarlo como contenedor del slider
var html="";
    html+=`<option value="" disabled selected>Seleccionar</option>`;

// Crear un string para almacenar el HTML de los slides
let slidesHTML = '';
var texto="";
if (categorias.length>0) {
// Iterar sobre cada categoría y construir el HTML para el contenido de cada slide
categorias.forEach(categoria => {
    selected="";
    if (idvalorseleccionado==categoria.idcategorias) {
        selected="selected";
        texto=categoria.titulo;
    }
  html += `
    <option value="`+categoria.idcategorias+`" `+selected+`>`+categoria.titulo+`</option>` ;
});

   
    $("#listadotipocategoria2").html(html);
    //texto
    $("#listadotipocategoria2").closest('.item-link').find('.item-after').text(texto);

  }



         if (localStorage.getItem('v_coachvalor')!='undefined' && localStorage.getItem('v_coachvalor')!=0) {
            var valorcoach=localStorage.getItem('v_coachvalor');
               FiltrarCoachesTipo(valorcoach);

           }
}
function FiltrarConfiguracion() {

        var idtiposervicioconfiguracion=$("#listadotipoconfiguracion").val();
        var idsubcategoria=$("#listadotipocategoria").val();


        ObtenerConfiguracionSubcategoria(idtiposervicioconfiguracion, idsubcategoria)
    .then(function(respuesta) {
        // Hacer algo con la respuesta si es exitosa
        console.log('return promesa');

        console.log(respuesta);
        localStorage.setItem('idtiposervicioconfiguracion',idtiposervicioconfiguracion);
        localStorage.setItem('idsubcategoria',idsubcategoria);
        ObtenerSubsubcategorias(idsubcategoria);
        var tiposervicio=respuesta.tiposervicio[0];
        var precio=0;
        

           precio=tiposervicio.precio;
        
        
        
        $("#v_costo").val('$'+precio);
        $("#licategorias").css('display','none');
        $("#lisubcategorias").css('display','none');
        //$("#txtcategoria").html(nombresubcategoria);
        //$("#v_descripcion").css('display','none');
        //$(".lidescripcion").css('display','none');
        $("#costos-tab").css('display','block');
        $("#profile-tab").css('display','block');
        $("#v_costo").addClass('input-focused"');

        $(".licosto").addClass('item-input-with-value');
              $(".classli").addClass('item-input-focused');
        $(".lisubcategoriasli").css('display','block');
        //$("#v_costo").prop('disabled','disabled');
        $(".classli").css('background','white');
    })
    .catch(function(error) {
        // Manejar el error si la promesa es rechazada
        console.error(error);
    });
}


