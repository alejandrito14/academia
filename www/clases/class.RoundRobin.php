<?php 
/**
 * 
 */
class RoundRobin
{
	
	public $teams;
	//public $rol=array();

public function create_round_robin_tournament($teams)
{
	$rol=array();
    if(count($teams) < 2) throw new Exception("At least 2 teams needed to build tournament");

    if( count($teams) % 2 == 1 )
        $teams[] = "dummy" ; // if number of teams is even, add a dummy team that means 'this team don't play this round'

    for($round = 0 ; $round < count($teams)-1 ; ++$round)
    {
       // echo "=== Round " . ($round+1) . " ===" . PHP_EOL .'<br>';


        //$rol['round']=$round+1;
         //print_r($teams);die();
       $rolesjuego= $this->displayRoundPairs($teams);
       $array=array('round'=>$round+1,'roles'=>$rolesjuego);
       array_push($rol,$array);
       // $rol[$i]->roles=$rolesjuego;
       // echo PHP_EOL ;
        $teams = $this->rotateCompetitors($teams);
    }

   return $rol;
}

public function displayRoundPairs($teams)
{
	$roles=array();
    for($i = 0 ; $i < count($teams)/2 ; ++$i)
    {
        $opponent = count($teams) - 1 - $i ;
        $jugar=1;
        $opponente=0;
		$contrincante=0;
        if($teams[$i] == 'dummy'){
           // echo "Team " . $teams[$opponent] . " don't play this round" . PHP_EOL.'<br>' ;
              $jugar=0;

              $opponente=$teams[$opponent];
        }
        elseif($teams[$opponent] == 'dummy'){
           // echo "Team " . $teams[$i] . " don't play this round" . PHP_EOL.'<br>' ;
              $jugar=0;
              $contrincante=$teams[$i];
        }
        else {
           // echo $teams[$i] . ' - ' . $teams[$opponent] . PHP_EOL.'<br>' ;
              $jugar=1;

              $contrincante=$teams[$i];
              $opponente=$teams[$opponent];
        }

        $rolequipos=array('jugar'=>$jugar,'team1'=>$contrincante,'team2'=>$opponente,'pareja1'=>array(),'pareja2'=>array());
        array_push($roles, $rolequipos);

    }
    return $roles;
}

	// rotate all competitors but the first one
	public function rotateCompetitors($teams)
	{
	    $result = $teams ;

	    $tmp = $result[ count($result) - 1 ] ;
	    for($i = count($result)-1 ; $i > 1 ; --$i)
	    {
	        $result[$i] = $result[$i-1] ;
	    }
	    $result[1] = $tmp ;

	    return $result ;

	}
}

 ?>