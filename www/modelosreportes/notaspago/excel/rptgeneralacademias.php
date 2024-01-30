<?php
include_once("toexcel.php");
include_once("Classes/PHPExcel.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
$dias = $parametros["dias"];
$horario = $parametros["horario"];
$tiposervicioconf = $parametros["tiposervicioconf"];
$categoria		 = $parametros["categoria"];
$categoriaserv		 = $parametros["categoriaserv"];
$canchas		 	 = $parametros["canchas"];
$edad		 		 = $parametros["edad"];
$mensualidad		 = $parametros["mensualidad"];
$formapago		 = $parametros["formapago"];
$finicio = $parametros["finicio"];
$ffin = $parametros["ffin"];
$finiciopago = $parametros["finiciopago"];
$ffinpago = $parametros["ffinpago"];
$estatusp = $parametros["estatusp"];



$sql = "SELECT 
DISTINCT
servicios.idservicio,
IFNULL(tiposervicioconfiguracion.nombre,'') as categoria, 
categorias.titulo as subcategoria,
dias.dias,
categoriasservicio.nombrecategoria as subsubcategoria,
horarios.horas as horarios,
cancha.nombre as canchas,
COACH.nombres as coach,
CONCAT(usuarios.nombre,' ', usuarios.paterno,' ', usuarios.materno) as alumno,
TIMESTAMPDIFF(YEAR,fechanacimiento,CURDATE()) as edad,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,0,
case servicios.modalidad 
when 1 then IFNULL(servicios.precio,0)
when 2 then TRUNCATE( (IFNULL(servicios.precio,0)*numerohorario.horarios)/alumnosservicios.numusuarios,2)
else 0 end) as precio ,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,0,pagosr.descuento) as descuento,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,0,
(case servicios.modalidad
when 1 then IFNULL(servicios.precio,0)
when 2 then TRUNCATE( (IFNULL(servicios.precio,0)*numerohorario.horarios)/alumnosservicios.numusuarios,2) end )  - pagosr.descuento) as montocondescuento,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,'',date_format(pagosr.fechareporte,'%d-%m-%Y')) as fechareporte,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,'',pagosr.folio) as folio,
IFNULL(pagosr.monederousado,0) as pagoconbono,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,0,
case servicios.modalidad
when 1 then IFNULL(servicios.precio,0) - IFNULL(pagosr.monederousado,0)
when 2 then TRUNCATE( (IFNULL(servicios.precio,0)*numerohorario.horarios)/alumnosservicios.numusuarios,2)
else 0 end  - pagosr.descuento - IFNULL(pagosr.monederousado,0)) as otraformapago,
if ( pagosr.estatus<>2 AND pagosr.estatusnota<>1,0,
case servicios.modalidad
when 1 then IFNULL(servicios.precio,0) - IFNULL(pagosr.monederousado,0)
when 2 then TRUNCATE( (IFNULL(servicios.precio,0)*numerohorario.horarios)/alumnosservicios.numusuarios,2)
else 0 end  - pagosr.descuento) as montoreal

