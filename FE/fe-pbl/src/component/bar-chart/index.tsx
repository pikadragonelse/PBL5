import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

import './index.scss';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RealTimeScale,
    StreamingPlugin,
    Title,
    Legend,
    Tooltip,
);

export type BarChart = { data: any; options: any };

export const BarChart = ({ data, options }: BarChart) => {
    return <Bar data={data} options={options}></Bar>;
};
