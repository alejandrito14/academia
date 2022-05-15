<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuariodatoemergencia.php");
require_once("clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuariodatoemergencia();
	$f=new Funciones();
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idusuarios=$_POST['idusuario'];
	$v_nombre=$_POST['v_nombre'];
	$v_numero1=$_POST['v_numero1'];
	$v_numero2=$_POST['v_numero2'];
	$v_alergias=$_POST['v_alergias'];
	$v_patologia=$_POST['v_patologia'];
	$v_sangre=$_POST['v_sangre'];
	$v_poliza=$_POST['v_poliza'];
	$v_compania=$_POST['v_compania'];
	$v_inputleido=$_POST['v_inputleido'];
	$v_inputleido2=$_POST['v_inputleido2'];
	$iddatosemergencia=$_POST['v_id'];

	$lo->nombre=$v_nombre;
	$lo->numero1=$v_numero1;
	$lo->numero2=$v_numero2;
	$lo->alergias=$v_alergias;
	$lo->patologia=$v_patologia;
	$lo->sangre=$v_sangre;
	$lo->poliza=$v_poliza;
	$lo->compania=$v_compania;
	$lo->inputleido=$v_inputleido;
	$lo->inputleido2=$v_inputleido2;
	$lo->idusuarios=$idusuarios;
	$lo->idusuariodatosemergencia=$iddatosemergencia;

	if ($lo->idusuariodatosemergencia==0) {
		
		$lo->GuardardatoEmergencia();

	}else{


		$lo->ActualizardatoEmergencia();
	}

	
	
	$db->commit();


	  


	$respuesta['idusuarios']=$idusuarios;
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