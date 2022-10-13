<?php

class Pagos

{

	public $db;//objeto de la clase de conexcion

	

	public $idpagos;
	public $etiqueta;
	public $fechainicial;
	public $fechafinal;
	public $estatus;
	
	public $idusuarios;
	public $idservicio;
	public $idmembresia;
	public $monto;
	public $concepto;
	
	//Funcion para obtener todos los niveles activos
	public function ObtPagosActivos()
	{
		$sql = "SELECT * FROM pagos WHERE estatus = 1";
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



	public function ObtTodosPagos()
	{
		$sql = "SELECT 
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
					pagos.validadoporusuario,
					pagos.digitostarjeta,
					pagos.tipopago,
					pagos.fechaevento,
					pagos.dividido,
					pagos.fechainicial,
					pagos.fechafinal,
					pagos.concepto,
					pagos.idtipopago,
					pagos.tipodepago,
					pagos.descuento,
					pagos.folio,
					usuarios.nombre,
					usuarios.paterno,
					usuarios.materno,
					usuarios.email,
					usuarios.celular
			    FROM pagos
				LEFT JOIN usuarios ON usuarios.idusuarios=pagos.idusuarios
			    GROUP BY idpago,idusuarios ORDER BY idpago ";
		
		$resp = $this->db->consulta($sql);
		
		return $resp;
	}


	public function buscarpago()
	{
		$sql = "SELECT * FROM pagos WHERE idpagos=".$this->idpagos."";
		

		$resp = $this->db->consulta($sql);
		
		return $resp;
	}
	

	
		//funcion para guardar pagos
	
	public function Guardarpagos()
	{
		$query="INSERT INTO pagos (etiqueta,fechainicial,fechafinal,estatus) VALUES ('$this->etiqueta','$this->fechainicial','$this->fechafinal','$this->estatus')";
		
		
		$resp=$this->db->consulta($query);
		$this->idpagos = $this->db->id_ultimo();
		
		
	}

		//funcion para modificar 
	public function Modificarpagos()
	{
		$query="UPDATE pagos SET etiqueta='$this->etiqueta',
		fechainicial='$this->fechainicial',
		fechafinal='$this->fechafinal',
		estatus='$this->estatus'
		WHERE idpagos=$this->idpagos";

		$resp=$this->db->consulta($query);
	}


	
		public function ListadopagosNopagados()
		{
			$sql = "SELECT 
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
					pagos.validadoporusuario,
					pagos.digitostarjeta,
					pagos.tipopago,
					pagos.fechaevento,
					pagos.dividido,
					pagos.fechainicial,
					pagos.fechafinal,
					pagos.concepto,
					pagos.idtipopago,
					pagos.tipodepago,
					pagos.descuento,
					pagos.folio,
					usuarios.nombre,
					usuarios.paterno,
					usuarios.materno,
					usuarios.email,
					usuarios.celular
			    FROM pagos
				LEFT JOIN usuarios ON usuarios.idusuarios=pagos.idusuarios
			    WHERE pagos.estatus=0 AND pagos.pagado=0 AND pagos.idusuarios  IN($this->idusuarios) GROUP BY idpago,idusuarios ORDER BY idpago ";
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

		
	
	public function ObtenerPago()
	{
		$sql="SELECT *FROM pagos WHERE idpago='$this->idpago'";
	
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


	public function CrearRegistroPago()
	{
		$sql="INSERT INTO pagos(idusuarios, idservicio, idmembresia, tipo, monto, estatus,fechainicial,fechafinal,pagado,concepto,folio) VALUES ( '$this->idusuarios','$this->idservicio','$this->idmembresia','$this->tipo','$this->monto', '$this->estatus','$this->fechainicial','$this->fechafinal',0,'$this->concepto','$this->folio')";
		
		$resp=$this->db->consulta($sql);
		$this->idpago=$this->db->id_ultimo();

	}
}

?>