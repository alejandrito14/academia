<?php
include_once("toexcel.php");
include_once("Classes/PHPExcel.php");

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}


$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/


//Importamos nuestras clases
require_once("../../clases/conexcion.php");




function getreportefin($parametros){
$tipo = $parametros["tipo2"];
$finicio = $parametros["finicio"];
$ffin = $parametros["ffin"];
$horainicio=$parametros['horainicio'];
$horafin=$parametros['horafin'];
$estatusaceptado=$parametros['estatusaceptado'];
$estatuspagado=$parametros['estatuspagado'];
$v_coaches=$parametros['v_coaches'];


if (isset($_GET['fechainicio'])) {

		if ($_GET['fechainicio']!='') {
		
		$fechainicio=$_GET['fechainicio'];

		
		}
	}

	if (isset($_GET['fechafin'])) {
		if ($_GET['fechafin']!='') {

		$fechafin=$_GET['fechafin'];
	
			
		}
	}

	if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  fechamin>= '$fechainicio' AND fechamin <='$fechafin'";
	}


		if (isset($_GET['fechainiciopago'])) {

		if ($_GET['fechainiciopago']!='') {
		
		$fechainiciopago=$_GET['fechainiciopago'];
	
			$fechainiciopago=$fechainiciopago.' 00:00:00';
		
		}
	}
	if (isset($_GET['fechafinpago'])) {

		if ($_GET['fechafinpago']!='') {
		
		$fechafinpago=$_GET['fechafinpago'];
	
			$fechafinpago=$fechafinpago.' 23:59:59';
		
		}
	}

if ($fechainiciopago!='' && $fechafinpago!='') {
		$sqlfechapago=" AND  fechareporte>= '$fechainiciopago' AND fechareporte <='$fechafinpago'";
	}
if ($v_tiposervicios2!='' && $v_tiposervicios2>0) {


		$obtenercategoriasdepende=$categorias->ObtenerCategoriasGroupEstatusDepende($v_tiposervicios2);


		$categoriasid=$obtenercategoriasdepende[0]->categoriasid;

		
		$sqlcategorias=" AND idcategoriaservicio IN($categoriasid)";
	}
	

$sql = "SELECT *FROM (SELECT
    usuarios_servicios.*,
		servicios.titulo,
		servicios.modalidad,
		servicios.precio,
				usuarios.nombre,
				usuarios.paterno,
				usuarios.telefono,
				usuarios.materno,
				usuarios.email,
				usuarios.celular,
						usuarios.tipo,
