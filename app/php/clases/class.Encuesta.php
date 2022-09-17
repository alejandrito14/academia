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

	public $idservicio;

	public $titulocuestion;
	public $idcuestion;

	public $idopcion;
	public $res;


	public $idusuarios;
	public $idusuarioquienrealizo;
	public $mostraralumno;
	public $idusuarioencuesta;
	//Funcion para obtener todos los encuesta activos
	public function ObtencuestaActivosServicio()
	{
		$sql = "
			SELECT
		servicios_encuesta.idservicio,
		servicios_encuesta.idencuesta,
		servicios_encuesta.idservicioencuesta,
		encuesta.titulo,
		encuesta.estatus,
		encuesta.fechacreacion
		FROM
		servicios_encuesta
		JOIN encuesta
		ON servicios_encuesta.idencuesta = encuesta.idencuesta
		WHERE
		encuesta.estatus = 1
		 AND servicios_encuesta.idservicio='$this->idservicio'";
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

	public function GuardarEncuestaElaborada()
	{
		$query="INSERT INTO usuarios_encuesta (idusuarios,idencuesta,idusuarioelaboro,mostraralumno,estatus,idservicio) VALUES ('$this->idusuarios','$this->idencuesta','$this->idusuarioquienrealizo','$this->mostraralumno','$this->estatus','$this->idservicio')";
		
		$resp=$this->db->consulta($query);
		$this->idusuarioencuesta=$this->db->id_ultimo();
	}

	public function ModificarEncuestaElaborada()
	{
		$query="UPDATE usuarios_encuesta SET 
			idusuarios = '$this->idusuarios', 
			idencuesta = '$this->idencuesta', 
			idusuarioelaboro = '$this->idusuarioquienrealizo',
			 fechaedicion ='".date('Y-m-d H:i:s')."', mostraralumno = '$this->mostraralumno',
			 idservicio ='$this->idservicio',
			 estatus='$this->estatus'
			 WHERE idusuarioencuesta = '$this->idusuarioencuesta'";
		$resp=$this->db->consulta($query);
	}

	public function GuardarRespuesta()
	{
		$query="INSERT INTO respuestaencuesta(idusuarioencuesta, idcuestion, idopcion, respuesta) VALUES ('$this->idusuarioencuesta', '$this->idcuestion','$this->idopcion', '$this->res')";

		$resp=$this->db->consulta($query);


	}

	public function ObtenerSihayRespuestasEvaluacion()
	{
		
		$sql = "SELECT * FROM usuarios_encuesta WHERE idencuesta = '$this->idencuesta' AND idusuarios='$this->idusuarios' AND idservicio='$this->idservicio'";


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

	public function ObtenerRespuestasEncuesta($idusuarioencuesta)
	{
		$sql = "SELECT * FROM respuestaencuesta WHERE idusuarioencuesta = '$idusuarioencuesta'";
	
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

	public function EliminarRespuestas()
	{
		$sql = "DELETE FROM respuestaencuesta WHERE idusuarioencuesta = '$this->idusuarioencuesta'";
	
		$resp = $this->db->consulta($sql);
	}

	public function ObtencuestaUsuarioServicio()
	{
		$sql = "
			SELECT
		servicios_encuesta.idservicio,
		servicios_encuesta.idencuesta,
		servicios_encuesta.idservicioencuesta,
		encuesta.titulo,
		encuesta.estatus,
		encuesta.fechacreacion,
		usuarios_encuesta.fechacreacion as fecharealizada
		FROM
		servicios_encuesta
		JOIN encuesta
		ON servicios_encuesta.idencuesta = encuesta.idencuesta
		INNER JOIN usuarios_encuesta 
		ON servicios_encuesta.idencuesta=usuarios_encuesta.idencuesta
		WHERE
		encuesta.estatus = 1
		AND usuarios_encuesta.mostraralumno = 1
		AND servicios_encuesta.idservicio='$this->idservicio' AND usuarios_encuesta.idusuarios='$this->idusuarios'";
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

	public function UsuariosEncuesta()
	{
		$sql = "
			SELECT
		servicios_encuesta.idservicio,
		servicios_encuesta.idencuesta,
		servicios_encuesta.idservicioencuesta,
		encuesta.titulo,
		encuesta.estatus,
		encuesta.fechacreacion,
		usuarios_encuesta.fechacreacion as fecharealizada
		FROM
		servicios_encuesta
		JOIN encuesta
		ON servicios_encuesta.idencuesta = encuesta.idencuesta
		INNER JOIN usuarios_encuesta 
		ON servicios_encuesta.idencuesta=usuarios_encuesta.idencuesta
		WHERE
		encuesta.estatus = 1	
		AND usuarios_encuesta.idservicio='$this->idservicio' AND usuarios_encuesta.idencuesta='$this->idencuesta' and 	usuarios_encuesta.idusuarios='$this->idusuarios'";

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

	public function ObtenerTodasEncuestas()
	{
		$sql = "SELECT *FROM encuesta WHERE estatus = 1";
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