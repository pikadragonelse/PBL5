import React, { useEffect, useRef, useState } from 'react';
import './cam-heatmap.scss';
import useWebSocket from 'react-use-websocket';
import './cam-heatmap.scss';

const WS_URL = 'ws://localhost:8765/';

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
                delay: 5000,
                onRefresh: (chart: any) => {
                    chart.data.datasets.forEach((dataset: any) => {
                        dataset.data.push({
                            x: Date.parse(time),
                            y: temp,
                        });
                    });
                },
            },
        },
        y: {},
    },
};

let temp: number = 0;
let time: any = '';

export const CamHeatMap = () => {
    const [message, setMessage] = useState<any>('');

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
        sendMessage(JSON.stringify('get_info'));
        handleMessage();
        draw();
        temp = message[2];
        time = message[3];
    }, [lastMessage]);

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refCanvas2 = useRef<HTMLCanvasElement>(null);
    // const refCanvas3 = useRef<HTMLCanvasElement>(null);

    const context = refCanvas.current?.getContext('2d');
    const context2 = refCanvas2.current?.getContext('2d');
    // const context3 = refCanvas3.current?.getContext('2d');

    const draw = () => {
        if (refCanvas.current != null && context != null && context2 != null /*&& context3 != null*/) {
            const img = new Image();
            const img2 = new Image();
            const img3 = new Image();

            img.onload = function () {
                context.drawImage(img, 0, 0);
            };

            img2.onload = function () {
                context2.drawImage(img2, 0, 0);
            };

            // img3.onload = function () {
            //     context3.drawImage(img3, 0, 0);
            // };

            img.src = 'data:image;base64,' + message[0];
            img2.src = 'data:image;base64,' + message[1];
            // img3.src = 'data:image;base64,' + message[2];
        }
    };

    return (
        <div className="cam-heatmap-container">
            <canvas ref={refCanvas} id="canvas" width="640" height="480"></canvas>
            <canvas
                className="canvas-stack-up"
                style={{ opacity: '0.5', position: 'absolute', background: 'red' }}
                ref={refCanvas2}
                id="canvas2"
                width="640"
                height="480"
            ></canvas>
            {/* <canvas
                style={{ opacity: '0.5', position: 'absolute' }}
                ref={refCanvas3}
                id="canvas3"
                width="640"
                height="480"
            ></canvas> */}
        </div>
    );
};
