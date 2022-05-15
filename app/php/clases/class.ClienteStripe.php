<?php
class ClienteStripe
{
	public $db;//objeto de conecxion con la base de datos
	public $idCliente;//ide del Cliente
	
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
	
    public function ObtenerID()
	{
		$Query="SELECT customerid_stripe FROM clientes WHERE idcliente = '$this->idCliente'";
		$resp=$this->db->consulta($Query);		
		return $resp;
	}

    public function ObtenerLastCard()
    {
		$Query="SELECT lastcard_stripe FROM clientes WHERE idcliente = '$this->idCliente'";
		$resp=$this->db->consulta($Query);		
		return $resp;
    }
	
	public function ObtenerDatosCliente()
    {
		$sql="SELECT nombre,paterno,email FROM clientes
			WHERE idcliente='$this->idCliente'";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ActualizarId()
	{
		$query="UPDATE clientes SET 
		customerid_stripe = '$this->customerid'
		WHERE idcliente = '$this->idCliente' ";
		$result = $this->db->consulta($query);
	}

    public function ActualizarLastCard()
	{
		if ($this->lastcard == "null"){
		$query="UPDATE clientes SET 
		lastcard_stripe = NULL
		WHERE idcliente = '$this->idCliente' ";
		}
		else
		{
        $query="UPDATE clientes SET 
		lastcard_stripe = '$this->lastcard'
		WHERE idcliente = '$this->idCliente' ";
		}
		$result = $this->db->consulta($query);
    }

	public function RegistrarIntentoPago()
	{
		
		$sql = "INSERT INTO pagostripe (idtransaccion, idnotaremision, monto, digitostarjeta, idcliente, estatus, fechatransaccion) 
		VALUES ('$this->idTransaccion',$this->idNotaRemision,$this->monto,'$this->digitosTarjeta',$this->idCliente,'$this->estatus','$this->fechaTransaccion')";	
		
		$result = $this->db->consulta($sql);
		
	}


	  public function ObtenerIDCustomer()
	{
		$Query="SELECT customerid_stripe FROM customerstripe WHERE idcliente = '$this->idCliente' and skeystripe='$this->skey'";
		$resp=$this->db->consulta($Query);		
		return $resp;
	}

	public function GuardarIdCustomer(){

		$query = "INSERT INTO customerstripe (skeystripe,idcliente,customerid_stripe) VALUES ('$this->skey','$this->idCliente','$this->customerid');";
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
		$sql = "INSERT INTO intentospagosfallidos (idtransaccion, idnotaremision, monto, digitostarjeta, idcliente, estatus, fechatransaccion) 
		VALUES ('$this->idTransaccion',$this->idNotaRemision,$this->monto,'$this->digitosTarjeta',$this->idCliente,'$this->estatus','$this->fechaTransaccion')";	
		
		$result = $this->db->consulta($sql);
	}


}