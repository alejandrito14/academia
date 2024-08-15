function ObtenerDirecciones2() {


	var iduser=localStorage.getItem('id_user');
	
		var datos="iduser="+iduser;
		var pagina = "ObtenerDirecciones.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			var direcciones=datos.respuesta;
				
			Pintardirecciones2(direcciones);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});


}


function Pintardirecciones2(direcciones) {

	var html='';

	if (direcciones.length>0) {


		for (var i = 0; i <direcciones.length; i++) {
		
		html+=` 
            <div class="card">
              <div class="card-content card-content-padding">
                <div class="row">
                 <div class="col-60" style="ext-align: left;" id="direccionenvio_`+direcciones[i].idusuarios_envios+`">
               `+
                   direcciones[i].calle+',';

                  if (direcciones[i].no_ext!='') {

                   html+=" no. exterior "+direcciones[i].no_ext+",";

                 }

            /*      if (direcciones[i].no_int!='' && direcciones[i].no_ext!='') {
                    
                    html+='-';

                  }*/
/*
                  if (direcciones[i].no_int!='') {

                    html+=" no. interior "+direcciones[i].no_int+ ',';

                  }
                  html+='<br>';

                  if (direcciones[i].calle1!='') {

                     html+=" Entre "+direcciones[i].calle1;
                  }

                  if (direcciones[i].calle1!='' && direcciones[i].calle2!='') {

                      html+=' Y '; 
                    }


                     if (direcciones[i].calle2!='') {

                       html+=direcciones[i].calle2+', ';
                     }



                  html+=direcciones[i].asentamiento+' ' +direcciones[i].col+',';
                 
                  if (direcciones[i].referencia!='') {

                    html+=' referencia '+ direcciones[i].referencia+', ';
                  }

                 
                 html+='<br>'+direcciones[i].cp +', '+

                  direcciones[i].nombremunicipio+', '+direcciones[i].nombreestado+', '+direcciones[i].nombrepais

                +`
*/
               html+= `
               </div>

              
                 <div class="col-40">
                  <span class="botoneditar" onclick="Editardireccion2(`+direcciones[i].idusuarios_envios+`);" >
                  
                 <i class="bi-pencil-fill"></i>

                  </span>

                    <span style="margin-left: 1em;" class="botoneliminar" onclick="Eliminardireccion(`+direcciones[i].idusuarios_envios+`)" >
                    
                  <i class="bi-x-circle-fill"></i>

                  </span>
                  </div>
                </div>
            </div>
            </div>
         `;


		}


	/*	html+=` 

          <button onclick="Nuevadireccion(1)" class="button button-fill botonesaccion botonesredondeado estiloboton" style="margin-top: 1em;">Agregar una dirección</button>



          `;*/


	}else{


        /*  html+=` 

          <button onclick="Nuevadireccion(1)" class="button button-fill botonesaccion botonesredondeado estiloboton" style="margin-top: 1em;">Agregar una dirección</button>



          `;*/

	}


	$("#lista-direcciones").html(html);

}


function AbrirFormDireccion() {

  GoToPage('nuevadireccion');
}

