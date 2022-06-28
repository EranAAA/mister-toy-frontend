import React from 'react'

export function NicePopup(props) {
   return (
      <div className="nice-popup">
         <header>
            Nice popup Header
            <button style={{ float: 'right' }} onClick={props.onClose}>x</button>
         </header>
         <main>
            {props.children}
         </main>
         <footer>
            Nice popup Fotter
         </footer>

      </div>)

}
