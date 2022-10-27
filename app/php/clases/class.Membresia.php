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


	//asignar
	public $idservicio;
	public $tipodescuento;
	public $inputcantidad;

	//usuarios
	public $idusuarios;
	public $idusuarios_membresia;
	public $renovacion;
	public $fechaexpiracion;
	public $pagado;

	//descuento membresia
	public $idpago;
	public $descuento;
	public $monto;
	public $montoadescontar;
	public $idnotapago;

	public function ObtenerTodosmembresia()
	{
		$query = "SELECT *
			FROM 
			membresia";
			
		$result = $this->db->consulta($query);
		return $result;
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
		$query="INSERT INTO membresia (titulo,estatus,orden,descripcion,costo,cantidaddias,tiempodepago) VALUES ('$this->titulo','$this->estatus','$this->orden','$this->descripcion','$this->costo','$this->duracion','$this->limite')";
		
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
		     tiempodepago='$this->limite'
		   	 WHERE idmembresia=$this->idmembresia";


		$resp=$this->db->consulta($query);
	}


	public function AsignarServicioMembresia()
	{
		$query="INSERT INTO servicios_membresia (idservicio,idmembresia,descuento,monto) VALUES ('$this->idservicio','$this->idmembresia','$this->tipodescuento','$this->inputcantidad')";
	
		$resp=$this->db->consulta($query);
	
		
	}

	public function EliminarAsignacion()
	{
		$query="DELETE FROM servicios_membresia 
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

	public function ObtenerUsuarioMembresias()
	{
		$sql="SELECT * FROM usuarios_membresia
			INNER JOIN membresia ON usuarios_membresia.idmembresia=membresia.idmembresia
		 WHERE idusuarios='$this->idusuarios'  AND usuarios_membresia.estatus=1 AND usuarios_membresia.pagado=1  ";
	
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
		FROM membresia WHERE inppadre=1 OR depende=0 AND estatus=1";

		if ($idmembresias!='') {
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
		echo $query;die();
		$resp=$this->db->consulta($query);
	}

	public function CrearRegistroMembresiaUsuario()
	{
		$query="INSERT INTO usuarios_membresia ( idusuarios,idmembresia, estatus,renovacion, fechaexpiracion,pagado) VALUES ('$this->idusuarios','$this->idmembresia', '$this->estatus',$this->renovacion,'$this->fechaexpiracion','$this->pagado')";
		
		$resp=$this->db->consulta($query);
		$this->idusuarios_membresia=$this->db->id_ultimo();
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

	public function GuardarPagoDescuentoMembresia()
	{
		$sql="INSERT INTO pagodescuentomembresia
		(idpago, idmembresia, idservicio, descuento, monto,montoadescontar,idnotapago) VALUES ( '$this->idpago', '$this->idmembresia','$this->idservicio', '$this->descuento', '$this->monto','$this->montoadescontar','$this->idnotapago')";
		$resp=$this->db->consulta($sql);

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

	public function ObtenerSiTutoradosMembresia($idtutor)
	{
		$sql="SELECT *FROM usuariossecundarios
		INNER JOIN usuarios_membresia ON usuarios_membresia.idusuarios=usuariossecundarios.idusuariotutorado
		WHERE usuariossecundarios.idusuariostutor='$idtutor' AND usuarios_membresia.idmembresia='$this->idmembresia' 
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

		public function ObtenerMembresiaUsuarioActiva()
	{
		$sql="SELECT *
		FROM usuarios_membresia WHERE idusuarios='$this->idusuarios' and estatus=1 and pagado=1 and idmembresia='$this->idmembresia'";
		
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

	public function ObtenerUsuariosMembresia($fechaactual)
	{
		$sql="SELECT *
		FROM usuarios_membresia WHERE  estatus=1 and fechaexpiracion<='$fechaactual'";
		
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

	public function ActualizarEstatusMembresia()
	{
		$query="UPDATE usuarios_membresia 
		SET
		estatus='$this->estatus'
		WHERE idusuarios_membresia='$this->idusuarios_membresia'";
		$resp=$this->db->consulta($query);
	}
}
?>