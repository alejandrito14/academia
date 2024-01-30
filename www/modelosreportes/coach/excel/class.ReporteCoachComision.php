<?php 
/**
 * 
 */
require_once("../../../clases/class.PagosCoach.php");

require_once("../../../clases/class.Pagos.php");

require_once("../../../clases/class.Notapago.php");
require_once("../../../clases/class.Tipocoach.php");



class ReporteCoachComision 
{
	public $db;
	public $idusuario;
	public $idusuarios_servicios;
	public $lo;
	public $pagos;
	public $nota;
	public $tipocoach;
	  function __construct() {

      $this->lo= new PagosCoach();
      $this->pagos=new Pagos();
						$this->nota=new Notapago();
						$this->tipocoach=new Tipocoach();
		

   }


	public function ObtenerServiciosCoach($sqlfechapago,$sqlfecha)
	{
		$this->lo->db=$this->db;
		$this->pagos->db=$this->db;
		$this->nota->db=$this->db;
		$this->tipocoach->db=$this->db;

		$arraycoachcomision=array();
		$totalconmonedero=0;
		$totalconotropago=0;
		$totalmontonocobrado=0;
		$totalcantidadalumnos=0;
  $totalcantidaddehorarios=0;
		$sql="
		SELECT
		servicios.titulo,
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.idusuarios,
		servicios.idservicio,
		servicios.precio,
		servicios.modalidad,
		usuarios_servicios.idusuarios_servicios,
		( SELECT MIN( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamin,
		( SELECT MAX( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamax,
		( SELECT COUNT(*) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS cantidadhorarios,
		(
		SELECT
			count(*) 
		FROM
			usuarios_servicios AS ualumnos
			INNER JOIN usuarios ON usuarios.idusuarios = ualumnos.idusuarios 
		WHERE
			usuarios.tipo = 3 
			AND ualumnos.idservicio = servicios.idservicio 
			AND ualumnos.aceptarterminos = 1 
			AND ualumnos.cancelacion = 0 
		) AS cantidadalumnos 
	FROM
		usuarios
		JOIN usuarios_servicios ON usuarios.idusuarios = usuarios_servicios.idusuarios
		JOIN servicios ON servicios.idservicio = usuarios_servicios.idservicio 
	WHERE
		usuarios.tipo = 5 
		AND usuarios_servicios.cancelacion = 0
		AND usuarios_servicios.idusuarios='$this->idusuario'
		$sqlfecha

		 ";



		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {
				$idcoach=$this->idusuario;
				$idservicio=$objeto->idservicio;

				$totalcantidadalumnos=$totalcantidadalumnos+$objeto->cantidadalumnos;
				$totalcantidaddehorarios=$totalcantidaddehorarios+$objeto->cantidadhorarios;

				$cantidadhorarios=$objeto->cantidadhorarios;
				$idusuarios_servicios=$objeto->idusuarios_servicios;
				$sqlinformacionalumnos=$this->ObtenerAlumnosServicio($idservicio,$sqlfechapago);
				
				//var_dump($sqlinformacionalumnos);die();
				for ($i=0; $i <count($sqlinformacionalumnos) ; $i++) { 
					$idusuarios=$sqlinformacionalumnos[$i]->idusuarios;

					$obtenerpago=$this->ChecarPagosServicio($sqlfechapago,$idusuarios,$idservicio);

					
				//	var_dump($obtenerpago);die();

			$this->idusuarios_servicios=$idusuarios_servicios;
			$this->tipocoach->idcoach=$idcoach;
		$tipomontopago=	$this->tipocoach->ObtenerTipoMontoCoach();
		//	$tipomontopago=$this->ObtenertipoMontopago();

			

		//	$pagos->idservicio=$idservicio;
		

			
		
			 $poncentaje="";
				  	  $pesos="";
				  	  if ($tipomontopago[0]->tipopago==0) {
				  	  	$poncentaje="%";
				  	  }else{

				  	  	$pesos="$";
				  	  }

				$montopagocoach=$tipomontopago[0]->monto;
			 $montopagocoach=$pesos.$montopagocoach.$poncentaje;

				$pagado=0;
		 	$tdescuentomembresia=0;
		 	$fechapago="";
		 	$metodopago="";
		 	$montopago="";
		 	$descuento=0;
		 	$montocomision=0;
		 	$descuentomembresia=0;
		 	$nombredescuento="";
		 	$nombremembresia="";
		 	$totalpagado=0;
		 	$folio="";
		 	$idpago=0;
		 	$fechareporte="";
		 	$fechainicial="";
		 	$fechafinal="";
		 	$montoapagar=0;
		 	$modalidad=$objeto->modalidad;
			 $costo=$objeto->precio;
								
								if($modalidad==1) {
										
										$montoapagar=$costo;

									}

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$this->ObtenerParticipantes(3,$idservicio);
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$objeto->precio;

								$obtenerhorarios=$this->ObtenerHorariosSemana($idservicio);

								$monto=$costo*count($obtenerhorarios);

									if ($cantidadparticipantes>0) {

													$montoapagar=$monto/$cantidadparticipantes;

									}



							}

						
						if ($costo>=0) {

							$montoapagar=$montoapagar/1;
							
						$totalgenerado=$totalgenerado+$montoapagar;

							
							}else{

							$totalgenerado=$totalgenerado+0;
							}

					

		 	if (count($obtenerpago)>0) {

					$pagos->idpago=$obtenerpago[0]->idpago;
	
		 	$this->nota->idpago=$obtenerpago[0]->idpago;
		 
		 		$idpago=$obtenerpago[0]->idpago;
				

		 		$obtenernotapago=$this->nota->ObtenerNotaPagoporPago();
			
		 		if(count($obtenernotapago)>0) {

		 			 		$this->pagos->idnotapago=$obtenernotapago[0]->idnotapago;

		 			$fechapago=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fecha));
		 			$fechareporte=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fechareporte));
		 			$metodopago=$obtenernotapago[0]->tipopago;
		 			$folio=$obtenernotapago[0]->folio;
		 	
			 		if ($obtenernotapago[0]->estatus==1) {
			 			
			 			$pagado=1;
			 		
			 			$idpago=$obtenerpago[0]->idpago;
			 			$fechainicial=$obtenerpago[0]->fechainicial;
				  	$fechafinal=$obtenerpago[0]->fechafinal;
			 			$montopago=$obtenerpago[0]->monto;
			 			$totalpagado=$totalpagado+$montopago;

			 			$totalconotropago=$totalconotropago+$montopago;
			 			$this->pagos->idnotapago=$obtenernotapago[0]->idnotapago;

			 			$descuento=$this->pagos->ObtenerPagoDescuento2();
			 			
		
			 			$descuentomembresia=$this->pagos->ObtenerPagoDescuentoMembresia();

			 			$tdescuentomembresia=$descuentomembresia[0]->montodescontar;
			 			$nombremembresia=$descuentomembresia[0]->nombremembresia;

			 			$nombredescuento=$descuento[0]->nombredescuento;
			 			$montopagocondescuento=$montopago-$descuento[0]->montodescontar;
			 				
			 			$montoadescontarpago=$descuento[0]->montodescontar;

			 		
			 					
			 					$montocomision=$this->CalcularMontoPago2($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento,$cantidadhorarios);
			 				
			 					
			 		

			 		}
		 	








					}else{

							$montopago=$obtenerpago[0]->monto;
							$totalmontonocobrado=$totalmontonocobrado+$montopago;

					}

		

				


			



			 	$verificadopago=0;
		 	$montopagadocoach=0;
		 if ($idpago!=0) {
		 		 	$lo->idusuarios=$this->idusuario;
		 				$lo->fechainicial=$fechainicial;
		 				$lo->fechafinal=$fechafinal;
		 			$verificarpagocoach=	$this->lo->ObtenerPagoCoachVeri($idpago,$idservicio);


		 				if (count($verificarpagocoach)>0) {
		 						$verificadopago=1;
		 						$montopagadocoach=$verificarpagocoach[0]->monto;
		 				}

		 	}



			$objeto=array('idusuariocoach'=>$this->idusuario,'coach'=>$nombrecoach,'tipocomision'=>$tipomontopago[0]->tipopago,'monto'=>$tipomontopago[0]->monto,'montocomision'=>$montocomision,'montopagocoach'=>$montopagocoach,'idpago'=>$idpago,'idservicio'=>$idservicio,'pagado'=>$verificadopago,'montopagadocoach'=>$montopagadocoach);
		
			array_push($arraycoachcomision,$objeto);


		}else{


							$montonopago=$montoapagar;
							$totalmontonocobrado=$totalmontonocobrado+$montonopago;
		}

		//var_dump($arraycoachcomision);die();

		
			}


		

		}

		

		}
		$sumamontocomision=0;
		if (count($arraycoachcomision)>0) {

					for ($j=0; $j < count($arraycoachcomision); $j++) { 
							$montocomision=$arraycoachcomision[$j]['montocomision'];
							$sumamontocomision=$sumamontocomision+$montocomision;
					}
		}

