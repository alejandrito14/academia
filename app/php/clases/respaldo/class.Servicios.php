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


	public $idcategoria;
	public $orden;
	public $idzona;
	public $idcoachs;
	public $idparticipantes;
	public $precio;
	public $dia;
	public $horainiciosemana;
	public $horafinsemana;


	public $totalclase;
	public $modalidad;
	public $montopagarparticipante;
	public $montopagargrupo;
	public $costo;
	public $idcategoriaservicio;

	public $fechainicial;
	public $fechafinal;

	public $modalidadpago;
	public $periodo;

	public $idusuarios;

	public $periodoinicial;
	public $periodofinal;
	public $lunes;
	public $martes;
	public $miercoles;
	public $jueves;
	public $viernes;
	public $sabado;
	public $domingo;
	public $numparticipantes;
	public $numparticipantesmax;

	public $abiertocliente;
	public $abiertocoach;
	public $abiertoadmin;
	public $ligarclientes;
	public $numligarclientes;
	public $tiempoaviso;
	public $tituloaviso;
	public $descripcionaviso;
	public $politicascancelacion;
	public $reembolso;
	public $cantidadreembolso;
	public $tiporeembolso;
	public $asignadocliente;
	public $asignadocoach;
	public $asignadoadmin;
	public $politicasaceptacion;
	public $controlasistencia;
	public $iddescuento;
	public $idmembresia;
	public $idencuesta;
	public $idusuarios_servicios;
	public $validaradmin;
	public $v_politicaaceptacionseleccion;


	public $motivocancelacion;
	public $fechacancelacion;
	public $usuariocancela;
	

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
		servicios.abiertocliente,
		categorias.idcategorias
		FROM
		categorias
		JOIN servicios
		ON categorias.idcategorias = servicios.idcategoriaservicio WHERE categorias.avanzado=1 and servicios.validaradmin=1 and servicios.estatus=1
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
		$sql="SELECT *FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios WHERE idservicio='$this->idservicio' AND usuarios.tipo='$idtipo' AND usuarios_servicios.cancelacion=0 ";
		
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
		horafinal,fecha,zonas.idzona,zonas.color,zonas.nombre  FROM horariosservicio INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona WHERE idservicio=".$this->idservicio."";

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



	public function GuardarServicio()
	{
		$query="INSERT INTO servicios 
		(titulo,descripcion,idcategoriaservicio,estatus,
		orden,
		totalclases,
		modalidad,
		montopagarparticipante,
		montopagargrupo,
		precio,idcategoria,
		fechainicial,
		fechafinal,
		modalidaddepago,
		periodo,
		lunes,
		martes,
		miercoles,
		jueves,
		viernes,
		sabado,
		domingo,
		numeroparticipantes,
		numeroparticipantesmax,
		abiertocliente,
		abiertocoach,
		abiertoadmin,
		ligarcliente,
		tiempoaviso,
		tituloaviso,
		descripcionaviso,
		politicascancelacion,
		reembolso,
		cantidadreembolso,
		asignadocliente,
		asignadocoach,
		asignadoadmin,
		numligarclientes,
		politicasaceptacion,
		controlasistencia,
		agregousuario,
		validaradmin,
		tiporeembolso,
		idpoliticaaceptacion


		) VALUES ('$this->titulo','$this->descripcion','$this->idcategoriaservicio','$this->estatus','$this->orden','$this->totalclase','$this->modalidad','$this->montopagarparticipante','$this->montopagargrupo','$this->costo','$this->idcategoria','$this->fechainicial','$this->fechafinal','$this->modalidadpago','$this->periodo','$this->lunes','$this->martes','$this->miercoles','$this->jueves','$this->viernes','$this->sabado','$this->domingo','$this->numparticipantes','$this->numparticipantesmax','$this->abiertocliente','$this->abiertocoach','$this->abiertoadmin','$this->ligarclientes','$this->tiempoaviso','$this->tituloaviso','$this->descripcionaviso','$this->politicascancelacion','$this->reembolso','$this->cantidadreembolso','$this->asignadocliente','$this->asignadocoach','$this->asignadoadmin','$this->numligarclientes','$this->politicasaceptacion','$this->controlasistencia','$this->idusuarios','$this->validaradmin','$this->tiporeembolso','$this->v_politicaaceptacionseleccion')";
			
		$resp=$this->db->consulta($query);
		$this->idservicio = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function ModificarServicio()
	{
		$query="UPDATE servicios 
		SET titulo='$this->titulo',
		descripcion='$this->descripcion',
		idcategoriaservicio='$this->idcategoriaservicio',
		estatus='$this->estatus',
		orden='$this->orden',
		totalclases='$this->totalclase',
		modalidad='$this->modalidad',
		montopagarparticipante='$this->montopagarparticipante',
		montopagargrupo='$this->montopagargrupo',
		precio='$this->costo',
		idcategoria='$this->idcategoria',
		fechainicial='$this->fechainicial',
		fechafinal='$this->fechafinal',
		modalidaddepago='$this->modalidadpago',
		periodo='$this->periodo',
		lunes='$this->lunes',
		martes='$this->martes',
		miercoles='$this->miercoles',
		jueves='$this->jueves',
		viernes='$this->viernes',
		sabado='$this->sabado',
		domingo='$this->domingo',
		numeroparticipantes='$this->numparticipantes',
		numeroparticipantesmax='$this->numparticipantesmax',
		abiertocliente='$this->abiertocliente',
		abiertocoach='$this->abiertocoach',
		abiertoadmin='$this->abiertoadmin',
		ligarcliente='$this->ligarclientes',
		numligarclientes='$this->numligarclientes',
		tiempoaviso='$this->tiempoaviso',
		tituloaviso='$this->tituloaviso',
		descripcionaviso='$this->descripcionaviso',
		politicascancelacion='$this->politicascancelacion',
		reembolso='$this->reembolso',
		cantidadreembolso='$this->cantidadreembolso',
		asignadocliente='$this->asignadocliente',
		asignadocoach='$this->asignadocoach',
		asignadoadmin='$this->asignadoadmin',
		politicasaceptacion='$this->politicasaceptacion',
		controlasistencia='$this->controlasistencia',
		validaradmin='$this->validaradmin',
		tiporeembolso='$this->tiporeembolso',
		idpoliticaaceptacion='$this->v_politicaaceptacionseleccion'
		WHERE idservicio=$this->idservicio";

		
		$resp=$this->db->consulta($query);
	}


	//funcion para modificar los usuarios
	public function ModificarServicioReagendado()
	{
		$query="UPDATE servicios 
		SET
		fechainicial='$this->fechainicial',
		fechafinal='$this->fechafinal',
		lunes='$this->lunes',
		martes='$this->martes',
		miercoles='$this->miercoles',
		jueves='$this->jueves',
		viernes='$this->viernes',
		sabado='$this->sabado',
		domingo='$this->domingo'
		WHERE idservicio=$this->idservicio";

		
		$resp=$this->db->consulta($query);
	}

	public function Borrarservicio()
	{
		$sql="DELETE FROM servicios WHERE idservicio='$this->idservicio'";

		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function BorrarHorarios()
	{
	$sql="DELETE FROM horariosservicio WHERE idservicio='$this->idservicio'";

		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function BorrarEncuesta()
	{
		$sql="DELETE FROM servicios_encuesta WHERE idservicio='$this->idservicio'";

		
		$resp = $this->db->consulta($sql);
		return $resp;

	}

	public function BorrarZonas()
	{
		$sql="DELETE FROM servicios_zonas WHERE idservicio='$this->idservicio'";

		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function BorrarCoaches()
	{
		$sql1="SELECT usuarios_servicios.idusuarios,usuarios.nombre,usuarios.usuario FROM usuarios INNER JOIN usuarios_servicios on usuarios.idusuarios=usuarios_servicios.idusuarios WHERE tipo=5 AND  idservicio='$this->idservicio'";
	
		$resp = $this->db->consulta($sql1);

		$cont = $this->db->num_rows($resp);

		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}

		
		if ($cont>0) {
			
			for ($i=0; $i <count($array) ; $i++) { 

				$idusuario=$array[$i]->idusuarios;
			$sql="DELETE FROM usuarios_servicios WHERE idservicio='$this->idservicio' AND idusuarios='$idusuario'";
		
			$resp = $this->db->consulta($sql);
			}
		

		}
		//return $resp;
	}

	public function GuardarZona(){
			$query="INSERT INTO servicios_zonas 
		(idservicio,idzona) VALUES ('$this->idservicio','$this->idzona')";
		
		$resp=$this->db->consulta($query);
	}
	public function GuardarCoach(){
		$query="INSERT INTO usuarios_servicios 
		(idservicio,idzona) VALUES ('$this->idservicio','$this->idcoachs')";
		
		$resp=$this->db->consulta($query);
	}
	public function Guardarparticipantes(){
		$query="INSERT INTO usuarios_servicios 
		(idservicio,idusuarios) VALUES ('$this->idservicio','$this->idparticipantes')";
		
		$resp=$this->db->consulta($query);
		$this->idusuarios_servicios=$this->db->id_ultimo();

	}

	public function GuardarMontotipo($tipo,$monto)
	{
		$query="INSERT INTO usuarioscoachs 
		(idusuarios_servicios,tipopago,monto) VALUES ('$this->idusuarios_servicios','$tipo','$monto')";
		
		$resp=$this->db->consulta($query);
	}

	public function GuardarHorarioSemana()
	{
		$query = "INSERT INTO horariosservicio (idservicio,dia,horainicial,horafinal,fecha,idzona) VALUES ('$this->idservicio','$this->dia','$this->horainiciosemana','$this->horafinsemana','$this->fecha','$this->idzona');";

			
		$this->db->consulta($query);

	}

	public function EliminarHorarioSemana()
	{
		$sql="DELETE FROM horariosservicio WHERE idservicio='$this->idservicio'";
		$resp = $this->db->consulta($sql);
		return $resp;
	}
	public function EliminarZonas()
	{
		$sql="DELETE FROM servicios_zonas WHERE idservicio='$this->idservicio'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function EliminarParticipantes()
	{
		$sql1="SELECT usuarios_servicios.idusuarios,usuarios.nombre,usuarios.usuario FROM usuarios INNER JOIN usuarios_servicios on usuarios.idusuarios=usuarios_servicios.idusuarios WHERE tipo=3 AND  idservicio='$this->idservicio'";
	
		$resp = $this->db->consulta($sql1);

		$cont = $this->db->num_rows($resp);

		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}

		
		if ($cont>0) {
			
			for ($i=0; $i <count($array) ; $i++) { 

				$idusuario=$array[$i]->idusuarios;
			$sql="DELETE FROM usuarios_servicios WHERE idservicio='$this->idservicio' AND idusuarios='$idusuario'";
		
			$resp = $this->db->consulta($sql);
			}
		

		}
		//return $resp;
	
	}


	public function ObtenerZonas()
	{
		$sql="SELECT *FROM zonas INNER JOIN servicios_zonas ON zonas.idzona=servicios_zonas.idzona WHERE idservicio='$this->idservicio'";

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


	public function EliminarCoachs()
	{
		$sql1="SELECT usuarios_servicios.idusuarios,usuarios.nombre,usuarios.usuario FROM usuarios INNER JOIN usuarios_servicios on usuarios.idusuarios=usuarios_servicios.idusuarios WHERE tipo=5 AND  idservicio='$this->idservicio'";
	
		$resp = $this->db->consulta($sql1);

		$cont = $this->db->num_rows($resp);

		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}

		
		if ($cont>0) {
			
			for ($i=0; $i <count($array) ; $i++) { 

				$idusuario=$array[$i]->idusuarios;
			$sql="DELETE FROM usuarios_servicios WHERE idservicio='$this->idservicio' AND idusuarios='$idusuario'";
		
			$resp = $this->db->consulta($sql);
			}
		

		}
		//return $resp;
	
	}


	public function GuardarPeriodo()
	{
		$query = "INSERT INTO periodoservicio (fechainicial,fechafinal,idservicio) VALUES ('$this->periodoinicial','$this->periodofinal','$this->idservicio');";

			
		$this->db->consulta($query);

	}



	public function EliminarPeriodos()
	{
		$sql="DELETE FROM periodoservicio WHERE idservicio='$this->idservicio'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
		
	}


public function Eliminardeencuestas()
	{
		$sql="DELETE FROM servicios_encuesta WHERE idservicio='$this->idservicio'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function Guardarmembresias()
	{
		$query = "INSERT INTO servicios_membresia (idservicio,idmembresia) VALUES ('$this->idservicio','$this->idmembresia')";
		$this->db->consulta($query);

	}

	public function Guardarencuestas()
	{
		$query = "INSERT INTO servicios_encuesta (idservicio,idencuesta) VALUES ('$this->idservicio','$this->idencuesta')";
		$this->db->consulta($query);

	}

	public function ObtenerUltimoOrdenservicio()
	{
		$query="SELECT MAX(orden) as ordenar FROM servicios";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function FechadentrodePeriodos($fechaactual)
	{
		$sql="SELECT * FROM periodoservicio WHERE
		'$fechaactual'>=fechainicial AND '$fechaactual'<=fechafinal AND idservicio='$this->idservicio' ";
	
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


	public function ObtenerServiciosporvalidar($serviciosasignados)
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
			servicios.validaradmin,
			servicios.agregousuario,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria,
			servicios.validaradmin,
			servicios.numeroparticipantesmax
		FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE 
			categorias.avanzado IN(0,1) AND servicios.estatus IN(0,1) AND servicios.validaradmin=0";

			if($serviciosasignados!=''){

			$sql.=" AND  servicios.idservicio NOT IN(".$serviciosasignados.") ";
			
			}

			$sql.=" AND servicios.agregousuario='$this->idusuarios'";

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

	public function ObtenerServiciosporvalidarAdmin()
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
			servicios.validaradmin,
			servicios.agregousuario,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria,
			servicios.numeroparticipantesmax
		FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE 
			categorias.avanzado IN(0,1) AND servicios.estatus IN (0) ";

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

		
	public function ObtenerParticipantesCoach($idtipo)
	{
		$sql="SELECT *FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios
			LEFT JOIN usuarioscoachs ON usuarioscoachs.idusuarios_servicios=usuarios_servicios.idusuarios_servicios
		 WHERE idservicio='$this->idservicio' AND tipo='$idtipo' AND cancelacion=0";

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


	public function ObtenerTodosHorarios()
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color,zonas.nombre
		FROM horariosservicio
		INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona WHERE idservicio=".$this->idservicio." ORDER BY fecha asc ";


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


	public function ObtenerParticipantesPagado($idtipo)
	{
		$sql="SELECT 
			usuarios.idusuarios,
			usuarios.alias,
			usuarios.usuario,
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios_servicios.idusuarios_servicios,
			usuarios_servicios.idservicio,
			pagos.estatus,
			pagos.pagado,
			pagos.monto,
			pagos.tipodepago,
			pagos.folio,
			pagos.fechainicial,
			pagos.fechafinal
		FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios
		INNER JOIN pagos ON pagos.idservicio=usuarios_servicios.idservicio AND pagos.idusuarios=usuarios_servicios.idusuarios
			 WHERE usuarios_servicios.idservicio='$this->idservicio' AND usuarios.tipo='$idtipo' AND cancelacion=0 AND pagos.pagado=1 and pagos.estatus=2  ";
		
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

	public function EliminarHorarioServicio($idhorarioservicio)
	{
		$sql="DELETE FROM horariosservicio 
		WHERE idhorarioservicio='$idhorarioservicio'";

		$resp=$this->db->consulta($sql);

	}

	public function GuardarCancelacion()
	{
		$sql="UPDATE servicios SET
		cancelacion=1,
		motivocancelacion='$this->motivocancelacion',
		fechacancelacion='$this->fechacancelacion',
		usuariocancela='$this->usuariocancela',
		estatus=2
		WHERE idservicio='$this->idservicio'";
		
		$resp=$this->db->consulta($sql);

	}


}




?>