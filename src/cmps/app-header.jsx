import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react'

import { userLogin, userLogout, userSignup } from '../store/actions/user.action.js'
import { LoginSignup } from './login-signup.jsx'
import { Cart } from './cart.jsx'
import login from '../assets/img/login.svg'
import cart from '../assets/img/cart.svg'

class _AppHeader extends React.Component {

   state = {
      isModalOpen: false,
      isCartOpen: false,
      isNavOpen: false
   }

   onLogin = (credentials) => {
      this.props.userLogin(credentials)
   }

   onSignup = (credentials) => {
      this.props.userSignup(credentials)
   }

   onLogout = () => {
      this.props.userLogout()
   }

   onOpenModal = () => {
      this.setState({ isModalOpen: !this.state.isModalOpen })
   }

   onCartOpen = () => {
      this.setState({ isCartOpen: !this.state.isCartOpen })
   }

   onToggleNav = () => {
      this.setState({ isNavOpen: !this.state.isNavOpen })
      console.log('Toggle');
   }

   render() {
      const { user } = this.props
      const { isModalOpen, isCartOpen, isNavOpen } = this.state
      const navBarClass = isNavOpen ? '' : 'nav-bar'
      return (
         <header className="app-header">
            <h1>Toy App 🚂</h1>
            <nav className={navBarClass}>
               <NavLink onClick={this.onToggleNav} exact to="/">Home</NavLink> {navBarClass && '|' }
               <NavLink onClick={this.onToggleNav} to="/toy">Toys</NavLink> {navBarClass && '|' }
               <NavLink onClick={this.onToggleNav} to="/dashboard">Dashboard</NavLink> {navBarClass && '|' }
               <NavLink onClick={this.onToggleNav} to="/about">About</NavLink>
            </nav>
            <div className="toggleModal" onClick={this.onToggleNav}>☰</div>
            <div className="right-header">
               <div onClick={this.onCartOpen}><img src={cart} alt="" /></div>
               {isCartOpen && <Cart user={user} />}

               {user &&
                  <section className="user-info">
                     <button className='logout' onClick={this.onLogout}> Logout</button>
                  </section>}
               {!user &&
                  <section className="user-info">
                     <Link to="/login"><img src={login} alt="" /></Link>
                     {isModalOpen && <LoginSignup heading={'Just checking'} onLogin={this.onLogin} onSignup={this.onSignup} />}
                  </section>}

            </div>

         </header >
      )
   }
}

const mapStateToProps = (storeState) => {
   return {
      user: storeState.userModule.user
   }
}

const mapDispatchToProps = {
   userLogin,
   userLogout,
   userSignup
}

export const AppHeader = connect(
   mapStateToProps,
   mapDispatchToProps

)(_AppHeader)