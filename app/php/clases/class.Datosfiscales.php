<?php 

/**
 * 
 */
class Datosfiscales 
{
	
	public $idusuario;
	public $v_codigopostal;
	public $v_pais;
	public $v_estado;
	public $v_municipio;
	public $v_colonia;
	public $v_rfc;
	public $v_nointerior;
	public $v_noexterior;
	public $v_correo;
	public $idusuariosdatosfiscales;
	public $calle1;
	public $calle2;
	public $v_tipoasentamiento;
	public $calle;
	public $v_referencia;
	public $db;
	public $razonsocial;
	public $vformapago;
	public $vmetodopago;
	public $vusocfdi;
	public $asentamiento;
	public $rutaimagen;

	public function GuardarDatosfiscales()
	{
		$sql="
			INSERT INTO usuarios_datosfiscales( razonsocial, rfc, direccion, nointerior, noexterior, colonia, municipio, estado, codigopostal, correo, pais, asentamiento, calle, calle1, calle2, referencia,idusuarios,formapago,metodopago,usocfdi)
			 VALUES ( '$this->razonsocial', 
			 	'$this->v_rfc',
			    '$this->calle', 
			    '$this->v_nointerior', 
			    '$this->v_noexterior', 
			    '$this->v_colonia',
			    '$this->v_municipio',
			    '$this->v_estado',
			    '$this->v_codigopostal', 
			    '$this->v_correo', 
			    '$this->v_pais',
			    '$this->asentamiento', 
			    '$this->calle', 
			    '$this->calle1', 
			    '$this->calle2', 
			    '$this->referencia', 
			    '$this->idusuario',
			    '$this->vformapago',
			    '$this->vmetodopago',
			    '$this->vusocfdi'
			    )";
		

		$resp=$this->db->consulta($sql);
		$this->idusuariosdatosfiscales=$this->db->id_ultimo();

	}

	public function ModificarDatosFiscal()
	{
		$sql="
			UPDATE usuarios_datosfiscales SET razonsocial = '$this->razonsocial', 
				rfc = '$this->v_rfc',
				direccion ='$this->calle', 
				nointerior = '$this->v_nointerior', 
				noexterior = '$this->v_noexterior', 
				colonia = '$this->v_colonia',
				municipio = '$this->v_municipio', estado = '$this->v_estado', codigopostal = '$this->v_codigopostal',
				  correo = '$this->v_correo',
				   pais = '$this->v_pais',
				   asentamiento = '$this->asentamiento', 
				   calle = '$this->calle', 
				   calle1 = '', 
				   calle2 = '',
				 	 referencia = '', 
				   formapago = '$this->vformapago', 
				   metodopago = '$this->vmetodopago', 
				   usocfdi = '$this->vusocfdi'
				   WHERE 
				   idusuariosdatosfiscales='$this->idusuariosdatosfiscales';
		";

		$resp=$this->db->consulta($sql);
	
	}


	public function ObtenerDatosfiscalesUsuario()
	{
		$sql="SELECT *FROM usuarios_datosfiscales WHERE idusuarios='$this->idusuario'";

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


	public function Eliminardatofiscal()
	{
		$sql="DELETE FROM usuarios_datosfiscales WHERE idusuariosdatosfiscales='$this->idusuariosdatosfiscales'";

		$resp=$this->db->consulta($sql);

	}

	public function Obtenerdatofiscal()
	{

		
		$sql="SELECT usuarios_datosfiscales.idusuariosdatosfiscales,
                usuarios_datosfiscales.razonsocial,
                municipios.nombre AS nombremunicipio,
                usuarios_datosfiscales.municipio,
                usuarios_datosfiscales.estado,
                estados.nombre AS nombreestado,
                usuarios_datosfiscales.rfc,
                usuarios_datosfiscales.direccion,
                usuarios_datosfiscales.nointerior,
                usuarios_datosfiscales.noexterior,
                usuarios_datosfiscales.colonia,
                usuarios_datosfiscales.codigopostal,
                usuarios_datosfiscales.formapago,
                usuarios_datosfiscales.metodopago,
                usuarios_datosfiscales.usocfdi,
                usuarios_datosfiscales.razonsocial,
                usuarios_datosfiscales.correo,
                usuarios_datosfiscales.asentamiento,
                usuarios_datosfiscales.calle,
                usuarios_datosfiscales.imagenconstancia,
                pais.idpais as pais,
                usuarios_datosfiscales.idusuarios,pais.pais as nombrepais FROM usuarios_datosfiscales
							 INNER JOIN pais ON usuarios_datosfiscales.pais=pais.idpais
               INNER JOIN municipios
                ON municipios.id = usuarios_datosfiscales.municipio
              INNER  JOIN estados
                ON usuarios_datosfiscales.estado = estados.id

		 WHERE idusuariosdatosfiscales='$this->idusuariosdatosfiscales'";
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



 public function EliminarImagenesDatofiscal()
 	{
 		$sql="DELETE FROM imagenesconstancia WHERE idusuariosdatosfiscales='$this->idusuariosdatosfiscales'";

		$resp=$this->db->consulta($sql);
 	}

 	public function GuardarImagenFiscal()
 		{
 			$sql="INSERT INTO imagenesconstancia( ruta, idusuariosdatosfiscales) VALUES ('$this->rutaimagen','$this->idusuariosdatosfiscales')";
 			$resp=$this->db->consulta($sql);

 		}

 		public function ObtenerImagenesfiscal()
 			{
 			   $sql="SELECT *FROM imagenesconstancia WHERE idusuariosdatosfiscales='$this->idusuariosdatosfiscales'";
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

 	public function ObtenerImagenesfiscalAgrupado()
 	{
 		$sql="SELECT GROUP_CONCAT(ruta) as imagenesconstancia FROM imagenesconstancia WHERE idusuariosdatosfiscales='$this->idusuariosdatosfiscales'";
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