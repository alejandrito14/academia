<?php 
/**
 * 
 */
class Encuesta 
{
	
	public $db;
	public $idencuesta;
	public $titulo;
	public $estatus;

	public $titulocuestion;
	public $idcuestion;

	public $idopcion;

	public $idservicio;
	//Funcion para obtener todos los encuesta activos
	public function ObtencuestaActivos()
	{
		$sql = "SELECT * FROM encuesta WHERE estatus = 1";
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

	public function ObtenerTodosencuesta()
	{
		$query="SELECT * FROM encuesta ";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function ObtenerTodosActivoencuesta()
	{
		$query="SELECT * FROM encuesta WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardarencuesta()
	{
		$query="INSERT INTO encuesta (titulo,estatus) VALUES ('$this->titulo','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idencuesta = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarencuesta()
	{
		$query="UPDATE encuesta SET 
		titulo='$this->titulo',
		estatus='$this->estatus'
		WHERE idencuesta=$this->idencuesta";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarencuesta()
	{
		$query="SELECT * FROM encuesta WHERE idencuesta=".$this->idencuesta;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function VerificarRelacionencuesta()
	{
		$query="SELECT * FROM usuarios WHERE idencuesta=".$this->idencuesta;
		$resp=$this->db->consulta($query);
		//echo $total;
		return $resp;
	}

	public function Borrarencuesta()
	{
		$sql="DELETE FROM encuesta WHERE idencuesta='$this->idencuesta'";

		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
	public function GuardarCuestion()
	{
		$query="INSERT INTO cuestiones (titulo,estatus,idencuesta) VALUES ('$this->titulocuestion','$this->estatus','$this->idencuesta')";
		
		$resp=$this->db->consulta($query);
		$this->idcuestion = $this->db->id_ultimo();
	}

	public function GuardarOpcionCuestion()
	{
		$query="INSERT INTO cuestiones_opciones (idcuestion,idopcion) VALUES ('$this->idcuestion','$this->idopcion')";
		
		$resp=$this->db->consulta($query);
	}

	public function ObtenerCuestiones()
	{
		
		$sql = "SELECT * FROM cuestiones WHERE idencuesta = '$this->idencuesta'";
	
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

	public function ObtenerOpcionesCuestiones()
	{
			$sql = "SELECT * FROM cuestiones_opciones WHERE idcuestion = '$this->idcuestion'";
	
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

	public function EliminarPreguntas()
	{
		$sql = "SELECT * FROM cuestiones WHERE idencuesta = '$this->idencuesta'";
	
		$resp = $this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				/*$array[$contador]=$objeto;
				$contador++;*/
				$sql="DELETE FROM cuestiones_opciones WHERE idcuestion=".$objeto->idcuestion."";
				
				$this->db->consulta($sql);

				$sql2="DELETE FROM cuestiones WHERE idcuestion=".$objeto->idcuestion."";
				$this->db->consulta($sql2);

			} 
		}
		//return $array;
	}


	public function ObtenerEncuestasServicio()
	{
		$sql = "
			SELECT * FROM servicios_encuesta WHERE idservicio='$this->idservicio'";
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