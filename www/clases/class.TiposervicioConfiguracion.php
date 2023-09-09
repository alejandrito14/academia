<?php

class TiposervicioConfiguracion

{

	public $db;//objeto de la clase de conexcion
	public $idtiposervicioconfiguracion;
	public $nombre;
	public $descripcion;
	public $estatus;
	public $imagen;
	public $fechacreacion;
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
	public $v_politicaaceptacionseleccion;
	public $aceptarserviciopago;
	public $nodedias;
	//Funcion para obtener todos los categoriasservicio activos
	public function ObttiposervicioConfiguracionActivos()
	{
		$sql = "SELECT * FROM tiposervicioconfiguracion WHERE estatus = 1";
	
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

	public function ObtenerTodoscategoriasservicio()
	{
		$query="SELECT * FROM tiposervicioconfiguracion";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenercategoriasservicio()
	{
		$query="SELECT * FROM categoriasservicio WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardartiposervicioconfiguracion()
	{
		$query="INSERT INTO tiposervicioconfiguracion( nombre, descripcion, estatus,imagen,orden, nodedias, precio, totalclases, modalidad, modalidaddepago, periodo, numeroparticipantes, numeroparticipantesmax, abiertocliente, abiertocoach, abiertoadmin, ligarcliente, cancelaciondescricion, reembolso, cantidadreembolso, asignadocliente, asignadocoach, asignadoadmin, tiempoaviso, tituloaviso, descripcionaviso,politicascancelacion, numligarclientes, politicasaceptacion, controlasistencia, tiporeembolso, idpoliticaaceptacion, aceptarserviciopago, diasperiodo) VALUES ('$this->nombre', '$this->descripcion','$this->estatus', '$this->imagen','$this->orden','$this->nodedias', '$this->costo', '$this->totalclase','$this->modalidad','$this->modalidadpago','$this->periodo','$this->numparticipantes', '$this->numparticipantesmax','$this->abiertocliente','$this->abiertocoach','$this->abiertoadmin','$this->ligarcliente','$this->cancelaciondescricion','$this->reembolso','$this->cantidadreembolso','$this->asignadocliente','$this->asignadocoach', '$this->asignadoadmin', '$this->tiempoaviso', '$this->tituloaviso', '$this->descripcionaviso', '$this->politicascancelacion','$this->numligarclientes','$this->politicasaceptacion','$this->controlasistencia','$this->tiporeembolso','$this->v_politicaaceptacionseleccion','$this->aceptarserviciopago', '$this->diasperiodo')";
		
		$resp=$this->db->consulta($query);
		$this->idtiposervicioconfiguracion = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificartiposervicioconfiguracion()
	{
		
		$query="
			UPDATE tiposervicioconfiguracion SET nombre = '$this->nombre', 
				descripcion = '$this->descripcion',
				 estatus = '$this->estatus', imagen = '', 
				  orden = 0, 
				  nodedias = '$this->nodedias', 
				  precio = '$this->costo', 
				  totalclases = '$this->totalclase', 
				  modalidad = '$this->modalidad', 
				  modalidaddepago = '$this->modalidadpago', 
				  periodo = 0, 
				  numeroparticipantes = '$this->numparticipantes', numeroparticipantesmax = '$this->numparticipantesmax', abiertocliente = '$this->abiertocliente', abiertocoach = '$this->abiertocoach', abiertoadmin = '$this->abiertoadmin', ligarcliente = '$this->ligarcliente', 
				    cancelaciondescricion = '', 
				    reembolso = '$this->reembolso',
				    cantidadreembolso = '$this->cantidadreembolso', 
				    asignadocliente = '$this->asignadocliente',asignadocoach = '$this->asignadocoach', 
				    asignadoadmin = '$this->asignadoadmin', 
				    tiempoaviso = '$this->tiempoaviso', tituloaviso = '$this->tituloaviso', descripcionaviso = '$this->descripcionaviso', 
				    politicascancelacion
				     = '', 
				     numligarclientes = '$this->numligarclientes', politicasaceptacion = '', 
				     controlasistencia = '$this->controlasistencia', 
				     tiporeembolso = '$this->tiporeembolso', 
				     idpoliticaaceptacion = '$this->v_politicaaceptacionseleccion', 
				     aceptarserviciopago = '$this->aceptarserviciopago',  
				     diasperiodo = '$this->diasperiodo'WHERE idtiposervicioconfiguracion ='$this->idtiposervicioconfiguracion'

		";
		
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscartiposervicioconfiguracion()
	{
		$query="SELECT * FROM tiposervicioconfiguracion WHERE idtiposervicioconfiguracion=".$this->idtiposervicioconfiguracion;
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	
	public function ObtenerClasificacion($idclasificacion)
	{
		$query="SELECT * FROM clasificacion WHERE idclasificacion ";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function EliminarEncuestas()
	{
		$query="DELETE  FROM tiposervicioconfiguracionencuesta WHERE idtiposervicioconfiguracion='$this->idtiposervicioconfiguracion'";
		
		$resp=$this->db->consulta($query);
		
	}

	public function GuardarencuestasTipo()
	{
		$query = "INSERT INTO tiposervicioconfiguracionencuesta (idtiposervicioconfiguracion,idencuesta) VALUES ('$this->idtiposervicioconfiguracion','$this->idencuesta')";
		$this->db->consulta($query);

	}

	public function ObtenerEncuestasConfiguracion($value='')
	{
		$sql = "SELECT * FROM tiposervicioconfiguracionencuesta WHERE idtiposervicioconfiguracion = '$this->idtiposervicioconfiguracion'";
	
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
	

	public function ObttiposervicioConfiguracionDatos()
	{
		$sql = "SELECT * FROM tiposervicioconfiguracion WHERE idtiposervicioconfiguracion ='$this->idtiposervicioconfiguracion'";
		
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

	public function ObtenerTipoServicionConfiguracion()
	{
		$query="SELECT * FROM tiposervicioconfiguracion";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	

}

?>