<?php 
/**
 * 
 */
class Pagos 
{
	
	public $db;
	public $idusuarios;
	public $idmembresia;
	public $idservicio;
	public $tipo;
	public $monto;
	public $estatus;
	public $dividido;
	public $fechainicial;
	public $fechafinal;
	public $concepto;
	public $folio;
	public $idstripe;
	public $pagado;
	public $fechapago;

	public function CrearRegistroPago()
	{
		$sql="INSERT INTO pagos(idusuarios, idservicio, idmembresia, tipo, monto, estatus,fechainicial,fechafinal,pagado,concepto,folio) VALUES ( '$this->idusuarios','$this->idservicio','$this->idmembresia','$this->tipo','$this->monto', '$this->estatus','$this->fechainicial','$this->fechafinal',0,'$this->concepto','$this->folio')";
		
		$resp=$this->db->consulta($sql);

	}

	public function ObtenerTotalPagos()
	{
		$sql = "SELECT SUM(monto) as total FROM pagos WHERE estatus=0 AND pagado=0 AND idusuarios='$this->idusuarios' ORDER BY idpago asc";

	
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
		$sql = "SELECT * FROM pagos WHERE estatus=0 AND pagado=0 AND idusuarios='$this->idusuarios' ORDER BY idpago asc limit 1";

	
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

		public function ListadopagosNopagados()
		{
			$sql = "SELECT * FROM pagos WHERE estatus=0 AND pagado=0 AND idusuarios='$this->idusuarios' ORDER BY idpago ";

	
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
}

 ?>