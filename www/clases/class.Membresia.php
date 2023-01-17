<?php 
/**
 * 
 */
class Membresia
{
	public $db;
	
	public $valor;
	public $idmembresia;
	public $titulo;
	public $descripcion;
	public $orden;
	public $estatus;
	public $imagen;
	public $costo;
	public $duracion;
	public $limite;
	public $porcategoria;
	public $porservicio;
	public $color;
	public $depende;
	public $membresiadepende;
	public $inppadre;
	public $inphijo;
	public $inpnieto;
	public $v_limitemembresia;
	//asignar
	public $idservicio;
	public $tipodescuento;
	public $inputcantidad;
	public $idcategoria;
	public $idnotapago;
	public $fecha;
	public $repetir;
	
	public $idusuarios;
	public $idmembresias;


	public function ObtenerTodosmembresia()
	{
		$query = "SELECT *
			FROM 
			membresia";
			
		$result = $this->db->consulta($query);
		return $result;
	}


	public function ObtenerTodosActivomembresia()
	{
		$query = "SELECT *
			FROM 
			membresia WHERE estatus=1";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	public function buscarmembresia()
	{
		$query = "SELECT *
			FROM 
			membresia WHERE idmembresia=".$this->idmembresia."";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	
	
	public function ObtenerUltimoOrdenmembresia()
	{
		$query="SELECT MAX(orden) as ordenar FROM membresia";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function guardarmembresia($value='')
	{
		$query="INSERT INTO membresia (titulo,estatus,orden,descripcion,costo,cantidaddias,tiempodepago,porcategoria,porservicio,color,depende,idmembresiadepende,inppadre,inphijo,inpnieto,limite,fecha,repetir) VALUES ('$this->titulo','$this->estatus','$this->orden','$this->descripcion','$this->costo','$this->duracion','$this->limite','$this->porcategoria','$this->porservicio','$this->color','$this->depende','$this->membresiadepende','$this->inppadre','$this->inphijo','$this->inpnieto','$this->v_limitemembresia','$this->fecha','$this->repetir')";
		
		$resp=$this->db->consulta($query);
		$this->idmembresia = $this->db->id_ultimo();
		
	}

	public function modificarmembresia()
	{
			$query="UPDATE membresia
			 SET titulo='$this->titulo',
		     estatus='$this->estatus',
		     orden='$this->orden',
		     descripcion='$this->descripcion',
		     costo='$this->costo',
		     cantidaddias='$this->duracion',
		     tiempodepago='$this->limite',
		     porcategoria='$this->porcategoria',
		     porservicio='$this->porservicio',
		     color='$this->color',
		     depende='$this->depende',
			 idmembresiadepende='$this->membresiadepende',
			 inppadre='$this->inppadre',
			 inphijo='$this->inphijo',
			 inpnieto='$this->inpnieto',
			 limite='$this->v_limitemembresia',
			 repetir='$this->repetir',
			 fecha='$this->fecha'
		   	 WHERE idmembresia=$this->idmembresia";

		$resp=$this->db->consulta($query);
	}


	public function AsignarServicioMembresia()
	{
		$query="INSERT INTO servicios_membresia (idservicio,idmembresia,descuento,monto) VALUES ('$this->idservicio','$this->idmembresia','$this->tipodescuento','$this->inputcantidad')";
		
		$resp=$this->db->consulta($query);
	
		
	}

	public function AsignarCategoriaMembresia()
	{
		$query="INSERT INTO categorias_membresia (idcategorias,idmembresia,descuento,monto) VALUES ('$this->idcategorias','$this->idmembresia','$this->tipodescuento','$this->inputcantidad')";
		$resp=$this->db->consulta($query);
	}

	public function EliminarAsignacion()
	{
		$query="DELETE FROM servicios_membresia 
		WHERE idmembresia='$this->idmembresia'";
		
		$resp=$this->db->consulta($query);
	}

	public function EliminarAsignacionTipo()
	{
		$query="DELETE FROM categorias_membresia 
		WHERE idmembresia='$this->idmembresia'";
		
		$resp=$this->db->consulta($query);
	}

	public function ObtenerServiciosMembresia()
	{
		
		$sql="SELECT *FROM servicios_membresia WHERE idmembresia='$this->idmembresia'";

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


	public function Borrarmembresia()
	{
		$query="DELETE FROM membresia 
		WHERE idmembresia='$this->idmembresia'";
		
		$resp=$this->db->consulta($query);
	}

	public function VerificarRelacionmembresia()
	{
		$sql="SELECT *FROM servicios_membresia WHERE idmembresia='$this->idmembresia'";

		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function ObtenermembresiaActivosMenos($listamembresia)
	{
		

		$sql="SELECT *FROM membresia WHERE estatus=1 ";

		if ($listamembresia!='') {
			$sql.=" AND idmembresia NOT IN($listamembresia) ";
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

	public function ObtenerMembresiaServicios()
	{
		
		$sql="SELECT *FROM servicios_membresia WHERE idservicio='$this->idservicio'";
		
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


	public function ObtenerTipoServiciosMembresia()
	{
		
		$sql="SELECT *FROM categorias_membresia WHERE idmembresia='$this->idmembresia'";

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
	
	
		public function ObtenerMembresiasActivas()
	{
		$sql="SELECT *FROM membresia WHERE estatus=1";
		
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



	public function ObtenerMembresiaUsuario()
	{
		$sql="SELECT *
		FROM usuarios_membresia WHERE idusuarios='$this->idusuarios' and estatus=1 and pagado=1";
		
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


	public function ObtenerCategoriasMembresia()
	{
		$sql="SELECT *FROM categorias_membresia WHERE idmembresia='$this->idmembresia'";
		
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

	
	public function ObtenerMembresia()
	{
		$sql="SELECT *
		FROM membresia WHERE idmembresia='$this->idmembresia'";

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

	
	public function ActualizarConsecutivo()
	{

		 $sql="SELECT *FROM pagina_configuracion";
		 $resp = $this->db->consulta($sql);
		 $datos=$this->db->fetch_assoc($resp);


		 $val=$datos['contadorfolio'];
		 $valor=$val+1;

		$sql="UPDATE pagina_configuracion SET contadorfolio='$valor'";


		 $resp = $this->db->consulta($sql);
		return $val;
		
	}

	
	public function GuardarPagoDescuentoMembresia()
	{
		$sql="INSERT INTO pagodescuentomembresia
		(idpago, idmembresia, idservicio, descuento, monto,montoadescontar,idnotapago) VALUES ('$this->idpago', '$this->idmembresia','$this->idservicio', '$this->descuento', '$this->monto','$this->montoadescontar','$this->idnotapago')";
		$resp=$this->db->consulta($sql);

	}



	public function buscarMembresiaUsuario()
	{
		$sql="SELECT *
		FROM usuarios_membresia WHERE idmembresia='$this->idmembresia' AND idusuarios='$this->idusuarios' AND estatus IN (0,1) AND fechaexpiracion IS NULL";
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


	public function ActualizarEstatusMembresiaUsuario()
	{
		$query="UPDATE membresia SET estatus='$this->estatus'
		WHERE idusuarios_membresia='$this->idusuarios_membresia'";
		
		$resp=$this->db->consulta($query);
	}

	public function CrearRegistroMembresiaUsuario()
	{
		$query="INSERT INTO usuarios_membresia ( idusuarios,idmembresia, estatus,renovacion, fechaexpiracion,pagado) VALUES ('$this->idusuarios','$this->idmembresia', '$this->estatus',$this->renovacion,'$this->fechaexpiracion','$this->pagado')";
		
		$resp=$this->db->consulta($query);
		$this->idusuarios_membresia=$this->db->id_ultimo();
	}

/*	public function ObtenerMembresiaUsuario()
	{
		$sql="SELECT *
		FROM usuarios_membresia WHERE idusuarios='$this->idusuarios' and estatus=1 and pagado=1";
		
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
*/
	
	public function ActualizarEstatusMembresiaUsuarioPagado()
	{
		$query="UPDATE usuarios_membresia 
		SET pagado='$this->pagado',
		renovacion='$this->renovacion',
		estatus='$this->estatus',
		fechaexpiracion='$this->fechaexpiracion'
		WHERE idusuarios_membresia='$this->idusuarios_membresia'";
		$resp=$this->db->consulta($query);
	}

	public function ObtenerMembresiasVencidas()
	{
		$sql="SELECT *
		FROM usuarios_membresia WHERE idusuarios='$this->idusuarios' and estatus=2 and pagado=1 and idmembresia='$this->idmembresia'";
		
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

	 public function VerificarSiesTutorado()
    {
        $sql="SELECT * FROM usuariossecundarios
        WHERE usuariossecundarios.idusuariotutorado='$this->idusuarios' ";

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



	public function buscarSiTutorTieneMembresia($idtutor)
	{
		$fechaactual=date('Y-m-d H:i:s');
	$sql="SELECT *FROM usuarios_membresia WHERE idusuarios='$idtutor' AND estatus=1 AND  date_format(date(fechaexpiracion),'%Y-%m-%d H:i:s') >= '$fechaactual' AND pagado=1";
		
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


	public function ObtenerMembresiasDependen($idmembresiapadre,$inphijo,$inpnieto){
		$sql="SELECT *
		FROM membresia WHERE depende=1 AND estatus=1";
		if ($inphijo!='') {
			$sql.= " AND inphijo='$inphijo'";

		}

		if ($inpnieto!='') {
			$sql.=" AND inpnieto='$inpnieto'";
			}

		if ($idmembresiapadre!='') {
			$sql.=" AND idmembresiadepende='$idmembresiapadre'";
		}

		if ($this->idmembresias!='') {
			$sql.=" AND idmembresia 
			 NOT IN('$this->idmembresias')";
		}

		$sql.=" ORDER BY orden";
		

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


	public function ObtenerSiTutoradosMembresia($idtutor)
	{
		$sql="SELECT *FROM usuariossecundarios
		INNER JOIN usuarios_membresia ON usuarios_membresia.idusuarios=usuariossecundarios.idusuariotutorado
		WHERE usuariossecundarios.idusuariostutor='$idtutor' AND usuarios_membresia.idmembresia='$this->idmembresia' 
		";

		if ($this->idmembresias!='') {
			$sql.=" AND idmembresia 
			 NOT IN('$this->idmembresias')";
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

	public function ObtenerMembresiasDisponibles($idmembresias)
	{
		$sql="SELECT *
		FROM membresia WHERE (inppadre=1 OR depende=0 AND estatus=1)";

		if ($idmembresias!='') {
			$sql.=" AND idmembresia 
			 NOT IN('$idmembresias')";
		}

		
		$sql.=" ORDER BY orden";

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



	public function buscarMembresiaAsociadaUsuario()
	{
		$sql="SELECT 
			usuarios_membresia.idusuarios,
			usuarios_membresia.idmembresia,
			membresia.titulo,
			membresia.imagen,
			usuarios_membresia.fecha,
			usuarios_membresia.estatus,
			usuarios_membresia.renovacion,
			usuarios_membresia.fechaexpiracion,
			usuarios_membresia.pagado,
			usuarios_membresia.idusuarios_membresia,
			membresia.color
		FROM usuarios_membresia
		INNER JOIN membresia ON membresia.idmembresia=usuarios_membresia.idmembresia
		 WHERE idusuarios='$this->idusuarios' AND usuarios_membresia.estatus IN (0,1)  ORDER BY idusuarios_membresia desc limit 1 
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


}

 ?>