function Guardardireccion(argument) {
  
  app.dialog.confirm('','¿Seguro que son los datos correctos de la dirección ?' , function () {

  $("#lblcodigopostal").html("");
  $("#lblpais").html("");
  $("#lblestado").html("");
  $("#lblmunicipio").html("");
  $("#lbldireccion").html("");
  $("#lblcolonia").html("");
  $("#lblnoexterior").html("");

  var iddireccionenvio=$("#v_id").val();
  var v_codigopostal=$("#v_codigopostal").val();
  var v_pais=$("#v_pais").val();
  var v_estado=$("#v_estado").val();
  var v_municipio=$("#v_municipio").val();
  //var v_direccion=$("#v_direccion").val();
  var v_colonia=$("#v_colonia").val();
  var v_referencia=$("#v_referencia").val();
  /*var v_edad=$("#v_edad").val();
  var v_celular=$("#v_celular").val();*/

  var v_tipoasentamiento=localStorage.getItem('tipo_asenta');
  var no_exterior=$("#no_exterior").val();
  var no_interior=$("#no_interior").val();
  var v_calle1=$("#v_calle1").val();
  var v_calle2=$("#v_calle2").val();
  var v_calle=$("#v_calle").val();

  var iduser=localStorage.getItem('id_user');
  var datos="iduser="+iduser+"&v_codigopostal="+v_codigopostal+"&v_pais="+v_pais+"&v_estado="+v_estado+"&v_municipio="+v_municipio+"&v_referencia="+v_referencia+"&v_colonia="+v_colonia+"&iddireccionenvio="+iddireccionenvio+"&v_tipoasentamiento="+v_tipoasentamiento+"&no_exterior="+no_exterior+"&no_interior="+no_interior+"&v_calle1="+v_calle1+"&v_calle2="+v_calle2+"&v_calle="+v_calle; 

  var pagina = "nuevadireccion.php";

  var msj="";
  var bandera=1;



    if (v_codigopostal=='') {
        v_codigopostal1='Campo requerido';
        bandera=0;

      }

      if (v_pais==0) {
        v_pais1='Campo requerido';
        bandera=0;

      }
      if (v_estado==0) {
        v_estado1='Campo requerido';
        bandera=0;

      }

      if (v_municipio==0) {
        v_municipio1='Campo requerido';
        bandera=0;

      }


      if (v_colonia=='') {
        v_colonia1='Campo requerido';
        bandera=0;

      }

      if (v_tipoasentamiento=='') {
        v_tipoasentamiento1='Campo requerido';
        bandera=0;

      }

      if (v_calle=='') {
        calle1='Campo requerido';
        bandera=0;

      }

      //alert(no_exterior);
      if (no_exterior == '') {
        no_exterior1='Campo requerido';
        bandera=0;

      }
  
  


  if (bandera==1) {

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data: datos,
      crossDomain: true,
      cache: false,
      beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
      app.preloader.hide();

      localStorage.setItem('idusuarios_envios','');
      var respuesta=datos.respuesta;

      localStorage.removeItem('datosbuscar2','');
      localStorage.setItem('asenta','');

        if (respuesta==1) {
          var iddireccion=datos.idclientes_envios;

          localStorage.setItem('iddireccion',iddireccion);
            localStorage.setItem('nuevadireccion',1);

              if (iddireccionenvio==0) {
              alerta('','Se agregó la dirección');
              
              }else{

              alerta('','Se actualizaron los datos de la dirección');

              }

           
                GoToPage("datosdireccion");

              

          }else{  

            alerta('','No se agregó dirección');
          }

    
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });

  }else{



    

    if (v_codigopostal=='') {
        v_codigopostal1='Campo requerido';
        bandera=0;
      $("#lblcodigopostal").html(v_codigopostal1);

      }

      if (v_pais==0) {
        v_pais1='Campo requerido';
        bandera=0;
      $("#lblpais").html(v_pais1);

      }
      if (v_estado==0) {
        v_estado1='Campo requerido';
        bandera=0;
      $("#lblestado").html(v_estado1);

      }

      if (v_municipio==0) {
        v_municipio1='Campo requerido';
        bandera=0;
        $("#lblmunicipio").html(v_municipio1);

      }

      
      if (v_tipoasentamiento=='') {
        v_tipoasentamiento1='Campo requerido';
        bandera=0;
        $("#lbltipoasentamiento").html(v_tipoasentamiento1);

      }

      if (v_calle=='') {
        v_callee='Campo requerido';
        bandera=0;
        $("#lblcalle").html(v_callee);

      }


      if (v_colonia=='') {
        v_colonia1='Campo requerido';
        bandera=0;
        $("#lblcolonia").html(v_colonia1);

      }


      if (no_exterior == '') {
        
        no_exterior1='Campo requerido';
        bandera=0;

        $("#lblnoexterior").html(no_exterior1);

      }
      


    }

   });
}


function ColocarColonia() {

  var idpais= $("#v_pais").val();
  var idestado=$("#v_estado").val();
  var idmunicipio=$("#v_municipio").val();
  var tipoasentamiento=$("#v_tipoasentamiento").val();

  localStorage.setItem('tipo_asenta',tipoasentamiento);
  var codigopostal=$("#v_codigopostal").val();

  var calle=$("#v_calle").val();
  var no_exterior=$("#no_exterior").val();
  var no_interior=$("#no_interior").val();
  var v_calle1=$("#v_calle1").val();
  var v_calle2=$("#v_calle2").val();
  var v_referencia=$("#v_referencia").val();
  var iddireccion=$("#iddireccion").val();
  var v_id=$("#v_id").val();

  var objeto={
    id:v_id,
    idpais:idpais,
    idestado:idestado,
    idmunicipio:idmunicipio,
    tipoasentamiento:localStorage.getItem('tipo_asenta'),
    codigopostal:codigopostal,
    calle:calle,
    no_exterior:no_exterior,
    no_interior:no_interior,
    v_calle1:v_calle1,
    v_calle2:v_calle2,
    v_referencia:v_referencia,
    iddireccion:iddireccion

  };


  localStorage.setItem('datosbuscar2',JSON.stringify(objeto));

  if (codigopostal!='') {

  if (idpais>0) {

    if (idestado>0) {

      if (idmunicipio>0) {

      //  if (tipoasentamiento!=0) {

        localStorage.setItem('nuevadireccion',1);       
        GoToPage("colonias");

        /*}else{

        alerta('','Elige un tipo de asentamiento');

        }*/
      }else{
        alerta('','Elige un municipio');

      }
    }else{

      alerta('','Elige un estado');

      }
    }else{


      alerta('','Elige un pais');
    }
  }else{

    alerta('','Falta código postal');


  }



}

