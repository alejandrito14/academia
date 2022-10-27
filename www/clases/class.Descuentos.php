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

	public $porcantidadservicio;
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
	public $acumuladescuento;
	public $porhorarioservicio;
	public $porparentesco;
	public $cantidadhorariosservicios;
	public $cantidaddias;
	public $vigencia;
	public $dirigidoserviciocliente;
	public $porclientedirecto;
	public $todosclientes;

	public $caracteristicas;
	public $tiposervicio2;
    public $servicios2;

	public $portiposervicio2;
	public $porservicio2;
	public $idnotapago;

	public function ObtenerTodosdescuentos()
	{
		$sql = "SELECT * FROM descuento";

		$resp=$this->db->consulta($sql);
		
		return $resp;
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

	public function buscardescuento()
	{
		$sql = "SELECT * FROM descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	/*public function Guardardescuento()
	{
		$sql="
			INSERT INTO descuento(titulo, tipo, monto, convigencia, estatus) VALUES ('$this->titulo', '$this->tipo','$this->monto','$this->convigencia', '$this->estatus')
		";

		$resp=$this->db->consulta($sql);
		$this->iddescuento=$this->db->id_ultimo();
	}*/

	public function Guardardescuento()
	{

		$sql="
			INSERT INTO descuento(titulo, tipo, monto, convigencia, estatus,porcantidadservicio,txtnumeroservicio,portiposervicio,porservicio,porniveljerarquico,inppadre,inphijo,inpnieto,modalidaddescuento,txtdiascaducidad,porclientenoasociado,acumuladescuento,cantidadhorariosservicios,cantidaddias,vigencia,porparentesco,porclientedirecto,todosclientes,caracteristicaasociador,caracteristicasporservicio,caracteristicaportiposervicio) VALUES ('$this->titulo', '$this->tipo','$this->monto','$this->convigencia', '$this->estatus','$this->porcantidadservicio','$this->txtnumeroservicio','$this->portiposervicio','$this->porservicio','$this->porniveljerarquico','$this->inppadre','$this->inphijo','$this->inpnieto','$this->modalidaddescuento','$this->txtdiascaducidad','$this->porclientenoasociado','$this->acumuladescuento','$this->cantidadhorariosservicios','$this->cantidaddias','$this->vigencia','$this->porparentesco','$this->porclientedirecto','$this->todosclientes','$this->caracteristicas','$this->porservicio2','$this->portiposervicio2')";
			
		$resp=$this->db->consulta($sql);
		$this->iddescuento=$this->db->id_ultimo();
	}

	public function Modificardescuento()
	{
		/*$sql="UPDATE descuento 
		SET titulo = '$this->titulo', 
		tipo = '$this->tipo',
		monto = '$this->monto', 
		convigencia = '$this->convigencia',
		estatus = '$this->estatus'
		WHERE iddescuento='$this->iddescuento'";
		$resp=$this->db->consulta($sql);
*/
		$sql="UPDATE descuento SET titulo = '$this->titulo', tipo = '$this->tipo', monto = '$this->monto', convigencia = '$this->convigencia', estatus = '$this->estatus', porcantidadservicio = '$this->porcantidadservicio', portiposervicio = '$this->portiposervicio', porservicio = '$this->porservicio', porparentesco = '$this->porparentesco', porniveljerarquico = '$this->porniveljerarquico', porclientenoasociado ='$this->porclientenoasociado', dirigidoserviciocliente = '$this->dirigidoserviciocliente', acumuladescuento = '$this->acumuladescuento', inppadre = '$this->inppadre', inphijo = '$this->inphijo', inpnieto = '$this->inpnieto', modalidaddescuento = '$this->modalidaddescuento', txtdiascaducidad = '$this->txtdiascaducidad', porhorarioservicio = '$this->porhorarioservicio', cantidadhorariosservicios = '$this->cantidadhorariosservicios', cantidaddias = '$this->cantidaddias', vigencia = '$this->vigencia',  txtnumeroservicio = '$this->txtnumeroservicio',
			caracteristicaasociador='$this->caracteristicas',
		caracteristicasporservicio='$this->porservicio2',
		caracteristicaportiposervicio='$this->portiposervicio2'
		 WHERE iddescuento='$this->iddescuento'";
		
				$resp=$this->db->consulta($sql);

	}

	public function VerificarRelacionDescuento()
	{
		$sql = "SELECT * FROM pagodescuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;

	}
	public function BorrarDescuento()
	{
		$sql = "DELETE FROM descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function BorrarMultiparentescodescuento()
	{
		$sql = "DELETE FROM multiparentescodescuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function BorrarMultinoasociados()
	{
	 $sql = "DELETE FROM multinoasociados WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function BorrarCategoriasDescuento()
	{
		 $sql = "DELETE FROM categorias_descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function EliminarPeriodosVigencia()
	{
		$sql = "DELETE FROM periodosdescuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	 public function EliminarTipoServicios(){
	 	$sql = "DELETE FROM categorias_descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	 }
	 public function EliminarServicios(){
	 	$sql = "DELETE FROM servicios_descuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	 }
	 public function EliminarMultiparentesco(){
	 	$sql = "DELETE FROM multiparentescodescuento WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	 }
	 public function EliminarMultiNoAsociados(){
	 	$sql = "DELETE FROM multinoasociados WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	 }

	public function GuardarPeriodo()
	{
		$query = "INSERT INTO periodosdescuento (fechainicial,fechafinal,iddescuento) VALUES ('$this->periodoinicial','$this->periodofinal','$this->iddescuento');";

		$this->db->consulta($query);
	}

	public function GuardarTipoDescuento($idcategorias)
	{
		$query = "INSERT INTO categorias_descuento (idcategorias,iddescuento) VALUES ('$idcategorias','$this->iddescuento')";

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

	public function ObtenerDescuentosServicio()
	{
		$sql="SELECT *FROM servicios_descuento WHERE idservicio='$this->idservicio' ";
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


	public function GuardarAsignaciondescuentos()
	{
		$query = "INSERT INTO servicios_descuento (idservicio,iddescuento) VALUES ('$this->idservicio','$this->iddescuento')";
		$this->db->consulta($query);

	}

	public function GuardarMultiparentesco($rangoinicial,$rangofinal,$idparentesco,$textoparentesco,$tipodes,$txtcantidaddescuento)
	{
		$sql="INSERT INTO multiparentescodescuento( iddescuento, rangoinicial,rangofinal, idparentesco, textoparentesco, tipodes, txtcantidaddescuento) VALUES ('$this->iddescuento', '$rangoinicial','$rangofinal', '$idparentesco', '$textoparentesco','$tipodes','$txtcantidaddescuento')";

			$this->db->consulta($sql);

	}

	public function GuardarMultipleNoAsociado($cantidad,$txtcantidaddesc,$tipodescuento)
	{
		$sql="INSERT INTO multinoasociados(cantidad, txtcantidaddesc, tipodescuento,iddescuento) VALUES ( '$cantidad', '$txtcantidaddesc', '$tipodescuento','$this->iddescuento')";
		$this->db->consulta($sql);
	}

	public function ObtenerTipoDescuento()
	{
		$sql="SELECT *FROM categorias_descuento WHERE iddescuento='$this->iddescuento' ";
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


	public function ObtenerServicioDescuento()
	{
		$sql="SELECT *FROM servicios_descuento WHERE iddescuento='$this->iddescuento' ";
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


	public function ObtenerParentescosMultiDescuento()
	{
		$sql="SELECT *FROM multiparentescodescuento WHERE iddescuento='$this->iddescuento' ";
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

	public function ObtenerParentescosMultiClienteNoAsociado()
	{
		$sql="SELECT *FROM multinoasociados WHERE iddescuento='$this->iddescuento' ";
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
	public function BorrarDescuentoClientes()
	{
		$sql = "DELETE FROM usuarios_descuento WHERE iddescuento='$this->iddescuento'";
		
		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function BorrarServiciosDescuento()
	{
		$sql = "DELETE FROM servicios_descuento WHERE iddescuento='$this->iddescuento'";
		
		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function GuardarTipoDescuentoAsociador($idcategorias)
		 {
		 $query = "INSERT INTO categoriasasociador (idcategorias,iddescuento) VALUES ('$idcategorias','$this->iddescuento')";
		
		  $this->db->consulta($query);
		 }	

	 public function GuardarAsignacionDescuentoAsociador()
		  {
		  $query = "INSERT INTO serviciosasociador (idservicio,iddescuento) VALUES ('$this->idservicio','$this->iddescuento')";
		$this->db->consulta($query);
		  } 


	public function ObtenerTipoDescuentoAsociador()
		{
		  $sql="SELECT *FROM categoriasasociador WHERE iddescuento='$this->iddescuento' ";
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

	public function ObtenerServicioAsociador()
	{
		$sql="SELECT *FROM serviciosasociador WHERE iddescuento='$this->iddescuento' ";
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


public function EliminarCaracteristicasServicio()
		{
			$sql = "DELETE FROM serviciosasociador WHERE iddescuento='$this->iddescuento'";

		$resp=$this->db->consulta($sql);
		
		}
public function EliminarCaracteristicasTipoServicio()
		{
			$sql = "DELETE FROM categoriasasociador WHERE iddescuento='$this->iddescuento' ";

		$resp=$this->db->consulta($sql);
		
			
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

	public function ObtenerTodosParentescoUsuario($idusuariotutor,$idparentesco,$categoria)
	{
		$sql="SELECT * FROM usuariossecundarios
		 INNER JOIN usuarios_servicios ON 
		 idusuarios=usuariossecundarios.idusuariotutorado
		 INNER JOIN servicios ON usuarios_servicios.idservicio=servicios.idservicio
		 WHERE idusuariostutor='$idusuariotutor'  AND servicios.idcategoriaservicio='$categoria'  ORDER BY usuariossecundarios.idusuariossecundario


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

	public function GuardarDescuentoPago()
	{

		$sql="INSERT INTO pagodescuento( iddescuento, montopago, montoadescontar, tipo, monto, idpago,idnotapago) VALUES ('$this->iddescuento', '$this->montopago', '$this->montoadescontar', '$this->tipo', '$this->monto', '$this->idpago','$this->idnotapago')";
		
		$resp=$this->db->consulta($sql);


	}
/*
	public function ObtenerTipoDescuentoAsociador()
		{
		 $sql="SELECT *FROM categoriasasociador WHERE iddescuento='$this->iddescuento' ";
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
	}*/

	/*public function ObtenerServicioAsociador()
	{
		$sql="SELECT *FROM serviciosasociador WHERE iddescuento='$this->iddescuento' ";
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
	}*/


}

 ?>