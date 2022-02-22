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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        return (
            <div className='m-auto text center w-fit pt-6'>
                <div className="inline-flex items-center w-fit px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-theme-blue transition ease-in-out duration-150">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                Loading...
                </div>
            </div>
        )
    }

    // Determine labeling colors
    let theme = localStorage.theme === 'light';

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
                            font: {
                                size: 20,
                            },
                            color: '#6b7280',
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: '#6b7280',
                                autoSkip: true,
                            },
                        },
                        x: {
                            ticks: {
                                color: '#6b7280',
                                autoSkip: true,
                                maxTicksLimit: 5
                            },
                        },
                    },
                    color: '#6b7280',
                }}
            />
        </>
    );
};

export default Chart;