		$totalmontocobradoclub=$totalconotropago+$totalconmonedero;

			$arraytotales=array('totalconotropago'=>$totalconotropago,'totalconmonedero'=>$totalconmonedero,'totalmontocobradoclub'=>$totalmontocobradoclub,'totalmontonocobrado'=>$totalmontonocobrado,'totalcomision'=>$sumamontocomision,'totalcantidadalumnos'=>$totalcantidadalumnos,'totalcantidaddehorarios'=>$totalcantidaddehorarios);

			return $arraytotales;

}





	public function ObtenerAlumnosServicio($idservicio,$sqlfechapago)
	{

		$sql="SELECT *FROM(SELECT

				(SELECT MIN( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamin,
				( SELECT MAX( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamax,
			(
		SELECT
			COUNT(*) 
		FROM
			notapago_descripcion
			JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
			JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago 
		WHERE
			pagado = 1 
			AND notapago.estatus = 1 
			AND pagos.idservicio = usuarios_servicios.idservicio 
			AND pagos.idusuarios = usuarios_servicios.idusuarios 
		) AS pagado,
		(
		SELECT
			MAX( fechareporte ) 
		FROM
			notapago_descripcion
			JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
			JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago 
		WHERE
			pagado = 1 
			AND notapago.estatus = 1 
			AND pagos.idservicio = usuarios_servicios.idservicio 
			AND pagos.idusuarios = usuarios_servicios.idusuarios 
		) AS fechareporte,
					usuarios_servicios.idusuarios,
					usuarios_servicios.idservicio,
					usuarios_servicios.aceptarterminos,
					usuarios.nombre,
					servicios.titulo,
					servicios.precio,
					servicios.modalidad
				FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio
		LEFT JOIN usuarios ON usuarios.idusuarios=usuarios_servicios.idusuarios

		 WHERE usuarios_servicios.idservicio='$idservicio' and usuarios.tipo=3
		 ) AS TABLA WHERE 1=1 $sqlfechapago or fechareporte is null
		 ";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {


				$array[$contador]=$objeto;
				$contador++;
				
			} 
		}
		
		return $array;		
	
	}


	public function ChecarPagosServicio($sqlfechapago,$idusuarios,$idservicio)
		{
			$sql = "
			SELECT
			pagos.idusuarios,
			pagos.idservicio,
			pagos.idpago,
			pagos.pagado,
			notapago.idnotapago,
			notapago.estatus,
			pagos.monto,
			notapago.total,
			notapago.tipopago,
			notapago.idtipopago,
			pagos.concepto
			FROM
			notapago_descripcion
			JOIN pagos
			ON notapago_descripcion.idpago = pagos.idpago 
			JOIN notapago
			ON notapago.idnotapago = notapago_descripcion.idnotapago
			WHERE
			pagado=1 AND notapago.estatus=1 AND
			  pagos.idservicio='$idservicio' AND pagos.idusuarios='$idusuarios'";
			
			  $sql.= " ORDER BY idpago ";
			 
			$resp = $this->db->consulta($sql);
			$cont = $this->db->num_rows($resp);


			$array=array();
			$contador=0;
			if ($cont>0) {

				while ($objeto=$this->db->fetch_object($resp)) {

					$array[$contador]=$objeto;
					$contador++;
				} 
			}
			return $array;		
		}


		public function ObtenertipoMontopago()
	{
		$sql="SELECT
				*
				FROM
				usuarioscoachs
				WHERE 
				idusuarios_servicios = '$this->idusuarios_servicios';
		 ";


		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
		return $array;
	}


	public function ObtenerParticipantes($idtipo,$idservicio)
	{
		$sql="SELECT *FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios WHERE idservicio='$idservicio' AND usuarios.tipo='$idtipo' AND usuarios_servicios.cancelacion=0 ";
		
		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
		return $array;
	}



	public function ObtenerHorariosSemana($idservicio)
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color,zonas.nombre  FROM horariosservicio INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona WHERE idservicio=".$idservicio."";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);

		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
		return $array;
	}


		public function ObtenerNotaPagoporPago($idpago)
	{
		$sql="SELECT notapago.idnotapago,descripcion as concepto,monto,idpago,notapago.fecha,notapago.fechaaceptacion,cantidad,notapago.estatus,notapago.tipopago,notapago.folio,notapago.fechareporte  	FROM notapago_descripcion 
		INNER JOIN notapago ON notapago.idnotapago=notapago_descripcion.idnotapago
		 WHERE idpago='$idpago'";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
		return $array;
	}



	public function CalcularMontoPago2($tipo,$cantidad,$montopago,$cantidadhorarios)
	{

		if ($tipo==0) {

		 	$monto=($montopago*$cantidad)/100;
			
		}
		if ($tipo==1) {
			$monto=$cantidad;
		}


		if ($tipo==2) {
			$monto=$cantidadhorarios*$cantidad;
		}


		return $monto;


	}



}

 ?>