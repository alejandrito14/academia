<?php
class Publicidad
{
	public $db;
	public $idpublicidad;
	public $titulo;
	public $estatus;
	public $orden;
	public $imagen;


	public function ObtenerPublicidad()
	{
		$sql="SELECT *FROM publicidad ";

		if ($this->estatus==1) {

			$sql.=" WHERE estatus=1";
		}

		$sql.=" ORDER BY orden asc";

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

	public function CambiarEstatusPublicidad()
	{
		$query="UPDATE publicidad SET 
		estatus='$this->estatus'
		
		 WHERE idpublicidad='$this->idpublicidad' ";

		$result = $this->db->consulta($query);
	}

}

?>