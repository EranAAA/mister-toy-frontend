
import { connect } from "react-redux";
import React from 'react'

import home from '../assets/img/home.svg'

class _HomePage extends React.Component {

   render() {
      const { user } = this.props
      return (
         <section className="app-home">
            <h2> {user && `${user.fullname}`} <br /><br /> Welcome to Toy Store</h2 >
            <img src={home} alt="" />
         </section >
      )
   }
}

const mapStateToProps = (storeState) => {
   return {
      user: storeState.userModule.user
   }
}

export const HomePage = connect(
   mapStateToProps,
)(_HomePage)
