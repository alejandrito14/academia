<?php
class ClienteStripe
{
	public $db;//objeto de conecxion con la base de datos
	public $idusuarios;//ide del Cliente
	
	//DATOS GENERALES
    public $customerid;
	public $lastcard;
	public $skey;

	//Datos INTENTO PAGO
	public $idTransaccion;
	public $idNotaRemision;
	public $monto;
	public $digitosTarjeta;
	public $estatus;
	public $fechaTransaccion;
	public $fechaactual;
	public $idintento;
	public $comision;
	public $comisiontotal;
	public $comisionmonto;
	public $impuestototal;
	public $subtotalsincomision;
	public $total;
	
    public function ObtenerID()
	{
		$Query="SELECT customerid_stripe FROM usuarios WHERE idusuarios = '$this->idusuarios'";
		$resp=$this->db->consulta($Query);		
		return $resp;
	}

    public function ObtenerLastCard()
    {
		$Query="SELECT lastcard_stripe FROM usuarios WHERE idusuarios = '$this->idusuarios'";
		$resp=$this->db->consulta($Query);		
		return $resp;
    }
	
	public function ObtenerDatosCliente()
    {
		$sql="SELECT nombre,paterno,email FROM usuarios
			WHERE idusuarios='$this->idusuarios'";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ActualizarId()
	{
		$query="UPDATE usuarios SET 
		customerid_stripe = '$this->customerid'
		WHERE idusuarios = '$this->idusuarios' ";
		$result = $this->db->consulta($query);
	}

    public function ActualizarLastCard()
	{
		if ($this->lastcard == "null"){
		$query="UPDATE usuarios SET 
		lastcard_stripe = NULL
		WHERE idusuarios = '$this->idusuarios' ";
		}
		else
		{
        $query="UPDATE usuarios SET 
		lastcard_stripe = '$this->lastcard'
		WHERE idusuarios = '$this->idusuarios' ";
		}
		$result = $this->db->consulta($query);
    }

	public function RegistrarIntentoPago()
	{
		
		$sql = "INSERT INTO pagostripe (idtransaccion, monto, digitostarjeta, idusuarios, estatus, fechatransaccion,comision,comisiontotal,comisionmonto,impuestototal,subtotalsincomision,total,impuesto) 
		VALUES ('$this->idTransaccion',$this->monto,'$this->digitosTarjeta',$this->idusuarios,'$this->estatus','$this->fechaTransaccion','$this->comision','$this->comisiontotal','$this->comisionmonto','$this->impuestototal','$this->subtotalsincomision','$this->total','$this->impuesto')";	
		$result = $this->db->consulta($sql);

		$this->idintento=$this->db->id_ultimo();

		
	}


	  public function ObtenerIDCustomer()
	{
		$Query="SELECT customerid_stripe FROM customerstripe WHERE idusuarios = '$this->idusuarios' and skeystripe='$this->skey'";
		$resp=$this->db->consulta($Query);		
		return $resp;
	}

	public function GuardarIdCustomer(){

		$query = "INSERT INTO customerstripe (skeystripe,idusuarios,customerid_stripe) VALUES ('$this->skey','$this->idusuarios','$this->customerid');";
		$resp=$this->db->consulta($query);
		return $resp;

	}

	public function ObtenerIntentos()
	{
		$query = "SELECT *FROM intentospagosfallidos WHERE DATE(fecha)=DATE('$this->fechaactual') AND 
			digitostarjeta='$this->lastcard' ";

		
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

	public function GuardarIntento()
	{
		
		$sql = "INSERT INTO pagostripe ( notaremision, fechaintento, payment_method_id,estatus) 
		VALUES ($this->idNotaRemision,'$this->fechaactual','$this->lastcard','$this->estatus')";	
		
		$result = $this->db->consulta($sql);
	}

	public function RegistrarIntentoPagoFallido()
	{
		$sql = "INSERT INTO intentospagosfallidos (idtransaccion, monto, digitostarjeta, idusuarios, estatus, fechatransaccion) 
		VALUES ('$this->idTransaccion',$this->monto,'$this->digitosTarjeta',$this->idusuarios,'$this->estatus','$this->fechaTransaccion')";	
		
		$result = $this->db->consulta($sql);
	}

	public function ActualizarIntento()
	{
		$sql="
			UPDATE pagostripe SET 
			idtransaccion = '$this->idTransaccion',
			 monto = $this->monto, 
			 digitostarjeta = '$this->digitosTarjeta', 
			 idusuarios = $this->idusuarios, 
			 estatus = '$this->estatus',
			 fechatransaccion = '$this->fechaTransaccion' WHERE idpagostripe = $this->idintento";
			
		$result=$this->db->consulta($sql);
	}


}