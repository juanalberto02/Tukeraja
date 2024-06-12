import React, { useEffect } from 'react';
import { glassBg, pinkShape, blueShape, arrowRight } from '../assets';

const Landing = (props) => {
    useEffect(() => {
        const element = document.querySelector('.disappear');
        if (element) {
            const timeoutId = setTimeout(() => {
                element.style.display = 'none';
            }, 1300); // 4 seconds to match the animation duration

            // Clean up the timeout if the component unmounts
            return () => clearTimeout(timeoutId);
        }
    }, [props.paged]);

    return (
        <div className={`relative w-full h-screen overflow-hidden ${props.paged !== 0 ? 'disappear' : ''}`}>
            <img src={pinkShape} className={`pinkShape ${props.paged !== 0 ? 'animate-disappear-pink' : ''}`} />
            <img src={blueShape} className={`blueShape ${props.paged !== 0 ? 'animate-disappear-blue' : ''}`} />
            <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-20 backdrop-blur-md p-[2vw] rounded-lg shadow-lg">
                <div className={`${props.paged !== 0 ? 'animate-disappear' : ''}`}>
                    <h1 className='mt-[37vh] text-[4vw] w-[50%] leading-[5vw]'>
                        Welcome to <span className='font-semibold'>Tukeraja<span className='text-[#EB4184]'>.</span></span> Unlocking Currency Exchange Insights!
                    </h1>
                    <p className='text-[1vw] mt-[1vw] w-[50%]'>
                        Tukeraja predicts currency exchange rates with advanced algorithms, empowering confident financial decisions for investors, businesses, and travelers alike 💰
                    </p>
                    <button className='mt-[2vw] text-[1.2vw] font-semibold flex items-center' onClick={() => props.handlePageChange(1)}>
                        Getting Started <img src={arrowRight} className='ml-4 w-[1.4vw] animationRight mt-0.5' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
