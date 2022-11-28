<?php 

class Matrices 
{
	
	public $db;
	public $nombre;
	public $valor1;
	public $valor2;
	public $estatus;
	public $id;



	public function ObtenerTodosmatrices()
	{
		$sql="SELECT *FROM matriz ";
		$result = $this->db->consulta($sql);
		return $result;
		
	}

	public function Guardarmatriz()
	{
		$sql="INSERT INTO matriz(nombre, estatus, valor1,valor2) VALUES ('$this->nombre', '$this->estatus','$this->valor1', '$this->valor2')";
		$resp=$this->db->consulta($sql);
		$this->id = $this->db->id_ultimo();

	}

	public function GuardarValoresMatriz()
	{
		$sql="INSERT INTO valor(valor1,valor2, idmatriz) VALUES ('$this->valor1', '$this->valor2','$this->id')";
		
		$resp=$this->db->consulta($sql);
	}

	public function EliminarValoresMatriz()
	{
		$sql="DELETE FROM valor WHERE 
		idmatriz = '$this->id'";
		$resp=$this->db->consulta($sql);
	}

	public function Modificarmatriz()
	{
		$sql="UPDATE matriz SET 
		nombre = '$this->nombre', 
		estatus = '$this->estatus',
		valor1 = '$this->valor1', 
		valor2 = '$this->valor2'
		WHERE idmatriz='$this->id'";

		$resp=$this->db->consulta($sql);
 
	}



	public function BorrarValores()
	{
		$sql="DELETE FROM valor WHERE idmatriz='$this->id'";
		$resp=$this->db->consulta($sql);

	}

	public function BorrarMatriz()
	{
		$sql="DELETE FROM matriz WHERE idmatriz='$this->id'";
		$resp=$this->db->consulta($sql);
	}

	public function buscarmatriz()
	{
		$sql="SELECT *FROM matriz WHERE idmatriz='$this->id'";
		$result = $this->db->consulta($sql);
		return $result;
		
	}

	public function ObtenerValoresMatriz()
	{
		$sql = "SELECT * FROM valor WHERE idmatriz = '$this->id'";
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