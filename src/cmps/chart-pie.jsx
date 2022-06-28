import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({stockQty}) {

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Stock Chart',
         },
      },
   };

   const data = {
      labels: ['In stock', 'Out of stock'],
      datasets: [
        {
          label: 'Stock Count',
          data: stockQty,
          backgroundColor: [
             'rgba(22, 105, 30, 0.269)',
            'rgba(145, 25, 35, 0.5)',
          ],
         //  borderColor: [

         //     'rgba(22, 105, 30, 1)',
         //    'rgba(145, 25, 35, 1)',
         //  ],
          borderWidth: 2,
        },
      ],
    }

   return <Pie options={options} data={data}/>

}