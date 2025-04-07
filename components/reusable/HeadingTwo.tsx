import React from 'react';

const HeadingTwo = ({HeadingText}) => {
    return (
        <h2 className="text-[24px] md:text-[36px] xl:text-[48px] font-medium leading-[130%] text-[#111111]">{HeadingText}</h2>
    );
};

export default HeadingTwo;