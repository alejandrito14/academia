<?php 
/**
 * 
 */
class PagosCoach
{
	
	public $db;
	public $idusuarios;
	public $idservicio;
	public $tipo;
	public $monto;
	public $estatus;
	public $dividido;
	public $fechainicial;
	public $fechapago;
	public $concepto;
	public $folio;
	public $idstripe;
	public $pagado;
	public $idpagocoach;
	public $idpago;
	public $idusuariocreado;
	public $descripcionpago;
	public $idtipopago;
	public $tipopago;
	public $tipopagocoach;
	public $montopagocoach;
	public $montopago;

	public function CrearRegistroPagoCoach()
	{
		
		$sql="INSERT INTO pagoscoach(idusuarios, idservicio, monto, estatus, folio, concepto,pagado,idpago) VALUES ( '$this->idusuarios', '$this->idservicio','$this->monto','$this->estatus', '$this->folio','$this->concepto','$this->pagado','$this->idpago')";

		$resp=$this->db->consulta($sql);
		$this->idpagocoach=$this->db->id_ultimo();

	}

	public function ObtenerTotalPagos()
	{
		$sql = "SELECT SUM(monto) as total FROM pagos WHERE estatus=0 AND pagado=0 AND idusuarios IN($this->idusuarios) ORDER BY idpago asc";

	
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
	


	public function ObtenerProximovencer()
	{
		$sql = "SELECT * FROM pagos WHERE estatus=0 AND pagado=0 AND idusuarios IN ($this->idusuarios) ORDER BY idpago asc limit 1";

	
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

		public function Listadopagos()
		{
			$sql = "SELECT 
					pagos.idpagoscoach,
					pagos.idusuarios,
					pagos.idservicio,
					pagos.estatus,
					pagos.fechapago,
					pagos.fechacreacion,
					pagos.pagado,
					pagos.concepto,
					pagos.idtipopago,
					pagos.tipopago,
					pagos.folio,
					pagos.monto,
					servicios.titulo,
					pagos.idpago
			      FROM pagoscoach as pagos
				LEFT JOIN usuarios ON usuarios.idusuarios=pagos.idusuarios
				INNER JOIN servicios ON servicios.idservicio=pagos.idservicio
			    WHERE 1=1 ";
			    	if ($this->idusuarios!='') {
			    	$sql.=" AND pagos.idusuarios  IN($this->idusuarios)";
			    	}
			    $sql.="  ORDER BY pagos.idservicio,pagos.idpagoscoach  ";
			   
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


	
	public function ObtenerPagoCoach($idpago,$idservicio)
	{
		$sql="SELECT *FROM pagoscoach WHERE idpago='$idpago' AND idservicio='$idservicio'";
	
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

	public function ActualizarEstatus()
	{
		$sql="UPDATE pagos SET  estatus = '$this->estatus' WHERE idpago = '$this->idpago'";
		
		$resp=$this->db->consulta($sql);

	}


	public function ActualizarPagado()
	{
		$sql="UPDATE pagos SET  pagado = '$this->pagado',
		fechapago='$this->fechapago'
		 WHERE idpago = '$this->idpago'";
		$resp=$this->db->consulta($sql);

	}

	public function GuardarpagosStripe()
	{
		$sql="INSERT INTO pagos_pagostripe(idpago, idpagostripe ) VALUES ('$this->idpago', '$this->idpagostripe')";
		
		$resp=$this->db->consulta($sql);

	}

	public function Listadopagospagados()
		{
			$sql = "SELECT * FROM pagos WHERE estatus=2 AND pagado=1 AND idusuarios='$this->idusuarios' ORDER BY idpago ";

	
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


		public function ObtenerdescuentosPagos()
		{
			$sql = "SELECT * FROM pagodescuento
			INNER JOIN descuento ON descuento.iddescuento=pagodescuento.iddescuento
			 WHERE idpago='$this->idpago' ORDER BY idpago ";

	
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

		public function Obtenerdescuentosmembresia()
		{
			$sql = "SELECT * FROM pagodescuentomembresia
			INNER JOIN membresia ON membresia.idmembresia=pagodescuentomembresia.idmembresia
			 WHERE idpago='$this->idpago' ORDER BY idpago ";

	
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

		public function Listadopagospagadosstripe()
		{
			$sql = "SELECT
				pagos_pagostripe.idpagostripe,
				pagostripe.monto,
				pagostripe.idusuarios,
				pagostripe.idtransaccion,
				pagostripe.fechatransaccion,
				pagostripe.fecha,
				pagostripe.tipo,
				pagostripe.comision,
				pagostripe.comisiontotal,
				pagostripe.comisionmonto,
				pagostripe.impuestototal,
				pagostripe.subtotalsincomision,
				pagostripe.total,
				pagostripe.idpagostripe,

				(SELECT GROUP_CONCAT(concepto)as concepto FROM pagos_pagostripe 
				INNER JOIN pagos ON pagos_pagostripe.idpago=pagos.idpago
				WHERE idpagostripe=pagostripe.idpagostripe

				)as concepto
				FROM
				pagostripe
				JOIN pagos_pagostripe
				ON pagostripe.idpagostripe = pagos_pagostripe.idpagostripe 
				JOIN pagos
				ON pagos_pagostripe.idpago = pagos.idpago
				LEFT JOIN usuarios ON usuarios.idusuarios=pagos.idusuarios
			    WHERE pagos.estatus=2 AND pagos.pagado=1 AND pagos.idusuarios  IN($this->idusuarios) GROUP BY pagos.idpago,idusuarios ORDER BY pagos.idpago ";
	
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


	public function ListadoNotaspagospagados()
		{
			$sql = "SELECT *FROM
					notapago		
			    	WHERE notapago.idusuario  
			    	IN($this->idusuarios) AND estatus IN(0,1) ORDER BY idnotapago DESC";
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


		public function ObtenerFolioPagoCoach()
		{
			 $contador=$this->ActualizarConsecutivo();
   			 $fecha = explode('-', date('d-m-Y'));
   			 $anio = substr($fecha[2], 2, 4);
   			 $folio = $fecha[0].$fecha[1].$anio.$contador;
   			 return $folio;
		}

		public function ActualizarConsecutivo()
		{
			$sql="SELECT *FROM pagina_configuracion";
			 $resp = $this->db->consulta($sql);
			 $datos=$this->db->fetch_assoc($resp);


			 $val=$datos['contadorfoliopago'];
			 $valor=$val+1;

			$sql="UPDATE pagina_configuracion SET contadorfoliopago='$valor'";


			 $resp = $this->db->consulta($sql);
			return $val;
		
		}

		public function GuardarPagoCoach()
		{
			$sql="INSERT INTO pagoscoach(idusuarios, idservicio, monto, fechapago, estatus, folio,concepto,idtipopago,tipopago,pagado,idpago,descripcionpago,idusuarioquienpaga,tipopagocoach,montopagocoach,montopago) VALUES ('$this->idusuarios','$this->idservicio','$this->monto','$this->fechapago','$this->estatus','$this->folio','$this->concepto','$this->idtipopago','$this->tipopago','$this->pagado','$this->idpago','$this->descripcionpago','$this->idusuariocreado','$this->tipopagocoach','$this->montopagocoach','$this->montopago')";

			$resp = $this->db->consulta($sql);

		}


}

 ?>