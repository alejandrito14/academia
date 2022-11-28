<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Login.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Login();
	$cli= new Usuarios();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$cli->db = $db;

	//Recibimos parametros
	$celular = $_POST['celularbuscar'];
	$iduser=$_POST['id_user'];
	//Enviamos los parametros a la clase
	$lo->celular = utf8_decode($celular);
	$lo->idusuarios = $iduser;
	$resultado = $lo->buscar_celular();
	$resultado_row = $db->fetch_assoc($resultado);
	$resultado_num = $db->num_rows($resultado);

	   $propio=0;
	   $estutor=0;
	if ($resultado_num==1) {
	   $propio=1;
	}
	
	$esasociado=0;
	if ($resultado_num==0) {
		# code...
	
	$resultado2 = $lo->buscar_celular2();
	$resultado_row2 = $db->fetch_assoc($resultado2);
	$resultado_num2 = $db->num_rows($resultado2);
		

	$lo->idusuarios = $resultado_row2['idusuarios'];

	


	$buscarusuario=$lo->BuscarUsuarioAsociado();
	$esasociado=0;

	if (count($buscarusuario)>0) {
		$esasociado=1;
	}


	$buscarsiestutro=$lo->BuscarUsuarioAsociadoTutor();
	$estutor=0;
	if (count($buscarsiestutro)>0) {
		$estutor=1;
	}
	//Validamos el resultado
	if($resultado_num2  == 1){
		//Contraseña y usuarios correctos
		$idusuarios = $resultado_row2['idusuarios'];
		
		//Armamos array para regresarlo en formato JSON
		$array->resultado = "1";
		$array->id = $idusuarios;
		$array->nombre=$resultado_row2['nombre'];	
		$array->paterno=$resultado_row2['paterno'];		
		$array->materno=$resultado_row2['materno'];	
		$array->alias=$resultado_row2['alias'];
		$array->usuario=$resultado_row2['usuario'];	
		$array->fechanacimiento	=$resultado_row2['fechanacimiento'];	
		$array->genero	=$resultado_row2['sexo'];	
	
		$array->validado=1;	
		$array->foto=$resultado_row2['foto'];
		$array->tipo=$resultado_row2['tipo'];	
		$array->uuid=$uuid;
		$cli->tipousuario=$array->tipo;
		$tipo=$cli->ObtenerTipo();	
		$array->tipousuario=$tipo[0]->nombretipo;
		$array->esasociado=$esasociado;
		$array->propio=$propio;
		$array->estutor=$estutor;

		}else{
			
			$array->resultado = "0";
			$array->id = '0';
			$array->esasociado=$esasociado;
			$array->propio=$propio;
			$array->estutor=$estutor;
		}
	
	}else{
		//Contraseña o usuarios incorrectos
		$array->resultado = "0";
		$array->id = '0';
		$array->esasociado=$esasociado;
		$array->propio=$propio;
		$array->estutor=$estutor;
	}
	//Retornamos en formato JSON 
	$myJSON = json_encode($array);
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