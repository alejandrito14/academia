<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$f=new Funciones();
	$fechas=new Fechas();
	$usuarios=new Usuarios();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idusuarios=$_POST['id_user'];
	$lo->idusuarios=$idusuarios;


	$usuarios->db=$db;
	$usuarios->idusuarios=$idusuarios;
	$tutorados=$usuarios->ObtenerTutoradosSincel();
	
	for ($i=0; $i <count($tutorados) ; $i++) { 
		$idusuarios.=','.$tutorados[$i]->idusuarios;
	}


	$lo->idusuarios=$idusuarios;


	$obtener=$lo->ListadopagosNopagados();

	for ($i=0; $i < count($obtener); $i++) { 
		
		$fecha=$obtener[$i]->fechafinal;
		$lo->idpago=$obtener[$i]->idpago;
		$obtener[$i]->fechaformato='';
		if ($fecha!='') {
			# code...
		
		$dianumero=explode('-',$fecha);
		$obtener[$i]->fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];


			$fecha=date('d-m-Y',$obtener[$i]->fechafinal);
			$obtener[$i]->fechafinal=$fecha;
			}


/*
			$obtenerdescuentospagos=$lo->ObtenerdescuentosPagos();
			$descuentos=0;
			for ($j=0; $j <count($obtenerdescuentospagos) ; $j++) { 
				

				$descuentos=$descuentos+$obtenerdescuentospagos[$j]->montoadescontar;
			}

			$obtenerdescuentosmembresia=$lo->Obtenerdescuentosmembresia();
			$descuentosmembresia=0;
			for ($k=0; $k < count($obtenerdescuentosmembresia); $k++) { 
				$descuentosmembresia=$descuentosmembresia+$obtenerdescuentosmembresia[$k]->montoadescontar;
			}

			

			$comisiontotal=$obtener[$i]->comisiontotal;
			
			$obtener[$i]->montopago=$obtener[$i]->montopago-$descuentos-$descuentosmembresia+$comisiontotal;

*/
		}


	$respuesta['respuesta']=$obtener;
	
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