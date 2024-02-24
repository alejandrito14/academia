var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'homeindex',
  },
  
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  
  // Right Panel pages
  {
    path: '/panel-right-1/',
    content: `
      <div class="page">
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
      </div>
    `,
  },
  {
    path: '/panel-right-2/',
    content: `
      <div class="page">
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
      </div>
    `,
  },

  {
    path: '/seleccionespecialista/',
    url: './pages/seleccionespecialista.html',

  },

 {
    path: '/politicas/',
    url: './pages/politicas.html',

  },

  {
    path: '/configuracion/',
    url: './pages/configuracion.html',

  },

   {
    path: '/perfil/',
    url: './pages/perfil.html',
  },

   {
    path: '/detallesucursal/',
    url: './pages/detallesucursal.html',

  },

   {
    path: '/detalleespecialista/',
    url: './pages/detalleespecialista.html',

  },
   {
    path: '/detallepaquete/',
    url: './pages/detallepaquete.html',

  },


   {
    path: '/disponibilidadfecha/',
    url: './pages/disponibilidadfecha.html',

  },
  {
    path: '/disponibilidadfechasucursal/',
    url: './pages/disponibilidadfechasucursal.html',

  },

   {
    path: '/disponibilidadespecialista/',
    url: './pages/disponibilidadespecialista.html',

  },

   {
    path: '/disponibilidadespecialistaelegido/',
    url: './pages/disponibilidadespecialistaelegido.html',

  },

   {
    path: '/disponibilidadfechaadmin/',
    url: './pages/disponibilidadfechaadmin.html',

  },
 {
    path: '/disponibilidadespecialistaadmin/',
    url: './pages/disponibilidadespecialistaadmin.html',

  },
{
    path: '/disponibilidaproductoadmin/',
    url: './pages/disponibilidaproductoadmin.html',

  },


    {
    path: '/detalleservicio/',
    url: './pages/detalleservicio.html',

  },
 {
    path: '/detalleproductoservicios/',
    url: './pages/detalleproductoservicios.html',

  },
  {
    path: '/subcategorias/',
    url: './pages/subcategorias.html',

  },

  {
    path: '/subcategoriasdetalle/',
    url: './pages/subcategoriasdetalle.html',
  },

   {
    path: '/productoscategoria/',
    url: './pages/productoscategoria.html',

  },
  {
    path: '/productoscategoriadetalle/',
    url: './pages/productoscategoriadetalle.html',

  },
  
  {
    path: '/validadoqrcita/',
    componentUrl: './pages/validadoqrcita.html',

  },

   {
    path: '/validadoqrcita2/',
    componentUrl: './pages/validadoqrcita2.html',

  },

  // Account 
