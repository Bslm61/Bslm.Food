import React from 'react'

export const Header = () => {
  return (
    <div       className="h-[34vw] mx-auto my-[30px] bg-[url('/header_img.png')] bg-cover bg-center flex flex-col justify-center  items-start text-white p-10  " >
        <div  className='mt-40 bg animate-fade-in-scale '>
            <h2 className="text-6xl w-140  font-bold mb-8">Order your favourite food here </h2>
            <p className="max-w-[600px] mb-8">Pick your favorite dish, choose delivery or pickup, and get hot, ready-to-eat food fast. Simple ordering, real-time updates, and speedy delivery — mealtime solved.</p>
            <button className="border-none text-black px-5 py-2 w-40 rounded-full cursor-pointer bg-white">View Menu</button>
        </div>

    </div>
  )
}
