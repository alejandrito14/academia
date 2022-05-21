<?php

class Tipodeusuarios

{

	public $db;//objeto de la clase de conexcion

	

	public $idtipodeusuarios;
	public $tipo;
	public $estatus;

	//Funcion para obtener todos los tipodepago activos
	public function ObttipodeusuariosActivos()
	{
		$sql = "SELECT * FROM tipousuario WHERE estatus = 1";

		if ($this->tipo!='') {

			//$sql.=" AND idtipousuario IN('$this->tipo')";
		}
	//echo $sql;die();
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

	public function ObtenerTodostipodeusuario()
	{
		$query="SELECT * FROM tipousuario ";

		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenertipodeusuario()
	{
		$query="SELECT * FROM tipousuario WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardartipodeusuario()
	{
		$query="INSERT INTO tipousuario (tipo,estatus,habilitarfoto,constripe,claveprivada,clavepublica,comisionporcentaje,comisionmonto,impuesto,cuenta,habilitarcampomonto,habilitarcampomontofactura) 
		VALUES ('$this->tipo','$this->estatus','$this->habilitarfoto','$this->habilitarstripe','$this->claveprivada','$this->clavepublica','$this->porcentajecomision','$this->montotransaccion','$this->porcentajeimpuesto','$this->cuenta','$this->habilitarcampomonto','$this->habilitarcampomontofactura')";
		
		$resp=$this->db->consulta($query);
		$this->idtipodepago = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificartipodepagos()
	{
		$query="UPDATE tipodepago 
		SET tipo='$this->tipo',
		estatus='$this->estatus',
		habilitarfoto='$this->habilitarfoto',
		constripe='$this->habilitarstripe',
		clavepublica='$this->clavepublica',
		claveprivada='$this->claveprivada',
		comisionporcentaje='$this->porcentajecomision',
		comisionmonto='$this->montotransaccion',
		impuesto='$this->porcentajeimpuesto',
		cuenta='$this->cuenta',
		habilitarcampomonto='$this->habilitarcampomonto',
		habilitarcampomontofactura='$this->habilitarcampomontofactura'
		WHERE idtipodepago=$this->idtipodepago";

		$resp=$this->db->consulta($query);
	}
	





	

}

?>