/*  {
    path: '/signin/',
    componentUrl: './pages/signin.html',
  },*/

  {
    path: '/login/',
    componentUrl: './pages/login.html',
  },
  {
    //accoun-area pide celular
    path: '/celular/',
    componentUrl: './pages/celular.html',
  },

   {
    //accoun-area pide celular
    path: '/signup2/',
    componentUrl: './pages/signup2.html',
  },

  {
    path: '/colocartoken/',
    componentUrl: './pages/colocartoken.html',
  },
    {
    path: '/registro/',
    componentUrl: './pages/registro.html',
  },
   // verificacion 
  {
    path: '/verificacion/',
    componentUrl: './pages/verificacion.html',

  },
   //cambiocontra
   {
    path:'/cambiocontra/',
    componentUrl: './pages/cambiocontra.html',
  },

   // forgot password
  {
    path: '/forgotpassword/',
    componentUrl: './pages/forgotpassword.html',
  },

  {
    path: '/carrito/',
    componentUrl: './pages/carrito.html',
  },
  {
   // path: '/listadocompras/',
   // componentUrl: './pages/listadocompras.html',
     path: '/listadocompras/',
    url: './pages/listadocompras.html',


  },



    {
    path: '/detallepago/',
    componentUrl: './pages/detallepago.html',
  },

  {
    path: '/resumenpago/',
    componentUrl: './pages/resumenpago.html',
  },

   {
    path: '/intereses/',
    componentUrl: './pages/intereses.html',
  },

  {
    path: '/servicioslista/',
   url: './pages/servicioslista.html',

  },


  // Pages
  {
    path: '/welcome/',
    url: './pages/welcome.html',
  },
  {
    path: '/home/',
    componentUrl: './pages/home.html',
  },

  {
    path: '/homeespecialista/',
    componentUrl: './pages/homeespecialista.html',
  },
  {
    path: '/homeadmin/',
    componentUrl: './pages/homeadmin.html',
  },

   {
    path: '/servicios/',
    componentUrl: './pages/servicios.html',
  },

  {
    path: '/calendarioespecialista/',
    componentUrl: './pages/calendarioespecialista.html',
  },

  

   {
    path: '/productos/',
    componentUrl: './pages/productos.html',
  }, 
  {
    path: '/bloqueos/',
    componentUrl: './pages/bloqueos.html',
  },

 {
    path: '/datospersonales/',
    url: './pages/datospersonales.html',
  },

   {
    path: '/datosacceso/',
    componentUrl: './pages/datosacceso.html',
  },
   {
    path: '/categoriaspaquetes/',
    componentUrl: './pages/categoriaspaquetes.html',
  },

  {
    path: '/seleccionarhorario/',
    url: './pages/seleccionarhorario.html',

  },


  {
    path: '/seleccionarhorario2/',
    url: './pages/seleccionarhorario2.html',

  },

   {
    path: '/seleccionarfecha/',
    url: './pages/seleccionarfecha.html',

  },


  {
    path: '/listadoespecialista/',
    url: './pages/listadoespecialista.html',

  },
  {
    path: '/citas/',
    url: './pages/citas.html',
  },

   {
    path: '/monedero/',
    url: './pages/monedero.html',
  },

   {
    path: '/escogermetodopago/',
    url: './pages/escogermetodopago.html',
  },

   {
    path: '/escogermonederootro/',
    url: './pages/escogermonederootro.html',
  },
  
  {
    path: '/search/',
    componentUrl: './pages/search.html',
  },
  {
    path: '/job-detail/',
    componentUrl: './pages/job-detail.html',
  },
  {
    path: '/apply-form/',
    url: './pages/apply-form.html',
  },

  {
    path: '/company-detail/',
    url: './pages/company-detail.html',
  },
  {
    path: '/profile/',
    url: './pages/profile.html',
  },
  {
    path: '/notifications-app/',
    url: './pages/notifications-app.html',
  },
  
  // Messages
  {
    path: '/messages-list/',
    url: './pages/messages-list.html',
  },
  {
    path: '/elements/',
    url: './pages/elements.html',
  },
  
  // Components
  {
    path: '/accordion/',
    url: './pages/accordion.html',
  },
  {
    path: '/action-sheet/',
    componentUrl: './pages/action-sheet.html',
  },
  {
    path: '/appbar/',
    componentUrl: './pages/appbar.html',
  },
  {
    path: '/area-chart/',
    componentUrl: './pages/area-chart.html',
  },
  {
    path: '/autocomplete/',
    componentUrl: './pages/autocomplete.html',
  },
  {
    path: '/badge/',
    url: './pages/badge.html',
  },
  {
    path: '/buttons/',
    componentUrl: './pages/buttons.html',
  },
  {
    path: '/calendar/',
    componentUrl: './pages/calendar.html',
  },
  {
    path: '/calendar-page/',
    componentUrl: './pages/calendar-page.html',
  },
  {
    path: '/cards/',
    url: './pages/cards.html',
  },
  {
    path: '/cards-expandable/',
    url: './pages/cards-expandable.html',
  },
  {
    path: '/checkbox/',
    componentUrl: './pages/checkbox.html',
  },
  {
    path: '/chips/',
    componentUrl: './pages/chips.html',
  },
  {
    path: '/color-picker/',
    componentUrl: './pages/color-picker.html',
  },
  {
    path: '/contacts-list/',
    url: './pages/contacts-list.html',
  },
  {
    path: '/content-block/',
    url: './pages/content-block.html',
  },
  {
    path: '/data-table/',
    componentUrl: './pages/data-table.html',
  },
  {
    path: '/dialog/',
    componentUrl: './pages/dialog.html',
  },
  {
    path: '/elevation/',
    url: './pages/elevation.html',
  },
  {
    path: '/fab/',
    url: './pages/fab.html',
  },
  {
    path: '/fab-morph/',
    url: './pages/fab-morph.html',
  },
  {
    path: '/form-storage/',
    url: './pages/form-storage.html',
  },
  {
    path: '/gauge/',
    componentUrl: './pages/gauge.html',
  },
  {
    path: '/grid/',
    url: './pages/grid.html',
  },
  {
    path: '/icons/',
    componentUrl: './pages/icons.html',
  },
  {
    path: '/infinite-scroll/',
    componentUrl: './pages/infinite-scroll.html',
  },
  {
    path: '/inputs/',
    url: './pages/inputs.html',
  },
  {
    path: '/lazy-load/',
    url: './pages/lazy-load.html',
  },
  {
    path: '/list/',
    url: './pages/list.html',
  },
  {
    path: '/list-index/',
    componentUrl: './pages/list-index.html',
  },
  {
    path: '/login-screen/',
    componentUrl: './pages/login-screen.html',
  },
  {
    path: '/login-screen-page/',
    componentUrl: './pages/login-screen-page.html',
  },
  {
    path: '/menu/',
    componentUrl: './pages/menu.html',
  },
  {
    path: '/menu-list/',
    componentUrl: './pages/menu-list.html',
  },
  {
    path: '/messages/',
    componentUrl: './pages/messages.html',
  },
  {
    path: '/navbar/',
    url: './pages/navbar.html',
  },
  {
    path: '/navbar-hide-scroll/',
    url: './pages/navbar-hide-scroll.html',
  },
  {
    path: '/notifications/',
    componentUrl: './pages/notifications.html',
  },
  {
    path: '/panel/',
    url: './pages/panel.html',
  },
  {
    path: '/photo-browser/',
    componentUrl: './pages/photo-browser.html',
  },
  {
    path: '/picker/',
    componentUrl: './pages/picker.html',
  },
  {
    path: '/pie-chart/',
    componentUrl: './pages/pie-chart.html',
  },
  {
    path: '/popup/',
    componentUrl: './pages/popup.html',
  },
  {
    path: '/popover/',
    url: './pages/popover.html',
  },
  {
    path: '/preloader/',
    componentUrl: './pages/preloader.html',
  },
  {
    path: '/progressbar/',
    componentUrl: './pages/progressbar.html',
  },
  {
    path: '/pull-to-refresh/',
    componentUrl: './pages/pull-to-refresh.html',
  },
  {
    path: '/radio/',
    url: './pages/radio.html',
  },
  {
    path: '/range/',
    componentUrl: './pages/range.html',
  },
  {
    path: '/searchbar/',
    url: './pages/searchbar.html',
  },
  {
    path: '/searchbar-expandable/',
    url: './pages/searchbar-expandable.html',
  },
  {
    path: '/sheet-modal/',
    componentUrl: './pages/sheet-modal.html',
  },
  {
    path: '/skeleton/',
    componentUrl: './pages/skeleton.html',
  },
  {
    path: '/smart-select/',
    url: './pages/smart-select.html',
  },
  {
    path: '/sortable/',
    url: './pages/sortable.html',
  },
  {
    path: '/stepper/',
    componentUrl: './pages/stepper.html',
  },
  {
    path: '/subnavbar/',
    url: './pages/subnavbar.html',
  },
  {
    path: '/subnavbar-title/',
    url: './pages/subnavbar-title.html',
  },
  {
    path: '/swiper/',
    url: './pages/swiper.html',
    routes: [
      {
        path: 'swiper-horizontal/',
        url: './pages/swiper-horizontal.html',
      },
      {
        path: 'swiper-vertical/',
        url: './pages/swiper-vertical.html',
      },
      {
        path: 'swiper-space-between/',
        url: './pages/swiper-space-between.html',
      },
      {
        path: 'swiper-multiple/',
        url: './pages/swiper-multiple.html',
      },
      {
        path: 'swiper-nested/',
        url: './pages/swiper-nested.html',
      },
      {
        path: 'swiper-loop/',
        url: './pages/swiper-loop.html',
      },
      {
        path: 'swiper-3d-cube/',
        url: './pages/swiper-3d-cube.html',
      },
      {
        path: 'swiper-3d-coverflow/',
        url: './pages/swiper-3d-coverflow.html',
      },
      {
        path: 'swiper-3d-flip/',
        url: './pages/swiper-3d-flip.html',
      },
      {
        path: 'swiper-fade/',
        url: './pages/swiper-fade.html',
      },
      {
        path: 'swiper-scrollbar/',
        url: './pages/swiper-scrollbar.html',
      },
      {
        path: 'swiper-gallery/',
        componentUrl: './pages/swiper-gallery.html',
      },
      {
        path: 'swiper-custom-controls/',
        url: './pages/swiper-custom-controls.html',
      },
      {
        path: 'swiper-parallax/',
        url: './pages/swiper-parallax.html',
      },
      {
        path: 'swiper-lazy/',
        url: './pages/swiper-lazy.html',
      },
      {
        path: 'swiper-pagination-progress/',
        url: './pages/swiper-pagination-progress.html',
      },
      {
        path: 'swiper-pagination-fraction/',
        url: './pages/swiper-pagination-fraction.html',
      },
      {
        path: 'swiper-zoom/',
        url: './pages/swiper-zoom.html',
      },
    ],
  },
  {
    path: '/swipeout/',
    componentUrl: './pages/swipeout.html',
  },
  {
    path: '/tabs/',
    url: './pages/tabs.html',
  },
  {
    path: '/tabs-static/',
    url: './pages/tabs-static.html',
  },
  {
    path: '/tabs-animated/',
    url: './pages/tabs-animated.html',
  },
  {
    path: '/tabs-swipeable/',
    url: './pages/tabs-swipeable.html',
  },
  {
    path: '/tabs-routable/',
    url: './pages/tabs-routable.html',
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
    componentUrl: './pages/text-editor.html',
  },
  {
    path: '/toast/',
    componentUrl: './pages/toast.html',
  },
  {
    path: '/toggle/',
    url: './pages/toggle.html',
  },
  {
    path: '/toolbar-tabbar/',
    componentUrl: './pages/toolbar-tabbar.html',
    routes: [
      {
        path: 'tabbar/',
        componentUrl: './pages/tabbar.html',
      },
      {
        path: 'tabbar-labels/',
        componentUrl: './pages/tabbar-labels.html',
      },
      {
        path: 'tabbar-scrollable/',
        componentUrl: './pages/tabbar-scrollable.html',
      },
      {
        path: 'toolbar-hide-scroll/',
        url: './pages/toolbar-hide-scroll.html',
      },
    ],
  },

   // landing
  {
    path: '/landing/',
   // componentUrl: './pages/landing.html',
   componentUrl: './pages/landing.html'
    /* async({ resolve, reject }) {
       getVistoAnuncio().then(r => {*/
          
         /*if(r.configuracion.mostraranuncios==1)
          {  */
         //  resolve({ componentUrl: './pages/landing.html', })

         /* }else{

          resolve({ componentUrl: './pages/login.html' })
        
          }*/
     /* });
    }*/
  },
  {
    path: '/tooltip/',
    componentUrl: './pages/tooltip.html',
  },
  {
    path: '/treeview/',
    componentUrl: './pages/treeview.html',
  },
  {
    path: '/timeline/',
    url: './pages/timeline.html',
  },
  {
    path: '/timeline-vertical/',
    url: './pages/timeline-vertical.html',
  },
  {
    path: '/timeline-horizontal/',
    url: './pages/timeline-horizontal.html',
  },
  {
    path: '/timeline-horizontal-calendar/',
    url: './pages/timeline-horizontal-calendar.html',
  },
  {
    path: '/virtual-list/',
    componentUrl: './pages/virtual-list.html',
  },
  {
    path: '/virtual-list-vdom/',
    componentUrl: './pages/virtual-list-vdom.html',
  },
  {
    path: '/vi/',
    componentUrl: './pages/vi.html',
  },

  // Color Themes
  {
    path: '/color-themes/',
    componentUrl: './pages/color-themes.html',
  },

  // Effects
  {
    path: '/page-transitions/',
    componentUrl: './pages/page-transitions.html',
  },
  {
    path: '/page-transitions/:effect',
    componentUrl: './pages/page-transitions-effect.html',
  },

  // Page Loaders
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/master-detail/',
    url: './pages/master-detail-master.html',
    master: true,
    detailRoutes: [
      {
        path: '/master-detail/:id/',
        componentUrl: './pages/master-detail-detail.html',
      },
    ],
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
