import React from 'react';
import './index.scss';
export const AboutUs = () => {
    return (
        <section id="about-us" className="about-us">
            <h1 className="heading">About Us</h1>
            <div className="content">
                <p className="desc">
                    Are 3 3rd year students of Polytechnic University - University of Danang, Faculty of Information
                    Technology. We spent more than 3 months researching and building an area control system called Your
                    Area with the hope that people can control everything in their lives in the most convenient way.
                </p>
                <div className="inf-container">
                    <div className="inf">
                        <img src={process.env.PUBLIC_URL + '/long.jpg'} alt="" className="img" />
                        <span className="name">Bao Long</span>
                    </div>
                    <div className="sub-container">
                        <div className="inf">
                            <img src={process.env.PUBLIC_URL + '/vinh.jpg'} alt="" className="img" />
                            <span className="name">Quang Vinh</span>
                        </div>
                        <div className="inf">
                            <img src={process.env.PUBLIC_URL + '/phuc.jpg'} alt="" className="img" />
                            <span className="name">Huu Phuc</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
