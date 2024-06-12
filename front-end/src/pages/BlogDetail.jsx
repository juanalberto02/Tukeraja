import React from 'react'
import { arrowRight, dummyDiagram } from '../assets'

const BlogDetail = (props) => {
    return (
        <>
            <p className='w-full text-center mt-[3vw] flex items-center justify-end animate-bounce pr-[8vw] text-[1vw] cursor-pointer font-medium'
                onClick={() => props.handleBlogChange(0)}
            >
                <span>Back To The Top</span> <img src={arrowRight} className='w-[1vw] -rotate-90 ml-[1vw]' />
            </p>
            <div className='w-full h-screen px-[7vw] pt-[3vw]'>
                <div className="flex justify-between">
                    <div className="w-[50%] h-[84vh] overflow-scroll">
                        <p className='text-[1vw] text-gray-500'>10 July, <span className='text-gradient'>2023</span></p>
                        <h2 className='text-[3vw] font-semibold leading-snug'>{props.selectedNews.judul}</h2>
                        <div className='w-[4vw] h-[0.12vw] rounded-full bg-black mt-[1vw]'></div>
                        <div className="text-gray-500 mt-[1vw]">
                            <p
                                className='text-[1vw] text-justify'
                                dangerouslySetInnerHTML={{ __html: props.selectedNews.isi }}
                            />

                        </div>
                    </div >
                    <div className="w-[45%]">
                        <div className="">
                            <img src={dummyDiagram} className='w-[100%] h-[40vh] mt-[1vw]' />
                            <p className='text-[1vw] mt-[1vw] text-gray-500'>
                                <b>Interpretation:</b> "Explore the journey of currency values over time with our intuitive year-to-year exchange rate charts. Witness the fluctuations, spot trends, and gain insights into how global events shape currency values. Whether you're an investor tracking market movements or a traveler planning ahead, our charts provide a clear visualization of currency performance, empowering you to make informed decisions for the future."
                            </p>
                        </div>
                    </div>

                </div >
            </div >
        </>

    )
}

export default BlogDetail