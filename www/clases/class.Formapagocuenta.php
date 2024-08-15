<?php
class Formapagocuenta
{
	public $db;//objeto de la clase de conexcion
	
	public $idformapagocuenta;//identificador del pais
	public $nombre ;
	public $estatus;
	public $tipo_usuario;
	public $lista_empresas;
	public function ObtenerTodosformapagocuentas()
	{
		$query="SELECT * FROM formapagocuenta ";
		
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
	

	public function Guardarformapagocuenta()
	{
		$query="INSERT INTO formapagocuenta (nombre,estatus) VALUES ('$this->nombre','$this->estatus')";
	
		$resp=$this->db->consulta($query);
		$this->idformapagocuenta = $this->db->id_ultimo();
		
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarformapagocuenta()
	{
		$query="UPDATE formapagocuenta SET 
		estatus='$this->estatus',
		nombre='$this->nombre' WHERE idformapagocuenta=$this->idformapagocuenta";
	
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarformapagocuenta()
	{
		$query="SELECT * FROM formapagocuenta WHERE idformapagocuenta=".$this->idformapagocuenta;

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


	public function VerificarRelacionFormapagoCuenta()
	{
		$sql = "SELECT * FROM movimiento WHERE idformapagocuenta='$this->idformapagocuenta'";


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

	public function BorrarFormapagocuenta()
	{
		$sql="DELETE FROM formapagocuenta WHERE idformapagocuenta='$this->idformapagocuenta'";
		$resp = $this->db->consulta($sql);

	}

		public function ObtenerTodosformapagocuentasActivas()
	{
		$query="SELECT * FROM formapagocuenta WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}


	public function ObtenerFormascuentasbancarias()
	{
		$query="SELECT * FROM formapagocuenta WHERE estatus=1";
		
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