<?php

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../../clases/class.Sesion.php");
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


require_once ("../../../clases/dompdf/autoload.inc.php");
//Importamos nuestras clases
require_once("../../../clases/conexcion.php");
require_once("../../../clases/class.Reportes.php");
require_once("../../../clases/class.Funciones.php");
require_once("../../../clases/class.Botones.php");
require_once("../../../clases/class.PagosCoach.php");
require_once("../../../clases/class.ServiciosAsignados.php");
require_once("../../../clases/class.Pagos.php");
require_once("../../../clases/class.Usuarios.php");
require_once("../../../clases/class.Servicios.php");
require_once("../../../clases/class.Fechas.php");
require_once("../../../clases/class.Notapago.php");





//Se crean los objetos de clase
$db = new MySQL();
$reporte = new Reportes();
$f = new Funciones();
$bt = new Botones_permisos();
$pagos=new Pagos();
$pagos->db=$db;
$usuarios=new Usuarios();
$usuarios->db=$db;
$fechas=new Fechas();
$nota=new Notapago();
$nota->db=$db;
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
$estatusaceptado=array('NO ACEPTADO','ACEPTADO');
$estatusapagado=array('NO PAGADO','PAGADO','PENDIENTE POR VALIDAR');
//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];
	$pantalla=$_GET['pantalla'];
    $fechainicio=$_GET['fechainicio'];
    $fechafin=$_GET['fechafin'];
	
	$sqlfechapago="";


	$sqlmanejocaja="SELECT
			cuenta.idcuenta,
			cuenta.nombre,

			clasificadorgastos.nombre AS subcuenta,
			clasificadorgastos.idclasificadorgastos

			FROM
			clasificadorgastos
			RIGHT JOIN cuenta
			ON clasificadorgastos.depende = cuenta.idcuenta";

		$resp1=$db->consulta($sqlmanejocaja);
		$cont1 = $db->num_rows($resp1);


		$arraymanejo=array();
		$contador1=0;
		if ($cont1>0) {

			while ($objeto1=$db->fetch_object($resp1)) {

				$arraymanejo[$contador1]=$objeto1;
				$contador1++;
			} 
		}
		


        $sqlformacuenta="SELECT *FROM formapagocuenta ORDER BY orden ASC";

        $resp2=$db->consulta($sqlformacuenta);
        $cont2 = $db->num_rows($resp2);


        $arrayformacuenta=array();
        $contador2=0;
        if ($cont1>0) {

            while ($objeto2=$db->fetch_object($resp2)) {

                $arrayformacuenta[$contador2]=$objeto2;
                $contador2++;
            } 
        }



        $sql3="SELECT
            cuenta.idcuenta,
            clasificadorgastos.idclasificadorgastos,
            formapagocuenta.idformapagocuenta,
            cuenta.nombre,
            clasificadorgastos.nombre AS subcuenta,
            formapagocuenta.nombre AS formapago,
            SUM(movimiento.monto) AS monto
        FROM
            movimiento

        JOIN clasificadorgastos ON movimiento.idclasificadorgastos = clasificadorgastos.idclasificadorgastos
        JOIN formapagocuenta ON movimiento.idformapagocuenta = formapagocuenta.idformapagocuenta
                join cuenta ON clasificadorgastos.depende=cuenta.idcuenta";

                if ($fechainicio!='' && $fechafin!='') {
    
                $sql3.=" WHERE movimiento.fechaoperacion>='$fechainicio' and movimiento.fechaoperacion<='$fechafin'";
                }

               $sql3.="  GROUP BY idcuenta,idclasificadorgastos,idformapagocuenta
                ";

               
        $resp3=$db->consulta($sql3);
        $cont3 = $db->num_rows($resp3);


        $arraymovimientos=array();
        $contador3=0;
        if ($cont3>0) {

            while ($objeto3=$db->fetch_object($resp3)) {

                $arraymovimientos[$contador3]=$objeto3;
                $contador3++;
            } 
        }

	
 
if($pantalla==0) {
	# code...

//id alumno/alumno/tutor/celular/tipo de servicio/id servicio/servicio/aceptado/pagado/monto
$filename = "Rep_egresos_".$idmanejocaja.".xls";
header("Content-Type: application/vnd.ms-excel charset=iso-8859-1");
header('Content-Disposition: attachment; filename="'.$filename.'"');

}

