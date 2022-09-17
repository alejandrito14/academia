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
require_once("../clases/class.Funciones.php");
require_once("../clases/class.Tipousuario.php");

$db = new MySQL();
$us = new Usuarios();
$fu = new Funciones();
$tipousuario = new Tipousuario();

$us->db=$db;
$tipousuario->db=$db;
$queryPerfil="SELECT idperfiles, perfil FROM perfiles WHERE estatus=1";
$resp= $db->consulta($queryPerfil);
$rows= $db->fetch_assoc($resp);
$total=$db->num_rows($resp);

$sololectura = 0;
$datos = null;

$obtenertipos=$tipousuario->ObtTipousuarioActivosSistema();

if(isset($_GET['id']))
{
	 
	$queryPerfil="SELECT idperfiles, perfil FROM perfiles WHERE estatus=1";
	$resp= $db->consulta($queryPerfil);
	$rows= $db->fetch_assoc($resp);
	$total=$db->num_rows($resp);
	
	$us->id_usuario=$_GET['id'];	
	$idusuario = $_GET['id'];
	$datos = $us->ObtenerDatosUsuario();

	$v_sexo=$datos['sexo'];
	$v_edad=$datos['fechanacimiento'];

	$sololectura = 1;
	
	$estatus = $datos['estatus'];

	$titulo="EDITAR USUARIO";

$fotoperfil=$datos['foto'];
if($fotoperfil==""){
		$rutaperfil="images/sinfoto.png";
	}
	else{
	
		$rutaperfil="app/".$_SESSION['carpetaapp']."/php/upload/perfil/$fotoperfil";
	}

}else{
	$estatus = 1;
	$titulo="NUEVO USUARIO";
			$rutaperfil="images/sinfoto.png";

}

?>
<form id="alta_usuario" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h5 class="card-title m-b-0" style="float: left;"><?php echo $titulo;?></h5>

			<input type="hidden" id="v_id" name="v_id" value="<?php echo $idusuario; ?>" />
			<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
			<button type="button" id="alt_btn" onClick="
			
			var resp=MM_validateFormUsuario('nombre','','R','paterno','','R','materno','','R','email','','RisEmail','usuario','','R','clave','','R'); if(resp==1){ GuardarEspecial('alta_usuario','administrador/ga_usuarios.php','administrador/vi_usuarios.php','main');}
		



			" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i> GUARDAR</button>
 
			<button type="button" onClick="aparecermodulos('administrador/vi_usuarios.php','main');" class="btn btn-primary" style="float: right;margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
		</div>
			<div style="clear: both;"></div>


		</div>
		<div class="row">
		<div class="card-body">

			
				<div class="col-md-6">
			


		
		</div>
	</div>
	</div>


	<div class="card" id="home" role="tabpanel">
					<div class="card-header" style="margin-top: 1em;">
					<h5>DATOS DE CONFIGURACIÓN </h5>
				</div>

					<div class="card-body">
				<div class="row">

		<div class="col-md-6">
	
			<div class="form-group m-t-20" style="display: block;">
				<label>*TIPO DE USUARIO:</label>
				<!-- <select id="tipo_usuario" name="tipo_usuario"  class="form-control">

					<?php echo $datos['tipo']; ?>
					<?php if($datos['tipo']==0){ ?>
					<option value="0" <?php if($datos['tipo']==0){echo 'selected="selected"';}?>>ADMINISTRADOR</option>

				<?php } ?>
				 <option value="1" <?php if($datos['tipo']==1){echo
				 'selected="selected"';}?>>EMPLEADO</option>

				
				</select> -->

				<select id="tipo_usuario" name="tipo_usuario"  class="form-control">
					<?php 
						if (count($obtenertipos)>0) {
							for ($i=0; $i <count($obtenertipos) ; $i++) {  ?>
								<option value="<?php echo $obtenertipos[$i]->idtipousuario ?>" ><?php echo $obtenertipos[$i]->nombretipo; ?></option>

							<?php }
						}
					 ?>
				
				</select>
			</div>

				<div class="form-group m-t-20">
				<label>*PERFIL:</label>
				<select id="idperfiles" name="idperfiles" class="form-control" tabindex="107">
					<?php do{?>
					<option value="<?php echo $rows['idperfiles'];?>" <?php if($datos['idperfiles'] == $rows['idperfiles']){ echo "selected"; } ?> ><?php echo $fu->imprimir_cadena_utf8($rows['perfil']);?></option>
					<?php }while($rows= $db->fetch_assoc($resp));?>
				</select>
			</div>

		</div>
	</div>
