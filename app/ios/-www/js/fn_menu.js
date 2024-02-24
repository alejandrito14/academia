function SeleccionMenu(objeto) {
	$(".limenu").css('color','black');
	objeto.style.color='white';

	var menu= objeto.getAttribute('data-menu');

	if (menu=='citas') {
		GoToPage('citas');

	}

  if (menu=='salir') {
    AbriModalSalir();

  }

  if (menu=='miscompras') {
    GoToPage('listadocompras');

  }
  if (menu=='login') {
     localStorage.setItem('celular','');
     GoToPage('login');

  }


  if (menu=='negocios') {
    
     GoToPage('home');

  }

   if (menu=='monedero') {
    
     GoToPage('monedero');

  }

  if (menu=='miperfil') {
    
     GoToPage('perfil');

  }

  setTimeout(() => {
  objeto.style.color='#333';

  }, "1000");
}

function toggleMenu() {
  var menu = document.getElementById("menu");
  if (abierto ==1) {
    menu.style.left = "0";

   $(".menu").removeClass('zimenu');
   abierto=0;
  } else {
    menu.style.left = "-100px";
    
    $(".menu").addClass('zimenu');
    abierto=1;
  }


}

function Empezar() {

  var tipousuario=  localStorage.getItem('idtipousuario');
  var session=localStorage.getItem('session');
  if (tipousuario==5 && session==1) {
    GoToPage('homeespecialista');

  }else if (tipousuario==3 && session==1) {

        GoToPage('home');

  }else if (tipousuario==0 && session==1) {
            GoToPage('homeadmin');

    
  }else{
        localStorage.removeItem('idtipousuario');
        localStorage.removeItem('correo');
        localStorage.setItem("foto", '');
        localStorage.removeItem("idopcionespedido");
        localStorage.removeItem("iddireccion");
        localStorage.removeItem("correo");
        localStorage.removeItem("passwordisuoder");
        localStorage.removeItem("id_user");
        localStorage.removeItem("idusuarioinvitado");
        localStorage.removeItem('id_usuariologin');
  
       GoToPage('login');
  }

}



function IrHome() {
  var tipousuario= localStorage.getItem('idtipousuario');
  var session=localStorage.getItem('session');
  if (tipousuario==5) {
    GoToPage('homeespecialista');

  }
   if (tipousuario==3 ) {

        GoToPage('home');

  }
   if (tipousuario==0 ) {
      GoToPage('homeadmin');

  }
}