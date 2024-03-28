var routes = [

  // Splash page
  {
    path: '/',
    componentUrl: './pages/splash.html',
    name: 'splash',
  },
 
  // Index page
  {
    path: '/home/',
   componentUrl: './pages/home.html',
    /*  async({ resolve, reject }) {
       getValidacionUsuario().then(r => {
          
         if(r.existe==0)
          {  
           resolve({ componentUrl: './pages/home.html', })

          }else{

          resolve({ componentUrl: './pages/login.html' })
        
          }
      });
    }*/
  },

  {
    path: '/homeadmin/',
    componentUrl: './pages/homeadmin.html',
    name: 'homeadmin',
    routes: [

    ]
  },

  {
    path:'/homecoach/',
    componentUrl: './pages/homecoach.html',
    name: 'homecoach',
    routes: [
    ]
  },

   {
    path:'/serviciosactivos/',
    componentUrl: './pages/serviciosactivos.html',
    name: 'serviciosactivos',
    routes: [
    ]
  },

   {
    path:'/serviciosactivostutorado/',
    componentUrl: './pages/serviciosactivostutorado.html',
    name: 'serviciosactivostutorado',
    routes: [
    ]
  },

   {
    path:'/serviciosporvalidar/',
    componentUrl: './pages/serviciosporvalidar.html',
    name: 'serviciosporvalidar',
    routes: [
    ]
  },

  {
    path:'/serviciosactivoscoach/',
    componentUrl: './pages/serviciosactivoscoach.html',
    name: 'serviciosactivoscoach',
    routes: [
    ]
  },

  // notification list
  {
    path: '/notificaciones/',
    url: './pages/notificaciones.html',
  },

  // verificacion 
  {
    path: '/verificacion/',
    componentUrl: './pages/verificacion.html',

  },
    // nuevo servicio 
  {
    path: '/nuevoservicio/',
    componentUrl: './pages/nuevoservicio.html',

  },

   {
    path: '/imagenesinformativas/',
    componentUrl: './pages/imagenesinformativas.html',
  },
  //replica servicio
   {
    path: '/replicaservicio/',
    componentUrl: './pages/replicaservicio.html',

  },
//reagendarservicio
 
   {
    
    path: '/reagendarservicio/',
    componentUrl: './pages/reagendarservicio.html',
  },
  //cambiocontra
   {
    path:'/cambiocontra/',
    componentUrl: './pages/cambiocontra.html',
  },

  //aceptacion de servicio

   {
    path:'/aceptacionservicio/',
    componentUrl: './pages/aceptacionservicio.html',
  },

  {
    path:'/aceptacionservicio2/',
    componentUrl: './pages/aceptacionservicio2.html',
  },

 {
    path:'/calendario/',
    componentUrl: './pages/calendario.html',
  },

   // stats
  {
    path: '/stats/',
    url: './pages/stats.html',
    name: 'stats'
  },
  // style
  {
    path: '/style/',
    componentUrl: './pages/style.html',
  },

  // style
  {
    path: '/profile/',
    url: './pages/profile.html',
  },
  // chat
  {
    path: '/chat/',
    url: './pages/chat.html',
    name: 'chat',
  },

 // chattutorado
  {
    path: '/chattutorado/',
    url: './pages/chattutorado.html',
    name: 'chattutorado',
  },
  

   // chat
  {
    path: '/chatservicio/',
    url: './pages/chatservicio.html',
    name: 'chatservicio',
  },

  // messages
  {
    path: '/messages/',
    componentUrl: './pages/messages.html',
  },

  // notification list
  {
    path: '/notificationlist/',
    url: './pages/notificationlist.html',
  },

  // settings
  {
    path: '/settings/',
    url: './pages/settings.html',
  },



  // notifications
  {
    path: '/notifications/',
    componentUrl: './pages/f7components/notifications.html',
  },

  // Components
  {
    path: '/components/',
    componentUrl: './pages/components.html',
  },

  // pages
  {
    path: '/pages/',
    url: './pages/pages.html',
  },

  // About us
  {
    path: '/aboutus/',
    url: './pages/aboutus.html',
  },

  // Blogs
  {
    path: '/blogs/',
    url: './pages/blogs.html',
  },

  // blog details
  {
    path: '/blogdetails/',
    url: './pages/blogdetails.html',
  },

  // landing
  {
    path: '/landing/',
   // componentUrl: './pages/landing.html',

     async({ resolve, reject }) {
       getVistoAnuncio().then(r => {
          
         if(r.configuracion.mostraranuncios==1)
          {  
           resolve({ componentUrl: './pages/landing.html', })

          }else{

          resolve({ componentUrl: './pages/login.html' })
        
          }
      });
    }
  },
  
  // login
  {
    path: '/login/',
   // componentUrl: './pages/login.html',

    async({ resolve, reject }) {
  
        getVistoAnuncio().then(r => {
          console.log('line 66' +r.visto)
          
         if(r.visto == 0 && r.configuracion.mostraranuncios==1)
          {  
             resolve({componentUrl: './pages/landing.html', })
            }else{
           
             resolve({ componentUrl: './pages/login.html', })

             
            }
        });

    }

  },


  // register telefono
  {
    path: '/register/',
    componentUrl: './pages/register.html',
  },
  // register datos personales

 {
    path: '/registrofoto/',
    componentUrl: './pages/registrofoto.html',
  },
  {
    path: '/registro/',
    componentUrl: './pages/registro.html',
  },
  {
    path: '/datosdependencia/',
    componentUrl: './pages/datosdependencia.html',
  },

  
  //servicios asignados
  /* {
    path: '/serviciosasignados/',
    componentUrl: './pages/serviciosasignados.html',
  
  },*/

   {

    path: '/serviciosasignados/',
    
    url: './pages/serviciosasignados.html',
  },

    {

    path: '/serviciosasignadostutorado/',
    
    url: './pages/serviciosasignadostutorado.html',
  },
   {
    path: '/serviciospendientesasignados/',
    componentUrl: './pages/serviciospendientesasignados.html',
  
  },

   {
    path: '/serviciospendientesasignadostutorado/',
    componentUrl: './pages/serviciospendientesasignadostutorado.html',
  
  },

  
  {

    path: '/serviciosregistrados/',
    componentUrl: './pages/serviciosregistrados.html',
  
  },




  //servicios
   {
    path: '/servicios/',
    componentUrl: './pages/servicios.html',
  },

  //listadotutoservicios
   {
    path: '/listadotutoservicios/',
    componentUrl: './pages/listadotutoservicios.html',
  },

  //servicios
   {
    path: '/detalleservicio/',
    componentUrl: './pages/detalleservicio.html',
  },

  {
    path: '/detalleservicio2/',
    
    componentUrl: './pages/detalleservicio2.html',
  },

  {
    path: '/detalleserviciocoach/',
    componentUrl: './pages/detalleserviciocoach.html',
  },

   {
    path: '/detalleserviciocoach2/',
    componentUrl: './pages/detalleserviciocoach2.html',

   },
   {
    path: '/detalleservicioadmin/',
    componentUrl: './pages/detalleservicioadmin.html',
  },
  
  { 
    path: '/detalleservicioactivo/',
    componentUrl: './pages/detalleservicioactivo.html',
  },
  { 
    path: '/detalleservicioactivocoach/',
    componentUrl: './pages/detalleservicioactivocoach.html',
  },
   {
    
    path: '/calendarioadmin/',
    componentUrl: './pages/calendarioadmin.html',
  },

  { 
    path: '/calificacionesadmin/',
    componentUrl: './pages/calificacionesadmin.html',
  },
  {
    path: '/asistenciaservicio/',
    componentUrl: './pages/asistenciaservicio.html',
  },
   {
    path: '/cancelacionservicio/',
    componentUrl: './pages/cancelacionservicio.html',
  },

   { 
    
    path: '/asignaralumnos/',
    componentUrl: './pages/asignaralumnos.html',
  },
   //nueva imagen grupal
  {
    path: '/nuevaimagengrupal/',
    componentUrl: './pages/nuevaimagengrupal.html',
  },

  {
    path: '/nuevaimagenindividual/',
    componentUrl: './pages/nuevaimagenindividual.html',
  },

   {
    path: '/nuevovideogrupal/',
    componentUrl: './pages/nuevovideogrupal.html',
  },

  {
    path: '/imagenesindividuales/',
    componentUrl: './pages/imagenesindividuales.html',
  },
  //datospersonales
  {
    path: '/datospersonales/',
    componentUrl: './pages/datospersonales.html',
  },
   //nuevadireccion
  {
    path: '/nuevadireccion/',
    componentUrl: './pages/nuevadireccion.html',
  },
//colonias
  {
    path: '/colonias/',
    componentUrl: './pages/colonias.html',
  },
   //datosemergencia
  {
    path: '/datosemergencia/',
    componentUrl: './pages/datosemergencia.html',
  },
  // register datos de acceso

   {
    path:'/registrodatosacceso/',
    componentUrl: './pages/registrodatosacceso.html',
  },

//datossalud
   {
    path:'/datosdesalud/',
    componentUrl: './pages/datosdesalud.html',
  },
//datosacceso
   {
    path:'/datosacceso/',
    componentUrl: './pages/datosacceso.html',
  },

  //datosdireccion
  {
    path:'/datosdireccion/',
    componentUrl: './pages/datosdireccion.html',
  },
  //pagos
{
    path:'/pagos/',
    componentUrl: './pages/pagos.html',
  },

  {
    path:'/monedero/',
    componentUrl: './pages/monedero.html',
  },

   {
    path:'/mercadopagotarjeta/',
    componentUrl: './pages/mercadopagotarjeta.html',
  },

  

  {
    path:'/listadopagos/',
    componentUrl: './pages/listadopagos.html',
  },
   {
    path:'/detallepagoscoach/',
    componentUrl: './pages/detallepagoscoach.html',
  },

   {
    path: '/listadopagosadmin/',
    componentUrl: './pages/listadopagosadmin.html',
  
  },


   {
    path:'/metodopago/',
    componentUrl: './pages/metodopago.html',
  },

   {
    path:'/listadopagospagados/',
    componentUrl: './pages/listadopagospagados.html',
  },
 {
    path:'/resumenpago/',
     async({ resolve, reject }) {

      ValidacionBuscarasignacion().then(r=>{
  var noencontrado=0;
      var pagosencontrados=r.pagosencontrados;
      if (pagosencontrados.length>0) {

        for (var i = 0; i < pagosencontrados.length; i++) {
          console.log(pagosencontrados[i].idusuarios_servicios);
          if (pagosencontrados[i].idusuarios_servicios == 'null' || pagosencontrados[i].idusuarios_servicios==null) {

            noencontrado++;
          }
       }
      }

       if (noencontrado==0) {
             resolve({componentUrl: './pages/resumenpago.html', })

        }else{

             resolve({componentUrl: './pages/listadopagos.html', })

        }

     });
  }

},
    {
    path: '/detallepago/',
    componentUrl:'./pages/detallepago.html',
  },
  //registrotutorados

   {
      path:'/registrotutorados/',
      componentUrl: './pages/registrotutorados.html',
    },

     {
      path:'/registroasociados/',
      componentUrl: './pages/registroasociados.html',
    },
    {
      path:'/nuevotutorado/',
      componentUrl: './pages/nuevotutorado.html',
    },

     {
      path:'/nuevoasociado/',
      componentUrl: './pages/nuevoasociado.html',
    },

      // membresia
  {
    path: '/membresia/',
    
    componentUrl:'./pages/membresia.html',

  },
       // membresia
  {
    path: '/membresiaactiva/',
    componentUrl:'./pages/membresiaactiva.html',

  },

       // pagomembresia
  {
    path: '/pagomembresia/',
    componentUrl:'./pages/pagomembresia.html',

  },

       // evaluacion servicio
  {
    path: '/evaluacionesservicio/',
    componentUrl:'./pages/evaluacionesservicio.html',


  },

  { 
    path: '/evaluacionescoach/',
    componentUrl:'./pages/evaluacionescoach.html',
  },

 {
    path: '/listadoevaluaciones/',
    componentUrl:'./pages/listadoevaluaciones.html',

  },
  // comentarios servicio
  {
    path: '/comentariosservicio/',
    componentUrl:'./pages/comentariosservicio.html',

  },

   {
    path: '/elegirparticipantes/',
    componentUrl:'./pages/elegirparticipantes.html',

  },

 {
    path: '/listadocuestiones/',
    componentUrl:'./pages/listadocuestiones.html',

  },
  
   {
    path: '/token/',
    componentUrl: './pages/token.html',
  },
  
  // forgot password
  {
    path: '/forgotpassword/',
    componentUrl: './pages/forgotpassword.html',
  },
  
  // reset password
  {
    path: '/resetpassword/',
    componentUrl: './pages/resetpassword.html',
  },
  
  // verify
  {
    path: '/verify/',
    componentUrl: './pages/verify.html',
  },
    
  // Thank you
  {
    path: '/thankyou/',
    componentUrl: './pages/thankyou.html',
  },
  {
    path: '/thankyou2/',
    componentUrl: './pages/thankyou2.html',
  },
  {
    path: '/thankyou3/',
    componentUrl: './pages/thankyou3.html',
  },
  {
    path: '/thankyou4/',
    componentUrl: './pages/thankyou4.html',
  },
    
  // payments
  {
    path: '/pay/',
    url: './pages/pay.html',
  },
  {
    path: '/receivemoney/',
    url: './pages/receivemoney.html',
  },
  {
    path: '/bills/',
    url: './pages/bills.html',
  },
  {
    path: '/sendmoney/',
    url: './pages/sendmoney.html',
  },
  {
    path: '/sendmoney1/',
    url: './pages/sendmoney1.html',
  },
  {
    path: '/sendmoney2/',
    url: './pages/sendmoney2.html',
  },
  {
    path: '/sendmoney3/',
    url: './pages/sendmoney3.html',
  },
  {
    path: '/rewards/',
    url: './pages/rewards.html',
  },
  {
    path: '/allmyrequests/',
    url: './pages/allmyrequests.html',
  },
  {
    path: '/wallet/',
    url: './pages/wallet.html',
  },
  {
    path: '/addmoney/',
    url: './pages/addmoney.html',
  },
  {
    path: '/withdraw/',
    url: './pages/withdraw.html',
  },
  // FAQs
  {
    path: '/faqs/',
    url: './pages/faqs.html',
  },  
    
    
  // Contact us
  {
    path: '/contactus/',
    url: './pages/contactus.html',
  },
    
  // Terms and conditions
  {
    path: '/politicas/',
    componentUrl: './pages/politicas.html',
  },

   {
    path: '/politicas2/',
    componentUrl: './pages/politicas2.html',
  },

   {
    path: '/politicas3/',
    componentUrl: './pages/politicas3.html',
  },
  
  {
    path: '/accordion/',
    url: './pages/f7components/accordion.html',
  },


  // Right Panel pages
  {
    path: '/panel-right-1/',
    content: `<div class="page">
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner sliding">
            <div class="left">
              <a href="#" class="link back">
                <i class="icon icon-back"></i>
                <span class="if-not-md">Back</span>
              </a>
            </div>
            <div class="title">Panel Page 1</div>
          </div>
        </div>
        <div class="page-content">
          <div class="block">
            <p>This is a right panel page 1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>
          </div>
        </div>
      </div>`,
  },
  {
    path: '/panel-right-2/',
    content: `<div class="page">
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner sliding">
            <div class="left">
              <a href="#" class="link back">
                <i class="icon icon-back"></i>
                <span class="if-not-md">Back</span>
              </a>
            </div>
            <div class="title">Panel Page 2</div>
          </div>
        </div>
        <div class="page-content">
          <div class="block">
            <p>This is a right panel page 2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>
          </div>
        </div>
      </div>`,
  },


  {
    path: '/action-sheet/',
    componentUrl: './pages/f7components/action-sheet.html',
  },
  {
    path: '/appbar/',
    componentUrl: './pages/f7components/appbar.html',
  },
  {
    path: '/area-chart/',
    componentUrl: './pages/f7components/area-chart.html',
  },
  {
    path: '/autocomplete/',
    componentUrl: './pages/f7components/autocomplete.html',
  },
  {
    path: '/badge/',
    url: './pages/f7components/badge.html',
  },
  {
    path: '/buttons/',
    componentUrl: './pages/f7components/buttons.html',
  },
  {
    path: '/calendar/',
    componentUrl: './pages/f7components/calendar.html',
  },
  {
    path: '/calendar-page/',
    componentUrl: './pages/f7components/calendar-page.html',
  },
  {
    path: '/cards/',
    url: './pages/f7components/cards.html',
  },
  {
    path: '/cards-expandable/',
    url: './pages/f7components/cards-expandable.html',
  },
  {
    path: '/checkbox/',
    componentUrl: './pages/f7components/checkbox.html',
  },
  {
    path: '/chips/',
    componentUrl: './pages/f7components/chips.html',
  },
  {
    path: '/color-picker/',
    componentUrl: './pages/f7components/color-picker.html',
  },
  {
    path: '/contacts-list/',
    url: './pages/f7components/contacts-list.html',
  },
  {
    path: '/content-block/',
    url: './pages/f7components/content-block.html',
  },
  {
    path: '/data-table/',
    componentUrl: './pages/f7components/data-table.html',
  },
  {
    path: '/dialog/',
    componentUrl: './pages/f7components/dialog.html',
  },
  {
    path: '/elevation/',
    url: './pages/f7components/elevation.html',
  },
  {
    path: '/fab/',
    url: './pages/f7components/fab.html',
  },
  {
    path: '/fab-morph/',
    url: './pages/f7components/fab-morph.html',
  },
  {
    path: '/form-storage/',
    url: './pages/f7components/form-storage.html',
  },
  {
    path: '/gauge/',
    componentUrl: './pages/f7components/gauge.html',
  },
  {
    path: '/grid/',
    url: './pages/grid.html',
  },
  {
    path: '/icons/',
    componentUrl: './pages/f7components/icons.html',
  },
  {
    path: '/infinite-scroll/',
    componentUrl: './pages/f7components/infinite-scroll.html',
  },
  {
    path: '/inputs/',
    url: './pages/f7components/inputs.html',
  },
  {
    path: '/lazy-load/',
    url: './pages/f7components/lazy-load.html',
  },
  {
    path: '/list/',
    url: './pages/f7components/list.html',
  },
  {
    path: '/list-index/',
    componentUrl: './pages/f7components/list-index.html',
  },
  {
    path: '/login-screen/',
    componentUrl: './pages/f7components/login-screen.html',
  },
  {
    path: '/login-screen-page/',
    componentUrl: './pages/f7components/login-screen-page.html',
  },
  {
    path: '/menu/',
    componentUrl: './pages/f7components/menu.html',
  },
  {
    path: '/menu-list/',
    componentUrl: './pages/f7components/menu-list.html',
  },
  {
    path: '/navbar/',
    url: './pages/f7components/navbar.html',
  },
  {
    path: '/navbar-hide-scroll/',
    url: './pages/f7components/navbar-hide-scroll.html',
  },
  {
    path: '/panel/',
    url: './pages/f7components/panel.html',
  },
  {
    path: '/photo-browser/',
    componentUrl: './pages/f7components/photo-browser.html',
  },
  {
    path: '/picker/',
    componentUrl: './pages/f7components/picker.html',
  },
  {
    path: '/pie-chart/',
    componentUrl: './pages/f7components/pie-chart.html',
  },
  {
    path: '/popup/',
    componentUrl: './pages/f7components/popup.html',
  },
  {
    path: '/popover/',
    url: './pages/f7components/popover.html',
  },
  {
    path: '/preloader/',
    componentUrl: './pages/f7components/preloader.html',
  },
  {
    path: '/progressbar/',
    componentUrl: './pages/f7components/progressbar.html',
  },
  {
    path: '/pull-to-refresh/',
    componentUrl: './pages/f7components/pull-to-refresh.html',
  },
  {
    path: '/radio/',
    url: './pages/f7components/radio.html',
  },
  {
    path: '/range/',
    componentUrl: './pages/f7components/range.html',
  },
  {
    path: '/searchbar/',
    url: './pages/f7components/searchbar.html',
  },
  {
    path: '/searchbar-expandable/',
    url: './pages/f7components/searchbar-expandable.html',
  },
  {
    path: '/sheet-modal/',
    componentUrl: './pages/f7components/sheet-modal.html',
  },
  {
    path: '/skeleton/',
    componentUrl: './pages/f7components/skeleton.html',
  },
  {
    path: '/smart-select/',
    url: './pages/f7components/smart-select.html',
  },
  {
    path: '/sortable/',
    url: './pages/f7components/sortable.html',
  },
  {
    path: '/stepper/',
    componentUrl: './pages/f7components/stepper.html',
  },
  {
    path: '/subnavbar/',
    url: './pages/f7components/subnavbar.html',
  },
  {
    path: '/subnavbar-title/',
    url: './pages/f7components/subnavbar-title.html',
  },
  {
    path: '/swiper/',
    url: './pages/f7components/swiper.html',
    routes: [
      {
        path: 'swiper-horizontal/',
        url: './pages/f7components/swiper-horizontal.html',
      },
      {
        path: 'swiper-vertical/',
        url: './pages/f7components/swiper-vertical.html',
      },
      {
        path: 'swiper-space-between/',
        url: './pages/f7components/swiper-space-between.html',
      },
      {
        path: 'swiper-multiple/',
        url: './pages/f7components/swiper-multiple.html',
      },
      {
        path: 'swiper-nested/',
        url: './pages/f7components/swiper-nested.html',
      },
      {
        path: 'swiper-loop/',
        url: './pages/f7components/swiper-loop.html',
      },
      {
        path: 'swiper-3d-cube/',
        url: './pages/f7components/swiper-3d-cube.html',
      },
      {
        path: 'swiper-3d-coverflow/',
        url: './pages/f7components/swiper-3d-coverflow.html',
      },
      {
        path: 'swiper-3d-flip/',
        url: './pages/f7components/swiper-3d-flip.html',
      },
      {
        path: 'swiper-fade/',
        url: './pages/f7components/swiper-fade.html',
      },
      {
        path: 'swiper-scrollbar/',
        url: './pages/f7components/swiper-scrollbar.html',
      },
      {
        path: 'swiper-gallery/',
        componentUrl: './pages/f7components/swiper-gallery.html',
      },
      {
        path: 'swiper-custom-controls/',
        url: './pages/f7components/swiper-custom-controls.html',
      },
      {
        path: 'swiper-parallax/',
        url: './pages/f7components/swiper-parallax.html',
      },
      {
        path: 'swiper-lazy/',
        url: './pages/f7components/swiper-lazy.html',
      },
      {
        path: 'swiper-pagination-progress/',
        url: './pages/f7components/swiper-pagination-progress.html',
      },
      {
        path: 'swiper-pagination-fraction/',
        url: './pages/f7components/swiper-pagination-fraction.html',
      },
      {
        path: 'swiper-zoom/',
        url: './pages/f7components/swiper-zoom.html',
      },
    ],
  },
  {
    path: '/swipeout/',
    componentUrl: './pages/f7components/swipeout.html',
  },

  // Color Themes
  {
    path: '/color-themes/',
    componentUrl: './pages/color-themes.html',
  },

  {
    path: '/tabs/',
    url: './pages/f7components/tabs.html',
  },
  {
    path: '/tabs-static/',
    url: './pages/f7components/tabs-static.html',
  },
  {
    path: '/tabs-animated/',
    url: './pages/f7components/tabs-animated.html',
  },
  {
    path: '/tabs-swipeable/',
    url: './pages/f7components/tabs-swipeable.html',
  },
  {
    path: '/tabs-routable/',
    url: './pages/f7components/tabs-routable.html',
    tabs: [
      {
        path: '/',
        id: 'tab1',
        content: `
        <div class="block">
          <p>Tab 1 content</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
          <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
          <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p>
        </div>
        `,
      },
      {
        path: '/tab2/',
        id: 'tab2',
        content: `
        <div class="block">
          <p>Tab 2 content</p>
          <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p>
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
        </div>
        `,
      },
      {
        path: '/tab3/',
        id: 'tab3',
        content: `
        <div class="block">
          <p>Tab 3 content</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
        </div>
        `,
      },
    ],
  },
  {
    path: '/text-editor/',
    componentUrl: './pages/f7components/text-editor.html',
  },
  {
    path: '/toast/',
    componentUrl: './pages/f7components/toast.html',
  },
  {
    path: '/toggle/',
    url: './pages/f7components/toggle.html',
  },
  {
    path: '/toolbar-tabbar/',
    componentUrl: './pages/f7components/toolbar-tabbar.html',
    routes: [
      {
        path: 'tabbar/',
        componentUrl: './pages/f7components/tabbar.html',
      },
      {
        path: 'tabbar-labels/',
        componentUrl: './pages/f7components/tabbar-labels.html',
      },
      {
        path: 'tabbar-scrollable/',
        componentUrl: './pages/f7components/tabbar-scrollable.html',
      },
      {
        path: 'toolbar-hide-scroll/',
        url: './pages/f7components/toolbar-hide-scroll.html',
      },
    ],
  },
  {
    path: '/tooltip/',
    componentUrl: './pages/f7components/tooltip.html',
  },
  {
    path: '/treeview/',
    componentUrl: './pages/f7components/treeview.html',
  },
  {
    path: '/timeline/',
    url: './pages/f7components/timeline.html',
  },
  {
    path: '/timeline-vertical/',
    url: './pages/f7components/timeline-vertical.html',
  },
  {
    path: '/timeline-horizontal/',
    url: './pages/f7components/timeline-horizontal.html',
  },
  {
    path: '/timeline-horizontal-calendar/',
    url: './pages/f7components/timeline-horizontal-calendar.html',
  },
  {
    path: '/virtual-list/',
    componentUrl: './pages/f7components/virtual-list.html',
  },
  {
    path: '/virtual-list-vdom/',
    componentUrl: './pages/f7components/virtual-list-vdom.html',
  },
  {
    path: '/vi/',
    componentUrl: './pages/f7components/vi.html',
  },

  // Effects
  {
    path: '/page-transitions/',
    componentUrl: './pages/f7components/page-transitions.html',
  },
  {
    path: '/page-transitions/:effect',
    componentUrl: './pages/f7components/page-transitions-effect.html',
  },

  // Page Loaders
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/f7components/page-loader-component.html',
  },
  {
    path: '/master-detail/',
    url: './pages/f7components/master-detail-master.html',
    master: true,
    detailRoutes: [
      {
        path: '/master-detail/:id/',
        componentUrl: './pages/f7components/master-detail-detail.html',
      },
    ],
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },


];
