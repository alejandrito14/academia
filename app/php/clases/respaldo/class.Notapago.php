<?php 

class Notapago 
{
	public $db;
	public $idnotapago;
	public $idusuario;
	public $fecha;
	public $subtotal;
	public $iva;
	public $total;
	public $comisiontotal;
	public $montomonedero;
	public $estatus;
	public $tipopago;
	public $idtipopago;
	public $confoto;
	public $datostarjeta;
	public $datostarjeta2;
	public $idpagostripe;
	public $folio;
	public $descuento;
	public $descuentomembresia;
	public $cambio;
	public $montovisual;

	public $descripcion;
	public $cantidad;
	public $monto;
	public $idpago;
	public $comisionpornota;
	public $comisionnota;
	public $tipocomisionpornota;

	public $requierefactura;
	public $razonsocial;
	public $rfc;
	public $direccion;
	public $nointerior;
	public $noexterior;
	public $colonia;
	public $municipio;
	public $estado;
	public $codigopostal;
	public $correo;
	public $pais;
	public $asentamiento;
	public $calle;
	public $calle1;
	public $referencia;
	public $formapago;
	public $metodopago;
	public $usocfdi;
	public $imagenconstancia;
	public $idusuariodatofiscal;
	public function CrearNotapago()
	{
		$sql="INSERT INTO notapago( idusuario, subtotal, iva, total, comisiontotal, montomonedero, estatus, idtipopago, tipopago, confoto, datostarjeta,datostarjeta2,idpagostripe,folio,comisionpornota,comisionnota,tipocomisionpornota,requierefactura,razonsocial,rfc,direccion,nointerior,noexterior,colonia,municipio,estado,codigopostal,correo,pais,asentamiento,calle,formapago,metodopago,usocfdi,imagenconstancia,idusuariodatofiscal) VALUES ('$this->idusuario', '$this->subtotal','$this->iva', '$this->total', '$this->comisiontotal','$this->montomonedero','$this->estatus','$this->idtipopago','$this->tipopago','$this->confoto','$this->datostarjeta','$this->datostarjeta2','$this->idpagostripe','$this->folio','$this->comisionpornota','$this->comisionnota','$this->tipocomisionpornota',
			'$this->requierefactura',
			'$this->razonsocial',
			'$this->rfc',
			'$this->direccion',
			'$this->nointerior',
			'$this->noexterior',
			'$this->colonia',
			'$this->municipio',
			'$this->estado',
			'$this->codigopostal',
			'$this->correo',
			'$this->pais',
			'$this->asentamiento',
			'$this->calle',
			'$this->formapago',
			'$this->metodopago',
			'$this->usocfdi',
			'$this->imagenconstancia',
			'$this->idusuariodatofiscal'

			)";
		 $resp=$this->db->consulta($sql);
		 $this->idnotapago=$this->db->id_ultimo();

	}

	public function ActualizarNotapago()
	{
		$sql="UPDATE notapago SET 
			  subtotal = '$this->subtotal',
			  iva = '$this->iva', 
			  total = '$this->total', 
			  comisiontotal = '$this->comisiontotal',
			  montomonedero = '$this->montomonedero', 
			  estatus = '$this->estatus',  
			  idpagostripe = '$this->idpagostripe', 
			  descuento='$this->descuento',
			  descuentomembresia='$this->descuentomembresia'
			  WHERE idnotapago='$this->idnotapago'";

		$resp=$this->db->consulta($sql);

  
	}

	public function Creardescripcionpago()
	{
		$sql="INSERT INTO notapago_descripcion( idnotapago, descripcion, cantidad, monto, idpago) VALUES ( '$this->idnotapago', '$this->descripcion', '$this->cantidad','$this->monto', '$this->idpago')";

		$resp=$this->db->consulta($sql);

	}
	

	public function Obtenernota()
	{
		$sql="
			SELECT *FROM notapago
			 WHERE idnotapago='$this->idnotapago' AND idusuario='$this->idusuario'";
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
	

	public function ObtenerPagosStripe()
	{
		$sql="
			SELECT 
			pagos.idpago,
			pagos.idusuarios,
			pagos.idservicio,
			pagos.idmembresia,
			pagos.tipo,
			pagos.monto,
			pagos.estatus,
			pagos.fechapago,
			pagos.tarjeta,
			pagos.fechacreacion,
			pagos.pagado,
			pagos.digitostarjeta,
			pagos.tipopago,
			pagos.fechaevento,
			pagos.dividido,
			pagos.fechainicial,
			pagos.folio,
			pagos.idtipopago,
			pagos.fechafinal,
			pagos.concepto,
			pagos.tipodepago,
			pagos.descuento,
			pagos_pagostripe.idpagostripe,
			pagos_pagostripe.idpagopagostripe

			FROM pagos_pagostripe
			INNER JOIN pagos ON pagos_pagostripe.idpago=pagos.idpago
			 WHERE idpagostripe='$this->idpagostripe'


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


	public function ObtenerdescripcionNota()
	{
		$sql="SELECT idnotapago,descripcion as concepto,monto,idpago,fecha FROM notapago_descripcion WHERE idnotapago='$this->idnotapago'";
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

	public function ObtenerImagenesComprobante()
	{
		$sql="SELECT * FROM notapago_comprobante WHERE idnotapago='$this->idnotapago'";
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

	public function ActualizarMonto()
	{
		$sql="UPDATE notapago SET 
			  cambio = '$this->cambio',
			  montovisual = '$this->montovisual', 
			  estatus = '$this->estatus'
			  WHERE idnotapago='$this->idnotapago'";
			  
		$resp=$this->db->consulta($sql);

  
	}
}
 ?>