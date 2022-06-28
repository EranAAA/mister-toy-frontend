
import React from 'react'

export function Cart(props) {

   if (!props.user) return
   const { cart } = props.user
   const total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0)

   return (
      <section className='cart'>
         <div>Credit: </div>
         <table>
            <tbody>
               <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
               </tr>
               {cart.map((item, idx) =>
                  <tr key={idx}>
                     <td>{item.name}</td>
                     <td>${item.price}</td>
                     <td>{item.qty}</td>
                     <td>${item.qty * item.price}</td>
                  </tr>)}
               <tr> 
                  <th>Total:  </th>
                  <th colSpan={4} className="cart-total">${total}</th>
               </tr>
            </tbody>
         </table>

      </section>
   )
}