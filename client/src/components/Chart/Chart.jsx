import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MYSCORE } from '../../utils/queries';
import Auth from '../../utils/auth';
import { formatTime } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Chart = () => {
    const { loading, data, refetch } = useQuery(QUERY_MYSCORE);
    
    useEffect(() => {
        refetch();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    let wpm = [];
    let accuracy = [];
    let dates = [];

    // Create new array so we can sort by createdAt
    let userDataArray = data?.meScores
        ? data?.meScores
            .map((score) => {
                return score;
            })
            .sort(function (a, b) {
                return a.createdAt - b.createdAt;
            })
        : [];

    if (Auth.loggedIn()) {
        wpm = userDataArray.map((score) => {
            return score.wpm;
        });
        accuracy = userDataArray.map((score) => {
            return score.accuracy;
        });
        dates = userDataArray.map((score) => {
            return formatTime(score.createdAt);
        });
    }
    
    if (loading) {
        return <p>Loading...</p>
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
                            tension: 0.1,
                        },
                        {
                            label: 'Accuracy',
                            data: accuracy,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            fill: true,
                            tension: 0.1,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Typing Progress',
                        },
                    },
                }}
            />
        </>
    );
};

export default Chart;
