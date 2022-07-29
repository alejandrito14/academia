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
	$usuario = $_POST['usuario'];
	$password = $_POST['password'];
	$sistema=$_POST['sistema'];
	$tokenfirebase=$_POST['tokenfirebase'];
	$uuid=$_POST['uuid'];
	$valor=$_POST['anunciovisto'];
	$login=$_POST['login'];

	//Enviamos los parametros a la clase
	$lo->usuario = utf8_decode($usuario);
	$lo->password = utf8_decode($password);

	if ($login=='btnusuario') {
		$resultado = $lo->validar_credenciales_cliente();
	}

	if ($login=='btnemail') {
		$resultado = $lo->validar_credenciales_email();
	}

	if ($login=='btncelular') {
		$resultado = $lo->validar_celular();
	}

	//Realizamos validacion del usuario en la DB
	
	$resultado_row = $db->fetch_assoc($resultado);
	$resultado_num = $db->num_rows($resultado);
	

	//Validamos el resultado
	if($resultado_num  == 1){
		//Contraseña y usuarios correctos
		$idusuarios = $resultado_row['idusuarios'];
		
		//Armamos array para regresarlo en formato JSON
		$array->resultado = "1";
		$array->msg = "Ingreso de sistema con exito";
		$array->id = $idusuarios;
		$array->nombre=$resultado_row['nombre'];	
		$array->paterno=$resultado_row['paterno'];		
		$array->materno=$resultado_row['materno'];	
		$array->alias=$resultado_row['alias'];
		$array->usuario=$resultado_row['usuario'];		

	
		$array->validado=1;	
		$array->foto=$resultado_row['foto'];
		$array->tipo=$resultado_row['tipo'];	
		$array->uuid=$uuid;
		$cli->tipousuario=$array->tipo;
		$tipo=$cli->ObtenerTipo();	
		$array->tipousuario=$tipo[0]->nombretipo;

			/*if ($sistema!='' && $tokenfirebase!='') {

				$cli->tokenfirebase=$tokenfirebase;
				$cli->sistema=$sistema;
				$cli->idCliente=$idusuarios;
				$cli->uuid=$uuid;

					$resultado=$cli->BuscarToken();
					$existe=$db->fetch_assoc($resultado);

					$numresultado=$db->num_rows($resultado);


					if ($numresultado>0) {
						
						$cli->EliminarClienteUuid();
						$cli->GuardarTokenfirebase();

					}else{

						$cli->GuardarTokenfirebase();
							
					}
			}*/
		
			//$cli->GuardarVistoAnuncio2($valor);
		//Obtenemos el id del usuario logueado para guardarlo
		

	}else{
		//Contraseña o usuarios incorrectos
		$array->resultado = "0";
		$array->msg = "Usuario o contraseña incorrecta";
		$array->id = '0';
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