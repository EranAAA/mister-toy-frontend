import { Switch, Route } from "react-router-dom";
import React from 'react'
import routes from './routes.js'

import { UserMsg } from './cmps/user-msg.jsx'
import { AppHeader } from './cmps/app-header.jsx'
// import { AppFooter } from './cmps/app-footer.jsx'

import './styles/styles.scss';

export class RootCmp extends React.Component {

   render() {
      return (
         <div className="app">
            <UserMsg />
            <AppHeader />
            <main>
               <Switch>
                  {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
               </Switch>
            </main>
            {/* <AppFooter /> */}
         </div>
      )
   }
}
