function toggleMenu() {

	
  var menu = document.getElementById("menu");
  if (menu.style.left === "-300px") {
    menu.style.left = "0";

   $(".menu").removeClass('zimenu');

  } else {
    menu.style.left = "-100px";
    $(".menu").addClass('zimenu');
  }


    /*$(document).click(function(event) {
    if (!menu.is(event.target) && menu.has(event.target).length === 0) {
      menu.css("left", "-300px");
    }
  });*/
}

