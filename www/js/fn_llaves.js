 //$(document).ready(function($) { 
function Creacionllave(matchInfo) {
  // body...

      var base = $('#writeHere');
      var matchDivsByRound = [];
      
      for (var roundIndex=0; roundIndex < matchInfo.rounds.length; roundIndex++) {    
        var round = matchInfo.rounds[roundIndex];
        var bracket = checkedAppend('<div class="bracket"></div>', base);
        var matchDivs = [];
        matchDivsByRound.push(matchDivs);
        var datoronda="";
        //setup the match boxes round by round
        for (var i=0; i<round.matches.length; i++) {  
          var r="";
          if (round.name!=datoronda) {
              r='Ronda'+round.name;
              datoronda=round.name;
          }
          var vOffset = checkedAppend('<div style="text-align:center;">'+r+' </div>', bracket);
        
          var match = round.matches[i];
          var matchp1=match.p1;
          var matchp2=match.p2;
          
          var p1nombreparticipante1="";
          var p1nombreparticipante2="";

          var p2nombreparticipante1="";
          var p2nombreparticipante2="";

          var participante1="";
          var participante2="";
          console.log(matchp1);
          if (matchp1!=null) {
            if (matchp1.hasOwnProperty('nombreparticipante1')) {
              p1nombreparticipante1=match.p1.nombreparticipante1;
              p1nombreparticipante2=match.p1.nombreparticipante2;
              participante1=p1nombreparticipante1+'/'+p1nombreparticipante2;

              p2nombreparticipante1=match.p2.nombreparticipante1;
              p2nombreparticipante2=match.p2.nombreparticipante2;
              participante2=p2nombreparticipante1+'/'+p2nombreparticipante2;

          }
        }
          var matchHtml = '<div class="match" id="match' + match.id + '">'
            + '<div class="p1">' + participante1 +'</div>'
            + '<div class="spacer"></div>'
            + '<div class="p2">' + participante2 +'</div>';
          matchDiv = checkedAppend(matchHtml, bracket);
          matchDivs.push(matchDiv);
          
          if (roundIndex > 0) {
            //row 2+; line up with previous row
            var alignTo = matchDivsByRound[roundIndex-1][i*2];
            //offset to line up tops
            var desiredOffset = alignTo.position().top - matchDiv.position().top;
            
            //offset by half the previous match-height
            desiredOffset += alignTo.height() / 2;
            vOffset.height(desiredOffset);            
          } else {
            checkedAppend('<div class="small-spacer"></div>', bracket);
          }
          
          if (roundIndex > 0) {
            //tweak our size so we stretch to the middle of the appropriate element
            var stretchTo = matchDivsByRound[roundIndex-1][i*2+1];
            var newH = stretchTo.position().top + stretchTo.height()/2 - matchDiv.position().top;            
            var deltaH = newH - matchDiv.height();
            matchDiv.height(newH);
            var spacer = matchDiv.find('.spacer');
            spacer.height(spacer.height() + deltaH);
          }          
        }                
      }
      //setup the final winners box; just a space for a name whose bottom is centrally aligned with the last match
      bracket = checkedAppend('<div class="bracket"></div>', base);
      var vOffset = checkedAppend('<div></div>', bracket);
         

      var alignTo = matchDivsByRound[matchInfo.rounds.length - 1][0]; //only 1 match in the last round
     
      var html = '<div class="winner">?</div>';
      var winnerDiv = checkedAppend(html, bracket); 
         
      vOffset.height(alignTo.position().top - winnerDiv.position().top + alignTo.height() / 2 - winnerDiv.height());
    }
    
    function fmtName(name) {
      return null != name ? name : '?';
    }
    
    function checkedAppend(rawHtml, appendTo) {
      var html = $(rawHtml);
      if (0 == html.length) {
        throw "Built ourselves bad html : " + rawHtml;
      }
      html.appendTo(appendTo);      
      return html;
    }