import React from 'react';
import { features } from '../constants';

const Features = () => {
  return (
    <div className='container'>
      <div className='relative flex md:flex-wrap flex-nowrap border-2 border-s3 rounded-7xl md:overflow-hidden max-md:flex-col feature-after md:g7 max-md:border-none max-md:rounded-none max-md:gap-3'>
        {features.map(({ id, icon, title, caption, text }) => (
          <div key={id} className='relative z-2 md:px-10 px-5 md:pb-10 pb-5 flex-50 max-md:g7 max-md:border-2 max-md:border-s3 max-md:rounded-3xl max-md:flex-320'>
            <div className='w-full flex justify-start items-start'>
              <div className='-ml-3 mb-12 flex items-center justify-center flex-col'>
                <div className='w-0.5 h-16 bg-s3' />
                <img src={icon} className='size-28 object-contain' alt={title} />
              </div>
            </div>
            <p className='caption max-md:mb-6 mb-5'>{caption}</p>
            <h4 className='max-w-400 mb-7 h4 text-p4 max-md:mb-20 max-md:h-8'>{title}</h4>
            <p className='mb-11 body-1 max-md:mb-8 max-md:body-2'>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
