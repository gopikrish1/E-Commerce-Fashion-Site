import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 border-t'>
            <Title text1={'CONTACT '} text2={'US'} />  
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
           <div className=' flex flex-col justify-center items-start gap-6'>
                <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                <p className='text-gray-500'>Ambattur, Chennai-58</p>
                <p className='text-gray-500'>Tel: 9940300776<br/> Email: gopilakshmanan72@gmail.com</p>
                <p className='font-semibold text-xl text-gray-600'>Carrers With Us</p>
                <p className='text-gray-500'>Learn more about out teams and job openings.</p>
                <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'onClick={() => window.location.href = 'https://www.linkedin.com/in/gopikrish01/'}>Explore Jobs</button>
            </div>
        </div>
        <NewsLetterBox />
    </div>
  )
}

export default Contact
