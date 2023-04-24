import React from 'react';
import './App.css';

import { CamHeatMap, data, options } from './component/cam-heatmap/cam-heatmap';
import { Stream } from './component/line-chart-realtime';

function App() {
    return (
        <div className="app-container">
            <CamHeatMap />
            <div className="chart-container">
                <Stream data={data} options={options} />
            </div>
        </div>
    );
}

export default App;
