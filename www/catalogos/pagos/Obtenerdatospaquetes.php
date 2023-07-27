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
    $datospaquetes=$_POST['paquetes'];
    $idusuario=$se->obtenerSesion('usuariopago');
    
    $arraypaquetes=json_decode($datospaquetes);

    for ($i=0; $i < count($arraypaquetes); $i++) { 
       
            $idpaquete=$arraypaquetes[$i]->{'idpaquete'};
            $cantidad=$arraypaquetes[$i]->{'cantidad'};
            $paquetes->idpaquete=$idpaquete;
            $obtenerpaquete=$paquetes->ObtenerDatosPaquete();

            $carrito->idusuarios=$idusuario;
            $carrito->idpaquete=$idpaquete;
            $carrito->cantidad=$cantidad;
            $carrito->costounitario=$obtenerpaquete[0]->precioventa;
            $costo=$obtenerpaquete[0]->precioventa*$cantidad;
            $carrito->costototal=$costo;
            $carrito->nombrepaquete=$obtenerpaquete[0]->nombrepaquete;
            $carrito->estatus=1;


            $obtenerdecarrito=$carrito->BuscarPaqueteCarrito();

            if (count($obtenerdecarrito)>0) {
               $precioventa=$obtenerdecarrito[0]->precioventa;

                $cantidad=$obtenerdecarrito[0]->cantidad+$carrito->cantidad;
                $carrito->cantidad=$cantidad;
                $costo=$precioventa*$cantidad;
                $carrito->costototal=$costo;
                $carrito->costounitario=$precioventa;

                $carrito->idcarrito= $obtenerdecarrito[0]->idcarrito;
                $carrito->ActualizarCarritoCosto();


            }else{

                $carrito->AgregarCarrito();
  
            }

            

   
         }

   
    $obtenercarrito=$carrito->ObtenerCarrito();

    $respuesta['carrito']=$obtenercarrito;
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