<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";

require_once "clases/class.Funciones.php";
require_once "clases/class.MovimientoBitacora.php";
require_once "clases/class.Usuarios.php";
require_once "clases/class.Costosenvio.php";

require_once "clases/class.UsoCupon.php";
require_once "clases/class.Cupones.php";

require_once("clases/class.ClienteStripe.php");
require_once("clases/class.Tipodepagos.php");
require_once("clases/class.PagConfig.php");

include 'stripe-php-7.93.0/init.php';
$obj = new ClienteStripe();
$folio = "";


$pagos=json_decode($_POST['pagos']);
$constripe=$_POST['constripe'];






?>