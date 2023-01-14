 <?php
require_once("../../clases/class.Sesion.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Usuarios.php");

//creamos nuestra sesion.
$se = new Sesion();


if(!isset($_SESSION['se_SAS']))
{
	echo "login";
	exit;
}

 require_once("../../clases/conexcion.php");
   
   $db = new MySQL();
   $f=new Funciones();
   $cliente=new Usuarios();
   $cliente->db=$db;
/*   $sql_cliente = "SELECT * FROM clientes WHERE estatus = '1' ORDER BY nombre, paterno, materno ASC";


   $result_cliente = $db->consulta($sql_cliente);
   $result_cliente_row = $db->fetch_assoc($result_cliente);*/

   $clienteid='';
   $nombrecliente='';

   if (isset($_POST['idusuarios'])) {

	$cliente->id_usuario=$_POST['idusuarios'];

	$clienteid=$_POST['idusuarios'];
	$obtener=$cliente->ObtenerInformacionusuario();
	$row=$db->fetch_assoc($obtener);

 $nombrecliente=$f->imprimir_cadena_utf8($row['nombre'].' '.$row['paterno'].' '.$row['materno']);
   	# code...
   }


 


?>



<div id="ModalSecundaria" class="ventana">
<div id="Close" style="text-align: right">
      <img src="images/004.png" width="16" height="16" onClick="$('#ModalSecundaria').css('display','none'); $('#contenido_modal_dos').html('');" style="cursor:pointer">
</div>

    <div id="contenido_modal_dos" >
   
    </div>

</div>

<script type="text/javascript">
	$('#titulo-modal-forms').html("AGREGAR SALDO");
</script>


<form id="alta_categoria" method="post" action="">
	<div class="card">
		<div class="card-body" style="padding: 0;">
			<!--<h5 class="card-title m-b-0"></h5>-->
			<div class="form-group">
				<label>CLIENTE:</label>
				<div class="input-group">
					<input type="text" name="n_cliente" id="n_cliente" disabled title="Campo Cliente" class="form-control nombrecliente" value="<?php echo $nombrecliente; ?>" />

					<div class="input-group-append" onclick="L_Clientes_Monedero();">
						<span class="input-group-text"><i class="mdi mdi-account-search"></i></span>
					</div>
					<input type="hidden" name="cliente" id="cliente" value="<?php echo $clienteid; ?>" class="clienteid" />
					<!--<input type="hidden" name="v_idcliente" id="v_idcliente">-->
				</div>
			</div>

			<div class="form-group m-t-20">
				<label>TIPO:</label>
				<select id="tipo" name="tipo" class="form-control">
					<option value="0">ABONO</option>
					<option value="1">CARGO</option>
			   </select>
			</div>
			
			<div class="form-group m-t-20">
				<label>CANTIDAD:</label>
				<input type="text" name="cantidad" id="cantidad" class="form-control" title=" Cantidad" placeholder="CANTIDAD	" />
			</div>
			
			<div class="form-group m-t-20">
				<label>CONCEPTO:</label>
				<textarea id="concepto" name="concepto" onkeypress="mayus();" placeholder="CONCEPTO" title="Concepto" class="form-control"></textarea>
			</div>
			
						
		</div>
	</div>
		
	<div class="card">
		<div class="card-body" style="padding: 0;">			
			
		</div>
	</div>
</form>