<?php 


class Descuentosasignados 
{
	
	public $db;
	public $idusuarios;
	public $iddescuento;
	public $numerodeveces;


	public function ObtenerdescuentoActivosAsignados()
	{

		$sql="SELECT
		descuento.iddescuento,
		descuento.titulo,
		descuento.tipo,
		descuento.estatus,
		descuento.monto,
		descuento.convigencia
		FROM
		usuarios_descuento
		JOIN descuento
		ON usuarios_descuento.iddescuento = descuento.iddescuento 
		  WHERE descuento.estatus=1 AND usuarios_descuento.idusuarios='$this->idusuarios'";

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


	public function EliminarAsignacionesDesNoUsados()
	{
		$sql = "DELETE FROM usuarios_descuento WHERE idusuarios='$this->idusuarios' AND numerodeveces=0";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}


	public function ObtenerAsignacionDescuento()
	{
		$sql="SELECT *FROM usuarios_descuento WHERE iddescuento='$this->iddescuento' AND idusuarios='$this->idusuarios'";

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

	public function GuardarAsignacionDescuento()
	{
		$query = "INSERT INTO usuarios_descuento (idusuarios,iddescuento) VALUES ('$this->idusuarios','$this->iddescuento')";

			$this->db->consulta($query);

	}

	public function VerificarAsignacionDescuento()
	{
		$sql="SELECT *FROM  usuarios_descuento WHERE numerodeveces>0 AND idusuarios='$this->idusuarios' AND iddescuento='$this->iddescuento' ";
		
			$this->db->consulta($sql);
			
	}

		
	public function EliminarAsignacionesDescuentos()
	{
		$sql = "DELETE FROM usuarios_descuento WHERE idusuarios='$this->idusuarios' ";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function ObtenesAsignacionesDescuento()
	{
		$sql="SELECT *FROM usuarios_descuento WHERE iddescuento='$this->iddescuento'";

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