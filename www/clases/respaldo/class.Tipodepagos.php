<?php

class Tipodepagos

{

	public $db;//objeto de la clase de conexcion

	

	public $idtipodepago;
	public $tipo;
	public $estatus;
	public $habilitarfoto;
	public $habilitarstripe;
	public $clavepublica;
	public $claveprivada;
	public $porcentajecomision;
	public $montotransaccion;
	public $porcentajeimpuesto;
	public $cuenta;
	public $habilitarcampomonto;
	public $habilitarcampomontofactura;
	public $habilitartipodeservicio;
	public $habilitartpv;
	public $idusuarios;
	public $habilitarsinrevision;
	public $chkcatalogobanco;
	public $chkdigitos;
	public $chkopcionestarjeta;
	public $habilitarpagar;
	//Funcion para obtener todos los tipodepago activos
	public function ObttipodepagoActivos()
	{
		$sql = "SELECT * FROM tipodepago WHERE estatus = 1";
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

	public function ObtenerTodostipodepago()
	{
		$query="SELECT * FROM tipodepago ";

		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenertipodepago()
	{
		$query="SELECT * FROM tipodepago WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardartipodepagos()
	{
		
		$query="INSERT INTO tipodepago (tipo,estatus,habilitarfoto,constripe,claveprivada,clavepublica,comisionporcentaje,comisionmonto,impuesto,cuenta,habilitarcampomonto,habilitarcampomontofactura,habilitartiposervicio,habilitartpv,habilitarsinrevision,habilitarcatalogobanco,habilitarcampodigitos,habilitaropciontarjeta,habilitarpagar) 
		VALUES ('$this->tipo','$this->estatus','$this->habilitarfoto','$this->habilitarstripe','$this->claveprivada','$this->clavepublica','$this->porcentajecomision','$this->montotransaccion','$this->porcentajeimpuesto','$this->cuenta','$this->habilitarcampomonto','$this->habilitarcampomontofactura','$this->habilitartipodeservicio','$this->habilitartpv','$this->habilitarsinrevision','$this->chkcatalogobanco','$this->chkdigitos','$this->chkopcionestarjeta','$this->habilitarpagar')";
				
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
		habilitarcampomontofactura='$this->habilitarcampomontofactura',
		habilitartiposervicio='$this->habilitartipodeservicio',
		habilitartpv='$this->habilitartpv',
		habilitarsinrevision='$this->habilitarsinrevision',
		habilitarcatalogobanco='$this->chkcatalogobanco',
		habilitarcampodigitos='$this->chkdigitos',
		habilitaropciontarjeta='$this->chkopcionestarjeta',
		habilitarpagar='$this->habilitarpagar'
		WHERE idtipodepago=$this->idtipodepago";
		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscartipodepago()
	{
		$query="SELECT * FROM tipodepago WHERE idtipodepago=".$this->idtipodepago;

		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	
	public function ObtTipopagosSucursal()
	{
		$sql = "SELECT *from sucursaltipodepago WHERE idsucursal=".$this->idsucursal."";

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

public function ObtenerTipodepago2()
	{
		$query="SELECT * FROM tipodepago WHERE idtipodepago=".$this->idtipodepago."";
		
		$resp = $this->db->consulta($query);
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

	
	public function ObttipodepagoActivosWeb()
	{
		$sql = "SELECT * FROM tipodepago WHERE estatus = 1 AND habilitarweb=1";
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


 public function EliminarRelacionCategoria()
 	{

 		$sql = "DELETE FROM categorias_tipodepago WHERE idtipodepago = '$this->idtipodepago'";
 		
		$resp = $this->db->consulta($sql);
		
 	}	

 	public function GuardarRelacionCategoria()
 	{
 	 $sql="INSERT INTO categorias_tipodepago(idcategorias, idtipodepago) VALUES 
 	 	('$this->tipodeservicio', '$this->idtipodepago')";


 		$resp = $this->db->consulta($sql);

 	}

 	public function ObtenerCategoriasTipopago()
 	{
 		$sql = "SELECT * FROM categorias_tipodepago WHERE  idtipodepago='$this->idtipodepago'";
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


 	public function ObttipodepagoEfectivoTransferencia()
	{
		$sql = "SELECT *,
				(SELECT COUNT(*) FROM
					notapago INNER JOIN 
					usuarios ON notapago.idusuario=usuarios.idusuarios		
			    	WHERE   notapago.estatus 
			    	IN(0) AND 
			    	notapago.idtipopago= tipodepago.idtipodepago)as cantidadnota
				FROM tipodepago WHERE estatus = 1 AND (habilitarcampomonto=1 OR habilitarfoto=1) ORDER by tipo asc";


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


	
	//Funcion para obtener todos los tipodepago activos
	public function ObttipodepagoActivosFiltrar($tipo)
	{
				$sql = "SELECT * FROM tipodepago WHERE estatus = 1 AND factura='$tipo'";

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


	public function ObttipodepagoActivosFiltrarIdtipo($tipodepagos)
	{
		$sql = "SELECT * FROM tipodepago WHERE idtipodepago IN ($tipodepagos) AND estatus=1";
		
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


	public function ObttipodepagoActivosTPV()
	{
		$sql = "SELECT * FROM tipodepago left join tipodepagousuario on tipodepago.idtipodepago=tipodepagousuario.idtipodepago WHERE estatus = 1 AND  habilitartpv=1 AND tipodepagousuario.idusuario='$this->idusuarios'";

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

	public function EliminarRelacionUsuarios()

	{
		$sql = "DELETE FROM tipodepagousuario WHERE idtipodepago = '$this->idtipodepago'";
 		
		$resp = $this->db->consulta($sql);
		

	}

	public function GuardarRelacionUsuarios()
	{
		 $sql="INSERT INTO tipodepagousuario(idusuario, idtipodepago) VALUES 
 	 	('$this->idusuarios', '$this->idtipodepago')";

 		$resp = $this->db->consulta($sql);
	}

	public function ObtenerRelacionUsuarios($value='')
	{
		$sql = "SELECT * FROM tipodepagousuario WHERE idtipodepago='$this->idtipodepago'";
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


}

?>