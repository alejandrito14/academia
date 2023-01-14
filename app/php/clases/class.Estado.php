<?php
class Estado
{
	public $db;//objeto de la clase de conexcion
	
	public $id_estado;//identificador del estado
	public $id_pais;//identificador del pais
	public $estado;//nombre del estado
	public $descripcion;//descripcion del estado
	
	
		public function ObtenerEstadosTodos()
	{
		$query="SELECT * FROM estado";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	public function ObtenerEstados($idpais)
	{
		$query="SELECT * FROM estados WHERE idpais='$idpais'";
		
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	//funcion para guardar los estados 
	
	public function GuardarEstado()
	{
		$query="INSERT INTO estado (idpais,estado,descripcion) VALUES ($this->id_pais,'$this->estado','$this->descripcion')";
		$resp=$this->db->consulta($query);
		$this->id_estado = $this->db->id_ultimo();
		
		
		
	}
	//funcion para modificar estado
	public function ModificarEstado()
	{
		$query="UPDATE estado SET idpais=$this->id_pais, estado='$this->estado' , descripcion='$this->descripcion'  WHERE idestado=$this->id_estado";
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function ObtenerDatosEstado()
	{
		$query="SELECT * FROM estados WHERE id=".$this->id_estado;
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