</div>
</div>
<div class="card" >
					<div class="card-header" style="margin-top: 1em;">
					<h5>DATOS GENERALES </h5>
				</div>
				
			<div class="card-body">
				<div class="row">
				<div class="col-md-6">
						<div class="form-group m-t-20">
				<label>*CELULAR:</label>
				 <input type="text" name="celular" id="celular" class="form-control" title="Celular" value="<?php echo $fu->imprimir_cadena_utf8($datos['celular']); ?>" placeholder="CELULAR" tabindex="107" />
			</div>

			<div class="form-group m-t-20">
				<label>*ALIAS :</label>
				<input type="text" name="alias" id="alias" class="form-control" title="Alias" value="<?php echo $fu->imprimir_cadena_utf8($datos['alias']); ?>" placeholder="Alias" tabindex="108" />
			</div>

			<div class="form-group m-t-20">
				<label>*NOMBRE :</label>
				<input type="text" name="nombre" id="nombre" class="form-control" title="Nombre" value="<?php echo $fu->imprimir_cadena_utf8($datos['nombre']); ?>" placeholder="NOMBRE" tabindex="108" />
			</div>

			<div class="form-group m-t-20">
				<label>*APELLIDO PATERNO:</label>
				<input type="text" name="paterno" id="paterno" class="form-control" title="Apellido Paterno" value="<?php echo $fu->imprimir_cadena_utf8($datos['paterno']); ?>" placeholder="APELLIDO PATERNO" tabindex="109" />
			</div>

			<div class="form-group m-t-20">
				<label>*APELLIDO MATERNO:</label>
				<input type="text" name="materno" id="materno" class="form-control" title="Apellido Materno" value="<?php echo $fu->imprimir_cadena_utf8($datos['materno']); ?>" placeholder="APELLIDO MATERNO" tabindex="110"/>
			</div>
			
			<div class=" form-group  ">
							
								<label>*GÉNERO:</label>
								<select name="v_sexo" id="v_sexo" title="sexo" class="form-control">
									<option value="H" <?php if("H" == $v_sexo ){ echo "selected"; } ?>>HOMBRE</option>
									<option value="M" <?php if("M" == $v_sexo ){ echo "selected"; } ?>>MUJER</option>
								</select>
							</div>	


							<div class="">
						<label>*FECHA DE NACIMIENTO:</label>
					  <input name="v_fechanacimiento" id="v_fechanacimiento" title="FECHA DE NACIMIENTO" type="date" class="form-control" placeholder="FECHA DE NACIMIENTO" required="" value="<?php echo $v_edad;?>">
					</div>

				<div class="form-group m-t-20">
				<label>*EMAIL:</label>
				<input type="text" name="email" id="email" class="form-control" title="Email" value="<?php echo $fu->imprimir_cadena_utf8($datos['email']); ?>" placeholder="EMAIL"  tabindex="113"/>
			</div>

			<div class="form-group m-t-20" style="display: none;">
				<label>TEL&Eacute;FONO:</label>
				<input type="text" name="telefono" id="telefono" class="form-control" title="Tel&eacute;fono" value="<?php echo $fu->imprimir_cadena_utf8($datos['telefono']); ?>" placeholder="TEL&Eacute;FONO" tabindex="112"/>
			</div>

	

		</div>
			<div class="col-md-6">
						<div class="form-group ">
						<label>FOTO DE PERFIL:</label>
					 	<div>
					 	</div>

					 		<form method="post" action="#" enctype="multipart/form-data">
								    <div class="card" style="width: 18rem;margin: auto;margin-top: 3em;">
								        <img class="card-img-top" src="">
								        <div id="d_foto" style="text-align:center; ">
											<img src="<?php echo $rutaperfil; ?>" class="card-img-top " alt="" style="border: 1px #777 solid;    border-radius: 20px; "> 
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">

								               <!--  <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagen()"> -->
								            </div>
								         
								        </div>
								    </div>
								</form>
					 		
					 	</div>
					</div>

	</div>
