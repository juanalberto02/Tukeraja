import React from 'react'
import { arrowRight, dot } from '../assets'

const About = (props) => {
    return (
        <div className={`w-[100vw] h-full flex items-center justify-center flex-col ${props.paged == 2 ? "show-page" : "animate-disappear"}`}>
            <p className='text-md'>About</p>
            <span className='font-semibold text-[3.5rem] mt-[-1.5rem]'>
                Tukeraja<span className='text-[#EB4184]'>.</span></span>
            <p className='text-sm w-[80%] text-center'>
                Tukeraja is at the forefront of financial technology, reshaping currency exchange with our innovative platform. Using advanced algorithms, we deliver precise predictions and valuable insights into currency fluctuations, enabling investors, businesses, and travelers to make informed decisions with confidence. Whether you're navigating the complexities of international finance or planning your next trip abroad, Tukeraja provides the tools and expertise you need to succeed in the dynamic world of currency exchange.
            </p>
            <p className='text-md my-8 font-semibold'>Our Team </p>
            <div className="w-[70%] pl-20">
                <div className="flex justify-between">
                    <span className='flex items-center text-lg w-[50%]'>
                        <img src={dot} className="w-32 mr-8" />
                        <h2>
                            <span>Achmad Mundir Wicaksono</span><br />
                            <span className='text-gradient'>162112133115</span>
                        </h2>
                    </span>
                    <span className='flex items-center text-lg w-[50%]'>
                        <img src={dot} className="w-32 mr-8" />
                        <h2>
                            <span>I Ketut Andika Wisnu Danuarta</span><br />
                            <span className='text-gradient'>162112133115</span>
                        </h2>
                    </span>
                </div>
                <div className="flex justify-between mt-12">
                    <span className='flex items-center text-lg w-[50%]'>
                        <img src={dot} className="w-32 mr-8" />
                        <h2>
                            <span>Juan Alberto Galih Leo</span><br />
                            <span className='text-gradient'>162112133115</span>
                        </h2>
                    </span>
                    <span className='flex items-center text-lg w-[50%]'>
                        <img src={dot} className="w-32 mr-8" />
                        <h2>
                            <span>Fransiscus Ernest O</span><br />
                            <span className='text-gradient'>162112133115</span>
                        </h2>
                    </span>
                </div>
            </div>

            <button className='mt-20 font-semibold flex items-center' onClick={() => props.handlePageChange(4)}>
                <img src={arrowRight} className='w-[1.5rem] mt-[0.1rem] mr-4 animationLeft' /><span>Back To Main Page</span>
            </button>
        </div>
    )
}

export default About