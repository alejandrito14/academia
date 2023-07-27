<?php 


//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.CodigoPostal.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$co = new CodigoPostal();

	//Enviamos la conexion a la clase
	$co->db = $db;
	

	$idpais=$_POST['idpais'];
	$idestado=$_POST['idestado'];
	$idmunicipio=$_POST['idmunicipio'];
	$tipoasenta=$_POST['tipoasen'];
	$v_codigopostal=$_POST['v_codigopostal'];

	$co->idestado=$idestado;
	$co->idmunicipio=$idmunicipio;

	$resultado=$co->obtenerClaveestado();
	$rowresultado=$db->fetch_assoc($resultado);

	$resultado2=$co->obtenerClavemunicipio();
	$rowresultado2=$db->fetch_assoc($resultado2);


	$c_estado=$rowresultado['clave'];
	$c_municipio=$rowresultado2['clave'];

	$obtenercolonias=$co->ObtenerColonias2($v_codigopostal,$c_estado,$c_municipio,$tipoasenta);




	
	$respuesta['respuesta']=$obtenercolonias;
	
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