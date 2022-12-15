<?php 

/**
 * 
 */
class Chatdirigido 
{
	public $db;
	public $idchatdirigido;
	public $idusuarios;
	public $estatusleido;
	public $idchat;


	public function ChecarLeido()
	{
		$sql="SELECT *FROM chatdirigido WHERE idusuarios='$this->idusuarios' AND idchat='$this->idchat' ";
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
			$sql = "UPDATE chatdirigido 
			SET estatusleido=1 WHERE 
			idchat='$this->idchat' AND
		    idusuarios='$this->idusuarios'";

			$resp = $this->db->consulta($sql);
		}

	}
?>