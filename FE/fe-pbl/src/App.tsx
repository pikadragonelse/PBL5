import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

import { CamHeatMap, data, options } from './component/cam-heatmap/cam-heatmap';
import { Stream } from './component/line-chart-realtime';
import { Histogram } from './component/histogram';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, onValue, set } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Header } from './component/header';
import { Landing } from './component/landing';
import { AboutUs } from './component/about-us';
import { Footer } from './component/footer';
import { BarChart } from './component/bar-chart';
import { motion } from 'framer-motion';
import 'chartjs-plugin-zoom';

export const firebaseConfig: any = {
    type: 'service_account',
    project_id: 'realtime-crud-e8421',
    private_key_id: '68114c1d64b0563cce1f39328dec8160c9668ade',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqIgtYu8CzxO/C\ne3Eucp/Ap9lLa8qMOJrFj7brXp7X3jZ+VykKbfQ2O/VOuXXdYVsFwViXGR2ptAmj\nqMQXwjqPnWQeVIBpvvOfBarbsCsTVuh9S2aGo6CxYqGPQmgIhvu3l5Af1+7xffgH\nvP4EPLhtqw09z78+K/Jp4//nXhb1kpvhOL6JDGWiqEvvUZQoiJ24XbNllcIa2lDt\nP/am9XH2xdkiYifmFiCB8j8UcjnxnTiLtItiu+sEYY3IIgBTG+dtdNem85Nqkd/L\n4SaexQfbBV6EiCn2Sm38Zs0Pk73a8b/3weT5LCk2NdfFib0ACVSDtzBEdQNCSEgT\nQMnrORK1AgMBAAECggEAB/WTxlDyUPazqMuRnfSq2J6Boe+nCCxVwUxZ6GUC1WKF\n9h8pwl0mgasIbOhsRTEaywgilt8L7jaIBOoOUnY5uyJH3sthPpE6YIQpXCG/wiXc\nto/iegYJrILKwCMBLvTxrcMfcP3vJckY43PKBnS4xBiug+fGMKhprN6HyFE0jcR8\nbHLHQa/V/BT+tcZzbI+WcxNG8DroNFCwXXmkkjdMN69c+3ROPttY2ILWZ54lQvhi\n6C1XaWFHBvT52Fn6bJu/ynII3TuU7qWL47kN2iJw4zaDUJQiokyVwkEKeNeQ1oQ2\nkotgw6AXcqY13qgskVmsth7SYgZngndGm1cT0Rqr+QKBgQDsdix7VLcAgZ0V9wT3\ndcAzDPuO/abPCkUSeAebyLp58t1uB6jYMpXMuJMIseLNke6noleXPqL3a9Vk5gGZ\nTDfn63PbHaOxm2qjaw2M06cfTWVUAngQp1oY0KXeD4uReT1BYCchgqLwgSqIbifm\nzd5Ov0cA4O7toiAyJQPh5e1fzwKBgQC4MNWDdTPbXeoUgc3ucLx5z3oFYu+/h2hE\nHzfZoJ72GKZmhv6jbzw4E+COL2ocSoDR/eHqD6qzyPmj2J9rUdsdN19lIpL/2UzD\ntBPC8P/ubUdS5EzzMp1/2dxCgZ193gbl5cLmR9+iWg/GgHVwiXwtBxt6TD78AMek\nKDX2iK2iOwKBgCUmC6b0kCuMMVmaDTWzUhazG3JDd0lfm6pjIQ7gYit2dEMtAOG2\nUMJw3OioybDyFERRxOEF/iRQ1J2dZPLofn/5BaKO7YChogc6ck6FkePhDOI94Q78\nu7LaVLSmTI72NSFoMb2aAG84W65DYBFqllpYwpbov6Clr9kw54M91CURAoGBAKTD\nCjuNm9WfLMUrWAryzaYo8f3fgpbRiXNmeY8zHv8FDdSo7R9FYZjILxcBUun7u0Ac\n2vmFCi3ImYb3P6PAlUCNR8gwJU64EvL9IrA+5LFjD2oWzr69iCXVvDHBwB/XfFQq\nMy3LHUEdTv9B6cvBMFMXCH1dtvm1uOAfGCZwHOIBAoGAfgM3qaE+jCTT+/7RI/cQ\neePFgf2lsSKNmnABbhmy3xAOHiwzsaKPfBDliSxNTFI8iDoPC1RzIUm1UUFzppu6\nO/4KGlmS2wLeOFMP16Up9pws4slB4mYBwAm/cWeeHTSsFSX9YPTBn76Rbr0bLQJt\nvg8QaS87trKSby+En0/nB+w=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-9apax@realtime-crud-e8421.iam.gserviceaccount.com',
    client_id: '100992992206334415915',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9apax%40realtime-crud-e8421.iam.gserviceaccount.com',
    databaseURL: 'https://realtime-crud-e8421-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const optionBar: any = {
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Số lượng người xuất hiện trong khu vực theo giờ',
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                // drag:{
                //   enabled:true
                // },
                mode: 'y',
                speed: 100,
            },
            pan: {
                enabled: true,
                mode: 'y',
                speed: 0.5,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                stepSize: 1,
            },
        },
        y: {},
    },
};

