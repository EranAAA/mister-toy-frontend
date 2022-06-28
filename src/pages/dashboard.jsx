import React from 'react'
import { PieChart } from '../cmps/chart-pie.jsx'
import { BarChart } from '../cmps/chart-bar.jsx'

import { toyService } from '../services/toy.service.js'

export class Dashboard extends React.Component {

   state = {
      toys: ''
   }

   componentDidMount() {
      toyService.query()
         .then(toys => {
            this.setState({ toys })
         })
   }

   render() {
      const { toys } = this.state
      const stockQty = toys && [(toys.filter(toy => toy.inStock)).length, (toys.filter(toy => !toy.inStock)).length]

      const priceGroup = ['0-75', '75-100', '100-125', '125-150', '150-175', '175-200', '200+']
      const priceCount = toys && [
         (toys.filter(toy => toy.price <= 75)).length,
         (toys.filter(toy => toy.price <= 100)).length,
         (toys.filter(toy => toy.price <= 125)).length,
         (toys.filter(toy => toy.price <= 150)).length,
         (toys.filter(toy => toy.price <= 175)).length,
         (toys.filter(toy => toy.price <= 200)).length,
         (toys.filter(toy => toy.price > 200)).length]

      return (
         <section className="dashboard">
            <div className="chart-container">
               <div className="pie-container">
                  <PieChart className="pie" stockQty={stockQty} />
               </div>
               <div className="bar-container">
                  <BarChart className="bar" priceGroup={priceGroup} priceCount={priceCount} />
               </div>
            </div>
         </section>
      )
   }
}