function Buscarcolonia() {

  var buscador=$("#buscador4").val();
  var concidencia=[];
  var listadocolonias=JSON.parse(localStorage.getItem('listadocolonias'));
  
  if (buscador!='') {
  if (listadocolonias.length>0) {

  for (var i =0; i < listadocolonias.length; i++) {

    $(".clasescolonia"+listadocolonias[i].idcodigopostal).each(function() {

          //console.log('text'+$(this).text().toLowerCase());


          cadena=$(this).text().toLowerCase();


          console.log(cadena+' '+buscador);

          if (cadena.indexOf(buscador.toLowerCase())!=-1 ) {

                if (!BuscarEnarray(concidencia,listadocolonias[i].idcodigopostal)) {

                  concidencia.push(listadocolonias[i].idcodigopostal);
                  
              

                }

          }else{


                if (BuscarEnarray(concidencia,listadocolonias[i].idcodigopostal)) {

                  posicion=BuscarPosicion(concidencia,listadocolonias[i].idcodigopostal);

                  concidencia.splice(posicion,posicion);


                }



          }

      //console.log(concidencia);

    });


    



  }


    $(".coloniasli").css('display','none');

    if (concidencia.length>0) {
      for (var i =0; i <concidencia.length; i++) {
        
        $(".clasescolonia"+concidencia[i]).css('display','block');
        }
      }else{

          $(".coloniasli").css('display','none');
          $(".clasescolonia0").css('display','block');


      }
    }else{


      $(".coloniasli").css('display','none');
      $(".clasescolonia0").css('display','block');


    }
  }else{

    $(".coloniasli").css('display','block');
      $(".clasescolonia0").css('display','none');


  }
  
}
function Vertodoscolonia() {
  
    $(".coloniasli").css('display','block');
    $(".clasescolonia0").css('display','none');
}

function BorarCodigo() {
    $("#v_pais").val(0);
    $("#v_estado").html('');
    $("#v_municipio").html('');
    $("#v_colonia").val('');
  }

function Editardireccion2(idusuarios_envios) {
  localStorage.setItem('idusuarios_envios',idusuarios_envios);
  GoToPage('nuevadireccion');
}

function Editardireccion() {
  var idusuarios_envios=localStorage.getItem('idusuarios_envios');
     var datos="idusuarios_envios="+idusuarios_envios;
          var pagina = "Obtenerdireccion.php";

      $.ajax({
          type: 'POST',
          dataType: 'json',
          url: urlphp+pagina,
          data:datos,
          async:false,
          success: function(datos){

           
            var respuesta=datos.respuesta[0];

           PintarenFormulariodirecion(respuesta);

          },error: function(XMLHttpRequest, textStatus, errorThrown){ 
            var error;
              if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
              if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                      //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                      console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }

        });
}
function PintarenFormulariodirecion(respuesta) {

  $("#v_id").val(respuesta.idusuarios_envios);
  $("#v_codigopostal").val(respuesta.cp);
  $("#v_pais").val(respuesta.idpais);
 /* $("#v_estado").val(respuesta.idestado);
  $("#v_municipio").val(respuesta.idmunicipio);*/
  $("#v_tipoasentamiento").val(respuesta.asentamiento);
  $("#v_colonia").val(respuesta.col);
  $("#v_calle").val(respuesta.calle);
  $("#no_exterior").val(respuesta.no_ext);
  $("#no_interior").val(respuesta.no_int);
  $("#v_calle1").val(respuesta.calle1);
  $("#v_calle2").val(respuesta.calle2);
  $("#v_referencia").val(respuesta.referencia);

  ObtenerEstado(respuesta.idestado,respuesta.idpais);
  ObtenerMunicipios(respuesta.idmunicipio,respuesta.idestado);
}
function Eliminardireccion(idusuarios_envios) {
   app.dialog.confirm('','¿Seguro de eliminar la dirección ?' , function () {

  var datos="idusuarios_envios="+idusuarios_envios;
  var pagina = "Eliminardireccion.php";

      $.ajax({
          type: 'POST',
          dataType: 'json',
          url: urlphp+pagina,
          data:datos,
          async:false,
          success: function(datos){

           
         ObtenerDirecciones2();

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
