import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative pt-28 pb-40 max-lg:pt-24 max-lg:pb-36 max-md:pt-20 max-md:pb-32 mb-14'>
      <div className='container'>
        <div className='relative z-2 max-w-512 max-lg:max-w-388'>
          <div className='caption small-2 uppercase text-p3'>AI Chatbot</div>
          <h1 className='mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12'>
            <span className='text-orange-500'>Amazingly</span> simple
          </h1>
          <p className='max-w-440 mb-14 body-2 max-md:mb-10'>
            WALL - E is an AI chatbot designed for intelligent and interactive conversations.
            It offers a user-friendly interface for seamless communication.
          </p>
          <Link to="/credentials" className='shadow-lg bg-gradient-to-b from-blue-600 to-teal-600 font-poppins font-bold text-white uppercase inline-block rounded-md px-6 py-4 z-2  border-s3'>
            Try it now →
          </Link>
        </div>
        <div className='absolute -top-48 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res'>
          <img src="/images/hero.png" className='size-1230 max-lg:h-auto' alt="hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