(SELECT COUNT(*) FROM usuariossecundarios WHERE usuariossecundarios.idusuariotutorado=usuarios.idusuarios AND usuariossecundarios.sututor=1) as tutor,
		
		
		  (
            SELECT COUNT(*)
            FROM notapago_descripcion
            JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
            JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago
            WHERE pagado = 1
                AND notapago.estatus = 1
                AND pagos.idservicio = usuarios_servicios.idservicio
                AND pagos.idusuarios = usuarios_servicios.idusuarios
        ) AS pagado,
				
				  (
            SELECT MAX(notapago.fechareporte)
            FROM notapago_descripcion
            JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
            JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago
            WHERE pagado = 1
                AND notapago.estatus = 1
                AND pagos.idservicio = usuarios_servicios.idservicio
                AND pagos.idusuarios = usuarios_servicios.idusuarios
        ) AS fechareporte,

         (
            SELECT MAX(notapago.folio)
            FROM notapago_descripcion
            JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
            JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago
            WHERE pagado = 1
                AND notapago.estatus = 1
                AND pagos.idservicio = usuarios_servicios.idservicio
                AND pagos.idusuarios = usuarios_servicios.idusuarios
        ) AS folio,
				
				(	SELECT
			count( usuarios_servicios.idusuarios ) AS coaches 
		FROM
			usuarios_servicios
			INNER JOIN usuarios ON usuarios.idusuarios = usuarios_servicios.idusuarios 
		WHERE
			usuarios.tipo = 3
			AND usuarios_servicios.idservicio = servicios.idservicio AND aceptarterminos=1 AND cancelacion=0
		) AS cantidadalumnos,
		
		(
		SELECT
			GROUP_CONCAT( usuarios_servicios.idusuarios ) AS coaches 
		FROM
			usuarios_servicios
			INNER JOIN usuarios ON usuarios.idusuarios = usuarios_servicios.idusuarios 
		WHERE
			usuarios.tipo = 5 
			AND usuarios_servicios.idservicio = servicios.idservicio 
		) AS coaches ,
		( SELECT MIN( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamin,
		( SELECT MAX( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamax,
		( SELECT COUNT(*) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS cantidadhorarios,
			(SELECT idcategoriaservicio FROM servicios WHERE idservicio=usuarios_servicios.idservicio) as idcategoriaservicio

FROM
    usuarios_servicios
JOIN (
    SELECT
        idservicio,
        idusuarios,
        MAX(fechacreacion) AS ultima_fechacreacion
    FROM
        usuarios_servicios
    GROUP BY
        idservicio,
        idusuarios
) AS ultima_fecha ON usuarios_servicios.idservicio = ultima_fecha.idservicio
    AND usuarios_servicios.idusuarios = ultima_fecha.idusuarios
    AND usuarios_servicios.fechacreacion = ultima_fecha.ultima_fechacreacion
		inner join servicios on usuarios_servicios.idservicio=servicios.idservicio
		inner join usuarios ON  usuarios_servicios.idusuarios=usuarios.idusuarios
				WHERE usuarios.tipo=3 

		) as tabla where 1=1 ";


$sql.=$sqlconcan. $sqalumnoconcan. $sqlcategorias;




$data= array();
$i=0; 
if($tipo==1){
	//Se crean los objetos de clase
	$db = new MySQL();
	$result = $db->consulta($sql);
	 while ($row = $db->fetch_assoc($result)) {
     		$data[$i][0]      = $row["folioticket"];
			$data[$i][1]   	  = $row["fecha"];
			$data[$i][2]   	  = $row["idusuarios"];
			$data[$i][3]   	  = $row["cliente"];
			$data[$i][4]   	  = $row["cantidad"];
			$data[$i][5]   	  = $row["idproducto"];
			$data[$i][6]   	  = $row["producto"];
			$data[$i][7]   	  = '$'.$row["preciounitario"];
			$data[$i][8]   	  = '$'.$row["iva"];
			$data[$i][9]   	  = '$'.$row["subtotal"];
			$data[$i][10]   	  = '$'.$row["descuento"];
			$data[$i][11]   	  = '$'.$row["total"];
			$data[$i][12]   	  = $row["tipopago"];
			$data[$i][13]   	  = $row["fechareporte"];
			$i++;
		}	
		echo json_encode($data);

//echo json_encode($result);
}	
else
{
$nombre='rpt_totalizado';
	
	$objPHPExcel = new PHPExcel();
	$objPHPExcel->getProperties()->setCreator("IS-ACADEMIA")->setLastModifiedBy("IS-ACADEMIA")
	->setTitle(substr($nombre, 0, 31))->setSubject($nombre)->setDescription("Reporte Generado por Is-Academia");
	
	$db = new MySQL();
	$result = $db->consulta($sql);
	

	$i=0;
	$columns = array();
	$resultset = array();
	while($row= $db->fetch_assoc($result)){
		$resultset[] = $row;
		if($i==0)
	    	$columns = array_keys($row);
	}

if (count($resultset)>0)
{
	$colnumero= array(11);
	$objPHPExcel->getActiveSheet()->fromArray($columns,NULL,'A1');
	$objPHPExcel->getActiveSheet()->getStyle("A1:".getNameFromNumber(count($columns)-1)."1")->getFont()->setBold(true);
	$objPHPExcel->getActiveSheet()->getStyle("A1:".getNameFromNumber(count($columns)-1)."1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

	for($i=0;$i<count($resultset);$i++){
		$fila=array_values($resultset[$i]);
		for($j=0;$j<count($columns);$j++)
		{
			if(is_numeric($fila[$j]) && in_array($j,$colnumero) ){
				$objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($j,($i+2),$fila[$j],
				PHPExcel_Cell_DataType::TYPE_NUMERIC);
				$objPHPExcel->getActiveSheet()->getStyle(getNameFromNumber($j).($i+2))->getNumberFormat()
					->setFormatCode(    PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
			}
			else{
		   		$objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($j,($i+2),$fila[$j],PHPExcel_Cell_DataType::TYPE_STRING);
			}
			$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($j)->setAutoSize(true);
		}
	}
	$objPHPExcel->getActiveSheet()->setAutoFilter($objPHPExcel->getActiveSheet()->calculateWorksheetDimension());
	// Rename worksheet
	$objPHPExcel->getActiveSheet()->setTitle(substr($nombre, 0, 31));
	// Set active sheet index to the first sheet, so Excel opens this as the first sheet
	$objPHPExcel->setActiveSheetIndex(0);
	 exportXLS($nombre,$objPHPExcel);
	
}
else
	echo ("No existen Registros");

}
}
?>