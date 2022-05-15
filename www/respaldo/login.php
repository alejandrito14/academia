<?php
require_once("clases/class.Funciones.php");
$f = new Funciones();
$navegador = $f->navegador();
?>
<!DOCTYPE html>
<html dir="ltr">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- Tell the browser to be responsive to screen width -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<!-- Favicon icon -->
<!-- 	<link rel="icon" type="image/png" sizes="16x16" href="images/configuracion/imagentransparente.png">  -->

	<title>IS-ACADEMIA</title>

	<!-- ============ INICIA INCRUSTACION DE ARCHIVOS CSS ============ -->
	<link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css">
<!-- 		<link href="dist/css/style.min.css" rel="stylesheet">
-->		<link rel="stylesheet" href="dist/css/login.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
<!-- ============ TERMINA INCRUSTACION DE ARCHIVOS CSS ============ -->

</head>

<body >
	<div class="">

		<!-- ============================================================== -->
		<!-- INICIA PRELOADER -->
		<!-- ============================================================== -->
		<div class="preloader">
			<div class="lds-ripple">
				<div class="lds-pos"></div>
				<div class="lds-pos"></div>
			</div>
		</div>
		<!-- ============================================================== -->
		<!-- TERMINA PRELOADER -->
		<!-- ============================================================== -->


		<!-- ============================================================== -->
		<!-- INICIA CONTENEDOR DE LOGIN -->
		<!-- ============================================================== -->
		<div class="auth-wrapper main-bg">
			<!-- <div class="auth-box bg-dark " style="background-color: #6a5d4d; border: 1px solid #FFFFFF "> -->
				<!-- <div id="loginform" style="background-color: #8b8c7a; padding: 30px; "> -->
						<!-- <div class="text-center p-t-20 p-b-20">
							<span class="db" style="color: #fff; font-weight: bold; font-size: 25px; "><img src="images/configuracion/iss.png" alt="logo" style="width: 100%;" /></span>
						</div> -->
						<!-- Form -->
						<!-- 	<form class="form-horizontal m-t-20" id="loginform" > -->


							
     <!--    <div class="login-container text-c animated flipInX">

                <div>
                    <h1 class="logo-badge text-whitesmoke"><span class="fa fa-user-circle"></span></h1>
                </div>
                    <h3 class="text-whitesmoke">Iniciar sesión en Is-ERP </h3>
              <div class="container-content">
                    <form class="margin-t">

                    	<div class="form-group">
                    			<input type="text" class="form-control form-control-lg" placeholder="COD. SERVICIO" id="codservicio" name="codservicio"  aria-describedby="basic-addon1" style=" font-size: 18px; font-weight: bold">
                    	</div>
                        <div class="form-group">
                           <input type="text" class="form-control form-control-lg" placeholder="USUARIO" id="usuario" aria-label="Usuario" aria-describedby="basic-addon1" style="font-size: 18px; font-weight: bold">
                        </div>
                        <div class="form-group">
                           <input type="password" class="form-control form-control-lg" placeholder="CONTRASEÑA" id="password" aria-label="Contrase&ntilde;a" aria-describedby="basic-addon1" style=" font-size: 18px; font-weight: bold">
                        </div>

                       		<div class="alert alert-danger" role="alert" style="display: none;"></div>
											<div class="alert alert-success" role="alert" style="display: none;"></div>
											<div id="validar"><button id="validar" class="form-button button-l" type="button" style=" border:  1px solid #ffffff">Iniciar sesión</button></div>

							<br>

							<small style="float: left;"><a>V.2020.1.1</a></small>
        					<a style="color: #676435;margin-left: 6em;" href="">¿Olvidaste la contraseña?</a>
                 
                    </form>
                    <p class="margin-t text-whitesmoke"><small> Copyright &copy; 2020 Innovative Software Services (ISS). Todos los derechos reservados.</small> </p>
                </div>
            </div> -->



            <div class="d-flex align-items-center min-vh-100 py-md-0">
            	<div class="container">

            		<div class="card login-card" style="border-radius: 30px;">
            			<div class="row no-gutters">
            				<div class="col-md-5">
            					<img  src="./images/market.png" alt="login" class="login-card-img">

            				</div>

            				<div class="col-md-1"></div>
            				<div class="col-md-6">
            					<div class="card-body">
            						<div class="row">
            							<div class="col-md-9">
            								<img src="./images/imagen.png" class="" style="width:100%;" alt="">

            							</div>
            							<div class="col-md-3"></div>
            						</div>
            						<br>
            						<!--  <p class="login-card-description" style="font-size: 20px;">IS-ERP TIMEUS®️</p> -->
            						<form action="#!">
            							<!-- <h2 style="text-align: center;">IS-U ORDER ADMIN</h2> -->

            							<br>
            							<div class="form-group">
            								<input type="text" class="form-control form-control-lg" placeholder="COD. SERVICIO" id="codservicio" name="codservicio"   style=" font-size: 18px;color: #000000!important; font-weight: bold"  autofocus >
										</div>

										<div class="form-group">
											<label for="email" class="sr-only">Usuario:</label>
											<input type="text" class="form-control form-control-lg" placeholder="USUARIO" id="usuario" aria-label="Usuario"  style="font-size: 18px;color: #000000!important; font-weight: bold" >
										</div>
										<div class="form-group mb-4">
											<label for="password" class="sr-only">Contraseña:</label>
											<input type="password" class="form-control form-control-lg" placeholder="CONTRASEÑA" id="password" aria-label="Contrase&ntilde;a"  style=" font-size: 18px;color: #000000!important; font-weight: bold"   >
										</div>
