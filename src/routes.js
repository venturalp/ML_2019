import Home from './pages/home'
import Error404 from './pages/Error404'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '*',
    component: Error404,
  },
]

export default routes
