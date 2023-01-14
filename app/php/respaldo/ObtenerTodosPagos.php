<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.ServiciosAsignados.php"); 
require_once("clases/class.Servicios.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$f=new Funciones();
	$fechas=new Fechas();
	$usuarios=new Usuarios();
	$asignacion=new ServiciosAsignados();
	$asignacion->db=$db;
	$servicios=new Servicios();
	$servicios->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$contador=1;
	$idusuarios=$_POST['id_user'];
	$asignacion->idusuarios=$idusuarios;
	$pagosencontrados=array();
	$total=0;
	$usuarios->db=$db;
	$usuarios->idusuarios=$idusuarios;
	$tutorados=$usuarios->ObtenerTutoradosSincel();
	
	for ($i=0; $i <count($tutorados) ; $i++) { 
		$idusuarios.=','.$tutorados[$i]->idusuarios;
	}

 
	$asignacion->idusuario=$idusuarios;


	$obtenerservicios=$asignacion->obtenerServiciosAsignadosAceptados();
	
	for ($i=0; $i < count($obtenerservicios); $i++) { 
		 $usuarios->idusuarios=$obtenerservicios[$i]->idusuarios;
	     $datosusuario=$usuarios->ObtenerUsuarioDatos();

		$idservicio=$obtenerservicios[$i]->idservicio;
		$pagos->idservicio=$obtenerservicios[$i]->idservicio;
		$servicios->idservicio=$idservicio;
		$obtenerservicio=$servicios->ObtenerServicio();

		$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

		for ($k=0; $k <count($obtenerperiodos) ; $k++) { 
			# code...
				$fechainicial=$obtenerperiodos[$k]->fechainicial;
				$fechafinal=$obtenerperiodos[$k]->fechafinal;
				$lo->idusuarios=$datosusuario[0]->idusuarios;
				$lo->idservicio=$idservicio;
				$lo->fechainicial=$fechainicial;
				$lo->fechafinal=$fechafinal;
				$lo->EliminarPagoNoPagado();
				$existepago=$lo->ExistePago();

				if (count($existepago)==0) {

					$modalidad=$obtenerservicio[0]->modalidad;
					$costo=$obtenerservicio[0]->precio;
					if ($modalidad==1) {
						
						$montoapagar=$costo;

					}

			if ($modalidad==2) {
				//grupo
				$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
			
				$cantidadparticipantes=count($obtenerparticipantes);
				$costo=$obtenerservicio[0]->precio;

				$obtenerhorarios=$servicios->ObtenerHorariosSemana();

				$monto=$costo*count($obtenerhorarios);

				$montoapagar=$monto/$cantidadparticipantes;

			}

		if ($costo>0) {

			$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

			$numeroperiodos=count($obtenerperiodos);
			$montoapagar=$montoapagar/$numeroperiodos;


			

				$idusuarios=$datosusuario[0]->idusuarios;
				$idmembresia=0;
				$idservicio=$idservicio;
				$tipo=1;
				$monto=$montoapagar;
				$estatus=0;
				$dividido=$modalidad;
				$fechainicial=$obtenerperiodos[$k]->fechainicial;
				$fechafinal=$obtenerperiodos[$k]->fechafinal;
				$concepto=$obtenerservicio[0]->titulo;
				//$contador=$lo->ActualizarConsecutivo();
	   		    $fecha = explode('-', date('d-m-Y'));
			    $anio = substr($fecha[2], 2, 4);
	   			$folio = $fecha[0].$fecha[1].$anio.$contador;
	   			
				$folio="";

		$fecha=$obtenerperiodos[$k]->fechafinal;
		$lo->idpago=$obtener[$i]->idpago;
		$obtener[$i]->fechaformato='';
		if ($fecha!='') {
			# code...
		
		$dianumero=explode('-',$fecha);
		$fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];


		}

				 $lo->idusuarios=$idusuarios;
                 $lo->estatus=0;
                 $lo->pagado=0;
                 $lo->idservicio=$idservicio;
                 $lo->tipo=$tipo;
                 $lo->monto=$montoapagar;
                 $lo->dividido='';
                 $lo->fechainicial=$fechainicial;
                 $lo->fechafinal=$fechafinal;
                 $lo->concepto=$concepto;
                 $lo->idmembresia=0;
                 $lo->folio="";
                 $lo->CrearRegistroPago();

				$objeto=array('idusuarios'=>$idusuarios,'idmembresia'=>$idmembresia,'idservicio'=>$idservicio,'tipo'=>$tipo,'monto'=>$montoapagar,'estatus'=>$estatus,'dividido'=>$dividido,'fechainicial'=>$fechainicial,'fechafinal'=>$fechafinal,'concepto'=>$concepto,'folio'=>$folio,'fechaformato'=>$fechaformato,'nombre'=>$datosusuario[0]->nombre,'paterno'=>$datosusuario[0]->paterno,'materno'=>$datosusuario[0]->materno,'idpago'=>$lo->idpago);
				$total=$total+$montoapagar;
				array_push($pagosencontrados,$objeto);
				//$contador++;
				//$pagos->CrearRegistroPago();

			
					
				

				}


		}
	}


	$obtenerpagostipotres=$lo->ObtenerPagosTipoDosTres();
	if (count($obtenerpagostipotres)>0) {

		for ($i=0; $i < count($obtenerpagostipotres); $i++) { 
			# code...
			
				$idpago=$obtenerpagostipotres[$i]->idpago;
				$idusuarios=$obtenerpagostipotres[$i]->idusuarios;

				 $usuarios->idusuarios=$idusuarios;
	     		 $datosusuario=$usuarios->ObtenerUsuarioDatos();
				$idmembresia=$obtenerpagostipotres[$i]->idmembresia;
				$idservicio=$obtenerpagostipotres[$i]->idservicio;
				$tipo=$obtenerpagostipotres[$i]->tipo;
				$monto=$obtenerpagostipotres[$i]->monto;
				$estatus=$obtenerpagostipotres[$i]->estatus;
				$dividido=0;
				$fechainicial="";
				$fechafinal="";
				$folio="";
				$concepto=$obtenerpagostipotres[$i]->concepto;
			$objeto=array('idusuarios'=>$idusuarios,'idmembresia'=>$idmembresia,'idservicio'=>$idservicio,'tipo'=>$tipo,'monto'=>$montoapagar,'estatus'=>$estatus,'dividido'=>$dividido,'fechainicial'=>$fechainicial,'fechafinal'=>$fechafinal,'concepto'=>$concepto,'folio'=>$folio,'fechaformato'=>$fechaformato,'nombre'=>$datosusuario[0]->nombre,'paterno'=>$datosusuario[0]->paterno,'materno'=>$datosusuario[0]->materno,'idpago'=>$idpago);

				$total=$total+$montoapagar;
				array_push($pagosencontrados,$objeto);

			}
	}


	

	/*$modalidad=$obtenerservicio[0]->modalidad;
	$costo=$obtenerservicio[0]->precio;
	if ($modalidad==1) {
		
		$montoapagar=$costo;

	}

	if ($modalidad==2) {
		//grupo
		$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
		$cantidadparticipantes=count($obtenerparticipantes);
		$costo=$obtenerservicio[0]->precio;

		$obtenerhorarios=$servicios->ObtenerHorariosSemana();

		$monto=$costo*count($obtenerhorarios);

		$montoapagar=$monto/$cantidadparticipantes;

	}

		if ($costo>0) {

			$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

			$numeroperiodos=count($obtenerperiodos);
			$montoapagar=$montoapagar/$numeroperiodos;


			for ($i=0; $i < count($obtenerperiodos); $i++) { 

				$pagos->idusuarios=$idusuarios;
				$pagos->idmembresia=0;
				$pagos->idservicio=$idservicio;
				$pagos->tipo=1;
				$pagos->monto=$montoapagar;
				$pagos->estatus=0;
				$pagos->dividido=$modalidad;
				$pagos->fechainicial=$obtenerperiodos[$i]->fechainicial;
				$pagos->fechafinal=$obtenerperiodos[$i]->fechafinal;
				$pagos->concepto=$obtenerservicio[0]->titulo;
				$contador=$lo->ActualizarConsecutivo();
	   		    $fecha = explode('-', date('d-m-Y'));
			    $anio = substr($fecha[2], 2, 4);
	   			$folio = $fecha[0].$fecha[1].$anio.$contador;
	   			
				$pagos->folio=$folio;
				$pagos->CrearRegistroPago();

			}
		}*/

		}

	/*$obtener=$lo->ListadopagosNopagados();

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



		}*/


	$respuesta['respuesta']=$pagosencontrados;
	$respuesta['total']=$total;
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