from usuarios_servicios
LEFT JOIN servicios ON usuarios_servicios.idservicio=servicios.idservicio 
LEFT JOIN usuarios  ON usuarios_servicios.idusuarios = usuarios.idusuarios AND  usuarios.tipo=3
LEFT JOIN tiposervicioconfiguracion ON servicios.idtiposervicioconfiguracion = tiposervicioconfiguracion.idtiposervicioconfiguracion
LEFT JOIN categorias ON servicios.idcategoriaservicio = categorias.idcategorias
LEFT JOIN (SELECT idservicio, GROUP_CONCAT(Dia) as dias FROM (SELECT idservicio, 
CASE dia WHEN 0 THEN 'Domingo'
WHEN 1 THEN 'Lunes'
WHEN 2 THEN 'Martes'
WHEN 3 THEN 'Miercoles'
WHEN 4 THEN 'Jueves'
WHEN 5 THEN 'Viernes'
WHEN 6 THEN 'Sabado'
ELSE '' END  as Dia   
FROM horariosservicio ";
if($dias<>'')
	$sql = $sql." WHERE FIND_IN_SET(horariosservicio.dia,'$dias')";
$sql = $sql." GROUP BY idservicio, dia)as X
GROUP BY X.idservicio
)as dias ON servicios.idservicio = dias.idservicio
LEFT JOIN categoriasservicio ON servicios.idcategoria = categoriasservicio.idcategoriasservicio
LEFT JOIN 
(
SELECT idservicio, GROUP_CONCAT(horas) as horas FROM (SELECT idservicio, 
CONCAT(horariosservicio.horainicial,'-',horariosservicio.horafinal) as horas
FROM horariosservicio ";
if($horario<>'')
	$sql = $sql." WHERE FIND_IN_SET(CONCAT(horariosservicio.horainicial,'-',horariosservicio.horafinal),'$horario')";
$sql=$sql." GROUP BY idservicio, horainicial,horafinal)as X
GROUP BY X.idservicio

)as horarios ON  servicios.idservicio = horarios.idservicio
LEFT JOIN 
(SELECT X.idservicio, GROUP_CONCAT(X.nombre) as nombres FROM (SELECT usuarios.idusuarios, idservicio, usuarios.nombre as nombre   from usuarios_servicios 
LEFT JOIN usuarios ON usuarios_servicios.idusuarios = usuarios.idusuarios
WHERE usuarios.tipo=5) as X GROUP BY X.idservicio) as COACH ON usuarios_servicios.idservicio = COACH.idservicio
LEFT JOIN 
(
SELECT idservicio, GROUP_CONCAT(cancha) as nombre FROM (select idservicio, horariosservicio.idzona, zonas.nombre as cancha
from horariosservicio
LEFT JOIN zonas ON horariosservicio.idzona= zonas.idzona";
if($canchas<>'')
	$sql = $sql." WHERE FIND_IN_SET(zonas.idzona,'$canchas')";

$sql=$sql." GROUP BY idservicio, idzona) as X GROUP BY idservicio
)as cancha ON usuarios_servicios.idservicio = cancha.idservicio
LEFT JOIN 
(SELECT usuarios_servicios.idservicio,  IFNULL(count(usuarios_servicios.idusuarios),0) numusuarios from usuarios_servicios
LEFT JOIN usuarios ON usuarios_servicios.idusuarios = usuarios.idusuarios
where usuarios.tipo=3 and usuarios_servicios.aceptarterminos=1 and usuarios_servicios.cancelacion=0
GROUP BY  usuarios_servicios.idservicio)as alumnosservicios ON usuarios_servicios.idservicio = alumnosservicios.idservicio

LEFT JOIN
(select idservicio, IFNULL(count(horariosservicio.idhorarioservicio),0)as horarios from horariosservicio
GROUP BY idservicio
)AS numerohorario ON usuarios_servicios.idservicio = numerohorario.idservicio
LEFT JOIN (
SELECT idservicio,idusuarios,pagos.idpago, notapago.idnotapago, pagos.pagado, pagos.estatus,notapago.folio,notapago.estatus as notaestatus, IFNULL(notapago_descripcion.monto,0) as monto,  notapago.estatus as estatusnota,fechareporte,tipodepago.tipo,SUM(CASE WHEN  notapago.estatus =1 AND  pagodescuento.montoadescontar is not null then pagodescuento.montoadescontar else 0 end) as descuento,notapago_descripcion.monto as montonota,notapago_descripcion.monederousado
from pagos 
LEFT JOIN notapago_descripcion on pagos.idpago = notapago_descripcion.idpago
LEFT JOIN notapago on notapago_descripcion.idnotapago = notapago.idnotapago
LEFT JOIN tipodepago on notapago.idtipopago = tipodepago.idtipodepago
LEFT JOIN pagodescuento  on pagodescuento.idnotapago = notapago.idnotapago AND pagos.idpago = pagodescuento.idpago
where  idservicio<>0
GROUP BY idusuarios,idservicio
ORDER BY pagos.idservicio
)as pagosr ON usuarios_servicios.idservicio= pagosr.idservicio AND pagosr.idusuarios = usuarios_servicios.idusuarios
LEFT JOIN(
select idservicio ,MIN(fecha) as fecha from horariosservicio
GROUP BY idservicio
)as fechaminima ON fechaminima.idservicio = usuarios_servicios.idservicio
WHERE usuarios.tipo=3 and usuarios_servicios.cancelacion=0";
if($tiposervicioconf<>'')
	$sql = $sql." AND FIND_IN_SET(servicios.idtiposervicioconfiguracion,'$tiposervicioconf')";
if($categoria<>'')
	$sql = $sql." AND FIND_IN_SET(servicios.idcategoriaservicio,'$categoria')";
if($categoriaserv<>'')
	$sql = $sql." AND FIND_IN_SET(servicios.idcategoria,'$categoriaserv')";
if($dias<>'')
	$sql = $sql."  AND dias is not null";
if($horario<>'')
	$sql = $sql."  AND horarios.horas is not null";
if($canchas<>'')
	$sql = $sql."  AND cancha.nombre is not null";
if($edad<>'')
	$sql = $sql."  AND FIND_IN_SET(TIMESTAMPDIFF(YEAR,fechanacimiento,CURDATE()),'$edad')";
if($mensualidad<>'')
	$sql = $sql."  AND FIND_IN_SET(servicios.precio,'$mensualidad')";
if($formapago<>'')
	$sql = $sql."  AND FIND_IN_SET(pagosr.tipopago,'$formapago')";
if($formapago<>'')
	$sql = $sql."  AND FIND_IN_SET(pagosr.tipopago,'$formapago')";
if($finicio<>'' AND $ffin<>'')
	$sql = $sql."  AND fechaminima.fecha>= STR_TO_DATE('$finicio','%Y-%m-%d') AND fechaminima.fecha<= STR_TO_DATE('$ffin','%Y-%m-%d')";
if($finiciopago<>'' AND $ffinpago<>'' AND  stripos($estatusp, "1")!== false)
	$sql = $sql."  AND pagosr.fechareporte>= STR_TO_DATE('$finiciopago','%Y-%m-%d') AND pagosr.fechareporte<= STR_TO_DATE('$ffinpago','%Y-%m-%d')";
if($estatusp=='0')
	$sql = $sql."  AND pagosr.estatus<>2 AND pagosr.estatusnota<>1";
if($estatusp=='1')
	$sql = $sql."  AND pagosr.estatus=2 AND pagosr.estatusnota=1";


$data= array();
$i=0; 
if($tipo==1){
	//Se crean los objetos de clase
	$db = new MySQL();
	$result = $db->consulta($sql);
	 while ($row = $db->fetch_assoc($result)) {
     		$data[$i][0]      = $row["idservicio"];
			$data[$i][1]   	  = $row["categoria"];
			$data[$i][2]   	  = $row["subcategoria"];
			$data[$i][3]   	  = $row["dias"];
			$data[$i][4]   	  = $row["subsubcategoria"];
			$data[$i][5]   	  = $row["horarios"];
			$data[$i][6]   	  = $row["canchas"];
			$data[$i][7]   	  = $row["coach"];
			$data[$i][8]   	  = $row["alumno"];
			$data[$i][9]   	  = $row["edad"];
			$data[$i][10]   	  = $row["precio"];
			$data[$i][11]   	  = $row["descuento"];
			$data[$i][12]   	  = $row["montocondescuento"];
			$data[$i][13]   	  = $row["fechareporte"];
			$data[$i][14]   	  = $row["folio"];
			$data[$i][15]   	  = $row["pagoconbono"];
			$data[$i][16]   	  = $row["otraformapago"];
			$data[$i][17]   	  = $row["montoreal"];
			$i++;
		}	
		echo json_encode($data);

//echo json_encode($result);
}	
else
{
$nombre='generalacademias';
	
	$objPHPExcel = new PHPExcel();
	$objPHPExcel->getProperties()->setCreator("IS-ACADEMIA")->setLastModifiedBy("IS-ACADEMIA")
	->setTitle(substr($nombre, 0, 31))->setSubject($nombre)->setDescription("Reporte Generado por Is-Academia");
	
	$db = new MySQL();
	$result = $db->consulta($sql);
	

	$i=0;
	$columns = array();
	$resultset = array();
	while($row= $db->fetch_array_assoc($result)){
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