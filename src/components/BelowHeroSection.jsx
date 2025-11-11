import React from 'react'
import gold_medal from "/Gold_Medal.webp"

const BelowHeroSection = () => {
    return (
        <>
            <div className='min-h-screen w-[90%] py-10 md:py-20 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10'>
                <div className='md:w-1/2 flex flex-col gap-8'>
                    <h1 className='text-3xl lg:text-4xl font-[cormorant-upright-bold] !font-[600] uppercase'>Elite Wine Selections – Pure terroir. Zero compromise.</h1>
                    <div className='flex flex-col gap-3 lg:text-lg text-gray-600 font-[Urbanist]'>
                        <p>Elite Wine Selections is a New York–based importer and wholesaler specializing in premium, award-winning European dealcoholized wines (0.5% ABV) primarily from Germany, France, Italy, and Spain.</p>
                        <p>We serve the fast-growing sober-curious and health-conscious communities who seek sophistication without alcohol.</p>
                    </div>
                    <button className="bg-[#EED291] px-12 py-4 rounded-full font-semibold  hover:bg-black hover:outline hover:outline-[#EED291] hover:text-[#EED291] transition-all duration-300 cursor-pointer w-fit mx-auto md:m-0 font-[Urbanist]">DISCOVER MORE</button>
                </div>
                <div className='md:w-1/2 flex flex-col items-end'>
                    <div>
                        <img className='w-full md:w-[600px]' src={gold_medal} alt="gold_medal image" />
                        <h1 className='text-center text-lg font-semibold'>Gold Medal for the Bergdolt - Reif & Nett Breakaway Merlot</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BelowHeroSection