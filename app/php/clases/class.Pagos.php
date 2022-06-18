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

	public function CrearRegistroPago()
	{
		$sql="INSERT INTO pagos(idusuarios, idservicio, idmembresia, tipo, monto, estatus,fechainicial,fechafinal,pagado,concepto) VALUES ( '$this->idusuarios','$this->idservicio','$this->idmembresia','$this->tipo','$this->monto', '$this->estatus','$this->fechainicial','$this->fechafinal',0,'$this->concepto')";
		
		$resp=$this->db->consulta($sql);

	}

	public function ObtenerTotalPagos()
	{
		$sql = "SELECT SUM(monto) as total FROM pagos WHERE estatus=1 AND pagado=0 AND idusuarios='$this->idusuarios' ORDER BY idpago asc";

	
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
		$sql = "SELECT * FROM pagos WHERE estatus=1 AND pagado=0 AND idusuarios='$this->idusuarios' ORDER BY idpago asc limit 1";

	
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
			$sql = "SELECT * FROM pagos WHERE estatus=1 AND pagado=0 AND idusuarios='$this->idusuarios' ORDER BY idpago ";

	
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