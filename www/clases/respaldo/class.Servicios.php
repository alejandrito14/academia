<?php
class Servicios
{
	public $db;
	public $idservicio;
	public $titulo;
	public $descripcion;
	public $estatus;
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
	public $fecha;

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
	public $v_politicasaceptacionid;

	public $horainicial;
	public $horafinal;

	public function ObtenerServicios()
	{
		$sql="SELECT servicios.*,categorias.titulo as nombrecategoria,categorias.avanzado FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio ORDER BY orden asc";

	/*	$sql="SELECT * FROM servicios  ORDER BY orden asc";*/

		$resp=$this->db->consulta($sql);
		return $resp;
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

	public function buscarservicio()
	{
		$sql="SELECT *FROM servicios WHERE idservicio='$this->idservicio'";
		
		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);
		return $resp;
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
		tiporeembolso,
		validaradmin,
		idpoliticaaceptacion

		) VALUES ('$this->titulo','$this->descripcion','$this->idcategoriaservicio','$this->estatus','$this->orden','$this->totalclase','$this->modalidad','$this->montopagarparticipante','$this->montopagargrupo','$this->costo','$this->idcategoria','$this->fechainicial','$this->fechafinal','$this->modalidadpago','$this->periodo','$this->lunes','$this->martes','$this->miercoles','$this->jueves','$this->viernes','$this->sabado','$this->domingo','$this->numparticipantes','$this->numparticipantesmax','$this->abiertocliente','$this->abiertocoach','$this->abiertoadmin','$this->ligarclientes','$this->tiempoaviso','$this->tituloaviso','$this->descripcionaviso','$this->politicascancelacion','$this->reembolso','$this->cantidadreembolso','$this->asignadocliente','$this->asignadocoach','$this->asignadoadmin','$this->numligarclientes','$this->politicasaceptacion','$this->controlasistencia','$this->tiporeembolso','$this->validaradmin','$this->v_politicasaceptacionid')";
		
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
		tiporeembolso='$this->tiporeembolso',
		validaradmin='$this->validaradmin',
		idpoliticaaceptacion='$this->v_politicasaceptacionid'
		WHERE idservicio=$this->idservicio";

		
		$resp=$this->db->consulta($query);
	}



	public function VerificarRelacionservicio()
	{
		$sql="SELECT *FROM usuarios_servicios WHERE idservicio='$this->idservicio'";

		
		$resp = $this->db->consulta($sql);
		return $resp;
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

	public function ObtenerParticipantes($idtipo)
	{
		$sql="SELECT *FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios WHERE idservicio='$this->idservicio' AND tipo='$idtipo' AND cancelacion=0";

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


	public function ObtenerTodosServicios()
	{
		$sql="SELECT servicios.idservicio,servicios.titulo,categorias.titulo as categoria FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE servicios.estatus=1";

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


	public function VerificarSiTienePagoIngresado($value='')
	{
		$sql="SELECT *FROM pagos WHERE idusuarios='$this->idusuarios' AND idservicio='$this->idservicio'";

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

	
	
		public function ObtenerServicioActivos()
	{
		
		$sql="SELECT 
			servicios.titulo,
			servicios.idservicio,
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
			servicios.montopagarparticipante,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria
			FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE servicios.estatus=1 AND categorias.avanzado=1";

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

	public function ObtenerCuantosAsignados($idservicio)
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN usuarios ON usuarios_servicios.idusuarios=usuarios.idusuarios WHERE idservicio=".$idservicio."  AND tipo=3  AND cancelacion=0";

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
		
		return $contador;
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

	public function ObtenerPeriodosPagos()
	{
		$sql="SELECT *FROM periodoservicio WHERE idservicio='$this->idservicio'";

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

	public function ObtenerUltimoOrdenservicio()
	{
		$query="SELECT MAX(orden) as ordenar FROM servicios";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function Guardardescuentos()
	{
		$query = "INSERT INTO servicios_descuento (idservicio,iddescuento) VALUES ('$this->idservicio','$this->iddescuento')";
		$this->db->consulta($query);

	}

	public function Eliminardescuentos()
	{
		$sql="DELETE FROM servicios_descuento WHERE idservicio='$this->idservicio'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
		
	}

	public function Eliminardemembresias()
	{
		$sql="DELETE FROM servicios_membresia WHERE idservicio='$this->idservicio'";
		
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

	public function ObtenerServicioActivosMenos($listaservicios)
	{
		
		$sql="SELECT 
			servicios.titulo,
			servicios.idservicio,
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
			servicios.montopagarparticipante,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria
			FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE servicios.estatus=1 AND categorias.avanzado=1 ";

		if ($listaservicios!='') {
			$sql.=" AND idservicio NOT IN($listaservicios) ";
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

	public function ObtenerServiciosAvanzados()
	{
		$sql="SELECT servicios.*,categorias.titulo as nombrecategoria FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE avanzado=1 ORDER BY orden asc";

	/*	$sql="SELECT * FROM servicios  ORDER BY orden asc";*/

		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function ObtenerServiciosFiltrado($tiposervicio,$coach)
	{
		$sql="SELECT servicios.idservicio,servicios.titulo,servicios.imagen,categorias.titulo as nombrecategoria,categorias.idcategorias,servicios.orden,servicios.estatus FROM servicios ";
		$filtro="";
		if ($tiposervicio>=0) {
		$sql.=" INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio ";
			if ($tiposervicio>0) {
		$filtro.="AND categorias.idcategorias='$tiposervicio'";
			}
		}

		if ($coach>0 && $coach!='t') {
		$sql.=" INNER JOIN usuarios_servicios ON usuarios_servicios.idservicio = servicios.idservicio
		INNER JOIN usuarios ON usuarios.idusuarios=usuarios_servicios.idusuarios ";

		if ($tiposervicio>0 && $coach>-1 && $coach!='t') {
		$filtro.=" AND usuarios.tipo='5'";

			}
			if ($coach>0) {
			$filtro.=" AND usuarios.idusuarios='$coach'";

			}
		}


		if ($filtro!='') {
			$sql.="WHERE 1=1 ";
		}
		$sql.=$filtro;

		$sql.=" GROUP BY idservicio";
		
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

	public function ObtenerSiHayPago()
	{
		$sql="SELECT *FROM pagos WHERE idservicio='$this->idservicio'";

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

		public function ObtenerserviciosConsulta()
	{
		$sql="SELECT  
			servicios.titulo,
			servicios.idservicio,
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
			servicios.montopagarparticipante,
			categorias.titulo AS titulocategoria,
			categorias.descripcion AS descripcioncategoria
		FROM servicios INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio WHERE servicios.estatus=1 AND categorias.avanzado=1";
		
		$resp=$this->db->consulta($sql);
		return $resp;
	}
	

	public function ExisteHorario()
	{
		$sql="SELECT idhorarioservicio,dia,horainicial,
		horafinal,fecha,zonas.idzona,zonas.color,zonas.nombre  FROM horariosservicio INNER JOIN zonas ON zonas.idzona=horariosservicio.idzona WHERE idservicio=".$this->idservicio." AND horainicial='$this->horainicial' AND horafinal='$this->horafinal' AND fecha='$this->fecha'";
		
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