<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Importamos las clases que vamos a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Zonas.php");
require_once("clases/class.Fechas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$servicio = new Servicios();
	$f = new Funciones();
	$zonas=new Zonas();
	//enviamos la conexión a las clases que lo requieren
	$servicio->db=$db;
	$zonas->db=$db;
	$fechas=new Fechas();
	$fechas->db=$db;
	//Recbimos parametros
	$servicio->idservicio = trim($_POST['idservicio']);
	$obtenerzonas=$zonas->ObtZonasActivos();
	$obtener=$servicio->ObtenerHorariosSemana($servicio->idservicio);

	$obtenerservicio=$servicio->ObtenerServicio();


	$obtenerservicio=$servicio->ObtenerServicio();
	$arraydias=array();

	for ($i = 0; $i < count($obtener); $i++) { 
    // Formatear la fecha
    $fechaformato = $fechas->fecha_texto5($obtener[$i]->fecha);
    
    if (count($arraydias) > 0) {
        $encontrado = 0;
        
        for ($j = 0; $j < count($arraydias); $j++) { 
            if ($arraydias[$j]['fecha'] == $obtener[$i]->fecha) {
                // Si la fecha ya existe en $arraydias, agregar los horarios posibles
                $horarios = array(
                    'horainicial' => $obtener[$i]->horainicial,
                    'horafinal' => $obtener[$i]->horafinal,
                    'disponible' => 1
                );
                array_push($arraydias[$j]['horasposibles'], $horarios);
                $encontrado = 1;
                break;
            }
        }

        if ($encontrado == 0) {
            // Si no se encontró la fecha, agregar un nuevo objeto con la fecha y horarios
            $horarios = array(
                'horainicial' => $obtener[$i]->horainicial,
                'horafinal' => $obtener[$i]->horafinal,
                'disponible' => 1
            );
            
            $arrayobjeto = array(
                'fecha' => $obtener[$i]->fecha,
                'fechaformato' => $fechaformato,
                'horasposibles' => array($horarios)  // Inicializamos como un array con el primer horario
            );

            array_push($arraydias, $arrayobjeto);
        }
    } else {
        // Si $arraydias está vacío, agregar el primer objeto
        $horarios = array(
            'horainicial' => $obtener[$i]->horainicial,
            'horafinal' => $obtener[$i]->horafinal,
            'disponible' => 1
        );

        $arrayobjeto = array(
            'fecha' => $obtener[$i]->fecha,
            'fechaformato' => $fechaformato,
            'horasposibles' => array($horarios)  // Inicializamos como un array con el primer horario
        );
        
        array_push($arraydias, $arrayobjeto);
    }
}



	$respuesta['arraydias']=$arraydias;
	$respuesta['respuesta']=$obtener;
	$respuesta['servicio']=$obtenerservicio[0];
	$respuesta['zonas']=$obtenerzonas;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>