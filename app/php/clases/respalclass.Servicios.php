<?php
class Servicios
{
	public $db;
	public $idservicio;
	public $titulo;
	public $descripcion;
	public $estatus;
	public $categoria;

	public $fecha;


	

	public function ObtenerServicios()
	{
		$sql="SELECT *FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoria ";
			if($this->estatus!=0){

			$sql.=" WHERE servicios.estatus=1";
			
			}
			$sql.=" ORDER BY servicios.orden asc";
		
			 
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


	public function ObtenerServiciosAdmin()
	{
		$sql="SELECT
		servicios.idservicio,
		servicios.titulo,
		servicios.descripcion,
		servicios.estatus,
		servicios.idcategoriaservicio,
		servicios.imagen,
		servicios.fechacreacion,
		servicios.orden,
		servicios.fechainicial,
		servicios.fechafinal,
		categorias.avanzado,
		categorias.estatus AS estatuscategoria,
		servicios.numeroparticipantes,
		servicios.numeroparticipantesmax,
		servicios.abiertocoach,
		servicios.abiertoadmin,
		servicios.abiertocliente
		FROM
		categorias
		JOIN servicios
		ON categorias.idcategorias = servicios.idcategoriaservicio WHERE categorias.avanzado=1
		ORDER BY
		servicios.orden ASC";

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

	public function ObtenerServicio($value='')
	{
		
		$sql="SELECT *FROM servicios WHERE idservicio='$this->idservicio'";

		
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

	public function ObtenerServiciosAdicionales($value='')
	{
		$sql="SELECT servicios.idservicio,servicios.titulo,servicios.descripcion,servicios.imagen FROM servicios  INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio
			 WHERE servicios.estatus=1 AND categorias.avanzado=0 ORDER BY servicios.orden asc";
		
		

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

	public function ObtenerHorariosAgrupadoServicio()
	{
		$sql="SELECT *FROM horariosservicio INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona WHERE idservicio='$this->idservicio' GROUP BY dia,horainicial,horafinal ORDER BY dia asc
		 ";

		
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


	public function ObtenerParticipantes($idtipo)
	{
		$sql="SELECT *FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios WHERE idservicio='$this->idservicio' AND tipo='$idtipo' AND cancelacion=0 ";
		
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

	public function ObtenerPeriodosPagos()
	{
		$sql="SELECT *FROM periodoservicio  WHERE idservicio='$this->idservicio'";

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



	public function ObtenerHorariosSemana()
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color  FROM horariosservicio INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona WHERE idservicio=".$this->idservicio."";

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


	public function ObtenerHorarios()
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color,zonas.nombre
		FROM horariosservicio
		INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona WHERE idservicio=".$this->idservicio." AND fecha='".$this->fecha."'";


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

	public function ObtenerTodasImagenesServicio()
	{
		$sql="SELECT *from imagenesgrupal WHERE idservicio=".$this->idservicio."";


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


	public function ObtenerTodosHorariosSemana()
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color  FROM horariosservicio INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona ";

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


	public function ObtenerHorariosAdmin()
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color,zonas.nombre,servicios.titulo,horariosservicio.idservicio
		FROM horariosservicio
		INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona
		INNER JOIN servicios ON servicios.idservicio=horariosservicio.idservicio
		 WHERE  fecha='".$this->fecha."'";


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

	public function ObtenerServiciosActivos($serviciosasignados)
	{
		$fechaactual=date('Y-m-d');
		$sql="SELECT 
			servicios.idservicio,
			servicios.titulo,
			servicios.descripcion,
			servicios.estatus,
			servicios.idcategoriaservicio,
			servicios.imagen,
			servicios.fechacreacion,
			servicios.orden,
			servicios.fechainicial,
			servicios.fechafinal,
			servicios.nodedias,
			servicios.idcategoria,
			servicios.precio,
			servicios.totalclases,
			categorias.idcategorias,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria,
			servicios.numeroparticipantesmax
		FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE 
			categorias.avanzado=1 AND servicios.estatus=1 AND servicios.abiertocliente=1";

			if($serviciosasignados!=''){

			$sql.=" AND  servicios.idservicio NOT IN(".$serviciosasignados.") ";
			
			}


			$sql.=" ORDER BY servicios.orden asc";
			
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


	public function ObtenerServiciosActivosCoach($serviciosasignados)
	{
		$fechaactual=date('Y-m-d');
		$sql="SELECT 
			servicios.idservicio,
			servicios.titulo,
			servicios.descripcion,
			servicios.estatus,
			servicios.idcategoriaservicio,
			servicios.imagen,
			servicios.fechacreacion,
			servicios.orden,
			servicios.fechainicial,
			servicios.fechafinal,
			servicios.nodedias,
			servicios.idcategoria,
			servicios.precio,
			servicios.totalclases,
			categorias.idcategorias,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria,
			servicios.numeroparticipantesmax
		FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE 
			categorias.avanzado=1 AND servicios.estatus=1 AND servicios.abiertocoach=1";

			if($serviciosasignados!=''){

			$sql.=" AND  servicios.idservicio NOT IN(".$serviciosasignados.") ";
			
			}


			$sql.=" ORDER BY servicios.orden asc";
			
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