import React, { useEffect, useState } from 'react';
import { arrowRight, miniArrow } from '../assets';
import BlogDetail from './BlogDetail';
import { News } from '../contant';

const Blogs = (props) => {
    const [blog, setBlog] = useState(0);
    // State pages:
    // 0: List Blog, 1: Detail Blog, 2: Back to list blog
    const pageAmount = Array.from({ length: Object.keys(News).length }, (_, i) => i + 1);
    const [pagination, setPagination] = useState(1);

    const handlePagination = (value) => {
        if (value >= 1 && value <= pageAmount.length) {
            setPagination(value);
        }
    };

    const renderPagination = () => {
        let pages = [];
        if (pagination <= 3) {
            pages = pageAmount.slice(0, 3);
        } else if (pagination >= pageAmount.length - 2) {
            pages = pageAmount.slice(pageAmount.length - 3);
        } else {
            pages = [pagination - 1, pagination, pagination + 1];
        }
        return pages;
    };

    const pages = renderPagination();

    const handleBlogChange = (blogStatus) => {
        setBlog(blogStatus);
    };

    const distance = 24 * (pagination - 1);

    return (
        <div className={`w-[100vw] h-[200vh] ${blog === 1 ? "animate-scroll-down" : "animate-scroll-top"}`}>
            {/* Blogs Option */}
            <div className={`w-full h-screen flex flex-col items-center py-[2vw]  ${props.paged === 3 ? "show-page" : "animate-disappear"}`}>
                {/* Heading */}
                <div className="flex w-full justify-between px-[2vw]">
                    <span className='font-semibold text-[1.7vw] ml-[2vw]'>
                        Tukeraja<span className='text-[#EB4184]'>.</span></span>
                    <div className="">
                    </div>
                    <button className='font-semibold flex items-center  text-[1.2vw]' onClick={() => props.handlePageChange(5)}>
                        <span>Back To Main Page</span><img src={arrowRight} className='w-[1.5vw] mt-[0.1vw] ml-[1vw] mr-[4vw] animationRight' />
                    </button>
                </div>

                {/* Body */}
                <div className="w-full mt-[10vw] h-[70vw] flex">
                    <div className="mt-[5.5vw] w-[36%] pl-[6vw] ">
                        {Object.values(News).map((item, index) => (
                            index === pagination - 1 && (
                                <div className="" key={index}>
                                    <h2 className='text-[2.5vw] font-semibold leading-[3.3vw]'>{item.judul}</h2>
                                    <p className='text-[0.8vw] mt-[1vw] text-gray-500'>{item.isi.substring(0, 150)}...</p>
                                    <div className="flex justify-end">
                                        <button className='mt-[2vw] hover:px-[2.3vw] duration-500 ease-in-out px-[2vw] py-[0.5vw] rounded-[0.3vw] text-[1vw] text-white bg-[#EB4184]'
                                            onClick={() => handleBlogChange(1)}
                                        >
                                            Read
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}

                    </div>
                    <div className="mt-[1vw] px-[7vw] w-[65%]">
                        <div className="flex">
                            <img src={miniArrow} className='w-[0.8vw] mx-[1vw] cursor-pointer rotate-180'
                                onClick={() => handlePagination(pagination - 1)}
                            />
                            {pagination > 3 && (
                                <>
                                    <button className="mx-[0.5vw] px-[1vw] py-[0.8vw] rounded-[0.3vw] text-[1vw]" onClick={() => handlePagination(1)}>1</button>
                                    <span className="mx-[0.5vw] mt-[1vw] text-[1vw]">...</span>
                                </>
                            )}
                            {pages.map((value) => (
                                <button
                                    className={`mx-[0.5vw] px-[1vw] py-[0.8vw] rounded-[0.3vw] text-[1vw] ${pagination === value ? "bg-gray-100" : ""}`}
                                    key={value}
                                    onClick={() => handlePagination(value)}
                                >
                                    {value}
                                </button>
                            ))}
                            {pagination < pageAmount.length - 2 && (
                                <>
                                    <span className="mx-[0.5vw] mt-[1vw] text-[1vw]">...</span>
                                    <button className="mx-[0.5vw] px-[1vw] py-[0.8vw] rounded-[0.3vw] text-[1vw]" onClick={() => handlePagination(pageAmount.length)}>
                                        {pageAmount.length}
                                    </button>
                                </>
                            )}
                            <img src={miniArrow} className='w-[0.8vw] mx-[1vw] cursor-pointer'
                                onClick={() => handlePagination(pagination + 1)}
                            />
                        </div>
                        <div className="mt-[2vw] overflow-hidden">
                            <div className={`flex ease-in-out duration-700`} style={{ transform: `translateX(-${distance}vw)` }}>
                                {Object.values(News).map((item, index) => (
                                    <img src={item.gambar} className='w-[20vw] h-[20vw] mx-[2vw]' key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BlogDetail */}
            <BlogDetail handleBlogChange={handleBlogChange} selectedNews={Object.values(News)[pagination - 1]} />
        </div>
    );
}

export default Blogs;
