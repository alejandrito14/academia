<?php
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Ventas.php");
require_once("../../clases/fpdf/fpdf.php");
require_once("../../clases/class.Fechas.php");

$db = new MySQL ();
$fecha = new Fechas ();
$ventas = new Ventas();

$ventas->db = $db ;

$ventas->id_notaremision = $_GET['id'];




class PDF extends FPDF
{
// Cabecera de página
function Header()
{
	//$id = $_GET['id'];
	
    // Logo
    
    // Arial bold 15
	$this->SetX(80);
    $this->SetFont('Arial','B',20);
    // Movernos a la derecha
   
    // Título
    //$this->Cell(30,10,'ORDEN DE COMPRA',0,0,'C');
	
    // Salto de línea
	$this->Ln(18);
	
	$this->SetFont('Arial','',14);
	
	$this->Cell(100,5,"ORDEN DE PEDIDO JOYERIA KL",0,1);
	
	$this->Image('logo.png',150,18,33);
	$this->Cell(100,5,'Calle 7a Oriente entre 1a y 2a Sur ',0,1);
	$this->Cell(100,5,'Telefono: 96116545418',0,1);
	$this->Cell(100,5,'Correo: info@joyeriakl.com',0,0);
	$this->SetX(150);
	$this->Cell(100,5, utf8_decode(" "),0,1);
	$this->Line(10,50,200,50);
    $this->Ln(10);
}

// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,utf8_decode('Página').$this->PageNo().'/{nb}',0,0,'C');
}

//termina pie de página
}//TERMINA EXPENDEN DE PDF


// Creación del objeto de la clase heredada
$pdf = new PDF ();

$pdf->AddPage();

$pdf->SetX(20);
$cliente = $ventas->verClientePedido();

$pdf->Cell(100,10,"Cliente : ".$cliente['clientes'],0,1);
$pdf->SetX(20);
$pdf->Cell(100,10,"Id pedido :".$ventas->id_notaremision,0,0);

$pdf->Ln(10);

$pdf->SetX(20);
$pdf->Cell(45,10,"ID PRODUCTO",1,0,'C');
$pdf->Cell(70,10,"NOMBRE",1,0,'C');
$pdf->Cell(20,10,"PRECIO",1,0,'C');
$pdf->Cell(30,10,"CANTIDAD",1,0,'C');
$pdf->Ln();

 $productos = $ventas->listarProdctosenPedido();
	 
	     foreach($productos as $p )
    {
				$pdf->SetX(20);
				$pdf->SetFontSize(12);
				$pdf->Cell(45,10,$p->idproducto,1,0,'C');
				$pdf->Cell(70,10,$p->nombre,1,0,'C');
				$pdf->Cell(20,10,$p->pv,1,0,'C');
				$pdf->Cell(30,10,$p->cantidad,1,0,'C');
				$pdf->Ln(10);
      }
$pdf->Output();

?>