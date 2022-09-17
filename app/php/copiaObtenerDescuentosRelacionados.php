<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Descuentos.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Fechas.php");


$db = new MySQL();
$fechas=new Fechas();
$pagos=new Pagos();
$pagos->db=$db;
$servicios=new Servicios();
$servicios->db=$db;

$descuento=new Descuentos();;
$descuento->db=$db;

$pagoselegidos=json_decode($_POST['pagos']);
$iduser=$_POST['id_user'];

$arrayservicio=array();
$arraydescuentos=array();
	$descuento->idusuario=$iduser;
	$obtenerdescuentosUsuario=$descuento->ObtenerDescuentosUsuario();
	


	for ($i=0; $i <count($pagoselegidos) ; $i++) { 
		$idpago=$pagoselegidos[$i]->{'id'};
		$montopago=$pagoselegidos[$i]->{'monto'};
		$pagos->idpago=$idpago;
		$buscar=$pagos->ObtenerPago();
		$idservicio=$buscar[0]->idservicio;

		//array_push($arrayservicio, $idservicio);

		$descuento->idservicio=$idservicio;
		$obtenerdescuentos=$descuento->ObtenerDescuentosServicio();

			for ($j=0; $j <count($obtenerdescuentos) ; $j++) { 
				
				$iddescuento=$obtenerdescuentos[$j]->iddescuento;
				$monto=$obtenerdescuentos[$j]->monto;
				$convigencia=$obtenerdescuentos[$j]->convigencia;
				$estatus=$obtenerdescuentos[$j]->estatus;
				$titulodescuento=$obtenerdescuentos[$j]->titulo;
				$tipo=$obtenerdescuentos[$j]->tipo;
				$validado=1;
				$descuento->iddescuento=$iddescuento;
				if ($convigencia==1) {
					$fechaactual=date('Y-m-d');
					$obtenerperidosdescuentos=$descuento->obtenerPeridosDescuentos($fechaactual);



					if (count($obtenerperidosdescuentos)>0) {
						$validado=1;
					}else{
						$validado=0;
					}

				}

				if ($estatus==1 && $validado==1) {
				

				

				$encontrado=$descuento->BuscarEnArray($iddescuento,$obtenerdescuentosUsuario);

				if ($encontrado==1) {

					$descuentospagos=array('iddescuento'=>$iddescuento,'monto'=>$monto,'tipo'=>$tipo,'idpago'=>$idpago,'idservicio'=>$idservicio,'titulodescuento'=>$titulodescuento,'montopago'=>$montopago);

					array_push($arraydescuentos, $descuentospagos);
					
				}

			}


		}


	}



	for ($i=0; $i < count($arraydescuentos); $i++) {	
		$tipo=$arraydescuentos[$i]['tipo'];

	
		$monto=$arraydescuentos[$i]['monto'];
		$total=$arraydescuentos[$i]['montopago'];
		if ($tipo==0) {
		 	$descuento=$monto;
		 	$montoadescontar=($total*$descuento)/100;
		 } 
		 if ($tipo==1) {
		 	$montoadescontar=$monto;
		 }

		 $arraydescuentos[$i]['montoadescontar']=$montoadescontar;
		
	}

	$respuesta['descuentos']=$arraydescuentos;
//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

 ?>