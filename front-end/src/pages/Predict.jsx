import React, { useEffect } from 'react'
import { arrowUpWhite } from '../assets'

const Predict = (props) => {

    // Nyambung sama effect show-page (inget buat ngasi waktu yang sama pada animasinya show-page)
    useEffect(() => {
        const element = document.querySelector('.show-page');
        if (element) {
            const timeoutId = setTimeout(() => {
                element.classList.remove('show-page');
            }, 4500);
            return () => clearTimeout(timeoutId);
        }
    }, [props.paged]);


    return (
        <>
            <div className={`w-full h-screen ${props.paged == 1 ? "show-page" : ""}`}>
                <div className="w-full flex items-center justify-between py-8">
                    <span className='font-semibold text-2xl ml-12'>
                        Tukeraja<span className='text-[#EB4184]'>.</span></span>
                    <div className="flex items-center justify-center mr-12">
                        <button className='mr-7'>Blogs</button>
                        <button>About Us</button>
                    </div>
                </div>

                {/* Bagian body nya */}
                <div className="w-full flex px-12">

                    {/* Left Body Part */}
                    <div className="w-[35%] flex justify-center py-16 px-6 relative flex-col">
                        <div className="relative animate-up-down">
                            <div className="gradient-pink w-full h-[10rem] rounded-2xl"></div>
                            <div className="absolute w-full top-4  left-2">
                                <div className="w-full h-[10rem] border-[0.1rem] border-white bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg p-4
                            text-white">
                                    <p className='text-[0.7rem]'>
                                        CURRENT EXCHANGE RATE
                                    </p>
                                    <p className='text-[1.7rem] flex items-center '>
                                        <span>IDR 16.500,00</span>
                                        <img src={arrowUpWhite} className='rotate-90 w-4 mx-8' />
                                        <span>$1</span>
                                    </p>
                                    <div className="h-[0.1rem] w-[30%] bg-white my-[0.5rem]"></div>
                                    <p className='text-md flex items-center'>
                                        <img src={arrowUpWhite} className='w-[0.4rem] mr-[0.2rem]' />
                                        <span>400</span>
                                        <span className='ml-[0.4rem]'> | 12-20-2024</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h2 className='text-2xl mt-16 font-medium'>
                            Create Prediction
                        </h2>
                        <p className='mt-2 text-md  text-[#f6468a]'>Please insert days</p>
                        <input type="number" id="numberInput" min="1" max="10" placeholder='0' className='
                        border-[0.1rem] p-2 mt-2 rounded-md outline-none border-[#f35b95] h-12 text-[#f6468a]' />
                        <div className="w-full flex justify-end">
                            <button type="submit" className='mt-4 w-24 h-8 border-[#f6468a] border-[0.1rem] rounded-md text-sm bg-[#f35b95] text-white
                              hover:w-32 duration-[0.5s]
                            '>
                                Predict
                            </button>
                        </div>


                    </div>


                    {/* Right Body Part */}
                </div>
            </div>
        </>
    )
}

export default Predict