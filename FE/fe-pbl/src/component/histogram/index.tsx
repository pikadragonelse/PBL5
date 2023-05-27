import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { CategoryScale, Chart, LinearScale, PointElement, BarElement, Title, Legend, Tooltip } from 'chart.js';
import 'chartjs-adapter-luxon';

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Legend, Tooltip);

export type Histogram = { title?: string; datasets: Array<any> };

export const Histogram = ({ title, datasets }: Histogram) => {
    const optionHistogram: any = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                type: 'linear',
                ticks: {
                    stepSize: 1,
                },
            },
            y: {},
        },
    };

    const dataHistogram = {
        datasets: datasets,
    };

    return <Bar data={dataHistogram} options={optionHistogram} />;
};
