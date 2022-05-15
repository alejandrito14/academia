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
	public $orden;

	public function ObtenerEntradas()
	{
		$sql="SELECT *FROM entradas  ORDER BY orden asc ";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);
		return $resp;
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

	public function ObtenerUltimoOrdenentrada()
	{
		$query="SELECT MAX(orden) as ordenar FROM entradas";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function buscarentrada($value='')
	{
		$sql="SELECT *FROM entradas WHERE identrada='$this->identrada' ";

		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function guardarEntrada()
	{
		$sql="INSERT INTO `entradas`( `titulo`, `descripcion`, `tipo`,  `orden`, `estatus`) VALUES ('$this->titulo', '$this->descripcion', '$this->tipo',$this->orden, $this->estatus)";

		$resp=$this->db->consulta($sql);
		$this->identrada=$this->db->id_ultimo();
		
	}

	public function modificarEntrada()
	{
		$sql="
		UPDATE `entradas` SET 
		`titulo` = 	'$this->titulo', 
		`descripcion` = '$this->descripcion', 
		`tipo` = 	'$this->tipo',
		 `orden` = $this->orden, 
		 `estatus` = $this->estatus
		 WHERE `identrada` = $this->identrada
		";

	
		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function Borrarentrada()
	{
		$sql="
		DELETE FROM entradas
		 WHERE `identrada` = $this->identrada
		";

	
		$resp=$this->db->consulta($sql);
	}
}

?>