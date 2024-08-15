<?php
class Cuentas
{
	public $db;//objeto de la clase de conexcion
	
	public $idcuenta;//identificador del pais
	public $nombre ;
	public $estatus;
	public $tipo_usuario;
	public $lista_empresas;
	public function ObtenerTodosCuentas()
	{
		$query="SELECT * FROM cuenta ";
		
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
	

	public function GuardarCuenta()
	{
		$query="INSERT INTO cuenta (nombre,estatus) VALUES ('$this->nombre','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idbanner = $this->db->id_ultimo();
		
		
		
	}
	//funcion para modificar los usuarios
	public function ModificarCuenta()
	{
		$query="UPDATE cuenta SET 
		estatus='$this->estatus',
		nombre='$this->nombre' WHERE idcuenta=$this->idcuenta";
	
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarCuenta()
	{
		$query="SELECT * FROM cuenta WHERE idcuenta=".$this->idcuenta;

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


	public function VerificarRelacionCuenta()
	{
		$sql = "SELECT * FROM clasificadorgastos WHERE depende='$this->idcuenta'";

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

	public function BorrarCuenta()
	{
		$sql="DELETE FROM cuenta WHERE idcuenta='$this->idcuenta'";
		$resp = $this->db->consulta($sql);

	}


	public function ObtenerTodosCuentasActivos()
	{
		$query="SELECT * FROM cuenta WHERE estatus=1";
		
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