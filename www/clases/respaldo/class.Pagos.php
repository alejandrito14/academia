<?php

class Pagos

{

	public $db;//objeto de la clase de conexcion

	

	public $idpago;
	public $etiqueta;
	public $fechainicial;
	public $fechafinal;
	public $estatus;
	
	public $idusuarios;
	public $idservicio;
	public $idmembresia;
	public $monto;
	public $concepto;
	public $idnotapago;
	public $tipo;
	public $fechapago;
	public $pagado;
	//Funcion para obtener todos los niveles activos
	public function ObtPagosActivos()
	{
		$sql = "SELECT * FROM pagos WHERE estatus = 1";
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



	public function ObtTodosPagos()
	{
		$sql = "SELECT 
					pagos.idpago,
					pagos.idusuarios,
					pagos.idservicio,
					pagos.idmembresia,
					pagos.tipo,
					pagos.monto,
					pagos.estatus,
					pagos.fechapago,
					pagos.tarjeta,
					pagos.fechacreacion,
					pagos.pagado,
					pagos.validadoporusuario,
					pagos.digitostarjeta,
					pagos.tipopago,
					pagos.fechaevento,
					pagos.dividido,
					pagos.fechainicial,
					pagos.fechafinal,
					pagos.concepto,
					pagos.idtipopago,
					pagos.tipodepago,
					pagos.descuento,
					pagos.folio,
					usuarios.nombre,
					usuarios.paterno,
					usuarios.materno,
					usuarios.email,
					usuarios.celular
			    FROM pagos
				LEFT JOIN usuarios ON usuarios.idusuarios=pagos.idusuarios
			    GROUP BY idpago,idusuarios ORDER BY idpago ";
		
		$resp = $this->db->consulta($sql);
		
		return $resp;
	}


	public function buscarpago()
	{
		$sql = "SELECT * FROM pagos WHERE idpago=".$this->idpago."";
		

		$resp = $this->db->consulta($sql);
		
		return $resp;
	}
	

	
		//funcion para guardar pagos
	
	public function Guardarpago()
	{
		$query="INSERT INTO pagos( idusuarios, idservicio, idmembresia, tipo, monto, estatus, fechapago,concepto, idtipopago, tipodepago,fechafinal) VALUES ( '$this->idusuarios','$this->idservicio','$this->idmembresia', '$this->tipo','$this->monto',0, '$this->fechapago', '$this->concepto',0,'','')";
		
		$resp=$this->db->consulta($query);
		$this->idpago = $this->db->id_ultimo();
		
		
	}

		//funcion para modificar 
	public function Modificarpagos()
	{
		$query="UPDATE pagos SET etiqueta='$this->etiqueta',
		fechainicial='$this->fechainicial',
		fechafinal='$this->fechafinal',
		estatus='$this->estatus'
		WHERE idpago=$this->idpago";

		$resp=$this->db->consulta($query);
	}


	
		public function ListadopagosNopagados()
		{
			$sql = "SELECT 
					pagos.idpago,
					pagos.idusuarios,
					pagos.idservicio,
					pagos.idmembresia,
					pagos.tipo,
					pagos.monto,
					pagos.estatus,
					pagos.fechapago,
					pagos.tarjeta,
					pagos.fechacreacion,
					pagos.pagado,
					pagos.validadoporusuario,
					pagos.digitostarjeta,
					pagos.tipopago,
					pagos.fechaevento,
					pagos.dividido,
					pagos.fechainicial,
					pagos.fechafinal,
					pagos.concepto,
					pagos.idtipopago,
					pagos.tipodepago,
					pagos.descuento,
					pagos.folio,
					usuarios.nombre,
					usuarios.paterno,
					usuarios.materno,
					usuarios.email,
					usuarios.celular
			    FROM pagos
				LEFT JOIN usuarios ON usuarios.idusuarios=pagos.idusuarios
			    WHERE pagos.estatus IN(0,1) AND pagos.pagado=0 AND pagos.idusuarios  IN($this->idusuarios) GROUP BY idpago,idusuarios ORDER BY idpago ";
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

		
	
	public function ObtenerPago()
	{
		$sql="SELECT *FROM pagos WHERE idpago='$this->idpago'";
	
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


	public function CrearRegistroPago()
	{
		$sql="INSERT INTO pagos(idusuarios, idservicio, idmembresia, tipo, monto, estatus,fechainicial,fechafinal,pagado,concepto,folio) VALUES ( '$this->idusuarios','$this->idservicio','$this->idmembresia','$this->tipo','$this->monto', '$this->estatus','$this->fechainicial','$this->fechafinal',0,'$this->concepto','$this->folio')";
		
		$resp=$this->db->consulta($sql);
		$this->idpago=$this->db->id_ultimo();

	}


	
	public function ActualizarEstatus()
	{
		$sql="UPDATE pagos SET  estatus = '$this->estatus' WHERE idpago = '$this->idpago'";
		
		$resp=$this->db->consulta($sql);

	}


	public function ActualizarPagado()
	{
		$sql="UPDATE pagos 
		SET  pagado = '$this->pagado',
		estatus='$this->estatus'
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
			$sql = "SELECT 
			pagodescuento.iddescuento,
			pagodescuento.montopago,
			pagodescuento.montoadescontar,
			pagodescuento.tipo,
			pagodescuento.monto,
			pagodescuento.idpago,
			pagodescuento.fechacreacion,
			pagodescuento.infodescuento,
			pagodescuento.idnotapago,
			descuento.titulo
			 FROM pagodescuento
			INNER JOIN descuento ON descuento.iddescuento=pagodescuento.iddescuento
			 WHERE idpago='$this->idpago' AND idnotapago='$this->idnotapago' ORDER BY idpago ";

	
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
			 WHERE idpago='$this->idpago' AND idnotapago='$this->idnotapago' ORDER BY idpago ";

	
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


		public function ActualizarPago()
	{
		$sql="UPDATE pagos SET  pagado = '$this->pagado',
		fechapago='$this->fechapago'
		 WHERE idpago = '$this->idpago'";
		
		$resp=$this->db->consulta($sql);

	}


	
		public function ObtenerPagosServicio()
		{
			$sql = "SELECT * FROM pagos WHERE pagado=1 AND
			  idservicio='$this->idservicio' AND idusuarios='$this->idusuarios'
			  AND fechainicial='$this->fechainicial' AND fechafinal='$this->fechafinal'
			  ORDER BY idpago ";

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


	public function ObtenerPagoDescuento()
	{
		$sql="SELECT *FROM pagos WHERE idpago='$this->idpago'";
		
		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {
				$resta=0;

				$sql2="SELECT SUM(montoadescontar) as montodescontar FROM pagodescuento WHERE idpago='$objeto->idpago'";

				$resp2=$this->db->consulta($sql2);

				$rowdescuento=$this->db->fetch_assoc($resp2);
				$montodescontar1=$rowdescuento['montodescontar'];

				$sql3="SELECT SUM(montoadescontar) as montodescontar FROM pagodescuentomembresia WHERE idpago='$objeto->idpago'";

				$resp3=$this->db->consulta($sql3);
				$rowdescuentomembresia=$this->db->fetch_assoc($resp3);

				$montodescontar2=$rowdescuentomembresia['montodescontar'];

				//echo $objeto->monto.'-'.$montodescontar1.'-'.$montodescontar2;die();
				$resta=$objeto->monto-$montodescontar1-$montodescontar2;
			

			
				$objeto->montocondescuento=$resta;
				$objeto->descuento=$montodescontar1;
				$objeto->descuentomembresia=$montodescontar2;

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
		return $array;
	}


	public function ObtenerFolio()
	{
		$sql = "SELECT folio,tipopago FROM
				notapago_descripcion
				INNER JOIN notapago ON
				notapago_descripcion.idnotapago=notapago.idnotapago	
			    	WHERE notapago_descripcion.idpago='$this->idpago'";
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

	public function BuscarPago2()
	{
		$sql="SELECT *FROM pagos WHERE idpago='$this->idpago'";
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


	public function ChecarPagosServicio()
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
			  pagos.idservicio='$this->idservicio' AND pagos.idusuarios='$this->idusuarios'
			  ORDER BY idpago ";
			  
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


	public function ObtenerPagoDescuento2()
	{
		

				$sql2="SELECT SUM(montoadescontar) as montodescontar,GROUP_CONCAT(titulo) as nombredescuento
				FROM pagodescuento
				INNER JOIN descuento ON pagodescuento.iddescuento=descuento.iddescuento
				 WHERE idpago='$this->idpago' AND idnotapago='$this->idnotapago' ";

			$resp = $this->db->consulta($sql2);
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

	public function ObtenerPagoDescuentoMembresia()
	{
		$sql2="SELECT SUM(montoadescontar) as montodescontar,GROUP_CONCAT(titulo) as nombremembresia FROM pagodescuentomembresia
			INNER JOIN membresia ON membresia.idmembresia=pagodescuentomembresia.idmembresia
		 WHERE idpago='$this->idpago' AND idnotapago='$this->idnotapago'";
		 
			$resp = $this->db->consulta($sql2);
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


	public function ObtenerDatosNotaPago()
	{
		$sql = "SELECT notapago.folio,notapago.tipopago,notapago.fechareporte,notapago.fecha,notapago.estatus FROM
				notapago_descripcion
				INNER JOIN notapago ON
				notapago_descripcion.idnotapago=notapago.idnotapago	
			    	WHERE notapago_descripcion.idpago='$this->idpago'";
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
	

}

?>