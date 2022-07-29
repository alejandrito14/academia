<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Encuesta.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Encuesta();
	$f=new Funciones();
	$lo->db=$db;
	$db->begin();

	$idusuarioencuesta=$_POST['idusuarioencuesta'];

	$idencuesta=$_POST['idencuesta'];
	$idservicio =$_POST['idservicio'];
	$id_user =$_POST['id_user'];
	$respuestas=json_decode($_POST['respuestas']);
	$idusuarioevaluacion =$_POST['idusuarioevaluacion'];

	$lo->mostraralumno=$_POST['mostrar'];
	$lo->idusuarios=$idusuarioevaluacion;
	$lo->idusuarioquienrealizo=$id_user;
	$lo->idencuesta=$idencuesta;
	$lo->estatus=1;
	$lo->idservicio=$idservicio;
	$lo->idusuarioencuesta=$idusuarioencuesta;

	if ($idusuarioencuesta==0) {
		
		$lo->GuardarEncuestaElaborada();
	
	}else{

		$lo->ModificarEncuestaElaborada();
		$lo->EliminarRespuestas();
	}
	


	for ($i=0; $i < count($respuestas); $i++) { 
			
			$lo->idcuestion=$respuestas[$i]->{'idcuestion'};
			$lo->idopcion=$respuestas[$i]->{'idopcion'};
			$lo->res=$respuestas[$i]->{'respuesta'};

			$lo->GuardarRespuesta();
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