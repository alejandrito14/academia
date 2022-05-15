<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;


	$iddireccionenvio=$_POST['iddireccionenvio'];
	$v_codigopostal=$f->guardar_cadena_utf8($_POST['v_codigopostal']);
	$v_pais=$f->guardar_cadena_utf8($_POST['v_pais']);
	$v_estado=$f->guardar_cadena_utf8($_POST['v_estado']);
	$v_municipio=$f->guardar_cadena_utf8($_POST['v_municipio']);
	$v_direccion=$_POST['v_direccion'];
	$v_colonia=$_POST['v_colonia'];
	$v_referencia=$_POST['v_referencia'];

	$no_interior=$_POST['no_interior'];
	$no_exterior=$_POST['no_exterior'];
	$calle1=$_POST['v_calle1'];
	$calle2=$_POST['v_calle2'];
	$calle=$_POST['v_calle'];
	$v_tipoasentamiento=$_POST['v_tipoasentamiento'];

	$lo->idusuarios=$_POST['iduser'];
	$lo->v_codigopostal=$v_codigopostal;
	$lo->v_pais=$v_pais;
	$lo->v_estado=$v_estado;
	$lo->v_municipio=$v_municipio;
	$lo->v_direccion=$v_direccion;
	$lo->v_colonia=$v_colonia;
	$lo->v_referencia=$v_referencia;
	$lo->principaldireccion=0;
	$lo->idusuarios_envios=$iddireccionenvio;


	$lo->v_nointerior=$no_interior;
	$lo->v_noexterior=$no_exterior;
	$lo->calle1=$calle1;
	$lo->calle2=$calle2;
	$lo->calle=$calle;
	$lo->v_tipoasentamiento=$v_tipoasentamiento;



	if ($iddireccionenvio!='') {

		$lo->ModificarDireccionEnvio();
	
	}else{
	
		$lo->GuardarDireccionEnvio();
	}


	$respuesta['idclientes_envios']=$lo->idusuarios_envios;
	$respuesta['respuesta']=1;
	
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