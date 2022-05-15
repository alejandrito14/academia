<?php 
/**
 * 
 */
class Membresia
{
	public $db;
	
	public $valor;
	public $idmembresia;
	public $titulo;
	public $descripcion;
	public $orden;
	public $estatus;
	public $imagen;
	public $costo;
	public $duracion;
	public $limite;


	//asignar
	public $idservicio;
	public $tipodescuento;
	public $inputcantidad;

	//usuarios
	public $idusuarios;

	public function ObtenerTodosmembresia()
	{
		$query = "SELECT *
			FROM 
			membresia";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	public function buscarmembresia()
	{
		$query = "SELECT *
			FROM 
			membresia WHERE idmembresia=".$this->idmembresia."";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	
	
	public function ObtenerUltimoOrdenmembresia()
	{
		$query="SELECT MAX(orden) as ordenar FROM membresia";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function guardarmembresia($value='')
	{
		$query="INSERT INTO membresia (titulo,estatus,orden,descripcion,costo,cantidaddias,tiempodepago) VALUES ('$this->titulo','$this->estatus','$this->orden','$this->descripcion','$this->costo','$this->duracion','$this->limite')";
		
		$resp=$this->db->consulta($query);
		$this->idmembresia = $this->db->id_ultimo();
		
	}

	public function modificarmembresia()
	{
			$query="UPDATE membresia
			 SET titulo='$this->titulo',
		     estatus='$this->estatus',
		     orden='$this->orden',
		     descripcion='$this->descripcion',
		     costo='$this->costo',
		     cantidaddias='$this->duracion',
		     tiempodepago='$this->limite'
		   	 WHERE idmembresia=$this->idmembresia";


		$resp=$this->db->consulta($query);
	}


	public function AsignarServicioMembresia()
	{
		$query="INSERT INTO servicios_membresia (idservicio,idmembresia,descuento,monto) VALUES ('$this->idservicio','$this->idmembresia','$this->tipodescuento','$this->inputcantidad')";
	
		$resp=$this->db->consulta($query);
	
		
	}

	public function EliminarAsignacion()
	{
		$query="DELETE FROM servicios_membresia 
		WHERE idmembresia='$this->idmembresia'";
		
		$resp=$this->db->consulta($query);
	}

	public function ObtenerServiciosMembresia()
	{
		
		$sql="SELECT *FROM servicios_membresia WHERE idmembresia='$this->idmembresia'";

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


	public function Borrarmembresia()
	{
		$query="DELETE FROM membresia 
		WHERE idmembresia='$this->idmembresia'";
		
		$resp=$this->db->consulta($query);
	}

	public function VerificarRelacionmembresia()
	{
		$sql="SELECT *FROM servicios_membresia WHERE idmembresia='$this->idmembresia'";

		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function ObtenerUsuarioMembresias()
	{
		$sql="SELECT GROUP_CONCAT(idmembresia) as idmembresias
		FROM usuarios_membresia WHERE idusuarios='$this->idusuarios'";

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

	public function ObtenerMembresiasDisponibles($idmembresias)
	{
		$sql="SELECT *
		FROM membresia ";

		if ($idmembresias!='') {
			$sql.=" WHERE idmembresia 
			 NOT IN('$this->idmembresias')";
		}
		

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

	public function ObtenerMembresia()
	{
		$sql="SELECT *
		FROM membresia WHERE idmembresia='$this->idmembresia'";

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


}

 ?>