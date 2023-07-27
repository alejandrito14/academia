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

//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Notapago.php");

require_once("../../clases/class.Paquetes.php");
require_once("../../clases/class.Carrito.php");

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $f=new Funciones();
    $paquetes = new Paquetes();
    $paquetes->db=$db;
    $carrito=new Carrito();
    $carrito->db=$db;
    $idcarrito=$_POST['idcarrito'];
    $carrito->idcarrito=$idcarrito;

   
    $carrito->BorrardelCarrito();
    
 
    $respuesta['respuesta']=1;
    echo json_encode($respuesta);

    

} catch (Exception $e) {
    $db->rollback();
    //echo "Error. ".$e;

    $array->resultado = "Error: " . $e;
    $array->msg       = "Error al ejecutar el php";
    $array->id        = '0';
    //Retornamos en formato JSON
    $myJSON = json_encode($array);
    echo $myJSON;
}
?>