<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Juego.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.RoundRobin.php');
require_once('../../clases/class.Servicios.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$juego = new Juego();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	$juego->db=$db;
	$md->db = $db;
	$round=new RoundRobin();
	$servicio = new Servicios();
	$servicio->db=$db;
	
	$db->begin();
	$arrayparejas=json_decode($_POST['arrayparejas']);
	$idservicio=$_POST['idservicio'];
	$servicio->idservicio=$idservicio;
	

	$numerosparejas=array();
	$parejas=array();
	$grupos=array();
	$objetos=array();

	$contadorpareja=count($arrayparejas);
	//echo count($arrayparejas);die();
	$equipo=array();

	for ($i=0; $i <count($arrayparejas); $i++) { 
		
		$objeto=array($arrayparejas[$i]->numeropareja);
		array_push($equipo, $objeto);



	}




//define('NUMBER_OF_PARTICIPANTS', $participantes);

function BuscarPareja($arrayparejas,$numero)
{
	for ($i=0; $i <count($arrayparejas) ; $i++) { 
		
		if ($arrayparejas[$i]->numeropareja==$numeropareja) {
			return $arrayparejas[$i];
		}
	}
}

function getBracket($participants)
{ 
    $participantsCount = count($participants);  
    $rounds = ceil(log($participantsCount)/log(2));
    $bracketSize = pow(2, $rounds);
    $requiredByes = $bracketSize - $participantsCount;

  //  echo sprintf('Number of participants: %d<br/>%s', $participantsCount, PHP_EOL);
   // echo sprintf('Number of rounds: %d<br/>%s', $rounds, PHP_EOL);
  //  echo sprintf('Bracket size: %d<br/>%s', $bracketSize, PHP_EOL);
  //  echo sprintf('Required number of byes: %d<br/>%s', $requiredByes, PHP_EOL);    

    if($participantsCount < 2)
    {
        return array();
    }

    $matches = array(array(1,2));

    for($round=1; $round < $rounds; $round++)
    {
        $roundMatches = array();
        $sum = pow(2, $round + 1) + 1;
        foreach($matches as $match)
        {
            $home = changeIntoBye($match[0], $participantsCount);
            $away = changeIntoBye($sum - $match[0], $participantsCount);
            $roundMatches[] = array($home, $away);
            $home = changeIntoBye($sum - $match[1], $participantsCount);
            $away = changeIntoBye($match[1], $participantsCount);
            $roundMatches[] = array($home, $away);
        }
        $matches = $roundMatches;
    }

    return $matches;

}

function changeIntoBye($seed, $participantsCount)
{
    //return $seed <= $participantsCount ?  $seed : sprintf('%d (= bye)', $seed);  
    return $seed <= $participantsCount ?  $seed : null;
}
$participants = range(1,$contadorpareja);
$bracket = getBracket($participants);
//echo json_encode($bracket);



/* function obtenerequipo($posicion,$posicion2)
{

 
   
 
 return $bracket[$posicion][$posicion2];
}
*/
function is_player($round, $row, $team) {
    return $row == pow(2, $round-1) + 1 + pow(2, $round)*($team - 1);
}

$num_teams = $contadorpareja/2;//$num_teams = 28;
$total_rounds = floor(log($num_teams, 2)) + 2;

$max_rows = $num_teams*2;
$team_array = array();
$unpaired_array = array();
$score_array = array();

$rondas=array();

for ($round = 1; $round < $total_rounds; $round++) {
$arrayobjeto=array();
    if ($round == 1) {
        # code...
      
        
    for ($k=0; $k < count($bracket); $k++) { 
        

        $equipop1=$bracket[$k][0];
        $equipop2=$bracket[$k][1];
        $pareja1="";
        $pareja2="";
        for ($j=0; $j <count($arrayparejas) ; $j++) { 
        
            if ($arrayparejas[$j]->numeropareja==$equipop1) {
                    $pareja1= $arrayparejas[$j];
                    break;
                }
            }


            for ($j=0; $j <count($arrayparejas) ; $j++) { 
        
            if ($arrayparejas[$j]->numeropareja==$equipop2) {
                    $pareja2= $arrayparejas[$j];
                    break;
                }
            }


            $objeto=array('id'=>$k,'p1'=>$pareja1,'p2'=>$pareja2);

           

        array_push($arrayobjeto, $objeto);
    }

}else{
   
     $valor=$num_teams/2;
    if ($valor>1) {
        # code...
    
     for ($i=0; $i < $valor; $i++) { 


        $objeto=array('id'=>$i,'p1'=>null,'p2'=>null);

        
        array_push($arrayobjeto, $objeto);
     }

     $num_teams=$valor;

    }else{
        $objeto=array('id'=>$i,'p1'=>null,'p2'=>null);

        array_push($arrayobjeto, $objeto);


    }

}

    $matches=array('matches'=>$arrayobjeto,'name'=>$round);

 array_push($rondas,$matches);
}

$array=array('rounds'=>$rondas);

$vrespuesta['respuesta']=$array;
echo json_encode($vrespuesta);
/*for ($j=0; $j <count($arrayparejas) ; $j++) { 
        
            if ($arrayparejas[$j]->numeropareja==$equipo) {
                    $pareja= $arrayparejas[$j];
                    break;
                }
            }

            
            echo "\t\t<td style=\"border: 1px;\">".$pareja->nombreparticipante1."/".$pareja->nombreparticipante2."</td>\n";*/



}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>