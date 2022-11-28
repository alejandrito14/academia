<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$fechainicial=date('Y-m-d',strtotime($_POST['fechainicial']));
	$fechafinal=date('Y-m-d',strtotime($_POST['fechafinal']));
	$v_arraydiaselegidos=explode(',',$_POST['v_arraydiaselegidos']);


	$arraynoseencuentra=array();
	for ($i=0; $i <count($v_arraydiaselegidos); $i++) { 
		
		$dentrofecha=0;
		$dividir=explode('-',$v_arraydiaselegidos[$i]);

		$fechae=$dividir[0].'-'.$dividir[1].'-'.$dividir[2];
		$noseencuentra=0;

		//echo $fechainicial.'>='.date('Y-m-d',strtotime($fechae)) .'&&'. date('Y-m-d',strtotime($fechae)).'<='.$fechafinal;
		if (date('Y-m-d',strtotime($fechae))>=$fechainicial && date('Y-m-d',strtotime($fechae))<=$fechafinal) {
			
		}else{

			array_push($arraynoseencuentra,$v_arraydiaselegidos[$i]);

		}



	}


	



	$respuesta['respuesta']=1;
	$respuesta['noseencuentra']=$arraynoseencuentra;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>