<?php
class Usocfdi
{
	public $db;//objeto de la clase de conexcion
	public $cmetodopago;
	public $cformapago;
	public $cusocfdi;

	
	
	
	public function ObtenerUsocfdi()
	{
		$query="SELECT * FROM usocfdi ";
		
		$resp = $this->db->consulta($query);
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

	public function ObtenerMetodosPago()
	{
		$query="SELECT * FROM metodopago ";
		
		$resp = $this->db->consulta($query);
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
	
	public function ObtenerFormasdepago()
	{
		$query="SELECT * FROM formapago ";
		
		$resp = $this->db->consulta($query);
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


	public function ObtenerUso()
	{
		$query="SELECT * FROM usocfdi WHERE c_uso='$this->cusocfdi'";
		
		$resp = $this->db->consulta($query);
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

	public function ObtenerMetodoPago()
	{
		$query="SELECT * FROM metodopago WHERE c_metodopago='$this->cmetodopago'";
		
		$resp = $this->db->consulta($query);
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
	
	public function ObtenerFormadepago()
	{
		$query="SELECT * FROM formapago WHERE cformapago='$this->cformapago'";
		
		$resp = $this->db->consulta($query);
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