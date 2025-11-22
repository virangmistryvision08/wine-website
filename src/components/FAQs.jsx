import React from 'react'
import faqs_wine from "/faqs/faqs-wine.jpg";
import faqs_bg from "/faqs/faqs-bg.jpg";
import CommonFirstSection from './CommonFirstSection';

const FAQs = () => {
  return (
    <>
    <CommonFirstSection productImage={faqs_bg} productType="FAQs" />
    <section className='w-[96%] mx-auto flex items-start gap-10'>
        <div className='w-[35%]'>
            <img className='h-[600px] w-full object-cover' src={faqs_wine} alt="Wine Glass" />
        </div>
        <div className='w-[65%]'>
            <h1 className='uppercase text-3xl font-[Cormorant-Upright-bold]'>FREQUENTLY ASKED QUESTIONS</h1>
        </div>
    </section>
    </>
  )
}

export default FAQs