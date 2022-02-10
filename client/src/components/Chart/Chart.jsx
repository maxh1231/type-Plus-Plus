import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MYSCORE } from '../../utils/queries';
import Auth from '../../utils/auth';
import { formatTime } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const Chart = () => {
    const { loading, data } = useQuery(QUERY_MYSCORE);
    let wpm = [];
    let accuracy = [];
    let dates = []
    
    if (Auth.loggedIn()) {
        wpm = data?.scoresByUser.map(score => { return score.wpm });
        accuracy =  data?.scoresByUser.map(score => { return score.accuracy });
        dates = data?.scoresByUser.map(score => { return formatTime(score.createdAt) });
    } 

    return (
        <>
            <Line 
                data={{
                    labels: dates,
                    datasets: [
                        {
                            label: 'Words Per Minute',
                            data: wpm,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            fill: true,
                            tension: 0.1
                        }, {
                            label: 'Accuracy',
                            data: accuracy,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            fill: true,
                            tension: 0.1
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