<?php
class Parentesco
{
	public $db;
	public $idparentesco;
	public $estatus;
	public $parentesco;


	public function ObtenerParentescos()
	{
		$sql="SELECT *FROM parentesco WHERE estatus=1 ";

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