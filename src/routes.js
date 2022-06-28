
import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { ToyApp } from './pages/toy-app.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'
import { ToyDetails } from './pages/toy-details.jsx'
import { LogIn } from './pages/login.jsx'
import { Dashboard } from './pages/dashboard.jsx'

export default
    [
        { path: '/toy/edit/:toyId?', component: ToyEdit },
        { path: '/toy/details/:toyId?', component: ToyDetails },
        { path: '/toy', component:  ToyApp },
        { path: '/about', component: AboutUs },
        { path: '/login', component: LogIn },
        { path: '/dashboard', component: Dashboard },
        { path: '/', component: HomePage }
    ]