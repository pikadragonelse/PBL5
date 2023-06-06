import React, { useRef, useState } from 'react';
import './index.scss';
export const Landing = () => {
    const landingRef = useRef<HTMLDivElement>(null);
    if (landingRef.current != null) {
        landingRef.current.style.backgroundImage = 'url(' + process.env.PUBLIC_URL + '/ld3.webp)';
    }
    return (
        <section ref={landingRef} className="landing">
            <div className="content">
                <h1 className="heading">System Control Area</h1>
                <p className="desc">
                    As a system to manage your area by a great combination of Camera and AI. We firmly believe that our
                    IoT system can help you to fully control your area in the most easy and convenient way.
                </p>
                <h4 className="developer">Bao Long, Huu Phuc, Quang Vinh</h4>
            </div>
        </section>
    );
};
