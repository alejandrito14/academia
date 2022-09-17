<?php 

class Descuentos 
{
	
	public $db;
	public $titulo;
	public $tipo;
	public $monto;
	public $convigencia;
	public $periodoinicial;
	public $periodofinal;
	public $iddescuento;

	public $idservicio;
	public $idusuario;


	public $montopago;
	public $montoadescontar;
	public $idpago;

	public $txtnumeroservicio;
	public $portiposervicio;
	public $porservicio;
	public $porniveljerarquico;
	public $inppadre;
	public $inphijo;
	public $inpnieto;
	public $modalidaddescuento;
	public $txtdiascaducidad;
	public $porclientenoasociado;
	public $v_acumulardescuento;
	public $porclientedirecto;
	public $todosclientes;
	public $clientesdirectos;
	//public $modalidaddescuento;
	/*public $txtdiascaducidad;
	public $porclientenoasociado;*/

	public function ObtenerTodosdescuentos()
	{
		$sql = "SELECT * FROM descuento";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	/*public function ObtenerDescuentos()
	{
		$sql = "SELECT * FROM descuento WHERE estatus=1";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}*/

	public function buscardescuento()
	{
		$sql = "SELECT * FROM descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function Guardardescuento()
	{
		$sql="
			INSERT INTO descuento(titulo, tipo, monto, convigencia, estatus) VALUES ('$this->titulo', '$this->tipo','$this->monto','$this->convigencia', '$this->estatus')
		";

		$resp=$this->db->consulta($sql);
		$this->iddescuento=$this->db->id_ultimo();
	}

/*public function Guardardescuento()
	{
		$sql="
			INSERT INTO descuento(titulo, tipo, monto, convigencia, estatus,porcantidadservicio,portiposervicio,porservicio,porniveljerarquico,inppadre,inphijo,inpnieto,modalidaddescuento,txtdiascaducidad,porclientenoasociado,acumuladescuento) VALUES ('$this->titulo', '$this->tipo','$this->monto','$this->convigencia', '$this->estatus','$this->txtnumeroservicio','$this->portiposervicio','$this->porservicio','$this->porniveljerarquico','$this->inppadre','$this->inphijo','$this->inpnieto','$this->modalidaddescuento','$this->txtdiascaducidad','$this->porclientenoasociado','$this->v_acumulardescuento')";
			echo $sql;die();
		$resp=$this->db->consulta($sql);
		$this->iddescuento=$this->db->id_ultimo();
	}*/



	public function Modificardescuento()
	{
		$sql="UPDATE descuento 
		SET titulo = '$this->titulo', 
		tipo = '$this->tipo',
		monto = '$this->monto', 
		convigencia = '$this->convigencia',
		estatus = '$this->estatus'
		WHERE iddescuento='$this->iddescuento'";
		$resp=$this->db->consulta($sql);

	}

	public function VerificarRelacionDescuento()
	{
		$sql = "SELECT * FROM servicios_descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;

	}
	public function BorrarDescuento()
	{
		$sql = "DELETE FROM descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function EliminarPeriodosVigencia()
	{
		$sql = "DELETE FROM periodosdescuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function GuardarPeriodo()
	{
		$query = "INSERT INTO periodosdescuento (fechainicial,fechafinal,iddescuento) VALUES ('$this->periodoinicial','$this->periodofinal','$this->iddescuento');";

		$this->db->consulta($query);
	}

	public function ObtenerPeriodosDescuento()
	{
		
		$sql="SELECT *FROM periodosdescuento WHERE iddescuento='$this->iddescuento'";
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


	public function ObtenerdescuentoActivosMenos($listadescuento)
	{
		$sql="SELECT *FROM descuento WHERE estatus=1 ";

		if ($listadescuento!='') {
			$sql.=" AND iddescuento NOT IN($listadescuento) ";
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

	public function ObtenerDescuentos()
	{
		$sql="SELECT * FROM descuento WHERE estatus=1 ";
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

	public function ObtenerDescuentosUsuario()
	{
		
		$sql="SELECT *FROM usuarios_descuento WHERE idusuarios='$this->idusuario'  ";
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

	public function BuscarEnArray($idescuento,$arraydescuentos)
	{
		$encontrado=0;

		if (count($arraydescuentos)>0) {
			for ($i=0; $i < count($arraydescuentos); $i++) { 
					
				if ($idescuento==$arraydescuentos[$i]->iddescuento) {
					$encontrado=1;
					return $encontrado;
					
				}

				
			}

			if ($encontrado==0) {
					return $encontrado;
				}
		}else{

			return 0;
		}
	}

	public function obtenerPeridosDescuentos($fechaactual)
	{
		$sql="SELECT *FROM periodosdescuento WHERE iddescuento='$this->iddescuento'  AND '$fechaactual' >= CONVERT(fechainicial,DATE)  AND  '$fechaactual' <= CONVERT(fechafinal,DATE)";
		
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

	public function GuardarDescuentoPago()
	{

		$sql="INSERT INTO pagodescuento( iddescuento, montopago, montoadescontar, tipo, monto, idpago) VALUES ('$this->iddescuento', '$this->montopago', '$this->montoadescontar', '$this->tipo', '$this->monto', '$this->idpago')";
		
		$resp=$this->db->consulta($sql);


	}

	public function obtenercantidadserviciosUsuario()
	{
		$sql="SELECT COUNT(*) as cantidadservicios FROM servicios
			INNER JOIN usuarios_servicios ON servicios.idservicio=usuarios_servicios.idservicio
		 WHERE usuarios_servicios.idusuarios='$this->idusuario'";
		
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

	public function ObtenerCantidadHorarios($fechaantes,$fechactual)
	{
		$sql="SELECT COUNT(*) as cantidadhorarios FROM horariosservicio	
		 WHERE horariosservicio.idservicio='$this->idservicio' AND  fecha >='$fechaantes' AND fecha<='$fechactual' ";
		
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

	public function ObtenerCategoriasDescuento()
	{
		$sql="SELECT * FROM categorias_descuento
		 WHERE categorias_descuento.iddescuento='$this->iddescuento'";
	
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


	public function ObtenerServiciosDescuentos()
	{
		$sql="SELECT * FROM servicios_descuento
		 WHERE servicios_descuento.iddescuento='$this->iddescuento'";
		
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

	public function ObtenerDescuentoParentesco()
	{
		$sql="SELECT * FROM multiparentescodescuento
		 WHERE multiparentescodescuento.iddescuento='$this->iddescuento'";

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

	public function ObtenerParentescoUsuario()
	{
		$sql="SELECT * FROM usuariossecundarios
		 WHERE idusuariotutorado='$this->idusuario'

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

	public function ObtenerTodosParentescoUsuario($idusuariotutor,$idparentesco)
	{
		$sql="SELECT * FROM usuariossecundarios
		 WHERE idusuariostutor='$idusuariotutor'

		 ";

		 if ($idparentesco!=0) {
		 	$sql.=" AND idparentesco='$idparentesco'";
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

	public function ObtenerSiesAsociado()
	{
		$sql="SELECT * FROM usuariossecundarios
		 WHERE idusuariotutorado='$this->idusuario' AND sututor=0";
	
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

	public function ObtenerSiesNieto()
	{
		$sql="SELECT * FROM usuariossecundarios
		 WHERE idusuariotutorado='$this->idusuario' AND sututor=1";
		
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

	public function ObtenerMultinoAsociados()
	{
		$sql="SELECT * FROM multinoasociados
		 WHERE iddescuento='$this->iddescuento'";
		
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


	public function ObtenerAsignadosServicio()
	{
		
		$sql="SELECT COUNT(*)as cantidad FROM usuarios_servicios INNER JOIN usuarios ON usuarios_servicios.idusuarios=usuarios.idusuarios
		 WHERE idservicio='$this->idservicio' AND usuarios.tipo=3";
		
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