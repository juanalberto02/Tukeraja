import React, { useEffect, useState } from 'react'
import { arrowRight, dummyDiagram } from '../assets'
import { PredictGraph } from './components'
import { ReactTyped } from 'react-typed'

const BlogDetail = (props) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async (currency1, currency2) => {
            try {
                const timestamp = new Date().getTime(); // Generate a unique timestamp
                const url = `http://174.138.17.75:8080/predict?days=10&currency1=${currency1}&currency2=${currency2}&timestamp=${timestamp}`;
                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    setData(result); // Update the state with the fetched data
                } else {
                    console.error('Failed to fetch prediction data');
                }
            } catch (error) {
                console.error('Error fetching prediction data:', error);
            }
        };

        // Fetch data with default values for currency1 and currency2 when component mounts
        fetchData("IDR", props.selectedNews.cur);
    }, [props.selectedNews]);

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
                            <h2 className='text-[2vw] font-medium mt-[1vw] ml-[1.3vw]'>
                                Exchange Rate Diagrams 📈
                            </h2>
                            <div className="flex items-center my-[1vw] ml-[1.5vw]">
                                <div className="mr-[0.7vw] w-[0.6vw] h-[0.6vw] bg-[#f6468a]"></div>
                                <p className='mr-[1vw] text-[0.8vw] text-gray-500'>
                                    IDR
                                </p>
                                <img src={arrowRight} className='mr-[1vw] w-[2vw]' />
                                <div className="mr-[0.7vw] w-[0.6vw] h-[0.6vw] bg-[#53B9EA]"></div>
                                <p className='mr-[1vw] text-[0.8vw] text-gray-500'>
                                    {props.selectedNews.cur}
                                </p>
                            </div>
                            {data !== null && (
                                <>
                                    <PredictGraph prediction={data.values} />
                                    <p className='text-[1vw] mt-[1vw] text-gray-500 ml-[1vw]'>
                                        <b>Interpretation 📝 : </b>
                                        <ReactTyped
                                            strings={[data.interpretation]}
                                            typeSpeed={20}
                                            backSpeed={20}
                                            loop={false}
                                        /> </p>
                                </>
                            )}

                        </div>
                    </div>

                </div >
            </div >
        </>

    )
}

export default BlogDetail