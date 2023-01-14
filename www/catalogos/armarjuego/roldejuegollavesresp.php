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
echo json_encode($bracket);



/* function obtenerequipo($posicion,$posicion2)
{

 
   
 
 return $bracket[$posicion][$posicion2];
}
*/
function is_player($round, $row, $team) {
    return $row == pow(2, $round-1) + 1 + pow(2, $round)*($team - 1);
}

$num_teams = $contadorpareja;//$num_teams = 28;
$total_rounds = floor(log($num_teams, 2)) + 2;

$max_rows = $num_teams*2;
$team_array = array();
$unpaired_array = array();
$score_array = array();

for ($round = 1; $round <= $total_rounds; $round++) {
    $team_array[$round] = 1;
    $unpaired_array[$round] = False;
    $score_array[$round] = False;
}


echo "<table class=\"table  \" border=\"1\" cellspacing=\"1\" cellpadding=\"1\">\n";
echo "\t<tr>\n";

for ($round = 1; $round <= $total_rounds; $round++) {

    echo "\t\t<td colspan=\"2\" style=\" border: 1px solid;\"><strong>Round $round</strong></td>\n";

}

echo "\t</tr>\n";
$i=0;
 $interno=0;
 $for=0;
for ($row = 1; $row <= $max_rows; $row++) {

    echo "\t<tr>\n";

    for ($round = 1; $round <= $total_rounds; $round++) {
        $score_size = pow(2, $round)-1;
        if (is_player($round, $row, $team_array[$round])) {
            $unpaired_array[$round] = !$unpaired_array[$round];

            $equipo="";
           if ($round == 1) {
               # code...
           
            if ($for==0){



                $posicio2=0;
                $aqui=1;
                $for=1;
            }else{
                
                $posicio2=1;
                $aqui=2;
                 $for=0;
            }


           $equipo=$bracket[$interno][$posicio2];
            if ($aqui==2) {
               $interno++;
              /* echo 'interno'.$interno.'<br>';*/
            }
       }
       
       	if ($equipo!="") {
       		# code...
       	
       		for ($j=0; $j <count($arrayparejas) ; $j++) { 
		
			if ($arrayparejas[$j]->numeropareja==$equipo) {
					$pareja= $arrayparejas[$j];
					break;
				}
			}

			
            echo "\t\t<td style=\"border: 1px;\">".$pareja->nombreparticipante1."/".$pareja->nombreparticipante2."</td>\n";

        }else{
        	  echo "\t\t<td style=\"border: 1px;\">Team</td>\n";
        }
            echo "\t\t<td width=\"20\" style=\"border: 1px;\">&nbsp;</td>\n";
            $team_array[$round]++;
            $score_array[$round] = False;
           
            
        } else {
            if ($unpaired_array[$round] && $round != $total_rounds) {
                if (!$score_array[$round]) {
                    echo "\t\t<td style=\"    border-right: 0;
    border-left: 0\" rowspan=\"$score_size\"></td>\n";
                   
                    echo "\t\t<td style=\"border-left: 0px;\" rowspan=\"$score_size\" width=\"20\"></td>\n";
                    $score_array[$round] = !$score_array[$round];
                }
            } else {
                echo "\t\t<td style=\"border:0\" colspan=\"2\">&nbsp;</td>\n";
            }
        }

        
    }
	$i++;
    echo "\t</tr>\n";

}

echo "</table>\n";



}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>