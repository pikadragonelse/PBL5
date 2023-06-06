import React, { useEffect, useState } from 'react';

import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export type Header = { scrollTop?: number };
export const Header = ({ scrollTop }: Header) => {
    const [isBackground, setIsBackground] = useState<boolean>(false);

    const handleScrollPage = (scrollTop: number) => {
        if (scrollTop > 50) {
            setIsBackground(true);
        } else {
            setIsBackground(false);
        }
        console.log(123);
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
                    <li className="nav-item">
                        <a href="#cam-view" className="link-section">
                            Cam View
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#graph" className="link-section">
                            Graph
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#synthetic" className="link-section">
                            Synthetic
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#about-us" className="link-section">
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
