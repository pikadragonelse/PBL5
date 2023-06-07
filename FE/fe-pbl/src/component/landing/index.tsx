import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './index.scss';
import { useFollowPointer } from '../use-follow-pointer';
export const Landing = () => {
    const landingRef = useRef<HTMLDivElement>(null);
    if (landingRef.current != null) {
        landingRef.current.style.backgroundImage = 'url(' + process.env.PUBLIC_URL + '/ld3.webp)';
    }
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);
    return (
        <motion.section ref={landingRef} className="landing">
            <motion.div
                ref={ref}
                // animate={{ x, y }}
                // transition={{
                //     type: 'spring',
                //     damping: 3,
                //     stiffness: 50,
                //     restDelta: 0.001,
                // }}
                drag
                dragConstraints={{
                    top: -5,
                    left: -5,
                    right: 5,
                    bottom: 5,
                }}
                dragMomentum={false}
                whileDrag={{ scale: 1.1 }}
                dragSnapToOrigin
                dragElastic={1}
                className="content"
            >
                <h1 className="heading">System Control Area</h1>
                <p className="desc">
                    As a system to manage your area by a great combination of Camera and AI. We firmly believe that our
                    IoT system can help you to fully control your area in the most easy and convenient way.
                </p>
                <h4 className="developer">Bao Long, Huu Phuc, Quang Vinh</h4>
            </motion.div>
        </motion.section>
    );
};
