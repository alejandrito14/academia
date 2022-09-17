<?php
require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();


if(!isset($_SESSION['se_SAS']))
{
	/* header("Location: ../login.php"); */ echo "login";
	exit;
}

require_once("../../clases/conexcion.php");
require_once("../../clases/class.Usuarios.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.Funciones.php");


try
{
	$db= new MySQL();
	$us= new Usuarios();
	$f = new Funciones();
	$us->db=$db;

	$obtenerusuariosasociados=$us->ObtenerUsuariosAsociados();

	$usuarios=$obtenerusuariosasociados[0]->asociados;
	$obtenertutores=$us->ObtenerTutoresConca();
	$tutores=$obtenertutores[0]->tutores;

	if ($usuarios!='') {
		$usuarios.=',';
	}
	$usuarios.=$tutores;

	$obtenerAlumnos=$us->ObtenerAlumnosSinAsignar($usuarios);

	$respuesta['respuesta']=$obtenerAlumnos;

	echo json_encode($respuesta);
	
}
catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>