import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      {/* About Us Title */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>

      {/* About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="About us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-xl'>
          <p>
            At our core, we believe fashion is more than just what you wear—it’s how you express yourself. 
            Founded with a passion for style, quality, and individuality, we bring you a curated collection 
            of clothing that blends comfort, elegance, and affordability. From everyday essentials to statement 
            pieces, our goal is to make fashion accessible to everyone, everywhere. We are committed to offering 
            a seamless online shopping experience, backed by fast delivery, reliable customer service, and styles 
            that are always ahead of the curve.
          </p>
          <p className='text-gray-800 font-semibold'>Our Mission</p>
          <p>
            Our mission is to empower people through fashion by offering trendy, high-quality clothing that suits 
            all styles, sizes, and occasions. We aim to build a community that values self-expression, diversity, 
            and confidence—one outfit at a time.
          </p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      {/* Why Choose Us Boxes */}
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Shopping with us is designed to be easy, fast, and stress-free.
            <br />From user-friendly navigation to secure checkout, we’ve built an experience that lets you shop from anywhere, anytime.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            We’re more than just a store — we’re here to help.
            <br />Our dedicated customer support team is committed to making your shopping experience smooth and satisfying.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
