<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuariodatosalud.php");
require_once("clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuariodatosalud();
	$f=new Funciones();
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idusuarios=$_POST['idusuario'];
	$v_estatura=$_POST['v_estatura'];
	$v_peso=$_POST['v_peso'];
	$v_patologia=$_POST['v_patologia'];
	$v_cirugia=$_POST['v_cirugia'];
	$v_alergia=$_POST['v_alergia'];
	$v_ortopedico=$_POST['v_ortopedico'];
	$v_medicamento=$_POST['v_medicamento'];

	$v_inputleido=$_POST['v_inputleido'];
	$v_inputleido2=$_POST['v_inputleido2'];
	$idusuariodatosalud=$_POST['v_id'];

	$lo->estatura=$v_estatura;
	$lo->peso=$v_peso;
	$lo->patologia=$v_patologia;
	$lo->cirugia=$v_cirugia;
	$lo->alergia=$v_alergia;
	$lo->ortopedico=$v_ortopedico;
	$lo->medicamento=$v_medicamento;
	$lo->inputleido=$v_inputleido;
	$lo->inputleido2=$v_inputleido2;
	$lo->idusuarios=$idusuarios;
	$lo->idusuariodatosalud=$idusuariodatosalud;
	
	if ($lo->idusuariodatosalud == 0) {
		
		$lo->GuardardatoSalud();

	}else{


		$lo->ActualizardatoSalud();
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