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

	public function ObtenerTodosdescuentos()
	{
		$sql = "SELECT * FROM descuento";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}

	public function ObtenerDescuentos()
	{
		$sql = "SELECT * FROM descuento WHERE estatus=1";

		$resp=$this->db->consulta($sql);
		
		return $resp;
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
			INSERT INTO descuento(titulo, tipo, monto, convigencia, estatus,porcantidadservicio,txtnumeroservicio,portiposervicio,porservicio,porniveljerarquico,inppadre,inphijo,inpnieto,modalidaddescuento,txtdiascaducidad,porclientenoasociado,acumuladescuento,cantidadhorariosservicios,cantidaddias,vigencia,porparentesco) VALUES ('$this->titulo', '$this->tipo','$this->monto','$this->convigencia', '$this->estatus','$this->porcantidadservicio','$this->txtnumeroservicio','$this->portiposervicio','$this->porservicio','$this->porniveljerarquico','$this->inppadre','$this->inphijo','$this->inpnieto','$this->modalidaddescuento','$this->txtdiascaducidad','$this->porclientenoasociado','$this->acumuladescuento','$this->cantidadhorariosservicios','$this->cantidaddias','$this->vigencia','$this->porparentesco')";
			
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
		$sql="UPDATE descuento SET titulo = '$this->titulo', tipo = '$this->tipo', monto = '$this->monto', convigencia = '$this->convigencia', estatus = '$this->estatus', porcantidadservicio = '$this->porcantidadservicio', portiposervicio = '$this->portiposervicio', porservicio = '$this->porservicio', porparentesco = '$this->porparentesco', porniveljerarquico = '$this->porniveljerarquico', porclientenoasociado ='$this->porclientenoasociado', dirigidoserviciocliente = '$this->dirigidoserviciocliente', acumuladescuento = '$this->acumuladescuento', inppadre = '$this->inppadre', inphijo = '$this->inphijo', inpnieto = '$this->inpnieto', modalidaddescuento = '$this->modalidaddescuento', txtdiascaducidad = '$this->txtdiascaducidad', porhorarioservicio = '$this->porhorarioservicio', cantidadhorariosservicios = '$this->cantidadhorariosservicios', cantidaddias = '$this->cantidaddias', vigencia = '$this->vigencia',  txtnumeroservicio = '$this->txtnumeroservicio' WHERE iddescuento='$this->iddescuento'";
		
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

	public function BorrarCategoriasDescuento($value='')
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
		$query = "INSERT INTO categorias_descuento (idcategorias,iddescuento) VALUES ('$idcategorias','$this->iddescuento');";

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

	public function GuardarMultiparentesco($cantfamiliares,$idparentesco,$textoparentesco,$tipodes,$txtcantidaddescuento)
	{
		$sql="INSERT INTO multiparentescodescuento( iddescuento, cantfamiliar, idparentesco, textoparentesco, tipodes, txtcantidaddescuento) VALUES ('$this->iddescuento', '$cantfamiliares', '$idparentesco', '$textoparentesco','$tipodes','$txtcantidaddescuento')";

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


}

 ?>