?>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
 <style>
 	.wrap2 { 
 
  height:50px;
  overflow: auto;
  width:100px;
}
 </style>
<?php

$categorias = [];
foreach ($arraymanejo as $record) {
    $nombre = $record->nombre;
    $subcuenta = $record->subcuenta;
    if (!isset($categorias[$nombre])) {
        $categorias[$nombre] = [];
    }
    $categorias[$nombre][] = $subcuenta;
}

$formasPago = [];

foreach ($arrayformacuenta as $formaPago) {
    $formasPago[] = $formaPago->nombre;
}



// Organizar los montos en un array asociativo
$montoData = [];
foreach ($arraymovimientos as $monto) {
    $cuenta = $monto->nombre;
    $subcuenta = $monto->subcuenta;
    $formapago = $monto->formapago;
    $montoValue = $monto->monto;
    if (!isset($montoData[$cuenta])) {
        $montoData[$cuenta] = [];
    }
    if (!isset($montoData[$cuenta][$subcuenta])) {
        $montoData[$cuenta][$subcuenta] = [];
    }
    $montoData[$cuenta][$subcuenta][$formapago] = $montoValue;
}

$sumas = array_fill(0, count($formasPago), 0);

echo '<table class="table  table table-striped table-bordered table-responsive vertabla" border="1">';
echo '<tr><th>CUENTA</th><th>SUBCUENTA</th>';
foreach ($formasPago as $formaPago) {
    echo '<th>' . htmlspecialchars($formaPago) . '</th>';
}

echo '<th>TOTALES</th>'; // Nueva columna para el total por fila

echo '</tr>';

foreach ($categorias as $categoria => $subcategorias) {
    $rowspan = count($subcategorias);
    $firstSubcuenta = array_shift($subcategorias);
    echo '<tr>';
    echo '<td rowspan="' . $rowspan . '">' . htmlspecialchars($categoria) . '</td>';
    echo '<td>' . htmlspecialchars($firstSubcuenta) . '</td>';
        $filaTotal = 0; // Inicializar el total por fila

     foreach ($formasPago  as $index =>  $formaPagoNombre) {
        
        $monto = isset($montoData[$categoria][$firstSubcuenta][$formaPagoNombre]) ? $montoData[$categoria][$firstSubcuenta][$formaPagoNombre] : '';

         if ($monto != '') {
            $sumas[$index] += $monto;
            $filaTotal += $monto; // Sumar el monto al total de la fila

            //$monto = '$' . $monto;
        }
        $monto=$monto!=''?'$'.$monto:'';

        echo '<td>' . htmlspecialchars($monto) . '</td>';
        
    }
    echo '<td>$' . htmlspecialchars($filaTotal) . '</td>'; // Mostrar el total de la fila

    echo '</tr>';
    
    foreach ($subcategorias as $subcategoria) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($subcategoria) . '</td>';
      $filaTotal = 0; // Inicializar el total por fila

       foreach ($formasPago as $index => $formaPagoNombre) {
            $monto = isset($montoData[$categoria][$subcategoria][$formaPagoNombre]) ? $montoData[$categoria][$subcategoria][$formaPagoNombre] : '';


             if ($monto != '') {
                $sumas[$index] += $monto;
               $filaTotal += $monto; // Sumar el monto al total de la fila

            }
            $monto=$monto!=''?'$'.number_format($monto,2,'.',','):'';
                            

            echo '<td>' . htmlspecialchars($monto) . '</td>';
        }

        echo '<td>$' . htmlspecialchars($filaTotal) . '</td>'; // Mostrar el total de la fila

        echo '</tr>';
    }
}

// Imprimir la fila de sumas
echo '<tr><td colspan="2">TOTAL</td>';
foreach ($sumas as $suma) {
    echo '<td>$' . htmlspecialchars($suma) . '</td>';
        $totalSumas += $suma; // Sumar cada suma al total general

}

echo '<td>$' . htmlspecialchars($totalSumas) . '</td>'; // Mostrar el total general

echo '</tr>';

echo '</table>';
?>

<?php 
/*use Dompdf\Dompdf;
if ($pantalla==2){


$dompdf = new DOMPDF();
$dompdf->load_html(ob_get_clean());
$dompdf->render();
$pdf = $dompdf->output();
$filename = "Rep_manejocaja_".$idmanejocaja.".xls";
file_put_contents($filename, $pdf);
$dompdf->stream($filename);

	} */
?>
