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

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Fechas.php");

require_once("../../clases/class.ServiciosAsignados.php"); 
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Membresia.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$lo = new Pagos();
	$f = new Funciones();
	$fechas = new Fechas();	
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$asignacion=new ServiciosAsignados();
	$asignacion->db=$db;
	$servicios=new Servicios();
	$servicios->db=$db;
	

	$membresia=new Membresia();
	$membresia->db=$db;
	//enviamos la conexión a las clases que lo requieren
	$lo->db = $db;
	$contador=1;
	$idusuarios=$_POST['idusuario'];
	$asignacion->idusuarios=$idusuarios;
	$se->crearSesion('usuariopago',$pagos->idusuarios);
	

	$pagosencontrados=array();
	$total=0;
	$usuarios->db=$db;
	$usuarios->id_usuario=$idusuarios;
	$tutorados=$usuarios->ObtenerTutoradosSincel();

	for ($i=0; $i <count($tutorados) ; $i++) { 
		$idusuarios.=','.$tutorados[$i]->idusuarios;
	}


	$lo->idusuarios=$idusuarios;
 	$usuariosconsulta=$idusuarios;
	$asignacion->idusuario=$idusuarios;

	
	$obtenerservicios=$asignacion->obtenerServiciosAsignadosAceptados();
	

	for ($i=0; $i < count($obtenerservicios); $i++) { 
		 $usuarios->idusuarios=$obtenerservicios[$i]->idusuarios;
	     $datosusuario=$usuarios->ObtenerUsuarioDatos();

		$idservicio=$obtenerservicios[$i]->idservicio;
		$pagos->idservicio=$obtenerservicios[$i]->idservicio;
		$servicios->idservicio=$idservicio;
		$obtenerservicio=$servicios->ObtenerServicio();
		$tipopago='';
		$servicios->idcategoria=$obtenerservicio[0]->idcategoriaservicio;
		$aceptacionpagoservicio=$obtenerservicio[0]->aceptarserviciopago;
		$verificartipopago=$servicios->checarcategoriaRelacionadaTipopago();
		if (count($verificartipopago)>0) {

			$obtenertipospagos=$servicios->ObtenerRelacionadaTipopago();
			$tipopago=$obtenertipospagos[0]->tipopago;
		}

		$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

		for ($k=0; $k <count($obtenerperiodos) ; $k++) { 
			# code...
				$fechainicial=$obtenerperiodos[$k]->fechainicial;
				$fechafinal=$obtenerperiodos[$k]->fechafinal;
				$lo->idusuarios=$datosusuario[0]->idusuarios;
				$lo->idservicio=$idservicio;
				$lo->fechainicial=$fechainicial;
				$lo->fechafinal=$fechafinal;
				$lo->requiereaceptacion=$aceptacionpagoservicio;

				$PagosNoPagados=$lo->PagosNoPagados();

				
				if (count($PagosNoPagados)>0) {
					$lo->EliminarPagoNoPagado();
				}
				
				$existepago=$lo->ExistePago();

				if (count($existepago)==0) {

					$modalidad=$obtenerservicio[0]->modalidad;
					$costo=$obtenerservicio[0]->precio;
					if ($modalidad==1) {
						
						$montoapagar=$costo;

					}

			if ($modalidad==2) {
				//grupo
				$obtenerparticipantes=$servicios->ObtenerParticipantesAceptados(3);
				
				$cantidadparticipantes=count($obtenerparticipantes);
				$costo=$obtenerservicio[0]->precio;

				$obtenerhorarios=$servicios->ObtenerHorariosSemana();

				$monto=$costo*count($obtenerhorarios);

				$montoapagar=$monto/$cantidadparticipantes;

			}

		if ($costo>=0) {

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

				 $lo->idtipopago=$tipopago;
				 $lo->idusuarios=$idusuarios;
                 $lo->estatus=0;
                 $lo->pagado=0;
                 $lo->idservicio=$idservicio;
                 $lo->tipo=$tipo;
                 $lo->monto=$f->redondear_dos_decimal($montoapagar);
                 $lo->dividido='';
                 $lo->fechainicial=$fechainicial;
                 $lo->fechafinal=$fechafinal;
                 $lo->concepto=$concepto;
                 $lo->idmembresia=0;
                 $lo->folio="";
                 $lo->CrearRegistroPago();

                 $servicios->idservicio=$idservicio;
                 $obtenerfechas=$servicios->ObtenerFechaHoras();
                
                 $ObtenerTodosParticipantes=$servicios->ObtenerTodosParticipantes(3);

                 $obtenerparticipantesaceptados=$servicios->ObtenerParticipantesAceptados(3);

               $completo=0;
                if (count($ObtenerTodosParticipantes)==count($obtenerparticipantesaceptados)) {
                	$completo=1;
                }

				$objeto=array('idusuarios'=>$idusuarios,'idmembresia'=>$idmembresia,'idservicio'=>$idservicio,'tipo'=>$tipo,'monto'=>$f->redondear_dos_decimal($montoapagar),'estatus'=>$estatus,'dividido'=>$dividido,'fechainicial'=>$fechainicial,'fechafinal'=>$fechafinal,'concepto'=>$concepto,'folio'=>$folio,'fechaformato'=>$fechaformato,'nombre'=>$datosusuario[0]->nombre,'paterno'=>$datosusuario[0]->paterno,'materno'=>$datosusuario[0]->materno,'idpago'=>$lo->idpago,'aceptados'=>count($obtenerparticipantesaceptados),'alumnos'=>count($ObtenerTodosParticipantes),'completo'=>$completo,
					'fechamin'=>date('d-m-Y',strtotime($obtenerfechas[0]->fechamin)),
					'fechamax'=>date('d-m-Y',strtotime($obtenerfechas[0]->fechamax)),
					'tipopago'=>$tipopago,
					'aceptacionpagoservicio'=>$aceptacionpagoservicio
			);
				$total=$total+$montoapagar;
				array_push($pagosencontrados,$objeto);
				//$contador++;
				//$pagos->CrearRegistroPago();

			
					
				

				}


		}
	}
}





	$respuesta['pagos']=$pagosencontrados;
	$respuesta['total']=$total;

	echo json_encode($respuesta);
		

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>