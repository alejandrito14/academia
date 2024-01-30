<?php
class Bancos
{
	public $db;//objeto de la clase de conexcion
	
	public $idbancos;//identificador del pais
	public $clave;
	public $nombrecorto;
	public $nombre ;
	public $estatus;
	public $tipo_usuario;
	public $lista_empresas;
	public function ObtenerTodosBancos()
	{
		$query="SELECT * FROM bancos ";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function ObtenerBancos()
	{
		$query="SELECT * FROM bancos WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function GuardarBanco()
	{
		$query="INSERT INTO bancos (clave,nombrecorto,nombre,estatus) VALUES ('$this->clave','$this->nombrecorto','$this->nombre','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idbanner = $this->db->id_ultimo();
		
		
		
	}
	//funcion para modificar los usuarios
	public function ModificarBanco()
	{
		$query="UPDATE bancos SET clave='$this->clave',
		nombrecorto='$this->nombrecorto',
		estatus='$this->estatus',
		nombre='$this->nombre' WHERE idbancos=$this->idbancos";
	
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarBanco()
	{
		$query="SELECT * FROM bancos WHERE idbancos=".$this->idbancos;
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function ObtenerListaBancos()
	{
		
		$sql = "SELECT * FROM bancos WHERE estatus=1";

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