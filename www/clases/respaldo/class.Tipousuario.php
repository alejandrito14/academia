<?php

class Tipousuario

{

	public $db;//objeto de la clase de conexcion

	

	public $idtipousuario;
	public $nombretipo;
	public $estatus;
	public $mostrarenapp;
	public $tipo;
	public $sistema;
	
	//Funcion para obtener todos los Tipousuario activos
	public function ObtTipousuarioActivos()
	{
		$sql = "SELECT * FROM tipousuario WHERE estatus = 1";

		if ($this->tipo!='') {

			$sql.=" AND idtipousuario IN($this->tipo)";
		}
	
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
		$query="INSERT INTO tipousuario (nombretipo,estatus,mostrarenapp,sistema) VALUES ('$this->nombre','$this->estatus','$this->mostrarenapp','$this->sistema')";
		
		$resp=$this->db->consulta($query);
		$this->idtipousuario = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificartipousuario()
	{
		$query="UPDATE tipousuario SET nombretipo='$this->nombre',
		estatus='$this->estatus',
		mostrarenapp='$this->mostrarenapp',
		sistema='$this->sistema'
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

	public function VerificarRelacionUsuario(){
		$query="SELECT * FROM usuarios WHERE tipo=".$this->idtipousuario;
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	 public function BorrarTipousuario(){

		$query="DELETE  FROM tipousuario WHERE idtipousuario=".$this->idtipousuario;
		
		$resp=$this->db->consulta($query);
		
		
	 }

	 public function ObtTipousuarioActivosSistema()
	{
		$sql = "SELECT * FROM tipousuario WHERE estatus = 1 AND sistema=1";

	
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