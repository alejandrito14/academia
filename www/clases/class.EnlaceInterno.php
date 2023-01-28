<?php 
/**
 * 
 */
class EnlaceInterno 
{
	
	public $db;
	public $idrutainternaapp;


	public function ObtenerEnlacesInternos()
	{
		$sql="SELECT *FROM rutainternaapp WHERE estatus=1";

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

	public function ObtenerEnlaceInterno()
	{
		
		$sql="SELECT *FROM rutainternaapp WHERE idrutainternaapp='$this->idrutainternaapp'";

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

}

 ?>