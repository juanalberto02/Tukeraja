import React from 'react';
import Chart from 'react-apexcharts';

const PredictGraph = (props) => {
    let prediction = props.prediction
    let maxLength = 6; // Max length including the dot

    let truncatedNumbers = prediction.map(number => {
        let numberString = number.toString();
        let result = numberString.substring(0, maxLength);
        return parseFloat(result); // Convert back to number if needed
    });

    const truncatedNumbersLength = truncatedNumbers.length;
    const categories = Array.from({ length: truncatedNumbersLength }, (_, index) => index + 1);


    const options = {
        chart: {
            height: 400,
            type: 'line',
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        grid: {
            show: true,
            strokeDashArray: 4,
        },
        legend: {
            show: false,
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            tickAmount: 4, // Display only 4 ticks on the y-axis
        },
    };
    const series = [
        {
            name: 'My First dataset',
            data: truncatedNumbers,
            color: '#f6468a',
        },
    ];

    return (
        <div className='w-full'>
            <Chart options={options} series={series} type="line" height="280" />
        </div>
    );
};

export default PredictGraph;
