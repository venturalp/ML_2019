import Home from './pages/home'
import Items from './pages/items'
import Item from './pages/item'
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
    path: '/items/:id',
    component: Item,
    exact: true,
  },
  {
    path: '*',
    component: Error404,
  },
]

export default routes
