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
		$query="INSERT INTO membresia (titulo,estatus,orden,descripcion,costo,cantidaddias,tiempodepago,porcategoria,porservicio,color,depende,idmembresiadepende,inppadre,inphijo,inpnieto,limite) VALUES ('$this->titulo','$this->estatus','$this->orden','$this->descripcion','$this->costo','$this->duracion','$this->limite','$this->porcategoria','$this->porservicio','$this->color','$this->depende','$this->membresiadepende','$this->inppadre','$this->inphijo','$this->inpnieto','$this->v_limitemembresia')";
		
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
			 limite='$this->v_limitemembresia'
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


}

 ?>