function App() {
    const [dataList, setDataList] = useState<any>([]);
    const [frame, setFrame] = useState<any>([]);
    const [num_people, setNumPeople] = useState<any>([]);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef_data = ref(db, '/time');
    const dbRef_frame = ref(db, '/frame');
    const dbRef_heatmap = ref(db, '/heatmap');
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    useEffect(() => {
        onValue(dbRef_data, (snapshot) => {
            try {
                if (
                    snapshot.exists() &&
                    Object.entries(snapshot.val()).toString() !== Object.entries(dataList).toString()
                ) {
                    setDataList(snapshot.val());
                    const data = Object.values(snapshot.exportVal());
                    setNumPeople(data[data.length - 1]);
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        });
    }, [Object.entries(dataList).toString()]);

    useEffect(() => {
        onValue(dbRef_frame, (snapshot) => {
            try {
                if (
                    snapshot.exists() &&
                    Object.entries(snapshot.val()).toString() !== Object.entries(frame).toString()
                ) {
                    setFrame(snapshot.val());
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        });
    }, [Object.entries(frame).toString()]);

    const handleHistogramData = (dataRaw: any) => {
        const newDataList: any = [];
        const flagKey: any = {};
        for (const key of Object.keys(dataRaw)) {
            if (flagKey[dataRaw[key]] != null) {
                flagKey[dataRaw[key]]++;
            } else {
                flagKey[dataRaw[key]] = 1;
            }
        }

        for (const key of Object.keys(flagKey)) {
            newDataList.push({ x: key, y: flagKey[key] });
        }

        return newDataList;
    };

    const dataset = [
        {
            label: 'Số lần xuất hiện',
            data: handleHistogramData(dataList),
            backgroundColor: '#90c5f9',
            borderWidth: 1,
            barPercentage: 1,
            categoryPercentage: 1,
        },
    ];

    const timeOfficialMap: Record<string, number> = {};
    const dataBarList: Array<Record<string, any>> = [];

    const handleTime = (time: string) => {
        const year = time.split('', 4).join('');
        let temp = time.split('', 6);
        const month = temp[4] + temp[5];
        temp = time.split('', 8);
        const day = temp[6] + temp[7];
        temp = time.split('', 10);
        const hour = temp[8] + temp[9];

        return `${year}/${month}/${day} - ${hour}:00`;
    };

    const [barData, setBarData] = useState<Array<Record<string, any>>>([]);

    useEffect(() => {
        onValue(dbRef_data, (snapshot) => {
            try {
                if (snapshot.exists()) {
                    const timeArr = Object.keys(snapshot.val());
                    timeArr.forEach((time) => {
                        const timeOfficial = handleTime(time);

                        if (timeOfficialMap[timeOfficial] != null) {
                            timeOfficialMap[timeOfficial] += snapshot.val()[time];
                        } else {
                            timeOfficialMap[timeOfficial] = 0;
                        }
                    });

                    Object.keys(timeOfficialMap).forEach((item) => {
                        dataBarList.push({ x: item, y: timeOfficialMap[item] });
                    });

                    setBarData(dataBarList);
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        });
    }, []);

    const datasetBar = [
        {
            label: 'Số lượng người xuất hiện',
            data: barData,
            backgroundColor: '#f1fd4c',
        },
    ];

    const dataBar = {
        datasets: datasetBar,
    };

    const appRef = useRef<HTMLDivElement>(null);

    const [isHeatmap, setIsHeatmap] = useState<boolean>(true);

    useEffect(() => {
        if (isHeatmap === true) {
            set(dbRef_heatmap, 'True');
        }
        if (isHeatmap === false) {
            set(dbRef_heatmap, 'False');
        }
    }, [isHeatmap]);

    const dbRefServoTop = ref(db, '/servo/top');
    const dbRefServoBottom = ref(db, '/servo/bottom');
    const dbRefServoRight = ref(db, '/servo/right');
    const dbRefServoLeft = ref(db, '/servo/left');

    const [servoTop, setServoTop] = useState<number>(0);
    const [servoBottom, setServoBottom] = useState<number>(0);
    const [servoRight, setServoRight] = useState<number>(0);
    const [servoLeft, setServoLeft] = useState<number>(0);

    const valueMap: Record<any, string> = {
        true: 'True',
        false: 'False',
    };

    useEffect(() => {
        servoTop !== 0 ? set(dbRefServoTop, 'True') : set(dbRefServoTop, 'False');
    }, [servoTop]);

    useEffect(() => {
        servoBottom !== 0 ? set(dbRefServoBottom, 'True') : set(dbRefServoBottom, 'False');
    }, [servoBottom]);

    useEffect(() => {
        servoRight !== 0 ? set(dbRefServoRight, 'True') : set(dbRefServoRight, 'False');
    }, [servoRight]);

    useEffect(() => {
        servoLeft !== 0 ? set(dbRefServoLeft, 'True') : set(dbRefServoLeft, 'False');
    }, [servoLeft]);

    const [isVolume, setIsVolume] = useState<boolean>(false);
    const [isClickVolume, setIsClickVolume] = useState<boolean>(false);
    const dbRefVolume = ref(db, '/volume');

    const handleClickVolume = () => {
        setIsVolume((prev) => (prev = !prev));
        setIsClickVolume(true);
    };

    useEffect(() => {
        onValue(dbRefVolume, (snapshot) => {
            try {
                if (snapshot.exists() && isClickVolume === false) {
                    if (snapshot.val() === 'True') {
                        setIsVolume(true);
                    }
                    if (snapshot.val() === 'False') {
                        setIsVolume(false);
                    }
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        });
    }, []);

    useEffect(() => {
        if (isClickVolume === true) {
            const value = String(isVolume);
            set(dbRefVolume, valueMap[value]);
            setIsClickVolume(false);
        }
    }, [isVolume]);

    return (
        <div ref={appRef} className="app-container">
            <div className={`overlay ${isFullScreen ? 'show' : ''}`}></div>
            <Header className={`${isFullScreen ? 'hide' : ''}`} />
            <div className="main-content">
                <Landing />
                <motion.section
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    id="cam-view"
                    className={`cam-section ${isFullScreen ? 'show' : ''}`}
                >
                    <div className="container-stream">
                        <div className="button-control-container">
                            <button
                                className="btn-control btn-1 btn-top"
                                onClick={() => setServoTop((prev) => (prev = prev + 1))}
                            >
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <div className="sub-container">
                                <button
                                    className="btn-control btn-2 btn-left"
                                    onClick={() => setServoLeft((prev) => (prev = prev + 1))}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <button
                                    className="btn-control btn-2 btn-right"
                                    onClick={() => setServoRight((prev) => (prev = prev + 1))}
                                >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                            <button
                                className="btn-control btn-1 btn-bottom"
                                onClick={() => setServoBottom((prev) => (prev = prev + 1))}
                            >
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                        </div>
                        <div className={`cam-container `}>
                            <CamHeatMap frame={frame} num_people={num_people} fullScreen={isFullScreen} />
                        </div>
                    </div>
                    <button className="btn-full-size btn-cam" onClick={() => setIsFullScreen(false)}>
                        Out full screen
                    </button>
                    <button
                        className="btn-full-size btn-cam btn-heat-map"
                        onClick={() => setIsHeatmap((prev) => (prev = !prev))}
                    >
                        {isHeatmap === true ? 'Turn off heatmap' : 'Turn on heatmap'}
                    </button>
                    <button className="btn-full-size btn-cam btn-volume" onClick={handleClickVolume}>
                        {isVolume === true ? 'Turn off volume' : 'Turn on volume'}
                    </button>
                    <div className="content">
                        <h2 className="heading-cam">Camera Control</h2>
                        <p className="desc">
                            With IoT system, the observation system is designed from 1 camera and 2 servo motors. From
                            there, we can admire the entire area where the camera is located.
                        </p>
                        <button className="btn-full-size" onClick={() => setIsFullScreen(true)}>
                            Full screen
                        </button>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    id="graph"
                    className={`graph ${isFullScreen ? 'show' : ''}`}
                >
                    <motion.div
                        drag
                        dragConstraints={{
                            top: -5,
                            left: -5,
                            right: 5,
                            bottom: 5,
                        }}
                        dragElastic={0.2}
                        className="content"
                    >
                        <h2 className="heading-chart">Data visualization</h2>
                        <p className="desc">
                            The data of the system is visualized into graphs. This makes it easy for the user to observe
                            the change of the area. Not only that, these are also real-time charts, which will make the
                            data more vivid than ever.
                        </p>
                        <button className="btn-full-size" onClick={() => setIsFullScreen(true)}>
                            Full screen
                        </button>
                    </motion.div>
                    <motion.div className={`chart-container chart-container-main ${isFullScreen ? 'show' : ''}`}>
                        <div className="stream-container">
                            <Stream data={data} options={options} />
                        </div>
                        <div className="histogram-container">
                            <Histogram title="Mật độ người xuất hiện trong khung hình" datasets={dataset} />
                        </div>
                        <div className="bar-container">
                            <BarChart data={dataBar} options={optionBar} />
                        </div>
                    </motion.div>

                    <button className="btn-full-size btn-cam" onClick={() => setIsFullScreen(false)}>
                        Out full screen
                    </button>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    id="synthetic"
                    className={`mix-container ${isFullScreen ? 'show' : ''}`}
                >
                    <h1 className="heading-mix">Synthetic</h1>
                    <div className="mix">
                        <div className="cam-container">
                            <CamHeatMap frame={frame} num_people={num_people} fullScreen={false} />
                        </div>
                        <div className={`chart-container ${isFullScreen ? 'show' : ''}`}>
                            <div className="stream-container">
                                <Stream data={data} options={options} />
                            </div>
                            <div className="histogram-container">
                                <Histogram title="Mật độ người xuất hiện trong khung hình" datasets={dataset} />
                            </div>
                        </div>
                    </div>
                </motion.section>
                <AboutUs />
                <Footer />
            </div>
        </div>
    );
}

export default App;
