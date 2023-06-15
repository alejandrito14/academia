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
	public $idusuarios_membresia;
	public $idpago;

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
		$sql="SELECT *FROM usuarios_membresia WHERE idmembresia='$this->idmembresia' AND idusuarios='$this->idusuarios' AND usuarios_membresia.estatus=1 AND usuarios_membresia.pagado=1";

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
			$this->idusuarios_membresia=$this->db->id_ultimo();

	}

	public function VerificarAsignacionmembresia()
	{
		$sql="SELECT *FROM  usuarios_membresia WHERE pagado=1 AND idusuarios='$this->idusuarios' AND idmembresia='$this->idmembresia' ";
	
			$resp=$this->db->consulta($sql);
			return $resp;
	}

	public function ConsultarSiTienelamembresia()
	{
		$sql="SELECT *FROM usuarios_membresia WHERE idmembresia='$this->idmembresia' AND idusuarios='$this->idusuarios' AND estatus=1";
		
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

	public function ActualizarEstatusAsignacion()
	{
		$sql="UPDATE usuarios_membresia SET estatus='$this->estatus' WHERE idusuarios_membresia='$this->idusuarios_membresia'";
		$resp=$this->db->consulta($sql);


	}

	public function BuscarFechasArray($arrayfechas,$idmembresia)
	{
		$fechas=array();
		if (count($arrayfechas)>0) {
			for ($i=0; $i < count($arrayfechas); $i++) { 
				if ($arrayfechas[$i]->idmembresia==$idmembresia) {
					
					array_push($fechas, $arrayfechas[$i]->fecha);
				}
			}
		}

		return $fechas;
	}

	public function ActualizarFechaAsignacion($fecha)
	{
		$fecha=$fecha.' 23:59:59';
		$sql="UPDATE usuarios_membresia SET fechaexpiracion='$fecha',
			idpago='$this->idpago'
		 WHERE idusuarios_membresia='$this->idusuarios_membresia'";
		$resp=$this->db->consulta($sql);

	}


	public function ObtenerAsignacionMembresiaUsuario()
	{
		$sql="SELECT *FROM usuarios_membresia WHERE  idusuarios='$this->idusuarios' AND estatus IN(0,1) ";

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


	public function VerificarAsignacionmembresiaUsuario()
	{
		$sql="SELECT *FROM  usuarios_membresia WHERE  idusuarios='$this->idusuarios' AND idmembresia='$this->idmembresia' AND estatus(0,1) ";
	
			$resp=$this->db->consulta($sql);
			return $resp;
	}


}
 ?>