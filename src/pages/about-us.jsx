import { useState } from 'react'
// import React from 'react'
import { Map } from '../cmps/map.jsx'

export function AboutUs(props) {

   const [branch, setBranch] = useState({ lat: 32.0716623, lng: 34.7848943 })

   const onChangeBranch = (branch) => {
      if (branch === 'Tel Aviv') setBranch({ lat: 32.0716623, lng: 34.7848943 })
      if (branch === 'Eilat') setBranch({ lat: 29.568518, lng: 34.9590023 })
      if (branch === 'Haifa') setBranch({ lat: 32.7908821, lng: 34.9630955 })
   }

   return (
      <section className='app-about'>
         <h2>About Us</h2>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit,
            laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.
         </p>
         <div className="branches">
            <button onClick={() => { onChangeBranch('Eilat') }} >Eilat</button>
            <button onClick={() => { onChangeBranch('Haifa') }} >Haifa</button>
            <button onClick={() => { onChangeBranch('Tel Aviv') }} >Tel Aviv</button>
         </div>
         <Map branch={branch} />
      </section>
   )
}