import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, RealTimeScale, StreamingPlugin, Title, Legend, Tooltip);

export type Stream = { data: any; options: any };

export const Stream = ({ data, options }: Stream) => {
    return <Line data={data} options={options} />;
};
