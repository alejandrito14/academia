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
	$md = new MovimientoBitacora();
	$f = new Funciones();
	
	$us->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	$id = $_POST['v_id'];
	$idusuario=$id;
	$us->id_usuario=$id;
	$us->idperfiles = 0;
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
	$tipo = $_POST['tipo'];
	$us->tipo=$tipo;
	$usuariosid=json_decode($_POST['asociados']);
	$asociadoseliminados=json_decode($_POST['asociadoseliminados']);

	if($id == 0)
	{
	
	
	//recibiendo datos
	
	//$us->tipo_usuario = $_POST['tipo_usuario'];
	//guardando
	$us->GuardarUsuario();
	$md->guardarMovimiento($f->guardar_cadena_utf8('Alumnos'),'usuarios',$f->guardar_cadena_utf8('Nuevo Usuario creado -'.$_POST['usuario']));
	
		
	}else
	{
	
		//recibiendo datos
	/*$us->id_usuario=$_POST['v_id'];
	$us->idperfiles=0;
	$us->nombre=trim($f->guardar_cadena_utf8($_POST['nombre']));
	$us->paterno=trim($f->guardar_cadena_utf8($_POST['paterno']));
	$us->materno=trim($f->guardar_cadena_utf8($_POST['materno']));
	$us->celular=trim($_POST['celular']);
	$us->telefono=trim($_POST['telefono']);
	$us->email=trim($f->guardar_cadena_utf8($_POST['email']));
	$us->usuario=trim($f->guardar_cadena_utf8($_POST['usuario']));
	$us->clave=trim($f->guardar_cadena_utf8($_POST['clave']));
	$us->estatus=$_POST['estatus'];
	$us->tipo_usuario = $_POST['tipo_usuario'];
	$us->alias=$_POST['alias'];
	$us->sexo=$_POST['v_sexo'];
	$us->fechanacimiento=$_POST['v_fechanacimiento'];

	$tipo = $_POST['tipo'];
	$us->tipo=$tipo;
*/
	
	//guardando
	$us->ModificarUsuario();	
	$md->guardarMovimiento($f->guardar_cadena_utf8('Alumnos'),'usuarios',$f->guardar_cadena_utf8('Modificación de Usuario -'.$_POST['usuario']));
		
	}


	if ($usuariosid[0]!='' && $usuariosid[0]!=null)
	{
		for ($i=0; $i < count($usuariosid); $i++) { 
		

            $v_celularaso=$usuariosid[$i]->{'v_celularaso'};
			$v_aliasaso=$usuariosid[$i]->{'v_aliasaso'};
			$nombreaso=$usuariosid[$i]->{'nombreaso'};
			$v_paternoaso=$usuariosid[$i]->{'v_paternoaso'};
			$v_maternoaso=$usuariosid[$i]->{'v_maternoaso'};
			$v_sexoaso=$usuariosid[$i]->{'v_sexoaso'};
			$v_fechanacimientoaso=$usuariosid[$i]->{'v_fechanacimientoaso'};
			$emailaso=$usuariosid[$i]->{'emailaso'};
			$v_soytutor=$usuariosid[$i]->{'v_soytutor'};
			$idalumnoasociado=$usuariosid[$i]->{'idalumnoasociado'};

			$parentesco=$usuariosid[$i]->{'parentesco'};

			 $us->estatus  = 1;
             $us->tipo=3;
             $us->usuario='';
             $us->nombre=$nombreaso;
			 $us->paterno=$v_paternoaso;
			 $us->materno=$v_maternoaso;
			 $us->fecha=$v_fechanacimientoaso;
			 $us->sexo=$v_sexoaso;
			 $us->celular=$v_celularaso;
			 $us->email=$emailaso;
			 $us->alias='';
			
			 $idusuario=$us->id_usuario;

			 if ($idalumnoasociado==0) {
			 	 $us->GuardarUsuarioTutorado();
				 $us->GuardarUsuarioyTutor($idusuario,$parentesco,$v_soytutor);
			 }
			
		}
		
	}

if ($asociadoseliminados[0]!='' && $asociadoseliminados[0]!=null)
	{
	for ($i=0; $i <count($asociadoseliminados) ; $i++) { 
			if ($asociadoseliminados[$i]->{'idalumnoasociado'}>0) {
				$us->id_usuario=$asociadoseliminados[$i]->{'idalumnoasociado'};
				$us->EliminarAsociacion($idusuario);
			}
	}

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