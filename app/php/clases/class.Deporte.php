<?php 

class Deporte 
{
	
	public $db;
	public $iddeporte;
	public $deporte;
	public $estatus;

	public function ObtenerDeportes()
	{
		$sql="SELECT *FROM deporte ";

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


	public function ObtenernivelesDeporte()
	{
		$sql="SELECT * FROM nivel_deporte
			INNER JOIN nivel ON nivel_deporte.idnivel=nivel.idnivel
		 WHERE nivel.estatus=1 AND  iddeporte=".$this->iddeporte;
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