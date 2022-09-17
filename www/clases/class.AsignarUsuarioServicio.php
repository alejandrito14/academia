<?php 

class AsignarUsuarioServicio 
{
	public $db;
	public $idusuarios_servicios;
	public $idusuarios;
	public $idservicio;


	public function ObtenerServicioActivosAsignados()
	{
		
		$sql="SELECT
		servicios.idservicio,
		servicios.titulo,
		servicios.descripcion,
		servicios.estatus,
		categorias.titulo AS titulocategoria,
		servicios.imagen,
		servicios.fechainicial,
		servicios.fechafinal,
		usuarios_servicios.idusuarios,
		servicios.lunes,
		servicios.martes,
		servicios.miercoles,
		servicios.jueves,
		servicios.viernes,
		servicios.sabado,
		servicios.domingo
		FROM
		usuarios_servicios
		JOIN servicios
		ON usuarios_servicios.idservicio = servicios.idservicio 
		JOIN categorias
		ON categorias.idcategorias = servicios.idcategoriaservicio
		  WHERE servicios.estatus=1 AND cancelacion=0 AND usuarios_servicios.idusuarios='$this->idusuarios'";

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


	public function GuardarAsignacion()
	{
		$query = "INSERT INTO usuarios_servicios (idusuarios,idservicio) VALUES ('$this->idusuarios','$this->idservicio')";

		$this->db->consulta($query);


	}

	public function ObtenerAsignacion()
	{
		$sql="SELECT *FROM usuarios_servicios WHERE idservicio='$this->idservicio' AND idusuarios='$this->idusuarios'";

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


	public function EliminarAsignacionesSinAceptar()
	{
		$query = "DELETE FROM usuarios_servicios WHERE aceptarterminos=0 AND motivocancelacion is NULL AND fechaaceptacion is NULL AND fechacancelacion is NULL AND idusuarios='$this->idusuarios'";
		
		$this->db->consulta($query);

	}


	public function VerificarAsignacion()
	{
		$sql="SELECT *FROM  usuarios_servicios WHERE aceptarterminos=0 AND motivocancelacion is NULL AND fechaaceptacion is NULL AND fechacancelacion is NULL AND idusuarios='$this->idusuarios' AND idservicio='$this->idservicio' ";

			$this->db->consulta($sql);
			
	}



}

 ?>