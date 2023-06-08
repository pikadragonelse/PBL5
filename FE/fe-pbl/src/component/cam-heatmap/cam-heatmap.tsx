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
            color: 'white',
        },
    },
};

let temp: number = 0;
export type CamHeatMap = { fullScreen: boolean; port?: any };
export const CamHeatMap = ({ fullScreen, port }: CamHeatMap) => {
    const WS_URL = `ws://0.tcp.ap.ngrok.io:${port}/get_frame`;
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
            console.log(message[0]);
        }
    };
    if (refCanvas.current != null && context != null && context2 != null) {
        context.fillStyle = '#7d7d7d4e';
        context.fillRect(0, 0, refCanvas.current?.width, refCanvas.current?.height);
    }

    return (
        <div className={`cam-heatmap-container ${fullScreen === true ? 'full-screen' : ''}`}>
            <canvas ref={refCanvas} id="canvas" className="canvas-1" width={1280} height={720}></canvas>
            <canvas
                className="canvas-stack-up canvas-2"
                style={{ position: 'absolute' }}
                ref={refCanvas2}
                id="canvas2"
            ></canvas>
        </div>
    );
};
