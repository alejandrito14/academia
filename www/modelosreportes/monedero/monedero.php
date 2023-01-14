<?php

require_once("../../clases/class.Sesion.php");
require_once('../../clases/conexcion.php');
require_once('../../clases/fpdf/fpdf.php');
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Funciones.php");

 $se = new Sesion();


$db = new MySQL();
$fecha = new Fechas();
$cli = new Usuarios();
$f=new Funciones();

$idsucursales = $_SESSION['se_sas_Sucursal'];

$tipo = array('ABONO','CARGO');
	
$cli->db = $db;
$conf->db = $db;



class PDF extends FPDF

{
	
	public $empresa;
	public $direccion;
	public $telefono;
	public $email;
	public $www;
	public $logo;
	public $idsucursales;
	public $su;
	public $db;
	public $cliente;
	public $f;
// Cabecera de página

function Header()

{

	 // Arial bold 15
    $this->SetFont('Arial','B',16);
	
	// INFORMACION CABECERA DEL LADO IZQUIERDO.
	$this->SetXY(10,5);	
	$this->Cell(190,10,'',0,1,'C');
	
	
	   // Logo
    //$this->Image('../../images/configuracion/logo.png',10,10,33);	
	
	  // Arial bold 15
    $this->SetFont('Arial','',6);
	
	$X = 15;
	$Y = 20;
	$renglones = 4;
	
	$this->SetXY(15,20);	
    //$this->Cell(35,10,$this->f->imprimir_cadena_utf8($this->empresa) ,0,1,'L');
	$this->SetXY(15,24);
    //$this->Cell(35,10,$this->f->imprimir_cadena_utf8($this->direccion),0,1,'L');
    $this->SetXY(15,28);


	//$this->Cell(35,12,'TELEFONO: '.$this->f->imprimir_cadena_utf8($this->telefono),0,1,'L');
	// INFORMACION CABECERA DEL LADO IZQUIERDO.
	

	$this->SetXY(15,30);	

    


	
	//$this->SetLineWidth(2.1);
/*	$this->Line(10,55,205,56);
    
}



// Pie de página

function Footer()

{

    // Posición: a 1,5 cm del final

    $this->SetY(-18);

    // Arial italic 8

    $this->SetFont('Arial','I',7);

    // Número de página
   /* $this->MultiCell(190,5,utf8_decode("- Le invitamos a revisar su mercancia antes de salir de la tienda."),0,'J');
	$this->MultiCell(190,5,utf8_decode("- Para poder realizar la devolución de producto es necesario presentar este comprobante de pago."),0,'J');
	$this->MultiCell(190,5,utf8_decode("- Las piezas deberán de venir en su empaque original."),0,'J');
    $this->Cell(0,10,utf8_decode('Página').$this->PageNo().'',0,0,'C');*/

}



//termina pie de página

}//TERMINA EXPENDEN DE PDF





// Creación del objeto de la clase heredada

$pdf =new PDF ('P', 'mm', 'letter');
$pdf->f=$f;


//parsear la informacion de la empresa.

//datos de la empresa

$idcliente_monedero = $_GET['id'];

//$cli->id_usuario = $idcliente_monedero;

//$empresa = $conf->ObtenerInformacionConfiguracion();


$pdf->idsucursales = $idsucursales;
$pdf->su = $su;
$pdf->db = $db;

//Obtenemos nombre del cliente
$sql = "SELECT
	monedero.fecha,
	monedero.monto,
	monedero.saldo_ant,
	monedero.saldo_act,
	monedero.concepto,
	usuarios.nombre,
	usuarios.paterno,
	usuarios.materno

FROM
	monedero
	INNER JOIN usuarios ON monedero.idusuarios = usuarios.idusuarios
WHERE
	monedero.idmonedero  = '$idcliente_monedero'";

$result_nombre = $db->consulta($sql);
$result_nombre_row = $db->fetch_assoc($result_nombre);



$pdf->www = '';
//$pdf->logo = $empresa['logo'];

$clientes = $result_nombre_row['nombre']." ".$result_nombre_row['paterno']." ".$result_nombre_row['materno'];


$pdf->cliente=$clientes;
$pdf->AddPage();
$pdf->SetMargins(10,1,0);
$pdf->SetFontSize(7);
	

$pdf->Cell(40,16,"COMPROBANTE DE DEPOSITO (SIN EFECTOS FISCALES)");
	$pdf->SetXY(15,30);	


$pdf->Cell(42,30,utf8_decode("FECHA IMPRESIÓN: ").$fecha->fechaadd_mm_YYYY_entre());
$pdf->Ln();
//$pdf->Cell(40,3,utf8_decode("NO. DEVOLUCION : ").$iddevolucion);
//$pdf->Ln();
//$pdf->Cell(40,3,utf8_decode("DESCUENTO SOCIO: ").$porc_cliente."%");
//$pdf->Ln();

//$clientes = "PUBLICO GENERAL";

/*if ($cliente['clientes'] != "")
{
	//utf8_decode($clientes = $cliente['clientes']);
	$clientes = "PUBLICO GENERAL";
}
else 
{
    $clientes = "PUBLICO GENERAL"; 
}
*/

	

$clientes=utf8_decode($clientes);
	$pdf->SetXY(15,50);	

