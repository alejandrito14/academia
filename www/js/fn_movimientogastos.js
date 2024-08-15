var idcuentaseleccionado=0;
var idsubcuentaseleccionado=0;
var idcuentabancarias=0;
var tipomovimientoc=0;


function BorrarMovimiento(idmovimiento,campo,tabla,valor,regresar,donde,idmenumodulo) {
		if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='idmovimiento='+idmovimiento;
	$.ajax({
		url:'catalogos/movimientogastos/borrarmovimientogastos.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	  data: datos, //Le pasamos el objeto que creamos con los archivos
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		  var resp = msj;
		  
			 console.log("El resultado de msj es: "+msj);
			   if( resp == 0 ){
				  aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
				}else{
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=El nivel se encuentra relacionado con al menos un alumno "+msj,donde);
				}			
			}
	});
}
}

function Obtenercategoriascuenta() {
	
	$.ajax({
		url:'catalogos/movimientogastos/Obtenercategoriascuenta.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 	dataType:'json',
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		  var respuesta=msj.cuentas;

		  		PintarCategoriasCuenta(respuesta);
			 		
			}
	});
}

function PintarCategoriasCuenta(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`
			<div class="btn btn_colorgray2 btncategointervalo1 " id="catebtn_`+respuesta[i].idcuenta+`">
											
		<input type="checkbox" id="cate_`+respuesta[i].idcuenta+`" class="catecheck" onchange="SeleccionarCategoriacuenta(`+respuesta[i].idcuenta+`)" value="0">

		`+respuesta[i].nombre+`

	</div>

			`;
		}
	}

	$(".divcategoriascuenta").html(html);
}

function SeleccionarCategoriacuenta(idcuenta) {
	$(".btncategointervalo1").removeClass('active');

	setTimeout(function(){
	$("#catebtn_"+idcuenta).addClass('active');
	$("#cate_"+idcuenta).attr('checked',true);
	idcuentaseleccionado=idcuenta;
	idsubcuentaseleccionado=0;
	FiltrarSubcuentas(idcuenta);

	},1000);
}

function FiltrarSubcuentas(idcuenta) {
	var datos="idcuenta="+idcuenta;
	$.ajax({
		url:'catalogos/movimientogastos/FiltrarSubcuentas.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 	dataType:'json',
	 	data:datos,
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		  var respuesta=msj.clasificador;

		  		PintarSubcuentas(respuesta);
			 		
			}
	});
}
function PintarSubcuentas(respuesta) {


	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`
			<div class="btn btn_colorgray2 btncategointervalo2 " id="catebtsub_`+respuesta[i].idclasificadorgastos+`">
											
		<input type="checkbox" id="catesub_`+respuesta[i].idclasificadorgastos+`" class="catecheck" onchange="SeleccionarCategoriaSub(`+respuesta[i].idclasificadorgastos+`)" value="0">

		`+respuesta[i].nombre+`

	</div>

			`;
		}
	}

	$(".divcategoriassubcuenta").html(html);
}

function SeleccionarCategoriaSub(idclasificadorgastos) {
	
	$(".btncategointervalo2").removeClass('active');

	setTimeout(function(){
	$("#catebtsub_"+idclasificadorgastos).addClass('active');
	$("#catesub_"+idclasificadorgastos).attr('checked',true);
	idsubcuentaseleccionado=idclasificadorgastos;


	},1000);
}
function SeleccionarCuentabancaria(idcuentabancaria) {
	// body...
	$(".btncategointervalo3").removeClass('active');

	setTimeout(function(){
	$("#cateformpago_"+idcuentabancaria).addClass('active');
	$("#cateform_"+idcuentabancaria).attr('checked',true);
	idcuentabancarias=idcuentabancaria;


	},1000);
}

function SeleccionarTipomovimiento(idtipo) {
	$(".btncategotipo").removeClass('active');

	setTimeout(function(){
	$("#catetipo_"+idtipo).addClass('active');
	$("#catetipoi_"+idtipo).attr('checked',true);
	tipomovimientoc=idtipo;

	},1000);
}



function Guardarmovimiento(form, regresar, donde, idmenumodulo) {
    if (confirm("¿Desea realizar esta operación?")) {
        // Obtener los valores del formulario
        var v_monto = $("#v_monto").val().split('$')[1];
        var tipomovimientogasto = tipomovimientoc;
        var v_clasificadorid = idsubcuentaseleccionado;
        var v_cuentas = idcuentabancarias;
        var v_fecha = $("#v_fecha").val();
        var v_observacion = $("#v_observacion").val();
        var id = $("#id").val();
 		if (typeof v_monto === 'string') {
            v_monto = v_monto.replace(/,/g, '');
        }
        v_monto = parseFloat(v_monto);
               // Crear la cadena de datos
        var data = "v_monto=" + v_monto + "&tipomovimiento=" + tipomovimientogasto + "&v_clasificadorid=" + v_clasificadorid + "&v_cuenta=" + v_cuentas + "&v_fecha=" + v_fecha + "&v_observacion=" + v_observacion + "&id=" + id;

        console.log(data);

        // Validar los campos del formulario
        var bandera = 1;
        if (v_monto === '') {
            bandera = 0;
            console.log('Falta monto');
        }
        if (tipomovimientogasto === '') {
            bandera = 0;
            console.log('Falta tipo de movimiento');
        }
        if (v_clasificadorid === 0) {
            bandera = 0;
            console.log('Falta clasificador');
        }
        if (v_cuentas === 0) {
            bandera = 0;
            console.log('Falta cuenta bancaria');
        }
        if (v_fecha === '') {
            bandera = 0;
            console.log('Falta fecha');
        }

        if (bandera === 1) {
            $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Subiendo Archivos...</div>');

            setTimeout(function() {
                $.ajax({
                    url: 'catalogos/movimientogastos/ga_movimientogastos.php',
                    type: 'POST',
                    data: data,
                    
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        var error;
                        console.log(XMLHttpRequest);
                        if (XMLHttpRequest.status === 404) {
                            error = "Página no existe: " + XMLHttpRequest.status;
                        }
                        if (XMLHttpRequest.status === 500) {
                            error = "Error del servidor: " + XMLHttpRequest.status;
                        }
                        $('#abc').html('<div class="alert_error">' + error + '</div>');
                    },
                    success: function(msj) {
                        var resp = msj.split('|');
                        console.log("El resultado de msj es: " + msj);
                        if (resp[0] == 1) {
                            aparecermodulos(regresar + "?ac=1&idmenumodulo=" + idmenumodulo + "&msj=Operación realizada con éxito&idempresas=" + resp[1], donde);
                        } else {
                            aparecermodulos(regresar + "?ac=0&idmenumodulo=" + idmenumodulo + "&msj=Error. " + msj, donde);
                        }
                    }
                });
            }, 1000);
        } else {
            var error = "";
            if (v_monto === '') {
                error += "- Monto es requerido.<br>";
            }
            if (tipomovimientogasto === '') {
                error += "- Tipo es requerido.<br>";
            }
            if (v_clasificadorid === 0) {
                error += "- Categoría de cuenta es requerida.<br>";
            }
            if (v_cuentas === 0) {
                error += "- Cuenta es requerida.<br>";
            }
            if (v_fecha === '') {
                error += "- Fecha es requerida.<br>";
            }
            if (bandera === 0) {
                AbrirNotificacion(error, 'mdi mdi-checkbox-marked-circle');
            }
        }
    }
}

