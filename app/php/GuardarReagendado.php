<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.NotificacionPush.php");
require_once("clases/class.ServiciosAsignados.php");


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$asignados=new ServiciosAsignados();
	$asignados->db=$db;
	//$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	//$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['id']);
	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$emp->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));

	$emp->idcategoriaservicio = $_POST['v_categoria'];
	$emp->precio=$_POST['v_costo'];
	$emp->fechainicial=$_POST['v_fechainicial'];
	$emp->fechafinal=$_POST['v_fechafinal'];

	$lunes=$_POST['v_lunes'];
	$martes=$_POST['v_martes'];
	$miercoles=$_POST['v_miercoles'];
	$jueves=$_POST['v_jueves'];
	$viernes=$_POST['v_viernes'];
	$sabado=$_POST['v_sabado'];
	$domingo=$_POST['v_domingo'];


	
	
	$categoriaservicio=$_POST['v_categoriaservicio'];
	$arrayhorarios=explode(',', $_POST['v_arraydiaselegidos']);

	$emp->lunes=$lunes;
	$emp->martes=$martes;
	$emp->miercoles=$miercoles;
	$emp->jueves=$jueves;
	$emp->viernes=$viernes;
	$emp->sabado=$sabado;
	$emp->domingo=$domingo;

	$emp->montopagargrupo=$montopagargrupo;
	$emp->costo=$costo;
	$emp->idcategoria=$categoriaservicio;
	$emp->fechainicial=$_POST['v_fechainicial'];
	$emp->fechafinal=$_POST['v_fechafinal'];


	$usuarioinvita="";
	
	$emp->idusuarios=$_POST['iduser'];
	$tipousuario=$_POST['idtipousuario'];
		$validaradmin=1;
	$nombrequienagrega="";

	$arraytokens=array();
	$arraytokens2 = array();
	$titulonotificacion="";
	$asignados->idservicio=$emp->idservicio;
	//Validamos si hacermos un insert o un update
	if($emp->idservicio > 0)
	{
		$titulonotificacion="Edición servicio";
		$emp->ModificarServicioReagendado();

		$obtenerser=$emp->ObtenerServicio();
		if ($emp->estatus==1) {
			# code...
		
		if ($tipousuario==0) {
			$usuarios->idusuarios=$emp->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();
		$nombrequienagrega="Por: ".$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;

			$idusuario=$obtenerser[0]->agregousuario;
			if ($idusuario>0) {
				# code...
			
			$ruta='detalleserviciocoach2';
			$valor=$emp->idservicio;
			$texto='|Se reagendo el servicio|'.$emp->titulo.'|'.$nombrequienagrega.'|Periodo: '.date('d-m-Y',strtotime($emp->fechainicial)).' '.date('d-m-Y',strtotime($emp->fechafinal));
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			$notificaciones->idusuario=$idusuario;
				$obtenertokenusuario=$notificaciones->Obtenertoken();
			$usuarios->idusuarios=$idusuario;
		$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
			$titulonotificacion=$usuarioinvita."se reagendó el servicio ".$emp->titulo;

			for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$i]->token,'titulonotificacion'=>$titulonotificacion,'ruta'=>$ruta);

					array_push($arraytokens,$dato);
				}
			

			
		
				}

			
				}
		}
		$asignados->idusuario=0;
		$obtenerusuariosarignados=$asignados->obtenerUsuariosServiciosAlumnosAsignados();
		if(count($obtenerusuariosarignados)>0){
			
			for ($i=0; $i <count($obtenerusuariosarignados) ; $i++) { 
			$idusuario=$obtenerusuariosarignados[$i]->idusuarios;
			$usuarios->idusuarios=$idusuario;
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';

			

			$titulonotificacion=$usuarioinvita."se reagendó el servicio ".$emp->titulo;
			$valor=$emp->idservicio;
			$texto='|Se reagendo el servicio|'.$emp->titulo.'|Periodo: '.date('d-m-Y',strtotime($emp->fechainicial)).' '.date('d-m-Y',strtotime($emp->fechafinal));
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

		$usuarios->idusuarios=$idusuario;
		$obtenerdependencia=$usuarios->ObtenerUsuarioDependencia();
		$ruta="";
		if (count($obtenerdependencia)>0) {
			$obtenerdatousuario=$usuarios->ObtenerUsuario();
			
			if($obtenerdatousuario[0]->sincel==1) {
				$notificaciones->idusuario=$obtenerdependencia[0]->idusuariostutor;
				$ruta="";
				$banderatuto=1;
			}else{
			   $notificaciones->idusuario=$idusuario;
			  if ($obtenerusuariosarignados[$i]->aceptarterminos==1) {
				$ruta='detalleservicio2';

				}else{
				$ruta='aceptacionservicio2';

			}

			}
			



					}else{
			$notificaciones->idusuario=$idusuario;
			if ($obtenerusuariosarignados[$i]->aceptarterminos==1) {
				$ruta='detalleservicio2';

				}else{
				$ruta='aceptacionservicio2';

			}

		}

				
				$obtenertokenusuario=$notificaciones->Obtenertoken();

			for ($j=0; $j < count($obtenertokenusuario); $j++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'titulonotificacion'=>$titulonotificacion,'ruta'=>$ruta);

					array_push($arraytokens,$dato);
				}
				

			}
		}

		if (count($arrayhorarios)>0 && $arrayhorarios[0]!='') {
			# code...
			$emp->EliminarHorarioSemana();

		for ($i=0; $i < count($arrayhorarios); $i++) { 
			$dividircadena=explode('-', $arrayhorarios[$i]);
			$fecha=$dividircadena[0].'-'.$dividircadena[1].'-'.$dividircadena[2];
				 $horainicial=substr($dividircadena[3],0,5);
				 $horafinal=substr($dividircadena[4],0,5);
				 $idzona=$dividircadena[5];
				 $numdia=date('w',strtotime($fecha));

				$emp->dia=$numdia;
				$emp->horainiciosemana=$horainicial;
				$emp->horafinsemana=$horafinal;
				$emp->fecha=date('Y-m-d',strtotime($fecha));
				$emp->idzona=$idzona;

				$emp->GuardarHorarioSemana();
			}
		}

	
	

	$db->commit();

	
		if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				//if ($arraytokens[$i]!='') {
					# code...
				
			 $idusuario=$arraytokens[$i]['idusuario'];
			
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor=$emp->idservicio;
			 $notificaciones->navpage=$arraytokens[$i]['ruta'];
			 $array=array();
			 array_push($array,$arraytokens[$i]['token']);
			 $titulonotificacion=$arraytokens[$i]['titulonotificacion'];
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				//}

			}
		}


		/*if (count($arraytokens2)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens2) ; $i++) { 

			 $idusuario=$arraytokens[$i]['idusuario'];
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor=$emp->idservicio;
			 $notificaciones->navpage="detalleservicio";
			 $array=array();
			 array_push($array,$arraytokens[$i]['token']);
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
			

			}
		}*/



	}

	$respuesta['respuesta']=1;
	$respuesta['idservicio']=$emp->idservicio;
	$myJSON = json_encode($respuesta);
    echo $myJSON;

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>