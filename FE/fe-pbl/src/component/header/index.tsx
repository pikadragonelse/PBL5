import React, { useEffect, useState } from 'react';

import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const navMap = {
    1: 'active-cam',
    2: 'active-graph',
    3: 'active-mix',
    4: 'active-about',
};

export type Header = { scrollTop?: number };
export const Header = ({ scrollTop }: Header) => {
    const [isBackground, setIsBackground] = useState<boolean>(false);
    const [location, setLocation] = useState<string>('');

    const handleScrollPage = (scrollTop: number) => {
        if (scrollTop > 50) {
            setIsBackground(true);
        } else {
            setIsBackground(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => handleScrollPage(window.pageYOffset));

        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, []);

    return (
        <header className={`header ${isBackground === true ? 'background' : ''}`}>
            <div className="logo-container">
                <img src={process.env.PUBLIC_URL + '/tobotic.png'} alt="" className="logo" />
            </div>
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className={`nav-item ${location === '1' ? 'active' : ''}`} id="1">
                        <a
                            id="1"
                            href="#cam-view"
                            className="link-section"
                            onClick={(event) => {
                                setLocation(event.currentTarget.id);
                            }}
                        >
                            Cam View
                        </a>
                    </li>
                    <li className={`nav-item ${location === '2' ? 'active' : ''}`} id="2">
                        <a
                            id="2"
                            href="#graph"
                            className="link-section"
                            onClick={(event) => {
                                setLocation(event.currentTarget.id);
                            }}
                        >
                            Graph
                        </a>
                    </li>
                    <li className={`nav-item ${location === '3' ? 'active' : ''}`} id="3">
                        <a
                            id="3"
                            href="#synthetic"
                            className="link-section"
                            onClick={(event) => {
                                setLocation(event.currentTarget.id);
                            }}
                        >
                            Synthetic
                        </a>
                    </li>
                    <li className={`nav-item ${location === '4' ? 'active' : ''}`} id="4">
                        <a
                            href="#about-us"
                            className="link-section"
                            id="4"
                            onClick={(event) => {
                                setLocation(event.currentTarget.id);
                            }}
                        >
                            About Us
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="config">
                <FontAwesomeIcon icon={faGear} className="setting-icon" />
            </div>
        </header>
    );
};
