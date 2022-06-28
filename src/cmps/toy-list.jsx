
import React from 'react'
import { ToyPreview } from './toy-preview.jsx'

export function ToyList(props) {

   const { toys } = props
   return (
      <section>
         <main className="toy-list">
            {toys.map((toy, idx) =>
               <div className="toy-preview" key={toy._id}>
                  <ToyPreview toy={toy} idx={idx} />
               </div>)}
         </main>
      </section>
   )
}