<!--   <input name="login" id="login" class="btn btn-block login-btn mb-4" type="button" value="Login"> -->

									<div class="alert alert-danger" role="alert" style="display: none;"></div>
									<div class="alert alert-success" role="alert" style="display: none;"></div>
									<div id="validar">
										<button id="validar" class="btn btn-block login-btn mb-4" type="button" style=" border:  1px solid #ffffff">Iniciar sesión</button></div>


									</form>

									<p class="forgot-password-link" style="float: left;"><a>V.2021.1.1</a></p>
									<p class="forgot-password-link" style="float: left;">
										<a class="olvide" style="color: #0d2366;margin-left: 6em;" href="">¿Olvidaste la contraseña?</a>
									</p>
									<br>
									<br>


						<nav class="" style="text-align: center;">
							<div class="row">


								<div class="col-md-8 copi" style="text-align: center;margin-left: 2.2em;">
									<span class="copi" style="font-size: 10px;float: left;"> Copyright © 2021 Innovative Software Services (ISS). 
									</span>	
								<span class="copi2" style="font-size: 10px;float: left;text-align: center;margin-left: 6em;">Todos los derechos reservados.</span>

								</div>
								<div class="col-md-2"></div>

							</div>

							<div class="col-md-4">

							</div>


						</nav>
						</div>
						</div>
						</div>
						</div>
					</div>
				</div>




</div>


<!-- Modal -->
<div class="modal fade" id="Modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true ">
	<div class="modal-dialog" role="document ">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Popup Header</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true ">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Here is the text coming you can put also image if you want…
			</div>
		</div>
	</div>
</div>
<!-- ============================================================== -->
<!-- TERMINA CONTENEDOR DE LOGIN -->
<!-- ============================================================== -->
</div>

<!-- ============================================================== -->
<!-- INICIA INCRUSTACIÓN DE ARCHIVOS JS -->
<!-- ============================================================== -->

<script src="assets/libs/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap tether Core JavaScript -->
<script src="assets/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>

<script src="js/fn_Login.js" type="text/javascript"></script>
<script src="js/fn_Jquery.js" type="text/javascript"></script>

<!-- ============================================================== -->
<!-- TERMINA INCRUSTACION DE ARCHIVOS JS -->
<!-- ============================================================== -->


<script>

	

	$('[data-toggle="tooltip"]').tooltip();
	$(".preloader").fadeOut();
		// ============================================================== 
		// Login and Recover Password 
		// ============================================================== 
		$('#to-recover').on("click", function() {
			$("#loginform").slideUp();
			$("#recoverform").fadeIn();
		});
		$('#to-login').click(function(){

			$("#recoverform").hide();
			$("#loginform").fadeIn();
		});
	</script>


	<style>
		.main-bg{
			background-color: #35b4f0!important;

		}

		@media only screen and (max-width: 400px) {
			.olvide {
				margin-left: 2em!important;
			}
			.copi{
				margin-left: .8em!important;
			}
			.copi2{
				margin-left:4em!important;
			}
		}

		@media only screen and (max-width: 600px) {
			.olvide {
				margin-left: 3em!important;
			}

			.copi2{
				margin-left:6em!important;
			}
		}

		@media only screen and (max-width: 800px) {
			.olvide {
				margin-left: 4em;
			}
		}

		@media screen 
		and (device-width: 360px) 
		and (device-height: 640px) 
		and (-webkit-device-pixel-ratio: 2) {
			.olvide {
				margin-left: 0em!important;
			}

			.copi2{
				margin-left:5em;
			}
		}
	</style>

</body>

</html>