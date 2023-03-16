<?php
class Espacios
{
	public $db;//objeto de la clase de conexcion
	
	public $idespacio;//
	public $nombre;
	public $lugar;
	public $ubicacion;
	public $estatus;
	public $tipo_usuario;
	public $lista_empresas;
	public function ObtenerTodosEspacios()
	{
		$query="SELECT * FROM espacio ";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function ObtenerEspacios()
	{
		$query="SELECT * FROM espacio WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function GuardarEspacio()
	{
		$query="INSERT INTO espacio (nombre,lugar,ubicacion,estatus) VALUES ('$this->nombre','$this->lugar','$this->ubicacion','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idespacio = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function ModificarEspacio()
	{
		$query="UPDATE espacio SET nombre='$this->nombre',
		lugar='$this->lugar',
		estatus='$this->estatus',
		ubicacion='$this->ubicacion' WHERE idespacio=$this->idespacio";
	
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarEspacio()
	{
		$query="SELECT * FROM espacio WHERE idespacio=".$this->idespacio;
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	

	public function ObtenerEspaciosActivos()
		{
			$sql = "SELECT *FROM zonas WHERE estatus=1 ";


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