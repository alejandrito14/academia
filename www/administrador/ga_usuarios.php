<?php
require_once("../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();


if(!isset($_SESSION['se_SAS']))
{
	/* header("Location: ../login.php"); */ echo "login";
	exit;
}

require_once("../clases/conexcion.php");
require_once("../clases/class.Usuarios.php");
require_once('../clases/class.MovimientoBitacora.php');
require_once("../clases/class.Funciones.php");


try
{
	$db= new MySQL();
	$us= new Usuarios();
	$md = new MovimientoBitacora();
	$f = new Funciones();
	
	$us->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	$id = $_POST['v_id'];
	
	if($id == 0)
	{
	
	
	//recibiendo datos
	$us->idperfiles = $_POST['idperfiles'];
	$us->idpuesto = $_POST['idpuesto'];
	$us->nombre= trim($f->guardar_cadena_utf8($_POST['nombre']));
	$us->paterno=trim($f->guardar_cadena_utf8($_POST['paterno']));
	$us->materno=trim($f->guardar_cadena_utf8($_POST['materno']));
	$us->celular=trim($_POST['celular']);
	$us->telefono=trim($_POST['telefono']);
	$us->email=trim($f->guardar_cadena_utf8($_POST['email']));
	$us->usuario=trim($f->guardar_cadena_utf8($_POST['usuario']));
	$us->clave=trim($f->guardar_cadena_utf8($_POST['clave']));
	$us->idempresas_sucursal = $_POST['sucursal'];
	$us->tipo = $_POST['tipo_usuario'];
	$us->alias=$_POST['alias'];
	$us->sexo=$_POST['v_sexo'];
	$us->fechanacimiento=$_POST['v_fechanacimiento'];
	$us->estatus=$_POST['estatus'];
	//$us->tipo_usuario = $_POST['tipo_usuario'];
	//guardando
	$us->GuardarUsuario();
	$md->guardarMovimiento($f->guardar_cadena_utf8('Administrador'),'usuarios',$f->guardar_cadena_utf8('Nuevo Usuario creado -'.$_POST['usuario']));
	
		
	}else
	{
	
		//recibiendo datos
	$us->id_usuario=$_POST['v_id'];
	$us->idperfiles=$_POST['idperfiles'];
	$us->nombre=trim($f->guardar_cadena_utf8($_POST['nombre']));
	$us->paterno=trim($f->guardar_cadena_utf8($_POST['paterno']));
	$us->materno=trim($f->guardar_cadena_utf8($_POST['materno']));
	$us->celular=trim($_POST['celular']);
	$us->telefono=trim($_POST['telefono']);
	$us->email=trim($f->guardar_cadena_utf8($_POST['email']));
	$us->usuario=trim($f->guardar_cadena_utf8($_POST['usuario']));
	$us->clave=trim($f->guardar_cadena_utf8($_POST['clave']));
	$us->estatus=$_POST['estatus'];
	$us->idempresas_sucursal = $_POST['sucursal'];
	$us->tipo_usuario = $_POST['tipo_usuario'];
	$us->alias=$_POST['alias'];
	$us->sexo=$_POST['v_sexo'];
	$us->fechanacimiento=$_POST['v_fechanacimiento'];
	
	$tipo = $_POST['tipo'];


	//Validamos que sea superUsuario
	if($tipo == 0){
		$us->tipo = 0;
	}else{
		$us->tipo = 1;
	}
	
		
	//guardando
	$us->ModificarUsuario();	
	$md->guardarMovimiento($f->guardar_cadena_utf8('Administrador'),'usuarios',$f->guardar_cadena_utf8('Modificación de Usuario -'.$_POST['usuario']));
		
	}
	
	$db->commit();
	echo 1;
	
	
}
catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>