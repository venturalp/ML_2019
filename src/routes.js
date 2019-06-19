import Home from './pages/home'
import Items from './pages/items'
import Error404 from './pages/Error404'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/items',
    component: Items,
    exact: true,
  },
  {
    path: '*',
    component: Error404,
  },
]

export default routes
