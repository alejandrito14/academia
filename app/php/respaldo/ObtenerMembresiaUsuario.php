<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Pagos.php");


$db = new MySQL();
$servicios=new Servicios();
$membresias=new Membresia();
$membresias->db=$db;
$servicios->db=$db;
$pagos=new Pagos();
$pagos->db=$db;

$iduser=$_POST['id_user'];
$pagoselegidos=json_decode($_POST['pagos']);
$descuentosaplicados=json_decode($_POST['descuentosaplicados']);
	$descuentosmembresia=array();

for ($i=0; $i <count($pagoselegidos) ; $i++) { 
	
	$idpago=$pagoselegidos[$i]->{'id'};
	
	$pagos->idpago=$idpago;
	
	$buscar=$pagos->ObtenerPago();

	$membresias->idusuarios=$buscar[0]->idusuarios;
	$obtenermembresiausuario=$membresias->ObtenerMembresiaUsuario();

	if (count($obtenermembresiausuario)>0) {
		
		$idmembresia=$obtenermembresiausuario[0]->idmembresia;
		$membresias->idmembresia=$idmembresia;
		$obtenerdatosmembresia=$membresias->ObtenerMembresia();
		$porcategoria=$obtenerdatosmembresia[0]->porcategoria;
		$porservicio=$obtenerdatosmembresia[0]->porservicio;

			$evaluar=1;
			if ($porcategoria==1) {
				
		$obtenercategoriamembresia=$membresias->ObtenerCategoriasMembresia();

			}

			if ($porservicio==1) {
		$obtenerserviciomembresia=$membresias->ObtenerServiciosMembresia();


			}
		

		//	var_dump($obtenerserviciomembresia);die();

		
			$idpago=$pagoselegidos[$i]->{'id'};
			$montopago=$pagoselegidos[$i]->{'monto'};
			$pagoselegidos[$i]->{'montosindescuento'}=$montopago;



			if (count($descuentosaplicados)>0) {
				# code...
			
				for ($l=0; $l < count($descuentosaplicados); $l++) { 
					
					if ($descuentosaplicados[$l]->idpago==$pagoselegidos[$i]->{'id'}) {
						$montoadescontar=$descuentosaplicados[$l]->montoadescontar;
						
						$montopago=$montopago-$montoadescontar;
					
						//$pagoselegidos[$i]->montocondescuento=$montopago;

						$pagoselegidos[$i]->{'monto'}=$montopago;
					}

				}
			}

				$montopago=$pagoselegidos[$i]->{'monto'};
				$pagos->idpago=$idpago;
				$buscar=$pagos->ObtenerPago();

					# code...
				

					# code...
				
				$idservicio=$buscar[0]->idservicio;
				$servicios->idservicio=$idservicio;
				$datosservicio=$servicios->ObtenerServicio();

				$idcategoriatipo=$datosservicio[0]->idcategoriaservicio;

					if ($porcategoria==1) {
						$descuentoporcategoria=array();

						for ($j=0; $j < count($obtenercategoriamembresia); $j++) { 
							

							if ($obtenercategoriamembresia[$j]->idcategorias==$idcategoriatipo) {

								$obtenercategoriamembresia[$j]->idpago=$idpago;
								$obtenercategoriamembresia[$j]->montopago=$montopago;
									

								array_push($descuentosmembresia,$obtenercategoriamembresia[$j]);
								break;
								}
							}
						

						}

						if ($porservicio==1) {

							for ($k=0; $k <count($obtenerserviciomembresia) ; $k++) { 
							
						if ($obtenerserviciomembresia[$k]->idservicio==$idservicio) {
								
								$obtenerserviciomembresia[$k]->idpago=$idpago;
								$obtenerserviciomembresia[$k]->montopago=$montopago;
								
								array_push($descuentosmembresia,$obtenerserviciomembresia[$k]);
								break;
								}

							}
							
						}


				


			 
		}


}

		


	for ($i=0; $i < count($descuentosmembresia); $i++) {	
		$tipo=$descuentosmembresia[$i]->descuento;

	
		$monto=$descuentosmembresia[$i]->monto;
		$total=$descuentosmembresia[$i]->montopago;


		if ($tipo==2) {
		 	$descuento=$monto;
		 	$montoadescontar=($total*$descuento)/100;
		 } 
		 if ($tipo==1) {
		 	$montoadescontar=$monto;
		 }

		 $descuentosmembresia[$i]->montoadescontar=$montoadescontar;
		 $descuentosmembresia[$i]->titulomembresia=$obtenerdatosmembresia[0]->titulo;
		  $descuentosmembresia[$i]->color=$obtenerdatosmembresia[0]->color;
		
	}


	
	$respuesta['respuesta']=1;
	$respuesta['descuentomembresia']=$descuentosmembresia;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

?>