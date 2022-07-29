<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Asistencia.php");
require_once("clases/class.Funciones.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Asistencia();
	$f=new Funciones();

	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$id_user=$_POST['id_user'];
	$idusuariosasistio=explode(',', $_POST['idusuariosasistio']);
	$idusuariosnoasistio=explode(',',$_POST['idusuariosnoasistio']);
	$fechaasistencia=explode('|',$_POST['fechaasistencia']);

	$dia=$fechaasistencia[0];
	$fecha=$fechaasistencia[1];
	$horainicio=$fechaasistencia[2];
	$horafin=$fechaasistencia[3];

	$lo->fecha=$fecha;
	$lo->dia=$dia;
	$lo->horainicio=$horainicio;
	$lo->horafin=$horafin;
	$lo->idusuariocoach=$id_user;
	$lo->idservicio=$_POST['idservicio'];

if ($idusuariosasistio!=null && $idusuariosasistio[0]!='') {
	# code...

	for ($i=0; $i <count($idusuariosasistio); $i++) { 
		$lo->idusuarios=$idusuariosasistio[$i];
		$lo->asistio=1;
		$obtenersihayregistro=$lo->ObtenerRegistroAsistenciaUsuario();

		if (count($obtenersihayregistro)>0) {
			$lo->idasistenciahorario=$obtenersihayregistro[0]->idasistenciahorario;
			if ($lo->asistio!=$obtenersihayregistro[0]->asistio) {
				$lo->EditarAsistencia();
			}

		}else{

			$lo->GuardarAsistencia();
		}

		
		
	

	}

}
if ($idusuariosasistio!=null && $idusuariosnoasistio[0]!='') {
	for ($i=0; $i <count($idusuariosnoasistio); $i++) { 
		$lo->idusuarios=$idusuariosnoasistio[$i];
		$lo->asistio=0;
	
		$obtenersihayregistro=$lo->ObtenerRegistroAsistenciaUsuario();

		if (count($obtenersihayregistro)>0) {
			$lo->idasistenciahorario=$obtenersihayregistro[0]->idasistenciahorario;

			if ($lo->asistio!=$obtenersihayregistro[0]->asistio) {
				$lo->EditarAsistencia();
			}
			

		}else{

			$lo->GuardarAsistencia();
		}

		
	}
}
	
	
	$db->commit();

	$respuesta['respuesta']=1;

	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>