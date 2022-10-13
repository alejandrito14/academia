<?php 
/**
 * 
 */
class Dashboard
{
	public $db;
	public $fechainicial;
	public $fechafinal;
	

	public function Descargas($value='')
	{
		$query="CALL descargasapp()";

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

	public function Registrados($value='')
	{
		$query="SELECT COUNT(*) AS cantidad FROM clientes";
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



	public function ClientesLogeados($value='')
	{
		$query="SELECT COUNT(*)  AS clientessession from (
		SELECT
		clientes.idcliente,
		clientetoken.token,
		clientetoken.dispositivo,
		clientetoken.uuid,
		clientetoken.idclientetoken,
		clientetoken.fecharegistro
		FROM
		clientes
		JOIN clientetoken
		ON clientes.idcliente = clientetoken.idcliente WHERE clientetoken.uuid!='undefined' and clientetoken.uuid!='' and clientetoken.token!='null' GROUP BY idcliente)as tab";

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

	public function ObtenerCantidadAlumnos()
	{
		$query="
		SELECT
		COUNT(idusuarios) as total
		FROM
		usuarios WHERE tipo=3 AND usuario IS NOT NULL
		";

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


	public function ObtenerCantidadCoach($value='')
	{
		$query="
		SELECT
		COUNT(idusuarios) as total
		FROM
		usuarios WHERE tipo=5 AND usuario IS NOT NULL
		";

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

	public function ObtenerCantidadServicios()
	{
		$query="
		SELECT
		COUNT(idservicio) as total
		FROM
		servicios 
		";

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

	public function ObtenerHorariosFecha()
	{
		$query="
		SELECT
		*FROM horariosservicio 
		INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona
		INNER JOIN servicios ON horariosservicio.idservicio=servicios.idservicio
			 WHERE fecha>='$this->fechainicial' AND fecha<='$this->fechafinal'
		";

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

	public function ObtenerHorariosFechaEspecifica()
	{
		$query="
		SELECT
		*FROM horariosservicio 
		INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona
		INNER JOIN servicios ON horariosservicio.idservicio=servicios.idservicio
			 WHERE fecha='$this->fechainicial'
		";

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


public function ObtenerHorariosFechaEspecificaOrdenHorainicial()
	{
		$query="
		SELECT
		*FROM horariosservicio 
		INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona
		INNER JOIN servicios ON horariosservicio.idservicio=servicios.idservicio
			 WHERE fecha='$this->fechainicial' ORDER BY zonas.idzona,horariosservicio.horainicial
		";

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

	public function GuardarIntervalo($intervalo)
	{
	
		$query="UPDATE pagina_configuracion SET 
		intervalohorarios='$intervalo'";

		$resp=$this->db->consulta($query);
	
	}

	public function ObtenerIntervalo()
	{
		$query="
		SELECT intervalohorarios FROM pagina_configuracion
		";

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
		return $array[0]->intervalohorarios;
	}


}

 ?>