$pdf->Cell(50,3,"CLIENTE: ".strtoupper($clientes),0,0);
$pdf->Ln();

		$sql = "SELECT * FROM monedero WHERE idmonedero = '$idcliente_monedero'";
		$result_mov = $db->consulta($sql);
		$result_mov_row = $db->fetch_assoc($result_mov);
		$result_mov_num = $db->num_rows($result_mov);

$concepto = '';
				$tip = '';
if($result_mov_num!=0)
{
	do
	{
				$idcliente = $result_mov_row['idusuarios'];
				
				
				
				$cantidaddeproductos = $cantidaddeproductos + $row_devolucion['cantidad'];
				$concepto = $result_mov_row['concepto'];
				$tip = $result_mov_row['tipo'];
	}while($result_mov_row = $db->fetch_assoc($result_mov));
}

		$pdf->SetXY(15,54);	

	$pdf->Cell(55,5,strtoupper("TIPO: ".$tipo[$tip]));
	$pdf->Ln();
		$pdf->SetXY(15,59);	

	$pdf->Cell(50,5,strtoupper("CONCEPTO: ".$concepto));
	$pdf->Ln();



$pdf->Ln();
	$pdf->SetX(15);
	$pdf->Cell(35,5,"FECHA",1,0,'C');
	//$pdf->Cell(40,5,"CONCEPTO",1,0,'C');
	$pdf->Cell(30,5,"MONTO",1,0,'C');
	$pdf->Cell(35,5,"SALDO ANTERIOR",1,0,'C');
	$pdf->Cell(35,5,"SALDO ACTUAL",1,0,'C');
	/*$pdf->Cell(27,5,"PRECIO",1,0,'C');
	$pdf->Cell(15,5,"% DESC",1,0,'C');
	$pdf->Cell(18,5,"DESC",1,0,'C');
	$pdf->Cell(20,5,"TOTAL",1,0,'C');*/
$pdf->Ln();




//die($result_mov_num." dfdf");

$cantidaddeproductos = 0;

//$result_mov = $cli->buscarMovimientoMonedero();

$sql = "SELECT * FROM monedero WHERE idmonedero = '$idcliente_monedero'";
		$resp = $db->consulta($sql);

$result_mov_row = $db->fetch_assoc($resp);
$result_mov_num = $db->num_rows($result_mov);


if($result_mov_num!=0)
{
	do
	{
				$idcliente = $result_mov_row['idcliente'];
				
				
					
	                $pdf->SetX(15);
					$pdf->SetFontSize(6);
					$pdf->Cell(35,5,$result_mov_row['fecha'],1,0,'C');
					//$pdf->Cell(40,5,$result_mov_row['concepto'],1,0,'C');
					$pdf->Cell(30,5,"$ ".$result_mov_row['monto'],1,0,'C');
					$pdf->Cell(35,5,"$ ".$result_mov_row['saldo_ant'],1,0,'C');
					$pdf->Cell(35,5,"$ ".$result_mov_row['saldo_act'],1,0,'C');
					
				$pdf->Ln(5);

				
				$cantidaddeproductos = $cantidaddeproductos + $row_devolucion['cantidad'];
				$concepto = $result_mov_row['concepto'];
				$tip = $result_mov_row['tipo'];
	}while($result_mov_row = $db->fetch_assoc($result_mov));
}





$pdf->Ln();
/*$pdf->SetX(20);
					$pdf->SetFontSize(7);
					$pdf->Cell(35,3,'',0,0,'C');
					$pdf->Cell(70,3," Cantidad: ",0,0,'R');
					$pdf->Cell(12,3,$cantidaddeproductos,0,0,'C');
					$pdf->Cell(30,3," ",0,0,'C');
					$pdf->Cell(20,3,"SUBTOTAL $ ".number_format($subtotal,2,'.',','),0,0,'R');
					$pdf->Ln();
$pdf->SetX(20);					
					$pdf->Cell(35,3,'',0,0,'C');
					$pdf->Cell(70,3," ",0,0,'R');
					$pdf->Cell(12,3," ",0,0,'C');
					$pdf->Cell(30,3," ",0,0,'C');					
					$pdf->Cell(20,3,"DESCUENTO $ ".number_format($descuento,2,'.',','),0,0,'R');
					$pdf->Ln();
$pdf->SetX(20);					
					$pdf->Cell(35,3,'',0,0,'C');
					$pdf->Cell(70,3," ",0,0,'R');
					$pdf->Cell(12,3," ",0,0,'C');
					$pdf->Cell(30,3," ",0,0,'C');					
					$pdf->Cell(20,3,"TOTAL $ ".number_format($total,2,'.',','),0,0,'R');	*/				
/**/
$pdf->Ln(10);

$pdf->SetX(20);
$pdf->Ln();
	//$pdf->SetX(10);
	/*
	$pdf->Cell(40,3,utf8_decode("SALDO ANTERIOR: ").($saldo_monedero - $total));
	$pdf->Ln();
	$pdf->Cell(40,3,utf8_decode("SALDO ACTUAL: ").$saldo_monedero);
	$pdf->Ln();

$pdf->SetX(10);
$pdf->MultiCell(190,5,utf8_decode("- Comprobante de pago en la Joyeria KL. Para cualquier cambio o aclaración es necesario el traer este comprobante de pago para poder realizarlo. Las piezas deberán de venir en su empaque original. - No se recibirá producto dañado."),0,'J');*/

$pdf->Output();

?>