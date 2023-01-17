<?php 
/**
 * 
 */
class MembresiasAsignadas 
{
	
	public $db;
	public $idusuarios;
	public $idmembresia;
	public $monto;
	public $tarjeta;
	public $fecha;
	public $estatus;
	public $fechainicial;
	public $fechafinal;
	public $fechapago;
	public $pagado;



	public function ObtenermembresiaActivosAsignados()
	{

		$sql="SELECT
		membresia.idmembresia,
		membresia.titulo,
		membresia.descripcion,
		membresia.estatus,
		membresia.costo,
		membresia.cantidaddias

		FROM
		usuarios_membresia
		JOIN membresia
		ON usuarios_membresia.idmembresia = membresia.idmembresia 
		  WHERE usuarios_membresia.estatus IN(0,1)  AND usuarios_membresia.idusuarios='$this->idusuarios' ORDER BY usuarios_membresia.idusuarios_membresia LIMIT 1";

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


	public function EliminarAsignacionesMembresiasNoPagadas()
	{
		$sql = "DELETE FROM usuarios_membresia WHERE idusuarios='$this->idusuarios' AND pagado=0  ";
		
		$resp=$this->db->consulta($sql);
		
		return $resp;
	}


	public function ObtenerAsignacionMembresia()
	{
		$sql="SELECT *FROM usuarios_membresia WHERE idmembresia='$this->idmembresia' AND idusuarios='$this->idusuarios'";

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

	public function GuardarAsignacionmembresia()
	{
		$query = "INSERT INTO usuarios_membresia (idusuarios,idmembresia) VALUES ('$this->idusuarios','$this->idmembresia')";

			$this->db->consulta($query);

	}

	public function VerificarAsignacionmembresia()
	{
		$sql="SELECT *FROM  usuarios_membresia WHERE pagado=1 AND idusuarios='$this->idusuarios' AND idmembresia='$this->idmembresia' ";
	
			$resp=$this->db->consulta($sql);
			return $resp;
	}

}
 ?>