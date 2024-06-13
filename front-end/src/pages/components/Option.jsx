import React, { useState } from 'react'
import { arrowRightGrey, dropDownGrey, dropDownWhite } from './../../assets'

const Option = (props) => {
    const [showOptions1, setShowOptions1] = useState(false);
    const [showOptions2, setShowOptions2] = useState(false);
    const currencies1 = ['USD', 'IDR', 'SAR', 'MYR', 'SGD'].filter(currency => currency !== props.selectedCurrency2);
    const currencies2 = ['USD', 'SAR', 'MYR', 'SGD', 'AED', 'THB', 'TRY', 'JPY', 'VND', 'IDR'].filter(currency => currency !== props.selectedCurrency1);
    const currencyLabels = {
        'USD': 'Dollars',
        'SAR': 'Riyal',
        'MYR': 'Ringgit',
        'SGD': 'Dollars',
        'AED': 'Dirham',
        'THB': 'Baht',
        'TRY': 'Lira',
        'JPY': 'Yen',
        'VND': 'Dong',
        'IDR': 'Rupiah'
    };
    const formatNumber = (number) => {
        if (number < 1000) {
            return parseFloat(number.toPrecision(5));
        } else if (number >= 1000) {
            return new Intl.NumberFormat().format(number);
        } else {
            return number;
        }
    };
    const handleDivClick = (selector) => {
        if (selector === 1) {
            setShowOptions1(!showOptions1);
        } else if (selector === 2) {
            setShowOptions2(!showOptions2);
        }
    };

    const handleOptionClick = (currency, selector) => {
        if (selector === 1) {
            props.onCurrencyChange1(currency);
            setShowOptions1(false);
        } else if (selector === 2) {
            props.onCurrencyChange2(currency);
            setShowOptions2(false);
        }
    };


    return (
        <div className="flex my-[2vw]">
            {/* Dropdown menu for currency 1 */}
            <div className="relative w-[13vw] bg-[#53B9EA] h-full rounded-[0.7vw] mr-[0.7vw]">
                <div
                    className="flex py-[1vw] px-[0.7vw] h-full items-center justify-between cursor-pointer"
                    onClick={() => handleDivClick(1)}
                >
                    {/* Content for selected currency 1 */}
                    <span className='leading-[1.2vw]'>
                        <span className='text-[1.2vw] text-white'>{props.selectedCurrency1}</span>
                        <br />
                        <span className='text-[0.8vw] text-white'>1,00</span>
                        <span className='font-sans ml-[0.2vw] text-[#A9DCF5] text-[0.8vw]'>
                            {currencyLabels[props.selectedCurrency1]}
                        </span>
                    </span>
                    <img src={dropDownWhite} className='w-[1.8vw]' alt="Dropdown Icon" />
                </div>
                {/* Dropdown options for currency 1 */}
                {showOptions1 && (
                    <div className="absolute bg-white text-[1vw] text-[#3c8fb8] border mt-[1vw] h-[15vw] overflow-scroll rounded-[0.4vw] shadow-lg z-10">
                        {currencies1.map((currency, index) => (
                            <div
                                key={index}
                                className="px-[1vw] py-[1vw] cursor-pointer hover:bg-gray-200"
                                onClick={() => handleOptionClick(currency, 1)}
                            >
                                {/* Display currency option */}
                                {currency === 'USD' ? 'United States Dollar (USD)' :
                                    currency === 'IDR' ? 'Indonesian Rupiah (IDR)' :
                                        currency === 'SAR' ? 'Saudi Riyal (SAR)' :
                                            currency === 'MYR' ? 'Malaysian Ringgit (MYR)' :
                                                currency === 'SGD' ? 'Singapore Dollar (SGD)' : ''}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <img src={arrowRightGrey} className='w-[3.5vw] mx-[1vw]' alt="Arrow Icon" />
            {/* Dropdown menu for currency 2 */}
            <div className="relative w-[13vw] h-full border-[#d1d1d1] border-[0.1vw] rounded-[0.7vw] mr-[0.7vw]">
                <div
                    className="flex py-[1vw] px-[0.7vw] h-full items-center justify-between cursor-pointer"
                    onClick={() => handleDivClick(2)}
                >
                    {/* Content for selected currency 2 */}
                    <span className='leading-[1.2vw]'>
                        <span className='text-[1.2vw] text-[#f35b95]'>{props.selectedCurrency2}</span>
                        <br />
                        <span className='text-[0.8vw] text-[#6c6c6c]'>{formatNumber(props.currentValue)}</span>
                        <span className='font-sans ml-[0.2vw] text-[#bdbdbd] text-[0.8vw]'>
                            {currencyLabels[props.selectedCurrency2]}
                        </span>
                    </span>
                    <img src={dropDownGrey} className='w-[1.8vw]' alt="Dropdown Icon" />
                </div>
                {/* Dropdown options for currency 2 */}
                {showOptions2 && (
                    <div className="absolute bg-white text-[1vw] text-[#f35b95] border mt-[1vw] h-[15vw] overflow-scroll rounded-[0.4vw] shadow-lg z-10">
                        {currencies2.map((currency, index) => (
                            <div
                                key={index}
                                className="px-[1vw] py-[1vw] cursor-pointer hover:bg-gray-200"
                                onClick={() => handleOptionClick(currency, 2)}
                            >
                                {/* Display currency option */}
                                {currency === 'USD' ? 'United States Dollar (USD)' :
                                    currency === 'SAR' ? 'Saudi Riyal (SAR)' :
                                        currency === 'MYR' ? 'Malaysian Ringgit (MYR)' :
                                            currency === 'SGD' ? 'Singapore Dollar (SGD)' :
                                                currency === 'AED' ? 'United Arab Emirates Dirham (AED)' :
                                                    currency === 'THB' ? 'Thai Baht (THB)' :
                                                        currency === 'TRY' ? 'Turkish Lira (TRY)' :
                                                            currency === 'JPY' ? 'Japanese Yen (JPY)' :
                                                                currency === 'VND' ? 'Vietnamese Dong (VND)' :
                                                                    currency === 'IDR' ? 'Indonesian Rupiah (IDR)' : ''}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Option;
