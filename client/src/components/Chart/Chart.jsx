import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MYSCORE } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const Chart = () => {
    const { loading, data } = useQuery(QUERY_MYSCORE);
    let wpm = 0;
    let accuracy = 0;
    
    if (Auth.loggedIn()) {
        console.log(data)
        wpm = data?.scoresByUser.map(score => { return score.wpm })
        accuracy =  data?.scoresByUser.map(score => { return score.accuracy })
    } 

    return (
        <>
            <Line 
                data={{
                    labels: [],
                    datasets: [
                        {
                            label: 'Words Per Minute',
                            data: {...wpm},
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            fill: true
                        }, {
                            label: 'Accuracy',
                            data: {...accuracy},
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