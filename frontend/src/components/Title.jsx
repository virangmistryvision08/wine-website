import React from 'react'

const Title = ({text}) => {
  return (
    <>
      <h1 className='text-3xl md:text-4xl xl:text-5xl font-[Cormorant-Upright-bold] uppercase text-center font-semibold mb-10'>{text}</h1>
    </>
  )
}

export default Title
