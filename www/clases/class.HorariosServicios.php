<?php
class HorariosServicios
{
	
	public $db;
	
	public $idhorariosservicio;
	public $dia;
	public $horainicial;
	public $horafinal;
	public $idservicio;
	public $fecha;
	public $idzona;
	

	public function obtenerTodas()
	{
		
		$sql = "SELECT C.* FROM categorias C";

	
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ConsultarDisponibilidad()
	{
		$sql="SELECT *FROM horariosservicio WHERE fecha='$this->fecha' AND idzona='$this->idzona'";

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

	public function Disponibilidad()
	{
		$sql="SELECT COUNT(*) 
		FROM horariosservicio
		WHERE
		  (horainicial BETWEEN '$this->horainicial' AND '$this->horafinal')
		  OR
		  (horafinal BETWEEN '$this->horainicial' AND '$this->horafinal')
		  AND fecha='$this->fecha' AND idzona='$this->idzona'

		  ";

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

	public function Disponibilidad2()
	{


		$sql="SELECT *from (SELECT *
			FROM horariosservicio
		WHERE fecha='$this->fecha' AND idzona='$this->idzona' )AS TABLA1
		where
		  TABLA1.horainicial BETWEEN '$this->horainicial' AND '$this->horafinal'
		  OR
		  TABLA1.horafinal BETWEEN '$this->horainicial' AND '$this->horafinal'

		  ";

		 // echo $sql.'<br>';

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

	public function Disponibilidad3()
	{
		$sql="SELECT *from (SELECT *
			FROM horariosservicio
		WHERE fecha='$this->fecha' AND idzona='$this->idzona' )AS TABLA1
		where
		  TABLA1.horainicial >= '$this->horainicial' AND TABLA1.horafinal<='$this->horafinal'";


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