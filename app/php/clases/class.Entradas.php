<?php
class Entradas
{
	public $db;
	public $identrada;
	public $titulo;
	public $descripcion;
	public $estatus;
	public $tipo;
	public $imagen;
	public $video;

	public function ObtenerEntradas()
	{
		$sql="SELECT *FROM entradas";

		if ($this->estatus==1) {
		 	$sql.=" WHERE estatus=1";
		 } 


		$sql.=" ORDER BY orden asc ";

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

	public function ObtenerEntrada()
	{
		$sql="SELECT *FROM entradas WHERE identrada='$this->identrada' ";

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

	public function CambiarEstatusEntrada()
	{
	
		$query="UPDATE entradas SET 
		estatus='$this->estatus'
		 WHERE identrada='$this->identrada' ";

		$result = $this->db->consulta($query);
	
	}

}

?>