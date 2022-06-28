import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({priceGroup, priceCount}) {

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Price group Chart',
         },
      },
   };
   
   const labels = priceGroup;
   
   const data = {
      labels,
      datasets: [
         {
            label: 'Count of toys',
            data: priceCount,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
         },
      ],
   };

   return <Bar options={options} data={data} />;
   
}

