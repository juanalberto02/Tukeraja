import React, { useEffect } from 'react'
import { arrowRightGrey, arrowUpWhite, dropDownGrey, dropDownWhite, dummyDiagram } from '../assets'

const Predict = (props) => {

    // Nyambung sama effect show-page (inget buat ngasi waktu yang sama pada animasinya show-page)
    useEffect(() => {
        const element = document.querySelector('.show-page');
        if (element) {
            const timeoutId = setTimeout(() => {
                element.classList.remove('show-page');
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [props.paged]);


    return (
        <>
            <div className={`w-[100vw] h-screen ${[1, 4, 5].includes(props.paged) ? "show-page" : "animate-disappear"}`}>
                {/* Header */}
                <div className="w-full flex items-center justify-between py-8">
                    <span className='font-semibold text-2xl ml-12 cursor-pointer'>
                        Tukeraja<span className='text-[#EB4184]'>.</span></span>
                    <div className="flex items-center justify-center mr-12">
                        <button onClick={() => props.handlePageChange(3)} className='mr-7'>Blogs</button>
                        <button onClick={() => props.handlePageChange(2)}>About</button>
                    </div>
                </div>

                {/* Bagian body nya */}
                <div className="w-full flex px-12">
                    {/* Left Body Part */}
                    <div className="w-[35%] h-full flex justify-center py-12 px-6 relative flex-col">
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
                    {/* End Left Body Part */}


                    {/* Right Body Part */}
                    <div className="w-[65%] py-12 px-16">

                        {/* Opsi currency */}
                        <div className="w-full h-[4.5rem] flex">
                            <div className="w-[13rem] h-full bg-[#53B9EA] rounded-xl">
                                <div className="flex py-2 px-4 h-full items-center justify-between">
                                    <span className='leading-[1.2rem]'>
                                        <span className='text-[1.2rem] text-white'>IDR</span>
                                        <br />
                                        <span className='text-[0.8rem] text-white'>10.000,00</span>
                                        <span className='font-sans ml-[0.2rem] text-[#A9DCF5] text-[0.8rem]'>Rupiah</span>
                                    </span>
                                    <img src={dropDownWhite} className='w-[1.8rem]' />
                                </div>
                            </div>
                            <img src={arrowRightGrey} className='w-[3.5rem] mx-[1rem]' />
                            <div className="w-[13rem] h-full border-[#d1d1d1] border-[0.1rem] rounded-xl mr-4">
                                <div className="flex py-2 px-4 h-full items-center justify-between">
                                    <span className='leading-[1.2rem]'>
                                        <span className='text-[1.2rem] text-[#f35b95]'>USD</span>
                                        <br />
                                        <span className='text-[0.8rem] text-[#6c6c6c]'>1,00</span>
                                        <span className='font-sans ml-[0.2rem] text-[#bdbdbd] text-[0.8rem]'>Dollar</span>
                                    </span>
                                    <img src={dropDownGrey} className='w-[1.8rem]' />
                                </div>
                            </div>
                        </div>
                        <h2 className='text-2xl font-medium mt-6'>
                            Exchange Rate Diagram
                        </h2>

                        {/* Display diagram */}
                        {/* <div className=""></div> */}
                        <img src={dummyDiagram} className='mt-4' />

                        {/* Penjelasan diagram */}
                        <p className='text-sm mt-6 text-[#3a3a3a]'>
                            "Explore the journey of currency values over time with our intuitive year-to-year exchange rate charts. Witness the fluctuations, spot trends, and gain insights into how global events shape currency values. Whether you're an investor tracking market movements or a traveler planning ahead, our charts provide a clear visualization of currency performance, empowering you to make informed decisions for the future."
                        </p>
                    </div>
                    {/* End Right Body Part */}
                </div>
            </div >
        </>
    )
}

export default Predict