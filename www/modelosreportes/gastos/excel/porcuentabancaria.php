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
    $idcuentabancaria=$_GET['cuentabancaria'];
    $fechainicio=$_GET['fechainicio'];
    $fechafin=$_GET['fechafin'];


	
	$sqlfechapago="";


	$sqlmanejocaja="
SELECT 
    m.idformapagocuenta,
    fp.nombre AS formapago,
         c.idcuenta,
        c.nombre,
        sc.idclasificadorgastos,
    sc.nombre AS clasificadorgasto,
   

    sum(m.monto) as total
FROM 
    movimiento m

LEFT JOIN 
    clasificadorgastos sc ON sc.idclasificadorgastos = m.idclasificadorgastos
JOIN 
    formapagocuenta fp ON m.idformapagocuenta = fp.idformapagocuenta
JOIN cuenta c on sc.depende=c.idcuenta
WHERE 
    fp.idformapagocuenta = '$idcuentabancaria'";

 if ($fechainicio!='' && $fechafin!='') {
    
    $sqlmanejocaja.=" m.fechaoperacion>='$fechainicio' and m.fechaoperacion<='$fechafin'";
    }
   

    $sqlmanejocaja.="
    GROUP BY  clasificadorgasto,formapago
";

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

// Suponiendo que $arraymanejo es un array de objetos que ya está definido en tu script

// Agrupar datos por cuenta (nombre)
$grouped_data = [];
$cuentabancaria = "";
$totals = [];
foreach ($arraymanejo as $item) {
    $cuentabancaria = $item->formapago;
    if (!isset($grouped_data[$item->nombre])) {
        $grouped_data[$item->nombre] = [];
        $totals[$item->nombre] = 0;
    }
    $grouped_data[$item->nombre][] = $item;
    $totals[$item->nombre] += floatval($item->total); // Convertir a float y sumar al total
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla de Egresos</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .group-header {
            background-color: #d9d9d9;
            font-weight: bold;
            cursor: pointer;
        }
        .hidden-row {
            display: none;
        }
    </style>
    <script>
        function toggleRows(groupName) {
            var rows = document.querySelectorAll('.row-' + groupName);
            rows.forEach(function(row) {
                if (row.style.display === 'none') {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    </script>
</head>
<body>
    <h2><?php echo htmlspecialchars($cuentabancaria, ENT_QUOTES, 'UTF-8'); ?></h2>
    <table class="table table-striped table-bordered table-responsive vertabla" border="1">
        <thead>
            <tr>
                <th>Cuenta</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $totales = 0;
            $contador=0;
            foreach ($grouped_data as $cuenta => $items) {

                // Imprimir encabezado de grupo (cuenta)
                echo "<tr class='group-header' onclick='toggleRows(\"" . htmlspecialchars($contador, ENT_QUOTES, 'UTF-8') . "\")'>";
                echo "<td>{$cuenta}</td>";
                echo "<td>\${$totals[$cuenta]}</td>";
                echo "</tr>";

                // Imprimir detalles de cada ítem en el grupo
                foreach ($items as $item) {
                    echo "<tr class='hidden-row row-" . htmlspecialchars($contador, ENT_QUOTES, 'UTF-8') . "'>";
                    echo "<td>{$item->clasificadorgasto}</td>";
                    echo "<td>\${$item->total}</td>";
                    echo "</tr>";

                    $totales += $item->total;
                }
                 $contador++;
            }

            echo "<tr class='group-header'>";
            echo "<td>Total general</td>";
            echo "<td>\${$totales}</td>";
            echo "</tr>";
            ?>
        </tbody>
    </table>
</body>
</html>




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
