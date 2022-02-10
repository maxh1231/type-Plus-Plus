import React from 'react';
import { useQuery } from '@apollo/client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const Chart = () => {
    return (
        <>
            <Line 
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Words Per Minute',
                            data: [20, 30, 30, 35, 40, 50],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            fill: true
                        }, {
                            label: 'Accuracy',
                            data: [80, 85, 87, 90, 90, 95],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            fill: true
                        }
                    ]
                }}
                options={{
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Typing Progress'
                        }
                    }
                }}
            />
        </>
    )
}

export default Chart;