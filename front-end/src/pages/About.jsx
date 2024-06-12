import React from 'react'
import { arrowRight, dot } from '../assets'

const About = (props) => {
    return (
        <div className={`w-[100vw] h-full flex items-center justify-center flex-col ${props.paged == 2 ? "show-page" : "animate-disappear"}`}>
            <p className='text-[1.2vw]'>About</p>
            <span className='font-semibold text-[3.5vw] mt-[-1.5vw]'>
                Tukeraja<span className='text-[#EB4184]'>.</span></span>
            <p className='text-[1vw] w-[80%] text-center'>
                Tukeraja is at the forefront of financial technology, reshaping currency exchange with our innovative platform. Using advanced algorithms, we deliver precise predictions and valuable insights into currency fluctuations, enabling investors, businesses, and travelers to make informed decisions with confidence. Whether you're navigating the complexities of international finance or planning your next trip abroad, Tukeraja provides the tools and expertise you need to succeed in the dynamic world of currency exchange.
            </p>
            <p className='text-[1.2vw] my-[1vw] font-semibold'>Our Team </p>
            <div className="w-[70%] pl-[9vw]">
                <div className="flex justify-between">
                    <span className='flex items-center text-[1.2vw] w-[50%]'>
                        <img src={dot} className="w-[8vw] mr-[1vw]" />
                        <h2>
                            <span>Achmad Mundir Wicaksono</span><br />
                            <span className='text-gradient'>162112133016</span>
                        </h2>
                    </span>
                    <span className='flex items-center text-[1.2vw] w-[50%]'>
                        <img src={dot} className="w-[8vw] mr-[1vw]" />
                        <h2>
                            <span>I Ketut Andika Wisnu Danuarta</span><br />
                            <span className='text-gradient'>162112133115</span>
                        </h2>
                    </span>
                </div>
                <div className="flex justify-between mt-[3vw]">
                    <span className='flex items-center text-[1.2vw] w-[50%]'>
                        <img src={dot} className="w-[8vw] mr-[1vw]" />
                        <h2>
                            <span>Juan Alberto Galih Leo</span><br />
                            <span className='text-gradient'>162112133027</span>
                        </h2>
                    </span>
                    <span className='flex items-center text-[1.2vw] w-[50%]'>
                        <img src={dot} className="w-[8vw] mr-[1vw]" />
                        <h2>
                            <span>Fransiscus Ernest O</span><br />
                            <span className='text-gradient'>162112133081</span>
                        </h2>
                    </span>
                </div>
            </div>

            <button className='mt-[5vw] font-semibold flex items-center text-[1.2vw]' onClick={() => props.handlePageChange(4)}>
                <img src={arrowRight} className='w-[1.5vw] mt-[0.1vw] mr-[1vw] animationLeft' /><span>Back To Main Page</span>
            </button>
        </div>
    )
}

export default About