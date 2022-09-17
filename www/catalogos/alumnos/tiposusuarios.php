<?php
require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

$idmenumodulo = $_GET['idmenumodulo'];

if(!isset($_SESSION['se_SAS']))
{
	//header("Location: ../login.php");
    echo "login";
	exit;
}

require_once("../../clases/conexcion.php");
require_once("../../clases/class.Tipousuario.php");
require_once('../../clases/class.Funciones.php');


try
{
	$db= new MySQL();
	$cli= new Tipousuario();
	$f=new Funciones();
	$cli->db=$db;
	$cli->tipo=$_POST['tipos'];
	$tipodeusuarios=$cli->ObtTipousuarioCliente();
	
	echo json_encode($tipodeusuarios);
	
}
catch(Exception $e)
{
	$db->rollback();
	     $v = explode ('|',$e);

		// echo $v[1];

	     $n = explode ("'",$v[1]);

		 $n[0];

		 echo $db->m_error($n[0]);	
}
?>