</div>
</div>

<div class="card" >
					<div class="card-header" style="margin-top: 1em;">
						<h5>DATOS DE ACCESO</h5>
					</div>
				
			<div class="card-body">
				<div class="row">
			    	<div class="col-md-6">


			<div class="form-group m-t-20">
				<label>*USUARIO:</label>
				<input onKeyPress="bloquear_enie (event.Keycode)" type="text" onBlur="var resp=MM_validateForm('usuario','','R'); if(resp==1){validarUsuario();}" name="usuario" id="usuario" class="form-control" title="Usuario" placeholder="USUARIO" value="<?php echo $fu->imprimir_cadena_utf8($datos['usuario']); ?>" />
				<span style="float:left; font-size: 10px;" id="msj_error">&nbsp;</span>
				<div id="mensajes" class="width_3_quarter"></div>
            	<input type="hidden" name="user_valid" id="user_valid" value="no"  title="Usuario Válido" tabindex="114"/>
			</div>
			
			<!-- <div class="form-group m-t-20">
				<label>*CLAVE:</label>
				<input type="password" name="clave" id="clave" class="form-control" title="Clave" value="<?php echo $fu->imprimir_cadena_utf8($datos['clave']); ?>" tabindex="115" placeholder="CLAVE" />
			</div> -->

			<div class="form-group m-t-20">
					<label>*CONTRASEÑA:</label>
					<div class="input-group mb-3">

						<input type="password" name="clave" id="clave" class="form-control" title="CONTRASEÑA" value="<?php echo $fu->imprimir_cadena_utf8($datos['clave']); ?>" tabindex="115"placeholder="CLAVE">

						<div class="input-group-append">
							<button class="btn " type="button">
								<span class="icon1 fa fa-eye-slash" onclick="mostrarPassword('clave','icon1')" style="text-align: center;"></span>
							</button>
						</div>
					</div>
					</div>

					<div class="form-group m-t-20">
						<label>*CONFIRMAR CONTRASEÑA:</label>
						<div class="input-group mb-3">

							<input type="password" name="clave2" id="clave2" tabindex="116" class="form-control" title="CONFIRMAR CONTRASEÑA" value="<?php echo $fu->imprimir_cadena_utf8($datos['clave']); ?>" placeholder="CONFIRMAR CONTRASEÑA">

							<div class="input-group-append">
								<button class="btn " type="button">
									<span class="icon2 fa fa-eye-slash" onclick="mostrarPassword('clave2','icon2')" style="text-align: center;"></span>
								</button>
							</div>
						</div>

					</div>
			
			<div class="form-group m-t-20">
				<label>ESTATUS:</label>
				<select id="estatus" name="estatus"  class="form-control" tabindex="117">
					<option value="0" <?php if($estatus==0){echo 'selected="selected"';}?>>DESACTIVADO</option>
					<option value="1" <?php if($estatus==1){echo 'selected="selected"';}?>>ACTIVADO</option>
				</select>
			</div>
			</div>
<!-- 			<input type="hidden" id="tipo" name="tipo" value="<?php echo $datos['tipo']; ?>" />
 -->			
			</div>
		</div>
		
		
	</div>
</form>

<script>
	phoneFormatter('celular');
	phoneFormatter2('telefono');
	 $(document).ready( function () {
     /* $("#nombre,#paterno,#materno").on("keypress", function () {
       $input=$(this);
       setTimeout(function () {
        $input.val($input.val().toUpperCase());
       },50);
      });
*/
      	
      
     });
  
</script>