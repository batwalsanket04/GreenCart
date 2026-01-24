import React from 'react'
import { assets, categories } from '../greencart_assets/assets'
import { useAppContext } from '../Context/AppContext'

const Categories = () => {
    const {navigate}=useAppContext()
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6'>

{
    categories.map((val,index)=>(
        <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center' style={{backgroundColor:val.bgColor}}
        onClick={()=>{navigate(`/products/${val.path.toLowerCase()}`);
        ScrollTo(0,0)
        }}>
            <img src={val.image} alt={val.text} className='group-hover:scal-108 transition' />
            <p className='text-sm font-medium'>{val.text}</p>
        </div>

    ))
}
        
        
      </div>
    </div>
  )
}

export default Categories
