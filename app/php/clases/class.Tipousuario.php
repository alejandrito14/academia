<?php

class Tipousuario

{

	public $db;//objeto de la clase de conexcion

	

	public $idtipousuario;
	public $nombretipo;
	public $estatus;
	public $mostrarenapp;

	
	
	//Funcion para obtener todos los Tipousuario activos
	public function ObtTipousuarioActivos()
	{
		$sql = "SELECT * FROM tipousuario WHERE estatus = 1 AND mostrarenapp=1";
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

	public function ObtenerTodosTipousuario()
	{
		$query="SELECT * FROM tipousuario ";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function ObtenerTipousuario()
	{
		$query="SELECT * FROM tipousuario WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardartipousuario()
	{
		$query="INSERT INTO tipousuario (tipousuario,estatus) VALUES ('$this->nombre','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idtipousuario = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificartipousuario()
	{
		$query="UPDATE tipousuario SET tipousuario='$this->nombre',
		estatus='$this->estatus'
		WHERE idtipousuario=$this->idtipousuario";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscartipousuario()
	{
		$query="SELECT * FROM tipousuario WHERE idtipousuario=".$this->idtipousuario;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	


	

}

?>