<?php

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/


require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
    /*header("Location: ../../login.php"); */ echo "login";

    exit;
}
$idmenumodulo = $_GET['idmenumodulo'];

//validaciones para todo el sistema





$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/


//Importamos nuestras clases
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Paquetes.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");


//Se crean los objetos de clase
$db = new MySQL();
$paquetes = new Paquetes();
$f = new Funciones();
$bt = new Botones_permisos();

$paquetes->db = $db;
$array = array();

$vsku=$_POST['sku'];
$id=$_POST['id'];
$paquetes->sku=$vsku;
$paquetes->idpaquete=$id;
$existe=0;
	if($paquetes->idpaquete==0) {
		# code...

		$validar=$paquetes->ValidarSkupaquetes();
		
		if (count($validar)>0) {
		    $existe=1;
		}

	}else{

		$validar=$paquetes->ValidarIdSkupaquetes();

		if (count($validar)>0) {
			$existe=0;
		
		}else{

			$validar1=$paquetes->ValidarSkupaquetes();
			
			if (count($validar1)>0) {
				    $existe=1;
				}
	
		}

	}
	



$respuesta['respuesta']=$existe;

echo json_encode($respuesta);




?>