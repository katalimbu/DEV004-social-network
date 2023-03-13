
//1 Se crea el  arreglo de rutas
const routes = [
    {
      pathname: '/',
      component: Home,
    },
    {
      pathname: '/register',
      component: Register,
    },
    {
      pathname: '/feed',
      component: Feed,
    },
    {
      pathname: '*', // ruta por defecto
      component: NotFound,
    },
  ]
