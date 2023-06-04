import React, { useEffect, useRef, useState } from 'react';
import './cam-heatmap.scss';
import useWebSocket from 'react-use-websocket';
import './cam-heatmap.scss';

export const data = {
    datasets: [
        {
            label: 'Amount of person',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderDash: [8, 4],
            fill: true,
            data: [],
        },
    ],
};

const WS_URL = 'ws://localhost:8765/get_frame';

export const options = {
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Số người xuất hiện trong khu vực theo thời gian thực',
        },
    },
    scales: {
        x: {
            type: 'realtime',
            realtime: {
                delay: 2000,
                onRefresh: (chart: any) => {
                    chart.data.datasets.forEach((dataset: any) => {
                        dataset.data.push({
                            x: Date.now(),
                            y: temp,
                        });
                    });
                },
            },
        },
        y: {
            type: 'linear',
            ticks: {
                stepSize: 1,
            },
            beginAtZero: true,
        },
    },
};

let temp: number = 0;
export type CamHeatMap = { frame: string; num_people: any };
export const CamHeatMap = ({ frame, num_people }: CamHeatMap) => {
    const [message, setMessage] = useState<any>([]);

    const { lastMessage, sendMessage } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
    });

    const parseToArray = (object: any) => {
        return Object.values(object);
    };

    const handleMessage = () => {
        if (lastMessage != null) {
            setMessage(parseToArray(JSON.parse(lastMessage.data)));
        }
    };

    useEffect(() => {
        sendMessage(JSON.stringify('get_frame'));
        handleMessage();
        draw();
        temp = message[1];
    }, [lastMessage]);

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refCanvas2 = useRef<HTMLCanvasElement>(null);

    const context = refCanvas.current?.getContext('2d');
    const context2 = refCanvas2.current?.getContext('2d');

    const draw = () => {
        if (refCanvas.current != null && context != null && context2 != null) {
            const img = new Image();
            const img2 = new Image();

            img.onload = function () {
                context.drawImage(img, 0, 0);
            };

            img2.onload = function () {
                context2.drawImage(img2, 0, 0);
            };

            img.src = 'data:image;base64,' + message[0];
        }
    };

    return (
        <div className="cam-heatmap-container">
            <canvas ref={refCanvas} id="canvas" width="560" height="420"></canvas>
            <canvas
                className="canvas-stack-up"
                style={{ opacity: '0.5', position: 'absolute' }}
                ref={refCanvas2}
                id="canvas2"
                width="560"
                height="420"
            ></canvas>
        </div>
    );
};
