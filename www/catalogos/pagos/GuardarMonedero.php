<?php 


require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Carrito.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Pagos.php");
try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Carrito();
	$pagos = new Pagos();
	$usua=new Usuarios();
	$usua->db=$db;
	$pagos->db=$db;
	$lo->db=$db;
	$productoselegidos=json_decode($_POST['productos']);
	$pagoselegidos=json_decode($_POST['pagos']);
	$usua->id_usuario=$se->obtenerSesion('usuariopago');
	$obtenerusuario=$usua->ObtenerUsuario();
	$monedero=$obtenerusuario[0]->monedero;
	


	$contarpagos=0;
	$totalmontousado=0;
	for ($j=0; $j <count($productoselegidos); $j++) { 
		$idcarrito=$productoselegidos[$j]->idcarrito;
		$monederousado=$productoselegidos[$j]->valormonedero;

		$lo->idcarrito=$idcarrito;
		$lo->monederousado=$monederousado;
	
		$lo->ActualizarMonederoUsadoCarrito();
				
			$totalmontousado=$totalmontousado+$monederousado;
			
		}
	
	 

	/* $pagoselegidos=json_decode($_POST['pagos']);
	$usua->id_usuario=$se->obtenerSesion('usuariopago');
	$obtenerusuario=$usua->ObtenerUsuario();
	$monedero=$obtenerusuario[0]->monedero;
	*/


	
	for ($j=0; $j <count($pagoselegidos); $j++) { 
		$idpago=$pagoselegidos[$j]->idpago;
			
		//if ($idpagoelegido==$idpago) {
			# code...
			$pagos->idpago=$idpago;
			$buscar=$pagos->ObtenerPago();
			if (count($buscar)>0) {
				# code...
			

			$cantidadusada=$pagoselegidos[$j]->valormonedero;
			
			$pagos->montousado=$cantidadusada;
			$buscarmonederopago=$pagos->BuscarMonederoPago();



			if (count($buscarmonederopago)>0) {
				$pagos->idpagomonedero=$buscarmonederopago[0]->idpagomonedero;
				$pagos->ActualizarMonederoUsado();
				
				}else{


				$pagos->GuardarMonederoUsado();
				
				}
			
		
			//}

			$totalmontousado=$totalmontousado+$pagoselegidos[$j]->valormonedero;
		}
			
		}
	


	$db->commit();

	$totaldisponible=$monedero-$totalmontousado;
	$respuesta['respuesta']=1;
	$respuesta['monedero']=$monedero;
	$respuesta['totaldisponible']=number_format($totaldisponible,2,'.',',');
	$respuesta['pagos']=$pagoselegidos;
	$respuesta['monederousado']=$totalmontousado;

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